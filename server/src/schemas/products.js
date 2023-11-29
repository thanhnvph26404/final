import joi from "joi";
import { errorMessages } from "./component/function";

export const productSchema = joi
  .object( {
    sold: joi
      .number()
      .min( 0 )
      .default( 0 )
      .messages( errorMessages( "đã bán" ) ),
    name: joi.
      string()
      .required()
      .messages( errorMessages( "Tên" ) ),
    price: joi.number()
      .min( 0 )
      .required()
      .messages( errorMessages( "Giá" ) ),
    description: joi
      .string()
      .required()
      .messages( errorMessages( "Mô tả" ) ),
    // images: joi
    //   .array()
    //   .min( 1 )
    //   .required()
    //   .items(
    //     joi.object( {
    //       uid: joi.string().required().messages( errorMessages( "Uid" ) ),
    //       url: joi.string().required().messages( errorMessages( "Đường dẫn" ) ),
    //     } )
    //   )
    // .messages( errorMessages( "Ảnh" ) ),
    ProductVariants: joi
      .array()
      .required(),
    category: joi
      .string()
      .required()
      .messages( errorMessages( "Danh mục" ) ),
    brand: joi
      .string()
      .required()
      .messages( errorMessages( "thương hiệu " ) ),
    comments: joi.any()

  } )
  .unknown( true );
