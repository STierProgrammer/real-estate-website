import bcryptjs from 'bcryptjs';
import User from '../models/user.model';
import { NextFunction, Request, Response } from 'express';

export const signup = async (req: Request, res: Response, next: NextFunction) => {
    const { username, email, password } = req.body;
    const hashedPassword = bcryptjs.hashSync(password, 10);
    
    const newUser = new User({
        username,
        email,
        password: hashedPassword,
    });

    try {
        await newUser.save();
        res.status(201).json('User created successfully!');
    }
    catch (error) {
        next(error);
    }
}