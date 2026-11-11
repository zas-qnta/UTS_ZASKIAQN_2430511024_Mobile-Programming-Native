import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS } from '../constants';

// Props: options [{key,label}], active, onChange
export default function FilterTabs({ options, active, onChange }) {
  return (
    <View style={styles.wrap}>
      {options.map((o) => (
        <TouchableOpacity
          key={o.key}
          style={[styles.tab, active === o.key && styles.tabOn]}
          onPress={() => onChange(o.key)}
        >
          <Text style={[styles.text, active === o.key && styles.textOn]}>{o.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { flexDirection: 'row', backgroundColor: COLORS.border, borderRadius: 10, padding: 3, marginBottom: 12 },
  tab: { flex: 1, paddingVertical: 8, alignItems: 'center', borderRadius: 8 },
  tabOn: { backgroundColor: COLORS.card },
  text: { color: COLORS.muted, fontSize: 13 },
  textOn: { color: COLORS.primary, fontWeight: '700' },
});
