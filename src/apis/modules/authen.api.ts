import express from 'express';
const Router = express.Router();


import authController from "../../controllers/auth.controller";
import token from '../../middlewares/token';
import registrationValidator from "../../middlewares/register.middlewares";

Router.get('/email-confirm/:token', token.validateToken, authController.confirmEmail);
Router.get('/', token.validateToken, authController.authentication)
Router.post("/register", token.validateToken, registrationValidator.validateRegistration)

export default Router;