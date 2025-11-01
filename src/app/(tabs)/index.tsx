import { ScrollView } from "react-native";
import { YStack, XStack, Card, Button, H5, Separator } from "tamagui";
import CustomHeader from "../../components/CustomHeader";
import { StatCard, QuickActionCard, AnnouncementItem, EventCard } from "../../components/home";
import {
  Users,
  CreditCard,
  MessageCircle,
  Calendar,
  TrendingUp,
  Bell,
} from "@tamagui/lucide-icons";
import { router } from "expo-router";

export default function HomeScreen() {
  return (
    <YStack flex={1} backgroundColor="#F5F5F5">
      <CustomHeader
        variant="withAvatar"
        userName="Wade Warren"
        subtitle="Welcome Back"
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        <YStack padding={20} gap={20} paddingBottom={100}>

          {/* Quick Stats Section */}
          <YStack gap={12}>
            <H5 fontWeight="600" color="#333">Community Overview</H5>
            <XStack gap={12}>
              <StatCard
                icon={Users}
                iconColor="#4A90E2"
                label="Total Members"
                value="1,234"
                trend="+12 this month"
                trendColor="#34C759"
                TrendIcon={TrendingUp}
              />
              <StatCard
                icon={Calendar}
                iconColor="#FF9500"
                label="Events"
                value="8"
                trend="Upcoming"
                trendColor="#666"
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
                onPress={() => console.log("See all")}
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
                  onPress={() => console.log("View announcement")}
                />

                <Separator />

                <AnnouncementItem
                  icon={Bell}
                  iconColor="#34C759"
                  title="Monthly Dues Reminder"
                  description="Friendly reminder that monthly dues are due by the end of this week."
                  time="1 day ago"
                  onPress={() => console.log("View announcement")}
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
                onPress={() => console.log("See all events")}
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
              onPress={() => console.log("View event")}
            />

            <EventCard
              date="22"
              month="MAR"
              title="Financial Planning Workshop"
              time="Friday, 2:00 PM - 4:00 PM"
              location="Online Event"
              color="#AF52DE"
              onPress={() => console.log("View event")}
            />
          </YStack>

        </YStack>
      </ScrollView>
    </YStack>
  );
}
