import { Card, XStack, YStack, Text, Avatar } from "tamagui";
import { Mail, Phone } from "@tamagui/lucide-icons";

interface MemberCardProps {
  name: string;
  email: string;
  phone: string;
  role: string;
  status: "Active" | "Inactive";
  avatarUrl?: string;
  onPress?: () => void;
}

export const MemberCard = ({
  name,
  email,
  phone,
  role,
  status,
  avatarUrl,
  onPress,
}: MemberCardProps) => {
  const statusColor = status === "Active" ? "#34C759" : "#FF3B30";

  return (
    <Card
      padding={16}
      backgroundColor="white"
      borderRadius={12}
      shadowColor="#000"
      shadowOffset={{ width: 0, height: 1 }}
      shadowOpacity={0.05}
      shadowRadius={4}
      pressStyle={{ scale: 0.98 }}
      onPress={onPress}
    >
      <XStack gap={12} alignItems="center">
        {/* Avatar */}
        <Avatar circular size="$5">
          <Avatar.Image src={avatarUrl} />
          <Avatar.Fallback backgroundColor="#E0E0E0" />
        </Avatar>

        {/* Member Info */}
        <YStack flex={1} gap={4}>
          <XStack alignItems="center" justifyContent="space-between">
            <Text fontSize={16} fontWeight="600" color="#333">
              {name}
            </Text>
            <YStack
              paddingHorizontal={8}
              paddingVertical={4}
              borderRadius={12}
              backgroundColor={`${statusColor}15`}
            >
              <Text fontSize={11} fontWeight="600" color={statusColor}>
                {status}
              </Text>
            </YStack>
          </XStack>

          <Text fontSize={13} color="#4A90E2" fontWeight="500">
            {role}
          </Text>

          <YStack gap={2}>
            <XStack gap={6} alignItems="center">
              <Mail size={14} color="#666" />
              <Text fontSize={12} color="#666">
                {email}
              </Text>
            </XStack>
            <XStack gap={6} alignItems="center">
              <Phone size={14} color="#666" />
              <Text fontSize={12} color="#666">
                {phone}
              </Text>
            </XStack>
          </YStack>
        </YStack>
      </XStack>
    </Card>
  );
};
