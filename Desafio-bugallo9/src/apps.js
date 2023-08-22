import express from "express";
import contactRouter from "./routes/contacts.router.js";
import mongoose from "mongoose";

const app = express();
const connection = mongoose.connect(
  "mongodb+srv://CoderUser:A123456*@pruebacoder.rpvqwdz.mongodb.net/?retryWrites=true&w=majority"
);

const server =app.listen (8080,() => console.log("Server Arriba"))

app.use('/contact', contactRouter);
