import { useEffect, useState } from "react";
import { ScrollView, ActivityIndicator, RefreshControl } from "react-native";
import { YStack, XStack, Card, Button, H5, Separator, Text } from "tamagui";
import CustomHeader from "../../components/CustomHeader";
import { StatCard, QuickActionCard, AnnouncementItem, EventCard } from "../../components/home";
import {
  Users,
  CreditCard,
  MessageCircle,
  Calendar,
  TrendingUp,
  Bell,
  UserCheck,
  UserX,
  Clock,
} from "@tamagui/lucide-icons";
import { router } from "expo-router";
import { AuthService } from "../../services/authService";
import { MemberService } from "../../services/memberService";
import { TokenStorage } from "../../utils/tokenStorage";
import { User } from "../../types/auth";
import { TotalMemberStats } from "../../types/member";
import { ASSET_BASE_URL } from "../../config/api";

export default function HomeScreen() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [memberStats, setMemberStats] = useState<TotalMemberStats | null>(null);
  const [subtitle, setSubtitle] = useState("");

  useEffect(() => {
    loadData();
    checkFirstVisit();
  }, []);

  const checkFirstVisit = async () => {
    const hasVisited = await TokenStorage.getHasVisitedHome();
    if (hasVisited) {
      setSubtitle("Welcome Back");
    } else {
      setSubtitle("Welcome");
      await TokenStorage.setHasVisitedHome(true);
    }
  };

  const loadData = async () => {
    await Promise.all([loadUserData(), loadMemberStats()]);
  };

  const loadUserData = async () => {
    try {
      setIsLoading(true);

      // Try to get user from storage first
      const cachedUser = await TokenStorage.getUser();
      if (cachedUser) {
        setUser(cachedUser);
      }

      // Fetch fresh data from API (with auto-refresh on 401)
      const response = await AuthService.getMe();
      if (response.success) {
        setUser(response.data);
        // Update cached user
        await TokenStorage.saveUser(response.data);
        console.log("User data loaded successfully");
      }
    } catch (error: any) {
      console.error("Failed to load user data:", error);

      // Check if session expired (401)
      if (error?.message?.includes("Session expired") || error?.status === 401) {
        console.log("Session expired, redirecting to login...");
        router.replace("/login");
        return;
      }

      // For other errors, check if we have cached user
      const cachedUser = await TokenStorage.getUser();
      if (!cachedUser) {
        // No cached user and API failed, redirect to login
        console.log("No cached user, redirecting to login...");
        router.replace("/login");
      } else {
        console.log("Using cached user data (offline mode)");
        // We have cached user, continue with that (offline mode)
      }
    } finally {
      setIsLoading(false);
    }
  };

  const loadMemberStats = async () => {
    try {
      const response = await MemberService.getTotalMembers();
      if (response.success) {
        setMemberStats(response.data);
        console.log("Member stats loaded:", response.data);
      }
    } catch (error: any) {
      console.error("Failed to load member stats:", error);
      // Don't redirect, just show error or use default values
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  };

  if (isLoading && !user) {
    return (
      <YStack flex={1} backgroundColor="#F5F5F5" justifyContent="center" alignItems="center">
        <ActivityIndicator size="large" color="#4A90E2" />
        <Text marginTop={12} color="#666">Loading...</Text>
      </YStack>
    );
  }

  const profileImageUrl = user?.photo
    ? `${ASSET_BASE_URL}/Profil/${user.photo}`
    : undefined;

  return (
    <YStack flex={1} backgroundColor="#F5F5F5">
      <CustomHeader
        variant="withAvatar"
        userName={user?.fullname || "User"}
        subtitle={subtitle}
        avatarUrl={profileImageUrl}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <YStack padding={20} gap={20} paddingBottom={100}>

          {/* Quick Stats Section */}
          <YStack gap={12}>
            <H5 fontWeight="600" color="#333">Community Overview</H5>
            <XStack gap={12}>
              <StatCard
                icon={Users}
                iconColor="#4A90E2"
                label="Total Members"
                value={memberStats?.total_member.toString() || "0"}
                trend={`${memberStats?.total_active || 0} active`}
                trendColor="#34C759"
                TrendIcon={UserCheck}
              />
              <StatCard
                icon={Clock}
                iconColor="#FF9500"
                label="Pending"
                value={memberStats?.total_pending.toString() || "0"}
                trend="Need approval"
                trendColor="#666"
              />
            </XStack>
            <XStack gap={12}>
              <StatCard
                icon={UserCheck}
                iconColor="#34C759"
                label="Active"
                value={memberStats?.total_active.toString() || "0"}
                trend="Verified members"
                trendColor="#34C759"
                TrendIcon={TrendingUp}
              />
              <StatCard
                icon={UserX}
                iconColor="#FF3B30"
                label="Expired"
                value={memberStats?.total_expired.toString() || "0"}
                trend="Need renewal"
                trendColor="#FF3B30"
              />
            </XStack>
          </YStack>

          {/* Quick Actions */}
          <YStack gap={12}>
            <H5 fontWeight="600" color="#333">Quick Actions</H5>
            <XStack gap={12}>
              <QuickActionCard
                icon={Users}
                iconColor="#4A90E2"
                label="Members"
                onPress={() => router.push("/(tabs)/members")}
              />
              <QuickActionCard
                icon={CreditCard}
                iconColor="#34C759"
                label="Payments"
                onPress={() => console.log("Payments")}
              />
            </XStack>

            <XStack gap={12}>
              <QuickActionCard
                icon={MessageCircle}
                iconColor="#FF9500"
                label="Announce"
                onPress={() => console.log("Announcements")}
              />
              <QuickActionCard
                icon={Calendar}
                iconColor="#AF52DE"
                label="Activities"
                onPress={() => console.log("Activities")}
              />
            </XStack>
          </YStack>

          {/* Recent Announcements */}
          <YStack gap={12}>
            <XStack justifyContent="space-between" alignItems="center">
              <H5 fontWeight="600" color="#333">Recent Announcements</H5>
              <Button
                size="$2"
                chromeless
                color="#4A90E2"
                onPress={() => router.push("/announcements")}
              >
                See All
              </Button>
            </XStack>

            <Card
              padding={16}
              backgroundColor="white"
              borderRadius={12}
              shadowColor="#000"
              shadowOffset={{ width: 0, height: 1 }}
              shadowOpacity={0.05}
              shadowRadius={4}
            >
              <YStack gap={12}>
                <AnnouncementItem
                  icon={Bell}
                  iconColor="#4A90E2"
                  title="Annual General Meeting 2024"
                  description="Join us for our AGM on March 15th at Community Hall. All members are encouraged to attend."
                  time="2 hours ago"
                  onPress={() => router.push("/announcements/1")}
                />

                <Separator />

                <AnnouncementItem
                  icon={Bell}
                  iconColor="#34C759"
                  title="Monthly Dues Reminder"
                  description="Friendly reminder that monthly dues are due by the end of this week."
                  time="1 day ago"
                  onPress={() => router.push("/announcements/2")}
                />
              </YStack>
            </Card>
          </YStack>

          {/* Upcoming Events */}
          <YStack gap={12}>
            <XStack justifyContent="space-between" alignItems="center">
              <H5 fontWeight="600" color="#333">Upcoming Events</H5>
              <Button
                size="$2"
                chromeless
                color="#4A90E2"
                onPress={() => router.push("/events")}
              >
                See All
              </Button>
            </XStack>

            <EventCard
              date="15"
              month="MAR"
              title="Community Sports Day"
              time="Saturday, 9:00 AM - 5:00 PM"
              location="Community Sports Complex"
              color="#FF9500"
              onPress={() => router.push("/events/1")}
            />

            <EventCard
              date="22"
              month="MAR"
              title="Financial Planning Workshop"
              time="Friday, 2:00 PM - 4:00 PM"
              location="Online Event"
              color="#AF52DE"
              onPress={() => router.push("/events/2")}
            />
          </YStack>

        </YStack>
      </ScrollView>
    </YStack>
  );
}
