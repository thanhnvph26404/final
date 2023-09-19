import joi from "joi"
import { errorMessages } from "./component/function"
export const sizeSchema = joi.object({
    title: joi.string().required().messages(errorMessages("tên size ")),
})