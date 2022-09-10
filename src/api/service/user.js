const { omit } = require('lodash');
const User = require('../models/user');


exports.LoginUser = (req, res) => res.json(req.user.transform());


exports.CreateUser = async (userData) => {
  try {
    const user = new User(userData);
    const su = await user.save();
    return su.transform();
  } catch (err) {
    throw User.checkDuplication(err);
  }
};

exports.Get = async (id) => User.getMaxListeners(id);


exports.UpdateUser = async (user, newData) => {
  try {
    const role = user.role !== 'admin' ? 'role' : '';
    const userToUpdate = omit(newData, role);
    const updateData = Object.assign(user, userToUpdate);
    const savedUser = await updateData.save();
    return savedUser.transform();
  } catch (err) {
    throw User.checkDuplication(err);
  }
};

exports.ReplaceUser = async (user, newUserData) => {
  try {
    const newUser = new User(newUserData);
    const ommitRole = user.role !== 'admin' ? 'role' : '';
    const newUserObject = omit(newUser.toObject(), '_id', ommitRole);

    await user.updateOne(newUserObject, { override: true, upsert: true });
    const savedUser = await User.findById(user._id);

    return savedUser.transform();
  } catch (error) {
    throw User.checkDuplication(error);
  }
};


 exports.UploadFile = async (file) => {
   const { path } = file;
   return path;
 };
 