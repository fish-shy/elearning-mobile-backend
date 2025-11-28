import prisma from '../config/prisma';

export const courseService = {
  // Create a new course
  async create(data: {
    title: string;
    description?: string;
    teacherId: string;
  }) {
    return prisma.course.create({
      data,
      include: {
        teacher: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
  },

  // Get all courses
  async findAll() {
    return prisma.course.findMany({
      include: {
        teacher: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        _count: {
          select: {
            lessons: true,
            enrollments: true,
          },
        },
      },
    });
  },

  // Get course by ID
  async findById(id: string) {
    return prisma.course.findUnique({
      where: { id },
      include: {
        teacher: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        lessons: true,
        enrollments: {
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

  // Get courses by teacher ID
  async findByTeacherId(teacherId: string) {
    return prisma.course.findMany({
      where: { teacherId },
      include: {
        _count: {
          select: {
            lessons: true,
            enrollments: true,
          },
        },
      },
    });
  },

  // Update course
  async update(
    id: string,
    data: {
      title?: string;
      description?: string;
    }
  ) {
    return prisma.course.update({
      where: { id },
      data,
      include: {
        teacher: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
  },

  // Delete course
  async delete(id: string) {
    return prisma.course.delete({ where: { id } });
  },
};
