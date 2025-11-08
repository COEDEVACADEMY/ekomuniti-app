import {
  Camera,
  Mail,
  Pencil,
  Phone,
  Save,
  User,
  X,
} from "@tamagui/lucide-icons";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, Image, ScrollView, TouchableOpacity } from "react-native";
import { Button, Card, Input, Text, View, XStack, YStack } from "tamagui";
import CustomHeader from "../components/CustomHeader";
import { AuthService } from "../services/authService";
import { ProfileUpdatePayload, User as UserType } from "../types/auth";
import { TokenStorage } from "../utils/tokenStorage";
import React from "react";
import * as ImagePicker from "expo-image-picker";
import { ASSET_BASE_URL } from "../config/api";

export default function ProfileScreen() {
  const [user, setUser] = useState<UserType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Form fields - only 4 editable fields
  const [fullname, setFullname] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState<string | null>(null);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      setIsLoading(true);

      // Get cached user first
      const cachedUser = await TokenStorage.getUser();
      if (cachedUser) {
        setUser(cachedUser);
        populateForm(cachedUser);
      }

      // Fetch fresh data from API
      const response = await AuthService.getMe();
      if (response.success) {
        setUser(response.data);
        populateForm(response.data);
        await TokenStorage.saveUser(response.data);
      }
    } catch (error: any) {
      console.error("Failed to load user data:", error);

      if (error?.message?.includes("Session expired")) {
        router.replace("/login");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const populateForm = (userData: UserType) => {
    setFullname(userData.fullname || "");
    setPhoneNumber(userData.phone_number || "");
    setEmail(userData.email || "");
    setImage(null); // Reset image selection
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    if (user) {
      populateForm(user);
    }
    setIsEditing(false);
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);

      // Validate
      if (!fullname.trim()) {
        Alert.alert("Error", "Full name is required");
        return;
      }

      if (!email.trim()) {
        Alert.alert("Error", "Email is required");
        return;
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        Alert.alert("Error", "Please enter a valid email address");
        return;
      }

      const payload: ProfileUpdatePayload = {
        fullname,
        phone_number: phoneNumber,
        email,
        img: image || undefined,
      };

      console.log("=== Sending Profile Update ===");
      console.log("Payload:", JSON.stringify(payload, null, 2));

      const response = await AuthService.updateProfile(payload);

      console.log("=== Profile Update Success ===");
      console.log("Response:", JSON.stringify(response, null, 2));

      // Update local state and storage
      setUser(response.data);
      await TokenStorage.saveUser(response.data);

      setIsEditing(false);
      setImage(null);

      Alert.alert("Success", response.message || "Profile updated successfully!");
    } catch (error: any) {
      console.error("=== Profile Update Failed ===");
      console.error("Error object:", JSON.stringify(error, null, 2));
      console.error("Error message:", error.message);
      console.error("Error status:", error.status);
      console.error("Error errors:", JSON.stringify(error.errors, null, 2));

      // Show detailed error message
      const errorMessage = error.message || "Failed to update profile";
      Alert.alert("Error", errorMessage);
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <YStack flex={1} backgroundColor="#F5F5F5">
        <CustomHeader
          variant="default"
          title="Profile"
          showBackButton={true}
          showNotification={false}
        />
        <YStack flex={1} alignItems="center" justifyContent="center">
          <Text fontSize={16} color="#999">
            Loading...
          </Text>
        </YStack>
      </YStack>
    );
  }

  const profileImageUrl = image
    ? image
    : user?.photo
    ? `${ASSET_BASE_URL}/Profil/${user.photo}`
    : undefined;

  return (
    <YStack flex={1} backgroundColor="#F5F5F5">
      <CustomHeader
        variant="default"
        title={isEditing ? "Edit Profile" : "Profile"}
        showBackButton={true}
        showNotification={false}
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        <YStack padding={20} gap={20} paddingBottom={100}>
          {/* Avatar Section */}
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
              {profileImageUrl ? (
                <Image
                  source={{ uri: profileImageUrl }}
                  style={{ width: 100, height: 100, borderRadius: 50 }}
                />
              ) : (
                <User size={48} color="#999" />
              )}

              {isEditing && (
                <TouchableOpacity
                  onPress={pickImage}
                  style={{
                    position: "absolute",
                    bottom: 0,
                    right: 0,
                    backgroundColor: "#4A90E2",
                    padding: 8,
                    borderRadius: 20,
                    borderWidth: 2,
                    borderColor: "white",
                  }}
                >
                  <Camera size={18} color="white" />
                </TouchableOpacity>
              )}
            </View>

            {!isEditing && (
              <>
                <Text
                  fontSize={22}
                  fontWeight="700"
                  color="#000"
                  textAlign="center"
                >
                  {user?.fullname || "User"}
                </Text>
                <Text fontSize={14} color="#666" marginTop={4}>
                  {user?.email || "email@example.com"}
                </Text>

                <View
                  backgroundColor="#4A90E220"
                  paddingHorizontal={12}
                  paddingVertical={6}
                  borderRadius={20}
                  marginTop={12}
                >
                  <Text fontSize={13} fontWeight="600" color="#4A90E2">
                    {user?.status || "ACTIVE"}
                  </Text>
                </View>
              </>
            )}
          </Card>

          {/* Profile Information */}
          <Card
            backgroundColor="white"
            borderRadius={12}
            padding={20}
            shadowColor="#000"
            shadowOffset={{ width: 0, height: 2 }}
            shadowOpacity={0.08}
            shadowRadius={8}
          >
            <XStack
              justifyContent="space-between"
              alignItems="center"
              marginBottom={20}
            >
              <Text fontSize={18} fontWeight="600" color="#000">
                Profile Information
              </Text>
              {!isEditing && (
                <TouchableOpacity onPress={handleEdit}>
                  <View
                    backgroundColor="#4A90E220"
                    padding={8}
                    borderRadius={8}
                  >
                    <Pencil size={18} color="#4A90E2" />
                  </View>
                </TouchableOpacity>
              )}
            </XStack>

            <YStack gap={20}>
              {/* Full Name */}
              <YStack gap={8}>
                <Text fontSize={14} fontWeight="600" color="#333">
                  Full Name
                </Text>
                {isEditing ? (
                  <Card backgroundColor="#F8F9FA" borderRadius={8} padding={12}>
                    <Input
                      value={fullname}
                      onChangeText={setFullname}
                      placeholder="Enter full name"
                      borderWidth={0}
                      backgroundColor="transparent"
                      fontSize={15}
                      padding={0}
                    />
                  </Card>
                ) : (
                  <XStack alignItems="center" gap={12}>
                    <View
                      width={40}
                      height={40}
                      borderRadius={20}
                      backgroundColor="#4A90E220"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <User size={18} color="#4A90E2" />
                    </View>
                    <Text fontSize={15} color="#666" flex={1}>
                      {user?.fullname || "-"}
                    </Text>
                  </XStack>
                )}
              </YStack>

              {/* Email */}
              <YStack gap={8}>
                <Text fontSize={14} fontWeight="600" color="#333">
                  Email Address
                </Text>
                {isEditing ? (
                  <Card backgroundColor="#F8F9FA" borderRadius={8} padding={12}>
                    <Input
                      value={email}
                      onChangeText={setEmail}
                      placeholder="Enter email"
                      keyboardType="email-address"
                      autoCapitalize="none"
                      borderWidth={0}
                      backgroundColor="transparent"
                      fontSize={15}
                      padding={0}
                    />
                  </Card>
                ) : (
                  <XStack alignItems="center" gap={12}>
                    <View
                      width={40}
                      height={40}
                      borderRadius={20}
                      backgroundColor="#34C75920"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Mail size={18} color="#34C759" />
                    </View>
                    <Text fontSize={15} color="#666" flex={1}>
                      {user?.email || "-"}
                    </Text>
                  </XStack>
                )}
              </YStack>

              {/* Phone */}
              <YStack gap={8}>
                <Text fontSize={14} fontWeight="600" color="#333">
                  Phone Number
                </Text>
                {isEditing ? (
                  <Card backgroundColor="#F8F9FA" borderRadius={8} padding={12}>
                    <Input
                      value={phoneNumber}
                      onChangeText={setPhoneNumber}
                      placeholder="Enter phone number"
                      keyboardType="phone-pad"
                      borderWidth={0}
                      backgroundColor="transparent"
                      fontSize={15}
                      padding={0}
                    />
                  </Card>
                ) : (
                  <XStack alignItems="center" gap={12}>
                    <View
                      width={40}
                      height={40}
                      borderRadius={20}
                      backgroundColor="#FF950020"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Phone size={18} color="#FF9500" />
                    </View>
                    <Text fontSize={15} color="#666" flex={1}>
                      {user?.phone_number || "-"}
                    </Text>
                  </XStack>
                )}
              </YStack>
            </YStack>
          </Card>

          {/* Action Buttons */}
          {isEditing && (
            <XStack gap={12}>
              <Button
                flex={1}
                size="$5"
                backgroundColor="white"
                color="#FF3B30"
                borderRadius={12}
                borderWidth={1}
                borderColor="#FF3B30"
                onPress={handleCancel}
                icon={<X size={20} color="#FF3B30" />}
                pressStyle={{ scale: 0.98 }}
                disabled={isSaving}
              >
                Cancel
              </Button>

              <Button
                flex={1}
                size="$5"
                backgroundColor="#4A90E2"
                color="white"
                borderRadius={12}
                onPress={handleSave}
                icon={<Save size={20} color="white" />}
                pressStyle={{ scale: 0.98 }}
                shadowColor="#4A90E2"
                shadowOffset={{ width: 0, height: 4 }}
                shadowOpacity={0.3}
                shadowRadius={8}
                disabled={isSaving}
              >
                {isSaving ? "Saving..." : "Save Changes"}
              </Button>
            </XStack>
          )}
        </YStack>
      </ScrollView>
    </YStack>
  );
}
