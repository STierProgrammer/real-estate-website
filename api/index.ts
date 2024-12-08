import dotenv from 'dotenv';
import mongoose from 'mongoose';
import express from 'express';
import cookieParser from 'cookie-parser';
import userRouter from './routes/user.route';
import authRouter from './routes/auth.route';

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