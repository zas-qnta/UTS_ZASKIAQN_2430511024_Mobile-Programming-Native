export const COLORS = {
  primary: '#0F766E',
  primaryDark: '#115E59',
  bg: '#F3F6F5',
  card: '#FFFFFF',
  text: '#1F2937',
  muted: '#6B7280',
  income: '#15803D',
  expense: '#DC2626',
  warn: '#D97706',
  border: '#E5E7EB',
};

export const EXPENSE_CATEGORIES = [
  { key: 'Makan', icon: '🍜' },
  { key: 'Tagihan', icon: '💡' },
  { key: 'Transport', icon: '🛵' },
  { key: 'Kuliah', icon: '📚' },
  { key: 'Hiburan', icon: '🎮' },
  { key: 'Lainnya', icon: '🧾' },
];

export const INCOME_CATEGORIES = [
  { key: 'Kiriman Ortu', icon: '👪' },
  { key: 'Part-time', icon: '💼' },
  { key: 'Beasiswa', icon: '🎓' },
  { key: 'Lainnya', icon: '💰' },
];

export const ALL_CATEGORIES = [...EXPENSE_CATEGORIES, ...INCOME_CATEGORIES];

export const DEFAULT_BUDGET = {
  allowance: 1500000, // uang bulanan
  limits: {
    Makan: 600000,
    Tagihan: 250000,
    Transport: 150000,
    Kuliah: 150000,
    Hiburan: 100000,
    Lainnya: 100000,
  },
};
