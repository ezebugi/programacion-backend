import { usersModel } from "../models/users.js";

export default class Users{
    constructor(){
        console.log(" Working in mongoDb")
    }

    getAll =async() =>{
        let users = await usersModel.find();
        return  users.map(user=>user.toObject())
    }

    saveUser =async user=>{
        let result = await usersModel.create(user);
        return result;
    } 
}