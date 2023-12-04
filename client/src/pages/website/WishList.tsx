import React, { useEffect } from 'react'
import { useDeleteoneWishListMutation, useGetWishListQuery } from '../../store/Auth/Auth.services'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { TiDelete } from "react-icons/ti";
import { toastError, toastSuccess } from '../../hook/toastify';

const WishList = () =>
{
    const location = useLocation();

    const { data: wistListProduct, refetch } = useGetWishListQuery( [] )

    const check = localStorage.getItem( 'token' ); // Lấy token từ Local Storage

    const [ deleteWishList ] = useDeleteoneWishListMutation()

    const removeWishList = ( id: string ) =>
    {
        deleteWishList( id )
            .unwrap()
            .then( () =>
            {
                toastSuccess( "Xoá sản phẩm yêu thích thành công" );
                refetch(); // Gọi lại hàm refetch để cập nhật danh sách yêu thích sau khi xóa sản phẩm
            } )
            .catch( ( error ) =>
            {
                toastError( error.data.message );
            } );
    };
    useEffect( () =>
    {
        const fetchData = async () =>
        {
            try
            {
                // Gọi hàm refetch để tải lại dữ liệu giỏ hàng
                await refetch();
                // Dữ liệu giỏ hàng đã được cập nhật
            } catch ( error: any )
            {
                toastError( error.data.error )   // Xử lý lỗi nếu có
            }
        };

        fetchData(); // Gọi hàm fetchData khi location.pathname thay đổi
    }, [ location.pathname, refetch ] );
    const navigate = useNavigate();
    const handleGetProductDetail = ( idProduct: string ) =>
    {
        navigate( `/home/product-detail/${ idProduct }` )
    }
    return (
        <div>
            <h1 className="text-4xl sm:text-6xl font-[Noto sans] text-[#23314B] font-medium md:pt-10 lg:pt-16 text-center">Sản phẩm yêu thích</h1>
            { check ? (
                <div className="flex flex-wrap mt-[50px] space-x-5 ml-[120px]">
                    { wistListProduct?.wishList?.map( ( product: any, index: any ) => (

                        <div key={ index } className="relative w-full sm:w-96  rounded-xl bg-white bg-clip-border text-gray-700  group">
                            <button className='py-4' onClick={ () => removeWishList( product._id ) }>
                                <TiDelete />

                            </button>
                            <Link to={ `/home/product-detail/${ product._id }` } className="mt-[20]" key={ product._id }>
                                <div className="relative h-100 rounded-xl bg-white bg-clip-border text-gray-700  overflow-hidden group-hover:scale-105 transition-transform duration-300 ease-in-out">

                                    { product.original_price && (
                                        <p className="absolute z-10 top-3 left-3 bg-[#f83a3a] text-[8px] sm:text-xs font-semibold rounded-full text-white px-2 py-[3px]">
                                            Tiết kiệm { ( product.price - product.original_price ).toLocaleString() } đ
                                        </p>
                                    ) }
                                    <img className="object-cover w-full" src={ product?.images[ 0 ]?.url } alt="profile-picture" />
                                    <p className="text-center text-[20px] font-semibold mt-2">{ product.name }</p>
                                    <div className="flex space-x-4 ml-[120px]  mb-4 text-center">
                                        <p className="flex space-x-4 mt-2">
                                            {/* Conditional rendering based on the existence of original_price */ }
                                            { product.original_price ? (
                                                <>
                                                    <span className="text-[#f83a3a] text-sm md:text-base font-extralight text-center">{ product.original_price.toLocaleString() }₫</span>
                                                    <span className="line-through text-sm md:text-base font-extralight text-[#23314bb3]">{ product.price.toLocaleString() }₫</span>
                                                </>
                                            ) : (
                                                <span className=" text-sm md:text-base font-extralight text-align-center text-[#23314bb3]">{ product.price.toLocaleString() }₫</span>
                                            ) }
                                        </p>
                                    </div>
                                    <button onClick={ () => handleGetProductDetail( product._id ) } className="absolute top-[70%] right-0 bg-[#23314b] text-white text-center py-2 hover:bg-transparent hover:text-[#23314b] hover:border-2 hover:border-[#23314b] transition-all duration-300 ease-in-out opacity-0 group-hover:opacity-100 rounded-full w-[150px]">
                                        + Thêm nhanh
                                    </button>
                                </div>
                            </Link>
                        </div>

                    )
                    ) }
                </div>
            ) : (
                <div className="flex items-center justify-center h-48">
                    <div className="text-center">
                        <p className="text-xl font-semibold mb-2">Bạn cần đăng nhập để xem sản phẩm yêu thích </p>
                        <Link to="/login">
                            <button className="border rounded-full text-white px-4 py-2 bg-[#23314B]">Đăng nhập</button>
                        </Link>
                    </div >
                </div >
            ) }


        </div>
    )
}

export default WishList