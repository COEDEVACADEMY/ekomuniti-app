import { useState, useEffect } from "react";
import { ScrollView, Share, Alert } from "react-native";
import { YStack, XStack, Card, Text, View, Button } from "tamagui";
import {
  Calendar,
  MapPin,
  Clock,
  Users,
  Share2,
  UserPlus,
  User as UserIcon,
} from "@tamagui/lucide-icons";
import { router, useLocalSearchParams } from "expo-router";
import CustomHeader from "../../components/CustomHeader";
import { Event } from "../../types/event";

// Mock data - same as list screen
const MOCK_EVENTS: Event[] = [
  {
    id: 1,
    title: "Community Sports Day",
    description: "Join us for an exciting day of sports and activities! Perfect for all ages and fitness levels. We'll have various competitions, games, and fun activities for the entire family.\n\nActivities include:\n• Football tournament\n• Basketball 3v3\n• Badminton competition\n• Fun run for kids\n• Tug of war\n• And many more!\n\nPrizes will be awarded to winners. Free refreshments and light snacks will be provided throughout the day.",
    date: "2024-03-15",
    month: "MAR",
    day: "15",
    time: "Saturday, 9:00 AM - 5:00 PM",
    location: "Community Sports Complex, Block A",
    color: "#FF9500",
    category: "Sports",
    organizer: "Sports Committee",
    capacity: 200,
    registered: 145,
    status: "upcoming",
    created_at: "2024-03-01T10:00:00Z",
    updated_at: "2024-03-01T10:00:00Z",
  },
  {
    id: 2,
    title: "Financial Planning Workshop",
    description: "Learn essential financial planning skills from experienced advisors.",
    date: "2024-03-22",
    month: "MAR",
    day: "22",
    time: "Friday, 2:00 PM - 4:00 PM",
    location: "Online Event (Zoom)",
    color: "#AF52DE",
    category: "Workshop",
    organizer: "Community Development Committee",
    capacity: 100,
    registered: 67,
    status: "upcoming",
    created_at: "2024-02-28T09:00:00Z",
    updated_at: "2024-02-28T09:00:00Z",
  },
];

