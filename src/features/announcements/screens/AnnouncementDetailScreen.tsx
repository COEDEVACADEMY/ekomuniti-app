import React from 'react';
import { StyleSheet } from 'react-native';
import {
  Layout,
  Text,
} from '@ui-kitten/components';
import { useLocalSearchParams } from 'expo-router';

export default function AnnouncementDetailScreen() {
  const { title, content, date } = useLocalSearchParams();

  return (
    <Layout style={styles.container}>
      <Text category="h1" style={styles.title}>
        {title}
      </Text>
      <Text category="s1" style={styles.date}>
        {date}
      </Text>
      <Text style={styles.content}>
        {content}
      </Text>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    marginBottom: 10,
  },
  date: {
    marginBottom: 20,
  },
  content: {
    fontSize: 16,
  },
});
