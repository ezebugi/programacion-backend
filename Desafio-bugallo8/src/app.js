import  express  from "express";
import __dirname from "./utils.js";
import usersRouter from './routes/users.router.js'
import courseRouter from './routes/courses.router.js'
import viewRouter from './routes/views.router.js'
import handlebars from 'express-handlebars';
import mongoose from "mongoose";

const app =express();
const PORT =8080;

const connection = mongoose.connect('mongodb+srv://CoderUser:A123456*@pruebacoder.rpvqwdz.mongodb.net/?retryWrites=true&w=majority')

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set('view engine', 'handlebars');
app.use('/',viewRouter);

app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/api/users',usersRouter);
app.use('/api/courses',courseRouter);

const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const passportConfig = require('./config/passport-config');

const app = express();

mongoose.connect('mongodb://localhost:27017/auth-example', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.set('useCreateIndex', true);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());

app.use('/api/auth', authRoutes);




const server =app.listen(PORT,()=>console.log(`Server arriba: ${PORT}`));






