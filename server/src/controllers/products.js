import {productSchema } from "../schemas/products"

import Product  from "../models/products"

export const create = async (req, res) => {
    try {
      const { error } = productSchema.validate(req.body, { abortEarly: false });
  
      if (error) {
        const errors = error.details.map((err) => err.message);
        return res.status(400).json({
          message: errors,
        });
      }
  
      const checkCategory = await Category.findById(req.body.category);
      if (!checkCategory) {
        return res.status(400).json({
          message: "Danh mục không tồn tại",
        });
      }
  
      const data = await Product.create(req.body);
  
      if (!data) {
        return res.status(404).json({
          message: "Thêm sản phẩm thất bại",
        });
      }
  
      return res.status(200).json({
        message: "Thêm sản phẩm thành công",
        data: data,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Lỗi server: " + error.message,
      });
    }
  };