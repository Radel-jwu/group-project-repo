// src/controllers/userController.ts
import { Request, Response } from 'express';
import { AppDataSource } from '../utils/data-source';
import { User } from '../entity/User';

const userRepository = AppDataSource.getRepository(User);

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


