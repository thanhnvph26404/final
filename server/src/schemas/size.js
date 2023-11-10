import joi from "joi"
import { errorMessages } from "./component/function"
export const sizeSchema = joi.object( {
    size: joi.string().required().messages( errorMessages( "size" ) )
} )