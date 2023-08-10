import mongoose from "mongoose";

const userCollection ='users';

const usersSchema = new mongoose.Schema({
    first_name:{
        type:String,
        require:true
    },
    last_name:{
        type:String,
        require:true
    },
    email:
    {
        type:String,
        require:true,
        unique:true
    },
    dni: Number,

    birthDate :Date,

    gender: {
        type:String,
        enum: ["M","F"]
    }

})

export const usersModel= mongoose.model (userCollection,usersSchema);