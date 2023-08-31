import joi from "joi";
import { errorMessages } from "./component/function";

const sizesSchema = joi.object({
  size: joi.any().required(),
  inventory: joi.number().min(0).required().messages(errorMessages("Số lượng")),
});

export const productSchema = joi
  .object({
    sold: joi
      .number()
      .min(0)
      .required()
      .messages(errorMessages("đã bán")),
    name: joi.
      string()
      .required()
      .messages(errorMessages("Tên")),
    price: joi.number()
      .min(0)
      .required()
      .messages(errorMessages("Giá")),
    original_price: joi
      .number()
      .min(0)
      .required()
      .messages(errorMessages("Giá gốc")),
    description: joi
      .string()
      .required()
      .messages(errorMessages("Mô tả")),
    images: joi
      .array()
      .min(1)
      .required()
      .items(
        joi.object({
          status: joi.string().required().messages(errorMessages("Trạng thái")),
          name: joi.string().required().messages(errorMessages("Tên")),
          uid: joi.string().required().messages(errorMessages("Uid")),
          url: joi.string().required().messages(errorMessages("Đường dẫn")),
        })
      )
      .messages(errorMessages("Ảnh")),
    sizes: joi
      .array()
      .items(sizesSchema)
      .required(),
    category: joi
      .string()
      .required()
      .messages(errorMessages("Danh mục")),
    comments: joi.any()

  })
  .unknown(true);
