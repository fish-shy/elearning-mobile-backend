import prisma from '../config/prisma';

export const enrollmentService = {
  // Create a new enrollment (enroll student in course)
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

  // Get all enrollments
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

  // Get enrollment by ID
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

  // Get enrollments by student ID
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

  // Get enrollments by course ID
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

  // Check if student is enrolled in course
  async isEnrolled(studentId: string, courseId: string) {
    const enrollment = await prisma.enrollment.findUnique({
      where: {
        studentId_courseId: {
          studentId,
          courseId,
        },
      },
    });
    return !!enrollment;
  },

  // Delete enrollment (unenroll student from course)
  async delete(id: string) {
    return prisma.enrollment.delete({ where: { id } });
  },

  // Delete by student and course ID
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
