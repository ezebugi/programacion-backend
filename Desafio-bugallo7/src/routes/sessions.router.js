import { Router } from "express";
import passport from "passport";
import User from "../models/user.js";
import { createHash, isValidPassword } from "../utils.js";

const router = Router();

router.get('/github',passport.authenticate('github',{scope:['user:email']},async(req,res)=>{}))


router.get('/githubcallback',passport.authenticate('github', {failureRedirect:'/login'}),async(req,res)=>{
    req.session.user =req.user,
    res.redirect('/');
})

export default router;