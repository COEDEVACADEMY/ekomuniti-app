import { Card, YStack, Text } from "tamagui";
import { LucideIcon } from "@tamagui/lucide-icons";

interface QuickActionCardProps {
  icon: LucideIcon;
  iconColor: string;
  label: string;
  onPress: () => void;
}

export const QuickActionCard = ({
  icon: Icon,
  iconColor,
  label,
  onPress,
}: QuickActionCardProps) => {
  return (
    <Card
      flex={1}
      padding={20}
      backgroundColor="white"
      borderRadius={12}
      shadowColor="#000"
      shadowOffset={{ width: 0, height: 1 }}
      shadowOpacity={0.05}
      shadowRadius={4}
      pressStyle={{ scale: 0.97 }}
      onPress={onPress}
    >
      <YStack alignItems="center" gap={8}>
        <Icon size={32} color={iconColor} />
        <Text fontSize={13} fontWeight="600" color="#333">{label}</Text>
      </YStack>
    </Card>
  );
};
