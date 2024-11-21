import express from 'express'
import userRouter from './users.js';
const apiRouter = express.Router();


apiRouter.use('/users',userRouter);

export default apiRouter;


