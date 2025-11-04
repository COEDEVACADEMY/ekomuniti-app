import { useState, useEffect } from "react";
import { ScrollView, Share } from "react-native";
import { YStack, XStack, Card, Text, View, Button } from "tamagui";
import { Bell, Calendar, Share2, Bookmark } from "@tamagui/lucide-icons";
import { router, useLocalSearchParams } from "expo-router";
import CustomHeader from "../../components/CustomHeader";
import { Announcement } from "../../types/announcement";

// Mock data - same as list screen
const MOCK_ANNOUNCEMENTS: Announcement[] = [
  {
    id: 1,
    title: "Annual General Meeting 2024",
    description: "Join us for our AGM on March 15th at Community Hall. All members are encouraged to attend.",
    content: `Dear valued members,

We are pleased to invite you to our Annual General Meeting (AGM) for 2024.

📅 Date: March 15th, 2024
⏰ Time: 2:00 PM - 5:00 PM
📍 Location: Community Hall, Ground Floor

Agenda:
1. Chairman's Welcome Address
2. Financial Report 2023
3. Election of New Committee Members
4. Proposed Budget for 2024
5. Any Other Business
6. Q&A Session

All members are strongly encouraged to attend this important meeting. Your presence and participation are valuable to our community.

Light refreshments will be served.

Please RSVP by March 10th, 2024.

For any inquiries, please contact the management office.

Best regards,
Management Committee`,
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
    content: `Dear residents,

This is a friendly reminder about your monthly maintenance dues.

Payment Details:
💰 Amount: RM 150.00
📅 Due Date: Last day of this week
🏦 Payment Methods:
   - Online Banking
   - Auto-debit
   - Cash/Cheque at Management Office

Please ensure timely payment to avoid any late payment charges.

Thank you for your cooperation.`,
    icon_color: "#34C759",
    priority: "medium",
    created_at: "2024-02-28T09:00:00Z",
    updated_at: "2024-02-28T09:00:00Z",
    read: true,
  },
];

export default function AnnouncementDetailScreen() {
  const { id } = useLocalSearchParams();
  const [announcement, setAnnouncement] = useState<Announcement | null>(null);
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    // TODO: Replace with API call
    const foundAnnouncement = MOCK_ANNOUNCEMENTS.find(
      (a) => a.id === parseInt(id as string)
    );
    setAnnouncement(foundAnnouncement || null);
  }, [id]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-MY", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleShare = async () => {
    if (!announcement) return;

    try {
      await Share.share({
        message: `${announcement.title}\n\n${announcement.description}`,
        title: announcement.title,
      });
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    // TODO: Save bookmark to storage/API
  };

  if (!announcement) {
    return (
      <YStack flex={1} backgroundColor="#F5F5F5">
        <CustomHeader
          variant="default"
          title="Announcement"
          showBackButton={true}
          showNotification={false}
        />
        <YStack flex={1} alignItems="center" justifyContent="center">
          <Text fontSize={16} color="#999">
            Announcement not found
          </Text>
        </YStack>
      </YStack>
    );
  }

  return (
    <YStack flex={1} backgroundColor="#F5F5F5">
      <CustomHeader
        variant="default"
        title="Announcement"
        showBackButton={true}
        showNotification={false}
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        <YStack padding={20} gap={16} paddingBottom={100}>
          {/* Header Card */}
          <Card
            backgroundColor="white"
            borderRadius={12}
            padding={20}
            shadowColor="#000"
            shadowOffset={{ width: 0, height: 2 }}
            shadowOpacity={0.08}
            shadowRadius={8}
          >
            <YStack gap={16}>
              {/* Icon and Priority */}
              <XStack justifyContent="space-between" alignItems="center">
                <View
                  width={56}
                  height={56}
                  borderRadius={28}
                  backgroundColor={`${announcement.icon_color || "#4A90E2"}20`}
                  alignItems="center"
                  justifyContent="center"
                >
                  <Bell size={28} color={announcement.icon_color || "#4A90E2"} />
                </View>

                {announcement.priority && announcement.priority !== "low" && (
                  <View
                    backgroundColor={
                      announcement.priority === "high" ? "#FF3B3020" : "#FF950020"
                    }
                    paddingHorizontal={12}
                    paddingVertical={6}
                    borderRadius={6}
                  >
                    <Text
                      fontSize={12}
                      fontWeight="600"
                      color={announcement.priority === "high" ? "#FF3B30" : "#FF9500"}
                      textTransform="uppercase"
                    >
                      {announcement.priority}
                    </Text>
                  </View>
                )}
              </XStack>

              {/* Title */}
              <Text fontSize={22} fontWeight="700" color="#000" lineHeight={30}>
                {announcement.title}
              </Text>

              {/* Date */}
              <XStack alignItems="center" gap={8}>
                <Calendar size={16} color="#999" />
                <Text fontSize={14} color="#666">
                  {formatDate(announcement.created_at)}
                </Text>
              </XStack>
            </YStack>
          </Card>

          {/* Content Card */}
          <Card
            backgroundColor="white"
            borderRadius={12}
            padding={20}
            shadowColor="#000"
            shadowOffset={{ width: 0, height: 2 }}
            shadowOpacity={0.08}
            shadowRadius={8}
          >
            <Text
              fontSize={15}
              color="#333"
              lineHeight={24}
              style={{ whiteSpace: "pre-line" }}
            >
              {announcement.content}
            </Text>
          </Card>

          {/* Action Buttons */}
          <XStack gap={12}>
            <Button
              flex={1}
              size="$4"
              backgroundColor="white"
              color="#4A90E2"
              borderRadius={12}
              borderWidth={1}
              borderColor="#4A90E2"
              onPress={handleBookmark}
              icon={<Bookmark size={20} color="#4A90E2" />}
              pressStyle={{ scale: 0.98 }}
            >
              {isBookmarked ? "Saved" : "Save"}
            </Button>

            <Button
              flex={1}
              size="$4"
              backgroundColor="#4A90E2"
              color="white"
              borderRadius={12}
              onPress={handleShare}
              icon={<Share2 size={20} color="white" />}
              pressStyle={{ scale: 0.98 }}
              shadowColor="#4A90E2"
              shadowOffset={{ width: 0, height: 4 }}
              shadowOpacity={0.3}
              shadowRadius={8}
            >
              Share
            </Button>
          </XStack>
        </YStack>
      </ScrollView>
    </YStack>
  );
}
