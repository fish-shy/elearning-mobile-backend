import { Router } from 'express';
import userRoutes from './user.routes';
import courseRoutes from './course.routes';
import enrollmentRoutes from './enrollment.routes';
import lessonRoutes from './lesson.routes';
import assignmentRoutes from './assignment.routes';
import submissionRoutes from './submission.routes';
import fileMetadataRoutes from './fileMetadata.routes';
import authRoutes from './auth.routes';
import uploadRoutes from './upload.routes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/courses', courseRoutes);
router.use('/enrollments', enrollmentRoutes);
router.use('/lessons', lessonRoutes);
router.use('/assignments', assignmentRoutes);
router.use('/submissions', submissionRoutes);
router.use('/files', fileMetadataRoutes);
router.use('/upload', uploadRoutes);

export default router;
