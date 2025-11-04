import { XStack, Button } from "tamagui";

type FilterType = "All" | "Active" | "Inactive" | "Pending";

interface FilterTabsProps {
  activeFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

export const FilterTabs = ({ activeFilter, onFilterChange }: FilterTabsProps) => {
  const filters: FilterType[] = ["All", "Active", "Pending", "Inactive"];

  return (
    <XStack gap={8}>
      {filters.map((filter) => {
        const isActive = activeFilter === filter;
        return (
          <Button
            key={filter}
            size="$3"
            backgroundColor={isActive ? "#4A90E2" : "white"}
            color={isActive ? "white" : "#666"}
            borderRadius={20}
            paddingHorizontal={20}
            fontWeight="600"
            fontSize={13}
            onPress={() => onFilterChange(filter)}
            pressStyle={{ scale: 0.95 }}
            shadowColor={isActive ? "#4A90E2" : "#000"}
            shadowOffset={{ width: 0, height: 1 }}
            shadowOpacity={isActive ? 0.2 : 0.05}
            shadowRadius={4}
          >
            {filter}
          </Button>
        );
      })}
    </XStack>
  );
};
