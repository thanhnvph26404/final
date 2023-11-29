// import React from 'react'
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useGetProductsQuery } from "../../store/products/product.services";
import { useAppDispatch } from "../../store/hook";
import { Iproductdata } from "../../store/products/product.interface";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useGetproductDiscountApiQuery, useGetproductDiscountApiSoldQuery } from "../../store/productDiscount/productDiscont";

const HomePage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const handleGetProductDetail = (idProduct: string) => {
    navigate(`/home/product-detail/${idProduct}`)
  }
  const { data: productList } = useGetProductsQuery(null);
  const { data: productsold } = useGetproductDiscountApiSoldQuery(null)
  const { data: productDiscont } = useGetproductDiscountApiQuery(null)

  console.log(productDiscont);


  return (
    <div className="mx-auto items-center">
      {/* banner */}
      <div className="flex items-center justify-center sm:justify-start">
        <img src="/bannerfirst.jpg" alt="" className="w-full sm:w-auto" />
      </div>
      {/* Danh mục sản phẩm */}
      <h1 className="text-4xl sm:text-6xl font-[Noto sans] text-[#23314B] font-medium md:pt-10 lg:pt-16 text-center">Danh Mục Sản Phẩm</h1>
      {/* Card */}
      <div className="flex flex-col sm:flex-row mx-auto justify-center mt-[80px] mb-10 space-y-6 sm:space-y-0 sm:space-x-6 max-w-screen-xl">
        {/* Card 1 */}
        <div className="relative w-full sm:w-96 flex-col rounded-xl bg-clip-border text-gray-700 ">
          <div className="relative h-96 sm:h-100 overflow-hidden rounded-xl bg-clip-border text-gray-700 ">
            <div className="object-cover w-full transform scale-100 group-hover:scale-110 transition-transform bg-gray-600">
              <img className="object-cover w-full opacity-70" src="/pl1.jpg" alt="profile-picture" />
              <a href="#">
                <p className="absolute text-white top-[40%] left-[25%] text-[25px] font-medium text-center">Polo Trơn Basic</p>
                <p className="text-white pt-20 font-[Noto Sans] text-[20px] font-bold absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <i className="fas fa-chevron-circle-right fa-2x"></i>
                </p>
              </a>
            </div>
          </div>
        </div>

        {/* Card 2 */}
        <div className="relative w-full sm:w-96 flex-col rounded-xl bg-clip-border text-gray-700 ">
          <div className="relative h-96 sm:h-100 overflow-hidden rounded-xl bg-clip-border text-gray-700 ">
            <div className="object-cover w-full transform scale-100 group-hover:scale-110 transition-transform bg-gray-600">
              <img className="object-cover w-full opacity-70" src="/pl2.jpg" alt="profile-picture" />
              <a href="#">
                <p className="absolute text-white top-[40%] left-[25%] text-[25px] font-medium text-center">Polo Trơn Basic</p>
                <p className="text-white pt-20 font-[Noto Sans] text-[20px] font-bold absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <i className="fas fa-chevron-circle-right fa-2x"></i>
                </p>
              </a>
            </div>
          </div>
        </div>

        {/* Card 3 */}
        <div className="relative w-full sm:w-96 flex-col rounded-xl bg-clip-border text-gray-700 ">
          <div className="relative h-96 sm:h-100 overflow-hidden rounded-xl bg-clip-border text-gray-700 ">
            <div className="object-cover w-full transform scale-100 group-hover:scale-110 transition-transform bg-gray-600">
              <img className="object-cover w-full opacity-70" src="/pl3.jpg" alt="profile-picture" />

              <a href="#">
                <p className="absolute text-white top-[40%] left-[25%] text-[25px] font-medium text-center">Polo Trơn Basic</p>
                <p className="text-white pt-20 font-[Noto Sans] text-[20px] font-bold absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <i className="fas fa-chevron-circle-right fa-2x"></i>
                </p>
              </a>
            </div>
          </div>
        </div>

        {/* Card 4 */}
        <div className="relative w-full sm:w-96 flex-col rounded-xl bg-clip-border text-gray-700 ">
          <div className="relative h-96 sm:h-100 overflow-hidden rounded-xl bg-clip-border text-gray-700 ">
            <div className="object-cover w-full transform scale-100 group-hover:scale-110 transition-transform bg-gray-600">
              <img className="object-cover w-full opacity-70" src="/pl4.jpg" alt="profile-picture" />
              <a href="#">
                <p className="absolute text-white top-[40%] left-[35%] text-[25px] font-medium text-center">Áo Thun</p>
                <p className="text-white pt-20 font-[Noto Sans] text-[20px] font-bold absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <i className="fas fa-chevron-circle-right fa-2x"></i>
                </p>
              </a>
            </div>
          </div>
        </div>
      </div>


      <div className="grid grid-cols-3 ">
        <div>
          <h1 className="text-[44px] leading-[48px] font-[Noto sans]  text-[#23314B] font-semibold  md:pt-[50px] lg:pt-[40px] md:[40px] lg:[60px] ml-[100px] mb-[50px]">Sản Phẩm Mới</h1>
        </div>
        <div>

        </div>
        <div className="space-x-2 flex">
          <div>
            <Link to="/products">
              <h2 className="mt-[50px] font-thin text-[20px] py-1.5 text-[#23314bb3]  ml-[150px] inline-block relative after:absolute after:bottom-2 after:left-0 after:bg-gray-700 after:h-0.5 hover:after:w-full after:w-0 after:transition-all after:ease-in-out after:duration-300">Xem toàn bộ sản phẩm  </h2>
            </Link>
          </div>
          <div className="mt-[55px]">
            <span className="inline-block  p-1.5  bg-[#23314b1a] rounded-full group hover:bg-[#23314b] transform transition-transform duration-300 ">
              <MdOutlineKeyboardArrowRight className="text-[#23314b] text-[14px] group-hover:text-white  " />
            </span>
          </div>
        </div>
      </div>


      {/* sản phẩm mới */}
      <div className="flex flex-wrap">
        {productList?.products?.map((product: any) => {
          return (
            <div key={product._id} className="flex flex-row sm:flex-row mx-auto justify-center mt-10 mb-10 space-y-6 sm:space-y-0 sm:space-x-6 max-w-screen-xl">
              {/* Card 1 */}
              <div className="relative w-full sm:w-96 flex-col rounded-xl bg-white bg-clip-border text-gray-700 group">
                <div className="relative h-100 rounded-xl bg-white bg-clip-border text-gray-700 overflow-hidden group-hover:scale-105 transition-transform duration-300 ease-in-out">

                  <p className="absolute z-10 top-3 left-3 bg-[#f83a3a] text-[8px] sm:text-xs font-semibold rounded-full text-white px-2 py-[3px]">
                    Tiết kiệm {product.discountProduct}đ
                  </p>


                  <img className="object-cover w-full" src={product?.images[0]?.url} alt="profile-picture" />
                  <p className="text-center text-[20px] font-semibold">{product.name}</p>
                  <div className="flex space-x-4 pl-[130px] mb-4">
                    <>
                      <span className="text-[#f83a3a] text-sm md:text-base font-extralight text-center">{product.original_price.toLocaleString()}₫</span>
                      <span className="line-through text-sm md:text-base font-extralight text-[#23314bb3]">{product.price.toLocaleString()}₫</span>
                    </>

                  </div>
                  <button onClick={() => handleGetProductDetail(product._id)} className="absolute top-[70%] right-0 bg-[#23314b] text-white text-center py-2 hover:bg-transparent hover:text-[#23314b] hover:border-2 hover:border-[#23314b] transition-all duration-300 ease-in-out opacity-0 group-hover:opacity-100 rounded-full w-[150px]">
                    + Thêm nhanh
                  </button>
                </div>
              </div>

              {/* Card 2 */}
            </div>
          );
        })}
      </div>

      


      {/*sản phẩm bán chạy*/}

      <div className="grid grid-cols-3 ">
        <div>
          <h1 className="text-[44px] leading-[48px]  font-[Noto sans]  text-[#23314B] font-semibold  md:pt-[50px] lg:pt-[40px] md:[40px] lg:[60px] ml-[80px] mb-[50px]">Sản Phẩm Bán Chạy</h1>
        </div>
        <div>

        </div>
        <div className="space-x-2 flex">
          <div>
            <h2 className="mt-[50px] font-thin text-[20px] py-1.5 text-[#23314bb3]  ml-[150px] inline-block relative after:absolute after:bottom-2 after:left-0 after:bg-gray-700 after:h-0.5 hover:after:w-full after:w-0 after:transition-all after:ease-in-out after:duration-300">Xem thêm </h2>
          </div>
          <div className="mt-[55px]">
            <span className="inline-block  p-1.5  bg-[#23314b1a] rounded-full group hover:bg-[#23314b] transform transition-transform duration-300 ">
              <MdOutlineKeyboardArrowRight className="text-[#23314b] text-[14px] group-hover:text-white  " />
            </span>
          </div>
        </div>
      </div>


      {/* sản phẩm */}
      <div className="flex flex-wrap">
        {productsold?.productsSoldOverTwenty?.map((product: any) => {
          return (
            <div key={product._id} className="flex flex-row sm:flex-row mx-auto justify-center mt-10 mb-10 space-y-6 sm:space-y-0 sm:space-x-6 max-w-screen-xl">
              {/* Card 1 */}
              <div className="relative w-full sm:w-96 flex-col rounded-xl bg-white bg-clip-border text-gray-700 group">
                <div className="relative h-100 rounded-xl bg-white bg-clip-border text-gray-700 overflow-hidden group-hover:scale-105 transition-transform duration-300 ease-in-out">
                  {product.original_price && (
                    <p className="absolute z-10 top-3 left-3 bg-[#f83a3a] text-[8px] sm:text-xs font-semibold rounded-full text-white px-2 py-[3px]">
                      Tiết kiệm {product.price - product.original_price} đ
                    </p>
                  )}

                  <img className="object-cover w-full" src="/sp1.jpg" alt="profile-picture" />
                  <p className="text-center text-[20px] font-semibold">{product.name}</p>
                  <div className="flex space-x-4 pl-[130px] mb-4">
                    {product.original_price ? (
                      <>
                        <span className="text-[#f83a3a] text-sm md:text-base font-extralight text-center">{product.original_price.toLocaleString()}₫</span>
                        <span className="line-through text-sm md:text-base font-extralight text-[#23314bb3]">{product.price.toLocaleString()}₫</span>
                      </>
                    ) : (
                      <span className="text-sm md:text-base font-extralight text-align-center text-[#23314bb3]">{product.price}₫</span>
                    )}
                  </div>
                  <button onClick={() => handleGetProductDetail(product._id)} className="absolute top-[70%] right-0 bg-[#23314b] text-white text-center py-2 hover:bg-transparent hover:text-[#23314b] hover:border-2 hover:border-[#23314b] transition-all duration-300 ease-in-out opacity-0 group-hover:opacity-100 rounded-full w-[150px]">
                    + Thêm nhanh
                  </button>
                </div>
              </div>

              
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-3 ">
        <div>
          <h1 className="text-[44px] leading-[48px]  font-[Noto sans]  text-[#23314B] font-semibold  md:pt-[50px] lg:pt-[40px] md:[40px] lg:[60px] ml-[80px] mb-[50px]">Sản Phẩm giảm giá</h1>
        </div>
        <div>

        </div>
        <div className="space-x-2 flex">
          <div>
            <h2 className="mt-[50px] font-thin text-[20px] py-1.5 text-[#23314bb3]  ml-[150px] inline-block relative after:absolute after:bottom-2 after:left-0 after:bg-gray-700 after:h-0.5 hover:after:w-full after:w-0 after:transition-all after:ease-in-out after:duration-300">Xem thêm </h2>
          </div>
          <div className="mt-[55px]">
            <span className="inline-block  p-1.5  bg-[#23314b1a] rounded-full group hover:bg-[#23314b] transform transition-transform duration-300 ">
              <MdOutlineKeyboardArrowRight className="text-[#23314b] text-[14px] group-hover:text-white  " />
            </span>
          </div>
        </div>
      </div>

      {/* sản phẩm */}
      <div className="flex flex-wrap">
        {productDiscont?.productsWithDiscount?.map((product: any) => {
          return (
            <div key={product._id} className="flex flex-row sm:flex-row mx-auto justify-center mt-10 mb-10 space-y-6 sm:space-y-0 sm:space-x-6 max-w-screen-xl">
              {/* Card 1 */}
              <div className="relative w-full sm:w-96 flex-col rounded-xl bg-white bg-clip-border text-gray-700 group">
                <div className="relative h-100 rounded-xl bg-white bg-clip-border text-gray-700 overflow-hidden group-hover:scale-105 transition-transform duration-300 ease-in-out">

                  <p className="absolute z-10 top-3 left-3 bg-[#f83a3a] text-[8px] sm:text-xs font-semibold rounded-full text-white px-2 py-[3px]">
                    Tiết kiệm {product.discountProduct}đ
                  </p>


                  <img className="object-cover w-full" src="/sp1.jpg" alt="profile-picture" />
                  <p className="text-center text-[20px] font-semibold">{product.name}</p>
                  <div className="flex space-x-4 pl-[130px] mb-4">
                    <>
                      <span className="text-[#f83a3a] text-sm md:text-base font-extralight text-center">{product.original_price.toLocaleString()}₫</span>
                      <span className="line-through text-sm md:text-base font-extralight text-[#23314bb3]">{product.price.toLocaleString()}₫</span>
                    </>

                  </div>
                  <button onClick={() => handleGetProductDetail(product._id)} className="absolute top-[70%] right-0 bg-[#23314b] text-white text-center py-2 hover:bg-transparent hover:text-[#23314b] hover:border-2 hover:border-[#23314b] transition-all duration-300 ease-in-out opacity-0 group-hover:opacity-100 rounded-full w-[150px]">
                    + Thêm nhanh
                  </button>
                </div>
              </div>

              {/* Card 2 */}
            </div>
          );
        })}
      </div>



      {/* banner dưới */}
      <div className="w-full relative text-center mb-[90px] ">
        <img src="/bannerdown.jpg" alt="" className="w-full  sm:w-[1700px] h-[450px] mt-[100px]" />
        <div className="absolute top-[120px] left-[50%] text-white transform -translate-x-1/2">
          <p className="md:text-[10px] lg:text-[20px] font-[Noto Sans] font-bold">Định vị thương hiệu</p>
          <p className=" md:text-[50px] lg:text-[60px] font-[Noto Sans] font-bold">New class of casual Polo</p>
        </div>
        <div className="absolute top-[250px] left-[50%] text-white transform -translate-x-1/2">
          <p className=" md:text-[10px] lg:text-[20px] font-[Noto Sans] font-medium ">Polomanor định vị sự khác biệt đến từ những chiếc áo Polo đời thường hằng ngày, mỗi sản phẩm mang đủ 3 yếu tố:</p>
          <p className=" md:text-[10px] lg:text-[20px] font-[Noto Sans] font-medium mt-5 ">Dễ phối - Sang trọng - Tiện lợi</p>
        </div>


      </div>

      {/* một số hình ảnh */}
      <div className="flex ml-[120px]  space-x-10  mt-8 sm:mt-12">

        <div className="relative ">
          <img className="w-full transition-transform transform-gpu hover:scale-105 rounded-xl " src="/imgleft.png" alt="Image" />
          <p className="absolute top-[50%] text-center text-white text-[27px] font-medium ">Mỗi sản phẩm đến tay bạn là những chất xám và công sức của cả một tập thể phía sau</p>
        </div>
        <div>
          <div className="relative  flex space-x-6">
            <div>
              <img className=" h-[270px] w-full transition-transform hover:scale-105 rounded-xl" src="/center.jpg" alt="" />
            </div>
            <div>
              <img className=" h-[270px] w-full transition-transform  hover:scale-105 rounded-xl" src="/imgright.jpg" alt="" />
            </div>
          </div>
          <div>
            <img className=" h-[300px] w-full mt-[35px] transition-transform  hover:scale-105 rounded-xl" src="/bt.jpg" alt="" />
          </div>
        </div>
      </div>

    </div >


  )
}

export default HomePage