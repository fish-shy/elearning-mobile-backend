import prisma from "../config/prisma";

export const courseService = {
  async create(data: {
    title: string;
    description?: string;
    imagePath?: string;
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

  async findAllByStudentId(studentId: string) {
    return prisma.course.findMany({
      where: {
        enrollments: {
          some: { studentId },
        },
      },
      include: {
        enrollments: {
          where: { studentId },
          select: {
            completedLessonIds: true,
          },
        },
        lessons: {
          select: {
            id: true,
          },
        },
      },
    });
  },

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

  async update(
    id: string,
    data: {
      title?: string;
      description?: string;
      imagePath?: string;
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

  async delete(id: string) {
    return prisma.course.delete({ where: { id } });
  },
};
