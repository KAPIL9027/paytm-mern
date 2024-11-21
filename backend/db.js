import mongoose from "mongoose";

   const connectDB = ()=>{
    mongoose.connect(process.env.DB_MONGO_URL).then(
        ()=>{
            console.log('Database Mongodb connected');
        }
    ).catch((err)=>{
        console.log(err);
    })
}


export default connectDB;