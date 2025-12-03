import { Router } from 'express';
import { courseController } from '../controllers/course.controller';
import { authenticateToken, requireTeacher } from '../middleware';

const router = Router();

router.post('/', authenticateToken, requireTeacher, courseController.create);
router.get('/', courseController.findAll);
router.get('/:id', courseController.findById);
router.put('/:id', authenticateToken, requireTeacher, courseController.update);
router.delete('/:id', authenticateToken, requireTeacher, courseController.delete);
router.get('/teacher/:teacherId', courseController.findByTeacherId);

export default router;
