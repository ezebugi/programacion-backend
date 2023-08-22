import mongosee  from "mongoose";

const userCollection = 'Contacts';
const userSchema =  new mongosee.Schema({
    first_name :String,
    last_name :String,
    email :{
        type: String,
        unique:true
    }
})

const contactModel= mongosee.model(userCollection,userSchema);
export default contactModel;

