import { YStack, Text, H1 } from 'tamagui';

export default function SettingsScreen() {
  return (
    <YStack flex={1} backgroundColor="$background" padding="$4" justifyContent="center" alignItems="center">
      <H1>Settings</H1>
      <Text marginTop="$4" color="$gray10">
        App settings and preferences
      </Text>
    </YStack>
  );
}
