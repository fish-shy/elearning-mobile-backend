import { Request, Response } from 'express';
import { lessonService } from '../services/lesson.service';

export const lessonController = {
  async create(req: Request, res: Response) {
    try {
      const { title, content, type, materialFileURL, courseId } = req.body;

      if (!title || !content || !type || !courseId) {
        return res.status(400).json({ error: 'Title, content, type, and courseId are required' });
      }

      const lesson = await lessonService.create({
        title,
        content,
        type,
        materialFileURL,
        courseId,
      });

      res.status(201).json(lesson);
    } catch (error) {
      console.error('Error creating lesson:', error);
      res.status(500).json({ error: 'Failed to create lesson' });
    }
  },

  async findAll(req: Request, res: Response) {
    try {
      const lessons = await lessonService.findAll();
      res.json(lessons);
    } catch (error) {
      console.error('Error fetching lessons:', error);
      res.status(500).json({ error: 'Failed to fetch lessons' });
    }
  },

  async findById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const lesson = await lessonService.findById(id);

      if (!lesson) {
        return res.status(404).json({ error: 'Lesson not found' });
      }

      res.json(lesson);
    } catch (error) {
      console.error('Error fetching lesson:', error);
      res.status(500).json({ error: 'Failed to fetch lesson' });
    }
  },

  async findByCourseId(req: Request, res: Response) {
    try {
      const { courseId } = req.params;
      const lessons = await lessonService.findByCourseId(courseId);
      res.json(lessons);
    } catch (error) {
      console.error('Error fetching course lessons:', error);
      res.status(500).json({ error: 'Failed to fetch course lessons' });
    }
  },

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { title, content, type, materialFileURL } = req.body;

      const existingLesson = await lessonService.findById(id);
      if (!existingLesson) {
        return res.status(404).json({ error: 'Lesson not found' });
      }

      const lesson = await lessonService.update(id, {
        title,
        content,
        type,
        materialFileURL,
      });

      res.json(lesson);
    } catch (error) {
      console.error('Error updating lesson:', error);
      res.status(500).json({ error: 'Failed to update lesson' });
    }
  },

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const existingLesson = await lessonService.findById(id);
      if (!existingLesson) {
        return res.status(404).json({ error: 'Lesson not found' });
      }

      await lessonService.delete(id);
      res.status(204).send();
    } catch (error) {
      console.error('Error deleting lesson:', error);
      res.status(500).json({ error: 'Failed to delete lesson' });
    }
  },
};
