import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { members } from '@/data/members';

const MemberDetailScreen = () => {
  const { id } = useLocalSearchParams();
  const member = members[parseInt(id as string, 10)];

  if (!member) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Member not found</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image source={{ uri: member.avatar }} style={styles.profilePicture} />
        <Text style={styles.memberName}>{member.name}</Text>
        <Text style={styles.memberDate}>Joined: {member.joined}</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    alignItems: 'center',
    padding: 24,
  },
  profilePicture: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
  },
  memberName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  memberDate: {
    fontSize: 16,
    color: '#8e8e93',
  },
});

export default MemberDetailScreen;
