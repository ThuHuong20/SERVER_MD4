import express, { Router } from 'express';
const router = express.Router();

import userModule from './modules/user'
router.use('/users', userModule)

import authenApi from './modules/authen.api'
router.use('auth', authenApi)
export default router;