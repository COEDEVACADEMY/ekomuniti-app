import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import React from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { members } from '@/data/members';

const MembersScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={members}
        keyExtractor={(item) => members.indexOf(item).toString()}
        renderItem={({ item }) => (
          <Link href={`/members/${members.indexOf(item)}`}>
            <View style={styles.memberContainer}>
              <Image source={{ uri: item.avatar }} style={styles.profilePicture} />
              <View style={styles.memberInfo}>
                <Text style={styles.memberName}>{item.name}</Text>
                <Text style={styles.memberDate}>Joined: {item.joined}</Text>
              </View>
              <Ionicons name="chevron-forward" size={24} color="#8e8e93" />
            </View>
          </Link>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  memberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
  },
  profilePicture: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
  },
  memberInfo: {
    flex: 1,
  },
  memberName: {
    fontSize: 18,
    fontWeight: '600',
  },
  memberDate: {
    fontSize: 14,
    color: '#8e8e93',
    marginTop: 4,
  },
});

export default MembersScreen;
