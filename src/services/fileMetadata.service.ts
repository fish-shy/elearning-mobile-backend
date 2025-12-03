import prisma from '../config/prisma';

export const fileMetadataService = {
  async create(data: {
    fileName: string;
    fileSize: number;
    fileType: string;
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
    return prisma.fileMetadata.delete({ where: { id } });
  },
};
