import express from 'express';
import {authMiddleware} from '../middleware.js'
import {transferSchema } from "./validationSchema.js";
import {Account} from '../models/Accounts.js';
import mongoose from 'mongoose';
const accountRouter = express.Router();


accountRouter.get('/balance',authMiddleware,async(req,res)=>{

    const account = await Account.findOne({userId: req.userId});
    res.json({
        balance: account.balance
    })
})


accountRouter.post('/transfer',authMiddleware,async(req,res)=>{
    let transferData = req.body;
    if(transferData && transferData.amount)
    transferData.amount = parseInt(transferData.amount);
    const {success} = transferSchema.safeParse(transferData);
    if(!success)
        return res.status(411).json({
            message: "Invalid inputs"
    })
    const session = await mongoose.startSession();
    session.startTransaction();
    const fromAccount = await Account.findOne({userId: req.userId}).session(session);
    if(!fromAccount || (transferData.amount > fromAccount.balance)){
        await session.abortTransaction();
        return res.status(400).json({
            message: "Insufficient balance"
        })
    }
    const toAccount = await Account.findOne({userId: transferData.to}).session(session);
    if(!toAccount){
        await session.abortTransaction();
        return res.status(400).json({
            message: "Invalid account"
        });
    }
    await Account.updateOne({userId: req.userId},{"$inc": {
        balance: -(transferData.amount)
    }}).session(session);
    await Account.updateOne({userId: transferData.to},{
        "$inc": {
            balance: transferData.amount
        }
    }).session(session);
    await session.commitTransaction();
    res.json({
        message: "Transfer successful"
    })
    
})

export default accountRouter;



