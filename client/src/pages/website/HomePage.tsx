// import React from 'react'

const HomePage = () => {
  return (
    <div className="">
      <div className="w-full relative text-center ">
        <img src="/img.jpg" alt="" className="w-full  sm:w-[1700px] h-[800px]" />
        <div className="absolute top-[200px] left-[50%] text-white transform -translate-x-1/2">
          <p className=" md:text-[50px] lg:text-[60px] font-[Noto Sans] font-bold">Collection is here</p>
        </div>
        <div className="absolute top-[300px] left-[50%] text-white transform -translate-x-1/2">
          <p className=" md:text-[20px] lg:text-[30px] font-[Noto Sans] ">The time is now for it to be okay to be great. People in this world shun people for
            being great. For being a bright color. For standing out.</p>
        </div>
        <div className="absolute top-[65%] left-[50%] bg-gray-600 transform -translate-x-1/2 -translate-y-1/2 text-white md:w-[50px] lg:w-[100px] border">
          <a href="#" className="text-[10px] md:text-[12px] lg:text-[20px] font-[Roboto] ">Explore</a>
        </div>

      </div>
      <div className="mt-[30px]">
        <h1 className="text-center text-[40px] font-[Noto Sans] font-bold ">Shop by Category</h1>
        <p className="text-center  font-montserrat font-sans text-[20px] font-medium " >Browse all categories <i className="fa-solid fa-chevron-right fa-sm"></i></p>
      </div>

      <div className="flex flex-col sm:flex-row mx-auto justify-center mt-10 mb-10 space-y-6 sm:space-y-0 sm:space-x-6 max-w-screen-xl">
        {/* Card 1 */}
        <div className="relative w-full sm:w-96 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
          <div className="relative h-100 overflow-hidden rounded-xl bg-white bg-clip-border text-gray-700 shadow-lg">
            <div className="absolute top-[60%] left-[30%] text-center  ">
              <a href=""><p className="text-white ">Pre fall</p></a>
              <a href=""><p className="text-white font-[Noto Sans] text-[25px] font-bold">Silk Dresses</p></a>
              <a href=""><p className="text-white mt-6 text-[15px] ">See Products <i className="fa-solid fa-chevron-right fa-sm" ></i></p></a>
            </div>
            <img className="object-cover  w-full" src="/img3.jpg" alt="profile-picture" />
          </div>
        </div>

        {/* Card 2 */}
        <div className="relative w-full sm:w-96 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
          <div className="relative h-100 overflow-hidden rounded-xl bg-white bg-clip-border text-gray-700 shadow-lg">
            <div className="absolute top-[60%] left-[30%] text-center  ">
              <a href=""><p className="text-white ">Designers</p></a>
              <a href=""><p className="text-white font-[Noto Sans] text-[25px] font-bold">Suits</p></a>
              <a href=""><p className="text-white mt-6 text-[15px] ">See Products <i className="fa-solid fa-chevron-right fa-sm" ></i></p></a>
            </div>
            <img className="object-cover w-full" src="/img0.jpg" alt="profile-picture" />
          </div>
        </div>

        {/* Card 3 */}
        <div className="relative w-full sm:w-96 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
          <div className="relative h-100 overflow-hidden rounded-xl bg-white bg-clip-border text-gray-700 shadow-lg">
            <div className="absolute top-[60%] left-[30%] text-center  ">
              <a href=""><p className="text-white ">Summer</p></a>
              <a href=""><p className="text-white font-[Noto Sans] text-[25px] font-bold">Festival</p></a>
              <a href=""><p className="text-white mt-6 text-[15px] ">See Products <i className="fa-solid fa-chevron-right fa-sm" ></i></p></a>
            </div>
            <img className="object-cover  w-full" src="/img1.jpg" alt="profile-picture" />
          </div>
        </div>
        {/* card 4 */}
        <div className="relative w-full sm:w-96 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
          <div className="relative h-100 overflow-hidden rounded-xl bg-white bg-clip-border text-gray-700 shadow-lg">
            <div className="absolute top-[60%] left-[30%] text-center  ">
              <a href=""><p className="text-white ">Sale</p></a>
              <a href=""><p className="text-white font-[Noto Sans] text-[25px] font-bold">Showroom</p></a>
              <a href=""><p className="text-white mt-6 text-[15px] ">See Products <i className="fa-solid fa-chevron-right fa-sm" ></i></p></a>
            </div>
            <img className="object-cover  w-full" src="/img2.jpg" alt="profile-picture" />
          </div>
        </div>
      </div>

      <div className="relative">
        <img src="/product.jpg" alt="" className="w-full h-auto sm:w-full sm:max-w-screen-xl mx-auto" />
        <div className="absolute top-[55%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-center">
          <p className="text-lg sm:text-2xl md:text-4xl lg:text-6xl font-bold">Basic Starter Pack</p>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl font-[Noto Sans]">The time is now for it to be okay to be great. People in this world shun people for being great. For being a bright color. For standing out.</p>
          <div className="mt-4 border  bg-gray-600 inline-block px-2 sm:px-4 py-1 sm:py-2 rounded-lg">
            <a href="#" className="text-xs sm:text-sm md:text-base lg:text-xl font-[Roboto]">Explore New Collection</a>
          </div>
        </div>
      </div>

      <div className="relative mt-[50px]">
        <img src="/under.jpg" alt="" className="w-full h-auto sm:w-full sm:max-w-screen-xl mx-auto" />
        <div className="absolute top-[55%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-center">
          <p className="text-lg sm:text-2xl md:text-4xl lg:text-6xl font-bold">Exclusive Discounts for Membersc</p>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl font-[Noto Sans]">The time is now for it to be okay to be great. People in this world shun people for being great. For
            being a bright color. For standing out. But the time is now to be okay to be the greatest you. </p>
          <div className="mt-4 border  bg-gray-800 inline-block px-2 sm:px-4 py-1 sm:py-2 rounded-lg">
            <a href="#" className="text-xs sm:text-sm md:text-base lg:text-xl font-[Roboto]"><i className="fa-solid fa-gift"></i> Get your code</a>
          </div>
        </div>
      </div>














      <div className="mt-[100px] mb-10 text-center">
        <p className="text-3xl text-green-900 font-bold">Feedback Corner</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mx-4 ml-[100px] mb-[100px]">
        <div className="w-full sm:w-1/2 md:w-4/5">
          <div className="flex">
            <p className="text-2xl ml-2"><i className="fa-solid fa-star text-[#fff824] mb-4"></i></p>
            <p className="text-2xl ml-2"><i className="fa-solid fa-star text-[#fff824] mb-4"></i></p>
            <p className="text-2xl ml-2"><i className="fa-solid fa-star text-[#fff824] mb-4"></i></p>
            <p className="text-2xl ml-2"><i className="fa-solid fa-star text-[#fff824] mb-4"></i></p>
            <p className="text-2xl ml-2"><i className="fa-regular fa-star text-[#fff824] mb-4"></i></p>
          </div>
          <p className="font-[Roboto] text-lg text-green-900">Emily Wilson</p>
          <p className="font-[Roboto]">Trải nghiệm của khách hàng thật đặc biệt từ đầu đến cuối. Trang web thân thiện với người dùng, quy trình thanh toán diễn ra suôn sẻ và quần áo tôi đặt vừa vặn hoàn hảo. Tôi quá hài lòng!</p>
        </div>
        <div className="w-full sm:w-1/2 md:w-4/5 ">
          <div className="flex">
            <p className="text-2xl ml-2"><i className="fa-solid fa-star text-[#fff824] mb-4"></i></p>
            <p className="text-2xl ml-2"><i className="fa-solid fa-star text-[#fff824] mb-4"></i></p>
            <p className="text-2xl ml-2"><i className="fa-solid fa-star text-[#fff824] mb-4"></i></p>
            <p className="text-2xl ml-2"><i className="fa-solid fa-star text-[#fff824] mb-4"></i></p>
            <p className="text-2xl ml-2"><i className="fa-regular fa-star text-[#fff824] mb-4"></i></p>
          </div>
          <p className="font-[Roboto] text-lg text-green-900">Sarah Thompson</p>
          <p className="font-[Roboto]">Tôi hoàn toàn thích chất lượng và kiểu dáng của quần áo tôi mua từ trang web này. Dịch vụ khách hàng rất xuất sắc và tôi đã nhận được đơn đặt hàng nhanh chóng. Rất khuyến khích!</p>
        </div>
        <div className="w-full sm:w-1/2 md:w-4/5">
          <div className="flex">
            <p className="text-2xl ml-2"><i className="fa-solid fa-star text-[#fff824] mb-4"></i></p>
            <p className="text-2xl ml-2"><i className="fa-solid fa-star text-[#fff824] mb-4"></i></p>
            <p className="text-2xl ml-2"><i className="fa-solid fa-star text-[#fff824] mb-4"></i></p>
            <p className="text-2xl ml-2"><i className="fa-solid fa-star text-[#fff824] mb-4"></i></p>
            <p className="text-2xl ml-2"><i className="fa-regular fa-star text-[#fff824] mb-4"></i></p>
          </div>
          <p className="font-[Roboto] text-lg text-green-900">Olivia Martinez</p>
          <p className="font-[Roboto]">Tôi đã có trải nghiệm tuyệt vời khi mua sắm trên trang web này. Quần áo tôi mua rất thời trang và thoải mái. Rất hài lòng!</p>
        </div>
      </div>






    </div>



  )
}

export default HomePage