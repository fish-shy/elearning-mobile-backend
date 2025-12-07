import { Request, Response } from 'express';
import { submissionService } from '../services/submission.service';

export const submissionController = {
  async create(req: any, res: Response) {
    try {
      const { fileId, submissionText,assignmentId } = req.body;
      const userId = req.user?.id;
      
      if (!userId || !assignmentId) {
        console.log('UserId and assignmentId are required');
        return res.status(400).json({
          error: 'UserId and assignmentId are required',
        });
      }

      if (!fileId && !submissionText) {
        console.log('Either fileId or submissionText is required');
        return res.status(400).json({
          error: 'Either fileId or submissionText is required',
        });
      }

      const submission = await submissionService.create({
        fileId,
        submissionText,
        studentId: userId ,
        assignmentId,
      });

      res.status(201).json(submission);
    } catch (error) {
      console.error('Error creating submission:', error);
      res.status(500).json({ error: 'Failed to create submission' });
    }
  },
  
  async findAll(req: Request, res: Response) {
    try {
      const submissions = await submissionService.findAll();
      res.json(submissions);
    } catch (error) {
      console.error('Error fetching submissions:', error);
      res.status(500).json({ error: 'Failed to fetch submissions' });
    }
  },

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

  async findByStudentId(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const submissions = await submissionService.findByStudentId(id);
      res.json(submissions);
    } catch (error) {
      console.error('Error fetching student submissions:', error);
      res.status(500).json({ error: 'Failed to fetch student submissions' });
    }
  },

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

  async findByAssignmentAndStudent(req: any, res: Response) {
    try {
      const userId = req.user?.id;
      const { assignmentId } = req.params;
      const submissions = await submissionService.findByAssignmentIdAndStudentId(assignmentId, userId);
      res.json(submissions);
      console.log(submissions);
    } catch (error) {
      console.error('Error fetching assignment submissions:', error);
      res.status(500).json({ error: 'Failed to fetch assignment submissions' });
    }
  },

   async findByAssignmentAndStudentId(req: any, res: Response) {
    try {
      const { assignmentId, userId } = req.params;
      const submissions = await submissionService.findByAssignmentIdAndStudentId(assignmentId, userId);
      console.log(submissions);
      res.json(submissions);
    } catch (error) {
      console.error('Error fetching assignment submissions:', error);
      res.status(500).json({ error: 'Failed to fetch assignment submissions' });
    }
  },

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

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { fileId, submissionText, grade, feedback } = req.body;

      const existingSubmission = await submissionService.findById(id);
      if (!existingSubmission) {
        return res.status(404).json({ error: 'Submission not found' });
      }

      const submission = await submissionService.update(id, {
        fileId,
        submissionText,
        grade,
      feedback,
    });

      res.json(submission);
    } catch (error) {
      console.error('Error updating submission:', error);
      res.status(500).json({ error: 'Failed to update submission' });
    }
  },

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
