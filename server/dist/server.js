"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const database_1 = require("./config/database");
const auth_1 = __importDefault(require("./routes/auth"));
const projects_1 = __importDefault(require("./routes/projects"));
const skills_1 = __importDefault(require("./routes/skills"));
const dashboard_1 = __importDefault(require("./routes/dashboard"));
const upload_1 = __importDefault(require("./routes/upload"));
const categories_1 = __importDefault(require("./routes/categories"));
const contact_1 = __importDefault(require("./routes/contact"));
const profile_1 = __importDefault(require("./routes/profile"));
const errorHandler_1 = require("./middleware/errorHandler");
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
// Security middleware
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)({
    origin: ['http://localhost:3001', 'http://localhost:3000', 'https://admin.alisherdev.uz', 'https://alisherdev.uz'],
    credentials: true
}));
// Rate limiting
const limiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});
app.use('/api', limiter);
// Body parsing middleware
app.use(express_1.default.json({ limit: '10mb' }));
app.use(express_1.default.urlencoded({ extended: true, limit: '10mb' }));
// Serve uploaded files
app.use('/uploads', express_1.default.static(path_1.default.join(__dirname, '../uploads')));
// Connect to MongoDB
(0, database_1.connectDB)();
// Routes
app.use('/api/auth', auth_1.default);
app.use('/api/projects', projects_1.default);
app.use('/api/skills', skills_1.default);
app.use('/api/dashboard', dashboard_1.default);
app.use('/api/upload', upload_1.default);
app.use('/api/categories', categories_1.default);
app.use('/api/contact', contact_1.default);
app.use('/api/profile', profile_1.default);
// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date().toISOString() });
});
// Error handling middleware
app.use(errorHandler_1.errorHandler);
// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({ message: 'Route not found' });
});
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
exports.default = app;
//# sourceMappingURL=server.js.map