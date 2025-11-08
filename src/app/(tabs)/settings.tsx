import {
  Bell,
  ChevronRight,
  HelpCircle,
  Info,
  LogOut,
  Mail,
  User,
} from "@tamagui/lucide-icons";
import { router, useFocusEffect } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { Separator, Text, View, XStack, YStack } from "tamagui";
import { AuthService } from "../../services/authService";
import { User as UserType } from "../../types/auth";
import { TokenStorage } from "../../utils/tokenStorage";
import { ASSET_BASE_URL } from "../../config/api";

interface SettingItemProps {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  onPress: () => void;
  showChevron?: boolean;
  isDestructive?: boolean;
}

const SettingItem = ({
  icon,
  title,
  subtitle,
  onPress,
  showChevron = true,
  isDestructive = false,
}: SettingItemProps) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <XStack
        alignItems="center"
        justifyContent="space-between"
        paddingVertical={16}
        paddingHorizontal={20}
        backgroundColor="white"
      >
        <XStack alignItems="center" gap={16} flex={1}>
          <View
            width={44}
            height={44}
            borderRadius={22}
            backgroundColor="#F5F5F5"
            alignItems="center"
            justifyContent="center"
          >
            {icon}
          </View>
          <YStack flex={1}>
            <Text
              fontSize={16}
              fontWeight="600"
              color={isDestructive ? "#FF3B30" : "#000"}
            >
              {title}
            </Text>
            {subtitle && (
              <Text fontSize={14} color="#666" marginTop={2}>
                {subtitle}
              </Text>
            )}
          </YStack>
        </XStack>
        {showChevron && <ChevronRight size={20} color="#999" />}
      </XStack>
    </TouchableOpacity>
  );
};

interface SectionHeaderProps {
  title: string;
}

const SectionHeader = ({ title }: SectionHeaderProps) => {
  return (
    <Text
      fontSize={14}
      fontWeight="600"
      color="#666"
      paddingHorizontal={20}
      paddingTop={24}
      paddingBottom={12}
      textTransform="uppercase"
    >
      {title}
    </Text>
  );
};

export default function SettingsScreen() {
  const [user, setUser] = useState<UserType | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadUserData();
  }, []);

  // Refresh user data when screen is focused
  useFocusEffect(
    useCallback(() => {
      loadUserData();
    }, [])
  );

  const loadUserData = async () => {
    try {
      const cachedUser = await TokenStorage.getUser();
      setUser(cachedUser);
    } catch (error) {
      console.error("Failed to load user data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    Alert.alert(
      "Log Keluar",
      "Adakah anda pasti mahu log keluar?",
      [
        {
          text: "Batal",
          style: "cancel",
        },
        {
          text: "Log Keluar",
          style: "destructive",
          onPress: async () => {
            try {
              console.log("Starting logout process...");

              // Call logout API and clear storage
              const response = await AuthService.logout();

              console.log("Logout successful:", response.message);

              // Show success message
              Alert.alert(
                "Berjaya",
                response.message || "Logout successful!",
                [
                  {
                    text: "OK",
                    onPress: () => {
                      // Redirect to welcome screen
                      router.replace("/welcome");
                    },
                  },
                ],
                { cancelable: false }
              );
            } catch (error) {
              console.error("Logout error:", error);
              // Even if error, still redirect (storage already cleared)
              router.replace("/welcome");
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  if (isLoading) {
    return (
      <YStack
        flex={1}
        backgroundColor="#F8F9FA"
        justifyContent="center"
        alignItems="center"
      >
        <ActivityIndicator size="large" color="#1569a0" />
      </YStack>
    );
  }

  const profileImageUrl = user?.photo
    ? `${ASSET_BASE_URL}/Profil/${user.photo}`
    : undefined;

  return (
    <YStack flex={1} backgroundColor="#F8F9FA">
      {/* Profile Section */}
      <View
        backgroundColor="white"
        paddingVertical={20}
        paddingHorizontal={20}
        paddingTop={45}
      >
        <XStack alignItems="center" gap={16}>
          <View
            width={80}
            height={80}
            borderRadius={40}
            backgroundColor="#E0E0E0" // Neutral background color
            alignItems="center"
            justifyContent="center"
          >
            {profileImageUrl ? (
              <Image
                source={{ uri: profileImageUrl }}
                style={{ width: 80, height: 80, borderRadius: 40 }}
              />
            ) : (
              <User size={40} color="#999" /> // Neutral icon color
            )}
          </View>
          <YStack flex={1}>
            <Text
              fontSize={18}
              fontWeight="700"
              color="#000"
              numberOfLines={2}
              ellipsizeMode="tail"
            >
              {user?.fullname || "User"}
            </Text>
            <Text
              fontSize={14}
              color="#666"
              marginTop={4}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {user?.email || "email@example.com"}
            </Text>
            {/* <TouchableOpacity
              onPress={() => router.push("/profile")}
              style={{ marginTop: 8 }}
            >
              <Text fontSize={14} fontWeight="600" color="#1569a0">
                Lihat Profil
              </Text>
            </TouchableOpacity> */}
          </YStack>
        </XStack>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Account Section */}
        <SectionHeader title="Akaun" />
        <View backgroundColor="white">
          <SettingItem
            icon={<User size={20} color="#1569a0" />}
            title="Maklumat Peribadi"
            subtitle="Nama, telefon, alamat"
            onPress={() => router.push("/profile")}
          />
          <Separator />
          <SettingItem
            icon={<Mail size={20} color="#1569a0" />}
            title="Email & Kata Laluan"
            subtitle="Tukar email atau kata laluan"
            onPress={() => console.log("Email & password")}
          />
        </View>

        {/* Preferences Section */}
        <SectionHeader title="Tetapan" />
        <View backgroundColor="white">
          <SettingItem
            icon={<Bell size={20} color="#1569a0" />}
            title="Notifikasi"
            subtitle="Urus notifikasi aplikasi"
            onPress={() => console.log("Notifications")}
          />
        </View>

        {/* Support Section */}
        <SectionHeader title="Sokongan" />
        <View backgroundColor="white">
          <SettingItem
            icon={<HelpCircle size={20} color="#1569a0" />}
            title="Pusat Bantuan"
            subtitle="FAQ dan panduan"
            onPress={() => console.log("Help center")}
          />
          <Separator />
          <SettingItem
            icon={<Info size={20} color="#1569a0" />}
            title="Tentang eKomuniti"
            subtitle="Versi 1.0.0"
            onPress={() => console.log("About")}
          />
        </View>

        {/* Logout Button */}
        <View marginTop={24} marginBottom={40}>
          <SettingItem
            icon={<LogOut size={20} color="#FF3B30" />}
            title="Log Keluar"
            onPress={handleLogout}
            showChevron={false}
            isDestructive={true}
          />
        </View>
      </ScrollView>
    </YStack>
  );
}
