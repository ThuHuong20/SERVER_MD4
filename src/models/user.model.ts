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
    }
}