"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAdmin = exports.authenticate = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
const authenticate = async (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) {
            return res.status(401).json({ message: 'No token, authorization denied' });
        }
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        const user = await User_1.default.findById(decoded.userId).select('-password');
        if (!user) {
            return res.status(401).json({ message: 'Token is not valid' });
        }
        req.user = user;
        next();
    }
    catch (error) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};
exports.authenticate = authenticate;
const requireAdmin = (req, res, next) => {
    if (req.user?.role !== 'admin') {
        return res.status(403).json({ message: 'Admin access required' });
    }
    next();
};
exports.requireAdmin = requireAdmin;
//# sourceMappingURL=auth.js.map