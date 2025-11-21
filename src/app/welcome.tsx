import { Image } from "react-native";
import { YStack, Button, H2, Text } from "tamagui";
import { router } from "expo-router";
import React from "react";

export default function WelcomeScreen() {
  return (
    <YStack flex={1} backgroundColor="white" padding={20} justifyContent="space-between">
      {/* Illustration Section */}
      <YStack flex={1} alignItems="center" justifyContent="center" gap={24}>
        <Image
          source={require("../assets/illustration/ilCommunity.png")}
          style={{
            width: 350,
            height: 350,
            resizeMode: "contain",
          }}
        />

        <YStack gap={12} alignItems="center" paddingHorizontal={20}>
          <H2 fontSize={28} fontWeight="700" color="#1569a0" textAlign="center">
            Manage Membership Easier,{"\n"}All in One Platform
          </H2>
          <Text fontSize={16} color="#666" textAlign="center" lineHeight={24}>
            A digital platform for associations & communities to manage members, activities, and communication more organized.
          </Text>
        </YStack>
      </YStack>

      {/* Get Started Button */}
      <YStack gap={16} paddingBottom={20}>
        <Button
          size="$5"
          backgroundColor="#1569a0"
          color="white"
          borderRadius={30}
          fontWeight="700"
          fontSize={16}
          onPress={() => router.push("/login")}
          pressStyle={{ scale: 0.98, backgroundColor: "#0f5580" }}
        >
          Get Started
        </Button>

        <Button
          size="$5"
          backgroundColor="transparent"
          color="#666"
          borderWidth={0}
          fontWeight="600"
          fontSize={14}
          onPress={() => router.push("/register")}
          pressStyle={{ opacity: 0.7 }}
        >
          Don't have an account? Sign Up
        </Button>
      </YStack>
    </YStack>
  );
}
