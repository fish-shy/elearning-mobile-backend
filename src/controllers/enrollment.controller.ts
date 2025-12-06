import { Request, Response } from 'express';
import { enrollmentService } from '../services/enrollment.service';

export const enrollmentController = {
  async create(req: Request, res: Response) {
    try {
      const { studentId, courseId } = req.body;

      if (!studentId || !courseId) {
        return res.status(400).json({ error: 'StudentId and courseId are required' });
      }

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

  async findAll(req: Request, res: Response) {
    try {
      const enrollments = await enrollmentService.findAll();
      res.json(enrollments);
    } catch (error) {
      console.error('Error fetching enrollments:', error);
      res.status(500).json({ error: 'Failed to fetch enrollments' });
    }
  },

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

  async markLessonComplete(req: Request, res: Response) {
    try {
      const { studentId, courseId, lessonId } = req.body;

      if (!studentId || !courseId || !lessonId) {
        return res.status(400).json({ error: 'StudentId, courseId, and lessonId are required' });
      }

      const enrollment = await enrollmentService.markLessonComplete(studentId, courseId, lessonId);
      res.json(enrollment);
    } catch (error: any) {
      console.error('Error marking lesson complete:', error);
      if (error.message === 'Enrollment not found') {
        return res.status(404).json({ error: 'Enrollment not found' });
      }
      res.status(500).json({ error: 'Failed to mark lesson complete' });
    }
  },

  async markLessonIncomplete(req: Request, res: Response) {
    try {
      const { studentId, courseId, lessonId } = req.body;

      if (!studentId || !courseId || !lessonId) {
        return res.status(400).json({ error: 'StudentId, courseId, and lessonId are required' });
      }

      const enrollment = await enrollmentService.markLessonIncomplete(studentId, courseId, lessonId);
      res.json(enrollment);
    } catch (error: any) {
      console.error('Error marking lesson incomplete:', error);
      if (error.message === 'Enrollment not found') {
        return res.status(404).json({ error: 'Enrollment not found' });
      }
      res.status(500).json({ error: 'Failed to mark lesson incomplete' });
    }
  },

  async getCompletedLessons(req: Request, res: Response) {
    try {
      const { studentId, courseId } = req.params;

      if (!studentId || !courseId) {
        return res.status(400).json({ error: 'StudentId and courseId are required' });
      }

      const completedLessonIds = await enrollmentService.getCompletedLessons(studentId, courseId);
      res.json({ completedLessonIds });
    } catch (error) {
      console.error('Error fetching completed lessons:', error);
      res.status(500).json({ error: 'Failed to fetch completed lessons' });
    }
  },
};
