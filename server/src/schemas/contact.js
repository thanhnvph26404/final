import joi from "joi"
import { errorMessages } from "./component/function"
export const contactSchema = joi.object( {
    name: joi.string().required().messages( errorMessages( "tên " ) ),
    email: joi.string().email().required().messages( errorMessages( "email " ) ),

    phone: joi.string().required().messages( errorMessages( "phone " ) ),
    address: joi.string().optional(),
    content: joi.string().required().messages( errorMessages( "content " ) ),

} )