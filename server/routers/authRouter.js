import { Router } from 'express';
import { login, register, update } from '../controllers/authController.js';
const authRoute = Router();

authRoute.post('/register', register);
authRoute.post('/login', login);
authRoute.patch('/update/:userId', update);

export default authRoute;
