import joi from "joi";

import { errorMessages } from "./component/function";


export const categorySchema = joi.object({
  _id: joi.string(),
  title: joi.string().required().messages(errorMessages("Danh mục")),
  image: joi.object({
    uid: joi.string().required().messages(errorMessages("Uid")),
    url: joi.string().required().messages(errorMessages("Đường dẫn")),
  }),
});

