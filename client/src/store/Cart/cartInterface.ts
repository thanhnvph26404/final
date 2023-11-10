import { Iproductdata } from "../products/product.interface";

export interface ICartItem
{
    product: string; // Thay vì sử dụng mongoose.Schema.Types.ObjectId, bạn có thể sử dụng chuỗi
    productVariant: {
        size: string;
        color: string;
    };
    quantity: number;
    productInfo: Iproductdata; // Sử dụng IProductData thay vì tạo lại một cấu trúc tương tự
}

// Interface cho dữ liệu giỏ hàng
export interface ICartData
{
    userId: string;
    items: ICartItem[];
    total: number;
}