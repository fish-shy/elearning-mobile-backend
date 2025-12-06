"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.enrollmentService = void 0;
const prisma_1 = __importDefault(require("../config/prisma"));
exports.enrollmentService = {
    async create(data) {
        return prisma_1.default.enrollment.create({
            data,
            include: {
                student: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
                course: {
                    select: {
                        id: true,
                        title: true,
                    },
                },
            },
        });
    },
    async findAll() {
        return prisma_1.default.enrollment.findMany({
            include: {
                student: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
                course: {
                    select: {
                        id: true,
                        title: true,
                    },
                },
            },
        });
    },
    async findById(id) {
        return prisma_1.default.enrollment.findUnique({
            where: { id },
            include: {
                student: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
                course: true,
            },
        });
    },
    async findByStudentId(studentId) {
        return prisma_1.default.enrollment.findMany({
            where: { studentId },
            include: {
                course: {
                    include: {
                        teacher: {
                            select: {
                                id: true,
                                name: true,
                                email: true,
                            },
                        },
                    },
                },
            },
        });
    },
    async findByCourseId(courseId) {
        return prisma_1.default.enrollment.findMany({
            where: { courseId },
            include: {
                student: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
            },
        });
    },
    async isEnrolled(studentId, courseId) {
        const enrollment = await prisma_1.default.enrollment.findUnique({
            where: {
                studentId_courseId: {
                    studentId,
                    courseId,
                },
            },
        });
        if (enrollment) {
            return true;
        }
        return false;
    },
    async markLessonComplete(studentId, courseId, lessonId) {
        const enrollment = await prisma_1.default.enrollment.findUnique({
            where: {
                studentId_courseId: {
                    studentId,
                    courseId,
                },
            },
        });
        if (!enrollment) {
            throw new Error('Enrollment not found');
        }
        const completedLessonIds = enrollment.completedLessonIds || [];
        if (!completedLessonIds.includes(lessonId)) {
            completedLessonIds.push(lessonId);
        }
        return prisma_1.default.enrollment.update({
            where: {
                studentId_courseId: {
                    studentId,
                    courseId,
                },
            },
            data: {
                completedLessonIds,
            },
        });
    },
    async markLessonIncomplete(studentId, courseId, lessonId) {
        const enrollment = await prisma_1.default.enrollment.findUnique({
            where: {
                studentId_courseId: {
                    studentId,
                    courseId,
                },
            },
        });
        if (!enrollment) {
            throw new Error('Enrollment not found');
        }
        const completedLessonIds = (enrollment.completedLessonIds || []).filter(id => id !== lessonId);
        return prisma_1.default.enrollment.update({
            where: {
                studentId_courseId: {
                    studentId,
                    courseId,
                },
            },
            data: {
                completedLessonIds,
            },
        });
    },
    async getCompletedLessons(studentId, courseId) {
        const enrollment = await prisma_1.default.enrollment.findUnique({
            where: {
                studentId_courseId: {
                    studentId,
                    courseId,
                },
            },
            select: {
                completedLessonIds: true,
            },
        });
        return (enrollment === null || enrollment === void 0 ? void 0 : enrollment.completedLessonIds) || [];
    },
    async delete(id) {
        return prisma_1.default.enrollment.delete({ where: { id } });
    },
    async deleteByStudentAndCourse(studentId, courseId) {
        return prisma_1.default.enrollment.delete({
            where: {
                studentId_courseId: {
                    studentId,
                    courseId,
                },
            },
        });
    },
};
