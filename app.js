// Mengecek apakah pengguna sudah login
if (!localStorage.getItem("loggedIn")) {
  window.location.href = "login.html";
}

// Data Barang
const barangList = [
  { nama: 'Beras merah', harga: 22000, stok: 75, gambar: 'beras merah.jpg' },
  { nama: 'Gula aren', harga: 34000, stok: 100, gambar: 'gula aren.jpg' },
  { nama: 'Minyak Goreng', harga: 23000, stok: 50, gambar: 'minyak.jpg' },
  { nama: 'Telur bebek', harga: 4500, stok: 100, gambar: 'telur bebek.jpg' },
  { nama: 'Bawang merah dan putih', harga: 15000, stok: 500, gambar: 'bawang merah dan putih.jpg' },
  { nama: 'Cabai merah', harga: 54000, stok: 500, gambar: 'cabai merah.jpg' }
];

// Kode katalog dan keranjang tetap sama ...

// Export sum untuk Node.js test
function sum(a, b) {
  return a + b;
}

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = { sum };
}