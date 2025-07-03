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
const checkDatabase = async () => {
    try {
        await mongoose_1.default.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio');
        console.log('✅ Connected to MongoDB');
        // Check collections
        const userCount = await User_1.default.countDocuments();
        const projectCount = await Project_1.default.countDocuments();
        const skillCount = await Skill_1.default.countDocuments();
        console.log('\n📊 Database Statistics:');
        console.log(`Users: ${userCount}`);
        console.log(`Projects: ${projectCount}`);
        console.log(`Skills: ${skillCount}`);
        // Check admin user
        const adminUser = await User_1.default.findOne({ role: 'admin' });
        if (adminUser) {
            console.log('\n👤 Admin User Found:');
            console.log(`Username: ${adminUser.username}`);
            console.log(`Email: ${adminUser.email}`);
            console.log(`Role: ${adminUser.role}`);
        }
        else {
            console.log('\n❌ No admin user found!');
        }
        // List all users
        const allUsers = await User_1.default.find({}, 'username email role');
        console.log('\n👥 All Users:');
        allUsers.forEach(user => {
            console.log(`- ${user.username} (${user.email}) - ${user.role}`);
        });
        process.exit(0);
    }
    catch (error) {
        console.error('❌ Database connection error:', error);
        process.exit(1);
    }
};
checkDatabase();
//# sourceMappingURL=checkDatabase.js.map