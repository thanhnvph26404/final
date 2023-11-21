import { useState } from "react";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { useEffect } from "react";
import Popup from "reactjs-popup"
import 'reactjs-popup/dist/index.css';
import { useLocation, useParams } from "react-router-dom";
import { useGetProductQuery } from "../../store/products/product.services";
import { Iproductdata } from "../../store/products/product.interface";
import { useAddToCartMutation, useGetUserByTokenMutation } from "../../store/Auth/Auth.services";
import { useAddCommentMutation, useGetCommentbyidprouctQuery } from "../../store/Comment/comment.services";
import { toastSuccess, toastError } from "../../hook/toastify";
import { message } from "antd";


const ProductDetail = () =>
{
    const { id } = useParams();
    const { data: product, error, isLoading } = useGetProductQuery(id);
    const [AddToCartMutation] = useAddToCartMutation()
    const [AddCommentMutation] = useAddCommentMutation()
    const [mauSac, setmauSac] = useState();
    const [quantity, setQuantity] = useState(0);
    const [count, setcount] = useState(0);
    const [arrange, setArrange] = useState(false);

    // const [progress, setProgress] = useState(0);
    const [ kichCo, setKichCo ] = useState();
    const [ isFormVisible, setIsFormVisible ] = useState( false );
    const [ listSize, setlistSize ] = useState( [] );
    const [ image, setimage ] = useState();
    const navigate = useNavigate()

    const { data: comments } = useGetCommentbyidprouctQuery(id)
    console.log(comments);

    const location = useLocation();

    const [getUserByToken] = useGetUserByTokenMutation(); // Sử dụng mutation để lấy thông tin người dùng sau khi cập nhật
    const token = localStorage.getItem("token");

    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [comment, setComment] = useState("");
    const [rating, setRating] = useState(0);
    useEffect(() => {
        if (token) {
            getUserByToken(token)
                .unwrap()
                .then((response) => {
                    setEmail(response.data.email)
                    setName(response.data.name)
                })
                .catch((error) => {
                    message.error(error.data.message);
                });
        }
    }, [getUserByToken, token, location]);



    const handleStarClick = (value) => {
        setRating(value);
    };
    const handleResetComment = () => {
        setComment("");
        setRating(0);
        setIsFormVisible(!isFormVisible);
    }

    const handleAddComment = (e) => {
        e.preventDefault();
        console.log(email);

        if (!email) {
            toastError("Bạn đang để trống email ");
        }
        else if (!name) {
            toastError("Bạn đang để trống name");

        } else if (!comment) {
            toastError("Bạn đang để trống comment");

        } else if (!rating) {
            toastError("Bạn đang để trống đánh giá sao");

        } else {
            const commentProduct = {
                product: id,
                name: name,
                comment: comment,
                email: email,
                feedback: rating
            }
            console.log(commentProduct);

            AddCommentMutation(commentProduct)
                .unwrap()
                .then((response) => {
                    console.log(response.data);

                })
                .catch((error) => {
                    message.error(error.data.message);
                });
            handleResetComment()
        }
    }




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
            const cart: any = {
                productId: id,
                size: kichCo,
                color: mauSac,
                quantity: count
            }

            navigate( '/cart' )
            AddToCartMutation( cart )
        } else
        {
            toastError( "bạn chưa chọn số lượng sản phẩm " )
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
            <div className="w-full sm:w-3/4 px-4 sm:px-8 mt-3">
                <div className="flex mt-5">
                    <p className="hidden sm:block w-3/4 font-mono text-xl">Bình luận</p>
                </div>
                <hr className='my-4' />

                <div className="flex flex-col gap-y-3 py-4 sm:py-8 items-center">
                    {comments.Comment ? comments.Comment?.map((item, index) => (
                        <div className="flex w-full items-center justify-between">
                            <div className="">
                                <img className="w-[60px] h-[60px] sm:w-[80px] sm:h-[100px] mr-4" src="data:image/png;base64,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" alt="" />
                                <div>
                                    <p>{item.name} </p>
                                </div>
                            </div>
                            <div className=" items-center ">
                                <p className=" text-center ">{item.comment} </p>

                            </div>

                            <div className="flex justify-center items-center mt-3">


                                {[1, 2, 3, 4, 5].map((value) => (
                                    <p key={value} >
                                        <i
                                            className={`fa-solid fa-star ${value <= item.feedback ? 'text-yellow-500' : 'text-[#0A2139]'
                                                } text-center text-2xl`}
                                        ></i>
                                    </p>
                                ))}
                            </div>
                        </div>)) : <h1>chưa có bình luận nào</h1>}
                </div>

                <hr className='my-4' />


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

            <hr className="w-auto ml-[100px] mt-10" />

            {isFormVisible && (

                <form action="" className="mt-[50px]">
                    <h1 className="text-center text-[25.5px] text-[#23314b] font-semibold">THÊM BÌNH LUẬN</h1>
                    <p className="text-center text-[20.5px] text-[#23314b] mt-5">Đánh giá</p>
                    <div className="flex justify-center items-center mt-3">
                        {[1, 2, 3, 4, 5].map((value) => (
                            <p key={value} onClick={() => handleStarClick(value)}>
                                <i
                                    className={`fa-solid fa-star ${value <= rating ? 'text-yellow-500' : 'text-[#0A2139]'
                                        } text-center text-2xl`}
                                ></i>
                            </p>
                        ))}
                    </div>
                    {/* <p className="text-center text-[20.5px] text-[#23314b] mt-8">Tiêu đề</p>
                    <div className="text-center text-[20.5px] text-[#23314b] mt-2">
                        <input
                            type="text"
                            className="p-4 border border-gray-300 w-[550px] h-[40px] "
                            placeholder="Ghi tiêu đề cho đánh giá"
                        />

                    </div> */}
                    <p className="text-center text-[20.5px] text-[#23314b] mt-8">Bình luận</p>
                    <div className="text-center text-[20.5px] text-[#23314b] mt-2">
                        <input
                            type="text"
                            className=" p-4 pb-20 border border-gray-300 w-[550px] h-[150px]"
                            placeholder="Hãy chia sẻ nhận xét cho sản phẩm này bạn nhé!"
                            value={comment}
                            required={true}
                            onChange={(e) => { setComment(e.target.value) }}
                        />

                    </div>
                    {/* <p className="text-center text-[20.5px] text-[#23314b] mt-8">Hình ảnh/video (tùy chọn)</p> */ }
                    {/* <div className="text-center text-[20.5px] text-[#23314b] mt-2">
                        <input
                            type="file"
                            className="hidden"
                            id="fileInput"
                            accept=".jpg, .jpeg, .png, .gif"
                        />
                        <label htmlFor="fileInput" className="w-28 h-28 p-2 border border-gray-300 w-[550px] h-[150px] rounded-md cursor-pointer flex items-center justify-center mx-auto">
                            <img src="/upload.jpg" alt="Tải lên" className="w-16 h-16 " />
                        </label>
                    </div> */}
                    <p className="text-center text-[20.5px] text-[#23314b] mt-8">Tên (Hiển thị công khai dưới tên
                        Nguyễn Văn A)</p>
                    <div className="text-center text-[20.5px] text-[#23314b] mt-2">
                        <input
                            type="text"
                            className="p-4 border border-gray-300 w-[550px] h-[40px] "
                            placeholder="Nhập tên của bạn"
                            value={name}
                            onChange={(e) => { setName(e.target.value) }}
                        />
                    </div>
                    <p className="text-center text-[20.5px] text-[#23314b] mt-8">Email</p>
                    <div className="text-center text-[20.5px] text-[#23314b] mt-2">
                        <input
                            type="text"
                            className="p-4 border border-gray-300 w-[550px] h-[40px] "
                            placeholder="Nhập email của bạn"
                            value={email}
                            onChange={(e) => { setEmail(e.target.value) }}
                        />
                    </div>
                    <div className="flex justify-center items-center mt-5">
                        <button className="mr-4 px-4 py-2 border border-black border-[color]-900 bg-white text-black rounded-md hover:bg-red-200 hover:text-white transition duration-200" onClick={handleResetComment}>Hủy bình luận</button>
                        <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200" onClick={handleAddComment}>Gửi bình luận</button>
                    </div>
                </form>
            ) }

            <div className="space-y-5 " id="commentFormContainer">


                {/* <select name="" id="" className="w-[200px] h-[45px] border-2 ml-[100px] ">
                    <option value="">Mới nhất</option>
                    <option value="">Đánh giá cao nhất</option>
                    <option value="">Đánh giá thấp nhất</option>
                    <option value="">Đánh giá có ảnh</option>
                    <option value="">Đánh giá có ảnh trước</option>
                    <option value="">Đánh giá có video trước</option>
                </select> */}

            </div>
        </div>
    )
}

export default ProductDetail