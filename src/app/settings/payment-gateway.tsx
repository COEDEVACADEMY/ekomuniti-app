import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import toyyibpayData from '@/seed/toyyibpay.json';

const PaymentGatewaySettingsScreen = () => {
  const [secretKey, setSecretKey] = useState(toyyibpayData.secret_key);
  const [categoryCode, setCategoryCode] = useState(toyyibpayData.category_code);

  const handleSaveChanges = () => {
    // In a real app, you would save these values to a secure storage.
    console.log('Saved changes:', { secretKey, categoryCode });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.label}>Secret Key</Text>
        <TextInput
          style={styles.input}
          value={secretKey}
          onChangeText={setSecretKey}
          placeholder="Enter your ToyyibPay secret key"
          secureTextEntry
        />
        <Text style={styles.label}>Category Code</Text>
        <TextInput
          style={styles.input}
          value={categoryCode}
          onChangeText={setCategoryCode}
          placeholder="Enter your ToyyibPay category code"
        />
        <Button title="Save Changes" onPress={handleSaveChanges} />
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
});

export default PaymentGatewaySettingsScreen;
