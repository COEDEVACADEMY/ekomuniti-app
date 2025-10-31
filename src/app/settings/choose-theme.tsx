import React from 'react';
import { StyleSheet } from 'react-native';
import {
  Layout,
  Text,
  RadioGroup,
  Radio,
} from '@ui-kitten/components';
import { useTheme } from '@/context/theme-context';

export default function ChooseThemeScreen() {
  const { theme, setTheme } = useTheme();
  const [selectedIndex, setSelectedIndex] = React.useState(theme === 'light' ? 0 : 1);

  const handleThemeChange = (index: number) => {
    setSelectedIndex(index);
    setTheme(index === 0 ? 'light' : 'dark');
  };

  return (
    <Layout style={styles.container}>
      <Text category="h1" style={styles.title}>
        Choose Theme
      </Text>
      <RadioGroup
        selectedIndex={selectedIndex}
        onChange={handleThemeChange}>
        <Radio>Light</Radio>
        <Radio>Dark</Radio>
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
