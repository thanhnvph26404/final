// const express = require('express');
import express from 'express';
import
{
    createOrder,
    getAllOrders,
    getOneOrder,
    updateOrder,
    deleteOrder,
    calculateTotalAmount,
    calculatetotalAmountday,
    calculatetotalAmountmonth,
    calculatetotalAmountyear,
    calculateTotalProductsSold,
    calculateProductsSoldPerMonth,
} from '../controllers/order'; // Đảm bảo chỉ đường dẫn đúng định dạng
import { authMiddlware } from '../middleware/checkPermission';

const router = express.Router();

router.post( '/create', authMiddlware, createOrder ); // Tạo một đơn hàng mới
router.get( '/list', getAllOrders ); // Lấy tất cả các đơn hàng
router.get( '/get/:id', getOneOrder ); // Lấy một đơn hàng theo ID
router.put( '/update/:id', updateOrder ); // Cập nhật một đơn hàng theo ID
router.delete( '/delete/:id', deleteOrder );
router.get( '/totalOrder', calculateTotalAmount );
router.post( '/totalOrderaday', calculatetotalAmountday ); // Xóa một đơn hàng theo ID
router.post( '/totalOrderamonth', calculatetotalAmountmonth );
router.post( '/totalOrderyear', calculatetotalAmountyear ); // Xóa một đơn hàng theo ID
router.post( '/productsSold', calculateTotalProductsSold ); // Xóa một đơn hàng theo ID
router.post( '/productsmonthSold', calculateProductsSoldPerMonth ); // Xóa một đơn hàng theo ID


// Xóa một đơn hàng theo ID
// Xóa một đơn hàng theo ID
// Xóa một đơn hàng theo ID

export default router;