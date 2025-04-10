// src/routes/userRoutes.ts
import { Router } from 'express';
import { createUser,getUsers, getUser} from '../controllers/userController';

const router = Router();

router.post('/', createUser);

router.get('/users', getUsers);

router.get('/users/:id', getUser);


export default router; // Ensure you're exporting the router correctly
