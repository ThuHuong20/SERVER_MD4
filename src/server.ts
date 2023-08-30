
import dotenv from 'dotenv';
dotenv.config();

import express from 'express';

/* Tao ra doi tuong server */
const server = express();


import cors from 'cors';
server.use(cors());

import bodyParser from 'body-parser';
server.use(bodyParser.json());

// import { PrismaClient } from '@prisma/client'
// const prisma = new PrismaClient()
// import { Request, Response } from 'express';

// server.use("/test", async (req: Request, res: Response) => {
//     try {
//         let newTest = prisma.tests.create({
//             data: {
//                 title: "Test lần 2"
//             }
//         })
//         let newUser = prisma.users.create({
//             data: {
//                 userName: "admin",
//                 password: "123",
//                 avatar: "abc.png",
//                 email: "1@",
//                 isActive: true,
//                 address: [
//                     {
//                         provinceId: 1,
//                         provinceName: "Tỉnh 1",
//                         districtId: 2,
//                         districtName: "Quân 2",
//                         wardCode: "123",
//                         wardName: "Xã 123",
//                         title: "Nhà Riêng",
//                         id: String(Date.now() * Math.random())
//                     },
//                     {
//                         provinceId: 1,
//                         provinceName: "Tỉnh 1",
//                         districtId: 2,
//                         districtName: "Quân 2",
//                         wardCode: "123",
//                         wardName: "Xã 123",
//                         title: "Công Ty",
//                         id: String(Date.now() * Math.random())
//                     }
//                 ]
//             }
//         })
//         let result = await prisma.$transaction([newTest, newUser])
//         console.log("result", result)
//     } catch (err) {
//         console.log("🚀 ~ file: server.ts:62 ~ server.use ~ err:", err)
//         console.log("lỗi oiff!")
//     }
// })
/* Setup api config */
import apiConfig from './apis'
server.use('/apis', apiConfig)

/* day server ra port tren may */
server.listen(process.env.SERVER_PORT, () => {
    console.log(`Server is running on: http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}/`,);
})