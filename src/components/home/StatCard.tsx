import { Card, YStack, XStack, Text } from "tamagui";
import { LucideIcon } from "@tamagui/lucide-icons";

interface StatCardProps {
  icon: LucideIcon;
  iconColor: string;
  label: string;
  value: string;
  trend?: string;
  trendColor?: string;
  TrendIcon?: LucideIcon;
}

export const StatCard = ({
  icon: Icon,
  iconColor,
  label,
  value,
  trend,
  trendColor,
  TrendIcon,
}: StatCardProps) => {
  return (
    <Card
      flex={1}
      padding={16}
      backgroundColor="white"
      borderRadius={12}
      shadowColor="#000"
      shadowOffset={{ width: 0, height: 1 }}
      shadowOpacity={0.05}
      shadowRadius={4}
    >
      <YStack gap={8}>
        <XStack alignItems="center" gap={8}>
          <Icon size={20} color={iconColor} />
          <Text fontSize={12} color="#666">{label}</Text>
        </XStack>
        <Text fontSize={24} fontWeight="700" color="#333">{value}</Text>
        {trend && TrendIcon && (
          <XStack alignItems="center" gap={4}>
            <TrendIcon size={14} color={trendColor} />
            <Text fontSize={11} color={trendColor}>{trend}</Text>
          </XStack>
        )}
      </YStack>
    </Card>
  );
};
