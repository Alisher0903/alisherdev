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
            email: process.env.ADMIN_EMAIL || 'admin@example.com',
            password: process.env.ADMIN_PASSWORD || 'admin123',
            role: 'admin'
        });
        await adminUser.save();
        console.log('✅ Admin user created!');
        // Seed some sample data
        const sampleProjects = [
            {
                name: "Sample Project 1",
                favicon: "/favicon.ico",
                imageUrl: ["https://via.placeholder.com/600x400"],
                description: "This is a sample project for testing",
                sourceCodeHref: "https://github.com/example/project1",
                liveWebsiteHref: "https://project1.example.com",
                technologies: ["React", "TypeScript", "Tailwind CSS"],
                featured: true
            },
            {
                name: "Sample Project 2",
                favicon: "/favicon.ico",
                imageUrl: ["https://via.placeholder.com/600x400"],
                description: "Another sample project for testing",
                sourceCodeHref: "https://github.com/example/project2",
                technologies: ["Next.js", "MongoDB", "Node.js"],
                featured: false
            }
        ];
        await Project_1.default.insertMany(sampleProjects);
        console.log('✅ Sample projects created!');
        const sampleSkills = [
            { name: "React", icon: "/icons/react.svg", level: "Expert", category: "Frontend Frameworks", description: "Modern React with hooks and context" },
            { name: "TypeScript", icon: "/icons/typescript.svg", level: "Advanced", category: "Programming Languages", description: "Type-safe JavaScript development" },
            { name: "Node.js", icon: "/icons/nodejs.svg", level: "Intermediate", category: "Backend Technologies", description: "Server-side JavaScript runtime" },
            { name: "MongoDB", icon: "/icons/mongodb.svg", level: "Intermediate", category: "Databases", description: "NoSQL document database" }
        ];
        await Skill_1.default.insertMany(sampleSkills);
        console.log('✅ Sample skills created!');
        console.log('\n🎉 Database reset and seeded successfully!');
        console.log('\n👤 Login Credentials:');
        console.log(`Username: ${adminUser.username}`);
        console.log(`Password: ${process.env.ADMIN_PASSWORD || 'admin123'}`);
        process.exit(0);
    }
    catch (error) {
        console.error('❌ Error resetting database:', error);
        process.exit(1);
    }
};
resetDatabase();
//# sourceMappingURL=resetDatabase.js.map