"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const User_1 = __importDefault(require("../models/User"));
dotenv_1.default.config();
const createAdmin = async () => {
    try {
        await mongoose_1.default.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio');
        console.log('Connected to MongoDB');
        // Check if admin already exists
        const existingAdmin = await User_1.default.findOne({ username: 'admin' });
        if (existingAdmin) {
            console.log('Admin user already exists');
            console.log('Username:', existingAdmin.username);
            console.log('Email:', existingAdmin.email);
            process.exit(0);
        }
        // Create admin user
        const adminUser = new User_1.default({
            username: process.env.ADMIN_USERNAME || 'admin',
            email: process.env.ADMIN_EMAIL || 'admin@example.com',
            password: process.env.ADMIN_PASSWORD || 'admin123',
            role: 'admin'
        });
        await adminUser.save();
        console.log('✅ Admin user created successfully!');
        console.log('Username:', adminUser.username);
        console.log('Email:', adminUser.email);
        console.log('Password:', process.env.ADMIN_PASSWORD || 'admin123');
        process.exit(0);
    }
    catch (error) {
        console.error('❌ Error creating admin user:', error);
        process.exit(1);
    }
};
createAdmin();
//# sourceMappingURL=createAdmin.js.map