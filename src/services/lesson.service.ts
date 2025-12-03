import prisma from '../config/prisma';

export const lessonService = {
  async create(data: {
    title: string;
    content: string;
    type: string;
    materialFileURL?: string;
    courseId: string;
  }) {
    return prisma.lesson.create({
      data,
      include: {
        course: {
          select: {
            id: true,
            title: true,
          },
        },
      },
    });
  },

  async findAll() {
    return prisma.lesson.findMany({
      include: {
        course: {
          select: {
            id: true,
            title: true,
          },
        },
        _count: {
          select: {
            assignments: true,
          },
        },
      },
    });
  },

  async findById(id: string) {
    return prisma.lesson.findUnique({
      where: { id },
      include: {
        course: {
          select: {
            id: true,
            title: true,
          },
        },
        assignments: true,
      },
    });
  },

  async findByCourseId(courseId: string) {
    return prisma.lesson.findMany({
      where: { courseId },
      include: {
        _count: {
          select: {
            assignments: true,
          },
        },
      },
      orderBy: {
        createdAt: 'asc',
      },
    });
  },

  async update(
    id: string,
    data: {
      title?: string;
      content?: string;
      type?: string;
      materialFileURL?: string;
    }
  ) {
    return prisma.lesson.update({
      where: { id },
      data,
      include: {
        course: {
          select: {
            id: true,
            title: true,
          },
        },
      },
    });
  },

  async delete(id: string) {
    return prisma.lesson.delete({ where: { id } });
  },
};
