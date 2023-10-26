import Joi from "joi";
import { errorMessages } from "./component/function";

export const orderSchema = Joi.object({
    fullname: Joi.string().required().messages(errorMessages("tên ")),
    phoneNumber: Joi.string().required().messages(errorMessages("số điện thoại ")),
    city: Joi.string().required().messages(errorMessages("thành phố ")),
    district: Joi.string().required().messages(errorMessages("quận/huyện ")),
    commune: Joi.string().optional(),
    detailAddress: Joi.string().required().messages(errorMessages("địa chỉ chi tiết ")),
    orderStatus: Joi.string().valid(
        "Đang chờ duyệt",
        "Đã nhận đơn",
        "Đang giao hàng",
        "Đã hoàn thành"
    ).default("Đang chờ duyệt").required(),
    user: Joi.string().required(), // Sử dụng kiểu dữ liệu phù hợp cho ID của người dùng
    productOrder: Joi.array().items(
        Joi.object({
            product: Joi.object({
                name: Joi.string().required(),
                price: Joi.number().min(0).required(),
                original_price: Joi.number().min(0).required(),
                description: Joi.string().required(),
                images: Joi.array().items(
                    Joi.object({
                        status: Joi.string().default("done"),
                        name: Joi.string().required(),
                        uid: Joi.string().required(),
                        url: Joi.string().required(),
                    })
                ).required(),
                category: Joi.string().required(), // Sử dụng kiểu dữ liệu phù hợp cho ID của danh mục
                comments: Joi.array().items(Joi.string()), // Sử dụng kiểu dữ liệu phù hợp cho ID của bình luận
            }),
            quantity: Joi.number(),
        })
    ),
}).messages(errorMessages("order "));
