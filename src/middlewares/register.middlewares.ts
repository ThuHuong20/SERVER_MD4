import { Response, Request, NextFunction } from "express";
import userModel from "../models/user.model";

export default {
    validateRegistration: async function (req: Request, res: Response, next: NextFunction) {
        try {
            const { email, userName, password } = req.body;
            // Kiểm tra xem các trường bắt buộc đã được điền
            if (!email || !userName || !password) {
                return res.status(400).json({ message: "Tất cả các trường là bắt buộc." });
            }
            // Kiểm tra xem mật khẩu có ít nhất 6 ký tự
            if (password.length < 6) {
                return res.status(400).json({ message: "Mật khẩu phải có ít nhất 6 ký tự." });
            }
            // Kiểm tra xem email đã được sử dụng chưa
            const existingUser = await userModel.findByEmail(email);
            if (existingUser) {
                return res.status(400).json({ message: "Email đã được sử dụng." });
            }

            // Nếu tất cả điều kiện đúng, tiếp tục đến middleware hoặc route tiếp theo
            next();
        } catch (error) {
            console.error("Lỗi trong quá trình kiểm tra đăng ký:", error);
            res.status(500).json({ message: "Lỗi máy chủ nội bộ." });
        }
    }
};
