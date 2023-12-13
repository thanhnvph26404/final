import { useState, useEffect } from "react";
import { BsFilter } from "react-icons/bs";
import { MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md";
import Slider from "react-slider";
import { Link } from "react-router-dom";
import { useGetProductsQuery } from "../store/products/product.services";
import { Iproductdata } from "../store/products/product.interface";


type Props = {};

const ListProduct = ( props: Props ) =>
{
    // const dispatch = useAppDispatch();
    const [ arrange, setArrange ] = useState( false );
    const [ filter, setFilter ] = useState( false );
    const [ avaiable, setAvaiable ] = useState( false );
    const [ value, setValue ] = useState( [ 0, 1000000 ] );

    const { data: productList } = useGetProductsQuery( {
        gte: value[ 0 ].toString(), // Chuyển giá trị thành chuỗi số
        lte: value[ 1 ].toString(), // Chuyển giá trị thành chuỗi số
    } ); console.log( productList );

    const [ sortedProducts, setSortedProducts ] = useState<Iproductdata[]>( [] );
    const [ sortOption, setSortOption ] = useState( "lowest" );
    useEffect( () =>
    {
        if ( productList?.products )
        {
            const sorted = [ ...productList.products ];

            // Sắp xếp dựa trên giá và lựa chọn của người dùng
            if ( sortOption === "lowest" )
            {
                sorted.sort( ( a, b ) => a.price - b.price );
            } else if ( sortOption === "highest" )
            {
                sorted.sort( ( a, b ) => b.price - a.price );
            }

            setSortedProducts( sorted );
        }
    }, [ productList, sortOption ] );

    useEffect( () =>
    {
        // Gọi API để lấy sản phẩm theo khoảng giá đã chọn khi value thay đổi
        if ( productList?.products )
        {
            // Lọc danh sách sản phẩm dựa trên giá trong khoảng value
            const filteredProducts = productList.products.filter(
                ( product: any ) =>
                    product.price >= value[ 0 ] && product.price <= value[ 1 ]
            );
            setSortedProducts( filteredProducts );
        }
    }, [ productList, value ] );
    const handleSliderChange = ( newValue: number | number[] ) =>
    {
        setValue( newValue as number[] );
    };
    const handleSortChange = ( event: React.ChangeEvent<HTMLSelectElement> ) =>
    {
        setSortOption( event.target.value );
    };







    const handleToggle = () =>
    {
        setAvaiable( !avaiable );
    };
    const handleTongleArrange = () =>
    {
        setArrange( !arrange );
    };
    const handleTongleFilter = () =>
    {
        setFilter( !filter );
    };

    return (
        <section className="">
            <button className="group fixed z-30 top-3/4 left-1/2 transform -translate-x-1/2 lg:hidden">
                <div className=" transition-all ease-in-out hover:text-[#23314b] group-hover:bg-transparent group-hover:border-[#23314b] flex items-center rounded-full text-sm md:text-[17px] font-semibold text-white gap-2 px-8 py-3 bg-[#23314b] border-2 border-transparent">
                    <BsFilter className=" inline-blocktext-lg group-hover:text-[#23314b] " />
                    <span className="inline-block" >Bộ lọc</span>
                </div>
            </button>
            <div className="mx-12 max-sm:mx-7 mt-12 mb-16">
                <div className=" gap-12 mb-8 hidden lg:flex">
                    <div className="w-[250px] flex items-center gap-3">
                        <BsFilter className="text-lg text-[#23314b]" />
                        <div className="text-base font-extralight text-[#23314b]">
                            Bộ lọc
                        </div>
                    </div>
                    <div className="flex items-center justify-end w-full text-right">
                        <span className="mr-1 text-[#23314b] text-base font-medium">
                            Sắp xếp theo:
                        </span>
                        {/* <span className="text-[#23314b] text-base font-thin mr-3" onChange={handleSortChange}>
                            Thứ tự bảng chữ cái
                        </span> */}
                        {/* <span
                            className={`inline-block  p-1.5  bg-[#23314b1a] rounded-full group hover:bg-[#23314b] relative `}
                            onClick={handleTongleFilter}
                        >
                            <MdOutlineKeyboardArrowDown className={`text-[#23314b] text-xs group-hover:text-white transform transition-transform duration-300 ${filter ? "rotate-180" : ""
                                }`} />
                            {
                                filter && (<div className="absolute w-[302px] z-20 border rounded-lg right-0 top-[170%] py-4  bg-white">
                                    <p className=" text-left pl-6 font-thin text-base py-1.5">Bán chạy nhất</p>
                                    <p className=" text-left pl-6 font-thin text-base py-1.5">Giá (từ thấp đến cao)</p>
                                    <p className=" text-left pl-6 font-thin text-base py-1.5">Giá (từ cao đến thấp)</p>
                                    <p className=" text-left pl-6 font-thin text-base py-1.5">Bán chạy nhất</p>

                                </div>)
                            }
                        </span> */}
                    </div>
                    <div>
                        <select name="" id="" onChange={ handleSortChange }>
                            <option value="lowest">Giá từ thấp đến cao</option>
                            <option value="highest">Giá từ cao đến thấp</option>
                        </select>
                    </div>
                </div>
                <div className="flex gap-12 ">
                    <div className="w-[250px] hidden lg:block z-10 ">
                        <hr />
                        <div className="flex justify-between py-5">
                            <label htmlFor="dark-mode-toggle">Sẵn hàng</label>

                            <label
                                htmlFor="dark-mode-toggle"
                                className="relative"
                            >
                                <div
                                    className={ `block w-10 h-5 bg-[#23314b26]  rounded-full shadow-inner ${ avaiable ? "bg-[#23314b]" : ""
                                        }` }
                                ></div>
                                <div
                                    className={ `dot absolute left-1 top-[3px] bg-white w-3.5 h-3.5  rounded-full transition ${ avaiable ? "translate-x-[134%]" : ""
                                        }` }
                                ></div>
                            </label>

                            <input
                                type="checkbox"
                                id="dark-mode-toggle"
                                checked={ avaiable }
                                onChange={ handleToggle }
                                className="hidden"
                            />
                        </div>
                        <hr />
                        <div className="py-5">
                            <div className="flex justify-between ">
                                <label htmlFor="price">Giá</label>
                                <span
                                    className={ `inline-block  p-1.5  bg-[#23314b1a] rounded-full group hover:bg-[#23314b] transform transition-transform duration-300 ${ arrange ? "rotate-180" : ""
                                        }` }
                                    onClick={ handleTongleArrange }
                                >
                                    <MdOutlineKeyboardArrowDown className="text-[#23314b] text-xs group-hover:text-white" />
                                </span>
                            </div>
                            { arrange && (
                                <div className={ `mt-5` }>
                                    <div className="">
                                        <Slider
                                            className="slider w-full h-1 bg-[#23314b] rounded-full mb-6"
                                            onChange={ handleSliderChange } value={ value }
                                            min={ 0 }
                                            max={ 1000000 }
                                        />
                                    </div>

                                    <div className="flex items-center gap-5">
                                        <label
                                            htmlFor="min"
                                            className="border rounded-lg w-[83px] px-3 py-2.5 flex gap-1"
                                        >
                                            <span className="text-base text-[#23314bb3] font-thin">
                                                ₫
                                            </span>
                                            <input
                                                id="min"
                                                type="number"
                                                placeholder="0"
                                                className="placeholder:text-sm placeholder:font-thin placeholder:text-[#23314b] w-full text-end outline-none font-thin"
                                                min={ 0 }
                                                step={ 10000 }
                                                value={ value[ 0 ] }
                                                onChange={ ( e ) => setValue( [ parseInt( e.target.value ), value[ 1 ] ] ) }
                                            />
                                        </label>
                                        <span className="text-base text-[#23314bb3] font-thin">
                                            tới
                                        </span>
                                        <label
                                            htmlFor="max"
                                            className="border rounded-lg w-[83px] px-3 py-2.5 flex gap-1"
                                        >
                                            <span className="text-base text-[#23314bb3] font-thin">
                                                ₫
                                            </span>
                                            <input
                                                id="max"
                                                type="number"
                                                placeholder="0"
                                                className="placeholder:text-sm placeholder:font-thin placeholder:text-[#23314b] w-full text-end outline-none font-thin"
                                                min={ 0 }
                                                step={ 10000 }
                                                value={ value[ 1 ] }
                                                onChange={ ( e ) => setValue( [ value[ 0 ], parseInt( e.target.value ) ] ) }
                                            />
                                        </label>
                                    </div>
                                </div>
                            ) }
                        </div>
                        <hr />
                    </div>
                    {/* list product */ }
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-2 gap-y-6 md:gap-x-6 md:gap-y-12 z-10">
                        { sortedProducts.map( ( product: any ) =>
                        {
                            return <Link to={ `/home/product-detail/${ product?._id }` } className=" flex-1" key={ product?._id }>
                                <div className="gap-x-2 gap-y-6 md:gap-x-6 md:gap-y-12 lg:grid-cols-3 z-10">
                                    <div className="">
                                        <div className="relative ">
                                            <img className="object-cover w-full" src={ product?.images[ 0 ]?.url } alt="" />
                                            <p className="absolute z-10 top-3 left-3 bg-[#f83a3a] text-[8px] sm:text-xs font-semibold rounded-full text-white px-2 py-[3px]">Tiết kiệm 21.000₫</p>
                                            <button className="absolute text-[15px] font-medium bg-[#23314b] border-2 border-transparent text-white px-5 py-2 z-10 right-4 bottom-2 rounded-full hover:bg-transparent hover:text-[#23314b] hover:border-2 hover:border-[#23314b] opacity-0 group-hover:opacity-100 group-hover:bottom-4 transition duration-500 ease-in-out">+ Thêm nhanh</button>
                                        </div>
                                        <p className="text-[#23314b] text-sm md:text-[17px] font-semibold text-center mt-[20px] ">{ product.name }</p>
                                        <p className="flex justify-center gap-2">
                                            <span className="text-[#f83a3a] text-sm md:text-base font-extralight">{ product?.price?.toLocaleString() }₫</span>
                                            <span className="line-through text-sm md:text-base font-extralight text-[#23314bb3]">{ product?.original_price?.toLocaleString() }₫</span>
                                        </p>
                                    </div>



                                </div>
                            </Link>
                        } ) }
                    </div>
                </div>
                <div className="mx-auto mt-8 flex justify-between items-center w-44 border rounded-full h-[50px] font-thin text-[#23314b] text-[17px]">
                    <span className="px-5"><MdOutlineKeyboardArrowLeft /></span>
                    <span className="px-2">1 / 2</span>
                    <span className="px-5"><MdOutlineKeyboardArrowRight /></span>
                </div>
            </div>

        </section>
    );
};

export default ListProduct;
