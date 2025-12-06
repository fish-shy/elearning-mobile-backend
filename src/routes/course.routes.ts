import { Router } from 'express';
import { courseController } from '../controllers/course.controller';
import { authenticateToken, requireTeacher } from '../middleware';

const router = Router();

router.post('/', authenticateToken, requireTeacher, courseController.create);
router.get('/', courseController.findAll);
router.get('/student', authenticateToken, courseController.getStudentCourses);

router.get('/student/:userId', authenticateToken, courseController.getStudentCoursesByParams);
router.post('/', authenticateToken, courseController.create);
router.get('/:id', courseController.findById);
router.put('/:id', authenticateToken, requireTeacher, courseController.update);
router.delete('/:id', authenticateToken, requireTeacher, courseController.delete);
router.get('/teacher/:teacherId', authenticateToken, requireTeacher, courseController.findByTeacherIdByParams);
router.get('/teacher', authenticateToken, requireTeacher, courseController.findByTeacherId);


export default router;
