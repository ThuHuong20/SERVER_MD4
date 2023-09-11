import express from "express";
const Router = express.Router();

import purchaseController from "../../controllers/purchase.controller";
import token from "../../middlewares/token";
Router.post('/order-history', purchaseController.findGuestReceipt)
Router.post('/', purchaseController.createGuestReceipt)
Router.get('/', token.isAdmin, purchaseController.findManyGuest)
Router.patch('/:orderId', token.isAdmin, purchaseController.update);
Router.get('/:orderId', purchaseController.findById);

export default Router;