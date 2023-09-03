import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export type Address = {
    provinceId: number
    provinceName: string
    districtId: number
    districtName: string
    wardCode: string
    wardName: string
    title: string
    id: string
}
export interface NewUsers {
    email: string,
    userName: string,
    password: string,
    avatar?: string,
    createAt: Date,
    updateAt?: Date,
    address?: Address[]
}
export interface UpdateUser {
    email?: string,
    userName?: string,
    password?: string,
    avatar?: string,
    createAt?: Date,
    updateAt: Date,
    emailComfirm: boolean,
    isActive: boolean,
    address?: Address[]
}


interface PrismaErr {
    code?: string,
    meta?: {
        target: string
    },
    clientVersion?: string
}

export default {
    register: async function (newUser: NewUsers) {
        try {
            let user = await prisma.users.create({
                data: newUser
            })
            return {
                status: true,
                data: user,
                message: "registerSucsess"
            }
        } catch (err) {
            let message: string = "modelErr";
            switch ((err as PrismaErr).meta?.target) {
                case "users_userName_key":
                    message = "userNameDuplicate"
                    break
                case "users_email_key":
                    message = 'emailNameDuplicate'
                    break
                default:
            }
            return {
                status: false,
                data: null,
                message
            }
        }
    },
    update: async function (userId: string, data: UpdateUser) {
        try {
            let user = await prisma.users.update({
                where: {
                    id: userId
                },
                data
            })
            return {
                status: true,
                data: user,
                message: "up date thanh cong"
            }
        } catch (err) {
            let message: string = "modelErr";
            switch ((err as PrismaErr).meta?.target) {
                case "users_email_key":
                    message = 'emailNameDuplicate'
                    break
                default:
            }
            return {
                status: false,
                data: null,
                message
            }
        }
    },
    inforById: async function (userId: string) {
        try {
            let user = await prisma.users.findUnique({
                where: {
                    id: userId
                }
            })
            return {
                status: true,
                data: user,
                message: "lay thong tin thanh cong"
            }
        } catch (err) {
            let message: string = "modelErr";
            return {
                status: false,
                data: null,
                message
            }
        }
    },
    inforByUserName: async function (userName: string) {
        try {
            let user = await prisma.users.findUnique({
                where: {
                    userName
                }
            })

            return {
                status: true,
                data: user,
                message: "Lấy thông tin thành công!"
            }
        } catch (err) {
            let message: string = "modelErr";
            return {
                status: false,
                data: null,
                message
            }
        }
    }
}