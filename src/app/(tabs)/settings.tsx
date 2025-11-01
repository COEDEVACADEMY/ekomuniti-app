import { Alert, ScrollView, TouchableOpacity } from "react-native";
import { YStack, XStack, Text, View, Separator } from "tamagui";
import { router } from "expo-router";
import {
  User,
  Bell,
  Lock,
  Globe,
  HelpCircle,
  Info,
  LogOut,
  ChevronRight,
  Mail,
  Shield,
} from "@tamagui/lucide-icons";

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
          onPress: () => {
            // TODO: Clear auth state
            router.replace("/welcome");
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <YStack flex={1} backgroundColor="#F8F9FA">
      {/* Profile Section */}
      <View backgroundColor="white" paddingVertical={24} paddingHorizontal={20}>
        <XStack alignItems="center" gap={16}>
          <View
            width={80}
            height={80}
            borderRadius={40}
            backgroundColor="#1569a0"
            alignItems="center"
            justifyContent="center"
          >
            <User size={40} color="white" />
          </View>
          <YStack flex={1}>
            <Text fontSize={22} fontWeight="700" color="#000">
              Ahmad Razak
            </Text>
            <Text fontSize={15} color="#666" marginTop={4}>
              ahmad.razak@email.com
            </Text>
            <TouchableOpacity
              onPress={() => console.log("Edit profile")}
              style={{ marginTop: 8 }}
            >
              <Text fontSize={15} fontWeight="600" color="#1569a0">
                Lihat Profil
              </Text>
            </TouchableOpacity>
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
            onPress={() => console.log("Personal info")}
          />
          <Separator />
          <SettingItem
            icon={<Mail size={20} color="#1569a0" />}
            title="Email & Kata Laluan"
            subtitle="Tukar email atau kata laluan"
            onPress={() => console.log("Email & password")}
          />
          <Separator />
          <SettingItem
            icon={<Shield size={20} color="#1569a0" />}
            title="Keselamatan"
            subtitle="Autentikasi dua faktor"
            onPress={() => console.log("Security")}
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
          <Separator />
          <SettingItem
            icon={<Lock size={20} color="#1569a0" />}
            title="Privasi"
            subtitle="Tetapan privasi dan data"
            onPress={() => console.log("Privacy")}
          />
          <Separator />
          <SettingItem
            icon={<Globe size={20} color="#1569a0" />}
            title="Bahasa"
            subtitle="Bahasa Malaysia"
            onPress={() => console.log("Language")}
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
