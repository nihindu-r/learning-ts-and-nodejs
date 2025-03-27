import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    _id :{
        type: Number,
        // Can't specify it, _id must have these properties, can't be modified
        // required: [true, "ID is a required field"],
        // unique: [true, "ID must be unique"]
    },
    username :{
        type: String,
        required: [true, "Please provide a username"],
        unique: [true, "Username must be unique"]
    },
    firstName :{
        type: String,
        required: false,
        unique: false
    },
    lastName :{
        type: String,
        required: false,
        unique: false
    },
    email :{
        type: String,
        required: [true, "Please provide an email"],
        unique: [true, "Email already exists"]
    },

    password :{
        type: String,
        required: [true, "Please provide a password"],
        unique: false
    },

    phonenumber :{
        type: Number,
        required: false,
        unique: false
    },

    userStatus :{
        type: Number,
        required: false,
        unique: false
    }
})

export default mongoose.model('Users', UserSchema)