import React from 'react';
import { View, Text, ScrollView, Platform } from 'react-native';

let Real = null;
let loadError = null;
try {
  Real = require('./AppReal').default;
} catch (e) {
  loadError = e;
}

export default function App() {
  const tinggi = Platform.OS === 'web' ? { minHeight: '100vh' } : {};
  if (loadError) {
    return (
      <ScrollView style={[{ flex: 1, padding: 20, paddingTop: 60, backgroundColor: '#FEF2F2' }, tinggi]}>
        <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#991B1B' }}>Error saat memuat aplikasi</Text>
        <Text style={{ marginTop: 10, color: '#7F1D1D' }}>
          {String(loadError && (loadError.stack || loadError.message || loadError))}
        </Text>
      </ScrollView>
    );
  }
  return (
    <View style={[{ flex: 1 }, tinggi]}>
      <Real />
    </View>
  );
}