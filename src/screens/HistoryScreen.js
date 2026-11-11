import React, { useState } from 'react';
import { View, FlatList, Alert, StyleSheet } from 'react-native';
import { COLORS } from '../constants';
import FilterTabs from '../components/FilterTabs';
import TransactionItem from '../components/TransactionItem';
import EmptyState from '../components/EmptyState';

const OPSI = [
  { key: 'all', label: 'Semua' },
  { key: 'in', label: 'Pemasukan' },
  { key: 'out', label: 'Pengeluaran' },
];

// Props dari App: transactions, onDelete
export default function HistoryScreen({ transactions, onDelete }) {
  const [filter, setFilter] = useState('all');
  const data = filter === 'all' ? transactions : transactions.filter((t) => t.type === filter);

  const konfirmasiHapus = (item) => {
    Alert.alert('Hapus transaksi?', `${item.note || item.category} akan dihapus.`, [
      { text: 'Batal', style: 'cancel' },
      { text: 'Hapus', style: 'destructive', onPress: () => onDelete(item.id) },
    ]);
  };

  return (
    <View style={styles.wrap}>
      <FilterTabs options={OPSI} active={filter} onChange={setFilter} />
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TransactionItem item={item} onLongPress={() => konfirmasiHapus(item)} />
        )}
        ListEmptyComponent={<EmptyState pesan="Tidak ada transaksi pada kategori ini." />}
        ListFooterComponent={
          data.length > 0 ? <EmptyState pesan="Tekan lama pada transaksi untuk menghapus." /> : null
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({ wrap: { flex: 1, padding: 16, backgroundColor: COLORS.bg } });
