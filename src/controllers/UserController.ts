import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { User } from '../entities/User';
import * as bcrypt from 'bcrypt';
import { validate } from '../middlewares/validation';
import { createUserSchema } from '../validations/userSchemas';

export class UserController {
  private userRepository = getRepository(User);

  async createUser(req: Request, res: Response) {
    try {
      // Validate input
      const { error } = createUserSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }

      // Check for existing user
      const existingUser = await this.userRepository.findOne({ 
        where: [
          { email: req.body.email },
          { username: req.body.username }
        ]
      });
      if (existingUser) {
        return res.status(409).json({ error: 'User already exists' });
      }

      // Hash password and create user
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const user = this.userRepository.create({
        ...req.body,
        password: hashedPassword
      });

      const savedUser = await this.userRepository.save(user);
      const { password, ...userWithoutPassword } = savedUser;

      return res.status(201).json(userWithoutPassword);

    } catch (error) {
      console.error('User creation error:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  // Add other methods (getUser, updateUser, etc) here...
}