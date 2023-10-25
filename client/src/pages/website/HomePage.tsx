// import React from 'react'

const HomePage = () =>
{
  return (
    <div className="mx-auto">
      {/* banner */ }
      <div className="flex items-center justify-center sm:justify-start">
        <img src="/bannerfirst.jpg" alt="" className="w-full sm:w-auto" />
      </div>
      {/* Danh mục sản phẩm */ }
      <h1 className="text-4xl sm:text-6xl font-[Noto sans] text-[#23314B] font-medium md:pt-10 lg:pt-16 text-center">Danh Mục Sản Phẩm</h1>
      {/* Card */ }
      <div className="flex flex-col sm:flex-row mx-auto justify-center mt-[80px] mb-10 space-y-6 sm:space-y-0 sm:space-x-6 max-w-screen-xl">
        {/* Card 1 */ }
        <div className="relative w-full sm:w-96 flex-col rounded-xl bg-clip-border text-gray-700 shadow-md">
          <div className="relative h-96 sm:h-100 overflow-hidden rounded-xl bg-clip-border text-gray-700 shadow-lg group">
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

        {/* Card 2 */ }
        <div className="relative w-full sm:w-96 flex-col rounded-xl bg-clip-border text-gray-700 shadow-md">
          <div className="relative h-96 sm:h-100 overflow-hidden rounded-xl bg-clip-border text-gray-700 shadow-lg group">
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

        {/* Card 3 */ }
        <div className="relative w-full sm:w-96 flex-col rounded-xl bg-clip-border text-gray-700 shadow-md">
          <div className="relative h-96 sm:h-100 overflow-hidden rounded-xl bg-clip-border text-gray-700 shadow-lg group">
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

        {/* Card 4 */ }
        <div className="relative w-full sm:w-96 flex-col rounded-xl bg-clip-border text-gray-700 shadow-md">
          <div className="relative h-96 sm:h-100 overflow-hidden rounded-xl bg-clip-border text-gray-700 shadow-lg group">
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
          <h1 className="text-4xl font-[Noto sans] text-[#23314B] font-medium  md:pt-[50px] lg:pt-[40px] md:[40px] lg:[60px] ml-[100px] mb-[50px]">Sản Phẩm Mới</h1>
        </div>
        <div>

        </div>
        <div>
          <h2 className="mt-[40px] text-2xl hover:underline underline-offset-8">Xem toàn bộ sản phẩm <i className="fa-solid fa-arrow-right"></i></h2>
        </div>
      </div>

      {/* sản phẩm mới */ }

      <div className="flex flex-col sm:flex-row mx-auto justify-center mt-10 mb-10 space-y-6 sm:space-y-0 sm:space-x-6 max-w-screen-xl">
        {/* Card 1 */ }
        <div className="relative w-full sm:w-96 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md group">
          <div className="relative h-100 rounded-xl bg-white bg-clip-border text-gray-700 shadow-lg overflow-hidden group-hover:scale-105 transition-transform duration-300 ease-in-out">
            <img className="object-cover w-full" src="/sp1.jpg" alt="profile-picture" />
            <p className="text-center font-[Noto sans] text-[20px] font-medium">Áo Polo</p>
            <div className="flex space-x-4 pl-[60px] mb-4">
              <p className="text-center font-[Noto sans] text-[20px] font-medium text-red-500">200.000đ</p>
              <p className="text-center font-[Noto sans] text-[20px] font-medium line-through">350.000đ</p>
            </div>
            <button className="absolute top-[60%] right-0 bg-blue-800 text-white text-center py-2 hover:bg-green-500 transition-all duration-300 ease-in-out opacity-0 group-hover:opacity-100 rounded-full w-[150px] ">
              + Thêm nhanh
            </button>
          </div>
        </div>

        {/* Card 2 */ }
        <div className="relative w-full sm:w-96 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md group">
          <div className="relative h-100 rounded-xl bg-white bg-clip-border text-gray-700 shadow-lg overflow-hidden group-hover:scale-105 transition-transform duration-300 ease-in-out">
            <img className="object-cover w-full" src="/sp2.jpg" alt="profile-picture" />
            <p className="text-center font-[Noto sans] text-[20px] font-medium">Áo Polo</p>
            <div className="flex space-x-4 pl-[60px] mb-4">
              <p className="text-center font-[Noto sans] text-[20px] font-medium text-red-500">200.000đ</p>
              <p className="text-center font-[Noto sans] text-[20px] font-medium line-through">350.000đ</p>
            </div>
            <button className="absolute top-[60%] right-0 bg-blue-800 text-white text-center py-2 hover:bg-green-500 transition-all duration-300 ease-in-out opacity-0 group-hover:opacity-100 rounded-full w-[150px] ">
              + Thêm nhanh
            </button>
          </div>
        </div>

        {/* Card 3 */ }
        <div className="relative w-full sm:w-96 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md group">
          <div className="relative h-100 rounded-xl bg-white bg-clip-border text-gray-700 shadow-lg overflow-hidden group-hover:scale-105 transition-transform duration-300 ease-in-out">
            <img className="object-cover w-full" src="/sp3.jpg" alt="profile-picture" />
            <p className="text-center font-[Noto sans] text-[20px] font-medium">Áo Polo</p>
            <div className="flex space-x-4 pl-[60px] mb-4">
              <p className="text-center font-[Noto sans] text-[20px] font-medium text-red-500">200.000đ</p>
              <p className="text-center font-[Noto sans] text-[20px] font-medium line-through">350.000đ</p>
            </div>
            <button className="absolute top-[60%] right-0 bg-blue-800 text-white text-center py-2 hover:bg-green-500 transition-all duration-300 ease-in-out opacity-0 group-hover:opacity-100 rounded-full w-[150px] ">
              + Thêm nhanh
            </button>
          </div>
        </div>
        {/* card 4 */ }
        <div className="relative w-full sm:w-96 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md group">
          <div className="relative h-100 rounded-xl bg-white bg-clip-border text-gray-700 shadow-lg overflow-hidden group-hover:scale-105 transition-transform duration-300 ease-in-out">
            <img className="object-cover w-full" src="/sp4.jpg" alt="profile-picture" />
            <p className="text-center font-[Noto sans] text-[20px] font-medium">Áo Polo</p>
            <div className="flex space-x-4 pl-[60px] mb-4">
              <p className="text-center font-[Noto sans] text-[20px] font-medium text-red-500">200.000đ</p>
              <p className="text-center font-[Noto sans] text-[20px] font-medium line-through">350.000đ</p>
            </div>
            <button className="absolute top-[60%] right-0 bg-blue-800 text-white text-center py-2 hover:bg-green-500 transition-all duration-300 ease-in-out opacity-0 group-hover:opacity-100 rounded-full w-[150px] ">
              + Thêm nhanh
            </button>
          </div>
        </div>
      </div>

      {/* tất cả sản phẩm*/ }

      <div className="grid grid-cols-3 ">
        <div>
          <h1 className="text-4xl font-[Noto sans] text-[#23314B] font-medium  md:pt-[50px] lg:pt-[40px] md:[40px] lg:[60px] ml-[100px] mb-[50px]">Tất Cả Sản Phẩm</h1>
        </div>
        <div>

        </div>
        <div>
          <h2 className="mt-[40px] text-2xl hover:underline underline-offset-8">Xem toàn bộ sản phẩm <i className="fa-solid fa-arrow-right"></i></h2>
        </div>
      </div>


      {/* sản phẩm */ }

      <div className="flex flex-col sm:flex-row mx-auto justify-center mt-10 mb-10 space-y-6 sm:space-y-0 sm:space-x-6 max-w-screen-xl">
        {/* Card 1 */ }
        <div className="relative w-full sm:w-96 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md group">
          <div className="relative h-100 rounded-xl bg-white bg-clip-border text-gray-700 shadow-lg overflow-hidden group-hover:scale-105 transition-transform duration-300 ease-in-out">
            <img className="object-cover w-full" src="/sp1.jpg" alt="profile-picture" />
            <p className="text-center font-[Noto sans] text-[20px] font-medium">Áo Polo</p>
            <div className="flex space-x-4 pl-[60px] mb-4">
              <p className="text-center font-[Noto sans] text-[20px] font-medium text-red-500">200.000đ</p>
              <p className="text-center font-[Noto sans] text-[20px] font-medium line-through">350.000đ</p>
            </div>
            <button className="absolute top-[60%] right-0 bg-blue-800 text-white text-center py-2 hover:bg-green-500 transition-all duration-300 ease-in-out opacity-0 group-hover:opacity-100 rounded-full w-[150px] ">
              + Thêm nhanh
            </button>
          </div>
        </div>

        {/* Card 2 */ }
        <div className="relative w-full sm:w-96 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md group">
          <div className="relative h-100 rounded-xl bg-white bg-clip-border text-gray-700 shadow-lg overflow-hidden group-hover:scale-105 transition-transform duration-300 ease-in-out">
            <img className="object-cover w-full" src="/sp2.jpg" alt="profile-picture" />
            <p className="text-center font-[Noto sans] text-[20px] font-medium">Áo Polo</p>
            <div className="flex space-x-4 pl-[60px] mb-4">
              <p className="text-center font-[Noto sans] text-[20px] font-medium text-red-500">200.000đ</p>
              <p className="text-center font-[Noto sans] text-[20px] font-medium line-through">350.000đ</p>
            </div>
            <button className="absolute top-[60%] right-0 bg-blue-800 text-white text-center py-2 hover:bg-green-500 transition-all duration-300 ease-in-out opacity-0 group-hover:opacity-100 rounded-full w-[150px] ">
              + Thêm nhanh
            </button>
          </div>
        </div>

        {/* Card 3 */ }
        <div className="relative w-full sm:w-96 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md group">
          <div className="relative h-100 rounded-xl bg-white bg-clip-border text-gray-700 shadow-lg overflow-hidden group-hover:scale-105 transition-transform duration-300 ease-in-out">
            <img className="object-cover w-full" src="/sp3.jpg" alt="profile-picture" />
            <p className="text-center font-[Noto sans] text-[20px] font-medium">Áo Polo</p>
            <div className="flex space-x-4 pl-[60px] mb-4">
              <p className="text-center font-[Noto sans] text-[20px] font-medium text-red-500">200.000đ</p>
              <p className="text-center font-[Noto sans] text-[20px] font-medium line-through">350.000đ</p>
            </div>
            <button className="absolute top-[60%] right-0 bg-blue-800 text-white text-center py-2 hover:bg-green-500 transition-all duration-300 ease-in-out opacity-0 group-hover:opacity-100 rounded-full w-[150px] ">
              + Thêm nhanh
            </button>
          </div>
        </div>
        {/* card 4 */ }
        <div className="relative w-full sm:w-96 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md group">
          <div className="relative h-100 rounded-xl bg-white bg-clip-border text-gray-700 shadow-lg overflow-hidden group-hover:scale-105 transition-transform duration-300 ease-in-out">
            <img className="object-cover w-full" src="/sp4.jpg" alt="profile-picture" />
            <p className="text-center font-[Noto sans] text-[20px] font-medium">Áo Polo</p>
            <div className="flex space-x-4 pl-[60px] mb-4">
              <p className="text-center font-[Noto sans] text-[20px] font-medium text-red-500">200.000đ</p>
              <p className="text-center font-[Noto sans] text-[20px] font-medium line-through">350.000đ</p>
            </div>
            <button className="absolute top-[60%] right-0 bg-blue-800 text-white text-center py-2 hover:bg-green-500 transition-all duration-300 ease-in-out opacity-0 group-hover:opacity-100 rounded-full w-[150px] ">
              + Thêm nhanh
            </button>
          </div>
        </div>
      </div>

      {/* sản phẩm */ }

      <div className="flex flex-col sm:flex-row mx-auto justify-center mt-10 mb-10 space-y-6 sm:space-y-0 sm:space-x-6 max-w-screen-xl">
        {/* Card 1 */ }
        <div className="relative w-full sm:w-96 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md group">
          <div className="relative h-100 rounded-xl bg-white bg-clip-border text-gray-700 shadow-lg overflow-hidden group-hover:scale-105 transition-transform duration-300 ease-in-out">
            <img className="object-cover w-full" src="/sp1.jpg" alt="profile-picture" />
            <p className="text-center font-[Noto sans] text-[20px] font-medium">Áo Polo</p>
            <div className="flex space-x-4 pl-[60px] mb-4">
              <p className="text-center font-[Noto sans] text-[20px] font-medium text-red-500">200.000đ</p>
              <p className="text-center font-[Noto sans] text-[20px] font-medium line-through">350.000đ</p>
            </div>
            <button className="absolute top-[60%] right-0 bg-blue-800 text-white text-center py-2 hover:bg-green-500 transition-all duration-300 ease-in-out opacity-0 group-hover:opacity-100 rounded-full w-[150px] ">
              + Thêm nhanh
            </button>
          </div>
        </div>

        {/* Card 2 */ }
        <div className="relative w-full sm:w-96 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md group">
          <div className="relative h-100 rounded-xl bg-white bg-clip-border text-gray-700 shadow-lg overflow-hidden group-hover:scale-105 transition-transform duration-300 ease-in-out">
            <img className="object-cover w-full" src="/sp2.jpg" alt="profile-picture" />
            <p className="text-center font-[Noto sans] text-[20px] font-medium">Áo Polo</p>
            <div className="flex space-x-4 pl-[60px] mb-4">
              <p className="text-center font-[Noto sans] text-[20px] font-medium text-red-500">200.000đ</p>
              <p className="text-center font-[Noto sans] text-[20px] font-medium line-through">350.000đ</p>
            </div>
            <button className="absolute top-[60%] right-0 bg-blue-800 text-white text-center py-2 hover:bg-green-500 transition-all duration-300 ease-in-out opacity-0 group-hover:opacity-100 rounded-full w-[150px] ">
              + Thêm nhanh
            </button>
          </div>
        </div>

        {/* Card 3 */ }
        <div className="relative w-full sm:w-96 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md group">
          <div className="relative h-100 rounded-xl bg-white bg-clip-border text-gray-700 shadow-lg overflow-hidden group-hover:scale-105 transition-transform duration-300 ease-in-out">
            <img className="object-cover w-full" src="/sp3.jpg" alt="profile-picture" />
            <p className="text-center font-[Noto sans] text-[20px] font-medium">Áo Polo</p>
            <div className="flex space-x-4 pl-[60px] mb-4">
              <p className="text-center font-[Noto sans] text-[20px] font-medium text-red-500">200.000đ</p>
              <p className="text-center font-[Noto sans] text-[20px] font-medium line-through">350.000đ</p>
            </div>
            <button className="absolute top-[60%] right-0 bg-blue-800 text-white text-center py-2 hover:bg-green-500 transition-all duration-300 ease-in-out opacity-0 group-hover:opacity-100 rounded-full w-[150px] ">
              + Thêm nhanh
            </button>
          </div>
        </div>
        {/* card 4 */ }
        <div className="relative w-full sm:w-96 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md group">
          <div className="relative h-100 rounded-xl bg-white bg-clip-border text-gray-700 shadow-lg overflow-hidden group-hover:scale-105 transition-transform duration-300 ease-in-out">
            <img className="object-cover w-full" src="/sp4.jpg" alt="profile-picture" />
            <p className="text-center font-[Noto sans] text-[20px] font-medium">Áo Polo</p>
            <div className="flex space-x-4 pl-[60px] mb-4">
              <p className="text-center font-[Noto sans] text-[20px] font-medium text-red-500">200.000đ</p>
              <p className="text-center font-[Noto sans] text-[20px] font-medium line-through">350.000đ</p>
            </div>
            <button className="absolute top-[60%] right-0 bg-blue-800 text-white text-center py-2 hover:bg-green-500 transition-all duration-300 ease-in-out opacity-0 group-hover:opacity-100 rounded-full w-[150px] ">
              + Thêm nhanh
            </button>
          </div>
        </div>
      </div>

      {/* banner dưới */ }
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

      {/* một số hình ảnh */ }
      <div className="flex ml-[70px] mb-[100px] space-x-10  mt-8 sm:mt-12">
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


    </div>



  )
}

export default HomePage