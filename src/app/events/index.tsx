import { useState } from "react";
import { ScrollView, TouchableOpacity, RefreshControl } from "react-native";
import { YStack, XStack, Card, Text, View, Input } from "tamagui";
import { Calendar, Search, MapPin, Clock } from "@tamagui/lucide-icons";
import { router } from "expo-router";
import CustomHeader from "../../components/CustomHeader";
import { Event } from "../../types/event";
import React from "react";

// Mock data - replace with API call later
const MOCK_EVENTS: Event[] = [
  {
    id: 1,
    title: "Community Sports Day",
    description: "Annual sports event for all residents and families. Multiple activities and competitions.",
    date: "2024-03-15",
    month: "MAR",
    day: "15",
    time: "Saturday, 9:00 AM - 5:00 PM",
    location: "Community Sports Complex",
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
    description: "Learn about financial planning and investment strategies from expert advisors.",
    date: "2024-03-22",
    month: "MAR",
    day: "22",
    time: "Friday, 2:00 PM - 4:00 PM",
    location: "Online Event",
    color: "#AF52DE",
    category: "Workshop",
    organizer: "Community Development",
    capacity: 100,
    registered: 67,
    status: "upcoming",
    created_at: "2024-02-28T09:00:00Z",
    updated_at: "2024-02-28T09:00:00Z",
  },
  {
    id: 3,
    title: "Family Fun Fair",
    description: "Food stalls, games, and entertainment for the whole family.",
    date: "2024-04-05",
    month: "APR",
    day: "05",
    time: "Sunday, 10:00 AM - 6:00 PM",
    location: "Community Park",
    color: "#34C759",
    category: "Entertainment",
    organizer: "Events Committee",
    capacity: 500,
    registered: 312,
    status: "upcoming",
    created_at: "2024-02-25T14:00:00Z",
    updated_at: "2024-02-25T14:00:00Z",
  },
  {
    id: 4,
    title: "Health Screening Day",
    description: "Free health screening and consultation for all residents.",
    date: "2024-04-12",
    month: "APR",
    day: "12",
    time: "Saturday, 8:00 AM - 2:00 PM",
    location: "Community Hall",
    color: "#FF3B30",
    category: "Health",
    organizer: "Healthcare Committee",
    capacity: 150,
    registered: 98,
    status: "upcoming",
    created_at: "2024-02-20T11:00:00Z",
    updated_at: "2024-02-20T11:00:00Z",
  },
  {
    id: 5,
    title: "Gardening Workshop",
    description: "Learn urban gardening techniques and sustainable practices.",
    date: "2024-04-20",
    month: "APR",
    day: "20",
    time: "Sunday, 9:00 AM - 12:00 PM",
    location: "Community Garden",
    color: "#4A90E2",
    category: "Workshop",
    organizer: "Green Committee",
    capacity: 50,
    registered: 42,
    status: "upcoming",
    created_at: "2024-02-15T16:00:00Z",
    updated_at: "2024-02-15T16:00:00Z",
  },
];

