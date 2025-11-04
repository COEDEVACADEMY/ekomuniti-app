import { Bell, ChevronLeft, User } from "@tamagui/lucide-icons";
import { router } from "expo-router";
import { Image, StyleSheet, TouchableOpacity } from "react-native";
import { Text, View, XStack, YStack } from "tamagui";

interface CustomHeaderProps {
  variant?: "default" | "withAvatar";
  title?: string;
  subtitle?: string;
  userName?: string;
  avatarUrl?: string;
  showBackButton?: boolean;
  showNotification?: boolean;
  onBackPress?: () => void;
  onNotificationPress?: () => void;
  iRightSection?: true | false;
}

const CustomHeader = ({
  variant = "default",
  title = "Community",
  subtitle,
  userName,
  avatarUrl,
  showBackButton = false,
  showNotification = true,
  onBackPress,
  onNotificationPress,
  iRightSection = false
}: CustomHeaderProps) => {
  const handleBackPress = () => {
    console.log("Back button pressed");
    if (onBackPress) {
      onBackPress();
    } else {
      router.back();
    }
  };

  const handleNotificationPress = () => {
    if (onNotificationPress) {
      onNotificationPress();
    } else {
      // Default notification action
      console.log("Notification pressed");
    }
  };

  if (variant === "withAvatar") {
    return (
      <View style={styles.container}>
        <XStack
          alignItems="center"
          justifyContent="space-between"
          paddingHorizontal={20}
          paddingVertical={30}
        >
          {/* Left: Avatar and Greeting */}
          <XStack alignItems="center" gap={12} flex={1} marginRight={8}>
            <View style={styles.avatarContainer}>
              {avatarUrl ? (
                <Image source={{ uri: avatarUrl }} style={styles.avatar} />
              ) : (
                <View style={styles.avatarPlaceholder}>
                  <User size={32} color="#666" />
                </View>
              )}
            </View>
            <YStack flex={1}>
              <Text fontSize={14} color="#666">
                {subtitle || "Welcome Back"}
              </Text>
              <Text
                fontSize={18}
                fontWeight="700"
                color="#000"
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {userName || "User"}
              </Text>
            </YStack>
          </XStack>

          {/* Right: Notification */}
          {showNotification && iRightSection && (
            <TouchableOpacity
              onPress={handleNotificationPress}
              style={styles.iconButton}
              activeOpacity={0.6}
            >
              <Bell size={24} color="#000" />
            </TouchableOpacity>
          )}
        </XStack>
      </View>
    );
  }

  // Default variant: with optional back button and title
  return (
    <View style={styles.container}>
      <XStack
        alignItems="center"
        justifyContent="space-between"
        paddingHorizontal={20}
        paddingVertical={16}
      >
        {/* Left: Back button or placeholder */}
        <View style={styles.leftSection}>
          {showBackButton ? (
            <TouchableOpacity
              onPress={handleBackPress}
              style={styles.iconButton}
              activeOpacity={0.6}
            >
              <ChevronLeft size={24} color="#000" />
            </TouchableOpacity>
          ) : (
            <View style={styles.iconButton} />
          )}
        </View>

        {/* Center: Title */}
        <Text fontSize={18} fontWeight="600" color="#000">
          {title}
        </Text>

        {/* Right: Notification */}
        <View style={styles.rightSection}>
          {showNotification && iRightSection ? (
            <TouchableOpacity
              onPress={handleNotificationPress}
              style={styles.iconButton}
              activeOpacity={0.6}
            >
              <Bell size={24} color="#000" />
            </TouchableOpacity>
          ) : (
            <View style={styles.iconButton} />
          )}
        </View>
      </XStack>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "default",
    paddingTop: 20,
  },
  leftSection: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  rightSection: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  iconButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    overflow: "hidden",
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
  },
  avatarPlaceholder: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#E0E0E0",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default CustomHeader;
