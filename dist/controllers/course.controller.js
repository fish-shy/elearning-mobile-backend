"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.courseController = void 0;
const course_service_1 = require("../services/course.service");
exports.courseController = {
    async create(req, res) {
        try {
            const { title, description, imagePath, teacherId } = req.body;
            if (!title || !teacherId) {
                return res.status(400).json({ error: 'Title and teacherId are required' });
            }
            const course = await course_service_1.courseService.create({
                title,
                description,
                imagePath,
                teacherId,
            });
            res.status(201).json(course);
        }
        catch (error) {
            console.error('Error creating course:', error);
            res.status(500).json({ error: 'Failed to create course' });
        }
    },
    async getStudentCourses(req, res) {
        var _a;
        try {
            const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
            const courses = await course_service_1.courseService.findAllByStudentId(userId);
            res.json(courses);
        }
        catch (error) {
            console.error('Error fetching student courses:', error);
            res.status(500).json({ error: 'Failed to fetch student courses' });
        }
    },
    async findAll(req, res) {
        try {
            const courses = await course_service_1.courseService.findAll();
            res.json(courses);
        }
        catch (error) {
            console.error('Error fetching courses:', error);
            res.status(500).json({ error: 'Failed to fetch courses' });
        }
    },
    async findById(req, res) {
        try {
            const { id } = req.params;
            const course = await course_service_1.courseService.findById(id);
            if (!course) {
                return res.status(404).json({ error: 'Course not found' });
            }
            res.json(course);
        }
        catch (error) {
            console.error('Error fetching course:', error);
            res.status(500).json({ error: 'Failed to fetch course' });
        }
    },
    async findByTeacherId(req, res) {
        try {
            const { teacherId } = req.params;
            const courses = await course_service_1.courseService.findByTeacherId(teacherId);
            res.json(courses);
        }
        catch (error) {
            console.error('Error fetching teacher courses:', error);
            res.status(500).json({ error: 'Failed to fetch teacher courses' });
        }
    },
    async update(req, res) {
        try {
            const { id } = req.params;
            const { title, description, imagePath } = req.body;
            const existingCourse = await course_service_1.courseService.findById(id);
            if (!existingCourse) {
                return res.status(404).json({ error: 'Course not found' });
            }
            const course = await course_service_1.courseService.update(id, {
                title,
                description,
                imagePath,
            });
            res.json(course);
        }
        catch (error) {
            console.error('Error updating course:', error);
            res.status(500).json({ error: 'Failed to update course' });
        }
    },
    async delete(req, res) {
        try {
            const { id } = req.params;
            const existingCourse = await course_service_1.courseService.findById(id);
            if (!existingCourse) {
                return res.status(404).json({ error: 'Course not found' });
            }
            await course_service_1.courseService.delete(id);
            res.status(204).send();
        }
        catch (error) {
            console.error('Error deleting course:', error);
            res.status(500).json({ error: 'Failed to delete course' });
        }
    },
};
