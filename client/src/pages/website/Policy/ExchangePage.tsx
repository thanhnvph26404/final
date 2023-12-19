import React from 'react'

const Exchange = () => {
    return (
        <div className='sm:w-[900px] m-auto max-sm:w-[360px] '>
            <h1 className='text-center text-4xl font-semibold  text-[#23314B] mt-5 '>Chính sách đổi / hoàn trả</h1>
            <h2 className='text-center text-3xl font-semibold text-[#23314B] mt-10 '>Ra đời với mong muốn mang đến cho khách hàng những trải nghiệm mua sắm tốt nhất, các sản phẩm của Bee Fashion khi gửi đến khách hàng luôn được đảm bảo là hàng nguyên mới, chất lượng, đúng với thông tin mô tả và hình ảnh trên website.</h2>
            <div>
                <p className='mt-10 text-3xl font-semibold text-[#23314B]'>I. ĐIỀU KIỆN ĐỔI HÀNG</p>
                <p className='mt-5 text-2xl font-semibold text-[#23314B]'>Bee Fashion nhận đổi / trả sản phẩm với các quy định sau:</p>
                <ul className='list-disc'>
                    <li className='mt-5 ml-5 text-[#8A919F]'>Thời gian đổi hàng trong vòng từ <strong className='text-[#23314B]'>30 ngày</strong> kể từ ngày nhận hàng.</li>
                    <li className='mt-5 ml-5 text-[#8A919F]'>Thời gian được tính từ thời điểm xuất hóa đơn.</li>
                    <li className='mt-5 ml-5 text-[#8A919F]'>Sản phẩm chưa qua sử dụng, không bị dơ bẩn, còn nguyên tem mác, hộp / bao bì sản phẩm đi kèm (nếu có).</li>
                    <li className='mt-5 ml-5 text-[#8A919F]'>Sản phẩm được chọn để đổi phải có <strong className='text-[#23314B]'>giá trị cao hơn hoặc bằng</strong> sản phẩm đổi.</li>
                    <li className='mt-5 ml-5 text-[#8A919F]'><strong className='text-[#23314B]'>Không hoàn lại tiền thừa</strong> trong trường hợp sản phẩm được chọn để đổi có giá trị thấp hơn sản phẩm đổi.</li>
                </ul>
                <p className='mt-10 text-3xl font-semibold text-[#23314B]'>II. CÁC TRƯỜNG HỢP ĐỔI HÀNG</p>
                <p className='mt-5 text-3xl font-semibold text-[#23314B]'>Về phía Bee Fashion </p>
                <p className=' text-[#8A919F]'>Miễn phí đổi hàng cho khách mua sắm tại Bee Fashion trong trường hợp:</p>
                <ul className='list-disc'>
                    <li className='mt-5 ml-5 text-[#8A919F]'>Sản phẩm bị lỗi từ nhà sản xuất</li>
                    <li className='mt-5 ml-5 text-[#8A919F]'>Giao nhầm hàng, nhầm sản phẩm</li>
                    <li className='mt-5 ml-5 text-[#8A919F]'>Hư hỏng trong quá trình vận chuyển</li>
                </ul>
                <p className='mt-5 text-3xl font-semibold text-[#23314B]'>Về phía khách hàng </p>
                <p className='text-[#8A919F]'>Trong trường hợp không thích màu, muốn đổi mẫu khác / sản phẩm khác, khách hàng vui lòng hỗ trợ 2 chiều phí vận chuyển đổi hàng tại kho Bee Fashion (Phí gửi hàng lại là <strong className='text-[#23314B]'>30.000 VNĐ</strong>)</p>

            </div>

        </div>
    )
}

export default Exchange