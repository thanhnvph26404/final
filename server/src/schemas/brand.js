import joi from "joi"
import { errorMessages } from "./component/function"
export const brandSchema = joi.object( {
    title: joi.string().required().messages( errorMessages( "tên thương hiệu  " ) ),
} )