import userModel, { NewUsers } from "../models/user.model";
import { Request, Response } from "express";
import Text from '../text'

export default {
    register: async function (req: Request, res: Response) {
        try {
            let newUser: NewUsers = {
                ...req.body,
                // address: [
                //     {
                //         districtId: 1,
                //         districtName: "quan 1",
                //         provinceId: 5,
                //         provinceName: "HCM",
                //         wardCode: "123",
                //         wardName: "Ward 123",
                //         title: "nha rieng",
                //         id: String(Date.now() * Math.random())
                //     }
                // ],
                createAt: new Date(Date.now()),
                updateAt: new Date(Date.now())
            }
            let modelRes = await userModel.register(newUser);
            modelRes.message = (Text(String(req.headers.language)) as any)[modelRes.message]
            return res.status(modelRes.status ? 200 : 213).json(modelRes);
        } catch (err) {
            return res.status(500).json({
                message: Text(String(req.headers.language)).controllerErr
            });
        }
    }
}