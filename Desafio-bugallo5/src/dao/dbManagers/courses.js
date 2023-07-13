import cousersModel from "../models/courses.js";

export default class Courses{
    constructor(){
        console.log(" Working in mongoDb")
    }

    getAll =async() =>{
        let courses = await cousersModel.find.lean();
        return courses;
    }

    saveCourse =async course=>{
        let result = await cousersModel.create(course);
        return result;
    } 

    updateCourse =async (id)=>{
        let result = await cousersModel.updateOne({_id:id})
        return result;
    } 

}