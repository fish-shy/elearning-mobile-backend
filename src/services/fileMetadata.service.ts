import prisma from '../config/prisma';
import { deleteFromGCS } from '../utils/uploadConfig';

export const fileMetadataService = {
  async create(data: {
    fileName: string;
    fileSize: number;
    fileType: string;
    fileUrl: string;
  }) {
    return prisma.fileMetadata.create({ data });
  },

  async findAll() {
    return prisma.fileMetadata.findMany({
      orderBy: {
        uploadedAt: 'desc',
      },
    });
  },

  async findById(id: string) {
    return prisma.fileMetadata.findUnique({
      where: { id },
    });
  },

  async findByType(fileType: string) {
    return prisma.fileMetadata.findMany({
      where: { fileType },
      orderBy: {
        uploadedAt: 'desc',
      },
    });
  },

  async update(
    id: string,
    data: {
      fileName?: string;
      fileSize?: number;
      fileType?: string;
    }
  ) {
    return prisma.fileMetadata.update({
      where: { id },
      data,
    });
  },

  async delete(id: string) {
    const file = await prisma.fileMetadata.findUnique({ where: { id } });
    if (!file) {
      throw new Error('File not found');
    }

    // Remove references from related tables first
    await prisma.user.updateMany({
      where: { profileImageId: id },
      data: { profileImageId: null },
    });

    await prisma.lesson.updateMany({
      where: { fileId: id },
      data: { fileId: null },
    });

    await prisma.submission.updateMany({
      where: { fileId: id },
      data: { fileId: null },
    });

    // Delete from GCS
    try {
      await deleteFromGCS(file.fileUrl);
    } catch (error) {
      console.error('Error deleting from GCS (continuing with DB delete):', error);
    }

    // Delete from database
    return prisma.fileMetadata.delete({ where: { id } });
  },
};
