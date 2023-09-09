import purchaseModel from "../models/purchase.model";
import { Request, Response } from "express";

export default {
    createGuestReceipt: async function (req: Request, res: Response) {
        try {
            let newGuestReceipt = req.body.newGuestReceipt;
            let guestReceiptDetailList = req.body.guestReceiptDetailList;
            let modelRes = await purchaseModel.createGuestReceipt(newGuestReceipt, guestReceiptDetailList);
            return res.status(modelRes.status ? 200 : 213).json(modelRes);
        } catch (err) {
            return res.status(500).json({
                message: "Lỗi controller"
            })
        }
    }
}