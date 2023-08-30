// import { PrismaClient } from '@prisma/client'
// const prisma = new PrismaClient()

// interface Response {
//     status: boolean;
//     message: string;
//     data?: any; // Include this line for methods that return data
// }

// export default {

//     create: async function (newUser: any): Promise<Response> {
//         try {
//             await prisma.users.create({
//                 data: newUser
//             })

//             return {
//                 status: true,
//                 message: "Register thành công!",
//             }
//         } catch (err: any) {
//             if (err.meta?.target == "users_email_key") {
//                 try {
//                     let user = await prisma.users.findUnique({
//                         where: {
//                             email: newUser.email,
//                             email_confirm: false
//                         }
//                     })
//                     if (!user) {
//                         return {
//                             status: false,
//                             message: "Email đã tồn tại!"
//                         }
//                     } else {
//                         let nowDay = new Date(Date.now());
//                         let flag = false;
//                         if (nowDay.getFullYear() == user.create_at.getFullYear()
//                             && nowDay.getMonth() == user.create_at.getMonth()
//                             && nowDay.getDay() == user.create_at.getDay()
//                         ) {
//                             if (nowDay.getHours() == user.create_at.getHours()) {
//                                 if (nowDay.getMinutes() - user.create_at.getMinutes() > 5) {
//                                     flag = true;
//                                 } else {
//                                     return {
//                                         status: false,
//                                         message: `Email đã tồn tại nhưng chưa được kích hoạt, sau ${5 - (nowDay.getMinutes() - user.create_at.getMinutes())} phút thử đăng ký lại!`
//                                     }
//                                 }
//                             } else {
//                                 flag = true;
//                             }
//                         } else {
//                             flag = true;
//                         }

//                         if (flag) {
//                             try {
//                                 console.log("create replace", this)

//                                 await prisma.users.update({
//                                     where: {
//                                         email: newUser.email
//                                     },
//                                     data: {
//                                         email: `${Date.now() * Math.random()}@fakemail.com`
//                                     }
//                                 })

//                                 return await this.create(newUser);
//                             } catch (err) {
//                                 return {
//                                     status: false,
//                                     message: "Email đã tồn tại!"
//                                 }
//                             }
//                         }
//                     }
//                 } catch (err) {
//                     return {
//                         status: false,
//                         message: "Hệ thống bận, thử lại sau!"
//                     }
//                 }
//             }
//             return {
//                 status: false,
//                 message: "Đăng ký thất bại!"
//             }
//         }
//     },
// }