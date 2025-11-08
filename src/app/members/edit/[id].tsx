import {
  Eye,
  EyeOff,
  Hash,
  Lock,
  Mail,
  MapPin,
  Phone,
  User,
  Users,
} from "@tamagui/lucide-icons";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import {
  Button,
  Card,
  H2,
  Input,
  Spinner,
  Text,
  XStack,
  YStack,
} from "tamagui";
import GenericSelect from "../../../components/GenericSelect";
import { GenderService } from "../../../services/genderService";
import { MemberService } from "../../../services/memberService";
import { ApiError } from "../../../types/auth";
import { Gender, UpdateMemberPayload } from "../../../types/member";

export default function UpdateMemberScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [payload, setPayload] = useState<UpdateMemberPayload>({});
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [genders, setGenders] = useState<Gender[]>([]);

  useEffect(() => {
    if (id) {
      fetchData();
    }
  }, [id]);

  const fetchData = async () => {
    try {
      const [memberResponse, genderData] = await Promise.all([
        MemberService.getMemberDetail(Number(id)),
        GenderService.getGenders(),
      ]);

      if (memberResponse.success) {
        const member = memberResponse.data;
        console.log("Member detail data:", JSON.stringify(member, null, 2));

        setPayload({
          fullname: member.user?.fullname || "",
          email: member.user?.email || "",
          phone_number: member.user?.phone_number || "",
          ic_number: member.ic_number || "",
          gender: member.gender || undefined,
          id_state: member.id_state || undefined,
          id_city: member.id_city || undefined,
          id_parliament: member.id_parliament || undefined,
          id_dun: member.id_dun || undefined,
          postcode: String(member.postcode || ""),
          address: member.address || "",
          marital_status: member.marital_status || undefined,
          native_status: member.native_status
            ? String(member.native_status)
            : undefined,
          id_agama: member.id_agama || undefined,
          id_nation: member.id_nation || undefined,
        });
      } else {
        setError("Failed to fetch member data.");
      }

      setGenders(genderData);
    } catch (err) {
      setError("An error occurred while fetching data.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (
    key: keyof UpdateMemberPayload,
    value: string | number
  ) => {
    setPayload((prev) => ({ ...prev, [key]: value }));
  };

  const handleUpdateMember = async () => {
    if (!id) return;

    setError("");
    setIsLoading(true);

    try {
      const response = await MemberService.updateMember(Number(id), payload);

      if (response.success) {
        Alert.alert("Success", "Member updated successfully!", [
          {
            text: "OK",
            onPress: () => router.back(),
          },
        ]);
      } else {
        setError(response.message || "Failed to update member.");
      }
    } catch (err) {
      const apiError = err as ApiError;
      setError(apiError.message || "An error occurred. Please try again.");
      console.error("Update member error:", apiError);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <YStack flex={1} justifyContent="center" alignItems="center">
        <Spinner size="large" />
        <Text>Loading Member...</Text>
      </YStack>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <YStack flex={1} backgroundColor="#F5F5F5" padding={20}>
          <YStack gap={8} marginBottom={32}>
            <H2 fontSize={32} fontWeight="700" color="#1A2B4A">
              Edit Member
            </H2>
            <Text fontSize={16} color="#666">
              Update the details of the member.
            </Text>
          </YStack>

          <YStack gap={16}>
            {/* Full Name */}
            <InputWithIcon
              icon={<User size={20} color="#999" />}
              placeholder="Full Name"
              value={payload.fullname}
              onChangeText={(text) => handleInputChange("fullname", text)}
            />

            {/* Email */}
            <InputWithIcon
              icon={<Mail size={20} color="#999" />}
              placeholder="Email"
              value={payload.email}
              onChangeText={(text) => handleInputChange("email", text)}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            {/* Phone Number */}
            <InputWithIcon
              icon={<Phone size={20} color="#999" />}
              placeholder="Phone Number"
              value={payload.phone_number}
              onChangeText={(text) => handleInputChange("phone_number", text)}
              keyboardType="phone-pad"
            />

            {/* IC Number */}
            <InputWithIcon
              icon={<Hash size={20} color="#999" />}
              placeholder="IC Number"
              value={payload.ic_number}
              onChangeText={(text) => handleInputChange("ic_number", text)}
              keyboardType="number-pad"
            />

            {/* Gender */}
            <GenericSelect
              icon={<Users size={20} color="#999" />}
              options={genders.map((g) => ({
                id: g.id_gender,
                label: g.gender,
              }))}
              selectedId={payload.gender}
              onSelect={(id) => handleInputChange("gender", id)}
              placeholder="Select Gender"
            />

            {/* id_state */}
            <InputWithIcon
              icon={<MapPin size={20} color="#999" />}
              placeholder="State ID"
              value={String(payload.id_state || "")}
              onChangeText={(text) =>
                handleInputChange("id_state", Number(text))
              }
              keyboardType="number-pad"
            />

            {/* Password (Optional) */}
            <Card
              backgroundColor="white"
              borderRadius={12}
              padding={16}
              shadowColor="#000"
              shadowOffset={{ width: 0, height: 1 }}
              shadowOpacity={0.05}
              shadowRadius={4}
            >
              <XStack alignItems="center" gap={12}>
                <Lock size={20} color="#999" />
                <Input
                  flex={1}
                  placeholder="New Password (optional)"
                  value={payload.password}
                  onChangeText={(text) => handleInputChange("password", text)}
                  secureTextEntry={!showPassword}
                  borderWidth={0}
                  backgroundColor="transparent"
                  fontSize={14}
                  placeholderTextColor="#999"
                  padding={0}
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff size={20} color="#999" />
                  ) : (
                    <Eye size={20} color="#999" />
                  )}
                </TouchableOpacity>
              </XStack>
            </Card>

            {/* Error Message */}
            {error ? (
              <Card
                backgroundColor="#FF3B3015"
                borderRadius={8}
                padding={12}
                borderWidth={1}
                borderColor="#FF3B30"
              >
                <Text fontSize={13} color="#FF3B30" textAlign="center">
                  {error}
                </Text>
              </Card>
            ) : null}

            {/* Update Button */}
            <Button
              size="$5"
              backgroundColor={isLoading ? "#CCC" : "#4A90E2"}
              color="white"
              borderRadius={12}
              fontWeight="700"
              fontSize={16}
              marginTop={16}
              onPress={handleUpdateMember}
              disabled={isLoading}
              pressStyle={{ scale: 0.98 }}
            >
              {isLoading ? <Spinner /> : "Update Member"}
            </Button>
          </YStack>
        </YStack>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

// Helper component for input with icon
const InputWithIcon = ({ icon, ...props }) => (
  <Card
    backgroundColor="white"
    borderRadius={12}
    padding={16}
    shadowColor="#000"
    shadowOffset={{ width: 0, height: 1 }}
    shadowOpacity={0.05}
    shadowRadius={4}
  >
    <XStack alignItems="center" gap={12}>
      {icon}
      <Input
        flex={1}
        borderWidth={0}
        backgroundColor="transparent"
        fontSize={14}
        placeholderTextColor="#999"
        padding={0}
        {...props}
      />
    </XStack>
  </Card>
);
