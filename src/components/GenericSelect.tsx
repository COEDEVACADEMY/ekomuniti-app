
import { ChevronDown, ChevronUp, Search } from "@tamagui/lucide-icons";
import React, { useState, useMemo } from "react";
import { TouchableOpacity, ScrollView } from "react-native";
import { Card, Input, Text, XStack, YStack } from "tamagui";

export interface SelectOption {
  id: number | string;
  label: string;
}

interface GenericSelectProps {
  options: SelectOption[];
  selectedId?: number | string;
  onSelect: (id: number | string) => void;
  placeholder?: string;
  isSearch?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
}

export default function GenericSelect({
  options,
  selectedId,
  onSelect,
  placeholder = "Select an option",
  isSearch = false,
  disabled = false,
  icon,
}: GenericSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredOptions = useMemo(() => {
    if (!searchQuery.trim()) return options;

    const query = searchQuery.toLowerCase();
    return options.filter((option) =>
      option.label.toLowerCase().includes(query)
    );
  }, [options, searchQuery]);

  const selectedOption = options.find((option) => option.id === selectedId);

  const handleSelect = (id: number | string) => {
    onSelect(id);
    setIsOpen(false);
    setSearchQuery("");
  };

  return (
    <YStack opacity={disabled ? 0.5 : 1}>
      <TouchableOpacity onPress={() => !disabled && setIsOpen(!isOpen)} disabled={disabled}>
        <Card
          backgroundColor="white"
          borderRadius={12}
          padding={16}
          shadowColor="#000"
          shadowOffset={{ width: 0, height: 1 }}
          shadowOpacity={0.05}
          shadowRadius={4}
        >
          <XStack alignItems="center" justifyContent="space-between">
            <XStack alignItems="center" gap={12}>
              {icon}
              <Text fontSize={14} color={selectedId ? "#000" : "#999"}>
                {selectedOption ? selectedOption.label : placeholder}
              </Text>
            </XStack>
            {isOpen ? (
              <ChevronUp size={20} color="#666" />
            ) : (
              <ChevronDown size={20} color="#666" />
            )}
          </XStack>
        </Card>
      </TouchableOpacity>

      {isOpen && !disabled && (
        <Card marginTop={8} borderRadius={8} backgroundColor="white" borderWidth={1} borderColor="#E0E0E0" overflow="hidden">
          {isSearch && (
            <YStack padding={16} paddingBottom={12} borderBottomWidth={1} borderBottomColor="#E0E0E0">
              <XStack alignItems="center" gap={10} backgroundColor="#F5F5F5" borderRadius={8} paddingHorizontal={12} paddingVertical={10}>
                <Search size={18} color="#999" />
                <Input
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                  placeholder="Search..."
                  borderWidth={0}
                  backgroundColor="transparent"
                  fontSize={15}
                  padding={0}
                  flex={1}
                  color="#000"
                />
              </XStack>
            </YStack>
          )}

          <ScrollView style={{ maxHeight: 200 }} showsVerticalScrollIndicator={false} nestedScrollEnabled>
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option, index) => (
                <TouchableOpacity
                  key={option.id}
                  onPress={() => handleSelect(option.id)}
                  style={{
                    paddingHorizontal: 16,
                    paddingVertical: 14,
                    borderBottomWidth: index < filteredOptions.length - 1 ? 1 : 0,
                    borderBottomColor: "#F0F0F0",
                    backgroundColor: selectedId === option.id ? "#F0F7FF" : "white",
                  }}
                >
                  <Text
                    fontSize={15}
                    color={selectedId === option.id ? "#4A90E2" : "#000"}
                    fontWeight={selectedId === option.id ? "600" : "400"}
                  >
                    {option.label}
                  </Text>
                </TouchableOpacity>
              ))
            ) : (
              <YStack padding={24} alignItems="center">
                <Text fontSize={14} color="#999">
                  No options found
                </Text>
              </YStack>
            )}
          </ScrollView>
        </Card>
      )}
    </YStack>
  );
}

