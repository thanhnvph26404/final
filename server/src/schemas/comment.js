import joi from "joi"
import { errorMessages } from "./component/function"
export const commentSchema = joi.object({
    product: joi
        .string()
        .required()
        .messages(errorMessages("sản phẩm")),
    name: joi
        .string()
        .required()
        .messages(errorMessages("tên")),
    email: joi
        .string()
        .email()
        .messages(errorMessages("tài khoản")),
    comment: joi
        .string()
        .required()
        .messages(errorMessages("bình luận"))
    , feedback: joi
        .number()
        .required()
        .messages(errorMessages("đánh giá"))

})