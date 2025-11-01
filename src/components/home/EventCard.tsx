import { Card, XStack, YStack, Text } from "tamagui";

interface EventCardProps {
  date: string;
  month: string;
  title: string;
  time: string;
  location: string;
  color: string;
  onPress?: () => void;
}

export const EventCard = ({
  date,
  month,
  title,
  time,
  location,
  color,
  onPress,
}: EventCardProps) => {
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
      <XStack gap={16} alignItems="center">
        <YStack
          backgroundColor={color}
          borderRadius={12}
          padding={12}
          width={60}
          alignItems="center"
          justifyContent="center"
        >
          <Text fontSize={24} fontWeight="700" color="white">{date}</Text>
          <Text fontSize={12} color="white">{month}</Text>
        </YStack>

        <YStack flex={1} gap={4}>
          <Text fontSize={14} fontWeight="600" color="#333">
            {title}
          </Text>
          <Text fontSize={12} color="#666">
            {time}
          </Text>
          <Text fontSize={12} color="#4A90E2">
            {location}
          </Text>
        </YStack>
      </XStack>
    </Card>
  );
};
