import joi from "joi"
import { errorMessages } from "./component/function"
export const Colorschema = joi.object( {
    color: joi.string().required().messages( errorMessages( "color" ) )
} )