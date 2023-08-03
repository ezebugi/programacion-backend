import passport from "passport";
import local from "passport-local";
import userModel from "../models/user.js";
import {createHash,isValidPassword} from "../utils.js";
import githubService from 'passport-github2';

const initPassport =() =>
{
     passport.use('github', new githubService({
        clientID: 'Iv1.302cdb8fe00de4ec',
        clientSecret: 'c4af584d6b9ed84c99a574d68e45645538a8b49b',
        callbackURL: 'http://localhost:8080/api/session/githubcallback'
    }, async (accessToken,refreshToken,profile, done)=>
    { try{
        console.log(profile);
        let user = await userModel.findOne({email:profile.json.email})
        if(!user){
            let newUser = {
                first_name: profile._json.name,
                last_name: profile.json.last_name,
                age:18,
                email: profile._json.email,
                password:''
            }
            let result = await  userModel.create(newUser);
            done(null,result)
        }else{
            done(null,user)
        }
    }catch(error){
        return done(error)
    }
    }))
}

export default initPassport;

//ErrorLens