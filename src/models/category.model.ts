import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default {
    findMany: async function () {
        try {
            let categories = await prisma.categories.findMany();
            return {
                status: true,
                message: "get categories ok!",
                data: categories
            }
        } catch (err) {
            return {
                status: false,
                message: "looix model",
                data: null
            }
        }
    },
    findProductByCategory: async function (id: string) {
        try {
            let products = await prisma.products.findMany({
                where: {
                    categoryId: id
                },
                include: {
                    productPictures: true
                }
            });
            return {
                message: "get Products by Category sucssesfully",
                data: products
            }
        } catch (err) {
            return {
                status: false,
                message: "Lỗi không xác định!"
            }
        }
    },
    readManyRelation: async function (id: string) {
        try {
            let data = await prisma.categories.findUnique({
                where: {
                    id: id
                },
            })
            return {
                status: true,
                message: 'Lay du lieu thanh cong!',
                data
            }
        } catch (err) {
            return {
                status: false,
                message: 'Lay du lieu that bai'
            }
        }
    },
}