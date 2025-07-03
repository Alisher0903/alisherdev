# 🚀 Admin Panel Setup - Muammolarni Hal Qilish

## Muammo: Admin user topilmayapti

Agar login qilishda "user topilmayapti" xatosi chiqsa, quyidagi qadamlarni bajaring:

## 1️⃣ Database Holatini Tekshirish

```bash
cd server
npm run check-db
```

Bu buyruq database dagi barcha ma'lumotlarni ko'rsatadi.

## 2️⃣ Admin User Yaratish

Agar admin user yo'q bo'lsa:

```bash
npm run create-admin
```

## 3️⃣ Database ni To'liq Qayta Tiklash

Agar hamma narsa ishlamasa:

```bash
npm run reset-db
```

Bu buyruq:
- Barcha ma'lumotlarni o'chiradi
- Admin user yaratadi
- Sample ma'lumotlar qo'shadi

## 4️⃣ Qo'lda Admin Yaratish

Agar yuqoridagi usullar ishlamasa, MongoDB Compass yoki mongosh orqali:

### MongoDB Compass orqali:
1. MongoDB Compass ni oching
2. `portfolio` database ga o'ting
3. `users` collection yarating
4. Quyidagi document qo'shing:

```json
{
  "username": "admin",
  "email": "admin@example.com",
  "password": "$2a$12$LQv3c1yqBWVHxkd0LQ1Gv.6FqvVDdWEq3yuBaKj8.rGAT8mi4walO",
  "role": "admin",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

**Eslatma**: Yuqoridagi password hash "admin123" ni bildiradi.

### mongosh orqali:
```bash
mongosh
use portfolio
db.users.insertOne({
  username: "admin",
  email: "admin@example.com", 
  password: "$2a$12$LQv3c1yqBWVHxkd0LQ1Gv.6FqvVDdWEq3yuBaKj8.rGAT8mi4walO",
  role: "admin",
  createdAt: new Date(),
  updatedAt: new Date()
})
```

## 5️⃣ Environment Variables Tekshirish

`.env` faylini tekshiring:

```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/portfolio
JWT_SECRET=your-super-secret-jwt-key-here-make-it-very-long-and-complex
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123
ADMIN_EMAIL=admin@example.com
```

## 6️⃣ Server Qayta Ishga Tushirish

```bash
npm run dev
```

## 7️⃣ Login Qilish

Admin panel ga o'ting: `http://localhost:3001`

**Login ma'lumotlari:**
- Username: `admin`
- Password: `admin123`

## 🔧 Qo'shimcha Buyruqlar

```bash
# Database holatini tekshirish
npm run check-db

# Faqat admin yaratish
npm run create-admin

# Hamma narsani qayta tiklash
npm run reset-db

# Server ishga tushirish
npm run dev
```

## ❗ Muhim Eslatmalar

1. MongoDB ishlab turganiga ishonch hosil qiling
2. `.env` fayl to'g'ri sozlanganiga ishonch hosil qiling
3. Port 5000 band bo'lmagan bo'lishi kerak
4. Database connection string to'g'ri bo'lishi kerak

## 🆘 Yordam

Agar hali ham muammo bo'lsa:

1. MongoDB ishlab turganini tekshiring: `mongosh`
2. Server loglarini tekshiring
3. Browser console da xatolarni tekshiring
4. Network tab da API so'rovlarni tekshiring

Har qanday xato haqida batafsil ma'lumot bering!