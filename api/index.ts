import dotenv from 'dotenv';
import mongoose from 'mongoose';
import express from 'express';
import userRouter from './routes/user.route';

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

app.listen(5018, () => {
    console.log("Server is running on port 5018!");
});

app.use('/api/user', userRouter);