import { Router } from 'express';
import { courseController } from '../controllers/course.controller';
import { authenticateToken, requireTeacher, requireAdmin } from '../middleware';

const router = Router();

router.post('/', authenticateToken, requireAdmin, courseController.create);
router.get('/', authenticateToken, requireAdmin, courseController.findAll);
router.get('/student', authenticateToken, courseController.getStudentCourses);
router.get('/student/:userId', authenticateToken, requireAdmin, courseController.getStudentCoursesByParams);
router.get('/teacher', authenticateToken, requireTeacher, courseController.findByTeacherId);
router.get('/teacher/:teacherId', authenticateToken, requireAdmin, courseController.findByTeacherIdByParams);
router.get('/:id', authenticateToken, courseController.findById);
router.put('/:id', authenticateToken, requireTeacher, courseController.update);
router.delete('/:id', authenticateToken, requireAdmin, courseController.delete);

export default router;
