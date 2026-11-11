import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS, ALL_CATEGORIES } from '../constants';
import { rupiah, formatTanggal } from '../utils/format';

// Props: item, onLongPress (opsional)
export default function TransactionItem({ item, onLongPress }) {
  const cat = ALL_CATEGORIES.find((c) => c.key === item.category);
  const isIncome = item.type === 'in';
  return (
    <TouchableOpacity activeOpacity={0.7} onLongPress={onLongPress} style={styles.row}>
      <View style={styles.icon}>
        <Text style={{ fontSize: 20 }}>{cat ? cat.icon : '🧾'}</Text>
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>{item.note || item.category}</Text>
        <Text style={styles.sub}>{item.category} • {formatTanggal(item.date)}</Text>
      </View>
      <Text style={[styles.amount, { color: isIncome ? COLORS.income : COLORS.expense }]}>
        {isIncome ? '+' : '-'}{rupiah(item.amount)}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.card,
    padding: 12, borderRadius: 12, marginBottom: 8,
  },
  icon: {
    width: 42, height: 42, borderRadius: 21, backgroundColor: COLORS.bg,
    alignItems: 'center', justifyContent: 'center', marginRight: 12,
  },
  title: { fontSize: 15, fontWeight: '600', color: COLORS.text },
  sub: { fontSize: 12, color: COLORS.muted, marginTop: 2 },
  amount: { fontSize: 14, fontWeight: '700' },
});
