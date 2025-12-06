"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.enrollmentController = void 0;
const enrollment_service_1 = require("../services/enrollment.service");
exports.enrollmentController = {
    async create(req, res) {
        try {
            const { studentId, courseId } = req.body;
            if (!studentId || !courseId) {
                return res.status(400).json({ error: 'StudentId and courseId are required' });
            }
            const isEnrolled = await enrollment_service_1.enrollmentService.isEnrolled(studentId, courseId);
            if (isEnrolled) {
                return res.status(409).json({ error: 'Student is already enrolled in this course' });
            }
            const enrollment = await enrollment_service_1.enrollmentService.create({
                studentId,
                courseId,
            });
            res.status(201).json(enrollment);
        }
        catch (error) {
            console.error('Error creating enrollment:', error);
            res.status(500).json({ error: 'Failed to create enrollment' });
        }
    },
    async findAll(req, res) {
        try {
            const enrollments = await enrollment_service_1.enrollmentService.findAll();
            res.json(enrollments);
        }
        catch (error) {
            console.error('Error fetching enrollments:', error);
            res.status(500).json({ error: 'Failed to fetch enrollments' });
        }
    },
    async findById(req, res) {
        try {
            const { id } = req.params;
            const enrollment = await enrollment_service_1.enrollmentService.findById(id);
            if (!enrollment) {
                return res.status(404).json({ error: 'Enrollment not found' });
            }
            res.json(enrollment);
        }
        catch (error) {
            console.error('Error fetching enrollment:', error);
            res.status(500).json({ error: 'Failed to fetch enrollment' });
        }
    },
    async findByStudentId(req, res) {
        try {
            const { studentId } = req.params;
            const enrollments = await enrollment_service_1.enrollmentService.findByStudentId(studentId);
            res.json(enrollments);
        }
        catch (error) {
            console.error('Error fetching student enrollments:', error);
            res.status(500).json({ error: 'Failed to fetch student enrollments' });
        }
    },
    async findByCourseId(req, res) {
        try {
            const { courseId } = req.params;
            const enrollments = await enrollment_service_1.enrollmentService.findByCourseId(courseId);
            res.json(enrollments);
        }
        catch (error) {
            console.error('Error fetching course enrollments:', error);
            res.status(500).json({ error: 'Failed to fetch course enrollments' });
        }
    },
    async delete(req, res) {
        try {
            const { id } = req.params;
            const existingEnrollment = await enrollment_service_1.enrollmentService.findById(id);
            if (!existingEnrollment) {
                return res.status(404).json({ error: 'Enrollment not found' });
            }
            await enrollment_service_1.enrollmentService.delete(id);
            res.status(204).send();
        }
        catch (error) {
            console.error('Error deleting enrollment:', error);
            res.status(500).json({ error: 'Failed to delete enrollment' });
        }
    },
    async unenroll(req, res) {
        try {
            const { studentId, courseId } = req.body;
            if (!studentId || !courseId) {
                return res.status(400).json({ error: 'StudentId and courseId are required' });
            }
            const isEnrolled = await enrollment_service_1.enrollmentService.isEnrolled(studentId, courseId);
            if (!isEnrolled) {
                return res.status(404).json({ error: 'Enrollment not found' });
            }
            await enrollment_service_1.enrollmentService.deleteByStudentAndCourse(studentId, courseId);
            res.status(204).send();
        }
        catch (error) {
            console.error('Error unenrolling student:', error);
            res.status(500).json({ error: 'Failed to unenroll student' });
        }
    },
    async markLessonComplete(req, res) {
        try {
            const { studentId, courseId, lessonId } = req.body;
            if (!studentId || !courseId || !lessonId) {
                return res.status(400).json({ error: 'StudentId, courseId, and lessonId are required' });
            }
            const enrollment = await enrollment_service_1.enrollmentService.markLessonComplete(studentId, courseId, lessonId);
            res.json(enrollment);
        }
        catch (error) {
            console.error('Error marking lesson complete:', error);
            if (error.message === 'Enrollment not found') {
                return res.status(404).json({ error: 'Enrollment not found' });
            }
            res.status(500).json({ error: 'Failed to mark lesson complete' });
        }
    },
    async markLessonIncomplete(req, res) {
        try {
            const { studentId, courseId, lessonId } = req.body;
            if (!studentId || !courseId || !lessonId) {
                return res.status(400).json({ error: 'StudentId, courseId, and lessonId are required' });
            }
            const enrollment = await enrollment_service_1.enrollmentService.markLessonIncomplete(studentId, courseId, lessonId);
            res.json(enrollment);
        }
        catch (error) {
            console.error('Error marking lesson incomplete:', error);
            if (error.message === 'Enrollment not found') {
                return res.status(404).json({ error: 'Enrollment not found' });
            }
            res.status(500).json({ error: 'Failed to mark lesson incomplete' });
        }
    },
    async getCompletedLessons(req, res) {
        try {
            const { studentId, courseId } = req.params;
            if (!studentId || !courseId) {
                return res.status(400).json({ error: 'StudentId and courseId are required' });
            }
            const completedLessonIds = await enrollment_service_1.enrollmentService.getCompletedLessons(studentId, courseId);
            res.json({ completedLessonIds });
        }
        catch (error) {
            console.error('Error fetching completed lessons:', error);
            res.status(500).json({ error: 'Failed to fetch completed lessons' });
        }
    },
};
