import prisma from '../config/prisma';

export const submissionService = {
  async create(data: {
    fileId?: string;
    submissionText?: string;
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
          include: {
            lesson: {
              select: {
                id: true,
                title: true,
              },
            },
          },
        },
        file: true,
      },
    });
  },

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
          include: {
            lesson: {
              select: {
                id: true,
                title: true,
              },
            },
          },
        },
        file: true,
      },
    });
  },

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
        file: true,
      },
    });
  },

  async findByStudentId(studentId: string) {
    return prisma.submission.findMany({
      where: { studentId },
      include: {
        assignment: {
          include: {
            lesson: {
              select: {
                id: true,
                title: true,
              },
            },
          },
        },
        file: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  },

  async findByAssignmentIdAndStudentId(assignmentId: string, studentId: string) {
    return prisma.submission.findFirst({
      where: { assignmentId, studentId },
      include: {
        student: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        file: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  },
  

  async findByAssignmentId(assignmentId: string) {
    return prisma.submission.findMany({
      where: { assignmentId },
      include: {
        student: {
          select: {
            id: true,
            name: true,
            email: true,
            profileImage: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  },

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
          include: {
            lesson: {
              select: {
                id: true,
                title: true,
              },
            },
          },
        },
        file: true,
      },
    });
  },

  async update(
    id: string,
    data: {
      fileId?: string;
      submissionText?: string;
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
          include: {
            lesson: {
              select: {
                id: true,
                title: true,
              },
            },
          },
        },
        file: true,
      },
    });
  },

  async delete(id: string) {
    return prisma.submission.delete({ where: { id } });
  },
};
