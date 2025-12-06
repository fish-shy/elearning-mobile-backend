"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assignmentController = void 0;
const assignment_service_1 = require("../services/assignment.service");
exports.assignmentController = {
    async create(req, res) {
        try {
            const { title, description, dueDate, maxPoints, lessonId } = req.body;
            if (!title || !lessonId) {
                return res.status(400).json({ error: 'Title and lessonId are required' });
            }
            const assignment = await assignment_service_1.assignmentService.create({
                title,
                description,
                dueDate: dueDate ? new Date(dueDate) : undefined,
                maxPoints,
                lessonId,
            });
            res.status(201).json(assignment);
        }
        catch (error) {
            console.error('Error creating assignment:', error);
            if (error.message === 'Lesson already has an assignment') {
                return res.status(409).json({ error: 'Lesson already has an assignment (one-to-one relationship)' });
            }
            res.status(500).json({ error: 'Failed to create assignment' });
        }
    },
    async findAll(req, res) {
        try {
            const assignments = await assignment_service_1.assignmentService.findAll();
            res.json(assignments);
        }
        catch (error) {
            console.error('Error fetching assignments:', error);
            res.status(500).json({ error: 'Failed to fetch assignments' });
        }
    },
    async findById(req, res) {
        try {
            const { id } = req.params;
            const assignment = await assignment_service_1.assignmentService.findById(id);
            if (!assignment) {
                return res.status(404).json({ error: 'Assignment not found' });
            }
            res.json(assignment);
        }
        catch (error) {
            console.error('Error fetching assignment:', error);
            res.status(500).json({ error: 'Failed to fetch assignment' });
        }
    },
    async findByLessonId(req, res) {
        try {
            const { lessonId } = req.params;
            const assignment = await assignment_service_1.assignmentService.findByLessonId(lessonId);
            if (!assignment) {
                return res.status(404).json({ error: 'No assignment found for this lesson' });
            }
            res.json(assignment);
        }
        catch (error) {
            console.error('Error fetching lesson assignment:', error);
            res.status(500).json({ error: 'Failed to fetch lesson assignment' });
        }
    },
    async findByCourseId(req, res) {
        try {
            const { courseId } = req.params;
            const assignments = await assignment_service_1.assignmentService.findByCourseId(courseId);
            res.json(assignments);
        }
        catch (error) {
            console.error('Error fetching course assignments:', error);
            res.status(500).json({ error: 'Failed to fetch course assignments' });
        }
    },
    async update(req, res) {
        try {
            const { id } = req.params;
            const { title, description, dueDate, maxPoints } = req.body;
            const existingAssignment = await assignment_service_1.assignmentService.findById(id);
            if (!existingAssignment) {
                return res.status(404).json({ error: 'Assignment not found' });
            }
            const assignment = await assignment_service_1.assignmentService.update(id, {
                title,
                description,
                dueDate: dueDate ? new Date(dueDate) : undefined,
                maxPoints,
            });
            res.json(assignment);
        }
        catch (error) {
            console.error('Error updating assignment:', error);
            res.status(500).json({ error: 'Failed to update assignment' });
        }
    },
    async delete(req, res) {
        try {
            const { id } = req.params;
            const existingAssignment = await assignment_service_1.assignmentService.findById(id);
            if (!existingAssignment) {
                return res.status(404).json({ error: 'Assignment not found' });
            }
            await assignment_service_1.assignmentService.delete(id);
            res.status(204).send();
        }
        catch (error) {
            console.error('Error deleting assignment:', error);
            res.status(500).json({ error: 'Failed to delete assignment' });
        }
    },
};
