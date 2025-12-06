"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.lessonService = void 0;
const prisma_1 = __importDefault(require("../config/prisma"));
exports.lessonService = {
    async create(data) {
        const { assignment, ...lessonData } = data;
        return prisma_1.default.lesson.create({
            data: {
                ...lessonData,
                assignment: assignment ? { create: assignment } : undefined,
            },
            include: {
                course: {
                    select: {
                        id: true,
                        title: true,
                    },
                },
                file: true,
                assignment: true,
            },
        });
    },
    async findAll() {
        return prisma_1.default.lesson.findMany({
            include: {
                course: {
                    select: {
                        id: true,
                        title: true,
                    },
                },
                file: true,
                assignment: true,
            },
        });
    },
    async findById(id) {
        return prisma_1.default.lesson.findUnique({
            where: { id },
            include: {
                course: {
                    select: {
                        id: true,
                        title: true,
                    },
                },
                file: true,
                assignment: {
                    include: {
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
                },
            },
        });
    },
    async findByCourseId(courseId) {
        return prisma_1.default.lesson.findMany({
            where: { courseId },
            include: {
                file: true,
                assignment: true,
            },
            orderBy: {
                createdAt: 'asc',
            },
        });
    },
    async update(id, data) {
        return prisma_1.default.lesson.update({
            where: { id },
            data,
            include: {
                course: {
                    select: {
                        id: true,
                        title: true,
                    },
                },
                file: true,
                assignment: true,
            },
        });
    },
    async delete(id) {
        await prisma_1.default.assignment.deleteMany({ where: { lessonId: id } });
        return prisma_1.default.lesson.delete({ where: { id } });
    },
};
