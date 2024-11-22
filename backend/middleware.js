import jwt from 'jsonwebtoken';

export const authMiddleware = (req,res,next)=> {
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith('Bearer')){
        return res.status(403).json({
            message: "You are not authorized"
        })
    }
    const token = headers.Authorization.split(" ")[1];
    if(!token)
       return res.status(403).json({
        message: "You are not authorized"
    })
    const verification =  jwt.verify(token,process.env.JWT_SECRET);
    if(!verification){
        return res.status(403).json({
            message: "You are not authorized"
        })

    }
    req.userId = verification.userId;
    next()
}