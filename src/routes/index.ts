import { Router } from 'express';
import userRoutes from './user.routes';
import courseRoutes from './course.routes';
import enrollmentRoutes from './enrollment.routes';
import lessonRoutes from './lesson.routes';
import assignmentRoutes from './assignment.routes';
import submissionRoutes from './submission.routes';

const router = Router();

router.use('/users', userRoutes);
router.use('/courses', courseRoutes);
router.use('/enrollments', enrollmentRoutes);
router.use('/lessons', lessonRoutes);
router.use('/assignments', assignmentRoutes);
router.use('/submissions', submissionRoutes);

export default router;
