
const Contact = () => {
    return (

        <div className="sm:flex max-sm:w-[360px] m-auto max-sm:mb-4 mt-20px ">
            <div className="sm:w-[50%] ">
                <div className="sm:ml-[160px] pt-50px">
                    <h3 className="font-public-sans text-[#23314B] text-[17px]">Contact Us</h3>
                    <h1 className="font-public-sans text-3xl text-[#23314B] my-4 font-semibold max-sm:text-center text-[44px]">Do you have any question?</h1>
                </div>
            </div>
            <div className="border-l-2 border-gray-200 sm:ml-4 pl-4 sm:w-[50%] bg-[#F5F5F5] rounded p-6 mx-auto mt-30">
                {/* Form */}
                <form action="#" method="post">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="mb-4">
                            <label htmlFor="name" className="font-public-sans block text-gray-600 font-medium">Họ và Tên</label>
                            <input type="text" id="name" name="name" className="font-public-sans form-input mt-1 p-2 w-full rounded" placeholder="Nhập họ và tên" required />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="email" className="block text-gray-600 font-medium">Email</label>
                            <input type="email" id="email" name="email" className="form-input mt-1 p-2 w-full rounded" placeholder="example@example.com" required />
                        </div>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="message" className="block text-gray-600 font-medium">Tin Nhắn</label>
                        <textarea id="message" name="message" className="form-textarea mt-1 p-2 w-full h-32 rounded" placeholder="Nhập tin nhắn của bạn" required />
                    </div>

                    <div className="flex items-center justify-end">
                        <button type="submit" className="font-public-sans bg-[#23314B] text-white py-3 px-6 rounded-full hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-800">
                            Gửi tin nhắn
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Contact