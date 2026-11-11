export const rupiah = (n) => {
  const value = Math.round(Number(n) || 0);
  const sign = value < 0 ? '-' : '';
  return sign + 'Rp ' + String(Math.abs(value)).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};

const BULAN = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
const BULAN_PANJANG = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];

export const formatTanggal = (iso) => {
  const d = new Date(iso);
  return `${d.getDate()} ${BULAN[d.getMonth()]} ${d.getFullYear()}`;
};

export const namaBulanIni = () => {
  const d = new Date();
  return `${BULAN_PANJANG[d.getMonth()]} ${d.getFullYear()}`;
};

export const isBulanIni = (iso) => {
  const d = new Date(iso);
  const now = new Date();
  return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
};

// Sisa hari pada bulan berjalan (termasuk hari ini)
export const sisaHariBulanIni = () => {
  const now = new Date();
  const akhir = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
  return akhir - now.getDate() + 1;
};
