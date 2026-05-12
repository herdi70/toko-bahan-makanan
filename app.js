// Mengecek login
if (!localStorage.getItem("loggedIn")) {
  window.location.href = "login.html";
}

// Data barang
const barangList = [
  { nama: 'Beras merah', harga: 22000, stok: 75, gambar: 'beras merah.jpg' },
  { nama: 'Gula aren', harga: 34000, stok: 100, gambar: 'gula aren.jpg' },
  { nama: 'Minyak Goreng', harga: 23000, stok: 50, gambar: 'minyak.jpg' },
  { nama: 'Telur bebek', harga: 4500, stok: 100, gambar: 'telur bebek.jpg' },
  { nama: 'Bawang merah dan putih', harga: 15000, stok: 500, gambar: 'bawang merah dan putih.jpg' },
  { nama: 'Cabai merah', harga: 54000, stok: 500, gambar: 'cabai merah.jpg' }
];

// Elemen HTML
const barangListElement = document.getElementById('barang-list');
const keranjangUl = document.getElementById('keranjang-ul');
const totalHargaElement = document.getElementById('total');
const prosesPembelianBtn = document.getElementById('proses-pembelian-btn');
const logoutBtn = document.getElementById("logout-btn");

// Tampilkan katalog
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

// Keranjang
let keranjang = [];

function tambahKeKeranjang(nama, harga, stok) {
  const jumlah = parseInt(document.getElementById(`jumlah-${nama}`).value);
  if (isNaN(jumlah) || jumlah <= 0 || jumlah > stok) {
    alert("Jumlah barang tidak valid!");
    return;
  }
  const item = keranjang.find(i => i.nama === nama);
  if (item) {
    item.jumlah += jumlah;
    item.total = item.jumlah * harga;
  } else {
    keranjang.push({ nama, harga, jumlah, total: harga * jumlah });
  }
  tampilkanKeranjang();
  hitungTotalBelanja();
}

function tampilkanKeranjang() {
  keranjangUl.innerHTML = '';
  keranjang.forEach(item => {
    const li = document.createElement('li');
    li.textContent = `${item.nama} x${item.jumlah} - Rp${item.total}`;
    keranjangUl.appendChild(li);
  });
}

function hitungTotalBelanja() {
  const total = keranjang.reduce((acc, item) => acc + item.total, 0);
  totalHargaElement.textContent = total;
}

// Event tambah
document.querySelectorAll('.tambah-btn').forEach(btn => {
  btn.addEventListener('click', e => {
    const nama = e.target.dataset.nama;
    const harga = parseInt(e.target.dataset.harga);
    const stok = parseInt(e.target.dataset.stok);
    tambahKeKeranjang(nama, harga, stok);
  });
});

// Fungsi sum untuk test CI
function sum(a, b) {
  return a + b;
}

// Export agar Jest bisa test
if (typeof module !== 'undefined') {
  module.exports = { sum };
}