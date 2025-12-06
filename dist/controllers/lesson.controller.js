"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lessonController = void 0;
const lesson_service_1 = require("../services/lesson.service");
exports.lessonController = {
    async create(req, res) {
        try {
            const { title, content, fileId, courseId, assignment } = req.body;
            if (!title || !courseId) {
                return res.status(400).json({ error: 'Title and courseId are required' });
            }
            const lessonData = {
                title,
                content,
                fileId,
                courseId,
            };
            if (assignment) {
                lessonData.assignment = {
                    title: assignment.title,
                    description: assignment.description,
                    dueDate: assignment.dueDate ? new Date(assignment.dueDate) : undefined,
                    maxPoints: assignment.maxPoints,
                };
            }
            const lesson = await lesson_service_1.lessonService.create(lessonData);
            res.status(201).json(lesson);
        }
        catch (error) {
            console.error('Error creating lesson:', error);
            res.status(500).json({ error: 'Failed to create lesson' });
        }
    },
    async findAll(req, res) {
        try {
            const lessons = await lesson_service_1.lessonService.findAll();
            res.json(lessons);
        }
        catch (error) {
            console.error('Error fetching lessons:', error);
            res.status(500).json({ error: 'Failed to fetch lessons' });
        }
    },
    async findById(req, res) {
        try {
            const { id } = req.params;
            const lesson = await lesson_service_1.lessonService.findById(id);
            if (!lesson) {
                return res.status(404).json({ error: 'Lesson not found' });
            }
            res.json(lesson);
        }
        catch (error) {
            console.error('Error fetching lesson:', error);
            res.status(500).json({ error: 'Failed to fetch lesson' });
        }
    },
    async findByCourseId(req, res) {
        try {
            const { courseId } = req.params;
            const lessons = await lesson_service_1.lessonService.findByCourseId(courseId);
            res.json(lessons);
        }
        catch (error) {
            console.error('Error fetching course lessons:', error);
            res.status(500).json({ error: 'Failed to fetch course lessons' });
        }
    },
    async update(req, res) {
        try {
            const { id } = req.params;
            const { title, content, fileId } = req.body;
            const existingLesson = await lesson_service_1.lessonService.findById(id);
            if (!existingLesson) {
                return res.status(404).json({ error: 'Lesson not found' });
            }
            const lesson = await lesson_service_1.lessonService.update(id, {
                title,
                content,
                fileId,
            });
            res.json(lesson);
        }
        catch (error) {
            console.error('Error updating lesson:', error);
            res.status(500).json({ error: 'Failed to update lesson' });
        }
    },
    async delete(req, res) {
        try {
            const { id } = req.params;
            const existingLesson = await lesson_service_1.lessonService.findById(id);
            if (!existingLesson) {
                return res.status(404).json({ error: 'Lesson not found' });
            }
            await lesson_service_1.lessonService.delete(id);
            res.status(204).send();
        }
        catch (error) {
            console.error('Error deleting lesson:', error);
            res.status(500).json({ error: 'Failed to delete lesson' });
        }
    },
};
