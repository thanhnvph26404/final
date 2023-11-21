import { Image } from "../upload/upload.interface"

export interface Iproductdata
{
    _id?: string;
    name: string;
    price: number;
    original_price: number,
    description: string;
    brand: string | undefined
    images: Image;
    ProductVariants: string[]
    category: string | undefined,
    sold?: number

}
export interface IProductState
{
    products: Iproductdata[],
    sortBy: string
}

export type IProductVariants = {
    _id?: string;
    AttributeValues: string;
    inventory: number;

};