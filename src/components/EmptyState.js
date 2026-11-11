import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../constants';

// Props: pesan
export default function EmptyState({ pesan }) {
  return (
    <View style={styles.box}>
      <Text style={{ fontSize: 36 }}>🪙</Text>
      <Text style={styles.text}>{pesan}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  box: { alignItems: 'center', paddingVertical: 32 },
  text: { color: COLORS.muted, marginTop: 8, textAlign: 'center' },
});
