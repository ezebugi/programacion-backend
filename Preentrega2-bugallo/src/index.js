/*import userModel from "./models/user.model.js";
import mongoose from "mongoose";

const enviroment =async () => {
    await mongoose.connect('mongodb+srv://CoderUser:A123456*@pruebacoder.rpvqwdz.mongodb.net/?retryWrites=true&w=majority')
    let response =await userModel.find().explain('executionStats');

    let  response1 = await userModel.find({first_name:"Jeremias"}).explain('executionStats');
    console.log (response);
    console.log (response1);
}

enviroment ();*/

import mongoose from "mongoose";
import courseModel from "./models/courses.model.js";
import studentModel from "./models/student.model.js";


const enviroment =async () => {
    await mongoose.connect('mongodb+srv://CoderUser:A123456*@pruebacoder.rpvqwdz.mongodb.net/admin?retryWrites=true&w=majority')
    
    await studentModel.create({
        first_name:"Pepita",
        last_name:"Lopez",
        email:"pepita@correo.com",
        gender: "Female",

    })

    /*await courseModel.create({
        title:"Backend",
        description:"dev en server- la logica de las apps ",
        difficulty: 5,
        topic: ["middlware","bd","motores"], 
    })*/

    let student =await studentModel.findOne({_id:"63e1a698d18962bf40e35c8d"})
    console.log(student);

    student.courses.push({course:"63e1a7abc582e62e41350bf6"})
    await studentModel.updateOne({_id:"63e1a698d18962bf40e35c8d"},student);
 };


    
enviroment ();