export default function EventsScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [events, setEvents] = useState<Event[]>(MOCK_EVENTS);
  const [filterStatus, setFilterStatus] = useState<"all" | "upcoming" | "completed">("upcoming");

  const onRefresh = async () => {
    setRefreshing(true);
    // TODO: Call API to refresh events
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.location.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFilter = filterStatus === "all" || event.status === filterStatus;

    return matchesSearch && matchesFilter;
  });

  const handleEventPress = (event: Event) => {
    router.push(`/events/${event.id}`);
  };

  const getCapacityColor = (registered: number = 0, capacity: number = 100) => {
    const percentage = (registered / capacity) * 100;
    if (percentage >= 90) return "#FF3B30";
    if (percentage >= 70) return "#FF9500";
    return "#34C759";
  };

  return (
    <YStack flex={1} backgroundColor="#F5F5F5">
      <CustomHeader
        variant="default"
        title="Events"
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
              placeholder="Search events..."
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

        {/* Filter Tabs */}
        <XStack gap={8}>
          <TouchableOpacity
            onPress={() => setFilterStatus("all")}
            style={{ flex: 1 }}
          >
            <View
              backgroundColor={filterStatus === "all" ? "#4A90E2" : "white"}
              paddingVertical={12}
              paddingHorizontal={16}
              borderRadius={8}
              alignItems="center"
            >
              <Text
                fontSize={14}
                fontWeight="600"
                color={filterStatus === "all" ? "white" : "#666"}
              >
                All
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setFilterStatus("upcoming")}
            style={{ flex: 1 }}
          >
            <View
              backgroundColor={filterStatus === "upcoming" ? "#4A90E2" : "white"}
              paddingVertical={12}
              paddingHorizontal={16}
              borderRadius={8}
              alignItems="center"
            >
              <Text
                fontSize={14}
                fontWeight="600"
                color={filterStatus === "upcoming" ? "white" : "#666"}
              >
                Upcoming
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setFilterStatus("completed")}
            style={{ flex: 1 }}
          >
            <View
              backgroundColor={filterStatus === "completed" ? "#4A90E2" : "white"}
              paddingVertical={12}
              paddingHorizontal={16}
              borderRadius={8}
              alignItems="center"
            >
              <Text
                fontSize={14}
                fontWeight="600"
                color={filterStatus === "completed" ? "white" : "#666"}
              >
                Past
              </Text>
            </View>
          </TouchableOpacity>
        </XStack>

        {/* Results Count */}
        <Text fontSize={14} color="#666">
          {filteredEvents.length} event{filteredEvents.length !== 1 ? "s" : ""}
        </Text>
      </YStack>

      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <YStack padding={20} paddingTop={0} gap={16} paddingBottom={100}>
          {filteredEvents.map((event) => (
            <TouchableOpacity
              key={event.id}
              onPress={() => handleEventPress(event)}
              activeOpacity={0.7}
            >
              <Card
                backgroundColor="white"
                borderRadius={12}
                overflow="hidden"
                shadowColor="#000"
                shadowOffset={{ width: 0, height: 2 }}
                shadowOpacity={0.08}
                shadowRadius={8}
              >
                <XStack>
                  {/* Date Badge */}
                  <View
                    width={80}
                    backgroundColor={event.color || "#4A90E2"}
                    alignItems="center"
                    justifyContent="center"
                    padding={16}
                  >
                    <Text fontSize={12} fontWeight="600" color="white">
                      {event.month}
                    </Text>
                    <Text fontSize={32} fontWeight="700" color="white">
                      {event.day}
                    </Text>
                  </View>

                  {/* Content */}
                  <YStack flex={1} padding={16} gap={8}>
                    <Text fontSize={16} fontWeight="600" color="#000" numberOfLines={1}>
                      {event.title}
                    </Text>

                    <Text fontSize={14} color="#666" numberOfLines={2} lineHeight={20}>
                      {event.description}
                    </Text>

                    <YStack gap={6} marginTop={4}>
                      <XStack alignItems="center" gap={6}>
                        <Clock size={14} color="#999" />
                        <Text fontSize={13} color="#666" numberOfLines={1}>
                          {event.time}
                        </Text>
                      </XStack>

                      <XStack alignItems="center" gap={6}>
                        <MapPin size={14} color="#999" />
                        <Text fontSize={13} color="#666" numberOfLines={1}>
                          {event.location}
                        </Text>
                      </XStack>

                      {/* Capacity Bar */}
                      {event.capacity && (
                        <YStack gap={4} marginTop={4}>
                          <XStack justifyContent="space-between">
                            <Text fontSize={12} color="#999">
                              Registered
                            </Text>
                            <Text fontSize={12} fontWeight="600" color="#666">
                              {event.registered}/{event.capacity}
                            </Text>
                          </XStack>
                          <View
                            height={4}
                            backgroundColor="#F0F0F0"
                            borderRadius={2}
                            overflow="hidden"
                          >
                            <View
                              width={`${((event.registered || 0) / event.capacity) * 100}%`}
                              height="100%"
                              backgroundColor={getCapacityColor(
                                event.registered,
                                event.capacity
                              )}
                            />
                          </View>
                        </YStack>
                      )}
                    </YStack>
                  </YStack>
                </XStack>
              </Card>
            </TouchableOpacity>
          ))}

          {filteredEvents.length === 0 && (
            <YStack alignItems="center" justifyContent="center" paddingVertical={60}>
              <Calendar size={48} color="#CCC" />
              <Text fontSize={16} color="#999" marginTop={16}>
                No events found
              </Text>
            </YStack>
          )}
        </YStack>
      </ScrollView>
    </YStack>
  );
}
