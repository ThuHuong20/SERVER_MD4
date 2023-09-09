import express from 'express';
const Router = express.Router();

import categoryController from '../../controllers/category.controller';
Router.get('/', categoryController.findMany)
Router.get("/:categoryId", categoryController.findProductByCategory);
//Router.get("/:id", categoryController.findProductByCategory);
export default Router;