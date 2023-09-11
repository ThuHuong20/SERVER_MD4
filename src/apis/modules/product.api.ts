import express from "express";
const Router = express.Router();

import productController from "../../models/product.controller";
import multer from 'multer'
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public')
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now() * Math.random()}.${file.mimetype.split('/')[1]}`)
    }
})

const upload = multer({ storage: storage })
Router.post('/', upload.array('imgs'), productController.create)
Router.get('/:id', productController.findById);
Router.get("/", productController.findMany);
Router.patch("/:productId", upload.single("avatar"), productController.update)
//Router.get("/products", productController.findManyProduct);
//Router.get("/", productController.findProductByName);


export default Router;