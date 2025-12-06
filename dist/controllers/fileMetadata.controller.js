"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileMetadataController = void 0;
const fileMetadata_service_1 = require("../services/fileMetadata.service");
exports.fileMetadataController = {
    async create(req, res) {
        try {
            const { fileName, fileSize, fileType, fileUrl } = req.body;
            if (!fileName || !fileSize || !fileType || !fileUrl) {
                return res.status(400).json({ error: 'fileName, fileSize, fileType, and fileUrl are required' });
            }
            const fileMetadata = await fileMetadata_service_1.fileMetadataService.create({
                fileName,
                fileSize,
                fileType,
                fileUrl,
            });
            res.status(201).json(fileMetadata);
        }
        catch (error) {
            console.error('Error creating file metadata:', error);
            res.status(500).json({ error: 'Failed to create file metadata' });
        }
    },
    async findAll(req, res) {
        try {
            const files = await fileMetadata_service_1.fileMetadataService.findAll();
            res.json(files);
        }
        catch (error) {
            console.error('Error fetching file metadata:', error);
            res.status(500).json({ error: 'Failed to fetch file metadata' });
        }
    },
    async findById(req, res) {
        try {
            const { id } = req.params;
            const fileMetadata = await fileMetadata_service_1.fileMetadataService.findById(id);
            if (!fileMetadata) {
                return res.status(404).json({ error: 'File metadata not found' });
            }
            res.json(fileMetadata);
        }
        catch (error) {
            console.error('Error fetching file metadata:', error);
            res.status(500).json({ error: 'Failed to fetch file metadata' });
        }
    },
    async findByType(req, res) {
        try {
            const { fileType } = req.params;
            const files = await fileMetadata_service_1.fileMetadataService.findByType(fileType);
            res.json(files);
        }
        catch (error) {
            console.error('Error fetching files by type:', error);
            res.status(500).json({ error: 'Failed to fetch files by type' });
        }
    },
    async update(req, res) {
        try {
            const { id } = req.params;
            const { fileName, fileSize, fileType } = req.body;
            const existingFile = await fileMetadata_service_1.fileMetadataService.findById(id);
            if (!existingFile) {
                return res.status(404).json({ error: 'File metadata not found' });
            }
            const fileMetadata = await fileMetadata_service_1.fileMetadataService.update(id, {
                fileName,
                fileSize,
                fileType,
            });
            res.json(fileMetadata);
        }
        catch (error) {
            console.error('Error updating file metadata:', error);
            res.status(500).json({ error: 'Failed to update file metadata' });
        }
    },
    async delete(req, res) {
        try {
            const { id } = req.params;
            const existingFile = await fileMetadata_service_1.fileMetadataService.findById(id);
            if (!existingFile) {
                return res.status(404).json({ error: 'File metadata not found' });
            }
            await fileMetadata_service_1.fileMetadataService.delete(id);
            res.status(204).send();
        }
        catch (error) {
            console.error('Error deleting file metadata:', error);
            res.status(500).json({ error: 'Failed to delete file metadata' });
        }
    },
};
