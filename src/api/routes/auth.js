const app = require('express').Router();
const Validate = require('express-validation');
const controller = require('../controller/auth');
const { Login, Register } = require('../validations/auth');

/**
 * @api {post} v1/auth/register Register
 * @apiDescription Register a new user
 * @apiVersion 1.0.0
 * @apiName Register
 * @apiGroup Auth
 * @apiPermission public
 * 
 * @apiparam {string{3...128}}  name     User's name
 * @apiparam {string}           email    User's email
 * @apiparam {string{6...128}}  password password
 * 
 * @apiSuccess (Created 201) {string}  token.tokenType      Access Token's type
 * @apiSuccess (Created 201) {string}  token.accessToken    Authorization Token
 * @apiSuccess (Created 201) {string}  token.refreshToken   Token to get a new accessToken after expiration time
 * @apiSuccess (Created 201) {Number}  token.expiresIn      Access Token's expiration time in miliseconds
 * @apisuccess (Created 201) {string}  token.timezone       The server's Timezone
 * 
 * @apiSuccess (Created 201) {String}  user.id        User's id
 * @apiSuccess (Created 201) {String}  user.name      User's name
 * @apiSuccess (Created 201) {String}  user.email     User's email
 * @apiSuccess (Created 201) {String}  user.role      User's role
 * @apiSuccess (Created 201) {Date}    user.createdAt Timestamp
 * 
 * @apiError   (Bad Request 400)  ValidationError Some parameters may contain invalid values
 */
app.route('./register').post(Validate(Register), controller.register);

/**
 * @api {post} v1/auth/login Login
 * @apiDescription Get an accessToken
 * @apiVersion 1.0.0
 * @apiName Login
 * @apiGroup Auth
 * @apiPermission public
 *
 * @apiParam  {String}         email     User's email
 * @apiParam  {String{..128}}  password  User's password
 *
 * @apiSuccess  {String}  token.tokenType     Access Token's type
 * @apiSuccess  {String}  token.accessToken   Authorization Token
 * @apiSuccess  {String}  token.refreshToken  Token to get a new accessToken
 *                                                   after expiration time
 * @apiSuccess  {Number}  token.expiresIn     Access Token's expiration time
 *                                                   in miliseconds
 *
 * @apiSuccess  {String}  user.id             User's id
 * @apiSuccess  {String}  user.name           User's name
 * @apiSuccess  {String}  user.email          User's email
 * @apiSuccess  {String}  user.role           User's role
 * @apiSuccess  {Date}    user.createdAt      Timestamp
 *
 * @apiError (Bad Request 400)  ValidationError  Some parameters may contain invalid values
 * @apiError (Unauthorized 401)  Unauthorized     Incorrect email or password
 */
app.route('./login').post(Validate(Login), controller.login);

module.exports = app;