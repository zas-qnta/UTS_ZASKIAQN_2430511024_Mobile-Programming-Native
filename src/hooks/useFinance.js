import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DEFAULT_BUDGET } from '../constants';

const STORAGE_KEY = '@kosku_data_v1';

// Custom hook: mengelola state transaksi & anggaran serta menyimpannya ke penyimpanan lokal
export default function useFinance() {
  const [transactions, setTransactions] = useState([]);
  const [budget, setBudget] = useState(DEFAULT_BUDGET);
  const [loaded, setLoaded] = useState(false);

  // Muat data saat aplikasi dibuka
  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (raw) {
          const saved = JSON.parse(raw);
          setTransactions(saved.transactions || []);
          setBudget({
            ...DEFAULT_BUDGET,
            ...saved.budget,
            limits: { ...DEFAULT_BUDGET.limits, ...(saved.budget && saved.budget.limits) },
          });
        }
      } catch (e) {
        // data rusak: gunakan nilai bawaan
      }
      setLoaded(true);
    })();
  }, []);

  // Simpan setiap ada perubahan
  useEffect(() => {
    if (!loaded) return;
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify({ transactions, budget })).catch(() => {});
  }, [transactions, budget, loaded]);

  const addTransaction = useCallback((t) => {
    setTransactions((prev) => [
      { id: Date.now().toString(), date: new Date().toISOString(), ...t },
      ...prev,
    ]);
  }, []);

  const deleteTransaction = useCallback((id) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const updateBudget = useCallback((next) => setBudget(next), []);

  return { transactions, budget, loaded, addTransaction, deleteTransaction, updateBudget };
}
