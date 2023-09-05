import nodemailer from 'nodemailer';

export interface MailOption {
    to: string, // Người nhận
    subject: string, // Chủ Đề
    html?: string, // Template HTML
    text?: string // Văn Bản
}
import emailConfirm from './templates/emailComfirm'
export const templates = {
    emailConfirm: emailConfirm
}
import passwordComfirm from './templates/passwordComfirm'
export const templatess = {
    passwordComfirm: passwordComfirm
}
export default {
    sendMail: async (mailOption: MailOption) => {
        try {
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.MS_USER,
                    pass: process.env.MS_PW
                },
                tls: {
                    rejectUnauthorized: false
                }
            });

            await transporter.sendMail({
                from: process.env.MS_USER,
                ...mailOption
            });

            return true
        } catch (err) {
            return false
        }
    }
}