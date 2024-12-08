import express from 'express';
import { verifyToken } from '../utils/verifyUser';
import { deleteUser, getUser, updateUser } from '../controllers/user.controller';

const userRouter = express.Router();

userRouter.get('/:id', verifyToken, getUser);
userRouter.post('/update/:id', verifyToken, updateUser);
userRouter.delete('/delete/:id', verifyToken, deleteUser);

export default userRouter;