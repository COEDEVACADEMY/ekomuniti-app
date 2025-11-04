import { useState, useEffect } from "react";
import { ScrollView, Alert, ActivityIndicator } from "react-native";
import { YStack, XStack, Card, Text, View, Button } from "tamagui";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  CheckCircle,
  XCircle,
  CreditCard,
  FileText,
  Award,
} from "@tamagui/lucide-icons";
import { router, useLocalSearchParams } from "expo-router";
import CustomHeader from "../../components/CustomHeader";
import { MemberService } from "../../services/memberService";
import { Member } from "../../types/member";
import React from "react";
import { Image } from "react-native";
import { ASSET_BASE_URL } from "../../config/api";

export default function MemberDetailScreen() {
  const { id } = useLocalSearchParams();
  const [member, setMember] = useState<Member | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (id) {
      loadMemberDetail();
    }
  }, [id]);

  const loadMemberDetail = async () => {
    try {
      setIsLoading(true);

      const response = await MemberService.getMemberDetail(parseInt(id as string));

      if (response.success) {
        setMember(response.data);
        console.log("Member detail loaded:", response.data);
      }
    } catch (error: any) {
      console.error("Failed to load member detail:", error);

      if (error?.message?.includes("Session expired")) {
        router.replace("/login");
      } else {
        Alert.alert("Error", "Failed to load member details");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-MY", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const getStatusColor = (status: string) => {
    if (status === "ACTIVE") return "#34C759";
    if (status === "INACTIVE") return "#FF3B30";
    return "#FF9500";
  };

  const getStatusIcon = (status: string) => {
    if (status === "ACTIVE") return CheckCircle;
    if (status === "INACTIVE") return XCircle;
    return XCircle;
  };

  if (isLoading) {
    return (
      <YStack flex={1} backgroundColor="#F5F5F5">
        <CustomHeader
          variant="default"
          title="Member Details"
          showBackButton={true}
          showNotification={false}
        />
        <YStack flex={1} alignItems="center" justifyContent="center" gap={12}>
          <ActivityIndicator size="large" color="#4A90E2" />
          <Text fontSize={16} color="#999">
            Loading member details...
          </Text>
        </YStack>
      </YStack>
    );
  }

  if (!member) {
    return (
      <YStack flex={1} backgroundColor="#F5F5F5">
        <CustomHeader
          variant="default"
          title="Member Details"
          showBackButton={true}
          showNotification={false}
        />
        <YStack flex={1} alignItems="center" justifyContent="center">
          <User size={48} color="#CCC" />
          <Text fontSize={16} color="#999" marginTop={16}>
            Member not found
          </Text>
        </YStack>
      </YStack>
    );
  }

  const StatusIcon = getStatusIcon(member.user.status);

  return (
    <YStack flex={1} backgroundColor="#F5F5F5">
      <CustomHeader
        variant="default"
        title="Member Details"
        showBackButton={true}
        showNotification={false}
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        <YStack padding={20} gap={20} paddingBottom={100}>
          {/* Profile Header */}
          <Card
            backgroundColor="white"
            borderRadius={12}
            padding={24}
            alignItems="center"
            shadowColor="#000"
            shadowOffset={{ width: 0, height: 2 }}
            shadowOpacity={0.08}
            shadowRadius={8}
          >
            <View
              width={100}
              height={100}
              borderRadius={50}
              backgroundColor="#E0E0E0"
              alignItems="center"
              justifyContent="center"
              marginBottom={16}
            >
              {member.user.photo ? (
                <Image
                  source={{ uri: `${ASSET_BASE_URL}/Profil/${member.user.photo}` }}
                  style={{ width: 100, height: 100, borderRadius: 50 }}
                />
              ) : (
                <User size={48} color="#999" />
              )}
            </View>

            <Text fontSize={22} fontWeight="700" color="#000" textAlign="center">
              {member.user.fullname}
            </Text>
            <Text fontSize={14} color="#666" marginTop={4}>
              {member.user.email}
            </Text>

            {/* Status Badge */}
            <XStack gap={8} marginTop={12}>
              <View
                backgroundColor={`${getStatusColor(member.user.status)}20`}
                paddingHorizontal={12}
                paddingVertical={6}
                borderRadius={20}
                flexDirection="row"
                alignItems="center"
                gap={4}
              >
                <StatusIcon size={14} color={getStatusColor(member.user.status)} />
                <Text fontSize={13} fontWeight="600" color={getStatusColor(member.user.status)}>
                  {member.user.status}
                </Text>
              </View>

              {member.user.is_verified === 1 && (
                <View
                  backgroundColor="#4A90E220"
                  paddingHorizontal={12}
                  paddingVertical={6}
                  borderRadius={20}
                  flexDirection="row"
                  alignItems="center"
                  gap={4}
                >
                  <Award size={14} color="#4A90E2" />
                  <Text fontSize={13} fontWeight="600" color="#4A90E2">
                    Verified
                  </Text>
                </View>
              )}
            </XStack>
          </Card>

          {/* Contact Information */}
          <Card
            backgroundColor="white"
            borderRadius={12}
            padding={20}
            shadowColor="#000"
            shadowOffset={{ width: 0, height: 2 }}
            shadowOpacity={0.08}
            shadowRadius={8}
          >
            <Text fontSize={18} fontWeight="600" color="#000" marginBottom={16}>
              Contact Information
            </Text>

            <YStack gap={16}>
              <XStack alignItems="center" gap={12}>
                <View
                  width={40}
                  height={40}
                  borderRadius={20}
                  backgroundColor="#4A90E220"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Mail size={18} color="#4A90E2" />
                </View>
                <YStack flex={1}>
                  <Text fontSize={13} color="#999">
                    Email
                  </Text>
                  <Text fontSize={15} color="#333">
                    {member.user.email}
                  </Text>
                </YStack>
              </XStack>

              <XStack alignItems="center" gap={12}>
                <View
                  width={40}
                  height={40}
                  borderRadius={20}
                  backgroundColor="#34C75920"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Phone size={18} color="#34C759" />
                </View>
                <YStack flex={1}>
                  <Text fontSize={13} color="#999">
                    Phone Number
                  </Text>
                  <Text fontSize={15} color="#333">
                    {member.user.phone_number}
                  </Text>
                </YStack>
              </XStack>

              <XStack alignItems="center" gap={12}>
                <View
                  width={40}
                  height={40}
                  borderRadius={20}
                  backgroundColor="#FF950020"
                  alignItems="center"
                  justifyContent="center"
                >
                  <CreditCard size={18} color="#FF9500" />
                </View>
                <YStack flex={1}>
                  <Text fontSize={13} color="#999">
                    IC Number
                  </Text>
                  <Text fontSize={15} color="#333">
                    {member.ic_number || "-"}
                  </Text>
                </YStack>
              </XStack>
            </YStack>
          </Card>

          {/* Membership Information */}
          <Card
            backgroundColor="white"
            borderRadius={12}
            padding={20}
            shadowColor="#000"
            shadowOffset={{ width: 0, height: 2 }}
            shadowOpacity={0.08}
            shadowRadius={8}
          >
            <Text fontSize={18} fontWeight="600" color="#000" marginBottom={16}>
              Membership Details
            </Text>

            <YStack gap={16}>
              <XStack alignItems="center" gap={12}>
                <View
                  width={40}
                  height={40}
                  borderRadius={20}
                  backgroundColor="#AF52DE20"
                  alignItems="center"
                  justifyContent="center"
                >
                  <FileText size={18} color="#AF52DE" />
                </View>
                <YStack flex={1}>
                  <Text fontSize={13} color="#999">
                    Native Status
                  </Text>
                  <Text fontSize={15} color="#333">
                    {member.status_native_text || "-"}
                  </Text>
                </YStack>
              </XStack>

              <XStack alignItems="center" gap={12}>
                <View
                  width={40}
                  height={40}
                  borderRadius={20}
                  backgroundColor="#FF3B3020"
                  alignItems="center"
                  justifyContent="center"
                >
                  <MapPin size={18} color="#FF3B30" />
                </View>
                <YStack flex={1}>
                  <Text fontSize={13} color="#999">
                    Persatuan
                  </Text>
                  <Text fontSize={15} color="#333">
                    {member.persatuan || "-"}
                  </Text>
                </YStack>
              </XStack>

              <XStack alignItems="center" gap={12}>
                <View
                  width={40}
                  height={40}
                  borderRadius={20}
                  backgroundColor="#34C75920"
                  alignItems="center"
                  justifyContent="center"
                >
                  <CreditCard size={18} color="#34C759" />
                </View>
                <YStack flex={1}>
                  <Text fontSize={13} color="#999">
                    Subscribe Status
                  </Text>
                  <Text fontSize={15} color="#333">
                    {member.subscribe_status}
                  </Text>
                </YStack>
              </XStack>

              <XStack alignItems="center" gap={12}>
                <View
                  width={40}
                  height={40}
                  borderRadius={20}
                  backgroundColor="#4A90E220"
                  alignItems="center"
                  justifyContent="center"
                >
                  <FileText size={18} color="#4A90E2" />
                </View>
                <YStack flex={1}>
                  <Text fontSize={13} color="#999">
                    Invoice Status
                  </Text>
                  <Text fontSize={15} color="#333">
                    {member.invoice}
                  </Text>
                </YStack>
              </XStack>

              <XStack alignItems="center" gap={12}>
                <View
                  width={40}
                  height={40}
                  borderRadius={20}
                  backgroundColor="#FF950020"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Calendar size={18} color="#FF9500" />
                </View>
                <YStack flex={1}>
                  <Text fontSize={13} color="#999">
                    Member Since
                  </Text>
                  <Text fontSize={15} color="#333">
                    {formatDate(member.created_at)}
                  </Text>
                </YStack>
              </XStack>
            </YStack>
          </Card>

          {/* Business Information (if available) */}
          {member.business_type_name && (
            <Card
              backgroundColor="white"
              borderRadius={12}
              padding={20}
              shadowColor="#000"
              shadowOffset={{ width: 0, height: 2 }}
              shadowOpacity={0.08}
              shadowRadius={8}
            >
              <Text fontSize={18} fontWeight="600" color="#000" marginBottom={16}>
                Business Information
              </Text>

              <YStack gap={16}>
                <YStack gap={4}>
                  <Text fontSize={13} color="#999">
                    Business Type
                  </Text>
                  <Text fontSize={15} color="#333">
                    {member.business_type_name || "-"}
                  </Text>
                </YStack>

                <YStack gap={4}>
                  <Text fontSize={13} color="#999">
                    Business Activity
                  </Text>
                  <Text fontSize={15} color="#333">
                    {member.business_activity_name || "-"}
                  </Text>
                </YStack>

                {member.business_license_no && (
                  <YStack gap={4}>
                    <Text fontSize={13} color="#999">
                      Business License No
                    </Text>
                    <Text fontSize={15} color="#333">
                      {member.business_license_no}
                    </Text>
                  </YStack>
                )}
              </YStack>
            </Card>
          )}

          {/* Action Buttons */}
          <XStack gap={12}>
            <Button
              flex={1}
              size="$5"
              backgroundColor="white"
              color="#4A90E2"
              borderRadius={12}
              borderWidth={1}
              borderColor="#4A90E2"
              onPress={() => {
                Alert.alert("Contact", `Call ${member.user.phone_number}?`);
              }}
              icon={<Phone size={20} color="#4A90E2" />}
              pressStyle={{ scale: 0.98 }}
            >
              Contact
            </Button>

            <Button
              flex={1}
              size="$5"
              backgroundColor="#4A90E2"
              color="white"
              borderRadius={12}
              onPress={() => {
                Alert.alert("Email", `Send email to ${member.user.email}?`);
              }}
              icon={<Mail size={20} color="white" />}
              pressStyle={{ scale: 0.98 }}
              shadowColor="#4A90E2"
              shadowOffset={{ width: 0, height: 4 }}
              shadowOpacity={0.3}
              shadowRadius={8}
            >
              Email
            </Button>
          </XStack>
        </YStack>
      </ScrollView>
    </YStack>
  );
}
