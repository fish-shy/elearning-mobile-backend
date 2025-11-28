import { Router } from 'express';
import { userController } from '../controllers/user.controller';

const router = Router();

router.post('/', userController.create);
router.get('/', userController.findAll);
router.get('/:id', userController.findById);
router.put('/:id', userController.update);
router.delete('/:id', userController.delete);

router.get('/:id/taught-courses', userController.getTaughtCourses);
router.get('/:id/enrollments', userController.getEnrollments);

export default router;
