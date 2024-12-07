import { Request, Response } from 'express';

export const test = (req: Request, res: Response): void => {
    res.json({
        message: 'API route is working!',
    });
};
