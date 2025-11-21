import {
  Bell,
  Calendar,
  Clock,
  CreditCard,
  MessageCircle,
  TrendingUp,
  UserCheck,
  Users,
  UserX,
} from "@tamagui/lucide-icons";
import { router, useFocusEffect } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, RefreshControl, ScrollView } from "react-native";
import { Button, Card, H4, H6, Separator, Text, XStack, YStack } from "tamagui";
import CustomHeader from "../../components/CustomHeader";
import {
  AnnouncementItem,
  EventCard,
  QuickActionCard,
  StatCard,
} from "../../components/home";
import { ASSET_BASE_URL } from "../../config/api";
import { AuthService } from "../../services/authService";
import { MemberService } from "../../services/memberService";
import { User } from "../../types/auth";
import { TotalMemberStats } from "../../types/member";
import { TokenStorage } from "../../utils/tokenStorage";

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

  // Refresh data pengguna apabila skrin difokuskan
  useFocusEffect(
    useCallback(() => {
      loadUserData();
    }, [])
  );

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

      const cachedUser = await TokenStorage.getUser();
      if (cachedUser) {
        setUser(cachedUser);
      }

      const response = await AuthService.getMe();
      if (response.success) {
        setUser(response.data);
        await TokenStorage.saveUser(response.data);
        console.log("User data loaded successfully.");
      }
    } catch (error: any) {
      console.error("Failed to load user data:", error);

      if (
        error?.message?.includes("Session expired") ||
        error?.status === 401
      ) {
        console.log("Session expired, redirecting to login...");
        router.replace("/login");
        return;
      }

      const cachedUser = await TokenStorage.getUser();
      if (!cachedUser) {
        console.log("No user data, redirecting to login...");
        router.replace("/login");
      } else {
        console.log("Using cached data (offline mode)");
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
        console.log("Member statistics loaded:", response.data);
      }
    } catch (error: any) {
      console.error("Failed to load member statistics:", error);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  };

  if (isLoading && !user) {
    return (
      <YStack
        flex={1}
        backgroundColor="#F5F5F5"
        justifyContent="center"
        alignItems="center"
      >
        <ActivityIndicator size="large" color="#4A90E2" />
        <Text marginTop={12} color="#666">
          Loading...
        </Text>
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
          {/* Community Statistics */}
          <YStack gap={12}>
            <H6 fontWeight="600" color="#333">
              Community Overview
            </H6>
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
            <H6 fontWeight="600" color="#333">
              Quick Actions
            </H6>
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
                label="Announcements"
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

          {/* Latest Announcements */}
          <YStack gap={12}>
            <XStack justifyContent="space-between" alignItems="center">
              <H6 fontWeight="600" color="#333">
                Latest Announcements
              </H6>
              <Button
                size="$2"
                chromeless
                color="#4A90E2"
                onPress={() => router.push("/announcements")}
              >
                View All
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
                  description="Join us for AGM on March 15 at Community Hall. All members are invited to attend."
                  time="2 hours ago"
                  onPress={() => router.push("/announcements/1")}
                />

                <Separator />

                <AnnouncementItem
                  icon={Bell}
                  iconColor="#34C759"
                  title="Monthly Fee Reminder"
                  description="Friendly reminder that monthly fee payment is due before the end of this week."
                  time="1 day ago"
                  onPress={() => router.push("/announcements/2")}
                />
              </YStack>
            </Card>
          </YStack>

          {/* Upcoming Events */}
          <YStack gap={12}>
            <XStack justifyContent="space-between" alignItems="center">
              <H6 fontWeight="600" color="#333">
                Upcoming Events
              </H6>
              <Button
                size="$2"
                chromeless
                color="#4A90E2"
                onPress={() => router.push("/events")}
              >
                View All
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
