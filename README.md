# Kalkulator Pajak UMKM

Aplikasi web untuk menghitung estimasi **PPh Final UMKM 0,5%** berdasarkan data omzet yang dimasukkan pengguna. Project ini dibuat dengan React, Vite, dan Tailwind CSS, tanpa backend, database, maupun sistem login.

## Preview

Project menyediakan dua halaman utama:

- **Landing Page**: berisi hero section, statistik singkat, cara penggunaan, FAQ, dan footer.
- **Form Penghitungan Pajak**: berisi form input data omzet, ringkasan hasil, dan informasi tambahan.

Tampilan dibuat responsive untuk desktop, tablet, dan mobile, dengan dukungan light mode dan dark mode.

## Features

- Landing page profesional dan clean
- Hero section dengan informasi PPh Final UMKM
- Logo UNTIRTA pada header
- Light mode dan dark mode
- Toggle theme dengan icon matahari dan bulan
- Animasi perpindahan theme yang smooth
- Halaman khusus Form Penghitungan Pajak
- Form input data omzet
- Perhitungan otomatis estimasi PPh Final UMKM 0,5%
- Format angka rupiah
- Result card untuk ringkasan hasil perhitungan
- Section cara penggunaan
- FAQ sederhana
- Footer profesional
- Responsive untuk desktop, tablet, dan mobile

## Tech Stack

- React
- Vite
- Tailwind CSS
- JavaScript
- React local state
- LocalStorage untuk menyimpan preferensi dark mode
- Tanpa backend
- Tanpa database
- Tanpa login

## Project Structure

```txt
src/
├── components/
│   ├── Header.jsx
│   ├── HeroSection.jsx
│   ├── Layout.jsx
│   ├── ThemeToggle.jsx
│   ├── TaxForm.jsx
│   ├── ResultCard.jsx
│   ├── UsageGuide.jsx
│   ├── FAQSection.jsx
│   ├── Footer.jsx
│   └── InfoCard.jsx
├── pages/
│   ├── HomePage.jsx
│   └── TaxFormPage.jsx
├── utils/
│   ├── taxCalculator.js
│   └── formatCurrency.js
├── App.jsx
├── main.jsx
└── index.css
```

## Installation

Clone repository:

```bash
git clone https://github.com/DimasAkbarF/KalkulatorPajak.git
```

Masuk ke folder project:

```bash
cd KalkulatorPajak
```

Install dependency:

```bash
npm install
```

## Running Locally

Jalankan development server:

```bash
npm run dev
```

Secara default, Vite akan menjalankan aplikasi pada alamat lokal seperti:

```txt
http://localhost:5173
```

## Build for Production

Buat production build:

```bash
npm run build
```

Preview hasil build:

```bash
npm run preview
```

## Usage Guide

1. Buka halaman utama aplikasi.
2. Klik tombol **Mulai Hitung Pajak** untuk masuk ke halaman form.
3. Pilih jenis wajib pajak dan metode input omzet.
4. Masukkan data omzet sesuai kebutuhan.
5. Klik tombol **Hitung Pajak**.
6. Lihat estimasi PPh Final UMKM pada bagian ringkasan hasil.
7. Gunakan tombol reset jika ingin mengulang pengisian form.

## Dark Mode

Aplikasi mendukung light mode dan dark mode. Preferensi theme disimpan menggunakan `localStorage`, sehingga pilihan pengguna tetap digunakan saat halaman dibuka kembali.

Dark mode menggunakan pendekatan class-based dari Tailwind CSS dengan nuansa gelap yang clean, border halus, dan transisi warna yang smooth.

## Folder Structure Explanation

- `src/components/` berisi komponen UI yang dapat digunakan ulang, seperti header, hero section, form pajak, result card, FAQ, dan footer.
- `src/pages/` berisi halaman utama aplikasi, yaitu landing page dan halaman form penghitungan pajak.
- `src/utils/` berisi helper dan logic pendukung, seperti perhitungan pajak dan format mata uang rupiah.
- `src/App.jsx` mengatur struktur utama aplikasi dan navigasi antar halaman.
- `src/main.jsx` menjadi entry point React.
- `src/index.css` berisi konfigurasi styling utama Tailwind CSS.

## Notes / Disclaimer

- Hasil perhitungan pada aplikasi ini bersifat estimasi.
- Website ini dibuat untuk kebutuhan pembelajaran.
- Hasil perhitungan tidak menggantikan pelaporan resmi atau konsultasi perpajakan.
- Data yang dimasukkan tidak disimpan karena aplikasi berjalan di sisi browser.
- Tidak ada backend, database, atau sistem login pada project ini.

## Author

**Dimas Akbar Faturohman**

GitHub: [https://github.com/DimasAkbarF](https://github.com/DimasAkbarF)

## License

Project ini dibuat untuk kebutuhan pembelajaran. Silakan gunakan dan kembangkan sesuai kebutuhan dengan tetap mencantumkan atribusi yang sesuai.
