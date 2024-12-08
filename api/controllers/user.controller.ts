import { NextFunction, Request, Response } from 'express';
import { errorHandler } from '../utils/error';
import { Document, isValidObjectId } from 'mongoose';
import bcryptjs from 'bcryptjs';
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

export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
    if (typeof req.user === 'string' || !('id' in req.user)) return next(errorHandler(401, 'Unauthorized account'));
    

    if (req.user.id !== req.params.id) return next(errorHandler(401, 'You can only update your own account!'));

    try {
        if (req.body.password) req.body.password = bcryptjs.hashSync(req.body.password, 10);

        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            {
                $set: {
                    username: req.body.username,
                    email: req.body.email,
                    password: req.body.password,
                    avatar: req.body.avatar,      
                },
            },
            { new: true }
        );

        const { password, ...rest } = (updatedUser as Document).toObject();

        res.status(200).json(rest);
    }
    catch (error) {
        next(error);
    }
};

export const deleteUser = async (req: Request, res: Response, next: NextFunction): Promise<void>  => {
    if (typeof req.user === 'string' || !('id' in req.user)) return next(errorHandler(401, 'Unauthorized account'));

    if (req.user.id !== req.params.id) return next(errorHandler(401, 'You can only delete your own account!'));
    
    try {
        await User.findByIdAndDelete(req.params.id);
        res.clearCookie('access_token');
        res.status(200).json('User has been deleted!');
    }
    catch (error) {
        next(error);
    }
};