import joi from "joi"
import { errorMessages } from "./component/function"
export const commentSchema = joi.object({
    name: joi.string().required().messages(errorMessages("tên")),
    email: joi.string().email().messages(errorMessages("tài khoản")),
    comment: joi.string().required().messages(errorMessages("bình luận"))

})