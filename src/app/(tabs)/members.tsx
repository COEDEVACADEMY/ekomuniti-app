import { useState } from "react";
import { ScrollView } from "react-native";
import { YStack, XStack, H5, Button } from "tamagui";
import CustomHeader from "../../components/CustomHeader";
import { MemberCard, SearchBar, FilterTabs } from "../../components/members";
import { StatCard } from "../../components/home";
import { Users, UserCheck, UserX, UserPlus } from "@tamagui/lucide-icons";

type FilterType = "All" | "Active" | "Inactive";

// Mock data - ganti dengan data dari API nanti
const MOCK_MEMBERS = [
  {
    id: "1",
    name: "Ahmad bin Abdullah",
    email: "ahmad@email.com",
    phone: "+60 12-345 6789",
    role: "Committee Member",
    status: "Active" as const,
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/png?seed=Ahmad",
  },
  {
    id: "2",
    name: "Siti Nurhaliza",
    email: "siti@email.com",
    phone: "+60 12-987 6543",
    role: "Treasurer",
    status: "Active" as const,
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/png?seed=Siti",
  },
  {
    id: "3",
    name: "Rahman Hassan",
    email: "rahman@email.com",
    phone: "+60 13-456 7890",
    role: "Member",
    status: "Active" as const,
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/png?seed=Rahman",
  },
  {
    id: "4",
    name: "Fatimah Zahra",
    email: "fatimah@email.com",
    phone: "+60 14-567 8901",
    role: "Secretary",
    status: "Inactive" as const,
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/png?seed=Fatimah",
  },
  {
    id: "5",
    name: "Muhammad Ali",
    email: "ali@email.com",
    phone: "+60 15-678 9012",
    role: "Member",
    status: "Active" as const,
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/png?seed=Ali",
  },
  {
    id: "6",
    name: "Nurul Aina",
    email: "nurul@email.com",
    phone: "+60 16-789 0123",
    role: "Member",
    status: "Inactive" as const,
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/png?seed=Nurul",
  },
];

export default function MembersScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<FilterType>("All");

  // Filter members based on search and filter
  const filteredMembers = MOCK_MEMBERS.filter((member) => {
    const matchesSearch =
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.phone.includes(searchQuery);

    const matchesFilter =
      activeFilter === "All" || member.status === activeFilter;

    return matchesSearch && matchesFilter;
  });

  const activeCount = MOCK_MEMBERS.filter((m) => m.status === "Active").length;
  const inactiveCount = MOCK_MEMBERS.filter((m) => m.status === "Inactive").length;

  return (
    <YStack flex={1} backgroundColor="#F5F5F5">
      <CustomHeader
        title="Members"
        showBackButton={true}
        showNotification={true}
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        <YStack padding={20} gap={20} paddingBottom={100}>

          {/* Stats Section */}
          <XStack gap={12}>
            <StatCard
              icon={Users}
              iconColor="#4A90E2"
              label="Total"
              value={MOCK_MEMBERS.length.toString()}
            />
            <StatCard
              icon={UserCheck}
              iconColor="#34C759"
              label="Active"
              value={activeCount.toString()}
            />
            <StatCard
              icon={UserX}
              iconColor="#FF3B30"
              label="Inactive"
              value={inactiveCount.toString()}
            />
          </XStack>

          {/* Add Member Button */}
          <Button
            backgroundColor="#4A90E2"
            color="white"
            borderRadius={12}
            fontWeight="600"
            icon={<UserPlus size={20} color="white" />}
            onPress={() => console.log("Add member")}
            pressStyle={{ scale: 0.98 }}
            shadowColor="#4A90E2"
            shadowOffset={{ width: 0, height: 2 }}
            shadowOpacity={0.2}
            shadowRadius={8}
          >
            Add New Member
          </Button>

          {/* Search Bar */}
          <SearchBar
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search by name, email, or phone..."
          />

          {/* Filter Tabs */}
          <FilterTabs
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
          />

          {/* Members List */}
          <YStack gap={12}>
            <H5 fontWeight="600" color="#333">
              {filteredMembers.length} Members Found
            </H5>

            {filteredMembers.length === 0 ? (
              <YStack
                padding={40}
                alignItems="center"
                justifyContent="center"
                gap={8}
              >
                <Users size={48} color="#CCC" />
                <H5 color="#999">No members found</H5>
              </YStack>
            ) : (
              filteredMembers.map((member) => (
                <MemberCard
                  key={member.id}
                  name={member.name}
                  email={member.email}
                  phone={member.phone}
                  role={member.role}
                  status={member.status}
                  avatarUrl={member.avatarUrl}
                  onPress={() => console.log("View member", member.id)}
                />
              ))
            )}
          </YStack>
        </YStack>
      </ScrollView>
    </YStack>
  );
}
