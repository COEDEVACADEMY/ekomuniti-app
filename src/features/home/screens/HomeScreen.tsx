import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import {
  Layout,
  Text,
  Button,
  List,
  ListItem,
  Divider,
} from '@ui-kitten/components';
import { useRouter } from 'expo-router';
import { announcements as initialAnnouncements } from '@/data/announcements';
import { eventEmitter } from '@/lib/event-emitter';

const quickStats = [
  { title: 'Total Members', value: '150' },
  { title: 'Active Members', value: '120' },
  { title: 'New Joins', value: '15' },
];

export default function HomeScreen() {
  const router = useRouter();
  const [announcements, setAnnouncements] = useState(initialAnnouncements);

  useEffect(() => {
    const unsubscribe = eventEmitter.on('announcement-created', () => {
      setAnnouncements([...initialAnnouncements]);
    });
    return () => unsubscribe();
  }, []);

  const handleAnnouncementPress = (announcement: { id: string; title: string; content: string; date: string }) => {
    // Since the announcements tab is removed, we do nothing here.
    // router.push({
    //   pathname: '/announcements/[id]',
    //   params: { ...announcement },
    // });
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
        Kampung Air Coding Community
      </Text>

      <Layout style={styles.statsContainer}>
        {quickStats.map((stat, index) => (
          <Layout key={index} style={styles.stat}>
            <Text category="h6">{stat.value}</Text>
            <Text category="s2">{stat.title}</Text>
          </Layout>
        ))}
      </Layout>

      <Button style={styles.newPostButton} onPress={() => router.push('/create-announcement')}>
        New Announcement
      </Button>

      <Text category="h5" style={styles.announcementsTitle}>
        Latest Announcements
      </Text>
      <List
        style={styles.announcementsList}
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
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  stat: {
    alignItems: 'center',
  },
  newPostButton: {
    marginBottom: 20,
  },
  announcementsTitle: {
    marginBottom: 10,
  },
  announcementsList: {
    backgroundColor: 'white',
  },
});
