import { Image } from "../upload/upload.interface"

export interface ICategory {
    _id?: string 
    title: string
    image: Image
}

export interface ICategoryState {
    categories: ICategory[]
}

