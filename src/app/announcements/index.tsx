import { useState } from "react";
import { ScrollView, TouchableOpacity, RefreshControl } from "react-native";
import { YStack, XStack, Card, Text, View, Input } from "tamagui";
import { Bell, Search, ChevronRight } from "@tamagui/lucide-icons";
import { router } from "expo-router";
import CustomHeader from "../../components/CustomHeader";
import { Announcement } from "../../types/announcement";

// Mock data - replace with API call later
const MOCK_ANNOUNCEMENTS: Announcement[] = [
  {
    id: 1,
    title: "Annual General Meeting 2024",
    description: "Join us for our AGM on March 15th at Community Hall. All members are encouraged to attend.",
    content: "Dear members, we are pleased to invite you to our Annual General Meeting...",
    icon_color: "#4A90E2",
    priority: "high",
    created_at: "2024-03-01T10:00:00Z",
    updated_at: "2024-03-01T10:00:00Z",
    read: false,
  },
  {
    id: 2,
    title: "Monthly Dues Reminder",
    description: "Friendly reminder that monthly dues are due by the end of this week.",
    content: "This is a friendly reminder about monthly dues payment...",
    icon_color: "#34C759",
    priority: "medium",
    created_at: "2024-02-28T09:00:00Z",
    updated_at: "2024-02-28T09:00:00Z",
    read: true,
  },
  {
    id: 3,
    title: "Community Clean-Up Day",
    description: "Volunteer for our community clean-up event this Saturday at 8 AM.",
    content: "We're organizing a community clean-up day...",
    icon_color: "#FF9500",
    priority: "medium",
    created_at: "2024-02-25T14:00:00Z",
    updated_at: "2024-02-25T14:00:00Z",
    read: true,
  },
  {
    id: 4,
    title: "New Security Measures",
    description: "Important updates regarding new security protocols for all residents.",
    content: "Starting next month, we will implement new security measures...",
    icon_color: "#FF3B30",
    priority: "high",
    created_at: "2024-02-20T11:00:00Z",
    updated_at: "2024-02-20T11:00:00Z",
    read: false,
  },
  {
    id: 5,
    title: "Parking Regulation Update",
    description: "Please review the updated parking regulations effective immediately.",
    content: "We have updated our parking regulations...",
    icon_color: "#AF52DE",
    priority: "low",
    created_at: "2024-02-15T16:00:00Z",
    updated_at: "2024-02-15T16:00:00Z",
    read: true,
  },
];

export default function AnnouncementsScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [announcements, setAnnouncements] = useState<Announcement[]>(MOCK_ANNOUNCEMENTS);

  const onRefresh = async () => {
    setRefreshing(true);
    // TODO: Call API to refresh announcements
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  const filteredAnnouncements = announcements.filter(
    (announcement) =>
      announcement.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      announcement.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAnnouncementPress = (announcement: Announcement) => {
    router.push(`/announcements/${announcement.id}`);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
      if (diffHours === 0) {
        const diffMinutes = Math.floor(diffTime / (1000 * 60));
        return `${diffMinutes} minutes ago`;
      }
      return `${diffHours} hours ago`;
    } else if (diffDays === 1) {
      return "1 day ago";
    } else if (diffDays < 7) {
      return `${diffDays} days ago`;
    } else {
      return date.toLocaleDateString("en-MY", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    }
  };

  const getPriorityBadge = (priority?: string) => {
    if (!priority || priority === "low") return null;

    return (
      <View
        backgroundColor={priority === "high" ? "#FF3B3020" : "#FF950020"}
        paddingHorizontal={8}
        paddingVertical={4}
        borderRadius={4}
      >
        <Text
          fontSize={11}
          fontWeight="600"
          color={priority === "high" ? "#FF3B30" : "#FF9500"}
          textTransform="uppercase"
        >
          {priority}
        </Text>
      </View>
    );
  };

  return (
    <YStack flex={1} backgroundColor="#F5F5F5">
      <CustomHeader
        variant="default"
        title="Announcements"
        showBackButton={true}
        showNotification={false}
      />

      <YStack padding={20} gap={16}>
        {/* Search Bar */}
        <Card
          backgroundColor="white"
          borderRadius={12}
          padding={12}
          shadowColor="#000"
          shadowOffset={{ width: 0, height: 1 }}
          shadowOpacity={0.05}
          shadowRadius={4}
        >
          <XStack alignItems="center" gap={12}>
            <Search size={20} color="#999" />
            <Input
              flex={1}
              placeholder="Search announcements..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              borderWidth={0}
              backgroundColor="transparent"
              fontSize={14}
              placeholderTextColor="#999"
              padding={0}
            />
          </XStack>
        </Card>

        {/* Results Count */}
        <Text fontSize={14} color="#666">
          {filteredAnnouncements.length} announcement{filteredAnnouncements.length !== 1 ? "s" : ""}
        </Text>
      </YStack>

      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <YStack padding={20} paddingTop={0} gap={12} paddingBottom={100}>
          {filteredAnnouncements.map((announcement) => (
            <TouchableOpacity
              key={announcement.id}
              onPress={() => handleAnnouncementPress(announcement)}
              activeOpacity={0.7}
            >
              <Card
                backgroundColor="white"
                borderRadius={12}
                padding={16}
                shadowColor="#000"
                shadowOffset={{ width: 0, height: 1 }}
                shadowOpacity={0.05}
                shadowRadius={4}
                borderWidth={announcement.read ? 0 : 2}
                borderColor={announcement.read ? "transparent" : "#4A90E220"}
              >
                <XStack gap={12} alignItems="flex-start">
                  {/* Icon */}
                  <View
                    width={44}
                    height={44}
                    borderRadius={22}
                    backgroundColor={`${announcement.icon_color || "#4A90E2"}20`}
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Bell size={20} color={announcement.icon_color || "#4A90E2"} />
                  </View>

                  {/* Content */}
                  <YStack flex={1} gap={6}>
                    <XStack justifyContent="space-between" alignItems="flex-start" gap={8}>
                      <Text
                        flex={1}
                        fontSize={16}
                        fontWeight="600"
                        color="#000"
                        numberOfLines={2}
                      >
                        {announcement.title}
                      </Text>
                      {getPriorityBadge(announcement.priority)}
                    </XStack>

                    <Text
                      fontSize={14}
                      color="#666"
                      numberOfLines={2}
                      lineHeight={20}
                    >
                      {announcement.description}
                    </Text>

                    <XStack justifyContent="space-between" alignItems="center" marginTop={4}>
                      <Text fontSize={12} color="#999">
                        {formatDate(announcement.created_at)}
                      </Text>
                      <ChevronRight size={16} color="#999" />
                    </XStack>
                  </YStack>
                </XStack>
              </Card>
            </TouchableOpacity>
          ))}

          {filteredAnnouncements.length === 0 && (
            <YStack alignItems="center" justifyContent="center" paddingVertical={60}>
              <Bell size={48} color="#CCC" />
              <Text fontSize={16} color="#999" marginTop={16}>
                No announcements found
              </Text>
            </YStack>
          )}
        </YStack>
      </ScrollView>
    </YStack>
  );
}
