import contactModel from "../models/Contacts.js";

export default class Contacts {
  constructor() {}
  /* get = async () => {
    let contacts = await contactModel.find();
    return contacts;
    */
  getUsers = () => {
    return userModel.find();
  };

  getUserBy = (params) => {
    return userModel.findOne(params);
  };

  saveUser = (user) => {
    return userModel.create(user);
  };

  updateUser = (user) => {
    return userModel.findByIdAndUpdate(user._id, {
      $set: { password: user.password },
    });
  };
}
