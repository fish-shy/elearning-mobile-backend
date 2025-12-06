"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.courseService = void 0;
const prisma_1 = __importDefault(require("../config/prisma"));
exports.courseService = {
    async create(data) {
        return prisma_1.default.course.create({
            data,
            include: {
                teacher: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
            },
        });
    },
    async findAll() {
        return prisma_1.default.course.findMany({
            include: {
                teacher: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
                _count: {
                    select: {
                        lessons: true,
                        enrollments: true,
                    },
                },
            },
        });
    },
    async findAllByStudentId(studentId) {
        return prisma_1.default.course.findMany({
            where: {
                enrollments: {
                    some: { studentId },
                },
            },
            include: {
                enrollments: {
                    where: { studentId },
                    select: {
                        completedLessonIds: true,
                    },
                },
                lessons: {
                    select: {
                        id: true,
                    },
                },
            },
        });
    },
    async findById(id) {
        return prisma_1.default.course.findUnique({
            where: { id },
            include: {
                teacher: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
                lessons: true,
                enrollments: {
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
    async findByTeacherId(teacherId) {
        return prisma_1.default.course.findMany({
            where: { teacherId },
            include: {
                _count: {
                    select: {
                        lessons: true,
                        enrollments: true,
                    },
                },
            },
        });
    },
    async update(id, data) {
        return prisma_1.default.course.update({
            where: { id },
            data,
            include: {
                teacher: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
            },
        });
    },
    async delete(id) {
        return prisma_1.default.course.delete({ where: { id } });
    },
};
