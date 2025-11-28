import prisma from '../config/prisma';

export const submissionService = {
  // Create a new submission
  async create(data: {
    submissionFileURL: string;
    studentId: string;
    assignmentId: string;
  }) {
    return prisma.submission.create({
      data,
      include: {
        student: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        assignment: {
          select: {
            id: true,
            title: true,
            maxPoints: true,
          },
        },
      },
    });
  },

  // Get all submissions
  async findAll() {
    return prisma.submission.findMany({
      include: {
        student: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        assignment: {
          select: {
            id: true,
            title: true,
            maxPoints: true,
          },
        },
      },
    });
  },

  // Get submission by ID
  async findById(id: string) {
    return prisma.submission.findUnique({
      where: { id },
      include: {
        student: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        assignment: {
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
          },
        },
      },
    });
  },

  // Get submissions by student ID
  async findByStudentId(studentId: string) {
    return prisma.submission.findMany({
      where: { studentId },
      include: {
        assignment: {
          select: {
            id: true,
            title: true,
            maxPoints: true,
            dueDate: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  },

  // Get submissions by assignment ID
  async findByAssignmentId(assignmentId: string) {
    return prisma.submission.findMany({
      where: { assignmentId },
      include: {
        student: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  },

  // Grade a submission
  async grade(
    id: string,
    data: {
      grade: number;
      feedback?: string;
    }
  ) {
    return prisma.submission.update({
      where: { id },
      data,
      include: {
        student: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        assignment: {
          select: {
            id: true,
            title: true,
            maxPoints: true,
          },
        },
      },
    });
  },

  // Update submission
  async update(
    id: string,
    data: {
      submissionFileURL?: string;
      grade?: number;
      feedback?: string;
    }
  ) {
    return prisma.submission.update({
      where: { id },
      data,
      include: {
        student: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        assignment: {
          select: {
            id: true,
            title: true,
            maxPoints: true,
          },
        },
      },
    });
  },

  // Delete submission
  async delete(id: string) {
    return prisma.submission.delete({ where: { id } });
  },
};
