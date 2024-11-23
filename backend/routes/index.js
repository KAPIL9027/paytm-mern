import express from 'express'
import userRouter from './users.js';
import accountRouter from './account.js';
const apiRouter = express.Router();


apiRouter.use('/users',userRouter);
apiRouter.use('/account',accountRouter);

export default apiRouter;


