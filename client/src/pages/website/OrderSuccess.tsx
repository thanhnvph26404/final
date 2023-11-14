
const OrderSuccess = () => {
    return (

        <div className="bg-gray-100 flex items-center justify-center h-screen">
            <div className="text-center">
                <img src="/images/success.png" alt="Success" className="w-1/3 h-auto mx-auto mb-4" />
                <p className="text-2xl font-bold text-green-600 mb-2">Đặt hàng thành công!</p>
                <p className="text-gray-700">Cảm ơn bạn đã đặt hàng. Chúng tôi sẽ xử lý đơn hàng của bạn ngay lập tức.</p>
                <a href="/" className="inline-flex text-white bg-blue-600 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-900 my-4">Về trang chủ</a>
                <a href="/profile/orders" className="ml-2 inline-flex text-white bg-gray-800 hover:bg-gray-600 hover:underline focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-900 my-4">Xem lịch sử mua hàng</a>
            </div>
        </div>
    )
}

export default OrderSuccess