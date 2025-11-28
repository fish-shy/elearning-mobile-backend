import { Request, Response } from 'express';
import { enrollmentService } from '../services/enrollment.service';

export const enrollmentController = {
  // Create a new enrollment (enroll student in course)
  async create(req: Request, res: Response) {
    try {
      const { studentId, courseId } = req.body;

      if (!studentId || !courseId) {
        return res.status(400).json({ error: 'StudentId and courseId are required' });
      }

      // Check if already enrolled
      const isEnrolled = await enrollmentService.isEnrolled(studentId, courseId);
      if (isEnrolled) {
        return res.status(409).json({ error: 'Student is already enrolled in this course' });
      }

      const enrollment = await enrollmentService.create({
        studentId,
        courseId,
      });

      res.status(201).json(enrollment);
    } catch (error) {
      console.error('Error creating enrollment:', error);
      res.status(500).json({ error: 'Failed to create enrollment' });
    }
  },

  // Get all enrollments
  async findAll(req: Request, res: Response) {
    try {
      const enrollments = await enrollmentService.findAll();
      res.json(enrollments);
    } catch (error) {
      console.error('Error fetching enrollments:', error);
      res.status(500).json({ error: 'Failed to fetch enrollments' });
    }
  },

  // Get enrollment by ID
  async findById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const enrollment = await enrollmentService.findById(id);

      if (!enrollment) {
        return res.status(404).json({ error: 'Enrollment not found' });
      }

      res.json(enrollment);
    } catch (error) {
      console.error('Error fetching enrollment:', error);
      res.status(500).json({ error: 'Failed to fetch enrollment' });
    }
  },

  // Get enrollments by student ID
  async findByStudentId(req: Request, res: Response) {
    try {
      const { studentId } = req.params;
      const enrollments = await enrollmentService.findByStudentId(studentId);
      res.json(enrollments);
    } catch (error) {
      console.error('Error fetching student enrollments:', error);
      res.status(500).json({ error: 'Failed to fetch student enrollments' });
    }
  },

  // Get enrollments by course ID
  async findByCourseId(req: Request, res: Response) {
    try {
      const { courseId } = req.params;
      const enrollments = await enrollmentService.findByCourseId(courseId);
      res.json(enrollments);
    } catch (error) {
      console.error('Error fetching course enrollments:', error);
      res.status(500).json({ error: 'Failed to fetch course enrollments' });
    }
  },

  // Delete enrollment (unenroll student from course)
  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const existingEnrollment = await enrollmentService.findById(id);
      if (!existingEnrollment) {
        return res.status(404).json({ error: 'Enrollment not found' });
      }

      await enrollmentService.delete(id);
      res.status(204).send();
    } catch (error) {
      console.error('Error deleting enrollment:', error);
      res.status(500).json({ error: 'Failed to delete enrollment' });
    }
  },

  // Unenroll by student and course ID
  async unenroll(req: Request, res: Response) {
    try {
      const { studentId, courseId } = req.body;

      if (!studentId || !courseId) {
        return res.status(400).json({ error: 'StudentId and courseId are required' });
      }

      const isEnrolled = await enrollmentService.isEnrolled(studentId, courseId);
      if (!isEnrolled) {
        return res.status(404).json({ error: 'Enrollment not found' });
      }

      await enrollmentService.deleteByStudentAndCourse(studentId, courseId);
      res.status(204).send();
    } catch (error) {
      console.error('Error unenrolling student:', error);
      res.status(500).json({ error: 'Failed to unenroll student' });
    }
  },
};
