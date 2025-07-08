"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Contact_1 = __importDefault(require("../models/Contact"));
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
// Submit contact form (public)
router.post('/', async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;
        if (!name || !email || !subject || !message) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        const contact = new Contact_1.default({
            name,
            email,
            subject,
            message
        });
        await contact.save();
        res.status(201).json({ message: 'Message sent successfully' });
    }
    catch (error) {
        console.error('Error saving contact:', error);
        res.status(500).json({ message: 'Server error' });
    }
});
// Get all contacts (admin only)
router.get('/', auth_1.authenticate, auth_1.requireAdmin, async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        const contacts = await Contact_1.default.find()
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);
        const total = await Contact_1.default.countDocuments();
        const unreadCount = await Contact_1.default.countDocuments({ isRead: false });
        res.json({
            contacts,
            pagination: {
                page,
                limit,
                total,
                pages: Math.ceil(total / limit)
            },
            unreadCount
        });
    }
    catch (error) {
        console.error('Error fetching contacts:', error);
        res.status(500).json({ message: 'Server error' });
    }
});
// Get single contact (admin only)
router.get('/:id', auth_1.authenticate, auth_1.requireAdmin, async (req, res) => {
    try {
        const contact = await Contact_1.default.findById(req.params.id);
        if (!contact) {
            return res.status(404).json({ message: 'Contact not found' });
        }
        res.json(contact);
    }
    catch (error) {
        console.error('Error fetching contact:', error);
        res.status(500).json({ message: 'Server error' });
    }
});
// Mark contact as read (admin only)
router.patch('/:id/read', auth_1.authenticate, auth_1.requireAdmin, async (req, res) => {
    try {
        const contact = await Contact_1.default.findByIdAndUpdate(req.params.id, { isRead: true }, { new: true });
        if (!contact) {
            return res.status(404).json({ message: 'Contact not found' });
        }
        res.json(contact);
    }
    catch (error) {
        console.error('Error updating contact:', error);
        res.status(500).json({ message: 'Server error' });
    }
});
// Delete contact (admin only)
router.delete('/:id', auth_1.authenticate, auth_1.requireAdmin, async (req, res) => {
    try {
        const contact = await Contact_1.default.findByIdAndDelete(req.params.id);
        if (!contact) {
            return res.status(404).json({ message: 'Contact not found' });
        }
        res.json({ message: 'Contact deleted successfully' });
    }
    catch (error) {
        console.error('Error deleting contact:', error);
        res.status(500).json({ message: 'Server error' });
    }
});
exports.default = router;
//# sourceMappingURL=contact.js.map