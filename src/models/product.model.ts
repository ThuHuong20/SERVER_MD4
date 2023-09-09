import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default {
    create: async function (newProduct: any, productPictures: any) {
        try {
            let product = await prisma.products.create({
                data: {
                    ...newProduct,
                    productPictures: {
                        createMany: {
                            data: [
                                ...productPictures
                            ]
                        }
                    }
                },
                include: {
                    productPictures: true
                }
            });

            return {
                status: true,
                message: "Create product ok!",
                data: product
            }
        } catch (err) {
            console.log("🚀 ~ file: product.model.ts:29 ~ err:", err)
            return {
                status: false,
                message: "Lỗi model",
                data: null
            }
        }
    },
    findById: async function (id: string) {
        try {
            let product = await prisma.products.findUnique({
                where: {
                    id: id
                },
                include: {
                    productPictures: true
                }
            });
            return {
                message: "Get products success!",
                data: product
            }
        } catch (err) {
            console.log(" err:", err)
            return {
                status: false,
                message: "Lỗi không xác định findbyid!"
            }
        }
    },
    /* phan trang */
    findMany: async function (maxItemPage: number, skipItem: any) {
        try {
            let products = await prisma.products.findMany({
                take: maxItemPage,
                skip: skipItem,
            });
            let countItem = (await prisma.products.findMany()).length;
            let maxPage = Math.ceil(countItem / maxItemPage);
            return {
                status: true,
                message: "san pham duoc tim thay!",
                maxPage,
                data: products,
            }
        } catch (err) {
            console.log("🚀 ~ file: product.model.ts:72 ~ err:", err)
            return {
                status: false,
                message: "lỗi model!"
            }
        }
    },
    // findAllProduct: async function () {
    //     try {
    //         let products = await prisma.products.findMany();
    //         return {
    //             status: true,
    //             message: "san pham duoc tim thay!",
    //             data: products
    //         }
    //     } catch (err) {
    //         return {
    //             status: false,
    //             message: "lỗi!"
    //         }
    //     }
    // },
    /* Cart */


}