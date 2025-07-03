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
const seedData = async () => {
    try {
        await mongoose_1.default.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio');
        console.log('Connected to MongoDB');
        // Clear existing data
        await User_1.default.deleteMany({});
        await Project_1.default.deleteMany({});
        await Skill_1.default.deleteMany({});
        // Create admin user
        const adminUser = new User_1.default({
            username: process.env.ADMIN_USERNAME || 'admin',
            email: process.env.ADMIN_EMAIL || 'admin@example.com',
            password: process.env.ADMIN_PASSWORD || 'admin123',
            role: 'admin'
        });
        await adminUser.save();
        console.log('Admin user created');
        // Seed projects from existing data
        const projects = [
            {
                name: "Sfera IT Solution",
                favicon: "/images/projects/logos/solution.ico",
                imageUrl: [
                    "/images/projects/sfera-solution.webp",
                    "/images/projects/sferacard1.webp",
                    "/images/projects/sferacard2.webp",
                    "/images/projects/sferacard3.webp",
                    "/images/projects/sferacard4.webp",
                ],
                description: "SFERA IT SOLUTION is an IT outsourcing company that provides digital services such as web and mobile development, UI/UX design, software solutions, and IT consulting for businesses and startups.",
                sourceCodeHref: "https://github.com/Alisher0903/sfera-solutions",
                liveWebsiteHref: "https://sfera-solution.vercel.app",
                technologies: ["Next.js", "Typescript", "Zustand", "Tailwindcss", "Framer motion", "Gsap", "Vercel"],
                featured: true
            },
            {
                name: "Geodeziya",
                favicon: "/images/projects/logos/geodezist.ico",
                imageUrl: [
                    "/images/projects/geodezistdark.webp",
                    "/images/projects/geodezistlight.webp",
                    "/images/projects/geodezistclientdark.webp",
                    "/images/projects/geodezistclientlight.webp",
                ],
                description: "GEODEZIYA is a 3-panel website and the program is mainly managed by staff and admin. In the client panel, you can only test the fields.",
                sourceCodeHref: "https://github.com/Alisher0903/quiz-dashboard",
                liveWebsiteHref: "https://gts1.uz",
                technologies: ["React.js", "Typescript", "Tailwindcss", "Vite", "React-router-dom"],
                featured: true
            },
            {
                name: "Bookers",
                favicon: "/images/projects/logos/bookers.ico",
                imageUrl: [
                    "/images/projects/bookerslight.webp",
                    "/images/projects/bookersdark.webp",
                    "/images/projects/bookers1.webp",
                    "/images/projects/bookers2.webp",
                    "/images/projects/bookers3.webp",
                    "/images/projects/bookers4.webp",
                    "/images/projects/bookers5.webp",
                ],
                description: "This project is made for barbers to gather all barbers on one platform and systematize them, masters can accept online orders and help to maintain work schedules.",
                sourceCodeHref: "https://github.com/Alisher0903/bookers-admin",
                liveWebsiteHref: "http://admin.bookers.uz:36080",
                technologies: ["React.js", "Typescript", "Vite", "Tailwindcss", "Zustand", "React-router-dom"],
                featured: true
            }
        ];
        await Project_1.default.insertMany(projects);
        console.log('Projects seeded');
        // Seed skills from existing data
        const skills = [
            // Markup & Styling
            { name: "HTML", icon: "/icons/html.svg", level: "Expert", description: "Semantic HTML5 markup and accessibility best practices", category: "Markup & Styling" },
            { name: "CSS", icon: "/icons/css.svg", level: "Expert", description: "Modern CSS3, Flexbox, Grid, and responsive design", category: "Markup & Styling" },
            { name: "SCSS / SASS", icon: "/icons/sass.svg", category: "Markup & Styling" },
            { name: "Tailwind CSS", icon: "/icons/tailwindcss.svg", level: "Expert", description: "Utility-first CSS framework with custom configurations", category: "Markup & Styling" },
            { name: "Bootstrap", icon: "/icons/bootstrap.svg", category: "Markup & Styling" },
            // Programming Languages
            { name: "Javascript", icon: "/icons/javascript.svg", level: "Expert", description: "ES6+, Async/Await, DOM manipulation, and modern JS features", category: "Programming Languages" },
            { name: "Typescript", icon: "/icons/typescript.svg", level: "Advanced", description: "Type-safe development with interfaces, generics, and advanced types", category: "Programming Languages" },
            // Frontend Frameworks & Libraries
            { name: "React.js", icon: "/icons/reactjs.svg", level: "Expert", description: "Hooks, Context API, Performance optimization, and component patterns", category: "Frontend Frameworks & Libraries" },
            { name: "Next.js", icon: "/icons/nextjs.svg", level: "Advanced", description: "SSR, SSG, API Routes, and performance optimization", category: "Frontend Frameworks & Libraries" },
            { name: "Solid.js", icon: "/icons/solidjs.svg", category: "Frontend Frameworks & Libraries" },
            // Build Tools
            { name: "Vite", icon: "/icons/vite.svg", category: "Build Tools / Tooling" },
            // Version Control
            { name: "Git", icon: "/icons/git.svg", category: "Version Control & DevOps" },
            { name: "GitHub", icon: "/icons/github.svg", category: "Version Control & DevOps" },
            { name: "GitLab", icon: "/icons/GitLab.svg", category: "Version Control & DevOps" },
            { name: "Postman", icon: "/icons/postman.svg", category: "Version Control & DevOps" },
        ];
        await Skill_1.default.insertMany(skills);
        console.log('Skills seeded');
        console.log('Database seeded successfully!');
        process.exit(0);
    }
    catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
};
seedData();
//# sourceMappingURL=seed.js.map