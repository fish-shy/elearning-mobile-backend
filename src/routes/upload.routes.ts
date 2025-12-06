import { Router } from 'express';
import { uploadController } from '../controllers/upload.controller';
import { upload } from '../utils/uploadConfig';
import { authenticateToken, requireTeacher } from '../middleware';

const router = Router();

router.post('/single', authenticateToken, upload.single('file'), uploadController.uploadSingle);
router.post('/multiple', authenticateToken, upload.array('files', 10), uploadController.uploadMultiple);
router.post('/profile-image', authenticateToken, upload.single('image'), uploadController.uploadProfileImage);
router.post('/course-image', authenticateToken, requireTeacher, upload.single('image'), uploadController.uploadCourseImage);
router.post('/lesson-content', authenticateToken, requireTeacher, upload.single('file'), uploadController.uploadLessonContent);
router.post('/submission', authenticateToken, upload.single('file'), uploadController.uploadSubmission);
router.delete('/:id', authenticateToken, uploadController.deleteFile);

export default router;
