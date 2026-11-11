import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS } from '../constants';

// Props: icon, label, selected, onPress
export default function CategoryChip({ icon, label, selected, onPress }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.chip, selected && styles.chipOn]}
    >
      <Text style={[styles.text, selected && styles.textOn]}>{icon} {label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  chip: {
    paddingVertical: 8, paddingHorizontal: 12, borderRadius: 20, borderWidth: 1,
    borderColor: COLORS.border, backgroundColor: COLORS.card, marginRight: 8, marginBottom: 8,
  },
  chipOn: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
  text: { color: COLORS.text, fontSize: 13 },
  textOn: { color: '#fff', fontWeight: '700' },
});
