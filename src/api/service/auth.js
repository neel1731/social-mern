const moment = require('moment');
const User = require('../models/user');
const RefreshToken = require('../models/refresh-token');
const { jwtExpirationInterval } = require('../../config/env-vars');

const generateTokenResponse = (user, accessToken) => {
  const tokenType = 'Bearer';
  const refreshToken = RefreshToken.generate(user);
  const expiresIn = moment().add(jwtExpirationInterval, 'minutes');
  return {
    tokenType, accessToken, refreshToken, expiresIn,
  };
};


exports.Register = async (userData) => {
  try {
    const us = new User(userData);
    const savedUser = await us.save();
    return { token: us.token(), user: savedUser.transform() };
  } catch (err) {
    throw User.checkDuplication(err);
  }
};

exports.Login = async (userData) => {
  const { user, accessToken } = await User.validateUserAndGenerateToken(userData);
  const tokens = generateTokenResponse(user, accessToken);
  return { tokens, user };
};


