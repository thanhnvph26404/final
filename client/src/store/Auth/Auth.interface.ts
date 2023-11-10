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
    orders?: IOrderUser[];
    favorites?: string[];
    comments?: ICommentUser[];
    role?: string;
    isBlocked: boolean
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

export interface IOrderUser
{
    _id?: string;
    userId: string;
    products: IProductsOrderUser[];
    totalPrice: number;
    paymentMethod: string;
    payment?: string;
    status: string;
}

export interface IProductsOrderUser
{
    _id?: string;
    product: string;
    name: string;
    price: number;
    quantity: number;
}

export interface ICommentUser
{
    _id?: string;
}
