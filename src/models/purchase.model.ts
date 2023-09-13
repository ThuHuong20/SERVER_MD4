import { PrismaClient, ReceiptPayMode, ReceiptState } from '@prisma/client'
const prisma = new PrismaClient()

interface NewGuestReceiptDetail {
    productId: string;
    quantity: number;
}

interface GuestReceiptDetail extends NewGuestReceiptDetail {
    id: string;
    guestReceiptId: string;
}


interface NewGuestReceipt {
    email: string;
    phoneNumber: string;
    total: number;
    payMode: ReceiptPayMode;
    paid?: boolean;
}

interface GuestReceipt extends NewGuestReceipt {
    id: string;
    state?: ReceiptState;
    createAt: Date;
    acceptTime?: Date;
    shippingTime?: Date;
    doneTime?: Date;
    guestReceiptDetail: GuestReceiptDetail[];
}

/* userRecipt */

interface NewUserReceiptDetail {
    productId: string;
    quantity: number;
}

interface UserReceiptDetail extends NewUserReceiptDetail {
    id: string;
    userReceiptId: string;
}


interface NewUserReceipt {
    email: string;
    phoneNumber: string;
    total: number;
    payMode: ReceiptPayMode;
    paid?: boolean;
}

interface userReceipt extends NewUserReceipt {
    id: string;
    state?: ReceiptState;
    createAt: Date;
    acceptTime?: Date;
    shippingTime?: Date;
    doneTime?: Date;
    userReceiptDetail: UserReceiptDetail[];
}
export default {
    createGuestReceipt: async function (newGuestReceipt: NewGuestReceipt, guestReceiptDetailList: NewGuestReceiptDetail[]) {
        try {
            let receipt = await prisma.guestReceipts.create({
                data: {
                    ...newGuestReceipt,
                    guestReceiptDetail: {
                        createMany: {
                            data: guestReceiptDetailList
                        }
                    }
                },
                include: {
                    guestReceiptDetail: {
                        include: {
                            product: true
                        }
                    }
                }
            })
            return {
                status: true,
                message: "Order thành công!",
                data: receipt
            }
        } catch (err) {
            return {
                status: false,
                message: "Lỗi model!",
                data: null
            }
        }
    },

    findGuestReceipt: async function (guestEmail: string) {
        try {
            let receipts = await prisma.guestReceipts.findMany({
                where: {
                    email: guestEmail
                },
                include: {
                    guestReceiptDetail: {
                        include: {
                            product: true
                        }
                    }
                }
            })
            return {
                status: true,
                message: "Lấy danh sách order thành công! ",
                data: receipts
            }
        } catch (err) {
            return {
                status: false,
                message: "Lỗi model!",
                data: null
            }
        }
    },
    findUserReceipt: async function (user: any) {
        try {
            let receipts = await prisma.userReceipts.findMany({
                where: {
                    user
                },
                include: {
                    userReceiptDetail: true
                }
            })
            return {
                status: true,
                message: "Lấy danh sách order thành công! ",
                data: receipts
            }
        } catch (err) {
            return {
                status: false,
                message: "Lỗi model!",
                data: null
            }
        }
    },
    findManyGuest: async function () {
        try {
            const result = await prisma.guestReceipts.findMany({
                include: {
                    guestReceiptDetail: {
                        include: {
                            product: true
                        }
                    }
                }
            })
            return {
                status: true,
                message: "findGuest successfull ! ",
                data: result
            }

        } catch (err) {
            console.log("🚀 ~ file: purchase.model.ts:193 ~ err:", err)
            return {
                status: false,
                message: "loi model product "
            }
        }
    },
    findById: async function (orderId: string) {
        try {
            let order = await prisma.guestReceipts.findUnique({
                where: {
                    id: orderId
                },
                include: {
                    guestReceiptDetail: {
                        include: {
                            product: true
                        }
                    }
                }
            })
            return {
                status: true,
                message: "get Guest Receipt by Id successfully",
                data: order
            }
        } catch (err) {
            return {
                status: false,
                message: "modelErr",
                data: null
            }
        }
    },
    update: async function (receiptId: string, updateData: {
        acceptTime?: Date,
        shippingTime?: Date,
        doneTime?: Date,
        state: ReceiptState
    }, type: boolean) { // type false: guest, true: user
        try {
            if (type) {
                return {
                    status: true,
                    message: "Update ok!",
                    data: null
                }
            } else {
                let updateDataTemp = {
                    state: updateData.state,
                    ...(
                        updateData.state == "ACCEPTED" ? {
                            acceptTime: new Date(Date.now())
                        } : updateData.state == "SHIPPING" ? {
                            shippingTime: new Date(Date.now()),
                        } : updateData.state == "DONE" ? {
                            doneTime: new Date(Date.now())
                        } : {}
                    )
                }
                let receipt = await prisma.guestReceipts.update({
                    where: {
                        id: receiptId
                    },
                    data: {
                        ...updateDataTemp
                    }
                })

                return {
                    status: true,
                    message: "Update ok!",
                    data: receipt
                }
            }
        } catch (err) {
            return {
                status: false,
                message: "Model lỗi!",
                data: null
            }
        }
    }
}