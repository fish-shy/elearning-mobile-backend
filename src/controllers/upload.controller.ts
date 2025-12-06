import { Request, Response } from 'express';
import { uploadToGCS, deleteFromGCS } from '../utils/uploadConfig';
import { fileMetadataService } from '../services/fileMetadata.service';

export const uploadController = {
  async uploadSingle(req: Request, res: Response) {
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'No file provided' });
      }
      const folder = req.body.folder || 'uploads';
      console.log('Uploading to folder:', folder);
      const publicUrl = await uploadToGCS(req.file, folder);
      const fileMetadata = await fileMetadataService.create({
        fileName: req.file.originalname,
        fileSize: req.file.size,
        fileType: req.file.mimetype,
        fileUrl: publicUrl,
      });
      res.status(201).json({
        message: 'File uploaded successfully',
        url: publicUrl,
        id: fileMetadata.id,
        metadata: fileMetadata,
      });
    } catch (error) {
      console.error('Error uploading file:', error);
      res.status(500).json({ error: 'Failed to upload file' });
    }
  },

  async uploadMultiple(req: Request, res: Response) {
    try {
      const files = req.files as Express.Multer.File[];

      if (!files || files.length === 0) {
        return res.status(400).json({ error: 'No files provided' });
      }

      const folder = req.body.folder || 'uploads';
      const uploadResults = await Promise.all(
        files.map(async (file) => {
          const publicUrl = await uploadToGCS(file, folder);
          const metadata = await fileMetadataService.create({
            fileName: file.originalname,
            fileSize: file.size,
            fileType: file.mimetype,
            fileUrl: publicUrl,
          });
          return { url: publicUrl, metadata };
        })
      );

      res.status(201).json({
        message: 'Files uploaded successfully',
        files: uploadResults,
      });
    } catch (error) {
      console.error('Error uploading files:', error);
      res.status(500).json({ error: 'Failed to upload files' });
    }
  },

  async uploadProfileImage(req: Request, res: Response) {
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'No image provided' });
      }

      const publicUrl = await uploadToGCS(req.file, 'profile-images');

      res.status(201).json({
        message: 'Profile image uploaded successfully',
        url: publicUrl,
      });
    } catch (error) {
      console.error('Error uploading profile image:', error);
      res.status(500).json({ error: 'Failed to upload profile image' });
    }
  },

  async uploadCourseImage(req: Request, res: Response) {
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'No image provided' });
      }

      const publicUrl = await uploadToGCS(req.file, 'course-images');

      res.status(201).json({
        message: 'Course image uploaded successfully',
        url: publicUrl,
      });
    } catch (error) {
      console.error('Error uploading course image:', error);
      res.status(500).json({ error: 'Failed to upload course image' });
    }
  },

  async uploadLessonContent(req: Request, res: Response) {
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'No file provided' });
      }

      const publicUrl = await uploadToGCS(req.file, 'lesson-content');

      const fileMetadata = await fileMetadataService.create({
        fileName: req.file.originalname,
        fileSize: req.file.size,
        fileType: req.file.mimetype,
        fileUrl: publicUrl,
      });

      res.status(201).json({
        message: 'Lesson content uploaded successfully',
        url: publicUrl,
        metadata: fileMetadata,
      });
    } catch (error) {
      console.error('Error uploading lesson content:', error);
      res.status(500).json({ error: 'Failed to upload lesson content' });
    }
  },

  async uploadSubmission(req: Request, res: Response) {
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'No file provided' });
      }

      const publicUrl = await uploadToGCS(req.file, 'submissions');

      const fileMetadata = await fileMetadataService.create({
        fileName: req.file.originalname,
        fileSize: req.file.size,
        fileType: req.file.mimetype,
        fileUrl: publicUrl,
      });

      res.status(201).json({
        message: 'Submission uploaded successfully',
        url: publicUrl,
        metadata: fileMetadata,
      });
    } catch (error) {
      console.error('Error uploading submission:', error);
      res.status(500).json({ error: 'Failed to upload submission' });
    }
  },

  async deleteFile(req: Request, res: Response) {
    try {
      const { id } = req.params;
      
      if (!id) {
        return res.status(400).json({ error: 'File ID is required' });
      }

      const file = await fileMetadataService.findById(id);
      if (!file) {
        return res.status(404).json({ error: 'File not found' });
      }

      await fileMetadataService.delete(id);
      res.status(200).json({ message: 'File deleted successfully' });
    } catch (error) {
      console.error('Error deleting file:', error);
      res.status(500).json({ error: 'Failed to delete file' });
    }
  },


};
