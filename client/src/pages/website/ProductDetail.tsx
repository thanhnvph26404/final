import { useState } from "react";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { useEffect } from "react";
import Popup from "reactjs-popup"
import 'reactjs-popup/dist/index.css';
import { useParams } from "react-router-dom";
import { useGetProductQuery } from "../../store/products/product.services";
import { Iproductdata } from "../../store/products/product.interface";
import { useAddToCartMutation } from "../../store/Auth/Auth.services";

const ProductDetail = () =>
{
    const { id } = useParams();
    const { data: product, error, isLoading } = useGetProductQuery( id! );
    const [ AddToCartMutation ] = useAddToCartMutation()
    const [ mauSac, setmauSac ] = useState();
    const [ quantity, setQuantity ] = useState( 0 );
    const [ count, setcount ] = useState( 0 );
    const [ arrange, setArrange ] = useState( false );
    // const [progress, setProgress] = useState(0);
    const [ kichCo, setKichCo ] = useState();
    const [ isFormVisible, setIsFormVisible ] = useState( false );
    const [ listSize, setlistSize ] = useState( [] );
    const [ image, setimage ] = useState();

    const ProductVariants = product?.data?.ProductVariants


    const handleToggleForm = () =>
    {
        setIsFormVisible( !isFormVisible );
    };
    const handleChangeKichCo = ( variant: any ) =>
    {
        setKichCo( variant.size );
        setQuantity( variant.quantity )
        setcount( 0 )
    };
    const handleChangeMauSac = ( newColor: any ) =>
    {
        const sizes = ProductVariants.filter( ( item: any ) =>
        {
            return item.color === newColor
        } )
        setmauSac( newColor );
        setlistSize( sizes )
        handleChangeKichCo( sizes[ 0 ] )
    };
    const handleChangeimage = ( item: any ) =>
    {
        setimage( item )
    };

    const increaseQuantity = () =>
    {
        if ( quantity > count )
        {
            setcount( count + 1 );
        }

    };

    const decreaseQuantity = () =>
    {
        if ( count > 0 )
        {
            setcount( count - 1 );

        }
    };
    const handleTongleArrange = () =>
    {
        setArrange( !arrange );
    };



    //  lấy danh sách màu
    if ( ProductVariants )
    {
        var listcolor = [ ProductVariants[ 0 ]?.color ]
    }
    ProductVariants?.map( ( item: any, index: any, arr: any ) =>
    {
        for ( let i = 0; i < listcolor.length; i++ )
        {
            const element = listcolor[ i ];
            if ( element === item.color )
            {
                return ""
            }
        }
        listcolor.push( item.color )
    } )

    useEffect( () =>
    {
        // auto select mau lúc đầu
        if ( ProductVariants )
        {
            handleChangeMauSac( ProductVariants[ 0 ]?.color )
        }
    }, [ isLoading ] )


    function addtocard ()
    {
        if ( mauSac && kichCo && count )
        {
            const cart = {
                productId: id,
                size: kichCo,
                color: mauSac,
                quantity: count
            }

            console.log( cart );


            AddToCartMutation( cart )
        }


    }

    if ( isLoading )
    {

        return <>Loading...</>
    }

    if ( error )
    {
        return <p>Error...</p>
    }



    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         if (progress < 100) {
    //             setProgress(progress + 1);
    //         } else {
    //             clearInterval(interval);
    //         }
    //     }, 10);

    //     return () => {
    //         clearInterval(interval);
    //     };
    // }, [progress]);


    return (
        <div className=" items-center">
            <div className="flex flex-col-2">
                <div className="pl-[20px] space-y-4 mt-[40px] w-[200px]">
                    {/* list images  */ }
                    { product?.data?.images?.map( ( item: any ) => (
                        <img className="w-24 h-32" src={ item.url } alt="" onMouseMove={ () => handleChangeimage( item.url ) } />
                    ) ) }

                </div>
                <div className="flex">
                    <div className="md:w-[100px] lg:w-[600px]">
                        {/* main image */ }
                        <img className="md:w-32 lg:w-[800px] w-full" src={ image ? image : product?.data?.images[ 0 ]?.url } alt="" />
                    </div>
                    <div className="mt-[50px]">
                        {/* name */ }
                        <h1 className="text-[32px] font-semibold text-[#23314B] text-left leading-[1.2] font-[Montserrat]">{ product?.data?.name }</h1>
                        <p className="flex gap-2 text-left mt-[40px]">
                            {/* price */ }
                            <span className="text-[#f83a3a] text-sm md:text-[21px] font-thin">{ product?.data?.price }₫</span>
                            <span className="line-through text-sm md:text-[17px] font-extralight text-[#23314bb3]">{ product?.data?.original_price }₫</span>
                            <p className=" bg-[#f83a3a] text-[8px] sm:text-xs font-semibold rounded-full text-white px-2 py-[3px]">Tiết kiệm { product?.data?.original_price - product?.data?.price }₫</p>

                        </p>
                        <div className="mt-[30px] flex">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-inject-url="https://cdn.kiwisizing.com/icons/tape3.min.svg?v=5-inject2" className="kiwi-svg kiwi-injectable w-[20px]" ><path d="M498.983 247.322h-56.407c-42.522 0-78.102-19.96-78.102-43.4v-8.678c0-43.4-79.837-78.102-182.237-78.102S0 151.864 0 195.254v121.492c0 43.4 79.837 78.102 182.237 78.102 81.8 0 149.198-22.152 173.006-53.183 14.65 21.223 47.693 35.827 87.333 35.827h56.407c6.942 0 13.017-6.075 13.017-12.15V260.34c0-6.942-6.075-13.017-13.017-13.017zM182.237 134.508c97.193 0 164.88 32.108 164.88 60.746S279.43 256 182.237 256s-164.88-32.108-164.88-60.746 67.688-60.746 164.88-60.746zM321.085 348.25v-14.148c0-5.207-3.47-8.678-8.678-8.678s-8.678 3.47-8.678 8.678v22.693c-7.782 3.247-16.496 6.23-26.034 8.866v-22.88c0-5.207-3.47-8.678-8.678-8.678s-8.678 3.47-8.678 8.678v26.034a11.67 11.67 0 0 0 .05 1.036c-8.233 1.73-16.944 3.207-26.085 4.4v-22.78c0-5.207-3.47-8.678-8.678-8.678s-8.678 3.47-8.678 8.678v24.62a414.49 414.49 0 0 1-26.034 1.326V360.15c0-5.207-3.47-8.678-8.678-8.678s-8.678 3.47-8.678 8.678v17.268a414.53 414.53 0 0 1-26.034-1.326v-24.62c0-5.207-3.47-8.678-8.678-8.678s-8.678 3.47-8.678 8.678v22.78c-9.14-1.183-17.852-2.66-26.085-4.4a10.94 10.94 0 0 0 .051-1.036V342.78c0-5.207-3.47-8.678-8.678-8.678s-8.678 3.47-8.678 8.678v22.88c-9.538-2.635-18.252-5.62-26.034-8.866V334.1c0-5.207-3.47-8.678-8.678-8.678s-8.678 3.47-8.678 8.678v14.148c-16.7-9.767-26.034-20.874-26.034-31.504V229.1c6.853 6.23 15.663 12.006 26.083 17.2-.03.334-.05.675-.05 1.025v34.712c0 5.207 3.47 8.678 8.678 8.678s8.678-3.47 8.678-8.678V253.82l1.832.693.278.1c7.457 2.75 15.452 5.244 23.924 7.448v19.974c0 5.207 3.47 8.678 8.678 8.678s8.678-3.47 8.678-8.678V266.03c8.334 1.664 17.028 3.068 26.034 4.186V299.4c0 5.207 3.47 8.678 8.678 8.678s8.678-3.47 8.678-8.678v-27.407a423.36 423.36 0 0 0 14.133.893l.252.012 6.598.255.17.005 4.88.12v17.443c0 5.207 3.47 8.678 8.678 8.678s8.678-3.47 8.678-8.678v-17.44l5.052-.126 6.85-.267a423.36 423.36 0 0 0 14.133-.893v27.407c0 5.207 3.47 8.678 8.678 8.678s8.678-3.47 8.678-8.678v-29.174c9.006-1.12 17.7-2.522 26.034-4.186v16.004c0 5.207 3.47 8.678 8.678 8.678s8.678-3.47 8.678-8.678V262.06c8.47-2.204 16.465-4.698 23.92-7.447l.282-.102 1.83-.692v28.216c0 5.207 3.47 8.678 8.678 8.678s8.678-3.47 8.678-8.678v-34.712c0-.35-.018-.7-.05-1.025 10.42-5.193 19.23-10.97 26.083-17.2v87.647c-.001 10.63-9.335 21.737-26.035 31.504zm121.5 11.886c-9.1 0-17.858-.92-26.034-2.582v-32.13c0-5.207-3.47-8.678-8.678-8.678s-8.678 3.47-8.678 8.678v27.164c-20.8-7.906-34.712-21.196-34.712-35.842v-77.48c4.914 4.44 10.754 8.424 17.356 11.852v30.915c0 5.207 3.47 8.678 8.678 8.678s8.678-3.47 8.678-8.678v-23.776c5.484 1.744 11.287 3.163 17.356 4.22v19.557c0 5.207 3.47 8.678 8.678 8.678s8.678-3.47 8.678-8.678v-17.597c2.854.156 5.747.24 8.678.24h8.678v95.458h-8.678zm52.068 0H468.6v-95.458h26.034v95.458zm-312.406-130.17c34.712 0 69.424-12.15 69.424-34.712s-34.712-34.712-69.424-34.712-69.424 12.15-69.424 34.712 34.712 34.712 69.424 34.712zm0-52.068c32.108 0 52.068 11.28 52.068 17.356s-19.96 17.356-52.068 17.356-52.068-11.28-52.068-17.356 19.96-17.356 52.068-17.356z"></path></svg>
                            <Popup modal trigger={ <button className="text-[20px] underline underline-offset-2">Hướng dẫn chọn size áo</button> }>
                                <div className="w-full h-[700px] overflow-y-auto">
                                    <div className="flex items-center space-x-4 mt-2 ml-6">
                                        <div>
                                            <img className="rounded-full w-[50px]" src="https://cdn.kiwisizing.com/polomanor-1671546812282.jpeg" alt="" />
                                        </div>
                                        <div>
                                            <p className="font-[inherit] text-[#333] font-semibold text-[17px]">Áo Polo Nam Symbol Màu Trắng vải cá sấu Cotton Interlock phom Regular Fit</p>
                                            <p className="text-center text-[#333] font-normal text-[12px] font-[inherit]">Bảng size</p>
                                        </div>
                                    </div>
                                    <hr className="w-[750px] border-1 border-black mt-2" />
                                    <div>
                                        <img src="https://cdn.kiwisizing.com/polomanor-1675237423290.jpeg" alt="" />
                                    </div>
                                </div>
                            </Popup>
                        </div>
                        <div className="mt-[30px]  space-x-2">
                            <p className="text-[#23314BB3]">0.0  <i className="fa-solid fa-star  text-[#ffdd00]"></i></p>
                        </div>
                        <div className="mt-[30px]">
                            <hr className="w-[600px]" />
                        </div>
                        <div className="mt-[30px]">
                            <p className="text-[#23314BB3] text-[20px]">Màu sắc { mauSac } </p>
                        </div>

                        <div className="mt-[30px]">
                            <p className="text-[#23314BB3] text-[20px]">Kích cỡ: { kichCo }</p>
                        </div>

                        <div className="mt-[20px] space-x-10">
                            { listcolor?.map( ( color, index ) => (

                                <button key={ index } className={ `rounded-full text-[20px] text-[#23314BB3] ${ mauSac === color ? 'border-2 border-[#23314BB3] w-[60px]  h-[55px] rounded-full text-[20px] text-[#23314BB3]' : '' }` } onClick={ () => handleChangeMauSac( color ) }>{ color }</button>
                            ) ) }
                        </div>
                        <div className="mt-[20px] space-x-10">
                            { listSize?.map( ( item, index ) => (
                                <button key={ index } className={ `rounded-full text-[20px] text-[#23314BB3] ${ kichCo === item?.size ? 'border-2 border-[#23314BB3] w-[60px]  h-[55px] rounded-full text-[20px] text-[#23314BB3]' : '' }` } onClick={ () => handleChangeKichCo( item ) }>{ item.size }</button>
                            ) ) }


                        </div>

                        <div className="mt-[30px]">
                            <p className="text-[#23314BB3] text-[20px] ">Số lượng còn lại : { quantity } </p>
                            <div className="pt-4">
                                <div className="flex border-2 border-slate-500 rounded-full  w-[150px] h-[50px] space-x-[40px] ">
                                    <button className="text-[30px] pl-[15px]" onClick={ decreaseQuantity }>-</button>
                                    <p className="text-[20px] pt-[8px]">{ count }</p>
                                    <button className="text-[25px]" onClick={ increaseQuantity }>+</button>

                                </div>
                            </div>
                        </div>
                        <div className="mt-[50px]">
                            <button onClick={ () => addtocard() } className="border-2 bg-[#23314b] text-white border-[#23314BB3] w-[600px]   rounded-full text-[20px] font-semibold text-center h-[65px] hover:bg-transparent hover:text-[#23314b] hover:border-2 hover:border-[#23314b]">Thêm vào giỏ hàng</button>
                        </div>
                    </div>

                </div>

            </div>
            <div className="pl-[150px]  ">
                <h1 className="text-[21.25px] text-[#23314b] font-semibold">Bạn có thể thích:</h1>
                <div className="relative w-[200px] ">
                    <img className="w-[150px]" src="/sp1.jpg" alt="" />
                    <p className="absolute top-0 right-[50px] w-[40px] h-[40px] border-2 rounded-full text-center bg-[#23314b] text-white font-bold pt-2  ">15%</p>
                    <p className="text-center text-[#23314b] text-[17px] font-semibold">Áo Polo Nam Davin vải cá sấu Cotton Interlock phom Regular Fit</p>
                    <p className="text-center text-[] font-extralight text-gray-500">299.000đ</p>
                    <select name="" id="" className="w-[200px] h-[45px] border-2 ">
                        <option value="" className="text-gray-500">M</option>
                        <option value="">L</option>
                        <option value="">XL</option>
                        <option value="">XXL</option>
                    </select>
                    <button className="w-[200px] h-[45px] border-2 mt-6 bg-[#23314b] text-white font-thin hover:opacity-70">Thêm vào giỏ</button>
                </div>
            </div>
            <div className="flex mt-[200px] space-x-[180px] items-center pl-[200px]">
                <div className="text-center">
                    <button className=" border-0 rounded-full bg-[#F4F4F6] w-[80px] h-[80px]">
                        <span className="material-symbols-outlined text-[35px]">
                            sell
                        </span>
                    </button>
                    <p className=" text-[#23314b] text-[22px] font-semibold pt-4">Đổi trả lên đến 30 ngày</p>
                    <p className=" text-[#23314b] text-[17px] font-semibold">Áp dụng mọi đơn hàng</p>
                </div>
                <div className="text-center">
                    <button className=" border-0 rounded-full bg-[#F4F4F6] w-[80px] h-[80px]">
                        <span className="material-symbols-outlined text-[35px]">
                            sell
                        </span>
                    </button>
                    <p className=" text-[#23314b] text-[22px] font-semibold pt-4">Freeship toàn quốc</p>
                    <p className=" text-[#23314b] text-[17px] font-semibold">Dành cho đơn hàng từ 500K trở lên</p>
                </div>
                <div className="text-center">
                    <button className=" border-0 rounded-full bg-[#F4F4F6] w-[80px] h-[80px]">
                        <span className="material-symbols-outlined text-[35px]">
                            sell
                        </span>
                    </button>
                    <p className=" text-[#23314b] text-[22px] font-semibold pt-4">Tặng quần Boxer 99K</p>
                    <p className=" text-[#23314b] text-[17px] font-semibold">Dành cho đơn hàng từ 500K trở lên</p>
                </div>
            </div>
            <div className="mt-[100px]">
                <hr className="w-[1200px] ml-[150px]" />
                <div className="flex justify-between ">
                    <div className="py-5">
                        <div className="flex justify-between space-x-[900px] ml-[150px] ">
                            <p className="text-[22px] font-semibold text-[#23314b] ">Mô tả sản phẩm</p>
                            <span
                                className={ `inline-block  w-[30px] h-[30px] pt-[5px] pl-[5px]   bg-[#23314b1a] rounded-full group hover:bg-[#23314b] transform transition-transform duration-300 ${ arrange ? "rotate-180" : ""
                                    }` }
                                onClick={ handleTongleArrange }
                            >
                                <MdOutlineKeyboardArrowDown className="text-[#23314b] text-[20px] group-hover:text-white" />
                            </span>
                        </div>
                        { arrange && (
                            <div className={ `mt-5` }>
                                <div className="flex items-center ">
                                    <ul className="pl-[220px] list-disc">
                                        <li className="text-[17px] font-extralight text-[#23314b] leading-[27px]">Chất vải Cotton co giãn 4 chiều và thoáng mát cả ngày dài</li>
                                        <li className="text-[17px] font-extralight text-[#23314b] leading-[27px]">Phom Regular Fit tôn dáng, hợp với hầu hết kích thước cơ thể</li>
                                        <li className="text-[17px] font-extralight text-[#23314b] leading-[27px]">Thoải mái giặt máy, không ra màu và không mất phom áo</li>
                                    </ul>
                                </div>
                                <div className="ml-[200px]">
                                    <img src="https://cdn.shopify.com/s/files/1/0685/2237/7522/files/polomanor_tshirt_detail_raglan_xam_dam_02_2048x2048.jpg?v=1684213776" alt="" />
                                    <img src="https://cdn.shopify.com/s/files/1/0685/2237/7522/files/polomanor_tshirt_detail_raglan_xam_dam_03_2048x2048.jpg?v=1684213786" alt="" />
                                    <img src="https://cdn.shopify.com/s/files/1/0685/2237/7522/files/polomanor_tshirt_detail_raglan_xam_dam_04_2048x2048.jpg?v=1684213797" alt="" />
                                    <img src="https://cdn.shopify.com/s/files/1/0685/2237/7522/files/polomanor_tshirt_detail_raglan_xam_dam_05_2048x2048.jpg?v=1684213809" alt="" />
                                    <img src="https://cdn.shopify.com/s/files/1/0685/2237/7522/files/polomanor_tshirt_detail_raglan_xam_dam_06_2048x2048.jpg?v=1684213820" alt="" />
                                    <img src="https://cdn.shopify.com/s/files/1/0685/2237/7522/files/polomanor_tshirt_detail_raglan_xam_dam_07_2048x2048.jpg?v=1684213900" alt="" />
                                </div>
                            </div>
                        ) }
                    </div>
                </div>
                <hr className="w-[1200px] ml-[150px]" />
            </div>
            <div className="mt-[120px]">
                <div className="">
                    {/* <div className="text-[216px] font-semibold text-center text-[#23314b] "> {`${progress}%`}</div> */ }

                    <p className="text-[#23314b] text-[28px] text-center font-semibold">Sản phẩm được kiểm duyệt kĩ trước khi giao hàng</p>
                </div>
            </div>
            <div className="mt-[120px]">
                <h1 className="text-center text-[25.5px] text-[#23314b] font-semibold">ĐÁNH GIÁ SẢN PHẨM</h1>
            </div>
            <div className="mt-[70px] grid grid-cols-3 space-x-[80px] ml-[80px]">
                <div>
                    <div className="flex space-x-4">
                        <div className="flex ">
                            <p><i className="fa-solid fa-star text-[#0A2139]"></i></p>
                            <p><i className="fa-solid fa-star text-[#0A2139]"></i></p>
                            <p><i className="fa-solid fa-star text-[#0A2139]"></i></p>
                            <p><i className="fa-solid fa-star text-[#0A2139]"></i></p>
                            <p><i className="fa-solid fa-star text-[#0A2139]"></i></p>
                        </div>
                        <div>
                            <p className="font-extrathin text-[#0A2139] text-[17px] underline">5.00 trên 5 sao </p>
                        </div>
                    </div>
                    <p className="font-extrathin text-[#0A2139] text-[17px]">Dựa trên 1 đánh giá của người mua về sản phẩm</p>
                </div>
                <div>
                    <div className="flex space-x-4">
                        <div className="flex">
                            <p><i className="fa-solid fa-star text-[#0A2139]"></i></p>
                            <p><i className="fa-solid fa-star text-[#0A2139]"></i></p>
                            <p><i className="fa-solid fa-star text-[#0A2139]"></i></p>
                            <p><i className="fa-solid fa-star text-[#0A2139]"></i></p>
                            <p><i className="fa-solid fa-star text-[#0A2139]"></i></p>
                        </div>
                        <div>
                            <button className="border-2 bg-[#0A2139] w-[150px] h-[20px]"></button>
                        </div>
                        <div>
                            <p className="text-gray-500">1</p>
                        </div>
                    </div>
                    <div className="flex space-x-4">
                        <div className="flex">
                            <p><i className="fa-solid fa-star text-[#0A2139]"></i></p>
                            <p><i className="fa-solid fa-star text-[#0A2139]"></i></p>
                            <p><i className="fa-solid fa-star text-[#0A2139]"></i></p>
                            <p><i className="fa-solid fa-star text-[#0A2139]"></i></p>
                            <p><i className="fa-regular fa-star text-[#0A2139]"></i></p>
                        </div>
                        <div>
                            <button className="border-2 bg-[#EFEFEF] w-[150px] h-[20px]"></button>
                        </div>
                        <div>
                            <p className="text-gray-500">0</p>
                        </div>
                    </div>
                    <div className="flex space-x-4">
                        <div className="flex">
                            <p><i className="fa-solid fa-star text-[#0A2139]"></i></p>
                            <p><i className="fa-solid fa-star text-[#0A2139]"></i></p>
                            <p><i className="fa-solid fa-star text-[#0A2139]"></i></p>
                            <p><i className="fa-regular fa-star text-[#0A2139]"></i></p>
                            <p><i className="fa-regular fa-star text-[#0A2139]"></i></p>
                        </div>
                        <div>
                            <button className="border-2 bg-[#EFEFEF] w-[150px] h-[20px]"></button>
                        </div>
                        <div>
                            <p className="text-gray-500">0</p>
                        </div>
                    </div>
                    <div className="flex space-x-4">
                        <div className="flex">
                            <p><i className="fa-solid fa-star text-[#0A2139]"></i></p>
                            <p><i className="fa-solid fa-star text-[#0A2139]"></i></p>
                            <p><i className="fa-regular fa-star text-[#0A2139]"></i></p>
                            <p><i className="fa-regular fa-star text-[#0A2139]"></i></p>
                            <p><i className="fa-regular fa-star text-[#0A2139]"></i></p>
                        </div>
                        <div>
                            <button className="border-2 bg-[#EFEFEF] w-[150px] h-[20px]"></button>
                        </div>
                        <div>
                            <p className="text-gray-500">0</p>
                        </div>
                    </div>
                    <div className="flex space-x-4">
                        <div className="flex">
                            <p><i className="fa-solid fa-star text-[#0A2139]"></i></p>
                            <p><i className="fa-regular fa-star text-[#0A2139]"></i></p>
                            <p><i className="fa-regular fa-star text-[#0A2139]"></i></p>
                            <p><i className="fa-regular fa-star text-[#0A2139]"></i></p>
                            <p><i className="fa-regular fa-star text-[#0A2139]"></i></p>
                        </div>
                        <div>
                            <button className="border-2 bg-[#EFEFEF] w-[150px] h-[20px]"></button>
                        </div>
                        <div>
                            <p className="text-gray-500">0</p>
                        </div>
                    </div>

                </div>
                <div>
                    <button className="w-[200px] h-[45px] border-2 mt-2 bg-[#23314b] text-white font-thin hover:opacity-70" onClick={ handleToggleForm }>Thêm bình luận</button>
                </div>
            </div>
            <hr className="w-[1300px] ml-[100px] mt-10" />
            { isFormVisible && (
                <form action="" className="mt-[50px]">
                    <h1 className="text-center text-[25.5px] text-[#23314b] font-semibold">THÊM BÌNH LUẬN</h1>
                    <p className="text-center text-[20.5px] text-[#23314b] mt-5">Đánh giá</p>
                    <div className="flex justify-center items-center mt-3">
                        <p><i className="fa-solid fa-star text-[#0A2139] text-center text-2xl"></i></p>
                        <p><i className="fa-solid fa-star text-[#0A2139] text-center text-2xl"></i></p>
                        <p><i className="fa-solid fa-star text-[#0A2139] text-center text-2xl"></i></p>
                        <p><i className="fa-solid fa-star text-[#0A2139] text-center text-2xl"></i></p>
                        <p><i className="fa-solid fa-star text-[#0A2139] text-center text-2xl"></i></p>
                    </div>
                    <p className="text-center text-[20.5px] text-[#23314b] mt-8">Tiêu đề</p>
                    <div className="text-center text-[20.5px] text-[#23314b] mt-2">
                        <input
                            type="text"
                            className="p-4 border border-gray-300 w-[550px] h-[40px] "
                            placeholder="Ghi tiêu đề cho đánh giá"
                        />

                    </div>
                    <p className="text-center text-[20.5px] text-[#23314b] mt-8">Đánh giá</p>
                    <div className="text-center text-[20.5px] text-[#23314b] mt-2">
                        <input
                            type="text"
                            className=" p-4 pb-20 border border-gray-300 w-[550px] h-[150px]"
                            placeholder="Hãy chia sẻ nhận xét cho sản phẩm này bạn nhé!"
                        />

                    </div>
                    <p className="text-center text-[20.5px] text-[#23314b] mt-8">Hình ảnh/video (tùy chọn)</p>
                    <div className="text-center text-[20.5px] text-[#23314b] mt-2">
                        <input
                            type="file"
                            className="hidden"
                            id="fileInput"
                            accept=".jpg, .jpeg, .png, .gif"
                        />
                        <label htmlFor="fileInput" className="w-28 h-28 p-2 border border-gray-300 w-[550px] h-[150px] rounded-md cursor-pointer flex items-center justify-center mx-auto">
                            <img src="/upload.jpg" alt="Tải lên" className="w-16 h-16 " />
                        </label>
                    </div>
                    <p className="text-center text-[20.5px] text-[#23314b] mt-8">Tên (Hiển thị công khai dưới tên
                        Nguyễn Văn A)</p>
                    <div className="text-center text-[20.5px] text-[#23314b] mt-2">
                        <input
                            type="text"
                            className="p-4 border border-gray-300 w-[550px] h-[40px] "
                            placeholder="Nhập tên của bạn"
                        />
                    </div>
                    <p className="text-center text-[20.5px] text-[#23314b] mt-8">Email</p>
                    <div className="text-center text-[20.5px] text-[#23314b] mt-2">
                        <input
                            type="text"
                            className="p-4 border border-gray-300 w-[550px] h-[40px] "
                            placeholder="Nhập email của bạn"
                        />
                    </div>
                    <div className="flex justify-center items-center mt-5">
                        <button className="mr-4 px-4 py-2 border border-black border-[color]-900 bg-white text-black rounded-md hover:bg-red-200 hover:text-white transition duration-200">Hủy bình luận</button>
                        <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200">Gửi bình luận</button>
                    </div>
                </form>
            ) }

            <div className="space-y-5 " id="commentFormContainer">

                <hr className="w-[1300px] ml-[100px]" />
                {/* <select name="" id="" className="w-[200px] h-[45px] border-2 ml-[100px] ">
                    <option value="">Mới nhất</option>
                    <option value="">Đánh giá cao nhất</option>
                    <option value="">Đánh giá thấp nhất</option>
                    <option value="">Đánh giá có ảnh</option>
                    <option value="">Đánh giá có ảnh trước</option>
                    <option value="">Đánh giá có video trước</option>
                </select> */}
                {/* <hr className="w-[1300px] ml-[100px]" /> */ }
            </div>
        </div>
    )
}

export default ProductDetail