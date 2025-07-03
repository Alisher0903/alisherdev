"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Skill_1 = __importDefault(require("../models/Skill"));
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
// Get all skills grouped by category
router.get('/', async (req, res) => {
    try {
        const skills = await Skill_1.default.find().sort({ category: 1, name: 1 });
        // Group skills by category
        const groupedSkills = skills.reduce((acc, skill) => {
            const category = skill.category;
            if (!acc[category]) {
                acc[category] = {
                    _id: category,
                    name: category,
                    skills: []
                };
            }
            acc[category].skills.push(skill);
            return acc;
        }, {});
        res.json(Object.values(groupedSkills));
    }
    catch (error) {
        console.error('Error fetching skills:', error);
        res.status(500).json({ message: 'Server error' });
    }
});
// Get all categories
router.get('/categories', async (req, res) => {
    try {
        const categories = await Skill_1.default.distinct('category');
        res.json(categories.sort());
    }
    catch (error) {
        console.error('Error fetching categories:', error);
        res.status(500).json({ message: 'Server error' });
    }
});
// Get single skill
router.get('/:id', async (req, res) => {
    try {
        const skill = await Skill_1.default.findById(req.params.id);
        if (!skill) {
            return res.status(404).json({ message: 'Skill not found' });
        }
        res.json(skill);
    }
    catch (error) {
        console.error('Error fetching skill:', error);
        res.status(500).json({ message: 'Server error' });
    }
});
// Create skill (admin only)
router.post('/', auth_1.authenticate, auth_1.requireAdmin, async (req, res) => {
    try {
        const skill = new Skill_1.default(req.body);
        await skill.save();
        res.status(201).json(skill);
    }
    catch (error) {
        console.error('Error creating skill:', error);
        res.status(500).json({ message: 'Server error' });
    }
});
// Update skill (admin only)
router.put('/:id', auth_1.authenticate, auth_1.requireAdmin, async (req, res) => {
    try {
        const skill = await Skill_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!skill) {
            return res.status(404).json({ message: 'Skill not found' });
        }
        res.json(skill);
    }
    catch (error) {
        console.error('Error updating skill:', error);
        res.status(500).json({ message: 'Server error' });
    }
});
// Delete skill (admin only)
router.delete('/:id', auth_1.authenticate, auth_1.requireAdmin, async (req, res) => {
    try {
        const skill = await Skill_1.default.findByIdAndDelete(req.params.id);
        if (!skill) {
            return res.status(404).json({ message: 'Skill not found' });
        }
        res.json({ message: 'Skill deleted successfully' });
    }
    catch (error) {
        console.error('Error deleting skill:', error);
        res.status(500).json({ message: 'Server error' });
    }
});
exports.default = router;
//# sourceMappingURL=skills.js.map