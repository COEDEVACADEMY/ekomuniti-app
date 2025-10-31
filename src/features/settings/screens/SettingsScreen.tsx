import React from 'react';
import { StyleSheet, Alert } from 'react-native';
import {
  Layout,
  Text,
  Toggle,
  Button,
  Divider,
} from '@ui-kitten/components';
import { useRouter } from 'expo-router';

export default function SettingsScreen() {
  const [notifications, setNotifications] = React.useState(true);
  const [darkMode, setDarkMode] = React.useState(false);
  const router = useRouter();

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => router.replace('/'),
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <Layout style={styles.container}>
      <Text category="h1" style={styles.title}>
        Settings
      </Text>

      <Layout style={styles.setting}>
        <Text>Enable Notifications</Text>
        <Toggle checked={notifications} onChange={setNotifications} />
      </Layout>

      <Divider />

      <Layout style={styles.setting}>
        <Text>Dark Mode</Text>
        <Toggle checked={darkMode} onChange={setDarkMode} />
      </Layout>

      <Divider />

      <Button style={styles.button} appearance="outline" onPress={() => router.push('/settings/edit-community-profile')}>
        Edit Community Profile
      </Button>

      <Button style={styles.button} appearance="outline" onPress={() => router.push('/settings/organisation-chart')}>
        Organisation Chart
      </Button>

      <Button style={styles.button} appearance="outline" onPress={() => router.push('/settings/choose-language')}>
        Choose Language
      </Button>

      <Button style={styles.button} appearance="outline" onPress={() => router.push('/settings/payment-gateway')}>
        Payment Gateway
      </Button>

      <Button style={styles.button} appearance="outline">
        Clear Cache
      </Button>

      <Button style={styles.button} appearance="filled" status="danger" onPress={handleLogout}>
        Logout
      </Button>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    textAlign: 'center',
    marginBottom: 20,
  },
  setting: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
  },
  button: {
    marginTop: 20,
  },
});
