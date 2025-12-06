"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.submissionService = void 0;
const prisma_1 = __importDefault(require("../config/prisma"));
exports.submissionService = {
    async create(data) {
        return prisma_1.default.submission.create({
            data,
            include: {
                student: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
                assignment: {
                    select: {
                        id: true,
                        title: true,
                        maxPoints: true,
                    },
                },
            },
        });
    },
    async findAll() {
        return prisma_1.default.submission.findMany({
            include: {
                student: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
                assignment: {
                    select: {
                        id: true,
                        title: true,
                        maxPoints: true,
                    },
                },
            },
        });
    },
    async findById(id) {
        return prisma_1.default.submission.findUnique({
            where: { id },
            include: {
                student: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
                assignment: {
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
                    },
                },
            },
        });
    },
    async findByStudentId(studentId) {
        return prisma_1.default.submission.findMany({
            where: { studentId },
            include: {
                assignment: {
                    select: {
                        id: true,
                        title: true,
                        maxPoints: true,
                        dueDate: true,
                    },
                },
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
    },
    async findByAssignmentIdAndStudentId(assignmentId, studentId) {
        return prisma_1.default.submission.findMany({
            where: { assignmentId, studentId },
            include: {
                student: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
                file: true,
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
    },
    async findByAssignmentId(assignmentId) {
        return prisma_1.default.submission.findMany({
            where: { assignmentId },
            include: {
                student: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
    },
    async grade(id, data) {
        return prisma_1.default.submission.update({
            where: { id },
            data,
            include: {
                student: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
                assignment: {
                    select: {
                        id: true,
                        title: true,
                        maxPoints: true,
                    },
                },
            },
        });
    },
    async update(id, data) {
        return prisma_1.default.submission.update({
            where: { id },
            data,
            include: {
                student: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
                assignment: {
                    select: {
                        id: true,
                        title: true,
                        maxPoints: true,
                    },
                },
            },
        });
    },
    async delete(id) {
        return prisma_1.default.submission.delete({ where: { id } });
    },
};
