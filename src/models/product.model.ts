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
            return {
                status: false,
                message: "lỗi model!"
            }
        }
    },

    /* Search */

    findProductByName: async function (nameString: any) {
        console.log("name string", String(nameString));

        try {
            const result = await prisma.products.findMany({
                where: {
                    name: {
                        contains: nameString,
                        mode: 'insensitive', // Default value: default
                    }
                },
                // include: {
                //     productPictures: true
                // }
            })


            return {
                status: true,
                message: "findProductByName successfull ! ",
                data: result
            }

        } catch (err) {
            return {
                status: false,
                message: "search product that bai "
            }
        }
    },

    update: async function (productId: any, data: any) {
        console.log("productId", productId);
        console.log("data", data);
        try {
            const product = await prisma.products.update({
                where: {
                    id: productId
                },
                data: {
                    ...data
                }
            })
            return {
                status: true,
                message: "Update sản phẩm thành công!",
                data: product
            }
        } catch (err) {
            console.log("err", err);

            return {
                status: false,
                message: "Lỗi không xác định!"
            }
        }
    },

}