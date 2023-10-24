import { valueAttributeSchema } from "../schemas/valueattribute"; 
import ValueAttribute from "../models/valueAttribute"
import valueAttribute from "../models/valueAttribute";


export const create = async (req, res) => {
    try {
      const { error } = valueAttributeSchema.validate(req.body, { abortEarly: false });
      if (error) {
        const errors = error.details.map((err) => err.message);
        return res.status(400).json({
          message: errors,
        });
      }
  
      const data = await ValueAttribute.create(req.body);
      if (!data || data.length === 0) {
        return res.status(404).json({
          message: "Không thêm được giá trị thuộc tính",
        });
      }
  
      return res.status(200).json({
        message: "Thêm giá trị thuộc tính thành công ",
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
      const data = await ValueAttribute.find().populate("attribute");
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
      const data = await ValueAttribute.findByIdAndDelete(req.params.id);
      
      if (!data || data.length === 0) {
        return res.status(404).json({
          message: "Xóa giá trị thuộc tính thất bại",
        });
      }
      
      return res.status(200).json({
        message: "Xóa giá trị thuộc tính thành công ",
      });
    } catch (error) {
      return res.status(500).json({
        message: "Lỗi server: " + error.message,
      });
    }
};

export const update = async (req, res) => {
    try {
      const { error } = valueAttributeSchema.validate(req.body, { abortEarly: false });
      if (error) {
        const errors = error.details.map((err) => err.message);
        return res.status(400).json({
          message: errors,
        });
      }
  
      const data = await valueAttribute.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
  
      if (!data) {
        return res.status(404).json({
          message: "Cập nhật giá trị thuộc tính thất bại",
        });
      }
  
      return res.status(200).json({
        message: "Cập nhật giá trị thuộc tính thành công ",
        data: data,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Lỗi server: " + error.message,
      });
    }
  };