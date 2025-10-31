import React from 'react';
import { StyleSheet } from 'react-native';
import {
  Layout,
  Text,
  List,
  ListItem,
  Divider,
} from '@ui-kitten/components';
import { useRouter } from 'expo-router';
import { announcements } from '@/data/announcements';

export default function AnnouncementsScreen() {
  const router = useRouter();

  const handleAnnouncementPress = (announcement: { id: string, title: string, content: string, date: string }) => {
    const { id, title, content, date } = announcement;
    router.push({
      pathname: '/announcements/[id]',
      params: { id, title, content, date },
    });
  };

  const renderAnnouncement = ({ item }: { item: { id: string; title: string; date: string; content: string } }) => (
    <ListItem
      title={`${item.title} - ${item.date}`}
      onPress={() => handleAnnouncementPress(item)}
    />
  );

  return (
    <Layout style={styles.container}>
      <Text category="h1" style={styles.title}>
        Announcements
      </Text>
      <List
        style={styles.list}
        data={announcements}
        renderItem={renderAnnouncement}
        ItemSeparatorComponent={Divider}
      />
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
  list: {
    backgroundColor: 'white',
  },
});
