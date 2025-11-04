import { useState } from "react";
import { KeyboardAvoidingView, Platform, TouchableOpacity, Alert } from "react-native";
import { YStack, XStack, Button, H2, Text, Input, Card } from "tamagui";
import { Mail, Lock, Eye, EyeOff } from "@tamagui/lucide-icons";
import { router } from "expo-router";
import { AuthService } from "../services/authService";
import { ApiError } from "../types/auth";
import { TokenStorage } from "../utils/tokenStorage";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    // Clear previous errors
    setError("");

    // Validate empty fields
    if (!email || !password) {
      setError("Please enter email and password");
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setIsLoading(true);

    try {
      // Call API login
      const response = await AuthService.login(email, password);

      if (response.success) {
        // Success - save token and user data to AsyncStorage
        console.log("Login successful:", response.data);
        console.log("User:", response.data.user.fullname);
        console.log("Token:", response.data.token);

        // Save token and user data
        await TokenStorage.saveToken(response.data.token);
        await TokenStorage.saveUser(response.data.user);

        Alert.alert(
          "Login Successful",
          `Welcome, ${response.data.user.fullname}!`,
          [
            {
              text: "OK",
              onPress: () => router.replace("/(tabs)"),
            },
          ]
        );
      } else {
        setError(response.message || "Login failed");
      }
    } catch (err) {
      const error = err as ApiError;
      setError(error.message || "An error occurred. Please try again.");

      console.error("Login error details:", error);

      // Show detailed error if available
      if (error.errors) {
        const errorMessages = Object.values(error.errors).flat().join("\n");
        Alert.alert("Login Failed", errorMessages, [{ text: "OK" }]);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <YStack flex={1} backgroundColor="#F5F5F5" padding={20}>
        {/* Header - Empty space for consistency */}
        <YStack paddingTop={40} paddingBottom={32} />

        {/* Title */}
        <YStack gap={8} marginBottom={32}>
          <H2 fontSize={32} fontWeight="700" color="#1A2B4A">
            Welcome Back
          </H2>
          <Text fontSize={16} color="#666">
            Sign in to continue
          </Text>
        </YStack>

        {/* Form */}
        <YStack gap={16}>
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

          {/* Password Input */}
          <YStack gap={8}>
            <XStack justifyContent="space-between" alignItems="center">
              <Text fontSize={14} fontWeight="600" color="#333">
                Password
              </Text>
              <TouchableOpacity onPress={() => console.log("Forgot password")}>
                <Text fontSize={13} color="#4A90E2" fontWeight="600">
                  Forgot?
                </Text>
              </TouchableOpacity>
            </XStack>
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
                  placeholder="Enter your password"
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

          {/* Error Message */}
          {error ? (
            <Card
              backgroundColor="#FF3B3015"
              borderRadius={8}
              padding={12}
              borderWidth={1}
              borderColor="#FF3B30"
            >
              <Text fontSize={13} color="#FF3B30" textAlign="center">
                {error}
              </Text>
            </Card>
          ) : null}

          {/* Login Button */}
          <Button
            size="$5"
            backgroundColor={isLoading ? "#CCC" : "#4A90E2"}
            color="white"
            borderRadius={12}
            fontWeight="700"
            fontSize={16}
            marginTop={16}
            onPress={handleLogin}
            disabled={isLoading}
            pressStyle={{ scale: 0.98 }}
            shadowColor="#4A90E2"
            shadowOffset={{ width: 0, height: 4 }}
            shadowOpacity={0.3}
            shadowRadius={8}
          >
            {isLoading ? "Signing In..." : "Sign In"}
          </Button>

        </YStack>

        {/* Divider */}
        <XStack alignItems="center" gap={12} marginVertical={32}>
          <YStack flex={1} height={1} backgroundColor="#E0E0E0" />
          <Text fontSize={13} color="#999">
            Or continue with
          </Text>
          <YStack flex={1} height={1} backgroundColor="#E0E0E0" />
        </XStack>

        {/* Social Login */}
        <XStack gap={12}>
          <Card
            flex={1}
            padding={16}
            backgroundColor="white"
            borderRadius={12}
            pressStyle={{ scale: 0.98 }}
            onPress={() => console.log("Google login")}
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
            onPress={() => console.log("Facebook login")}
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

        {/* Sign Up Link */}
        <YStack flex={1} justifyContent="flex-end" alignItems="center" paddingBottom={20}>
          <XStack gap={4}>
            <Text fontSize={14} color="#666">
              Don't have an account?
            </Text>
            <TouchableOpacity onPress={() => router.push("/register")}>
              <Text fontSize={14} color="#4A90E2" fontWeight="600">
                Sign Up
              </Text>
            </TouchableOpacity>
          </XStack>
        </YStack>
      </YStack>
    </KeyboardAvoidingView>
  );
}
