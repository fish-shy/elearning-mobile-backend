import { Request, Response } from 'express';
import { courseService } from '../services/course.service';

export const courseController = {
  async create(req: Request, res: Response) {
    try {
      const { title, description, teacherId } = req.body;

      if (!title || !teacherId) {
        return res.status(400).json({ error: 'Title and teacherId are required' });
      }

      const course = await courseService.create({
        title,
        description,
        teacherId,
      });

      res.status(201).json(course);
    } catch (error) {
      console.error('Error creating course:', error);
      res.status(500).json({ error: 'Failed to create course' });
    }
  },

  async findAll(req: Request, res: Response) {
    try {
      const courses = await courseService.findAll();
      res.json(courses);
    } catch (error) {
      console.error('Error fetching courses:', error);
      res.status(500).json({ error: 'Failed to fetch courses' });
    }
  },

  async findById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const course = await courseService.findById(id);

      if (!course) {
        return res.status(404).json({ error: 'Course not found' });
      }

      res.json(course);
    } catch (error) {
      console.error('Error fetching course:', error);
      res.status(500).json({ error: 'Failed to fetch course' });
    }
  },

  async findByTeacherId(req: Request, res: Response) {
    try {
      const { teacherId } = req.params;
      const courses = await courseService.findByTeacherId(teacherId);
      res.json(courses);
    } catch (error) {
      console.error('Error fetching teacher courses:', error);
      res.status(500).json({ error: 'Failed to fetch teacher courses' });
    }
  },

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { title, description } = req.body;

      const existingCourse = await courseService.findById(id);
      if (!existingCourse) {
        return res.status(404).json({ error: 'Course not found' });
      }

      const course = await courseService.update(id, {
        title,
        description,
      });

      res.json(course);
    } catch (error) {
      console.error('Error updating course:', error);
      res.status(500).json({ error: 'Failed to update course' });
    }
  },

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const existingCourse = await courseService.findById(id);
      if (!existingCourse) {
        return res.status(404).json({ error: 'Course not found' });
      }

      await courseService.delete(id);
      res.status(204).send();
    } catch (error) {
      console.error('Error deleting course:', error);
      res.status(500).json({ error: 'Failed to delete course' });
    }
  },
};
