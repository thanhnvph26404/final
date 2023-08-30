import joi from "joi";

import { errorMessages } from "./component/function";

export const categorySchema = joi.object({
  slug: joi.string().required().messages(errorMessages("Danh mục")),
  brand: joi.string().required().messages(errorMessages("Thương hiệu")),
});