import joi from "joi";

import { errorMessages } from "./component/function";

export const authSchema = joi.object( {
    name: joi.string().required().messages( errorMessages( "Tên" ) ),
    email: joi.string().email().required().messages( errorMessages( "email" ) ),
    phone: joi.string().required().messages( errorMessages( "số điện thoại" ) ),
    address: joi.string().required().messages( errorMessages( "thành phố" ) ),
    Address: joi.string().required().messages( errorMessages( "huyện" ) ),
    country: joi.string().required().messages( errorMessages( "làng,ngõ xóm" ) ),
    role: joi.string().required().messages( errorMessages( "quyền" ) ),
} );
