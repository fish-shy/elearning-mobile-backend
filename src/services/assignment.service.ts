import prisma from '../config/prisma';

export const assignmentService = {
  // Create a new assignment
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

  // Get all assignments
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

  // Get assignment by ID
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

  // Get assignments by lesson ID
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

  // Get assignments by course ID
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

  // Update assignment
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

  // Delete assignment
  async delete(id: string) {
    return prisma.assignment.delete({ where: { id } });
  },
};
