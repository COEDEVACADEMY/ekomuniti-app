import { ChevronDown, ChevronUp, Search } from "@tamagui/lucide-icons";
import React, { useState, useMemo } from "react";
import { TouchableOpacity, ScrollView } from "react-native";
import { Card, Input, Text, XStack, YStack } from "tamagui";
import { City } from "../types/location";

interface CitySelectProps {
  cities: City[];
  selectedCityId?: number;
  onSelectCity: (cityId: number) => void;
  placeholder?: string;
  isSearch?: boolean;
}

export default function CitySelect({
  cities,
  selectedCityId,
  onSelectCity,
  placeholder = "Select a city",
  isSearch = false,
}: CitySelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCities = useMemo(() => {
    if (!searchQuery.trim()) return cities;

    const query = searchQuery.toLowerCase();
    return cities.filter((city) =>
      city.city.toLowerCase().includes(query)
    );
  }, [cities, searchQuery]);

  const selectedCity = cities.find((city) => city.id_city === selectedCityId);

  const handleSelectCity = (cityId: number) => {
    onSelectCity(cityId);
    setIsOpen(false);
    setSearchQuery("");
  };

  return (
    <YStack>
      <TouchableOpacity onPress={() => setIsOpen(!isOpen)}>
        <Card backgroundColor="#F8F9FA" borderRadius={8} padding={12}>
          <XStack alignItems="center" justifyContent="space-between">
            <Text fontSize={15} color={selectedCityId ? "#000" : "#999"}>
              {selectedCity ? selectedCity.city : placeholder}
            </Text>
            {isOpen ? (
              <ChevronUp size={20} color="#666" />
            ) : (
              <ChevronDown size={20} color="#666" />
            )}
          </XStack>
        </Card>
      </TouchableOpacity>

      {isOpen && (
        <Card marginTop={8} borderRadius={8} backgroundColor="white" borderWidth={1} borderColor="#E0E0E0" overflow="hidden">
          {isSearch && (
            <YStack padding={16} paddingBottom={12} borderBottomWidth={1} borderBottomColor="#E0E0E0">
              <XStack alignItems="center" gap={10} backgroundColor="#F5F5F5" borderRadius={8} paddingHorizontal={12} paddingVertical={10}>
                <Search size={18} color="#999" />
                <Input
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                  placeholder="Search city..."
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
            {filteredCities.length > 0 ? (
              filteredCities.map((city, index) => (
                <TouchableOpacity
                  key={city.id_city}
                  onPress={() => handleSelectCity(city.id_city)}
                  style={{
                    paddingHorizontal: 16,
                    paddingVertical: 14,
                    borderBottomWidth: index < filteredCities.length - 1 ? 1 : 0,
                    borderBottomColor: "#F0F0F0",
                    backgroundColor: selectedCityId === city.id_city ? "#F0F7FF" : "white",
                  }}
                >
                  <Text
                    fontSize={15}
                    color={selectedCityId === city.id_city ? "#4A90E2" : "#000"}
                    fontWeight={selectedCityId === city.id_city ? "600" : "400"}
                  >
                    {city.city}
                  </Text>
                </TouchableOpacity>
              ))
            ) : (
              <YStack padding={24} alignItems="center">
                <Text fontSize={14} color="#999">
                  No cities found
                </Text>
              </YStack>
            )}
          </ScrollView>
        </Card>
      )}
    </YStack>
  );
}
