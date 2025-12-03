import { Router } from 'express';
import { fileMetadataController } from '../controllers/fileMetadata.controller';
import { authenticateToken } from '../middleware';

const router = Router();

router.post('/', authenticateToken, fileMetadataController.create);
router.get('/', authenticateToken, fileMetadataController.findAll);
router.get('/:id', authenticateToken, fileMetadataController.findById);
router.get('/type/:fileType', authenticateToken, fileMetadataController.findByType);
router.put('/:id', authenticateToken, fileMetadataController.update);
router.delete('/:id', authenticateToken, fileMetadataController.delete);

export default router;
