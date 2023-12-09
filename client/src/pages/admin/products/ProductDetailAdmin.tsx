import { useState } from "react";
// import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { useEffect } from "react";
// import Popup from "reactjs-popup"
import 'reactjs-popup/dist/index.css';
import { useParams } from "react-router-dom";
import { useGetProductQuery } from "../../../store/products/product.services";
// import { useAddToCartMutation } from "../../../store/Auth/Auth.services";
// import { toastError } from "../../../hook/toastify";

const ProductDetail = () => {
    const { id } = useParams();

    const { data: product, isLoading } = useGetProductQuery(id!);
    console.log(product);

    // const [AddToCartMutation] = useAddToCartMutation()
    const [mauSac, setmauSac] = useState();
    const [quantity, setQuantity] = useState(0);
    const [count, setcount] = useState(0);
    // const [arrange, setArrange] = useState(false);
    // const [progress, setProgress] = useState(0);
    const [kichCo, setKichCo] = useState();
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [listSize, setlistSize] = useState([]);
    const [image, setimage] = useState();
    // const navigate = useNavigate()

    const ProductVariants = product?.data?.ProductVariants


    const handleToggleForm = () => {
        setIsFormVisible(!isFormVisible);
    };
    const handleChangeKichCo = (variant: any) => {
        setKichCo(variant.size);
        setQuantity(variant.quantity)
        setcount(0)
    };
    const handleChangeMauSac = (newColor: any) => {
        const sizes = ProductVariants.filter((item: any) => {
            return item.color === newColor
        })
        setmauSac(newColor);
        setlistSize(sizes)
        handleChangeKichCo(sizes[0])
    };
    const handleChangeimage = (item: any) => {
        setimage(item)
    };

    const increaseQuantity = () => {
        if (quantity > count) {
            setcount(count + 1);
        }

    };

    // const decreaseQuantity = () => {
    //     if (count > 0) {
    //         setcount(count - 1);

    //     }
    // };
    // const handleTongleArrange = () => {
    //     setArrange(!arrange);
    // };



    //  lấy danh sách màu
    if (ProductVariants) {
        var listcolor = [ProductVariants[0]?.color]
    }
    ProductVariants?.map((item: any, index: any, arr: any) => {
        for (let i = 0; i < listcolor.length; i++) {
            const element = listcolor[i];
            if (element === item.color) {
                return ""
            }
        }
        listcolor.push(item.color)
    })

    useEffect(() => {
        // auto select mau lúc đầu
        if (ProductVariants) {
            handleChangeMauSac(ProductVariants[0]?.color)
        }
    }, [isLoading])



    // function addtocard() {
    //     if (mauSac && kichCo && count) {
    //         const cart: any = {
    //             productId: id,
    //             size: kichCo,
    //             color: mauSac,
    //             quantity: count
    //         }

    //         navigate('/cart')
    //         AddToCartMutation(cart)
    //     } else {
    //         toastError("bạn chưa chọn số lượng sản phẩm ")
    //     }


    // }

    // if (isLoading) {

    //     return <>Loading...</>
    // }

    // if (error) {
    //     return <p>Error...</p>
    // }


    return (
        <div className=" items-center">
            <div className="flex flex-col-2">
                <div className="pl-[20px] space-y-4 mt-[40px] w-[200px]">
                    {/* list images  */}
                    {product?.data?.images?.map((item: any) => (
                        <img className="w-24 h-32" src={item.url} alt="" onMouseMove={() => handleChangeimage(item.url)} />
                    ))}

                </div>
                <div className="flex space-x-[100px]">
                    <div className="md:w-[100px] lg:w-[400px]">
                        {/* main image */}
                        <img className="md:w-32 lg:w-[800px] w-full" src={image ? image : product?.data?.images[0]?.url} alt="" />
                    </div>
                    <div className="mt-[50px]">
                        {/* name */}
                        <h1 className="text-[32px] font-semibold text-[#23314B] text-left leading-[1.2] font-[Montserrat]">{product?.data?.name}</h1>
                        <p className="flex gap-2 text-left mt-[40px]">
                            {/* price */}
                            <span className="text-[#f83a3a] text-sm md:text-[21px] font-thin">{product?.data?.original_price}₫</span>
                            <span className="line-through text-sm md:text-[17px] font-extralight text-[#23314bb3]">{product?.data?.price}₫</span>
                            <p className=" bg-[#f83a3a] text-[8px] sm:text-xs font-semibold rounded-full text-white px-2 py-[3px]">Tiết kiệm {product?.data?.price - product?.data?.original_price}₫</p>
                        </p>
                        <div className="mt-[30px]">
                            <hr className="w-[600px]" />
                        </div>
                        <div className="mt-[30px]">
                            <p className="text-[32px] font-semibold text-[#23314B] text-left leading-[1.2] font-[Montserrat]"> Thương hiệu: {product?.data?.brand?.title}</p>
                        </div>
                        <div className="mt-[30px]">
                            <p className="text-[32px] font-semibold text-[#23314B] text-left leading-[1.2] font-[Montserrat]"> Danh Mục: {product?.data?.category?.title}</p>
                        </div>
                        {/* <div className="mt-[30px]">
                            <p className="text-[32px] font-semibold text-[#23314B] text-left leading-[1.2] font-[Montserrat]"> Mô Tả: </p>
                             <p className="text-[25px] font-medium text-[#23314B] text-left leading-[1.2] font-[Montserrat]"> {product?.data?.description} </p>
                        </div> */}
                        <div className="mt-[20px] space-x-10">
                            {listcolor?.map((color, index) => (

                                <button key={index} className={`rounded-full text-[20px] text-[#23314BB3] ${mauSac === color ? 'border-2 border-[#23314BB3] w-[70px]  h-[55px] rounded-xl text-[20px] text-[#23314BB3]' : ''}`} onClick={() => handleChangeMauSac(color)}>{color}</button>
                            ))}
                        </div>
                        <div className="mt-[20px] space-x-10">
                            {listSize?.map((item, index) => (
                                <button key={index} className={`rounded-full text-[20px] text-[#23314BB3] ${kichCo === item?.size ? 'border-2 border-[#23314BB3] w-[70px]  h-[55px] rounded-xl text-[20px] text-[#23314BB3]' : ''}`} onClick={() => handleChangeKichCo(item)}>{item.size}</button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>





        </div>
    )
}

export default ProductDetail