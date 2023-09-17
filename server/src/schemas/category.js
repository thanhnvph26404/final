import joi from "joi";

import { errorMessages } from "./component/function";

export const categorySchema = joi.object( {
  title: joi.string().required().messages( errorMessages( "Danh mục" ) ),
  image: joi
    .array()
    .min( 1 )
    .required()
    .items(
      joi.object( {
        status: joi.string().required().messages( errorMessages( "Trạng thái" ) ),
        name: joi.string().required().messages( errorMessages( "Tên" ) ),
        uid: joi.string().required().messages( errorMessages( "Uid" ) ),
        url: joi.string().required().messages( errorMessages( "Đường dẫn" ) ),
      } )
    )
    .messages( errorMessages( "Ảnh" ) ),
} );