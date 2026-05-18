# 180DC UNAIR - IT Analyst Test Case (Backend Proxy & Mock)

Repositori ini berisi solusi teknis untuk tes seleksi **IT Analyst** di **180 Degrees Consulting Universitas Airlangga**. Proyek ini difokuskan pada pengembangan API / BACKEND

## Fitur Utama

- **RESTful API**: Menyediakan endpoint yang identik dengan kebutuhan test case (Auth & Products).
- **CORS-Enabled**: Dikonfigurasi secara terbuka untuk mendukung komunikasi dengan frontend di lingkungan pengembangan (localhost).
- **JWT Authentication**: Implementasi sistem keamanan token yang kompatibel dengan standar seleksi.
- **Data Persistence**: Mengelola penyimpanan data produk secara dinamis untuk mendemonstrasikan fitur CRUD.

## Teknologi yang Digunakan

- **Runtime**: Node.js
- **Framework**: NestJS
- **Language**: TypeScript
- **Database**: PostgreSQL
- **ORM**: Prisma

## ⚙️ Konfigurasi Environment & Database

Proyek ini menggunakan **Prisma ORM** dengan **PostgreSQL**. Pastikan untuk mengatur file `.env` di direktori root sebelum menjalankan aplikasi.

### Environment Variables (`.env`)
Terdapat environment variabel yang harus dibuat terlebih dahulu, meliputi DATABASE_URL serta JWT_SECRET. Contoh:

```env
# Koneksi Database (PostgreSQL)
DATABASE_URL="postgres://postgres:underDevAdmin322@localhost:5432/dc"

# Kunci Rahasia JWT
JWT_SECRET="180_secret_180"

```

## Cara Menjalankan

1. **Clone Repositori:**
   ```bash
   git clone https://github.com/ThenmusteSatrio/backend_180dc_test_case.git
   cd backend_180dc_test_case

2. **Install Dependensi:**
   ```bash
   npm install
   # atau jika menggunakan pnpm
   pnpm install

3. **Menjalankan Program:**
   ```bash
   npm run start
   # atau jika menggunakan pnpm
   pnpm run start

### Schema Database
Database perlu dibuat terlebih dahulu, dilanjutkan dengan migrate serta generate schema. Contoh:
 ```bash
   pnpm prisma migrate dev
   pnpm prisma generate
