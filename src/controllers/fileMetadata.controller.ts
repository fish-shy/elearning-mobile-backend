import { Request, Response } from 'express';
import { fileMetadataService } from '../services/fileMetadata.service';

export const fileMetadataController = {
  async create(req: Request, res: Response) {
    try {
      const { fileName, fileSize, fileType } = req.body;

      if (!fileName || !fileSize || !fileType) {
        return res.status(400).json({ error: 'fileName, fileSize, and fileType are required' });
      }

      const fileMetadata = await fileMetadataService.create({
        fileName,
        fileSize,
        fileType,
      });

      res.status(201).json(fileMetadata);
    } catch (error) {
      console.error('Error creating file metadata:', error);
      res.status(500).json({ error: 'Failed to create file metadata' });
    }
  },

  async findAll(req: Request, res: Response) {
    try {
      const files = await fileMetadataService.findAll();
      res.json(files);
    } catch (error) {
      console.error('Error fetching file metadata:', error);
      res.status(500).json({ error: 'Failed to fetch file metadata' });
    }
  },

  async findById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const fileMetadata = await fileMetadataService.findById(id);

      if (!fileMetadata) {
        return res.status(404).json({ error: 'File metadata not found' });
      }

      res.json(fileMetadata);
    } catch (error) {
      console.error('Error fetching file metadata:', error);
      res.status(500).json({ error: 'Failed to fetch file metadata' });
    }
  },

  async findByType(req: Request, res: Response) {
    try {
      const { fileType } = req.params;
      const files = await fileMetadataService.findByType(fileType);
      res.json(files);
    } catch (error) {
      console.error('Error fetching files by type:', error);
      res.status(500).json({ error: 'Failed to fetch files by type' });
    }
  },

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { fileName, fileSize, fileType } = req.body;

      const existingFile = await fileMetadataService.findById(id);
      if (!existingFile) {
        return res.status(404).json({ error: 'File metadata not found' });
      }

      const fileMetadata = await fileMetadataService.update(id, {
        fileName,
        fileSize,
        fileType,
      });

      res.json(fileMetadata);
    } catch (error) {
      console.error('Error updating file metadata:', error);
      res.status(500).json({ error: 'Failed to update file metadata' });
    }
  },

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const existingFile = await fileMetadataService.findById(id);
      if (!existingFile) {
        return res.status(404).json({ error: 'File metadata not found' });
      }

      await fileMetadataService.delete(id);
      res.status(204).send();
    } catch (error) {
      console.error('Error deleting file metadata:', error);
      res.status(500).json({ error: 'Failed to delete file metadata' });
    }
  },
};
