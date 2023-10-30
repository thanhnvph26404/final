import joi from "joi"
import { errorMessages } from "./component/function"
export const productVariantSchema = joi.object( {
  AttributeValues: joi
    .array()
    .required()
    .messages( errorMessages( "giá trị Thuộc tính" ) ),
  inventory: joi.number().required().messages( errorMessages( "số lượng" ) )
} )