## Meowpedia 🐾
Selamat datang di Meowpedia! Sebuah ensiklopedia kucing interaktif berbasis web yang memungkinkan Anda menjelajahi berbagai ras kucing dari seluruh dunia. Dapatkan informasi detail, lihat gambar-gambar lucu, dan bahkan terjemahkan deskripsinya ke dalam berbagai bahasa.

Proyek ini dibuat dengan HTML, CSS, dan JavaScript murni, dengan desain yang bersih, menarik, dan sepenuhnya responsif untuk pengalaman terbaik di desktop maupun mobile.

## Tampilan Proyek

Berikut adalah tampilan proyek Meowpedia di berbagai perangkat.

### Tampilan Desktop
<p align="center">
  <img src="https://github.com/fahroediin/meowpedia/blob/main/preview/web-preview.png?raw=true" alt="Tampilan Meowpedia di Desktop" width="85%">
</p>

### Tampilan Mobile
<p align="center">
  <img src="https://github.com/fahroediin/meowpedia/blob/main/preview/mobile-preview.png?raw=true" alt="Tampilan Meowpedia di Mobile" width="40%">
</p>


## Fitur Utama
- Pencarian Ras Kucing: Pilih dari puluhan ras kucing yang tersedia melalui dropdown yang dinamis.
- Informasi Detail: Lihat informasi lengkap untuk setiap ras, termasuk asal, temperamen, deskripsi fisik, berat, dan harapan hidup.
- Galeri Foto: Menampilkan gambar kucing berkualitas tinggi untuk setiap ras yang dipilih.
- Terjemahan Multi-bahasa: Terjemahkan deskripsi dan temperamen kucing ke dalam berbagai bahasa (Indonesia, Arab, Jerman, Italia, Jepang) menggunakan API terjemahan gratis.
- Desain Responsif: Tampilan yang dioptimalkan untuk semua ukuran layar, dari monitor besar hingga ponsel.
- Antarmuka yang Bersih: Desain yang eye-catching dengan nuansa kucing yang lucu, mudah digunakan, dan cepat.
- Manajemen API Key yang Aman: Menggunakan file config.js yang terpisah untuk menyimpan API key, yang tidak akan dilacak oleh Git (.gitignore).

## Teknologi yang Digunakan
Frontend:
- HTML5
- CSS3 (dengan Flexbox untuk layout)
- JavaScript (ES6+ Asynchronous)
API Eksternal:
- TheCatAPI: Untuk mendapatkan semua data dan gambar ras kucing.
- MyMemory Translated API: Untuk fungsionalitas terjemahan gratis tanpa perlu registrasi.
Tools:
- Google Fonts (Poppins & Fredoka One)
- Git & GitHub

## Panduan Instalasi dan Konfigurasi
Untuk menjalankan proyek ini di komputer lokal Anda, ikuti langkah-langkah berikut:
1. Clone Repositori
Gunakan Git untuk meng-clone repositori ini
```
git clone https://github.com/nama-anda/meowpedia.git
cd meowpedia
```
2. Buat File Konfigurasi (config.js)
Proyek ini memerlukan API key dari TheCatAPI. Untuk menjaga keamanannya, kunci ini disimpan dalam file config.js yang tidak akan diunggah ke GitHub (karena sudah ada di .gitignore).
Buat file baru bernama config.js di direktori utama proyek.
3. Masukkan API Key Anda
Salin dan tempel kode berikut ke dalam file config.js yang baru saja Anda buat:
```
// File ini berisi kunci API dan tidak akan diunggah ke Git.

// 1. Dapatkan API Key Anda dari https://thecatapi.com/signup
// 2. Masukkan kunci tersebut di bawah ini.

const API_KEY = 'MASUKKAN_API_KEY_ANDA_DARI_THECATAPI_DI_SINI';
```
Ganti MASUKKAN_API_KEY_ANDA_DARI_THECATAPI_DI_SINI dengan API key yang Anda dapatkan dari email setelah mendaftar di TheCatAPI.

## Cara Menjalankan
Tidak ada proses build atau dependensi yang rumit. Cukup buka file index.html langsung di browser favorit Anda.
Klik dua kali file index.html.
Atau, jika Anda menggunakan VS Code dengan ekstensi "Live Server", klik kanan index.html dan pilih "Open with Live Server".

## Lisensi
Proyek ini dilisensikan di bawah Lisensi MIT. Lihat file LICENSE untuk detail lebih lanjut.