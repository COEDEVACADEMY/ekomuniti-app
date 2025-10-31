import React from 'react';
import { StyleSheet } from 'react-native';
import {
  Layout,
  Text,
  Input,
  Button,
  Spinner,
} from '@ui-kitten/components';
import community_information from '@/seed/community_information.json';
import { useRouter } from 'expo-router';

export default function EditCommunityProfileScreen() {
  const [loading, setLoading] = React.useState(false);
  const [form, setForm] = React.useState(community_information);
  const router = useRouter();

  const handleSave = () => {
    setLoading(true);
    // Here you would typically save the data to your backend
    console.log('Saving data:', form);
    setTimeout(() => {
      setLoading(false);
      router.back();
    }, 1000);
  };

  return (
    <Layout style={styles.container}>
      <Text category="h1" style={styles.title}>
        Edit Community Profile
      </Text>

      <Input
        label="Community Name"
        style={styles.input}
        value={form.community_name}
        onChangeText={(text) => setForm({ ...form, community_name: text })}
      />

      <Input
        label="Slogan"
        style={styles.input}
        value={form.slogan}
        onChangeText={(text) => setForm({ ...form, slogan: text })}
      />

      <Input
        label="Representative Name"
        style={styles.input}
        value={form.representativename}
        onChangeText={(text) => setForm({ ...form, representativename: text })}
      />

      <Input
        label="Email"
        style={styles.input}
        value={form.email}
        onChangeText={(text) => setForm({ ...form, email: text })}
        keyboardType="email-address"
      />

      <Input
        label="Phone Number"
        style={styles.input}
        value={form.phone_number}
        onChangeText={(text) => setForm({ ...form, phone_number: text })}
        keyboardType="phone-pad"
      />

      <Input
        label="Office Phone Number"
        style={styles.input}
        value={form.office_phone_number}
        onChangeText={(text) => setForm({ ...form, office_phone_number: text })}
        keyboardType="phone-pad"
      />

      <Input
        label="Website"
        style={styles.input}
        value={form.website}
        onChangeText={(text) => setForm({ ...form, website: text })}
        keyboardType="url"
      />

      <Input
        label="Address"
        style={styles.input}
        value={form.address}
        onChangeText={(text) => setForm({ ...form, address: text })}
        multiline
      />

      <Input
        label="State"
        style={styles.input}
        value={form.state}
        onChangeText={(text) => setForm({ ...form, state: text })}
      />

      <Input
        label="Postcode"
        style={styles.input}
        value={form.posscode}
        onChangeText={(text) => setForm({ ...form, posscode: text })}
        keyboardType="numeric"
      />

      <Button style={styles.button} onPress={handleSave} disabled={loading}>
        {loading ? <Spinner size="small" /> : 'Save Changes'}
      </Button>
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
  input: {
    marginBottom: 15,
  },
  button: {
    marginTop: 20,
  },
});
