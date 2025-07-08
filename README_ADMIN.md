# Portfolio Admin Panel & Backend

This is a complete admin panel and backend system for managing portfolio projects and skills dynamically.

## 🏗️ Architecture

- **Admin Panel**: React + TypeScript + Vite + Tailwind CSS
- **Backend**: Node.js + Express + MongoDB + TypeScript
- **Authentication**: JWT-based authentication
- **Database**: MongoDB with Mongoose ODM

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or cloud)
- npm or yarn

### 1. Backend Setup

```bash
cd server
npm install
```

Create `.env` file in server directory:
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/portfolio
JWT_SECRET=your-super-secret-jwt-key-here
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123
ADMIN_EMAIL=admin@example.com
```

Start MongoDB and run the server:
```bash
# Seed the database with initial data
npm run build
npm run seed

# Start development server
npm run dev
```

### 2. Admin Panel Setup

```bash
cd admin
npm install
npm run dev
```

The admin panel will be available at `http://localhost:3001`

### 3. Default Login Credentials

- **Username**: admin
- **Password**: admin123

## 📁 Project Structure

```
admin/
├── src/
│   ├── components/          # Reusable components
│   ├── contexts/           # React contexts (Auth)
│   ├── pages/              # Page components
│   └── main.tsx           # App entry point
└── package.json

server/
├── src/
│   ├── config/            # Database configuration
│   ├── middleware/        # Express middleware
│   ├── models/           # MongoDB models
│   ├── routes/           # API routes
│   ├── scripts/          # Utility scripts
│   └── server.ts         # Server entry point
└── package.json
```

## 🔧 Features

### Admin Panel Features
- **Dashboard**: Overview statistics and quick actions
- **Project Management**: CRUD operations for portfolio projects
- **Skills Management**: CRUD operations for skills and categories
- **Authentication**: Secure login/logout system
- **Responsive Design**: Works on all device sizes

### Backend Features
- **RESTful API**: Clean API endpoints for all operations
- **Authentication**: JWT-based auth with role-based access
- **Data Validation**: Mongoose schema validation
- **Error Handling**: Comprehensive error handling
- **Security**: Helmet, CORS, rate limiting
- **Database Seeding**: Initial data setup script

## 📊 API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `GET /api/auth/verify` - Verify JWT token

### Projects
- `GET /api/projects` - Get all projects
- `GET /api/projects/:id` - Get single project
- `POST /api/projects` - Create project (admin only)
- `PUT /api/projects/:id` - Update project (admin only)
- `DELETE /api/projects/:id` - Delete project (admin only)

### Skills
- `GET /api/skills` - Get all skills grouped by category
- `GET /api/skills/categories` - Get all categories
- `GET /api/skills/:id` - Get single skill
- `POST /api/skills` - Create skill (admin only)
- `PUT /api/skills/:id` - Update skill (admin only)
- `DELETE /api/skills/:id` - Delete skill (admin only)

### Dashboard
- `GET /api/dashboard/stats` - Get dashboard statistics (admin only)

## 🔒 Security Features

- JWT authentication with 7-day expiration
- Password hashing with bcrypt
- Rate limiting (100 requests per 15 minutes)
- CORS protection
- Helmet security headers
- Input validation and sanitization

## 🗄️ Database Models

### User Model
```typescript
{
  username: string (unique)
  email: string (unique)
  password: string (hashed)
  role: 'admin' | 'user'
  timestamps
}
```

### Project Model
```typescript
{
  name: string
  favicon: string
  imageUrl: string[]
  description: string
  sourceCodeHref: string
  liveWebsiteHref?: string
  technologies: string[]
  featured: boolean
  timestamps
}
```

### Skill Model
```typescript
{
  name: string
  icon: string
  level?: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert'
  description?: string
  category: string
  timestamps
}
```

## 🔄 Integration with Main Portfolio

To integrate with your main portfolio, update your data files to fetch from the API:

```typescript
// src/data/projects.ts
export const fetchProjects = async () => {
  const response = await fetch('/api/projects')
  return response.json()
}

// src/data/skills.ts
export const fetchSkills = async () => {
  const response = await fetch('/api/skills')
  return response.json()
}
```

## 🚀 Deployment

### Backend Deployment
1. Set up MongoDB Atlas or your preferred MongoDB hosting
2. Deploy to Heroku, Railway, or your preferred platform
3. Set environment variables in production

### Admin Panel Deployment
1. Build the admin panel: `npm run build`
2. Deploy to Netlify, Vercel, or your preferred platform
3. Update API base URL for production

## 🛠️ Development

### Adding New Features
1. Create new models in `server/src/models/`
2. Add routes in `server/src/routes/`
3. Create corresponding pages/components in admin panel
4. Update API integration

### Database Operations
```bash
# Reset database
npm run seed

# Start fresh development
npm run dev
```

## 📝 Environment Variables

### Server (.env)
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/portfolio
JWT_SECRET=your-super-secret-jwt-key-here
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123
ADMIN_EMAIL=admin@example.com
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.