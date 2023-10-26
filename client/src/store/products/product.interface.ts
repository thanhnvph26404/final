import { Image } from "../upload/upload.interface"


export type IProduct = {
    _id?: string;
    name: string;
    price: number;
    // giá đã giảm
    original_price: number,
    description: string;
    brand: string
    imgUrl: Image;
    ProductVariants: string[]
    category: string
};