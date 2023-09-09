import express, { Router } from 'express';
const router = express.Router();

import userModule from './modules/user'
router.use('/users', userModule)

import authenApi from './modules/authen.api'
router.use('/auth', authenApi)

import categoryApi from './modules/category.api'
router.use('/categories', categoryApi)

import productApi from './modules/product.api'
router.use('/products', productApi)

import purchaseApi from './modules/purchase.api'
router.use('/purchase', purchaseApi)

export default router;