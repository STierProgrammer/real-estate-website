import express from 'express';
import { verifyToken } from '../utils/verifyUser';
import { getUser, test } from '../controllers/user.controller';

const userRouter = express.Router();

userRouter.get('/test', test);
userRouter.get('/:id', verifyToken, getUser);

export default userRouter;