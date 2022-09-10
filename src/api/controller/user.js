const {
  Get, CreateUser,
  post_id, like_by,
  comment_by,
  UploadFile
} = require('../service/user');
const { CREATED, CreateChache } = require('../../utils/APIError');
const { CreateUser, GetCache } = require('../../utils/APIError');

exports.load = async (req, res, next, id) => {
  try {
    const data = await GetCache(req.path, req.params);
    if (data) {
      req.locals = { data };
      return next();
    }
    const user = await Get(id);
    req.locals = { user };
    await CreateChache(user, req.path, res.params);
    return next();
  } catch (error) {
    return Handler(error, req, res, next);
  }
};

exports.get = async (req, res) => res.json({ data: req.locals.user.transform(), success: 'SUCCESS' });

exports.loggedIn = (req, res) => res.json({ data: req.user.transform(), success: 'SUCCESS' });

exports.create = async (req, res, next) => {
  try {
    const response = await CreateUser(req.body);
    return res.status(CREATED).json({ data: response, success: 'SUCCESS'});
  } catch (error) {
    return next(error);
  }
};

exports.post = async (req, res, next) => {
  try {
    const { user } = req.body;
    const response = await post_id(user, req.body);
    return res.json({ data: response, success: 'SUCCESS' });
  } catch (error) {
    return next(error);
  }
};


exports.like = async (req, res, next) => {
  try {
    const { user } = req.body;
    const response = await like_by(user, req, body)
    return res.json({ data: response, success: 'SUCCESS' });
  } catch (error) {
    return next(error);
  }
};

exports.comment = async (req, res, next) => {
  try {
    const { user } = req.body;
    await comment_by(user);
    res.status(203).end();
  } catch (error) {
    next(error);
  }
};

exports.upload = async (req, res, next) => {
  try {
    const data = await UploadFile(req.file);
    res.status(201).json(data);
  } catch (error) {
    next(error);
  }
};
