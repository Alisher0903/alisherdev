"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const SkillCategory_1 = __importDefault(require("../models/SkillCategory"));
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
// Get all categories
router.get('/', async (req, res) => {
    try {
        const categories = await SkillCategory_1.default.find().sort({ order: 1, name: 1 });
        res.json(categories);
    }
    catch (error) {
        console.error('Error fetching categories:', error);
        res.status(500).json({ message: 'Server error' });
    }
});
// Get single category
router.get('/:id', async (req, res) => {
    try {
        const category = await SkillCategory_1.default.findById(req.params.id);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.json(category);
    }
    catch (error) {
        console.error('Error fetching category:', error);
        res.status(500).json({ message: 'Server error' });
    }
});
// Create category (admin only)
router.post('/', auth_1.authenticate, auth_1.requireAdmin, async (req, res) => {
    try {
        const category = new SkillCategory_1.default(req.body);
        await category.save();
        res.status(201).json(category);
    }
    catch (error) {
        console.error('Error creating category:', error);
        res.status(500).json({ message: 'Server error' });
    }
});
// Update category (admin only)
router.put('/:id', auth_1.authenticate, auth_1.requireAdmin, async (req, res) => {
    try {
        const category = await SkillCategory_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.json(category);
    }
    catch (error) {
        console.error('Error updating category:', error);
        res.status(500).json({ message: 'Server error' });
    }
});
// Delete category (admin only)
router.delete('/:id', auth_1.authenticate, auth_1.requireAdmin, async (req, res) => {
    try {
        const category = await SkillCategory_1.default.findByIdAndDelete(req.params.id);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.json({ message: 'Category deleted successfully' });
    }
    catch (error) {
        console.error('Error deleting category:', error);
        res.status(500).json({ message: 'Server error' });
    }
});
exports.default = router;
//# sourceMappingURL=categories.js.map