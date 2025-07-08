# MongoDB bilan Backend Serverini Ishga Tushirish

## 1. MongoDB O'rnatish

### Windows uchun:
1. [MongoDB Community Server](https://www.mongodb.com/try/download/community) dan yuklab oling
2. MSI faylni ishga tushiring va o'rnating
3. MongoDB Compass ham o'rnatiladi (GUI tool)

### macOS uchun:
```bash
# Homebrew orqali
brew tap mongodb/brew
brew install mongodb-community
```

### Ubuntu/Linux uchun:
```bash
# MongoDB repository qo'shish
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list

# O'rnatish
sudo apt-get update
sudo apt-get install -y mongodb-org
```

## 2. MongoDB Xizmatini Ishga Tushirish

### Windows:
```bash
# MongoDB xizmatini ishga tushirish
net start MongoDB

# Yoki MongoDB Compass orqali
```

### macOS:
```bash
# Xizmatni ishga tushirish
brew services start mongodb/brew/mongodb-community

# To'xtatish uchun
brew services stop mongodb/brew/mongodb-community
```

### Linux:
```bash
# Xizmatni ishga tushirish
sudo systemctl start mongod
sudo systemctl enable mongod

# Status tekshirish
sudo systemctl status mongod
```

## 3. MongoDB Ulanishini Tekshirish

Terminal ochib quyidagi buyruqni bajaring:
```bash
mongosh
# yoki eski versiyalarda
mongo
```

Agar muvaffaqiyatli ulansa, quyidagicha ko'rinadi:
```
MongoDB shell version v6.0.0
connecting to: mongodb://127.0.0.1:27017
```

## 4. Backend Server Sozlash

### 4.1 Environment Variables Yaratish
`server` papkasida `.env` fayl yarating:

```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/portfolio
JWT_SECRET=your-super-secret-jwt-key-here-make-it-long-and-complex
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123
ADMIN_EMAIL=admin@example.com
```

### 4.2 Dependencies O'rnatish
```bash
cd server
npm install
```

### 4.3 TypeScript Build Qilish
```bash
npm run build
```

### 4.4 Database Seed Qilish (Ma'lumotlar Yuklash)
```bash
npm run seed
```

Bu buyruq:
- Admin user yaratadi
- Mavjud projectlaringizni database ga yuklaydi
- Skilllaringizni database ga yuklaydi

### 4.5 Server Ishga Tushirish
```bash
npm run dev
```

Server muvaffaqiyatli ishga tushsa, quyidagicha ko'rinadi:
```
Server running on port 5000
MongoDB Connected: localhost:27017
Admin user created
Projects seeded
Skills seeded
Database seeded successfully!
```

## 5. Admin Panel Ishga Tushirish

Yangi terminal ochib:
```bash
cd admin
npm install
npm run dev
```

Admin panel `http://localhost:3001` da ochiladi.

## 6. Login Ma'lumotlari

- **Username**: admin
- **Password**: admin123

## 7. Muammolarni Hal Qilish

### MongoDB ulanmayotgan bo'lsa:
```bash
# MongoDB ishlab turganini tekshiring
# Windows
net start MongoDB

# macOS
brew services start mongodb/brew/mongodb-community

# Linux
sudo systemctl start mongod
```

### Port band bo'lsa:
`.env` faylida `PORT` ni o'zgartiring:
```env
PORT=5001
```

### Database ulanish xatosi:
MongoDB URI ni tekshiring:
```env
# Local MongoDB uchun
MONGODB_URI=mongodb://localhost:27017/portfolio

# MongoDB Atlas uchun (cloud)
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio
```

## 8. MongoDB Compass (GUI) Ishlatish

1. MongoDB Compass ni oching
2. Connection string: `mongodb://localhost:27017`
3. Connect tugmasini bosing
4. `portfolio` database ni ko'rasiz
5. Collections: `users`, `projects`, `skills`

## 9. API Endpoints Tekshirish

Server ishga tushgandan keyin quyidagi URL larni browser da tekshiring:

- Health check: `http://localhost:5000/api/health`
- Projects: `http://localhost:5000/api/projects`
- Skills: `http://localhost:5000/api/skills`

## 10. Production uchun MongoDB Atlas (Cloud)

Agar local MongoDB o'rniga cloud ishlatmoqchi bo'lsangiz:

1. [MongoDB Atlas](https://www.mongodb.com/atlas) ga ro'yxatdan o'ting
2. Cluster yarating
3. Database user yarating
4. IP address ni whitelist ga qo'shing
5. Connection string ni oling
6. `.env` faylida `MONGODB_URI` ni yangilang

```env
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/portfolio?retryWrites=true&w=majority
```

## Keyingi Qadamlar

1. MongoDB ishga tushiring
2. Server papkasida `.env` yarating
3. `npm run build && npm run seed && npm run dev`
4. Admin panel: `npm run dev`
5. `http://localhost:3001` da login qiling

Agar biror muammo bo'lsa, error message ni yuboring!