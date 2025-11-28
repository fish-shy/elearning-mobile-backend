import prisma from '../config/prisma';

export const lessonService = {
  // Create a new lesson
  async create(data: {
    title: string;
    content: string;
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

  // Get all lessons
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

  // Get lesson by ID
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

  // Get lessons by course ID
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

  // Update lesson
  async update(
    id: string,
    data: {
      title?: string;
      content?: string;
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

  // Delete lesson
  async delete(id: string) {
    return prisma.lesson.delete({ where: { id } });
  },
};
