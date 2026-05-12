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

// Mengambil elemen HTML
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

// Keranjang belanja
let keranjang = [];

// Fungsi menambahkan ke keranjang
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

// Menampilkan keranjang
function tampilkanKeranjang() {
  keranjangUl.innerHTML = '';
  keranjang.forEach(item => {
    const li = document.createElement('li');
    li.textContent = `${item.nama} x${item.jumlah} - Rp${item.total}`;
    keranjangUl.appendChild(li);
  });
}

// Hitung total
function hitungTotalBelanja() {
  const total = keranjang.reduce((acc, item) => acc + item.total, 0);
  totalHargaElement.textContent = total;
}

// Tampilkan struk
function tampilkanStruk() {
  const strukList = document.getElementById('struk-list');
  strukList.innerHTML = '';
  keranjang.forEach(item => {
    const li = document.createElement('li');
    li.textContent = `${item.nama} x${item.jumlah} - Rp${item.total}`;
    strukList.appendChild(li);
  });
  document.getElementById('total-struk').textContent = `Total Pembelian: Rp ${totalHargaElement.textContent}`;
  document.getElementById('struk-modal').style.display = 'flex';
}

// Tutup modal
document.getElementById('tutup-struk-btn').addEventListener('click', () => {
  document.getElementById('struk-modal').style.display = 'none';
});

// Tombol tambah ke keranjang
document.querySelectorAll('.tambah-btn').forEach(button => {
  button.addEventListener('click', (event) => {
    const nama = event.target.getAttribute('data-nama');
    const harga = parseInt(event.target.getAttribute('data-harga'));
    const stok = parseInt(event.target.getAttribute('data-stok'));
    tambahKeKeranjang(nama, harga, stok);
  });
});

// Proses pembelian
prosesPembelianBtn.addEventListener('click', () => {
  alert(`Total Pembelian: Rp ${totalHargaElement.textContent}`);
  tampilkanStruk();
  keranjang = [];
  tampilkanKeranjang();
  hitungTotalBelanja();
});

// Logout
logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("loggedIn");
  window.location.href = "login.html";
});

// ===== Fungsi tambahan untuk CI Jest =====
function sum(a, b) {
  return a + b;
}

// Export module agar Jest bisa test
if (typeof module !== 'undefined') {
  module.exports = { sum };
}