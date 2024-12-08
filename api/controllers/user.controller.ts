import { NextFunction, Request, Response } from 'express';
import { errorHandler } from '../utils/error';
import { Document } from 'mongoose';
import User from '../models/user.model';

export const test = (req: Request, res: Response): void => {
    res.json({
        message: 'API route is working!',
    });
};

export const getUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) return next(errorHandler(404, 'User not found!'));

        const { password: pass, ...rest } = (user as Document).toObject();

        res.status(200).json(rest);
    }
    catch (error) {
        next(error);
    };
};