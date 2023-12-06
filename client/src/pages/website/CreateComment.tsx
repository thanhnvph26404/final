import { useNavigate, useParams } from "react-router-dom"
import { useGetOneOrderQuery } from "../../store/Auth/Auth.services";
import { useState } from "react";
import { toastError } from "../../hook/toastify";
import { message } from "antd";
import { useAddCommentMutation } from "../../store/Comment/comment.services";

const CreateComment = () => {

    const { id } = useParams()
    const { data: order, isLoading } = useGetOneOrderQuery(id)
    const [AddCommentMutation] = useAddCommentMutation()
    const [ratings, setRatings] = useState([
        5, 5, 5, 5, 5, 5, 5, 5, 5
    ]);
    const navigate = useNavigate()
    const handleStarClick = (value: any) => {

        // Sao chép mảng ban đầu
        const newArray = [...ratings];
        // Sửa đổi phần tử tại chỉ mục cụ thể
        newArray[value.index] = value.value
        // Cập nhật mảng mới
        setRatings(newArray);

    };


    const handleAddComment = (e: any) => {
        e.preventDefault();
        var valid = true
        const comments = document.getElementsByName('comment')
        comments.forEach((item) => {
            if (item.value == "") {
                toastError("Bạn cần điền bình luận ")
                valid = false
            }
        })
        if (order && valid) {
            order.products.map((item, index) => {
                const commentProduct: any = {
                    product: item.product?._id,
                    name: order?.userId.name,
                    comment: comments[index].value,
                    email: order?.userId.email,
                    feedback: ratings[index]
                }

                console.log(commentProduct);

                AddCommentMutation(commentProduct)
                    .unwrap()
                    .then((response) => {
                        message.info("bình luận thành công")
                    })
                    .catch((error) => {
                        message.error(error.data.message);
                    });
            })
            navigate('/home/product-detail/' + order.products[0].product?._id)




        }
    }

    return (
        <div className="mx-12">
            <h1 className="text-2xl  mb-5">Đánh giá sản phẩm</h1>
            <div className="flex flex-col mx-auto  gap-y-5  w-[500px] md:w-[700px] lg:w-[900px]">
                {order?.products?.map((product: any, index) => {
                    return (
                        <div className="">
                            <div className="flex">
                                <img src={product.productInfo.images[0].url} alt="" className="w-24 mx-1" />
                                <div className="">
                                    <p className="text-xl">{product.productInfo.name} </p>
                                    <p className="text-sm text-gray-66"> Phân loại hàng : {product.productVariant.color} - {product.productVariant.size}  </p>
                                </div>
                            </div>
                            <div className="mr-10 flex justify-center items-center ">
                                Chất lượng sẳn Phẩm :   {[1, 2, 3, 4, 5].map((value) => (
                                    <p key={value} onClick={() => handleStarClick({ value: value, index: index })}>
                                        <i
                                            className={`fa-solid fa-star ${value <= ratings[index] ? 'text-yellow-500' : 'text-[#0A2139]'
                                                } text-center text-2xl`}
                                        ></i>
                                    </p>
                                ))}
                            </div>
                            <input
                                type="text"
                                name="comment"
                                className=" p-4 pb-20 border border-gray-300 w-full h-[150px]"
                                placeholder="Hãy chia sẻ nhận xét cho sản phẩm này bạn nhé!"
                                // value={comment}
                                required={true}

                            />
                            <hr />


                        </div>

                    );
                })}
                <button type="button" className="p-3 text-white bg-orange-300 w-36 mx-auto rounded-2xl" onClick={handleAddComment}>đánh giá</button>
            </div>
        </div>
    )
}

export default CreateComment
