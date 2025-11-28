import prisma from '../config/prisma';
import { Role } from '../generated/client';

export const userService = {
  // Create a new user
  async create(data: {
    email: string;
    password: string;
    name?: string;
    role?: Role;
    profileImageURL?: string;
  }) {
    return prisma.user.create({ data });
  },

  // Get all users
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

  // Get user by ID
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

  // Get user by email (including password for auth)
  async findByEmail(email: string) {
    return prisma.user.findUnique({
      where: { email },
    });
  },

  // Update user
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

  // Delete user
  async delete(id: string) {
    return prisma.user.delete({ where: { id } });
  },

  // Get user with their courses (for teachers)
  async findWithTaughtCourses(id: string) {
    return prisma.user.findUnique({
      where: { id },
      include: {
        taughtCourses: true,
      },
    });
  },

  // Get user with their enrollments (for students)
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
