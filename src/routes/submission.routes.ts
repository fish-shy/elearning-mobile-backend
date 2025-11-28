import { Router } from 'express';
import { submissionController } from '../controllers/submission.controller';

const router = Router();

router.post('/', submissionController.create);
router.get('/', submissionController.findAll);
router.get('/:id', submissionController.findById);
router.put('/:id', submissionController.update);
router.delete('/:id', submissionController.delete);
router.get('/student/:studentId', submissionController.findByStudentId);
router.get('/assignment/:assignmentId', submissionController.findByAssignmentId);
router.patch('/:id/grade', submissionController.grade);

export default router;
