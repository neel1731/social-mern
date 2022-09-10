const { Schema, model } = require('mongoose');
const moment = require('moment');
const crypto = require('crypto');
const { string } = require('joi');

/**
 * Refresh Token Schrema
 * @private
 */
const RefreshTokenModel = new Schema({
  token: {
    type: string,
    required: true,
    index: true,
  },
  id: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: true,
  },
  email: {
    type: String,
    ref: 'users',
    required: true,
  },
  expires: {
    type: Date,
  },
});


RefreshTokenModel.statics = {
  /**
   * Generate refresh token and Returns it
   * @public
   * 
   * @param {object} user User Object
   * @param {string} user.email User's Email
   * @param {string} user.password User's password
   * 
   * @returns {string} Refresh Token
   */
  generate(user) {
    const { email, id } = user;
    const token = `${id}.${crypto.randomBytes(40).toString('hex')}`;
    const expires = moment().add(30, 'days').toDate();
    const Obj = new RefreshTokenModel({
      token, id, email, expires,
    });
    Obj.save();
    return Obj.token;  
  },
};

const RefreshToken = model('RefreshToken', RefreshTokenModel);

/**
 * @typedef RefreshToken
 */
module.exports = RefreshToken;