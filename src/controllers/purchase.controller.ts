import purchaseModel from "../models/purchase.model";
import { Request, Response } from "express";
import mail, { templates } from "../services/mail";
import otps from "../services/otps";

export default {

    createGuestReceipt: async function (req: Request, res: Response) {
        try {
            let newGuestReceipt = req.body.newGuestReceipt;
            let guestReceiptDetailList = req.body.guestReceiptDetailList;
            let modelRes = await purchaseModel.createGuestReceipt(newGuestReceipt, guestReceiptDetailList);
            /* Maill */
            await mail.sendMail({
                to: `${modelRes.data?.email}`,
                subject: "Hóa đơn",
                html: await templates.reportReceiptTemplate(modelRes.data)
            })
            //modelRes.data?.guestReceiptDetail[0].quantity
            /* End */
            return res.status(modelRes.status ? 200 : 213).json(modelRes);
        } catch (err) {
            console.log("err", err)
            return res.status(500).json({
                message: "Lỗi controller"
            })
        }
    },
    findGuestReceipt: async function (req: Request, res: Response) {

        try {
            let modelRes = await purchaseModel.findGuestReceipt(String(req.body.guestEmail));
            if (req.body.otp) {
                /* có otp */
                let result = otps.checkOtp(String(req.body.guestEmail), String(req.body.otp))
                if (result) {
                    return res.status(modelRes.status ? 200 : 213).json(modelRes);
                }
            } else {
                /* chưa có otp */
                if (modelRes.status && modelRes.data != null) {
                    if (modelRes.data?.length > 0) {
                        let otpObj = otps.createOtp(String(req.body.guestEmail), 5);
                        if (otpObj) {
                            /* gửi otp tới cho khách */
                            let mailSent = await mail.sendMail({
                                subject: "Gửi OTP",
                                to: `${String(req.body.guestEmail)}`,
                                html: templates.sendOtp(otpObj?.otp, new Date(otpObj?.createAt))
                            })
                            return res.status(mailSent ? 200 : 213).json({
                                message: `${mailSent ? "OTP sent to email" : "Lỗi dịch vụ"}`
                            });
                        }
                    } else {
                        return res.status(213).json({
                            message: "Quý khách chưa phát sinh giao dịch!"
                        });
                    }
                }
            }
            return res.status(213).json({
                message: "OTP Không hợp lệ!"
            });
        } catch (err) {
            return res.status(500).json({
                message: "Lỗi controller"
            })
        }
    },
    findUserReceipt: async function (req: Request, res: Response) {
        try {
            let modelRes = await purchaseModel.findUserReceipt(req.body.user);

            return res.status(modelRes.status ? 200 : 213).json(modelRes);
        } catch (err) {
            return res.status(500).json({
                message: "Lỗi controller"
            })
        }
    },
    findManyGuest: async function (req: Request, res: Response) {
        try {
            let modelRes = await purchaseModel.findManyGuest();
            return res.status(modelRes.status ? 200 : 213).json(modelRes);
        } catch (err) {
            return res.status(500).json({
                message: "Lỗi controller"
            })
        }
    },
    update: async function (req: Request, res: Response) {
        try {
            let modelRes = await purchaseModel.update(String(req.params.orderId), {
                state: req.body.state
            }, req.body.type);
            return res.status(modelRes.status ? 200 : 213).json(modelRes);
        } catch (err) {
            return res.status(500).json({
                message: (new Text(String(req.headers.language)) as any).controllerErr
            })
        }
    },
    findById: async function (req: Request, res: Response) {
        try {
            let modelRes = await purchaseModel.findById(req.params.orderId);
            return res.status(modelRes.status ? 200 : 213).json(modelRes);
        } catch (err) {
            return res.status(500).json({
                message: (new Text(String(req.headers.language)) as any).controllerErr
            })
        }
    },
}