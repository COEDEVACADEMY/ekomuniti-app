import { XStack, Input } from "tamagui";
import { Search } from "@tamagui/lucide-icons";

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}

export const SearchBar = ({
  value,
  onChangeText,
  placeholder = "Search members...",
}: SearchBarProps) => {
  return (
    <XStack
      backgroundColor="white"
      borderRadius={12}
      paddingHorizontal={16}
      paddingVertical={12}
      alignItems="center"
      gap={12}
      shadowColor="#000"
      shadowOffset={{ width: 0, height: 1 }}
      shadowOpacity={0.05}
      shadowRadius={4}
    >
      <Search size={20} color="#999" />
      <Input
        flex={1}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        borderWidth={0}
        backgroundColor="transparent"
        fontSize={14}
        placeholderTextColor="#999"
        padding={0}
      />
    </XStack>
  );
};
