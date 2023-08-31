// import jwt from "../services/jwt";
// import { Request, Response, NextFunction } from "express";

// interface TokenData {
//     id: string;
//     email_confirm: boolean;
//     data: any;
// }

// export default {
//     checkResendEmail: function (req: Request, res: Response, next: NextFunction) {
//         if (!req.headers.authorization) {
//             return res.status(200).json({
//                 message: "Please login!"
//             });
//         }
//         let tokenCheck = jwt.verifyToken(req.headers.authorization);
//         if (!tokenCheck) {
//             return res.status(200).json({
//                 message: "Token invalid!"
//             });
//         }

//         if (!tokenCheck.data.email_confirm) {
//             req.body = tokenCheck.data;
//             next();
//         } else {
//             return res.status(200).json({
//                 message: "Email đã được xác thực!"
//             });
//         }
//     },
//     checkChangePassword: function (req: Request, res: Response, next: NextFunction) {
//         if (!req.headers.authorization) {
//             return res.status(200).json({
//                 message: "Please login!"
//             });
//         }
//         let tokenCheck = jwt.verifyToken(req.headers.authorization);
//         if (!tokenCheck) {
//             return res.status(200).json({
//                 message: "Token invalid!"
//             });
//         }
//         req.body.data = tokenCheck.data;
//         next();
//     },

//     // add to cart check nguoi dawng nhap
//     checkToken: function (req: Request, res: Response, next: NextFunction) {
//         if (!req.headers.authorization) {
//             return res.status(213).json({
//                 message: "Please login!"
//             });
//         }
//         let decode = jwt.verifyToken(req.headers.authorization);
//         if (!decode) {
//             return res.status(213).json({
//                 message: "Token invalid!"
//             });
//         }
//         if (req.params.user_id !== decode.data.id) {
//             return res.status(213).json({
//                 message: "Token invalid!"
//             });
//         }

//         next();
//     },
// };
