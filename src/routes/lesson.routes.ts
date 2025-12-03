import { Router } from 'express';
import { lessonController } from '../controllers/lesson.controller';
import { authenticateToken, requireTeacher } from '../middleware';

const router = Router();

router.post('/', authenticateToken, requireTeacher, lessonController.create);
router.get('/', lessonController.findAll);
router.get('/:id', lessonController.findById);
router.put('/:id', authenticateToken, requireTeacher, lessonController.update);
router.delete('/:id', authenticateToken, requireTeacher, lessonController.delete);
router.get('/course/:courseId', lessonController.findByCourseId);

export default router;
