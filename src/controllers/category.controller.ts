import categoryModel from "../models/category.model"
import { Request, Response } from 'express';
export default {
    findMany: async function (req: Request, res: Response) {
        try {
            let modelRes = await categoryModel.findMany()
            res.status(modelRes.status ? 200 : 213).json(modelRes);
        } catch (err) {
            return res.status(500).json({
                message: "loi controller"
            })
        }
    },
    // findByCategory: async function (req: Request, res: Response) {
    //     try {
    //         let result = await categoryModel.readManyRelation(req.params.id);
    //         return res.status(200).json({
    //             message: result.message,
    //             data: result.data
    //         })
    //     } catch (err) {
    //         return res.status(500).json({
    //             message: "Lỗi không xác định!"
    //         })
    //     }
    // },
    findProductByCategory: async function (req: Request, res: Response) {
        try {
            let result = await categoryModel.findProductByCategory(req.params.categoryId);
            return res.status(200).json({
                message: result.message,
                data: result.data
            })
        } catch (err) {
            return res.status(500).json({
                message: "Lỗi không xác định!"
            })
        }
    },
}