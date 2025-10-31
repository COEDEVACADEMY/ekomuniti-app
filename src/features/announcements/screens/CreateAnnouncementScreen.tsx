import { router } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, SafeAreaView } from 'react-native';

import { addAnnouncement } from '@/data/announcements';

const CreateAnnouncementScreen = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleAddAnnouncement = () => {
    if (title.trim() === '' || content.trim() === '') {
      // Basic validation
      return;
    }
    addAnnouncement({ title, content });
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.input}
          value={title}
          onChangeText={setTitle}
          placeholder="Enter announcement title"
        />
        <Text style={styles.label}>Content</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={content}
          onChangeText={setContent}
          placeholder="Enter announcement content"
          multiline
        />
        <Button title="Create Announcement" onPress={handleAddAnnouncement} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  form: {
    padding: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    marginBottom: 16,
    fontSize: 16,
  },
  textArea: {
    height: 120,
    textAlignVertical: 'top',
  },
});

export default CreateAnnouncementScreen;
