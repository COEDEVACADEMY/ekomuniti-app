import React from 'react';
import { StyleSheet } from 'react-native';
import {
  Layout,
  Text,
  List,
  ListItem,
  Avatar,
  Divider,
} from '@ui-kitten/components';
import { useRouter } from 'expo-router';
import { members } from '@/data/members';

export default function MembersScreen() {
  const router = useRouter();

  const handleMemberPress = (member: { name: string, role: string, avatar: string, bio: string, joined: string }) => {
    router.push({
      pathname: '/members/[id]',
      params: { ...member, id: member.name },
    });
  };

  const renderMember = ({ item }: { item: { name: string; role: string; avatar: string; bio: string; joined: string } }) => (
    <ListItem
      title={item.name}
      description={item.role}
      accessoryLeft={() => <Avatar source={{ uri: item.avatar }} />}
      onPress={() => handleMemberPress(item)}
    />
  );

  return (
    <Layout style={styles.container}>
      <Text category="h1" style={styles.title}>
        Members
      </Text>
      <List
        style={styles.list}
        data={members}
        renderItem={renderMember}
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
