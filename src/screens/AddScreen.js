import React, { useState } from 'react';
import { ScrollView, View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { COLORS, EXPENSE_CATEGORIES, INCOME_CATEGORIES } from '../constants';
import CategoryChip from '../components/CategoryChip';
import FilterTabs from '../components/FilterTabs';

// Props dari App: onAdd (fungsi untuk mengirim data ke state utama), navigation
export default function AddScreen({ onAdd, navigation }) {
  const [type, setType] = useState('out');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Makan');
  const [note, setNote] = useState('');

  const categories = type === 'out' ? EXPENSE_CATEGORIES : INCOME_CATEGORIES;

  const gantiJenis = (t) => {
    setType(t);
    setCategory(t === 'out' ? EXPENSE_CATEGORIES[0].key : INCOME_CATEGORIES[0].key);
  };

  const simpan = () => {
    const nominal = parseInt(amount.replace(/\D/g, ''), 10);
    if (!nominal || nominal <= 0) {
      Alert.alert('Nominal belum valid', 'Isi nominal dengan angka lebih dari 0.');
      return;
    }
    onAdd({ type, amount: nominal, category, note: note.trim() });
    navigation.goBack();
  };

  return (
    <ScrollView contentContainerStyle={{ padding: 16 }} style={{ backgroundColor: COLORS.bg }}>
      <FilterTabs
        options={[{ key: 'out', label: 'Pengeluaran' }, { key: 'in', label: 'Pemasukan' }]}
        active={type}
        onChange={gantiJenis}
      />

      <Text style={styles.label}>Nominal (Rp)</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="contoh: 15000"
        value={amount}
        onChangeText={setAmount}
      />

      <Text style={styles.label}>Kategori</Text>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
        {categories.map((c) => (
          <CategoryChip
            key={c.key}
            icon={c.icon}
            label={c.key}
            selected={category === c.key}
            onPress={() => setCategory(c.key)}
          />
        ))}
      </View>

      <Text style={styles.label}>Catatan (opsional)</Text>
      <TextInput
        style={styles.input}
        placeholder="contoh: makan siang warteg"
        value={note}
        onChangeText={setNote}
      />

      <TouchableOpacity style={styles.btn} onPress={simpan}>
        <Text style={styles.btnText}>Simpan</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  label: { fontSize: 13, fontWeight: '600', color: COLORS.text, marginTop: 14, marginBottom: 6 },
  input: {
    backgroundColor: COLORS.card, borderWidth: 1, borderColor: COLORS.border,
    borderRadius: 10, padding: 12, fontSize: 15,
  },
  btn: { backgroundColor: COLORS.primary, borderRadius: 12, padding: 14, alignItems: 'center', marginTop: 24 },
  btnText: { color: '#fff', fontWeight: '700', fontSize: 15 },
});
