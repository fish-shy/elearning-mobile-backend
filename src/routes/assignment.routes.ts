import { Router } from 'express';
import { assignmentController } from '../controllers/assignment.controller';
import { authenticateToken, requireTeacher } from '../middleware';

const router = Router();

router.post('/', authenticateToken, requireTeacher, assignmentController.create);
router.get('/', assignmentController.findAll);
router.get('/:id', assignmentController.findById);
router.put('/:id', authenticateToken, requireTeacher, assignmentController.update);
router.delete('/:id', authenticateToken, requireTeacher, assignmentController.delete);
router.get('/lesson/:lessonId', assignmentController.findByLessonId);
router.get('/course/:courseId', assignmentController.findByCourseId);

export default router;
