"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const user_service_1 = require("../services/user.service");
exports.userController = {
    async create(req, res) {
        try {
            const { email, password, name, role, profileImageId } = req.body;
            if (!email || !password) {
                return res.status(400).json({ error: 'Email and password are required' });
            }
            const existingUser = await user_service_1.userService.findByEmail(email);
            if (existingUser) {
                return res.status(409).json({ error: 'User with this email already exists' });
            }
            const user = await user_service_1.userService.create({
                email,
                password,
                name,
                role,
                profileImageId,
            });
            res.status(201).json(user);
        }
        catch (error) {
            console.error('Error creating user:', error);
            res.status(500).json({ error: 'Failed to create user' });
        }
    },
    async findAll(req, res) {
        try {
            const users = await user_service_1.userService.findAll();
            res.json(users);
        }
        catch (error) {
            console.error('Error fetching users:', error);
            res.status(500).json({ error: 'Failed to fetch users' });
        }
    },
    async findById(req, res) {
        try {
            const { id } = req.params;
            const user = await user_service_1.userService.findById(id);
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            res.json(user);
        }
        catch (error) {
            console.error('Error fetching user:', error);
            res.status(500).json({ error: 'Failed to fetch user' });
        }
    },
    async update(req, res) {
        try {
            const { id } = req.params;
            const { email, password, name, role, profileImageId } = req.body;
            const existingUser = await user_service_1.userService.findById(id);
            if (!existingUser) {
                return res.status(404).json({ error: 'User not found' });
            }
            const user = await user_service_1.userService.update(id, {
                email,
                password,
                name,
                role,
                profileImageId,
            });
            res.json(user);
        }
        catch (error) {
            console.error('Error updating user:', error);
            res.status(500).json({ error: 'Failed to update user' });
        }
    },
    async delete(req, res) {
        try {
            const { id } = req.params;
            const existingUser = await user_service_1.userService.findById(id);
            if (!existingUser) {
                return res.status(404).json({ error: 'User not found' });
            }
            await user_service_1.userService.delete(id);
            res.status(204).send();
        }
        catch (error) {
            console.error('Error deleting user:', error);
            res.status(500).json({ error: 'Failed to delete user' });
        }
    },
    async getTaughtCourses(req, res) {
        try {
            const { id } = req.params;
            const user = await user_service_1.userService.findWithTaughtCourses(id);
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            res.json(user);
        }
        catch (error) {
            console.error('Error fetching user courses:', error);
            res.status(500).json({ error: 'Failed to fetch user courses' });
        }
    },
    async getEnrollments(req, res) {
        try {
            const { id } = req.params;
            const user = await user_service_1.userService.findWithEnrollments(id);
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            res.json(user);
        }
        catch (error) {
            console.error('Error fetching user enrollments:', error);
            res.status(500).json({ error: 'Failed to fetch user enrollments' });
        }
    },
};
