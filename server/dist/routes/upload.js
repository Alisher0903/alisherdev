"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const upload_1 = require("../middleware/upload");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
// Upload single file
router.post('/single', auth_1.authenticate, auth_1.requireAdmin, (req, res) => {
    (0, upload_1.uploadSingle)(req, res, (err) => {
        if (err) {
            return res.status(400).json({ message: err.message });
        }
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }
        const fileUrl = `/uploads/${req.file.filename}`;
        res.json({
            message: 'File uploaded successfully',
            url: fileUrl,
            filename: req.file.filename,
            originalName: req.file.originalname,
            size: req.file.size
        });
    });
});
// Upload multiple files
router.post('/multiple', auth_1.authenticate, auth_1.requireAdmin, (req, res) => {
    (0, upload_1.uploadMultiple)(req, res, (err) => {
        if (err) {
            return res.status(400).json({ message: err.message });
        }
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ message: 'No files uploaded' });
        }
        const files = req.files;
        const uploadedFiles = files.map(file => ({
            url: `/uploads/${file.filename}`,
            filename: file.filename,
            originalName: file.originalname,
            size: file.size
        }));
        res.json({
            message: 'Files uploaded successfully',
            files: uploadedFiles
        });
    });
});
exports.default = router;
//# sourceMappingURL=upload.js.map