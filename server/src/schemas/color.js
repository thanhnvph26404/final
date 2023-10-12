import joi from "joi"
import { errorMessages } from "./component/function"
export const colorSchema = joi.object( {
    title: joi.string().required().messages( errorMessages( "tên màu " ) ),
    code: joi.string().required().messages( errorMessages( "mã màu " ) ),
} )