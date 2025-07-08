# Portfolio Admin Panel - Boshlash Qo'llanmasi

## 🚀 Tezkor Boshlash

### 1-qadam: MongoDB O'rnatish va Ishga Tushirish

#### Windows:
```bash
# MongoDB Community Server yuklab oling va o'rnating
# https://www.mongodb.com/try/download/community

# Xizmatni ishga tushiring
net start MongoDB
```

#### macOS:
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb/brew/mongodb-community
```

#### Linux:
```bash
sudo apt-get install mongodb
sudo systemctl start mongod
sudo systemctl enable mongod
```

### 2-qadam: Backend Sozlash

```bash
# Server papkasiga o'ting
cd server

# Dependencies o'rnating
npm install

# Environment variables yarating
cp .env.example .env

# .env faylini tahrirlang (kerakli ma'lumotlarni kiriting)
```

### 3-qadam: Database Tayyorlash

```bash
# TypeScript build qiling
npm run build

# Database ga ma'lumotlar yuklang
npm run seed

# Server ishga tushiring
npm run dev
```

### 4-qadam: Admin Panel Ishga Tushirish

Yangi terminal oching:
```bash
# Admin papkasiga o'ting
cd admin

# Dependencies o'rnating
npm install

# Development server ishga tushiring
npm run dev
```

### 5-qadam: Tizimga Kirish

1. Browser da `http://localhost:3001` ga o'ting
2. Login ma'lumotlari:
   - **Username**: admin
   - **Password**: admin123

## ✅ Tekshirish

### Backend tekshirish:
- `http://localhost:5000/api/health` - Server ishlayotganini tekshirish
- `http://localhost:5000/api/projects` - Projectlar ro'yxati
- `http://localhost:5000/api/skills` - Skilllar ro'yxati

### Admin Panel tekshirish:
- `http://localhost:3001` - Admin panel
- Dashboard, Projects, Skills sahifalarini tekshiring

## 🔧 Muammolarni Hal Qilish

### MongoDB ulanmayotgan bo'lsa:
```bash
# MongoDB ishlab turganini tekshiring
mongosh
# yoki
mongo
```

### Port band bo'lsa:
`.env` faylida `PORT` ni o'zgartiring:
```env
PORT=5001
```

### Seed xatosi bo'lsa:
```bash
# Database ni tozalang va qayta seed qiling
npm run seed
```

## 📱 Ishlatish

1. **Dashboard**: Umumiy statistika va tezkor harakatlar
2. **Projects**: Projectlarni qo'shish, tahrirlash, o'chirish
3. **Skills**: Skilllarni kategoriyalar bo'yicha boshqarish

## 🔄 Main Portfolio bilan Bog'lash

Main portfolio da dynamic ma'lumotlar olish uchun:

```typescript
// src/data/projects.ts
export const fetchProjects = async () => {
  const response = await fetch('http://localhost:5000/api/projects')
  return response.json()
}

// src/data/skills.ts
export const fetchSkills = async () => {
  const response = await fetch('http://localhost:5000/api/skills')
  return response.json()
}
```

## 🎯 Keyingi Qadamlar

1. MongoDB o'rnating va ishga tushiring
2. Backend server sozlang va ishga tushiring
3. Admin panel ishga tushiring
4. Tizimga kirib, ma'lumotlarni boshqaring
5. Main portfolio ni dynamic qiling

Har qanday savol yoki muammo bo'lsa, yordam so'rang! 🚀