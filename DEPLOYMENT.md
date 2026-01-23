# Panduan Deployment ke Cloudflare

## Prerequisites

1. **Akun Cloudflare** - Daftar di https://dash.cloudflare.com/sign-up
2. **Wrangler CLI** - Install global:
   ```bash
   npm install -g wrangler
   ```
3. **Login Wrangler**:
   ```bash
   wrangler login
   ```

---

## 🗄️ LANGKAH 1: Setup Database D1

### 1.1 Buat Database D1

```bash
cd c:\Aplikasi\Quizoner\api
npx wrangler d1 create mizaj-db
```

**Output akan seperti ini:**
```
✅ Successfully created DB 'mizaj-db'!

[[d1_databases]]
binding = "DB"
database_name = "mizaj-db"
database_id = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
```

### 1.2 Copy `database_id` ke wrangler.jsonc

Buka file `api/wrangler.jsonc`, cari bagian `d1_databases`, dan ganti `TO_BE_CONFIGURED` dengan `database_id` yang didapat:

```jsonc
"d1_databases": [
  {
    "binding": "DB",
    "database_name": "mizaj-db",
    "database_id": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"  // ← Ganti dengan ID dari output
  }
],
```

### 1.3 Apply Database Schema

```bash
# Jalankan schema.sql
npx wrangler d1 execute mizaj-db --file=schema.sql

# Jalankan seed.sql (data awal)
npx wrangler d1 execute mizaj-db --file=seed.sql
```

**Verifikasi database:**
```bash
npx wrangler d1 execute mizaj-db --command="SELECT * FROM mizaj_results"
```

Seharusnya muncul 4 tipe Mizaj.

---

## ⚙️ LANGKAH 2: Deploy Backend (Cloudflare Workers)

### 2.1 Test Lokal (Optional)

```bash
cd c:\Aplikasi\Quizoner\api
npm run dev
```

Buka http://localhost:8787 untuk test.

### 2.2 Deploy ke Production

```bash
npm run deploy
```

atau

```bash
npx wrangler deploy
```

**Output:**
```
Total Upload: xxx KiB / gzip: xxx KiB
Uploaded api (x.xx sec)
Published api (x.xx sec)
  https://api.YOUR_SUBDOMAIN.workers.dev
```

**Catat URL Worker ini!** Nanti akan digunakan untuk frontend.

---

## 🌐 LANGKAH 3: Deploy Frontend (Cloudflare Pages)

### 3.1 Build Frontend

```bash
cd c:\Aplikasi\Quizoner\web
npm run build
```

Folder `dist/` akan tergenerate.

### 3.2 Deploy via Dashboard

1. **Buka Cloudflare Dashboard**: https://dash.cloudflare.com
2. **Pilih "Workers & Pages"** di sidebar kiri
3. **Klik "Create Application"** → **"Pages"** → **"Upload assets"**
4. **Project name**: `mizaj-biofitra` (atau nama lain)
5. **Upload folder**: Drag & drop folder `web/dist/` atau klik browse
6. **Klik "Deploy site"**

### 3.3 Konfigurasi Environment Variable (untuk connect ke API)

Setelah deploy pertama:

1. Masuk ke Pages project → **Settings** → **Environment variables**
2. Tambah variable:
   - **Variable name**: `VITE_API_URL`
   - **Value**: `https://api.YOUR_SUBDOMAIN.workers.dev` (URL dari Step 2.2)
3. **Save**
4. **Redeploy** (Pages → Deployments → klik "..." → "Retry deployment")

**URL Final Frontend:**
```
https://mizaj-biofitra.pages.dev
```

---

## 🔗 LANGKAH 4: Connect Frontend ke Backend (Alternative via GitHub)

Jika ingin auto-deploy lewat GitHub:

### 4.1 Connect Repository

1. Di Cloudflare Pages, klik **"Create Application"** → **"Pages"** → **"Connect to Git"**
2. Pilih **GitHub** → authorize → pilih repo: `add146/Mizaj`
3. **Production branch**: `main`
4. **Build settings**:
   - **Framework preset**: Vite
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
   - **Root directory**: `web`

5. **Environment variables**:
   - Add: `VITE_API_URL` = URL Worker dari step 2.2

6. **Save and Deploy**

Setiap push ke GitHub main branch akan auto-deploy!

---

## ✅ LANGKAH 5: Verifikasi Deployment

### Backend (Workers)
```bash
curl https://api.YOUR_SUBDOMAIN.workers.dev
```

### Frontend (Pages)
Buka di browser:
```
https://mizaj-biofitra.pages.dev
```

### Test Login Admin
- Buka: `https://mizaj-biofitra.pages.dev/admin/login`
- Email: `admin@mizaj.com`
- Password: `admin123`

---

## 🎯 Checklist Final

- [ ] D1 Database created & schema applied
- [ ] Backend Worker deployed
- [ ] Frontend Pages deployed
- [ ] Environment variable `VITE_API_URL` set
- [ ] Admin login working
- [ ] Landing page accessible

---

## 🚨 Troubleshooting

### Issue: "database_id not found"
**Solusi**: Pastikan sudah update `wrangler.jsonc` dengan database_id yang benar

### Issue: Frontend tidak bisa connect ke backend
**Solusi**: 
1. Cek `VITE_API_URL` sudah di-set di Pages environment variables
2. Redeploy frontend setelah add env var

### Issue: CORS error
**Solusi**: Tambahkan CORS headers di Worker (akan diimplementasi di API routes)

---

## 📝 Custom Domain (Optional)

### Untuk Frontend (Pages):
1. Pages project → **Custom domains** → **Set up a custom domain**
2. Masukkan domain: `mizaj.yourdomain.com`
3. Follow DNS setup instructions

### Untuk Backend (Workers):
1. Workers → **Triggers** → **Custom Domains**
2. Add domain: `api.yourdomain.com`
3. Follow DNS setup

---

## 🔄 Update Deployment

### Backend:
```bash
cd api
npm run deploy
```

### Frontend:
```bash
cd web
npm run build
# Upload dist/ folder lagi via Dashboard
# ATAU jika pakai GitHub: git push origin main
```

---

✅ **Deployment selesai!** Aplikasi Mizaj BioFITRA sudah live di Cloudflare.
