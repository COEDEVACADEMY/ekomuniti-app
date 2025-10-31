import React, { useState, useEffect } from 'react';
import { Layout, Text, Input, Button } from '@ui-kitten/components';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import * as democred from '@/seed/demoaccount.json';
import { Image, View } from 'react-native';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();
  const { t } = useTranslation();

  useEffect(() => {
    if (isAuthenticated) {
      router.replace('/home' as any);
    }
  }, [isAuthenticated, router]);

  const handleLogin = () => {
    if (email === democred.email && password === democred.password) {
      setError('');
      setIsAuthenticated(true);
    } else {
      setError(t('Invalid email or password'));
    }
  };

  return (
    <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
      <View style={{ alignItems: 'center', marginBottom: 20 }}>
        <Image
          source={require('@/assets/images/logo.jpeg')}
          style={{ width: 100, height: 100, borderRadius: 50 }}
        />
      </View>
      <Text category='h1' style={{ marginBottom: 20 }}>{t('Login')}</Text>
      {error ? <Text style={{ color: 'red', marginBottom: 10 }}>{error}</Text> : null}
      <Input
        placeholder={t('Email')}
        value={email}
        onChangeText={setEmail}
        style={{ marginBottom: 10 }}
      />
      <Input
        placeholder={t('Password')}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{ marginBottom: 20 }}
      />
      <Button onPress={handleLogin}>{t('Login')}</Button>
    </Layout>
  );
}
