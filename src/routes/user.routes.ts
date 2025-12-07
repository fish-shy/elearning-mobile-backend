import { Router } from 'express';
import { userController } from '../controllers/user.controller';
import { authenticateToken, requireAdmin } from '../middleware';

const router = Router();

router.post('/', authenticateToken, requireAdmin, userController.create);
router.get('/', authenticateToken, requireAdmin, userController.findAll);
router.put('/profile', authenticateToken, userController.updateProfile);
router.get('/teachers', authenticateToken, requireAdmin, userController.findAllTeacher);
router.get('/:id', authenticateToken, userController.findById);
router.put('/:id', authenticateToken, userController.update);
router.delete('/:id', authenticateToken, requireAdmin, userController.delete);
router.get('/:id/taught-courses', authenticateToken, userController.getTaughtCourses);
router.get('/:id/enrollments', authenticateToken, userController.getEnrollments);

export default router;
