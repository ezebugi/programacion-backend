export default class ContactDTO {
  constructor(contact) {
    this.firt_name = contact.name;
    this.last_name = contact.last_name;
    this.email = contact.email ? contact.email.split("-").join("") : "";
  }
}
