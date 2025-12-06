"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileMetadataService = void 0;
const prisma_1 = __importDefault(require("../config/prisma"));
const uploadConfig_1 = require("../utils/uploadConfig");
exports.fileMetadataService = {
    async create(data) {
        return prisma_1.default.fileMetadata.create({ data });
    },
    async findAll() {
        return prisma_1.default.fileMetadata.findMany({
            orderBy: {
                uploadedAt: 'desc',
            },
        });
    },
    async findById(id) {
        return prisma_1.default.fileMetadata.findUnique({
            where: { id },
        });
    },
    async findByType(fileType) {
        return prisma_1.default.fileMetadata.findMany({
            where: { fileType },
            orderBy: {
                uploadedAt: 'desc',
            },
        });
    },
    async update(id, data) {
        return prisma_1.default.fileMetadata.update({
            where: { id },
            data,
        });
    },
    async delete(id) {
        const file = await prisma_1.default.fileMetadata.findUnique({ where: { id } });
        if (!file) {
            throw new Error('File not found');
        }
        // Remove references from related tables first
        await prisma_1.default.user.updateMany({
            where: { profileImageId: id },
            data: { profileImageId: null },
        });
        await prisma_1.default.lesson.updateMany({
            where: { fileId: id },
            data: { fileId: null },
        });
        await prisma_1.default.submission.updateMany({
            where: { fileId: id },
            data: { fileId: null },
        });
        // Delete from GCS
        try {
            await (0, uploadConfig_1.deleteFromGCS)(file.fileUrl);
        }
        catch (error) {
            console.error('Error deleting from GCS (continuing with DB delete):', error);
        }
        // Delete from database
        return prisma_1.default.fileMetadata.delete({ where: { id } });
    },
};
