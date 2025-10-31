import '@i18n';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import React from 'react';
import { CustomThemeProvider, useTheme } from '@/context/theme-context';
import { lightTheme, darkTheme } from '@/constants/eva-theme';

function AppLayout() {
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';

  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={isDarkMode ? darkTheme : lightTheme}>
        <ThemeProvider value={isDarkMode ? DarkTheme : DefaultTheme}>
          <Stack>
            <Stack.Screen name="index" options={{ title: 'Login' }} />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
            <Stack.Screen name="settings/choose-theme" options={{ title: 'Choose Theme' }} />
          </Stack>
          <StatusBar style={isDarkMode ? 'light' : 'dark'} />
        </ThemeProvider>
      </ApplicationProvider>
    </>
  );
}

export default function RootLayout() {
  return (
    <CustomThemeProvider>
      <AppLayout />
    </CustomThemeProvider>
  );
}
