import prisma from "../config/prisma";

export const lessonService = {
  async create(data: {
    title: string;
    content?: string;
    fileId?: string;
    courseId: string;
    assignment?: {
      dueDate?: Date;
      maxPoints?: number;
    };
  }) {
  const { assignment, ...lessonData } = data;
    return prisma.lesson.create({
      data: {
        ...lessonData,
        assignment: assignment ? { create: assignment } : undefined,
      },
      include: {
        course: {
          select: {
            id: true,
            title: true,
          },
        },
        file: true,
        assignment: true,
      },
    });
  },

  async searchToken(courseId: string) {
    return prisma.course.findUnique({
      where: { id: courseId },
      select: {
        teacher: {
          select: {  name: true, }
        },
        title: true,
        enrollments: {
          select: {
            student: {
              select: { fcmToken: true }, // Ambil token saja
            },
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
        file: true,
        assignment: true,
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
        file: true,
        assignment: {
          include: {
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
        },
      },
    });
  },

  async findByCourseId(courseId: string) {
    return prisma.lesson.findMany({
      where: { courseId },
      include: {
        file: true,
        assignment: true,
      },
      orderBy: {
        createdAt: "asc",
      },
    });
  },

  async update(
    id: string,
    data: {
      title?: string;
      content?: string;
      fileId?: string;
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
        file: true,
        assignment: true,
      },
    });
  },

  async delete(id: string) {
    await prisma.assignment.deleteMany({ where: { lessonId: id } });
    return prisma.lesson.delete({ where: { id } });
  },
};
