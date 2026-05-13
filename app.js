// Mengecek apakah pengguna sudah login
if (!localStorage.getItem("loggedIn")) {
  window.location.href = "login.html";
}

// Data Barang (termasuk harga, stok, dan gambar produk)
const barangList = [
  { nama: 'Beras merah', harga: 22000, stok: 75, gambar: 'beras merah.jpg' },
  { nama: 'Gula aren', harga: 34000, stok: 100, gambar: 'gula aren.jpg' },
  { nama: 'Minyak Goreng', harga: 23000, stok: 50, gambar: 'minyak.jpg' },
  { nama: 'Telur bebek', harga: 4500, stok: 100, gambar: 'telur bebek.jpg' },
  { nama: 'Bawang merah dan putih', harga: 15000, stok: 500, gambar: 'bawang merah dan putih.jpg' },
  { nama: 'Cabai merah', harga: 54000, stok: 500, gambar: 'cabai merah.jpg' }
];

// Mengambil elemen-elemen HTML
const barangListElement = document.getElementById('barang-list');
const keranjangUl = document.getElementById('keranjang-ul');
const totalHargaElement = document.getElementById('total');
const prosesPembelianBtn = document.getElementById('proses-pembelian-btn');
const logoutBtn = document.getElementById("logout-btn");

// Menampilkan produk di katalog
barangList.forEach(barang => {
  const card = document.createElement('div');
  card.classList.add('product-card');
  
  card.innerHTML = `
    <img src="images/${barang.gambar}" alt="${barang.nama}" class="product-image">
    <h3>${barang.nama}</h3>
    <p class="price">Rp ${barang.harga}</p>
    <label for="jumlah-${barang.nama}">Jumlah:</label>
    <input type="number" id="jumlah-${barang.nama}" min="1" max="${barang.stok}" value="1">
    <button class="tambah-btn" data-nama="${barang.nama}" data-harga="${barang.harga}" data-stok="${barang.stok}">Tambah ke Keranjang</button>
  `;
  
  barangListElement.appendChild(card);
});

// Keranjang Belanja
let keranjang = [];

// Fungsi untuk menambahkan barang ke keranjang
function tambahKeKeranjang(nama, harga, stok) {
  const jumlah = parseInt(document.getElementById(`jumlah-${nama}`).value);

  if (isNaN(jumlah) || jumlah <= 0 || jumlah > stok) {
    alert("Jumlah barang tidak valid!");
    return;
  }

  const barang = keranjang.find(item => item.nama === nama);
  
  if (barang) {
    barang.jumlah += jumlah;
    barang.total = barang.jumlah * harga;
  } else {
    keranjang.push({ nama, harga, jumlah, total: harga * jumlah });
  }

  tampilkanKeranjang();
  hitungTotalBelanja();
}

// Menampilkan keranjang belanja
function tampilkanKeranjang() {
  keranjangUl.innerHTML = ''; 
  keranjang.forEach(item => {
    const li = document.createElement('li');
    li.textContent = `${item.nama} x${item.jumlah} - Rp${item.total}`;
    keranjangUl.appendChild(li);
  });
}

// Menghitung total belanja
function hitungTotalBelanja() {
  const total = keranjang.reduce((acc, item) => acc + item.total, 0);
  totalHargaElement.textContent = total;
}

// Event tombol tambah
document.querySelectorAll('.tambah-btn').forEach(button => {
  button.addEventListener('click', (event) => {
    const nama = event.target.dataset.nama;
    const harga = parseInt(event.target.dataset.harga);
    const stok = parseInt(event.target.dataset.stok);
    tambahKeKeranjang(nama, harga, stok);
  });
});

// Export sum untuk test Node.js
function sum(a, b) {
  return a + b;
}

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = { sum };
}