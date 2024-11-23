import express from 'express'
import jwt from 'jsonwebtoken'
import { siginUserSchema, signupUserSchema, updateUserSchema } from "./validationSchema.js";
import User from '../models/User.js';
import { authMiddleware } from '../middleware.js';
import { Account } from '../models/Accounts.js';
const userRouter = express.Router();

userRouter.post('/signup',async (req,res)=>{
    const userData = req.body;
    const {success} = signupUserSchema.safeParse(userData);
    
    if(!success){
        return res.status(411).json({
            message: "Email already taken / Incorrect inputs"
        })
    }
    const existingUser = await User.findOne({username: userData.username});
    if(existingUser){
        return res.status(411).json({
            message: "Email already taken"
        })
    }

    const createUserResponse = await User.create(userData);
    const AccountData = await Account.create({
        userId: createUserResponse._id,
        balance: (Math.random() * 10000 + 1)
    })
    
    const jwtToken = jwt.sign({userId: createUserResponse._id},process.env.JWT_SECRET);
    
    return res.json({
        message: 'User created successfully',
        token: jwtToken
    })

})


userRouter.post('/signin', async(req,res)=>{
    const userData = req.body;
    const {success} = siginUserSchema.safeParse(userData);
    if(!success){
        return res.status(411).json({
            message: "Incorrect inputs"
        })
    }
    const {_id: userId} = await User.findOne(userData);

    if(userId){
        const token = jwt.sign({userId},process.env.JWT_SECRET);
    if(!token){
        return res.status(411).json({
            message: "Error while loggin in"
        })
    }
    return res.status(411).json({
        token
    })
    }
    return res.status(411).json({message: "Error while loggin in!"})
    
})

userRouter.put('/',authMiddleware,async(req,res)=>{
    const userData = req.body;
    const {success} = updateUserSchema.safeParse(userData);
    if(!success)
        return res.status(411).json({
            message: "Invalid inputs"
    })

    const updatedUser = await User.findOneAndUpdate({_id: req.userId},userData);
    if(!updatedUser._id) return res.status(411).json({message: "Error while updating information!"});
    res.json({message: "Updated successfully"});
})

userRouter.get('/bulk',authMiddleware,async(req,res)=>{
    const filter = req.query.filter || "";
    console.log(filter)
    const users = await User.find({
        $or: [{
            firstname: {
                "$regex": filter
            }
        },
        {
            lastname: {
                "$regex": filter
            }
        }
    ]
    });

    res.json({
        users: users.map((user)=>{
            return {
                username: user.username,
                firstname: user.firstname,
                lastname: user.lastname,
                _id: user._id
            }
        })
    })
})

export default userRouter;




