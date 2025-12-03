import prisma from '../config/prisma';

export const assignmentService = {
  async create(data: {
    title: string;
    description?: string;
    dueDate?: Date;
    maxPoints?: number;
    lessonId: string;
  }) {
    return prisma.assignment.create({
      data,
      include: {
        lesson: {
          select: {
            id: true,
            title: true,
            courseId: true,
          },
        },
      },
    });
  },

  async findAll() {
    return prisma.assignment.findMany({
      include: {
        lesson: {
          select: {
            id: true,
            title: true,
            courseId: true,
          },
        },
        _count: {
          select: {
            submissions: true,
          },
        },
      },
    });
  },

  async findById(id: string) {
    return prisma.assignment.findUnique({
      where: { id },
      include: {
        lesson: {
          select: {
            id: true,
            title: true,
            course: {
              select: {
                id: true,
                title: true,
              },
            },
          },
        },
        submissions: {
          include: {
            student: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        },
      },
    });
  },

  async findByLessonId(lessonId: string) {
    return prisma.assignment.findMany({
      where: { lessonId },
      include: {
        _count: {
          select: {
            submissions: true,
          },
        },
      },
      orderBy: {
        dueDate: 'asc',
      },
    });
  },

  async findByCourseId(courseId: string) {
    return prisma.assignment.findMany({
      where: {
        lesson: {
          courseId,
        },
      },
      include: {
        lesson: {
          select: {
            id: true,
            title: true,
          },
        },
        _count: {
          select: {
            submissions: true,
          },
        },
      },
      orderBy: {
        dueDate: 'asc',
      },
    });
  },

  async update(
    id: string,
    data: {
      title?: string;
      description?: string;
      dueDate?: Date;
      maxPoints?: number;
    }
  ) {
    return prisma.assignment.update({
      where: { id },
      data,
      include: {
        lesson: {
          select: {
            id: true,
            title: true,
          },
        },
      },
    });
  },
  async delete(id: string) {
    return prisma.assignment.delete({ where: { id } });
  },
};
