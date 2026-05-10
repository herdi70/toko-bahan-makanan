// Username dan password yang sudah ditentukan
const validUsername = "herdi";
const validPassword = "herdi123";

// Mengambil elemen dari form login
const loginForm = document.getElementById("login-form");
const usernameField = document.getElementById("username");
const passwordField = document.getElementById("password");
const errorMessage = document.getElementById("error-message");

loginForm.addEventListener("submit", function(event) {
  event.preventDefault();

  // Mendapatkan nilai input username dan password
  const username = usernameField.value;
  const password = passwordField.value;

  // Validasi login
  if (username === validUsername && password === validPassword) {
    // Menyimpan status login di localStorage
    localStorage.setItem("loggedIn", true);

    // Mengarahkan pengguna ke halaman utama setelah login berhasil
    window.location.href = "index.html"; // Arahkan ke halaman utama
  } else {
    // Tampilkan pesan error jika username atau password salah
    errorMessage.style.display = "block";
  }
});