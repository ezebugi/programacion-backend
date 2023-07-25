import { Router } from "express";
import userModel from "../models/user.js";

const router = Router();

router.post('/register',async(req,res)=>{
    const {first_name, last_name, email,age, password}= req.body;
    if( !first_name ||!last_name ||! email ||!age||! password )
    return res.status(400).send({status:"error",error:"Valores incompletos"})

    const exists = await userModel.findOne({email});
    if(exists) return res.status(400).send({status:"error",error:"El usuario ya existe"})

    const result =await userModel.create({
        first_name,
        last_name,
        email,
        age,
        password
    }) 
    res.send({status:"success",payload:result})
})

router.post('/login',async(req,res)=>{
    const {email, password}= req.body;
    if(!email || !password) 
    return res.status(400).send({status:"error",error:"Valores incompletos"});

    const user = await userModel.findOne({email,password});
    if(!user) return res.status(400).send({status:"error",error:"Correo o contra invalido"});

    req.session.user = {
        id: user._id,
        email:user.email
    }

    res.send({status:"success",message:"logueado: "})
    
})

export default router;