import joi from "joi"
import { errorMessages } from "./component/function"
export const attributeSchema = joi.object( {
    title: joi.string().required().messages( errorMessages( "Thuộc tính" ) )
} )