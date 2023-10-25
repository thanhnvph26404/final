// đây là data của FE, không cần lưu vào db

import { BsCreditCard } from "react-icons/bs";
import { MdFavoriteBorder } from "react-icons/md";
import { AiOutlineProfile, AiOutlineGift } from "react-icons/ai";

export const profile = [
    {
        title: "Quản lý tài khoản",
        url: "account",
        Icon: AiOutlineProfile,
        list: [
            {
                name: "Thông tin cá nhân",
                url: "information",
            },
            {
                name: "Đổi mật khẩu",
                url: "change-password",
            },
        ],
    },
    {
        title: "Đơn hàng",
        url: "orders",
        Icon: AiOutlineGift,
        list: [
            {
                name: "Địa chỉ giao hàng",
                url: "order-address",
            },
        ],
    },
    {
        title: "Phương thức thanh toán",
        url: "payment",
        Icon: BsCreditCard,
        list: [
            {
                name: "Thẻ ngân hàng",
                url: "list-card",
            },
        ],
    },
    {
        title: "Sản phẩm yêu thích",
        url: "favorite",
        Icon: MdFavoriteBorder,
    },
];
