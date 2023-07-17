
import express from 'express';
import userRouter from './routes/users.router.js'
import mongoose  from 'mongoose';

const app =express ();
app.use (express.json());

const server =app.listen (8080,() => console.log("Server arriba"))



mongoose.connect('mongodb+srv://CoderUser:A123456*@pruebacoder.rpvqwdz.mongodb.net/?retryWrites=true&w=majority', (error) =>{
    if (error){
        console.log("No hubo conexion " +error)
        process.exit();
    }
})

app.use ('/api/users',userRouter);