import size from "../models/size";
import { sizeSchema } from "../schemas/size";

export const getAll = async (req, res) => {
    try {
        const data = await size.find();

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

export const getOne = async (req, res) => {
    try {
        const data = await size.findByIdAndDelete(req.params.id);

        if (!data || data.length === 0) {
            return res.status(404).json({
                message: "Không có thông tin",
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

export const create = async (req, res) => {
    try {
        const { error } = sizeSchema.validate(req.body, { abortEarly: false });
        if (error) {
            const errors = error.details.map((err) => err.message);
            return res.status(400).json({
                message: errors,
            });
        }

        const data = await size.create(req.body);

        if (!data || data.length === 0) {
            return res.status(404).json({
                message: "Không thêm được size",
            });
        }

        return res.status(200).json({
            message: "Thêm size thành công ",
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
        const data = await size.findByIdAndDelete(req.params.id);

        if (!data || data.length === 0) {
            return res.status(404).json({
                message: "Xóa size thất bại",
            });
        }

        return res.status(200).json({
            message: "Xóa size thành công ",
        });
    } catch (error) {
        return res.status(500).json({
            message: "Lỗi server: " + error.message,
        });
    }
};

export const update = async (req, res) => {
    try {
        const { error } = sizeSchema.validate(req.body, { abortEarly: false });
        if (error) {
            const errors = error.details.map((err) => err.message);
            return res.status(400).json({
                message: errors,
            });
        }

        const data = await size.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });

        if (!data) {
            return res.status(404).json({
                message: "Cập nhật size thất bại",
            });
        }

        return res.status(200).json({
            message: "Cập nhật size thành công ",
            data: data,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Lỗi server: " + error.message,
        });
    }
};