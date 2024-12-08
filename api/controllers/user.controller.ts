import { NextFunction, Request, Response } from 'express';
import { errorHandler } from '../utils/error';
import { Document, isValidObjectId } from 'mongoose';
import User from '../models/user.model';

export const getUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;

        if (!isValidObjectId(id)) return next(errorHandler(400, 'Invalid user ID'));
        

        const user = await User.findById(id);

        if (!user) return next(errorHandler(404, 'User not found!'));
        

        const { password: pass, ...rest } = (user as Document).toObject();

        res.status(200).json(rest);
    } 
    catch (error) {
        next(error);
    }
};