export default function EventDetailScreen() {
  const { id } = useLocalSearchParams();
  const [event, setEvent] = useState<Event | null>(null);
  const [isRegistered, setIsRegistered] = useState(false);

  useEffect(() => {
    // TODO: Replace with API call
    const foundEvent = MOCK_EVENTS.find((e) => e.id === parseInt(id as string));
    setEvent(foundEvent || null);
  }, [id]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-MY", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const handleShare = async () => {
    if (!event) return;

    try {
      await Share.share({
        message: `${event.title}\n\n📅 ${event.time}\n📍 ${event.location}\n\n${event.description}`,
        title: event.title,
      });
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };

  const handleRegister = () => {
    if (!event) return;

    if (isRegistered) {
      Alert.alert(
        "Cancel Registration",
        "Are you sure you want to cancel your registration?",
        [
          { text: "No", style: "cancel" },
          {
            text: "Yes, Cancel",
            style: "destructive",
            onPress: () => {
              setIsRegistered(false);
              Alert.alert("Success", "Registration cancelled successfully");
              // TODO: Call API to cancel registration
            },
          },
        ]
      );
    } else {
      // Check capacity
      if (event.capacity && event.registered && event.registered >= event.capacity) {
        Alert.alert("Event Full", "Sorry, this event has reached maximum capacity.");
        return;
      }

      Alert.alert(
        "Confirm Registration",
        `Would you like to register for ${event.title}?`,
        [
          { text: "Cancel", style: "cancel" },
          {
            text: "Register",
            onPress: () => {
              setIsRegistered(true);
              Alert.alert("Success", "You have been registered for this event!");
              // TODO: Call API to register
            },
          },
        ]
      );
    }
  };

  const getCapacityPercentage = () => {
    if (!event || !event.capacity || !event.registered) return 0;
    return (event.registered / event.capacity) * 100;
  };

  const getCapacityColor = () => {
    const percentage = getCapacityPercentage();
    if (percentage >= 90) return "#FF3B30";
    if (percentage >= 70) return "#FF9500";
    return "#34C759";
  };

  if (!event) {
    return (
      <YStack flex={1} backgroundColor="#F5F5F5">
        <CustomHeader
          variant="default"
          title="Event"
          showBackButton={true}
          showNotification={false}
        />
        <YStack flex={1} alignItems="center" justifyContent="center">
          <Text fontSize={16} color="#999">
            Event not found
          </Text>
        </YStack>
      </YStack>
    );
  }

  return (
    <YStack flex={1} backgroundColor="#F5F5F5">
      <CustomHeader
        variant="default"
        title="Event Details"
        showBackButton={true}
        showNotification={false}
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        <YStack paddingBottom={120}>
          {/* Hero Card */}
          <Card
            backgroundColor={event.color || "#4A90E2"}
            borderRadius={0}
            padding={32}
            alignItems="center"
          >
            <View
              width={100}
              height={100}
              borderRadius={50}
              backgroundColor="white"
              alignItems="center"
              justifyContent="center"
              marginBottom={16}
            >
              <Text fontSize={16} fontWeight="600" color={event.color || "#4A90E2"}>
                {event.month}
              </Text>
              <Text fontSize={40} fontWeight="700" color={event.color || "#4A90E2"}>
                {event.day}
              </Text>
            </View>

            <Text fontSize={24} fontWeight="700" color="white" textAlign="center">
              {event.title}
            </Text>

            {event.category && (
              <View
                backgroundColor="white"
                paddingHorizontal={12}
                paddingVertical={6}
                borderRadius={20}
                marginTop={12}
              >
                <Text fontSize={13} fontWeight="600" color={event.color || "#4A90E2"}>
                  {event.category}
                </Text>
              </View>
            )}
          </Card>

          <YStack padding={20} gap={16}>
            {/* Info Cards */}
            <Card
              backgroundColor="white"
              borderRadius={12}
              padding={16}
              shadowColor="#000"
              shadowOffset={{ width: 0, height: 2 }}
              shadowOpacity={0.08}
              shadowRadius={8}
            >
              <YStack gap={16}>
                {/* Date */}
                <XStack alignItems="center" gap={12}>
                  <View
                    width={44}
                    height={44}
                    borderRadius={22}
                    backgroundColor="#4A90E220"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Calendar size={20} color="#4A90E2" />
                  </View>
                  <YStack flex={1}>
                    <Text fontSize={13} color="#999">
                      Date
                    </Text>
                    <Text fontSize={15} fontWeight="600" color="#000">
                      {formatDate(event.date)}
                    </Text>
                  </YStack>
                </XStack>

                {/* Time */}
                <XStack alignItems="center" gap={12}>
                  <View
                    width={44}
                    height={44}
                    borderRadius={22}
                    backgroundColor="#34C75920"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Clock size={20} color="#34C759" />
                  </View>
                  <YStack flex={1}>
                    <Text fontSize={13} color="#999">
                      Time
                    </Text>
                    <Text fontSize={15} fontWeight="600" color="#000">
                      {event.time}
                    </Text>
                  </YStack>
                </XStack>

                {/* Location */}
                <XStack alignItems="center" gap={12}>
                  <View
                    width={44}
                    height={44}
                    borderRadius={22}
                    backgroundColor="#FF950020"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <MapPin size={20} color="#FF9500" />
                  </View>
                  <YStack flex={1}>
                    <Text fontSize={13} color="#999">
                      Location
                    </Text>
                    <Text fontSize={15} fontWeight="600" color="#000">
                      {event.location}
                    </Text>
                  </YStack>
                </XStack>

                {/* Organizer */}
                {event.organizer && (
                  <XStack alignItems="center" gap={12}>
                    <View
                      width={44}
                      height={44}
                      borderRadius={22}
                      backgroundColor="#AF52DE20"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <UserIcon size={20} color="#AF52DE" />
                    </View>
                    <YStack flex={1}>
                      <Text fontSize={13} color="#999">
                        Organizer
                      </Text>
                      <Text fontSize={15} fontWeight="600" color="#000">
                        {event.organizer}
                      </Text>
                    </YStack>
                  </XStack>
                )}
              </YStack>
            </Card>

            {/* Capacity Card */}
            {event.capacity && (
              <Card
                backgroundColor="white"
                borderRadius={12}
                padding={16}
                shadowColor="#000"
                shadowOffset={{ width: 0, height: 2 }}
                shadowOpacity={0.08}
                shadowRadius={8}
              >
                <YStack gap={12}>
                  <XStack alignItems="center" gap={12}>
                    <View
                      width={44}
                      height={44}
                      borderRadius={22}
                      backgroundColor={`${getCapacityColor()}20`}
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Users size={20} color={getCapacityColor()} />
                    </View>
                    <YStack flex={1}>
                      <Text fontSize={13} color="#999">
                        Registration
                      </Text>
                      <Text fontSize={15} fontWeight="600" color="#000">
                        {event.registered}/{event.capacity} registered
                      </Text>
                    </YStack>
                  </XStack>

                  {/* Progress Bar */}
                  <YStack gap={6}>
                    <View
                      height={8}
                      backgroundColor="#F0F0F0"
                      borderRadius={4}
                      overflow="hidden"
                    >
                      <View
                        width={`${getCapacityPercentage()}%`}
                        height="100%"
                        backgroundColor={getCapacityColor()}
                      />
                    </View>
                    <Text fontSize={12} color="#999">
                      {(100 - getCapacityPercentage()).toFixed(0)}% capacity remaining
                    </Text>
                  </YStack>
                </YStack>
              </Card>
            )}

            {/* Description Card */}
            <Card
              backgroundColor="white"
              borderRadius={12}
              padding={20}
              shadowColor="#000"
              shadowOffset={{ width: 0, height: 2 }}
              shadowOpacity={0.08}
              shadowRadius={8}
            >
              <YStack gap={8}>
                <Text fontSize={18} fontWeight="600" color="#000">
                  About Event
                </Text>
                <Text
                  fontSize={15}
                  color="#333"
                  lineHeight={24}
                  style={{ whiteSpace: "pre-line" }}
                >
                  {event.description}
                </Text>
              </YStack>
            </Card>
          </YStack>
        </YStack>
      </ScrollView>

      {/* Bottom Action Bar */}
      <View
        position="absolute"
        bottom={0}
        left={0}
        right={0}
        backgroundColor="white"
        padding={20}
        borderTopWidth={1}
        borderTopColor="#F0F0F0"
        shadowColor="#000"
        shadowOffset={{ width: 0, height: -2 }}
        shadowOpacity={0.1}
        shadowRadius={8}
      >
        <XStack gap={12}>
          <Button
            size="$5"
            backgroundColor="white"
            color="#4A90E2"
            borderRadius={12}
            borderWidth={1}
            borderColor="#4A90E2"
            onPress={handleShare}
            icon={<Share2 size={20} color="#4A90E2" />}
            pressStyle={{ scale: 0.98 }}
            width={60}
          />

          <Button
            flex={1}
            size="$5"
            backgroundColor={isRegistered ? "#FF3B30" : "#4A90E2"}
            color="white"
            borderRadius={12}
            onPress={handleRegister}
            icon={
              isRegistered ? (
                <UserIcon size={20} color="white" />
              ) : (
                <UserPlus size={20} color="white" />
              )
            }
            pressStyle={{ scale: 0.98 }}
            shadowColor={isRegistered ? "#FF3B30" : "#4A90E2"}
            shadowOffset={{ width: 0, height: 4 }}
            shadowOpacity={0.3}
            shadowRadius={8}
          >
            {isRegistered ? "Cancel Registration" : "Register Now"}
          </Button>
        </XStack>
      </View>
    </YStack>
  );
}
