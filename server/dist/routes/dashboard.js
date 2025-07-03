"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Project_1 = __importDefault(require("../models/Project"));
const Skill_1 = __importDefault(require("../models/Skill"));
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
// Get dashboard stats (admin only)
router.get('/stats', auth_1.authenticate, auth_1.requireAdmin, async (req, res) => {
    try {
        const [totalProjects, totalSkills, categories, recentProjects] = await Promise.all([
            Project_1.default.countDocuments(),
            Skill_1.default.countDocuments(),
            Skill_1.default.distinct('category'),
            Project_1.default.countDocuments({
                createdAt: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) } // Last 30 days
            })
        ]);
        res.json({
            totalProjects,
            totalSkills,
            totalCategories: categories.length,
            recentActivity: recentProjects
        });
    }
    catch (error) {
        console.error('Error fetching dashboard stats:', error);
        res.status(500).json({ message: 'Server error' });
    }
});
exports.default = router;
//# sourceMappingURL=dashboard.js.map