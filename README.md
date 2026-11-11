# KosKu - Aplikasi Manajemen Keuangan Anak Kos (React Native / Expo SDK 51)

Aplikasi untuk mencatat pemasukan dan pengeluaran, memantau anggaran bulanan per kategori,
dan menghitung jatah belanja harian sampai akhir bulan. Data disimpan lokal di perangkat (AsyncStorage).

## Menjalankan
```
npm install
npx expo start
```
Pindai kode QR dengan Expo Go (SDK 51) atau tekan `a` untuk emulator Android.
Jika ada peringatan versi paket, jalankan `npx expo install --fix`.

## Pemenuhan Soal UTS
| Ketentuan | Penerapan |
|---|---|
| a. Minimal 4 komponen | BalanceCard, TransactionItem, CategoryChip, ProgressBar, FilterTabs, EmptyState |
| b. State dan props | State di hook `useFinance` (App.js), dikirim ke layar dan komponen lewat props |
| c. Navigasi | Bottom Tab (Beranda, Riwayat, Anggaran) + Stack (Catat Transaksi) |
| d. Hooks | useState, useEffect, useMemo, useCallback, custom hook useFinance |

## Struktur
```
App.js                 navigasi + state utama
src/constants.js       warna, kategori, anggaran bawaan
src/utils/format.js    format rupiah dan tanggal
src/hooks/useFinance.js
src/components/        6 komponen
src/screens/           HomeScreen, AddScreen, HistoryScreen, BudgetScreen
```
