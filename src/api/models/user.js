const { Schema, model, Types } = require('mongoose');
const bcrypt = require('bcryptjs');
const APIError = require('../../utils/APIError');

const { saltRound } = require('../../config/env-vars');
const { string, object } = require('joi');

const PostModel = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,   
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  image: {
    type: String,
    // default: DEFAULT_IMAGE,
  },
}, { timestamps: true });

PostModel.pre('save', async function save(next) {
  try {
    if (!this.isModified('password')) return next();
    const hash = await bcrypt.hash(this.password, Number(saltRound));
    this.password = hash;
    return next();
  } catch (err) {
    return next(err);
  }
});

PostModel.method({
  transform() {
    const transformed = {};
    const field = ['image', 'description', 'user_id', 'likes', 'comments'];
    fields.forEach((field) => {
      transformed[field] = this[field];
    });
    return transformed;
  },
 
  async matchPassword(password) {
    return bcrypt.compare(password, this.password);
  },
});

PostModel.statics = {
   async get(id) {
    if(!Types.ObjectId.isValid(id)) {
      throw new APIError({
        message: [{
          field: 'id',
          location: 'params',
          message: 'Please enter valid User ID',
        }],
        status: NOT_FOUND,
      });
    }
    const user = await this.findById(id).exec();
    if (!user) throw new APIError({ message: NO_RECORD_FOUND, status: NOT_FOUND });
    return user;
  },
};

module.exports = model('post', PostModel);