import { Request, Response } from 'express';
import { assignmentService } from '../services/assignment.service';

export const assignmentController = {
  async create(req: Request, res: Response) {
    try {
      const { title, description, dueDate, maxPoints, lessonId } = req.body;

      if (!title || !lessonId) {
        return res.status(400).json({ error: 'Title and lessonId are required' });
      }

      const assignment = await assignmentService.create({
        title,
        description,
        dueDate: dueDate ? new Date(dueDate) : undefined,
        maxPoints,
        lessonId,
      });

      res.status(201).json(assignment);
    } catch (error) {
      console.error('Error creating assignment:', error);
      res.status(500).json({ error: 'Failed to create assignment' });
    }
  },

  async findAll(req: Request, res: Response) {
    try {
      const assignments = await assignmentService.findAll();
      res.json(assignments);
    } catch (error) {
      console.error('Error fetching assignments:', error);
      res.status(500).json({ error: 'Failed to fetch assignments' });
    }
  },

  async findById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const assignment = await assignmentService.findById(id);

      if (!assignment) {
        return res.status(404).json({ error: 'Assignment not found' });
      }

      res.json(assignment);
    } catch (error) {
      console.error('Error fetching assignment:', error);
      res.status(500).json({ error: 'Failed to fetch assignment' });
    }
  },

  async findByLessonId(req: Request, res: Response) {
    try {
      const { lessonId } = req.params;
      const assignments = await assignmentService.findByLessonId(lessonId);
      res.json(assignments);
    } catch (error) {
      console.error('Error fetching lesson assignments:', error);
      res.status(500).json({ error: 'Failed to fetch lesson assignments' });
    }
  },

  async findByCourseId(req: Request, res: Response) {
    try {
      const { courseId } = req.params;
      const assignments = await assignmentService.findByCourseId(courseId);
      res.json(assignments);
    } catch (error) {
      console.error('Error fetching course assignments:', error);
      res.status(500).json({ error: 'Failed to fetch course assignments' });
    }
  },

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { title, description, dueDate, maxPoints } = req.body;

      const existingAssignment = await assignmentService.findById(id);
      if (!existingAssignment) {
        return res.status(404).json({ error: 'Assignment not found' });
      }

      const assignment = await assignmentService.update(id, {
        title,
        description,
        dueDate: dueDate ? new Date(dueDate) : undefined,
        maxPoints,
      });

      res.json(assignment);
    } catch (error) {
      console.error('Error updating assignment:', error);
      res.status(500).json({ error: 'Failed to update assignment' });
    }
  },

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const existingAssignment = await assignmentService.findById(id);
      if (!existingAssignment) {
        return res.status(404).json({ error: 'Assignment not found' });
      }

      await assignmentService.delete(id);
      res.status(204).send();
    } catch (error) {
      console.error('Error deleting assignment:', error);
      res.status(500).json({ error: 'Failed to delete assignment' });
    }
  },
};
