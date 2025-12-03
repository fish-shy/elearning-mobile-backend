import { Role } from '../../generated/prisma/enums';
import prisma from '../config/prisma';

export const userService = {
  async create(data: {
    email: string;
    password: string;
    name?: string;
    role?: Role;
    profileImageURL?: string;
  }) {
    return prisma.user.create({ data });
  },

  async findAll() {
    return prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        profileImageURL: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  },

  async findById(id: string) {
    return prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        profileImageURL: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  },

  async findByEmail(email: string) {
    return prisma.user.findUnique({
      where: { email },
    });
  },

  async update(
    id: string,
    data: {
      email?: string;
      password?: string;
      name?: string;
      role?: Role;
      profileImageURL?: string;
    }
  ) {
    return prisma.user.update({
      where: { id },
      data,
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        profileImageURL: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  },

  async delete(id: string) {
    return prisma.user.delete({ where: { id } });
  },

  async findWithTaughtCourses(id: string) {
    return prisma.user.findUnique({
      where: { id },
      include: {
        taughtCourses: true,
      },
    });
  },

  async findWithEnrollments(id: string) {
    return prisma.user.findUnique({
      where: { id },
      include: {
        enrollments: {
          include: {
            course: true,
          },
        },
      },
    });
  },
};
