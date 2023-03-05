import { Router } from 'express';
import { getUser, getAllUser } from '../controllers/userController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const userRoute = Router();

userRoute.get('/', getAllUser);
userRoute.get('/:id', getUser);

export default userRoute;
