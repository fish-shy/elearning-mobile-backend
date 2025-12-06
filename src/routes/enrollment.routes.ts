import { Router } from 'express';
import { enrollmentController } from '../controllers/enrollment.controller';
import { authenticateToken, requireAdmin } from '../middleware';

const router = Router();

router.post('/', authenticateToken, enrollmentController.create);
router.get('/', authenticateToken, enrollmentController.findAll);
router.get('/:id', authenticateToken, enrollmentController.findById);
router.delete('/:id', authenticateToken, requireAdmin, enrollmentController.delete);
router.get('/student/:studentId', authenticateToken, enrollmentController.findByStudentId);
router.get('/course/:courseId', authenticateToken, enrollmentController.findByCourseId);
router.post('/unenroll', authenticateToken, enrollmentController.unenroll);
router.post('/complete-lesson', authenticateToken, enrollmentController.markLessonComplete);
router.post('/incomplete-lesson', authenticateToken, enrollmentController.markLessonIncomplete);
router.get('/completed-lessons/:studentId/:courseId', authenticateToken, enrollmentController.getCompletedLessons);

export default router;
