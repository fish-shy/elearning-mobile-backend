import prisma from '../config/prisma';

export const enrollmentService = {
  async create(data: { studentId: string; courseId: string }) {
    return prisma.enrollment.create({
      data,
      include: {
        student: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
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
    return prisma.enrollment.findMany({
      include: {
        student: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        course: {
          select: {
            id: true,
            title: true,
          },
        },
      },
    });
  },

  async findById(id: string) {
    return prisma.enrollment.findUnique({
      where: { id },
      include: {
        student: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        course: true,
      },
    });
  },

  async findByStudentId(studentId: string) {
    return prisma.enrollment.findMany({
      where: { studentId },
      include: {
        course: {
          include: {
            teacher: {
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

  async findByCourseId(courseId: string) {
    return prisma.enrollment.findMany({
      where: { courseId },
      include: {
        student: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
  },

  async isEnrolled(studentId: string, courseId: string) {
    const enrollment = await prisma.enrollment.findUnique({
      where: {
        studentId_courseId: {
          studentId,
          courseId,
        },
      },
    });
    if(enrollment) {
      return true;
    }
    return false;
  },

  async delete(id: string) {
    return prisma.enrollment.delete({ where: { id } });
  },

  async deleteByStudentAndCourse(studentId: string, courseId: string) {
    return prisma.enrollment.delete({
      where: {
        studentId_courseId: {
          studentId,
          courseId,
        },
      },
    });
  },
};
