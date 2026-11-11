import React, { useMemo } from 'react';
import { ScrollView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS } from '../constants';
import BalanceCard from '../components/BalanceCard';
import TransactionItem from '../components/TransactionItem';
import ProgressBar from '../components/ProgressBar';
import EmptyState from '../components/EmptyState';
import { rupiah, isBulanIni, namaBulanIni, sisaHariBulanIni } from '../utils/format';

// Props dari App: transactions, budget, navigation
export default function HomeScreen({ transactions, budget, navigation }) {
  const ringkasan = useMemo(() => {
    const totalIn = transactions.filter((t) => t.type === 'in').reduce((s, t) => s + t.amount, 0);
    const totalOut = transactions.filter((t) => t.type === 'out').reduce((s, t) => s + t.amount, 0);
    const bulanIni = transactions.filter((t) => isBulanIni(t.date));
    const inBulan = bulanIni.filter((t) => t.type === 'in').reduce((s, t) => s + t.amount, 0);
    const outBulan = bulanIni.filter((t) => t.type === 'out').reduce((s, t) => s + t.amount, 0);
    const saldo = totalIn - totalOut;
    const jatahHarian = Math.max(0, saldo) / sisaHariBulanIni();
    return { saldo, inBulan, outBulan, jatahHarian };
  }, [transactions]);

  const pesan =
    ringkasan.outBulan > budget.allowance
      ? '⚠️ Pengeluaran bulan ini sudah melebihi uang bulanan. Saatnya berhemat!'
      : ringkasan.outBulan > budget.allowance * 0.8
      ? '⚠️ Pengeluaran sudah lebih dari 80% uang bulanan.'
      : '✅ Pengeluaran masih aman bulan ini.';

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.bg }}>
      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 90 }}>
        <BalanceCard
          balance={ringkasan.saldo}
          income={ringkasan.inBulan}
          expense={ringkasan.outBulan}
          periode={namaBulanIni()}
        />

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Jatah Harian</Text>
          <Text style={styles.big}>{rupiah(ringkasan.jatahHarian)}</Text>
          <Text style={styles.muted}>per hari untuk {sisaHariBulanIni()} hari tersisa bulan ini</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Anggaran Bulanan</Text>
          <Text style={styles.muted}>
            {rupiah(ringkasan.outBulan)} dari {rupiah(budget.allowance)}
          </Text>
          <View style={{ marginVertical: 8 }}>
            <ProgressBar value={ringkasan.outBulan} max={budget.allowance} />
          </View>
          <Text style={styles.text}>{pesan}</Text>
        </View>

        <Text style={styles.section}>Transaksi Terakhir</Text>
        {transactions.length === 0 ? (
          <EmptyState pesan="Belum ada transaksi. Catat uang masuk dan keluar pertamamu!" />
        ) : (
          transactions.slice(0, 5).map((t) => <TransactionItem key={t.id} item={t} />)
        )}
      </ScrollView>

      <TouchableOpacity style={styles.fab} onPress={() => navigation.navigate('Tambah')}>
        <Text style={styles.fabText}>+ Catat Transaksi</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: COLORS.card, borderRadius: 14, padding: 16, marginBottom: 12 },
  cardTitle: { fontSize: 13, color: COLORS.muted, marginBottom: 4 },
  big: { fontSize: 24, fontWeight: '800', color: COLORS.primary },
  muted: { fontSize: 12, color: COLORS.muted },
  text: { fontSize: 13, color: COLORS.text },
  section: { fontSize: 16, fontWeight: '700', color: COLORS.text, marginVertical: 8 },
  fab: {
    position: 'absolute', bottom: 16, alignSelf: 'center', backgroundColor: COLORS.primaryDark,
    paddingVertical: 14, paddingHorizontal: 28, borderRadius: 30, elevation: 4,
  },
  fabText: { color: '#fff', fontWeight: '700' },
});
