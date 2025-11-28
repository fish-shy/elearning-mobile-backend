import { Router } from 'express';
import { enrollmentController } from '../controllers/enrollment.controller';

const router = Router();

router.post('/', enrollmentController.create);
router.get('/', enrollmentController.findAll);
router.get('/:id', enrollmentController.findById);
router.delete('/:id', enrollmentController.delete);
router.get('/student/:studentId', enrollmentController.findByStudentId);
router.get('/course/:courseId', enrollmentController.findByCourseId);
router.post('/unenroll', enrollmentController.unenroll);

export default router;
