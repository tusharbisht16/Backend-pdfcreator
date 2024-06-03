import jwt from 'jsonwebtoken';
import userModel from '../models/user.model.js';


const auth = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(401).json({ message: 'token not found, authorization denied!' });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'token not found, authorization denied!' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded.id);
        if (!user || !user.status) {
            return res.status(401).json({ message: 'User not authorized ' });
        }
        req.user = user._id;
        next();
    } catch (err) {
        return res.status(400).json({ message: 'Token is not valid' });
    }
};

export default auth;
