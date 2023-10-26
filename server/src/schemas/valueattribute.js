import joi from "joi"
import { errorMessages } from "./component/function"
export const valueAttributeSchema = joi.object({
    _id : joi
    .string(),
    attribute: joi
      .string()
      .required()
      .messages( errorMessages( "Thuộc tính" ) ),
    value: joi.string().required().messages( errorMessages( "Giá trị thuộc tính" ) )
} )