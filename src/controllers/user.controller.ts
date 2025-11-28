import { Request, Response } from 'express';
import { userService } from '../services/user.service';

export const userController = {
  // Create a new user
  async create(req: Request, res: Response) {
    try {
      const { email, password, name, role, profileImageURL } = req.body;

      if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
      }

      const existingUser = await userService.findByEmail(email);
      if (existingUser) {
        return res.status(409).json({ error: 'User with this email already exists' });
      }

      const user = await userService.create({
        email,
        password,
        name,
        role,
        profileImageURL,
      });

      res.status(201).json(user);
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).json({ error: 'Failed to create user' });
    }
  },

  // Get all users
  async findAll(req: Request, res: Response) {
    try {
      const users = await userService.findAll();
      res.json(users);
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ error: 'Failed to fetch users' });
    }
  },

  // Get user by ID
  async findById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const user = await userService.findById(id);

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      res.json(user);
    } catch (error) {
      console.error('Error fetching user:', error);
      res.status(500).json({ error: 'Failed to fetch user' });
    }
  },

  // Update user
  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { email, password, name, role, profileImageURL } = req.body;

      const existingUser = await userService.findById(id);
      if (!existingUser) {
        return res.status(404).json({ error: 'User not found' });
      }

      const user = await userService.update(id, {
        email,
        password,
        name,
        role,
        profileImageURL,
      });

      res.json(user);
    } catch (error) {
      console.error('Error updating user:', error);
      res.status(500).json({ error: 'Failed to update user' });
    }
  },

  // Delete user
  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const existingUser = await userService.findById(id);
      if (!existingUser) {
        return res.status(404).json({ error: 'User not found' });
      }

      await userService.delete(id);
      res.status(204).send();
    } catch (error) {
      console.error('Error deleting user:', error);
      res.status(500).json({ error: 'Failed to delete user' });
    }
  },

  // Get user with taught courses (for teachers)
  async getTaughtCourses(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const user = await userService.findWithTaughtCourses(id);

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      res.json(user);
    } catch (error) {
      console.error('Error fetching user courses:', error);
      res.status(500).json({ error: 'Failed to fetch user courses' });
    }
  },

  // Get user with enrollments (for students)
  async getEnrollments(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const user = await userService.findWithEnrollments(id);

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      res.json(user);
    } catch (error) {
      console.error('Error fetching user enrollments:', error);
      res.status(500).json({ error: 'Failed to fetch user enrollments' });
    }
  },
};
