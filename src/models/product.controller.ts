import productModel from "../models/product.model";
import { Request, Response } from "express";
import { uploadFileToStorage } from '../firebase'
import fs from 'fs'
export default {
    create: async function (req: Request, res: Response) {
        let data = JSON.parse(req.body.product);
        data.price = Number(data.price)
        let newProduct = {
            ...data,
            // avatar: "abc.jpg"
        }

        if (req.files) {
            let avatarUrl = await uploadFileToStorage((req.files as any)[0], "md4", fs.readFileSync((req.files as any)[0].path))
            fs.unlink((req.files as any)[0].path, (err) => {

            })
            newProduct.avatar = avatarUrl
        }
        let productPictures = [];
        for (let i = 1; Number(i) < Number(req.files?.length); i++) {
            console.log("(req.files as any)[i]", (req.files as any)[i])
            let path = await uploadFileToStorage((req.files as any)[i], "md4", fs.readFileSync((req.files as any)[i].path))
            fs.unlink((req.files as any)[i].path, (err) => {

            })
            productPictures.push({
                path
            })
        }
        try {
            let modelRes = await productModel.create(newProduct, productPictures);
            console.log("modelRes", modelRes)
            return res.status(modelRes.status ? 200 : 213).json(modelRes);
        } catch (err) {
            return res.status(500).json({
                message: "Lỗi controller"
            })
        }
    },
    findById: async function (req: Request, res: Response) {
        try {
            let result = await productModel.findById(req.params.id);
            return res.status(200).json({
                message: result.message,
                data: result.data
            })

        } catch (err) {
            return res.status(500).json({
                message: "Lỗi không xác định controller!"
            })
        }
    },

    /* phan trang */
    findMany: async function (req: Request, res: Response) {
        try {
            // if (req.body) {
            //     let modelRes = await productModel.findManyProduct();
            //     return res.status(modelRes.status ? 200 : 221).json(modelRes)
            // }
            let maxItemPage = Number(req.query.maxItemPage);
            let skipItem = Number(req.query.skipItem);
            let modelRes = await productModel.findMany(maxItemPage, skipItem)

            if (req.query.search) {
                let modelRes = await productModel.findProductByName(req.query.search)
                return res.status(modelRes.status ? 200 : 221).json(modelRes)
            }

            return res.status(modelRes.status ? 200 : 221).json(modelRes)
        } catch (err) {

            return res.status(500).json({
                message: "Lỗi không xác định findMany!"
            })
        }
    },

    // findManyProduct: async function (req: Request, res: Response) {
    //     try {

    //         /* Find all */
    //         let modelRes = await productModel.findManyProduct()
    //         return res.status(modelRes.status ? 200 : 221).json(modelRes)
    //     } catch (err) {
    //         return res.status(500).json({
    //             message: "Lỗi không xác định!"
    //         })
    //     }
    // },
    update: async (req: Request, res: Response) => {

        req.body = JSON.parse(req.body.product_infor);
        console.log("req.body", req.body);
        console.log("req.params.productId", req.params.productId);
        // xử lý avatar
        if (req.file != undefined) {
            let url = await uploadFileToStorage(req.file, "md4", fs.readFileSync(req.file.path));
            fs.unlink(req.file.path, (err) => { })
            req.body.avatar = url;
        }
        try {
            /* Gọi model xử lý database */
            let result = await productModel.update(req.params.productId, req.body);
            return res.status(result.status ? 200 : 214).json(result)
            // console.log("result", result)
        } catch (err) {
            return res.status(500).json({
                message: "Lỗi xử lý!"
            })
        }
    }

}