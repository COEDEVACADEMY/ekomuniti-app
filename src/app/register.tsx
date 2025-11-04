import { useState } from "react";
import { KeyboardAvoidingView, Platform, TouchableOpacity, ScrollView } from "react-native";
import { YStack, XStack, Button, H2, Text, Input, Card } from "tamagui";
import { User, Mail, Lock, Eye, EyeOff, ArrowLeft, Phone } from "@tamagui/lucide-icons";
import { router } from "expo-router";
import React from "react";

export default function RegisterScreen() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleRegister = () => {
    // TODO: Implement register logic
    console.log("Register with:", { fullName, email, phone, password });
    router.replace("/(tabs)");
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <YStack flex={1} backgroundColor="#F5F5F5">
        <ScrollView showsVerticalScrollIndicator={false}>
          <YStack padding={20}>
            {/* Header */}
            <XStack paddingTop={20} paddingBottom={32} alignItems="center">
              <TouchableOpacity onPress={() => router.back()}>
                <ArrowLeft size={24} color="#333" />
              </TouchableOpacity>
            </XStack>

            {/* Title */}
            <YStack gap={8} marginBottom={32}>
              <H2 fontSize={32} fontWeight="700" color="#1A2B4A">
                Create Account
              </H2>
              <Text fontSize={16} color="#666">
                Join our community today
              </Text>
            </YStack>

            {/* Form */}
            <YStack gap={16}>
              {/* Full Name Input */}
              <YStack gap={8}>
                <Text fontSize={14} fontWeight="600" color="#333">
                  Full Name
                </Text>
                <Card
                  backgroundColor="white"
                  borderRadius={12}
                  padding={16}
                  shadowColor="#000"
                  shadowOffset={{ width: 0, height: 1 }}
                  shadowOpacity={0.05}
                  shadowRadius={4}
                >
                  <XStack alignItems="center" gap={12}>
                    <User size={20} color="#999" />
                    <Input
                      flex={1}
                      placeholder="Enter your full name"
                      value={fullName}
                      onChangeText={setFullName}
                      borderWidth={0}
                      backgroundColor="transparent"
                      fontSize={14}
                      placeholderTextColor="#999"
                      padding={0}
                    />
                  </XStack>
                </Card>
              </YStack>

              {/* Email Input */}
              <YStack gap={8}>
                <Text fontSize={14} fontWeight="600" color="#333">
                  Email
                </Text>
                <Card
                  backgroundColor="white"
                  borderRadius={12}
                  padding={16}
                  shadowColor="#000"
                  shadowOffset={{ width: 0, height: 1 }}
                  shadowOpacity={0.05}
                  shadowRadius={4}
                >
                  <XStack alignItems="center" gap={12}>
                    <Mail size={20} color="#999" />
                    <Input
                      flex={1}
                      placeholder="Enter your email"
                      value={email}
                      onChangeText={setEmail}
                      keyboardType="email-address"
                      autoCapitalize="none"
                      borderWidth={0}
                      backgroundColor="transparent"
                      fontSize={14}
                      placeholderTextColor="#999"
                      padding={0}
                    />
                  </XStack>
                </Card>
              </YStack>

              {/* Phone Input */}
              <YStack gap={8}>
                <Text fontSize={14} fontWeight="600" color="#333">
                  Phone Number
                </Text>
                <Card
                  backgroundColor="white"
                  borderRadius={12}
                  padding={16}
                  shadowColor="#000"
                  shadowOffset={{ width: 0, height: 1 }}
                  shadowOpacity={0.05}
                  shadowRadius={4}
                >
                  <XStack alignItems="center" gap={12}>
                    <Phone size={20} color="#999" />
                    <Input
                      flex={1}
                      placeholder="+60 12-345 6789"
                      value={phone}
                      onChangeText={setPhone}
                      keyboardType="phone-pad"
                      borderWidth={0}
                      backgroundColor="transparent"
                      fontSize={14}
                      placeholderTextColor="#999"
                      padding={0}
                    />
                  </XStack>
                </Card>
              </YStack>

              {/* Password Input */}
              <YStack gap={8}>
                <Text fontSize={14} fontWeight="600" color="#333">
                  Password
                </Text>
                <Card
                  backgroundColor="white"
                  borderRadius={12}
                  padding={16}
                  shadowColor="#000"
                  shadowOffset={{ width: 0, height: 1 }}
                  shadowOpacity={0.05}
                  shadowRadius={4}
                >
                  <XStack alignItems="center" gap={12}>
                    <Lock size={20} color="#999" />
                    <Input
                      flex={1}
                      placeholder="Create a password"
                      value={password}
                      onChangeText={setPassword}
                      secureTextEntry={!showPassword}
                      borderWidth={0}
                      backgroundColor="transparent"
                      fontSize={14}
                      placeholderTextColor="#999"
                      padding={0}
                    />
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                      {showPassword ? (
                        <EyeOff size={20} color="#999" />
                      ) : (
                        <Eye size={20} color="#999" />
                      )}
                    </TouchableOpacity>
                  </XStack>
                </Card>
              </YStack>

              {/* Confirm Password Input */}
              <YStack gap={8}>
                <Text fontSize={14} fontWeight="600" color="#333">
                  Confirm Password
                </Text>
                <Card
                  backgroundColor="white"
                  borderRadius={12}
                  padding={16}
                  shadowColor="#000"
                  shadowOffset={{ width: 0, height: 1 }}
                  shadowOpacity={0.05}
                  shadowRadius={4}
                >
                  <XStack alignItems="center" gap={12}>
                    <Lock size={20} color="#999" />
                    <Input
                      flex={1}
                      placeholder="Confirm your password"
                      value={confirmPassword}
                      onChangeText={setConfirmPassword}
                      secureTextEntry={!showConfirmPassword}
                      borderWidth={0}
                      backgroundColor="transparent"
                      fontSize={14}
                      placeholderTextColor="#999"
                      padding={0}
                    />
                    <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                      {showConfirmPassword ? (
                        <EyeOff size={20} color="#999" />
                      ) : (
                        <Eye size={20} color="#999" />
                      )}
                    </TouchableOpacity>
                  </XStack>
                </Card>
              </YStack>

              {/* Terms & Conditions */}
              <XStack gap={8} alignItems="flex-start" marginTop={8}>
                <Text fontSize={13} color="#666" lineHeight={20}>
                  By signing up, you agree to our{" "}
                  <Text color="#4A90E2" fontWeight="600">
                    Terms & Conditions
                  </Text>{" "}
                  and{" "}
                  <Text color="#4A90E2" fontWeight="600">
                    Privacy Policy
                  </Text>
                </Text>
              </XStack>

              {/* Register Button */}
              <Button
                size="$5"
                backgroundColor="#4A90E2"
                color="white"
                borderRadius={12}
                fontWeight="700"
                fontSize={16}
                marginTop={16}
                onPress={handleRegister}
                pressStyle={{ scale: 0.98 }}
                shadowColor="#4A90E2"
                shadowOffset={{ width: 0, height: 4 }}
                shadowOpacity={0.3}
                shadowRadius={8}
              >
                Create Account
              </Button>
            </YStack>

            {/* Divider */}
            <XStack alignItems="center" gap={12} marginVertical={32}>
              <YStack flex={1} height={1} backgroundColor="#E0E0E0" />
              <Text fontSize={13} color="#999">
                Or sign up with
              </Text>
              <YStack flex={1} height={1} backgroundColor="#E0E0E0" />
            </XStack>

            {/* Social Sign Up */}
            <XStack gap={12}>
              <Card
                flex={1}
                padding={16}
                backgroundColor="white"
                borderRadius={12}
                pressStyle={{ scale: 0.98 }}
                onPress={() => console.log("Google signup")}
                shadowColor="#000"
                shadowOffset={{ width: 0, height: 1 }}
                shadowOpacity={0.05}
                shadowRadius={4}
              >
                <Text fontSize={14} fontWeight="600" color="#333" textAlign="center">
                  Google
                </Text>
              </Card>
              <Card
                flex={1}
                padding={16}
                backgroundColor="white"
                borderRadius={12}
                pressStyle={{ scale: 0.98 }}
                onPress={() => console.log("Facebook signup")}
                shadowColor="#000"
                shadowOffset={{ width: 0, height: 1 }}
                shadowOpacity={0.05}
                shadowRadius={4}
              >
                <Text fontSize={14} fontWeight="600" color="#333" textAlign="center">
                  Facebook
                </Text>
              </Card>
            </XStack>

            {/* Sign In Link */}
            <YStack alignItems="center" paddingVertical={32}>
              <XStack gap={4}>
                <Text fontSize={14} color="#666">
                  Already have an account?
                </Text>
                <TouchableOpacity onPress={() => router.push("/login")}>
                  <Text fontSize={14} color="#4A90E2" fontWeight="600">
                    Sign In
                  </Text>
                </TouchableOpacity>
              </XStack>
            </YStack>
          </YStack>
        </ScrollView>
      </YStack>
    </KeyboardAvoidingView>
  );
}
