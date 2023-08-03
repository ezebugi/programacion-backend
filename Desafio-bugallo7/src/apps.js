import express  from "express";
import session from "express-session";
import storage from'session-file-store';
import MongoStore from "connect-mongo";
import handlebars from 'express-handlebars';
import __dirname from "./utils.js";
import viewsRouter from "./routes/views.router.js"
import sessionsRouter from "./routes/sessions.router.js";
import mongoose from "mongoose";
import passport from "passport";
import initPassport from "./config/passport.config.js"

const app = express ();
const server=app.listen(8080,()=>console.log("Server arriba"));
const connection = mongoose.connect('mongodb+srv://CoderUser:A123456*@pruebacoder.rpvqwdz.mongodb.net/?retryWrites=true&w=majority')

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

initPassport();
app.use(session({
    secret:"SecretCoders"
}));

app.use(passport.initialize());
app.use('/',viewsRouter);
app.use('/api/session',sessionsRouter);

