// Create a new file, e.g., order.interface.ts

export interface ProductInfo
{
    images: string[];
    name: string;
    brand: string; // You might want to replace this with the actual Brand type
    price: number;
    category: string; // You might want to replace this with the actual Category type
}

export interface OrderItem
{
    product: string; // Replace with the actual Product type
    hasReviewed: boolean;
    productVariant: {
        size: string;
        color: string;
    };
    quantity: number;
    productInfo: ProductInfo;
}

export interface PaymentIntent
{
    id: string;
    method: string;
    amount: number;
    status: string;
    created: number;
    currency: string;
}

export interface Order
{
    _id: string;
    userId: string;
    vouchers?: string; // Replace with the actual Voucher type
    products: OrderItem[];
    total?: number;
    paymentStatus: string;
    status: string;
    totalAfterDiscount?: number;
    paymentIntent?: PaymentIntent;
    phone?: string;
    address?: string;

}

