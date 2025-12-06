"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const prisma_1 = __importDefault(require("../config/prisma"));
exports.userService = {
    async create(data) {
        return prisma_1.default.user.create({ data });
    },
    async findAll() {
        return prisma_1.default.user.findMany({
            select: {
                id: true,
                email: true,
                name: true,
                role: true,
                profileImageId: true,
                profileImage: true,
                createdAt: true,
                updatedAt: true,
            },
        });
    },
    async findById(id) {
        return prisma_1.default.user.findUnique({
            where: { id },
            select: {
                id: true,
                email: true,
                name: true,
                role: true,
                profileImageId: true,
                profileImage: true,
                createdAt: true,
                updatedAt: true,
            },
        });
    },
    async findByEmail(email) {
        return prisma_1.default.user.findUnique({
            where: { email },
        });
    },
    async update(id, data) {
        return prisma_1.default.user.update({
            where: { id },
            data,
            select: {
                id: true,
                email: true,
                name: true,
                role: true,
                profileImageId: true,
                profileImage: true,
                createdAt: true,
                updatedAt: true,
            },
        });
    },
    async delete(id) {
        return prisma_1.default.user.delete({ where: { id } });
    },
    async findWithTaughtCourses(id) {
        return prisma_1.default.user.findUnique({
            where: { id },
            include: {
                taughtCourses: true,
            },
        });
    },
    async findWithEnrollments(id) {
        return prisma_1.default.user.findUnique({
            where: { id },
            include: {
                enrollments: {
                    include: {
                        course: true,
                    },
                },
            },
        });
    },
};
