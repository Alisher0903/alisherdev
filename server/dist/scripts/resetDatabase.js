"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const User_1 = __importDefault(require("../models/User"));
const Project_1 = __importDefault(require("../models/Project"));
const Skill_1 = __importDefault(require("../models/Skill"));
dotenv_1.default.config();
const resetDatabase = async () => {
    try {
        await mongoose_1.default.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio');
        console.log('Connected to MongoDB');
        // Clear all collections
        await User_1.default.deleteMany({});
        await Project_1.default.deleteMany({});
        await Skill_1.default.deleteMany({});
        console.log('✅ Database cleared successfully!');
        // Create admin user
        const adminUser = new User_1.default({
            username: process.env.ADMIN_USERNAME || 'admin',
            email: process.env.ADMIN_EMAIL || 'admin@alisherdev.uz',
            password: process.env.ADMIN_PASSWORD || 'admin123',
            role: 'admin'
        });
        await adminUser.save();
        console.log('✅ Admin user created!');
        process.exit(0);
    }
    catch (error) {
        console.error('❌ Error resetting database:', error);
        process.exit(1);
    }
};
resetDatabase();
//# sourceMappingURL=resetDatabase.js.map