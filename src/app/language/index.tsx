import { useState } from "react";
import { Alert } from "react-native";
import { YStack, XStack, Card, Text, Button, ScrollView } from "tamagui";
import { Check } from "@tamagui/lucide-icons";
import CustomHeader from "../../components/CustomHeader";

const languages = [
  { id: "ms", name: "Malaysia", emoji: "🇲🇾" },
  { id: "en", name: "English", emoji: "🇺🇸" },
  { id: "zh", name: "Mandarin", emoji: "🇨🇳" },
];

export default function LanguageScreen() {
  const [selectedLanguage, setSelectedLanguage] = useState("en");

  const handleSelectLanguage = (languageId: string) => {
    setSelectedLanguage(languageId);
  };

  const handleSaveChanges = () => {
    // Here you would typically save the selected language to storage
    Alert.alert("Language Saved", `Selected language: ${languages.find(l => l.id === selectedLanguage)?.name}`);
  };

  return (
    <YStack flex={1} backgroundColor="#F5F5F5">
      <CustomHeader
        variant="default"
        title="Language"
        showBackButton={true}
        showNotification={false}
      />

      <ScrollView>
        <YStack padding={20} gap={16}>
          {languages.map((language) => (
            <Card
              key={language.id}
              backgroundColor="white"
              borderRadius={12}
              padding={20}
              flexDirection="row"
              alignItems="center"
              justifyContent="space-between"
              shadowColor="#000"
              shadowOffset={{ width: 0, height: 2 }}
              shadowOpacity={0.08}
              shadowRadius={8}
              onPress={() => handleSelectLanguage(language.id)}
              borderWidth={selectedLanguage === language.id ? 2 : 0}
              borderColor={selectedLanguage === language.id ? "#4A90E2" : undefined}
            >
              <XStack alignItems="center" gap={10}>
                <Text fontSize={20}>{language.emoji}</Text>
                <Text fontSize={16} fontWeight="600" color="#333">
                  {language.name}
                </Text>
              </XStack>
              {selectedLanguage === language.id && (
                <Check size={24} color="#4A90E2" />
              )}
            </Card>
          ))}
        </YStack>
      </ScrollView>

      <YStack padding={20} position="absolute" bottom={0} left={0} right={0}>
        <Button
          size="$5"
          backgroundColor="#4A90E2"
          color="white"           borderRadius={12}
          onPress={handleSaveChanges}
          pressStyle={{ scale: 0.98 }}
          shadowColor="#4A90E2"
          shadowOffset={{ width: 0, height: 4 }}
          shadowOpacity={0.3}
          shadowRadius={8}
        >
          Save Changes
        </Button>
      </YStack>
    </YStack>
  );
}