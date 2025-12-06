"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.assignmentService = void 0;
const prisma_1 = __importDefault(require("../config/prisma"));
exports.assignmentService = {
    async create(data) {
        const existingAssignment = await prisma_1.default.assignment.findUnique({
            where: { lessonId: data.lessonId },
        });
        if (existingAssignment) {
            throw new Error('Lesson already has an assignment');
        }
        return prisma_1.default.assignment.create({
            data,
            include: {
                lesson: {
                    select: {
                        id: true,
                        title: true,
                        courseId: true,
                    },
                },
            },
        });
    },
    async findAll() {
        return prisma_1.default.assignment.findMany({
            include: {
                lesson: {
                    select: {
                        id: true,
                        title: true,
                        courseId: true,
                    },
                },
                _count: {
                    select: {
                        submissions: true,
                    },
                },
            },
        });
    },
    async findById(id) {
        return prisma_1.default.assignment.findUnique({
            where: { id },
            include: {
                lesson: {
                    select: {
                        id: true,
                        title: true,
                        course: {
                            select: {
                                id: true,
                                title: true,
                            },
                        },
                    },
                },
                submissions: {
                    include: {
                        student: {
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
    async findByLessonId(lessonId) {
        return prisma_1.default.assignment.findUnique({
            where: { lessonId },
            include: {
                _count: {
                    select: {
                        submissions: true,
                    },
                },
            },
        });
    },
    async findByCourseId(courseId) {
        return prisma_1.default.assignment.findMany({
            where: {
                lesson: {
                    courseId,
                },
            },
            include: {
                lesson: {
                    select: {
                        id: true,
                        title: true,
                    },
                },
                _count: {
                    select: {
                        submissions: true,
                    },
                },
            },
            orderBy: {
                dueDate: 'asc',
            },
        });
    },
    async update(id, data) {
        return prisma_1.default.assignment.update({
            where: { id },
            data,
            include: {
                lesson: {
                    select: {
                        id: true,
                        title: true,
                    },
                },
            },
        });
    },
    async delete(id) {
        await prisma_1.default.submission.deleteMany({ where: { assignmentId: id } });
        return prisma_1.default.assignment.delete({ where: { id } });
    },
};
