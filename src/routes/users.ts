import express from 'express';
import { UserController } from '../controllers/UserController';
import { validate } from '../middlewares/validation';
import { createUserSchema } from '../validations/userSchemas';

const router = express.Router();
const userController = new UserController();

// Minimal user creation route
router.post('/users', 
  validate(createUserSchema), // Validation middleware
  userController.createUser
);

export default router;