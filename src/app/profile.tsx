import { useState, useEffect } from "react";
import { ScrollView, Alert, TouchableOpacity } from "react-native";
import { YStack, XStack, Card, Text, View, Input, Button } from "tamagui";
import { User, Mail, Phone, MapPin, Pencil, Save, X } from "@tamagui/lucide-icons";
import { router } from "expo-router";
import CustomHeader from "../components/CustomHeader";
import { TokenStorage } from "../utils/tokenStorage";
import { User as UserType } from "../types/auth";
import { AuthService } from "../services/authService";

export default function ProfileScreen() {
  const [user, setUser] = useState<UserType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Form fields
  const [fullname, setFullname] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");

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

      // TODO: Call API to update profile
      // const response = await ApiHelper.put(`${API_BASE_URL}/profile`, {
      //   fullname,
      //   phone_number: phoneNumber,
      //   email,
      // });

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Update local state and storage
      const updatedUser: UserType = {
        ...user!,
        fullname,
        phone_number: phoneNumber,
        email,
        updated_at: new Date().toISOString(),
      };

      setUser(updatedUser);
      await TokenStorage.saveUser(updatedUser);

      setIsEditing(false);

      Alert.alert("Success", "Profile updated successfully!");
    } catch (error: any) {
      console.error("Failed to update profile:", error);
      Alert.alert("Error", error.message || "Failed to update profile");
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
              backgroundColor="#4A90E2"
              alignItems="center"
              justifyContent="center"
              marginBottom={16}
            >
              <User size={48} color="white" />
            </View>

            {!isEditing && (
              <>
                <Text fontSize={22} fontWeight="700" color="#000" textAlign="center">
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
            <XStack justifyContent="space-between" alignItems="center" marginBottom={20}>
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
                  <Card
                    backgroundColor="#F8F9FA"
                    borderRadius={8}
                    padding={12}
                  >
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
                  <Card
                    backgroundColor="#F8F9FA"
                    borderRadius={8}
                    padding={12}
                  >
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
                  <Card
                    backgroundColor="#F8F9FA"
                    borderRadius={8}
                    padding={12}
                  >
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

              {/* Additional Info (Read-only) */}
              {!isEditing && (
                <>
                  <YStack gap={8}>
                    <Text fontSize={14} fontWeight="600" color="#333">
                      Member Since
                    </Text>
                    <XStack alignItems="center" gap={12}>
                      <View
                        width={40}
                        height={40}
                        borderRadius={20}
                        backgroundColor="#AF52DE20"
                        alignItems="center"
                        justifyContent="center"
                      >
                        <MapPin size={18} color="#AF52DE" />
                      </View>
                      <Text fontSize={15} color="#666" flex={1}>
                        {user?.created_at
                          ? new Date(user.created_at).toLocaleDateString("en-MY", {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                            })
                          : "-"}
                      </Text>
                    </XStack>
                  </YStack>
                </>
              )}
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
