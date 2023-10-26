import Order from '../models/order';
import { orderSchema } from "../schemas/order"

export const createOrder = async (req, res) => {
    try {
        // Kiểm tra dữ liệu đầu vào
        const { error } = orderSchema.validate(req.body, { abortEarly: false });
        if (error) {
            const errors = error.details.map((err) => err.message);
            return res.status(400).json({
                message: errors
            });
        }

        const newOrder = new Order(req.body);
        const createdOrder = await newOrder.save();
        res.status(201).json({
            order: createdOrder,
            message: "Tạo đơn hàng thành công"
        });
    } catch (error) {
        res.status(500).json({ message: "Lỗi server: " + error.message });
    }
};

export const updateOrder = async (req, res) => {
    try {
        // Kiểm tra dữ liệu đầu vào
        const { error } = orderSchema.validate(req.body, { abortEarly: true });
        if (error) {
            const errors = error.details.map((err) => err.message);
            return res.status(400).json({
                errors
            });
        }

        const updatedOrder = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedOrder) {
            return res.status(404).json({ message: "Cập nhật đơn hàng không thành công" });
        }
        res.status(200).json({
            order: updatedOrder,
            message: "Cập nhật đơn hàng thành công"
        });
    } catch (error) {
        res.status(500).json({ message: "Lỗi server: " + error.message });
    }
};

export const deleteOrder = async (req, res) => {
    try {
        const deletedOrder = await Order.findByIdAndRemove(req.params.id);
        if (!deletedOrder) {
            return res.status(404).json({ message: "Xóa đơn hàng không thành công" });
        }
        res.status(200).json({ message: "Xóa đơn hàng thành công" });
    } catch (error) {
        res.status(500).json({ message: "Lỗi server: " + error.message });
    }
};

export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find();
        res.status(200).json({
            orders,
            message: "Danh sách đơn hàng"
        });
    } catch (error) {
        res.status(500).json({ message: "Lỗi server: " + error.message });
    }
};

export const getOneOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) {
            return res.status(404).json({ message: "Không tìm thấy đơn hàng" });
        }
        res.status(200).json({
            order,
            message: "Thông tin đơn hàng"
        });
    } catch (error) {
        res.status(500).json({ message: "Lỗi server: " + error.message });
    }
};
