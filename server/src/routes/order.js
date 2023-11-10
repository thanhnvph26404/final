import express from 'express';
import
{
    createOrder,
    getAllOrders,
    getOneOrder,
    updateOrder,
    deleteOrder,
} from '../controllers/order'; // Đảm bảo chỉ đường dẫn đúng định dạng
import { authMiddlware } from '../middleware/checkPermission';

const router = express.Router();

router.post( '/create', authMiddlware, createOrder ); // Tạo một đơn hàng mới
router.get( '/list', getAllOrders ); // Lấy tất cả các đơn hàng
router.get( '/get/:id', getOneOrder ); // Lấy một đơn hàng theo ID
router.put( '/update/:id', updateOrder ); // Cập nhật một đơn hàng theo ID
router.delete( '/delete/:id', deleteOrder ); // Xóa một đơn hàng theo ID

export default router;