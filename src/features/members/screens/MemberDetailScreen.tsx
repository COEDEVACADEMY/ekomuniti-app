import React from 'react';
import { StyleSheet } from 'react-native';
import {
  Layout,
  Text,
  Avatar,
} from '@ui-kitten/components';
import { useLocalSearchParams } from 'expo-router';

export default function MemberDetailScreen() {
  const { name, role, avatar, bio, joined } = useLocalSearchParams();

  return (
    <Layout style={styles.container}>
      <Avatar source={{ uri: avatar as string }} style={styles.avatar} />
      <Text category="h1" style={styles.name}>
        {name}
      </Text>
      <Text category="s1" style={styles.role}>
        {role}
      </Text>
      <Text style={styles.bio}>
        {bio}
      </Text>
      <Text style={styles.joined}>
        Joined: {joined}
      </Text>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  avatar: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  name: {
    marginBottom: 5,
  },
  role: {
    marginBottom: 20,
  },
  bio: {
    textAlign: 'center',
    marginBottom: 20,
  },
  joined: {
    color: 'gray',
  },
});
