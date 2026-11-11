import React from 'react';
import { View, StyleSheet } from 'react-native';
import { COLORS } from '../constants';

// Props: value (terpakai), max (batas)
export default function ProgressBar({ value, max }) {
  const ratio = max > 0 ? value / max : 0;
  const color = ratio >= 1 ? COLORS.expense : ratio >= 0.8 ? COLORS.warn : COLORS.primary;
  return (
    <View style={styles.track}>
      <View style={[styles.fill, { width: `${Math.min(ratio, 1) * 100}%`, backgroundColor: color }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  track: { height: 8, borderRadius: 4, backgroundColor: COLORS.border, overflow: 'hidden' },
  fill: { height: 8, borderRadius: 4 },
});
