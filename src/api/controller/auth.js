const { Login, Register } = require('../service/auth');
const { Ok, CREATED } = require('../../utils/APIError');

exports.login = async (req, res, next) => {
  try {
    const data = await Login(req.body);
    res.status(Ok).json({ data, success: 'SUCCESS' });
  } catch (err) {
    next (err);
  }
};

exports.register = async (req, res, next) => {
  try {
    const data = await Register(req.body);
    req.status(CREATED).json({ data, success: 'SUCCESS' });
  } catch (err) {
    next(err);
  }
};