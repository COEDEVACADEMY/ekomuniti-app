import { useState, useEffect, useCallback } from "react";
import { ScrollView, RefreshControl, ActivityIndicator, Alert } from "react-native";
import { YStack, H5, Button, Text } from "tamagui";
import { router } from "expo-router";
import CustomHeader from "../../components/CustomHeader";
import { MemberCard, SearchBar, FilterTabs } from "../../components/members";
import { Users, UserPlus } from "@tamagui/lucide-icons";
import { MemberService } from "../../services/memberService";
import { Member, getMemberFullname, getMemberEmail, getMemberPhone } from "../../types/member";
import React from "react";

type FilterType = "All" | "Active" | "Inactive" | "Pending";

export default function MembersScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<FilterType>("All");
  const [members, setMembers] = useState<Member[]>([]);
  const [allMembers, setAllMembers] = useState<Member[]>([]); // Store all members for filtering
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadMembers();
  }, []);

  const loadMembers = async () => {
    try {
      setIsLoading(true);

      const response = await MemberService.getMembers();

      console.log("Members API Response:", JSON.stringify(response, null, 2));

      if (response.success && Array.isArray(response.data)) {
        setAllMembers(response.data);
      } else {
        console.warn("Invalid response format:", response);
        setAllMembers([]);
      }
    } catch (error: any) {
      console.error("Failed to load members:", error);
      setAllMembers([]);

      if (error?.message?.includes("Session expired")) {
        router.replace("/login");
      } else {
        Alert.alert("Error", "Failed to load members. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const applyFilters = useCallback(() => {
    let filtered = [...allMembers];

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter((member) => {
        const fullname = getMemberFullname(member).toLowerCase();
        const email = getMemberEmail(member).toLowerCase();
        const phone = getMemberPhone(member).toLowerCase();
        return fullname.includes(query) || email.includes(query) || phone.includes(query);
      });
    }

    // Apply status filter
    if (activeFilter !== "All") {
      filtered = filtered.filter((member) => {
        const status = member.status_approval;
        if (activeFilter === "Active") return status === "APPROVED";
        if (activeFilter === "Inactive") return status === "REJECTED";
        if (activeFilter === "Pending") return status === "PENDING" || status === "WAITING";
        return true;
      });
    }

    setMembers(filtered);
  }, [allMembers, searchQuery, activeFilter]);

  // Apply filters when search query or active filter changes
  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  const onRefresh = async () => {
    setRefreshing(true);
    await loadMembers();
    setRefreshing(false);
  };

  const getDisplayStatus = (member: Member): "Active" | "Inactive" => {
    return member.status_approval === "APPROVED" ? "Active" : "Inactive";
  };

  const getDisplayRole = (member: Member): string => {
    if (member.status_approval === "APPROVED") return "Verified Member";
    if (member.status_approval === "PENDING" || member.status_approval === "WAITING") return "Pending Verification";
    return "Inactive Member";
  };

  return (
    <YStack flex={1} backgroundColor="#F5F5F5">
      <CustomHeader
        title="Members"
        showBackButton={true}
        showNotification={true}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <YStack padding={20} gap={20} paddingBottom={100}>
          {/* Add Member Button */}
          <Button
            backgroundColor="#4A90E2"
            color="white"
            borderRadius={12}
            fontWeight="600"
            icon={<UserPlus size={20} color="white" />}
            onPress={() => router.push("/members/create")}
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
              {members.length} Members Found
            </H5>

            {isLoading && !refreshing ? (
              <YStack
                padding={40}
                alignItems="center"
                justifyContent="center"
                gap={8}
              >
                <ActivityIndicator size="large" color="#4A90E2" />
                <Text color="#999">Loading members...</Text>
              </YStack>
            ) : members.length === 0 ? (
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
              members.map((member) => (
                <MemberCard
                  key={member.id}
                  name={getMemberFullname(member)}
                  email={getMemberEmail(member)}
                  phone={getMemberPhone(member)}
                  role={getDisplayRole(member)}
                  status={getDisplayStatus(member)}
                  avatarUrl={`https://api.dicebear.com/7.x/avataaars/png?seed=${getMemberFullname(member)}`}
                  onPress={() => router.push(`/members/edit/${member.id_detail_manpower}`)}
                />
              ))
            )}

            {/* Summary Info */}
            {!isLoading && members.length > 0 && (
              <YStack alignItems="center" paddingVertical={16}>
                <Text fontSize={14} color="#666">
                  Showing {members.length} of {allMembers.length} total members
                </Text>
              </YStack>
            )}
          </YStack>
        </YStack>
      </ScrollView>
    </YStack>
  );
}
