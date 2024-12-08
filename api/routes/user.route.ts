import express from 'express';
import { verifyToken } from '../utils/verifyUser';
import { getUser } from '../controllers/user.controller';

const userRouter = express.Router();

userRouter.get('/:id', verifyToken, getUser);

export default userRouter;