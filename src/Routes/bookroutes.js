import express from 'express';
import { login, register } from '../controllers/authcontroller.js';
import auth from '../middlewares/auth.js';
import { bookcontroller, getBooksByUser } from '../controllers/bookcontroller.js';


const bookroutes = express.Router();

// Route to register a new user
bookroutes.post('/get', auth,getBooksByUser);

// Route to login a user
bookroutes.post('/post',auth, bookcontroller);

export default bookroutes;
