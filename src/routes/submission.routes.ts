import { Router } from 'express';
import { submissionController } from '../controllers/submission.controller';
import { authenticateToken, requireTeacher } from '../middleware';

const router = Router();

router.post('/', authenticateToken, submissionController.create);
router.get('/', authenticateToken, submissionController.findAll);
router.get('/student', authenticateToken, submissionController.findByStudentId);
router.get('/assignment/:assignmentId', authenticateToken, submissionController.findByAssignmentId);
router.get('/assignment/:assignmentId/student', authenticateToken, submissionController.findByAssignmentAndStudent);
router.get('/assignment/:assignmentId/student/:userId', authenticateToken, submissionController.findByAssignmentAndStudentId);
router.post('/assignment/:assignmentId/student/:userId', authenticateToken, submissionController.findByAssignmentAndStudentId);
router.get('/:id', authenticateToken, submissionController.findById);
router.put('/:id', authenticateToken, submissionController.update);
router.delete('/:id', authenticateToken, submissionController.delete);
router.patch('/:id/grade', authenticateToken, requireTeacher, submissionController.grade);

export default router;
