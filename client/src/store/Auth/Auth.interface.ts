import { Iproductdata } from "../products/product.interface";
import { Image } from "../upload/upload.interface";
import { IVoucher } from "../voucher/voucher.interface";

export interface Signup
{
    _id?: string,
    name: string,
    email: string,
    password: string,
    confirmPassword: string,
}
export interface Login
{
    [ x: string ]: any;
    _id?: string,
    email: string,
    password: string
}
export interface Ipuser
{
    users: IUser[]
}
export interface IUser
{
    _id?: string;
    name?: string;
    email?: string;
    password?: string;
    phone?: string;
    address?: string;
    image?: IImageUser;
    cards?: ICardUser[];
    orders?: IOrder[];
    favorites?: string[];
    comments?: ICommentUser[];
    role?: string;
    isBlocked?: boolean;
    wishList?: Iproductdata[],
    vouchers?: IVoucher[],
    country?: string,
    Address?: string

}
export interface IImageUser
{
    _id?: string;
    uid: string;
    url: string;
}

export interface ICardUser
{
    _id?: string;
    card_holder_name: string;
    card_number: number;
    start_date: string;
    end_date: string;
    cvv: number;
    main: boolean;
}


export interface ICommentUser
{
    _id?: string;
}
export interface IOrder
{
    _id?: string;
    userId: string;
    vouchers?: string;
    products: IProductsOrder[];
    total: number;
    status: string;
    totalAfterDiscount?: number;
    paymentIntent?: any;
    phone?: string;
    address?: string;
    payment?: string;
}

export interface IProductsOrder
{
    _id?: string;
    product: string;
    name: string;
    price: number;
    quantity: number;
    images?: Image;
    hasReviewed?: boolean;
}
export const enumStatus = [
    "Đang xử lý",
    "Đã xác nhận",
    "Đang giao hàng",
    "Đơn hàng đang chuẩn bị được giao đến bạn",
    "Đã hoàn thành",



];
export const StatusOrder = [
    "Đang xử lý",
    "Đã xác nhận",
    "Đang giao hàng",
    "Đơn hàng đang chuẩn bị được giao đến bạn",
    "Đã hoàn thành",
    "Đã hủy"


];



