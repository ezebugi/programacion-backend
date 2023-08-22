import { Contacts } from "../dao/factory.js";
import ContactRepository from "./constacts.repository.js";

export const contactsService = new ContactRepository(new Contacts());