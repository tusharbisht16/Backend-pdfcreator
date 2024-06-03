import express from 'express';
import { login, register } from '../controllers/authcontroller.js';


const authRoutes = express.Router();

// Route to register a new user
authRoutes.post('/register', register);

// Route to login a user
authRoutes.post('/login', login);

export default authRoutes;
