"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const services_1 = require("../services");
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
exports.authController = {
    async login(req, res) {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                return res.status(400).json({ error: 'Email and password are required' });
            }
            const user = await services_1.userService.findByEmail(email);
            if (!user || user.password !== password) {
                return res.status(401).json({ error: 'Invalid email or password' });
            }
            const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });
            res.status(200).json({ message: 'Login successful', user, token });
        }
        catch (error) {
            console.error('Error during login:', error);
            res.status(500).json({ error: 'Failed to login' });
        }
    },
    async register(req, res) {
        try {
            const { email, password, name, role } = req.body;
            if (!email || !password || !name) {
                return res.status(400).json({ error: 'Email, password, and name are required' });
            }
            const existingUser = await services_1.userService.findByEmail(email);
            if (existingUser) {
                return res.status(409).json({ error: 'Email already exists' });
            }
            const user = await services_1.userService.create({
                email,
                password,
                name,
                role: role || 'STUDENT',
            });
            const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '7d' });
            res.status(201).json({ message: 'Registration successful', user, token });
        }
        catch (error) {
            console.error('Error during registration:', error);
            res.status(500).json({ error: 'Failed to register, ' + error });
        }
    },
    async me(req, res) {
        try {
            const authHeader = req.headers.authorization;
            if (!authHeader || !authHeader.startsWith('Bearer ')) {
                return res.status(401).json({ error: 'No token provided' });
            }
            const token = authHeader.split(' ')[1];
            const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
            const user = await services_1.userService.findById(decoded.id);
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            res.json(user);
        }
        catch (error) {
            console.error('Error fetching user:', error);
            res.status(401).json({ error: 'Invalid token' });
        }
    },
};
