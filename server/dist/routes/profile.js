"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const User_1 = __importDefault(require("../models/User"));
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
// Get user profile
router.get('/', auth_1.authenticate, async (req, res) => {
    try {
        const user = await User_1.default.findById(req.user._id).select('-password');
        res.json(user);
    }
    catch (error) {
        console.error('Error fetching profile:', error);
        res.status(500).json({ message: 'Server error' });
    }
});
// Update user profile
router.put('/', auth_1.authenticate, async (req, res) => {
    try {
        const { username, email, currentPassword, newPassword } = req.body;
        const user = await User_1.default.findById(req.user._id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        // Update basic info
        if (username)
            user.username = username;
        if (email)
            user.email = email;
        // Update password if provided
        if (newPassword && currentPassword) {
            const isMatch = await user.comparePassword(currentPassword);
            if (!isMatch) {
                return res.status(400).json({ message: 'Current password is incorrect' });
            }
            user.password = newPassword;
        }
        await user.save();
        // Return user without password
        const updatedUser = await User_1.default.findById(user._id).select('-password');
        res.json(updatedUser);
    }
    catch (error) {
        console.error('Error updating profile:', error);
        res.status(500).json({ message: 'Server error' });
    }
});
exports.default = router;
//# sourceMappingURL=profile.js.map