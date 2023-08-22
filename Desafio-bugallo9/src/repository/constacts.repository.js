import ContactDTO from "../dao/DTOs/contacts.dto.js";
export default class ContactRepository{
    constructor(dao){
        this.dao =dao;
    }
    getContacts = async () =>{
        let result = await this.dao.get();
        return result;
    }   
    postContacts= async(contact)=>{
        let contactToInsert = new ContactDTO(contact);
        let result = await this.dao.create(contactToInsert)
        return result;
    }
}
