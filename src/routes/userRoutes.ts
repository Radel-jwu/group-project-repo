// src/routes/userRoutes.ts
import { Router } from 'express';
import { createUser,getUsers, getUser, deleteUser} from '../controllers/userController';

const router = Router();

router.post('/', createUser);

router.get('/users', getUsers);

router.get('/users/:id', getUser);

router.delete('/users/:id', deleteUser);


export default router; // Ensure you're exporting the router correctly
