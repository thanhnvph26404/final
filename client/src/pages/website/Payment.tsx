
const Payment = () => {
    return (
        <div>
            <div className="relative group">
                <button className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 bg-gray-200 rounded-full flex items-center justify-center cursor-pointer group-hover:bg-gray-300 transition duration-300 ease-in-out">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-9 lg:h-9 text-gray-600">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                    </svg>
                </button>
                <div className="hidden absolute top-8 sm:top-10 md:top-12 lg:top-14 right-0 sm:right-2 md:right-4 lg:right-6 border-l-2 border-gray-200 bg-[#F5F5F5] w-[90%] sm:w-[70%] md:w-[60%] lg:w-[50%] p-4 group-hover:block transition duration-300 ease-in-out">
                    <p className="font-semibold text-l">BEE FASHION</p>
                    <p className="text-[#8A919F] text-xs">rvfCJW5Edxi3b4yaU2s2KPned</p>
                    <p className="font-semibold text-xs">229.000VND</p>
                    <p className="text-xs mt-5 font-medium">DESCRIPTION</p>
                    <p className="text-[#8A919F] text-xs">Thanh toán cho rvfCJW5Edxi3b4yaU2s2KPned</p>
                    <p className="text-xs font-medium">INVOICE NUMBER</p>
                    <p className="text-[#8A919F] text-xs">rvfCJW5Edxi3b4yaU2s2KPned</p>
                    <p className="text-xs font-medium">CONTACT INFORMATION</p>
                    <p className="text-[#8A919F] text-xs">42/60/78 Hồ Đắc Di, Phường Tây Thạnh, Quận Tân Phú, Thành phố Hồ Chí Minh, Việt Nam</p>
                </div>
            </div>

            <div className="border-l-2 border-200 mt-5 m-auto w-[65%]">
                <div className="flex justify-between">
                    <p className="font-semibold text-xl">DIGITAL PAYMENT</p>
                    <div className="flex">
                        <img
                            className='method-icon mr-[12px] w-[32px] h-[32px]'
                            src='https://salt.tikicdn.com/ts/upload/77/6a/df/a35cb9c62b9215dbc6d334a77cda4327.png'
                            alt='icon'
                        />
                        <img
                            className='method-icon mr-[12px] w-[32px] h-[32px] '
                            src='https://d27uu9vmlo4gwh.cloudfront.net/images/v4/images/icon/momo.png'
                            alt='icon'
                        />
                    </div>
                </div>
                <div className="relative">
                    <div className="relative w-[200px] flex items-center">
                        <select
                            className="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-400 px-4 py-2 pr-8 rounded-lg pl-8 shadow focus:outline-none focus:shadow-outline-blue focus:border-blue-300"
                        >
                            <option value="vnpay">VNPAY</option>
                            <option value="momo">MOMO WALLET</option>
                        </select>
                    </div>
                </div>



            </div>
            <div className=" mt-5 m-auto w-[65%]">
                <p className="text-[#8A919F] text-sm">TÊN NGƯỜI MUA</p>
                <p className="text-xs font-medium">Nguyễn Trí Dũng</p>
                <p className="text-[#8A919F] mt-5 text-sm">ĐỊA CHỈ EMAIL</p>
                <p className="text-xs font-medium">dunghieu2003@gmail.com</p>
                <div className="flex mt-5">
                    <button className="rounded-full bg-blue-500 text-white py-2 px-4 mr-4 hover:bg-white hover:text-black hover:text-red-500 transform hover:scale-110 transition-transform"><a href="">Thoát</a></button>
                    <button className="rounded-full bg-green-500 text-white py-2 px-4 hover:bg-green-500 transform hover:scale-110 transition-transform"><a href="">Tiếp tục thanh toán</a></button>
                </div>

            </div>
        </div>
    )
}

export default Payment