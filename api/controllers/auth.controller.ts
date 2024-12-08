import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';
import User from '../models/user.model';
import { NextFunction, Request, Response } from 'express';
import { errorHandler } from '../utils/error';
import { Document } from 'mongoose';

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
};

export const signin = async (req: Request, res: Response, next: NextFunction) => {
    const cookieOptions = {
        httpOnly: true,
        secure: true,
        maxAge: 30 * 24 * 60 * 1000,
        sameSite: 'strict' as 'strict' | 'lax' | 'none' | boolean,
    };

    const { email, password } = req.body;

    try {
        const validUser = await User.findOne({ email });

        if (!validUser) return next(errorHandler(404, 'User not found!'));

        const validPassword = bcryptjs.compareSync(password, validUser.password);

        if (!validPassword) return next(errorHandler(401, 'Wrong credentials!'));

        const jwt_secret = process.env.JWT_SECRET;

        if (!jwt_secret) throw new Error("JWT_SECRET Environmental variable is not defiend!");

        const token = jwt.sign({ id: validUser._id }, jwt_secret);

        const { password: pass, ...rest } = (validUser as Document).toObject();

        res.cookie('access_token', token, cookieOptions)
           .status(200)
           .json(rest);
    }
    catch (error) {
        next(error);
    }
};

export const signout = async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.clearCookie('access_token');
        res.status(200).json('User has been logged out!');
    }
    catch (error) {
        next(error);
    }
};