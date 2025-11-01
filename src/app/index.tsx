import { Redirect } from 'expo-router';

export default function Index() {
  // TODO: Add authentication check here
  // If user is logged in, redirect to /(tabs)
  // Otherwise, redirect to /login

  const isAuthenticated = false; // Change this based on your auth logic

  if (isAuthenticated) {
    return <Redirect href="/(tabs)" />;
  }

  // Default route to login screen
  return <Redirect href="/login" />;
}
