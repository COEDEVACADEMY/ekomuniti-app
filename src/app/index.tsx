import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { View } from 'tamagui';
import { TokenStorage } from '../utils/tokenStorage';
import React from 'react';

export default function Index() {
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const isAuthenticated = await TokenStorage.isAuthenticated();
        if (isAuthenticated) {
          router.replace('/(tabs)');
        } else {
          router.replace('/welcome');
        }
      } catch (error) {
        console.error("Auth check failed", error);
        router.replace('/welcome');
      } finally {
        setAuthChecked(true);
      }
    };

    checkAuth();
  }, []);

  // Return a loading view or null while checking auth
  // This allows the splash screen to be visible
  return <View />;
}