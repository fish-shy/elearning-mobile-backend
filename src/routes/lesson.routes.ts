import { Router } from 'express';
import { lessonController } from '../controllers/lesson.controller';

const router = Router();

router.post('/', lessonController.create);
router.get('/', lessonController.findAll);
router.get('/:id', lessonController.findById);
router.put('/:id', lessonController.update);
router.delete('/:id', lessonController.delete);
router.get('/course/:courseId', lessonController.findByCourseId);

export default router;
