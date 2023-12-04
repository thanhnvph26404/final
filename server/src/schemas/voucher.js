import joi from "joi";

import { errorMessages } from "./component/function";

export const voucherSchema = joi.object( {
    name: joi.string().required().messages( errorMessages( "Tên" ) ),
    code: joi.string().required().messages( errorMessages( "Mã" ) ),
    discount: joi.number().required().messages( errorMessages( "Giảm giá" ) ),
    limit: joi.number().min( 0 ).required().messages( errorMessages( "Giới hạn" ) ),
    minimumOrderAmount: joi.number().min( 0 ).required().messages( errorMessages( "Giới hạn tiền" ) ),
    startDate: joi.string().required().messages( errorMessages( "Ngày bắt đầu" ) ),
    endDate: joi.string().required().messages( errorMessages( "Ngày kết thúc" ) ),
} );
