import mongoose from "mongoose";

const courseCollection ='courses';

const coursesSchema = new mongoose.Schema({
    title:{
        type:String,
        require:true
    },
    description:{
        type:String,
        require:true
    },
    teacher:
    {
        type:String
    }
})

const cousersModel= mongoose.model (courseCollection,coursesSchema);
export default cousersModel;