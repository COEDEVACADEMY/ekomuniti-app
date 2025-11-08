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
import { router } from "expo-router";
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
import GenericSelect from "../../components/GenericSelect";
import { GenderService } from "../../services/genderService";
import { MemberService } from "../../services/memberService";
import { ApiError } from "../../types/auth";
import { CreateMemberPayload, Gender } from "../../types/member";

export default function CreateMemberScreen() {
  const [payload, setPayload] = useState<CreateMemberPayload>({
    fullname: "",
    email: "",
    phone_number: "",
    password: "",
    ic_number: "",
    gender: 0,
    id_state: 1, // Default value, adjust as needed
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [genders, setGenders] = useState<Gender[]>([]);

  useEffect(() => {
    const fetchGenders = async () => {
      try {
        const genderData = await GenderService.getGenders();
        setGenders(genderData);
      } catch (error) {
        console.error("Failed to fetch genders", error);
        setError("Failed to load gender options.");
      }
    };
    fetchGenders();
  }, []);

  const handleInputChange = (
    key: keyof CreateMemberPayload,
    value: string | number
  ) => {
    setPayload((prev) => ({ ...prev, [key]: value }));
  };

  const handleCreateMember = async () => {
    setError("");

    if (
      !payload.fullname ||
      !payload.email ||
      !payload.phone_number ||
      !payload.password ||
      !payload.ic_number ||
      !payload.gender
    ) {
      setError("Please fill all required fields.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await MemberService.createMember(payload);

      if (response.success) {
        Alert.alert("Success", "Member created successfully!", [
          {
            text: "OK",
            onPress: () => router.back(),
          },
        ]);
      } else {
        setError(response.message || "Failed to create member.");
      }
    } catch (err) {
      const apiError = err as ApiError;
      setError(apiError.message || "An error occurred. Please try again.");
      console.error("Create member error:", apiError);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <YStack flex={1} backgroundColor="#F5F5F5" padding={20}>
          <YStack gap={8} marginBottom={32}>
            <H2 fontSize={32} fontWeight="700" color="#1A2B4A">
              Create New Member
            </H2>
            <Text fontSize={16} color="#666">
              Fill in the details to add a new member.
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
              value={String(payload.id_state)}
              onChangeText={(text) =>
                handleInputChange("id_state", Number(text))
              }
              keyboardType="number-pad"
            />

            {/* Password */}
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
                  placeholder="Password"
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

            {/* Create Button */}
            <Button
              size="$5"
              backgroundColor={isLoading ? "#CCC" : "#4A90E2"}
              color="white"
              borderRadius={12}
              fontWeight="700"
              fontSize={16}
              marginTop={16}
              onPress={handleCreateMember}
              disabled={isLoading}
              pressStyle={{ scale: 0.98 }}
            >
              {isLoading ? <Spinner /> : "Create Member"}
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
