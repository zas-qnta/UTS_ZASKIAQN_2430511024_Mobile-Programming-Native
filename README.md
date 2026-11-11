# 📱 Kosku - Aplikasi Manajemen Keuangan Anak Kos
> **Tugas Ujian Tengah Semester (UTS) - Mobile Programming Native**

Aplikasi **Kosku** adalah aplikasi pencatatan keuangan berbasis **React Native** dan **Expo** yang dirancang khusus untuk membantu mahasiswa atau anak kos dalam mengelola keuangan harian, mencatat pemasukan & pengeluaran, menyusun anggaran bulanan, serta memantau riwayat transaksi secara real-time.

---

## 👤 Identitas Mahasiswa

* **Nama**: Zaskia QN
* **NIM**: 2430511024
* **Mata Kuliah**: Mobile Programming Native

---

## 🚀 Fitur Utama Aplikasi

1. **Dashboard / Home Screen (`HomeScreen.js`)**
   - Menampilkan total sisa saldo saat ini.
   - Akumulasi total pemasukan dan pengeluaran.
   - Ringkasan transaksi terbaru.
   - Form pencatatan cepat transaksi harian.

2. **Tambah Transaksi (`AddScreen.js`)**
   - Formulir input nominal, nama transaksi, kategori, dan tanggal.
   - Pilihan tipe transaksi (Pemasukan / Pengeluaran).

3. **Anggaran Bulanan (`BudgetScreen.js`)**
   - Pengaturan batas anggaran pengeluaran bulanan.
   - Indikator kemajuan (*progress bar*) alokasi dana kos.

4. **Riwayat Transaksi (`HistoryScreen.js`)**
   - Filter transaksi berdasarkan kategori/tipe (*FilterTabs*).
   - Daftar riwayat transaksi lengkap dengan rincian status.

---

## 📁 Struktur Folder Proyek

```text
UTS_ZASKIAQN_2430511024_Mobile-Programming-Native/
├── App.js                   # Entry point utama aplikasi React Native / Expo
├── AppReal.js               # Komponen navigasi / backup aplikasi
├── app.json                 # Konfigurasi proyek Expo
├── babel.config.js          # Konfigurasi Babel bundler
├── package.json             # Manajer dependensi & pustaka proyek
├── README.md                # Dokumentasi proyek
└── src/
    ├── components/          # Komponen UI Reusable
    │   ├── BalanceCard.js   # Kartu statistik sisa saldo
    │   ├── CategoryChip.js  # Label chip pilihan kategori
    │   ├── EmptyState.js    # Tampilan placeholder saat data kosong
    │   ├── FilterTabs.js    # Tab navigasi filter transaksi
    │   ├── ProgressBar.js   # Indikator persentase batas anggaran
    │   └── TransactionItem.js # Baris item riwayat transaksi
    ├── constants.js         # Nilai konstanta (warna, kategori, dll)
    ├── hooks/
    │   └── useFinance.js    # Custom Hook untuk logika & manajemen state transaksi
    ├── screens/             # Halaman Utama Aplikasi
    │   ├── AddScreen.js     # Layar input transaksi baru
    │   ├── BudgetScreen.js  # Layar pengelolaan anggaran
    │   ├── HistoryScreen.js # Layar riwayat & filter transaksi
    │   └── HomeScreen.js    # Layar utama dashboard keuangan
    └── utils/
        └── format.js        # Fungsi pembantu format mata uang (Rp) & tanggal

<img width="1357" height="640" alt="Screenshot 2026-11-09 192132" src="https://github.com/user-attachments/assets/7af30300-cb5b-4b74-9126-e7d3888dc88d" />
<img width="1356" height="673" alt="Screenshot 2026-11-09 192206" src="https://github.com/user-attachments/assets/2caf87fc-0ca0-4412-bc7a-10d98a9bc8c7" />
<img width="1357" height="621" alt="Screenshot 2026-11-09 192229" src="https://github.com/user-attachments/assets/812e5323-c885-434c-9b1d-082a8f2bf581" />
<img width="1354" height="636" alt="Screenshot 2026-11-09 192321" src="https://github.com/user-attachments/assets/b602dba6-86d7-4797-a024-82d042ffa96c" />
<img width="1351" height="629" alt="Screenshot 2026-11-09 192346" src="https://github.com/user-attachments/assets/1afba33a-c2f4-46f2-9e30-ca31fa6a3aa4" />





