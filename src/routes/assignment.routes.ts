import { Router } from 'express';
import { assignmentController } from '../controllers/assignment.controller';

const router = Router();

router.post('/', assignmentController.create);
router.get('/', assignmentController.findAll);
router.get('/:id', assignmentController.findById);
router.put('/:id', assignmentController.update);
router.delete('/:id', assignmentController.delete);
router.get('/lesson/:lessonId', assignmentController.findByLessonId);
router.get('/course/:courseId', assignmentController.findByCourseId);

export default router;
