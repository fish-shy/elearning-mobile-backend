import { Request, Response } from 'express';
import { submissionService } from '../services/submission.service';

export const submissionController = {
  // Create a new submission
  async create(req: Request, res: Response) {
    try {
      const { submissionFileURL, studentId, assignmentId } = req.body;

      if (!submissionFileURL || !studentId || !assignmentId) {
        return res.status(400).json({
          error: 'SubmissionFileURL, studentId, and assignmentId are required',
        });
      }

      const submission = await submissionService.create({
        submissionFileURL,
        studentId,
        assignmentId,
      });

      res.status(201).json(submission);
    } catch (error) {
      console.error('Error creating submission:', error);
      res.status(500).json({ error: 'Failed to create submission' });
    }
  },

  // Get all submissions
  async findAll(req: Request, res: Response) {
    try {
      const submissions = await submissionService.findAll();
      res.json(submissions);
    } catch (error) {
      console.error('Error fetching submissions:', error);
      res.status(500).json({ error: 'Failed to fetch submissions' });
    }
  },

  // Get submission by ID
  async findById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const submission = await submissionService.findById(id);

      if (!submission) {
        return res.status(404).json({ error: 'Submission not found' });
      }

      res.json(submission);
    } catch (error) {
      console.error('Error fetching submission:', error);
      res.status(500).json({ error: 'Failed to fetch submission' });
    }
  },

  // Get submissions by student ID
  async findByStudentId(req: Request, res: Response) {
    try {
      const { studentId } = req.params;
      const submissions = await submissionService.findByStudentId(studentId);
      res.json(submissions);
    } catch (error) {
      console.error('Error fetching student submissions:', error);
      res.status(500).json({ error: 'Failed to fetch student submissions' });
    }
  },

  // Get submissions by assignment ID
  async findByAssignmentId(req: Request, res: Response) {
    try {
      const { assignmentId } = req.params;
      const submissions = await submissionService.findByAssignmentId(assignmentId);
      res.json(submissions);
    } catch (error) {
      console.error('Error fetching assignment submissions:', error);
      res.status(500).json({ error: 'Failed to fetch assignment submissions' });
    }
  },

  // Grade a submission
  async grade(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { grade, feedback } = req.body;

      if (grade === undefined) {
        return res.status(400).json({ error: 'Grade is required' });
      }

      const existingSubmission = await submissionService.findById(id);
      if (!existingSubmission) {
        return res.status(404).json({ error: 'Submission not found' });
      }

      const submission = await submissionService.grade(id, {
        grade,
        feedback,
      });

      res.json(submission);
    } catch (error) {
      console.error('Error grading submission:', error);
      res.status(500).json({ error: 'Failed to grade submission' });
    }
  },

  // Update submission
  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { submissionFileURL, grade, feedback } = req.body;

      const existingSubmission = await submissionService.findById(id);
      if (!existingSubmission) {
        return res.status(404).json({ error: 'Submission not found' });
      }

      const submission = await submissionService.update(id, {
        submissionFileURL,
        grade,
        feedback,
      });

      res.json(submission);
    } catch (error) {
      console.error('Error updating submission:', error);
      res.status(500).json({ error: 'Failed to update submission' });
    }
  },

  // Delete submission
  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const existingSubmission = await submissionService.findById(id);
      if (!existingSubmission) {
        return res.status(404).json({ error: 'Submission not found' });
      }

      await submissionService.delete(id);
      res.status(204).send();
    } catch (error) {
      console.error('Error deleting submission:', error);
      res.status(500).json({ error: 'Failed to delete submission' });
    }
  },
};
