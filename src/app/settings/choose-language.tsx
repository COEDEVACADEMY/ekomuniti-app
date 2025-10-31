import React from 'react';
import { StyleSheet } from 'react-native';
import {
  Layout,
  Text,
  RadioGroup,
  Radio,
} from '@ui-kitten/components';

export default function ChooseLanguageScreen() {
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  return (
    <Layout style={styles.container}>
      <Text category="h1" style={styles.title}>
        Choose Language
      </Text>
      <RadioGroup
        selectedIndex={selectedIndex}
        onChange={index => setSelectedIndex(index)}>
        <Radio>English</Radio>
        <Radio>Malay</Radio>
        <Radio>Chinese</Radio>
      </RadioGroup>
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
});
