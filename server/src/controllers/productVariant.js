import { productVariantSchema } from "../schemas/productVariant"; 
import productVariant from "../models/productVariant"; 


export const create = async (req, res) => {
    try {
      const { error } = productVariantSchema.validate(req.body, { abortEarly: false });
      if (error) {
        const errors = error.details.map((err) => err.message);
        return res.status(400).json({
          message: errors,
        });
      }
  
      const data = await productVariant.create(req.body);
      if (!data || data.length === 0) {
        return res.status(404).json({
          message: "Không thêm được biến thể sản phẩm",
        });
      }
  
      return res.status(200).json({
        message: "Thêm biến thể sản phẩm ",
        data: data,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Lỗi server: " + error.message,
      });
    }
};


export const getAll = async (req, res) => {
  try {
    const data = await productVariant.find().populate({ path: "AttributeValues", populate: "attribute" })
    if (!data || data.length === 0) {
      return res.status(404).json({
        message: "Không có danh sách",
      });
    }

    return res.status(200).json({
      data: data,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Lỗi server: " + error.message,
    });
  }
};


export const remove = async (req, res) => {
  try {
    const data = await productVariant.findByIdAndDelete(req.params.id);
    
    if (!data || data.length === 0) {
      return res.status(404).json({
        message: "Xóa biến thể sản phẩm thất bại",
      });
    }
    
    return res.status(200).json({
      message: "Xóa biến thể sản phẩm thành công ",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Lỗi server: " + error.message,
    });
  }
};

export const update = async (req, res) => {
  try {
    const { error } = productVariantSchema.validate(req.body, { abortEarly: false });
    if (error) {
      const errors = error.details.map((err) => err.message);
      return res.status(400).json({
        message: errors,
      });
    }

    const data = await productVariant.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!data) {
      return res.status(404).json({
        message: "Cập nhật biến thể sản phẩm thất bại",
      });
    }

    return res.status(200).json({
      message: "Cập nhật biến thể sản phẩm thành công ",
      data: data,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Lỗi server: " + error.message,
    });
  }
};