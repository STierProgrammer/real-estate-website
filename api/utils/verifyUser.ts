import jwt, { JwtPayload, VerifyErrors } from 'jsonwebtoken';
import { errorHandler } from './error';
import { NextFunction, Request, Response } from 'express';

declare global {
    namespace Express {
        interface Request {
            user?: JwtPayload | string;
        }
    }
}

export const verifyToken = (req: Request, res: Response, next: NextFunction): void => {
    const token = req.cookies.access_token;
    const jwt_secret = process.env.JWT_SECRET;

    if (!token) return next(errorHandler(401, 'Unauthorized Account'));
    
    if (!jwt_secret) throw new Error("JWT_SECRET Environmental variable is not defined!");

    jwt.verify(
        token,
        jwt_secret,
        (err: VerifyErrors | null, decoded: string | JwtPayload | undefined) => {
            if (err) return next(errorHandler(403, 'Forbidden'));
            
            if (decoded) req.user = decoded;

            next();
        }
    );
};

