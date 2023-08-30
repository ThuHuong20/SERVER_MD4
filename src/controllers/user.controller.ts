// import userModel from "../models/user.model";
// import { Request, Response } from "express";
// import bcrypt from 'bcrypt';
// import path from 'path';
// import jwt from '../services/jwt';
// import ipService from '../services/ip/';
// import ejs from 'ejs'

// interface UserRequestBody {
//     user_name: string;
//     email: string;
//     password: string;
// }

// export default {
//     create: async (req: Request, res: Response) => {
//         try {
//             req.body.password = await bcrypt.hash(req.body.password, 10);
//             let modelRes = await userModel.create(req.body as UserRequestBody);

//             /* Xử lý email */
//             try {
//                 if (modelRes.status) {
//                     let token = jwt.createToken({
//                         user_name: req.body.user_name,
//                         email: req.body.email,
//                     }, 300000);

//                     if (!token) {
//                         return res.status(200).json({
//                             message: "Registration is successful, but sending email failed!",
//                         });
//                     }
//                     let template = await ejs.renderFile(
//                         path.join(__dirname, "../templates/email_confirm.ejs"),
//                         { user: req.body, token }
//                     );

//                     if (modelRes.status) {
//                         let mailOptions = {
//                             to: req.body.email,
//                             subject: "Email verification!",
//                             html: template,
//                         };
//                         // let mailSent = await mailService.sendMail(mailOptions);
//                         // if (mailSent) {
//                         //     modelRes.message += " Email verified, please check!";
//                         // }
//                     }
//                 }
//             } catch (err) {
//                 modelRes.message += "Error in sending verification email, you can resend email in profile";
//             }

//             res.status(modelRes.status ? 200 : 229).json(modelRes);
//         } catch (err) {
//             return res.status(500).json({
//                 message: "Lỗi xử lý!",
//             });
//         }
//     },
//     // confirm: async (req: Request, res: Response) => {
//     //     let decode = jwt.verifyToken(req.params.token);

//     //     if (!decode) {
//     //         return res.send("Email has expired!");
//     //     }
//     //     try {
//     //         let modelRes = await userModel.confirm(decode);

//     //         res.status(modelRes.status ? 200 : 229).send("successfully confirmed");
//     //     } catch (err) {
//     //         return res.status(500).json({
//     //             message: "Bad request !",
//     //         });
//     //     }
//     // },
// };
