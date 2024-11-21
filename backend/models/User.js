import mongoose from "mongoose";

const Schema = mongoose.Schema;

const users = new Schema({
    username: {
     type: String,
     required: true,
     unique: true,
     trim: true,
     lowercase: true,
     minLength: 3,
     maxLength: 30
    },
    firstname: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    lastname: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    }
});

const User = mongoose.model('User',users);

export default User;