import dotenv from 'dotenv';
import mongoose from 'mongoose';
import express, { NextFunction, Request, Response } from 'express';
import CustomError from './utils/error';
import cookieParser from 'cookie-parser';
import userRouter from './routes/user.route';
import authRouter from './routes/auth.route';
import listingRouter from './routes/listing.route';

dotenv.config();

const mongoUri = process.env.MONGO;

if (!mongoUri) 
  throw new Error('MONGO environment variable is not defined');

mongoose.connect(mongoUri)
    .then(() => {
        console.log("Connected to MongoDB!");
    })
    .catch((err) => {
        console.log("Error connecting to DB: " + err);
    });

const app = express();

app.use(express.json());
app.use(cookieParser());

app.listen(5018, () => {
    console.log("Server is running on port 5018!");
});

app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/listing', listingRouter);

app.use((err: CustomError, req: Request, res: Response, next: NextFunction) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Interal Server Error!';

    res.status(statusCode).json({
        success: false,
        statusCode,
        message
    });
});