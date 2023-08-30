/* Create Express Router */
import express from 'express'
const router = express.Router()

import userController from '../../controllers/user.controller';

router.post('/', userController.register)

export default router;