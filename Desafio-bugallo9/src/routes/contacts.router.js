import { Router } from "express";
//import Contacts from "../dao/mongo/contact.mongo.js";
i//mport { Contacts } from "../dao/factory.js";
//import ContactDTO from "../dao/DTOs/contacts.dto.js";
import { contactsService } from "../repository/index.js";
const router  =Router();
//const contactService =new Contacts();

router.get('/',async(req,res)=>{
    let result =await contactsService.getContacts();
    res.send({status:"success",payload:result})
})

router.post('/',async(req,res)=>{
    let {name,last_name,email}=req.body;
    let contact= new ContactDTO ({name,last_name,email});
    let result =await  contactsService.postContacts(contact);
})
export default router;
