// src/controllers/userController.ts
import { Request, Response } from 'express';
import { AppDataSource } from '../utils/data-source';
import { User } from '../entity/User';

const userRepository = AppDataSource.getRepository(User);

// Create User
export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email } = req.body;
    const user = userRepository.create({ name, email });
    const result = await userRepository.save(user);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create user' });
  }
};

// Get All Users
export const getUsers = async (_: Request, res: Response) => {
  try {
    const users = await userRepository.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

// Get User by ID
export const getUser = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.id);
    const user = await userRepository.findOneBy({ id: userId });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch user' });
  }
};

// Delete User by ID
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const result = await userRepository.delete(userId);

    if (result.affected === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete user' });
  }
};
