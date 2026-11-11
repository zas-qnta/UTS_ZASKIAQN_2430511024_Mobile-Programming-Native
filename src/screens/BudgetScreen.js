import React, { useState, useEffect, useMemo } from 'react';
import { ScrollView, View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { COLORS, EXPENSE_CATEGORIES } from '../constants';
import ProgressBar from '../components/ProgressBar';
import { rupiah, isBulanIni } from '../utils/format';

// Props dari App: transactions, budget, onSave
export default function BudgetScreen({ transactions, budget, onSave }) {
  const [allowance, setAllowance] = useState(String(budget.allowance));
  const [limits, setLimits] = useState(
    Object.fromEntries(Object.entries(budget.limits).map(([k, v]) => [k, String(v)]))
  );

  // Sinkronkan form jika data anggaran selesai dimuat dari penyimpanan
  useEffect(() => {
    setAllowance(String(budget.allowance));
    setLimits(Object.fromEntries(Object.entries(budget.limits).map(([k, v]) => [k, String(v)])));
  }, [budget]);

  const terpakai = useMemo(() => {
    const hasil = {};
    transactions
      .filter((t) => t.type === 'out' && isBulanIni(t.date))
      .forEach((t) => { hasil[t.category] = (hasil[t.category] || 0) + t.amount; });
    return hasil;
  }, [transactions]);

  const angka = (s) => parseInt(String(s).replace(/\D/g, ''), 10) || 0;

  const simpan = () => {
    onSave({
      allowance: angka(allowance),
      limits: Object.fromEntries(Object.entries(limits).map(([k, v]) => [k, angka(v)])),
    });
    Alert.alert('Tersimpan', 'Anggaran berhasil diperbarui.');
  };

  return (
    <ScrollView contentContainerStyle={{ padding: 16 }} style={{ backgroundColor: COLORS.bg }}>
      <Text style={styles.label}>Uang bulanan (kiriman + pendapatan)</Text>
      <TextInput style={styles.input} keyboardType="numeric" value={allowance} onChangeText={setAllowance} />

      <Text style={styles.section}>Batas per Kategori</Text>
      {EXPENSE_CATEGORIES.map((c) => (
        <View key={c.key} style={styles.card}>
          <View style={styles.rowBetween}>
            <Text style={styles.cat}>{c.icon} {c.key}</Text>
            <TextInput
              style={styles.small}
              keyboardType="numeric"
              value={limits[c.key]}
              onChangeText={(v) => setLimits({ ...limits, [c.key]: v })}
            />
          </View>
          <ProgressBar value={terpakai[c.key] || 0} max={angka(limits[c.key])} />
          <Text style={styles.muted}>
            Terpakai {rupiah(terpakai[c.key] || 0)} dari {rupiah(angka(limits[c.key]))}
          </Text>
        </View>
      ))}

      <TouchableOpacity style={styles.btn} onPress={simpan}>
        <Text style={styles.btnText}>Simpan Anggaran</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  label: { fontSize: 13, fontWeight: '600', color: COLORS.text, marginBottom: 6 },
  section: { fontSize: 16, fontWeight: '700', color: COLORS.text, marginTop: 20, marginBottom: 8 },
  input: { backgroundColor: COLORS.card, borderWidth: 1, borderColor: COLORS.border, borderRadius: 10, padding: 12, fontSize: 15 },
  card: { backgroundColor: COLORS.card, borderRadius: 12, padding: 12, marginBottom: 10 },
  rowBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  cat: { fontSize: 14, fontWeight: '600', color: COLORS.text },
  small: { width: 110, borderWidth: 1, borderColor: COLORS.border, borderRadius: 8, padding: 6, textAlign: 'right' },
  muted: { fontSize: 12, color: COLORS.muted, marginTop: 6 },
  btn: { backgroundColor: COLORS.primary, borderRadius: 12, padding: 14, alignItems: 'center', marginTop: 12, marginBottom: 24 },
  btnText: { color: '#fff', fontWeight: '700', fontSize: 15 },
});
