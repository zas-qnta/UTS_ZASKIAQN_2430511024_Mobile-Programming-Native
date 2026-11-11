import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../constants';
import { rupiah } from '../utils/format';

// Props: balance, income, expense, periode
export default function BalanceCard({ balance, income, expense, periode }) {
  return (
    <View style={styles.card}>
      <Text style={styles.label}>Saldo Saat Ini</Text>
      <Text style={styles.balance}>{rupiah(balance)}</Text>
      <Text style={styles.periode}>Ringkasan {periode}</Text>
      <View style={styles.row}>
        <View style={styles.col}>
          <Text style={styles.sub}>Pemasukan</Text>
          <Text style={[styles.val, { color: '#BBF7D0' }]}>{rupiah(income)}</Text>
        </View>
        <View style={styles.col}>
          <Text style={styles.sub}>Pengeluaran</Text>
          <Text style={[styles.val, { color: '#FECACA' }]}>{rupiah(expense)}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: COLORS.primary, borderRadius: 18, padding: 20, marginBottom: 16 },
  label: { color: '#CCFBF1', fontSize: 13 },
  balance: { color: '#fff', fontSize: 30, fontWeight: '800', marginVertical: 4 },
  periode: { color: '#99F6E4', fontSize: 12, marginTop: 8, marginBottom: 8 },
  row: { flexDirection: 'row' },
  col: { flex: 1 },
  sub: { color: '#CCFBF1', fontSize: 12 },
  val: { fontSize: 15, fontWeight: '700', marginTop: 2 },
});
