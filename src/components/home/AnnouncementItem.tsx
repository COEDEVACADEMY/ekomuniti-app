import { XStack, YStack, Text } from "tamagui";
import { ChevronRight } from "@tamagui/lucide-icons";
import { LucideIcon } from "@tamagui/lucide-icons";

interface AnnouncementItemProps {
  icon: LucideIcon;
  iconColor: string;
  title: string;
  description: string;
  time: string;
  onPress?: () => void;
}

export const AnnouncementItem = ({
  icon: Icon,
  iconColor,
  title,
  description,
  time,
  onPress,
}: AnnouncementItemProps) => {
  return (
    <XStack gap={12} alignItems="flex-start" onPress={onPress}>
      <YStack
        backgroundColor={iconColor}
        borderRadius={8}
        padding={8}
        width={40}
        height={40}
        alignItems="center"
        justifyContent="center"
      >
        <Icon size={20} color="white" />
      </YStack>
      <YStack flex={1} gap={4}>
        <Text fontSize={14} fontWeight="600" color="#333">
          {title}
        </Text>
        <Text fontSize={12} color="#666" numberOfLines={2}>
          {description}
        </Text>
        <Text fontSize={11} color="#999">{time}</Text>
      </YStack>
      <ChevronRight size={20} color="#CCC" />
    </XStack>
  );
};
