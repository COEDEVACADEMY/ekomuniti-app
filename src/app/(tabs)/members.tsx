import { useState, useEffect } from "react";
import { ScrollView, RefreshControl, ActivityIndicator, Alert } from "react-native";
import { YStack, XStack, H5, Button, Text } from "tamagui";
import { router } from "expo-router";
import CustomHeader from "../../components/CustomHeader";
import { MemberCard, SearchBar, FilterTabs } from "../../components/members";
import { StatCard } from "../../components/home";
import { Users, UserCheck, UserX, UserPlus, Clock } from "@tamagui/lucide-icons";
import { MemberService } from "../../services/memberService";
import { Member, TotalMemberStats } from "../../types/member";
import React from "react";
import { ASSET_BASE_URL } from "../../config/api";

type FilterType = "All" | "Active" | "Inactive" | "Pending";

export default function MembersScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<FilterType>("All");
  const [members, setMembers] = useState<Member[]>([]);
  const [memberStats, setMemberStats] = useState<TotalMemberStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    // Reload data when search or filter changes
    loadMembers();
  }, [searchQuery, activeFilter, currentPage]);

  const loadData = async () => {
    await Promise.all([loadMemberStats(), loadMembers()]);
  };

  const loadMemberStats = async () => {
    try {
      const response = await MemberService.getTotalMembers();
      if (response.success) {
        setMemberStats(response.data);
      }
    } catch (error: any) {
      console.error("Failed to load member stats:", error);

      if (error?.message?.includes("Session expired")) {
        router.replace("/login");
      }
    }
  };

  const loadMembers = async () => {
    try {
      setIsLoading(true);

      const response = await MemberService.getMembers(
        currentPage,
        10,
        searchQuery.trim() || undefined
      );

      if (response.success) {
        setMembers(response.data);
        setTotalPages(response.pagination.last_page);
      }
    } catch (error: any) {
      console.error("Failed to load members:", error);

      if (error?.message?.includes("Session expired")) {
        router.replace("/login");
      } else {
        Alert.alert("Error", "Failed to load members. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    setCurrentPage(1);
    await loadData();
    setRefreshing(false);
  };

  // Filter members based on local filter (after fetching from API)
  const filteredMembers = members.filter((member) => {
    if (activeFilter === "All") return true;
    if (activeFilter === "Active") return member.user.status === "ACTIVE";
    if (activeFilter === "Inactive") return member.user.status !== "ACTIVE";
    if (activeFilter === "Pending") return member.subscribe_status === "UNPAID";
    return true;
  });

  const getMemberStatus = (member: Member): "Active" | "Inactive" => {
    return member.user.status === "ACTIVE" ? "Active" : "Inactive";
  };

  const getMemberRole = (member: Member): string => {
    if (member.user.is_verified === 1) {
      return "Verified Member";
    }
    return "Pending Verification";
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

          {/* Stats Section */}
          <YStack gap={12}>
            <XStack gap={12}>
              <StatCard
                icon={Users}
                iconColor="#4A90E2"
                label="Total"
                value={memberStats?.total_member.toString() || "0"}
              />
              <StatCard
                icon={UserCheck}
                iconColor="#34C759"
                label="Active"
                value={memberStats?.total_active.toString() || "0"}
              />
            </XStack>
            <XStack gap={12}>
              <StatCard
                icon={Clock}
                iconColor="#FF9500"
                label="Pending"
                value={memberStats?.total_pending.toString() || "0"}
              />
              <StatCard
                icon={UserX}
                iconColor="#FF3B30"
                label="Expired"
                value={memberStats?.total_expired.toString() || "0"}
              />
            </XStack>
          </YStack>

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
            ) : filteredMembers.length === 0 ? (
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
                  key={member.id_user}
                  name={member.user.fullname}
                  email={member.user.email}
                  phone={member.user.phone_number}
                  role={getMemberRole(member)}
                  status={getMemberStatus(member)}
                  avatarUrl={member.user.photo ? `${ASSET_BASE_URL}/Profil/${member.user.photo}` : `https://api.dicebear.com/7.x/avataaars/png?seed=${member.user.fullname}`}
                  onPress={() => router.push(`/members/${member.id_detail_manpower}`)}
                />
              ))
            )}

            {/* Pagination Info */}
            {!isLoading && filteredMembers.length > 0 && (
              <YStack alignItems="center" paddingVertical={16}>
                <Text fontSize={14} color="#666">
                  Page {currentPage} of {totalPages}
                </Text>
                <Text fontSize={12} color="#999" marginTop={4}>
                  Showing {filteredMembers.length} of {memberStats?.total_member || 0} members
                </Text>
              </YStack>
            )}
          </YStack>
        </YStack>
      </ScrollView>
    </YStack>
  );
}
