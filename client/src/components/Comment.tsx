import { useEffect, useState } from "react";
import { toastError } from "../hook/toastify";
import { useAddCommentMutation, useGetCommentbyidprouctQuery } from "../store/Comment/comment.services";
import { useGetUserByTokenMutation } from "../store/Auth/Auth.services";
import { message } from "antd";
import Table, { ColumnsType } from "antd/es/table";
import { Link, useLocation } from "react-router-dom";

const Comment = (props: any) => {

    interface IComment {
        _id: string,
        idProduct: string
        name: string,
        comment: string,
        email: string,
        feedback: number,
        createdAt: string
    }

    const id = props.idpro
    console.log(id);

    const { data: comments, isLoading } = useGetCommentbyidprouctQuery(id)

    const [getUserByToken] = useGetUserByTokenMutation(); // Sử dụng mutation để lấy thông tin người dùng sau khi cập nhật
    const token = localStorage.getItem("token");
    const location = useLocation();
    const [AddCommentMutation] = useAddCommentMutation()
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [comment, setComment] = useState("");
    const [rating, setRating] = useState(0);
    const [data1, setdata1] = useState();
    useEffect(() => {
        if (token) {
            getUserByToken(token)
                .unwrap()
                .then((response) => {
                    setEmail(response.data.email)
                    setName(response.data.name)
                })
                .catch((error) => {
                    message.error(error.data.message);
                });
        }
    }, [getUserByToken, token, location]);



    const handleResetComment = () => {
        setComment("");
        setRating(0);
        setIsFormVisible(!isFormVisible);
    }
    const handleToggleForm = () => {
        setIsFormVisible(!isFormVisible);
    };
    const handleStarClick = (value: any) => {
        setRating(value);
    };
    const handleAddComment = (e: any) => {
        e.preventDefault();
        console.log(id);

        if (!email) {
            toastError("Bạn đang để trống email ");
        }
        else if (!name) {
            toastError("Bạn đang để trống name");

        } else if (!comment) {
            toastError("Bạn đang để trống comment");

        } else if (!rating) {
            toastError("Bạn đang để trống đánh giá sao");

        } else {
            const commentProduct: any = {
                product: id,
                name: name,
                comment: comment,
                email: email,
                feedback: rating
            }

            AddCommentMutation(commentProduct)
                .unwrap()
                .then((response) => {
                    console.log(response);

                })
                .catch((error) => {
                    message.error(error.data.message);
                });
            handleResetComment()
        }
    }

    useEffect(() => {
        if (comments) {
            const newcomments = comments.Comment.slice().reverse() // sắp xếp lại mảng
            const data: IComment[] = newcomments.map((item: IComment) => {
                return {
                    item: item
                }
            });
            setdata1(data)
        }
    }, [isLoading])



    const columns: ColumnsType<IComment> = [
        {
            title: "",
            dataIndex: "item",
            key: "comment",
            render: (item) =>
            (

                <div className="flex justify-start items-start gap-x-1">
                    <div className="">
                        <img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gU3ZnIFZlY3RvciBJY29ucyA6IGh0dHA6Ly93d3cub25saW5ld2ViZm9udHMuY29tL2ljb24gLS0+DQo8IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4iICJodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvMS4xL0RURC9zdmcxMS5kdGQiPg0KPHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSIwIDAgMjU2IDI1NiIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMjU2IDI1NiIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+DQo8bWV0YWRhdGE+IFN2ZyBWZWN0b3IgSWNvbnMgOiBodHRwOi8vd3d3Lm9ubGluZXdlYmZvbnRzLmNvbS9pY29uIDwvbWV0YWRhdGE+DQo8Zz48Zz48cGF0aCBmaWxsPSIjMDAwMDAwIiBkPSJNMTAsMTI4QzEwLDYyLjgsNjIuOCwxMCwxMjgsMTBsMCwwYzY1LjIsMCwxMTgsNTIuOCwxMTgsMTE4bDAsMGMwLDY1LjItNTIuOCwxMTgtMTE4LDExOGwwLDBDNjIuOCwyNDYsMTAsMTkzLjIsMTAsMTI4TDEwLDEyOHogTTQ2LjcsNDYuN0MyNS45LDY3LjUsMTMuMSw5Ni4zLDEzLjEsMTI4bDAsMGMwLDMxLjcsMTIuOSw2MC41LDMzLjcsODEuM2wwLDBjMjAuOCwyMC44LDQ5LjUsMzMuNyw4MS4zLDMzLjdsMCwwYzMxLjcsMCw2MC41LTEyLjksODEuMy0zMy43bDAsMGMyMC44LTIwLjgsMzMuNy00OS41LDMzLjctODEuM2wwLDBjMC0zMS43LTEyLjktNjAuNS0zMy43LTgxLjNsMCwwYy0yMC44LTIwLjgtNDkuNS0zMy43LTgxLjMtMzMuN2wwLDBDOTYuMywxMy4xLDY3LjUsMjUuOSw0Ni43LDQ2LjdMNDYuNyw0Ni43eiIvPjxwYXRoIGZpbGw9IiMwMDAwMDAiIGQ9Ik05NS40LDkxLjJjMC0xOCwxNC42LTMyLjYsMzIuNi0zMi42bDAsMGMxOCwwLDMyLjYsMTQuNiwzMi42LDMyLjZsMCwwYzAsMTgtMTQuNiwzMi42LTMyLjYsMzIuNmwwLDBDMTEwLDEyMy44LDk1LjQsMTA5LjIsOTUuNCw5MS4yTDk1LjQsOTEuMnogTTk4LjYsOTEuMmMwLDE2LjIsMTMuMSwyOS4zLDI5LjQsMjkuNGwwLDBjMTYuMiwwLDI5LjMtMTMuMSwyOS40LTI5LjRsMCwwYzAtMTYuMi0xMy4xLTI5LjMtMjkuNC0yOS40bDAsMEMxMTEuOCw2MS45LDk4LjcsNzUsOTguNiw5MS4yTDk4LjYsOTEuMnoiLz48cGF0aCBmaWxsPSIjMDAwMDAwIiBkPSJNNjQuOCwxODYuN0w2NSwxODVjNC4yLTM0LjQsMzAuNy02MS4xLDYzLTYxLjFsMCwwYzMyLjMsMCw1OC44LDI2LjcsNjMsNjEuMWwwLDBsLTEuNSwwLjJ2LTEuNXYxLjVsMS41LTAuMmwwLjIsMS43SDY0LjhMNjQuOCwxODYuN3ogTTE4Ny43LDE4My42Yy00LjctMzIuMi0yOS43LTU2LjctNTkuNy01Ni43bDAsMGMtMzAsMC01NSwyNC40LTU5LjcsNTYuN2wwLDBIMTg3LjdMMTg3LjcsMTgzLjZ6Ii8+PC9nPjwvZz4NCjwvc3ZnPg=="
                            width="80" height="60"></img>
                    </div>
                    <div>
                        <p className="text-xl">{item.name} </p>
                        <div className="flex items-center gap-x-1">
                            {[1, 2, 3, 4, 5].map((value) => (
                                <p key={value} >
                                    <i
                                        className={`fa-solid fa-star ${value <= item.feedback ? 'text-yellow-500' : 'text-[#0A2139]'
                                            } text-center text-base`}
                                    ></i>
                                </p>
                            ))}
                        </div>
                        <p className="text-sm text-gray-66">{item.createdAt.slice(0, 10)} {item.createdAt.slice(11, 16)}</p>
                        <p className="mt-2 text-xl">   {item.comment}</p>
                    </div>


                </div>

            )
        }]

    return (
        <div className="">
            <div className="w-full sm:w-3/4 px-4 sm:px-8 mt-3">
                <div className="flex mt-5">
                    <p className="hidden sm:block w-3/4  text-[25px]">Bình luận</p>
                    {/* <Link to={"/comment/655ccc2ee2774e2e50993f8a"}>add ccmt</Link> */}
                </div>
                <div className="mx-auto" style={{ marginTop: 100, width: 1200 }}>
                    <Table
                        style={{ backgroundColor: "white" }}
                        columns={columns}
                        dataSource={data1}
                        pagination={{ pageSize: 5 }}
                    />
                </div>

            </div>
            <div className="mt-[120px]">
                <h1 className="text-center text-[25.5px] text-[#23314b] font-semibold">ĐÁNH GIÁ SẢN PHẨM</h1>
            </div>
            <div className="mt-[70px] grid grid-cols-3 space-x-[80px] ml-[80px]">
                <div>
                    <div className="flex space-x-4">
                        <div className="flex ">
                            <p><i className="fa-solid fa-star text-[#0A2139]"></i></p>
                            <p><i className="fa-solid fa-star text-[#0A2139]"></i></p>
                            <p><i className="fa-solid fa-star text-[#0A2139]"></i></p>
                            <p><i className="fa-solid fa-star text-[#0A2139]"></i></p>
                            <p><i className="fa-solid fa-star text-[#0A2139]"></i></p>
                        </div>
                        <div>
                            <p className="font-extrathin text-[#0A2139] text-[17px] underline">5.00 trên 5 sao </p>
                        </div>
                    </div>
                    <p className="font-extrathin text-[#0A2139] text-[17px]">Dựa trên 1 đánh giá của người mua về sản phẩm</p>
                </div>
                <div>
                    <div className="flex space-x-4">
                        <div className="flex">
                            <p><i className="fa-solid fa-star text-[#0A2139]"></i></p>
                            <p><i className="fa-solid fa-star text-[#0A2139]"></i></p>
                            <p><i className="fa-solid fa-star text-[#0A2139]"></i></p>
                            <p><i className="fa-solid fa-star text-[#0A2139]"></i></p>
                            <p><i className="fa-solid fa-star text-[#0A2139]"></i></p>
                        </div>
                        <div>
                            <button className="border-2 bg-[#0A2139] w-[150px] h-[20px]"></button>
                        </div>
                        <div>
                            <p className="text-gray-500">1</p>
                        </div>
                    </div>
                    <div className="flex space-x-4">
                        <div className="flex">
                            <p><i className="fa-solid fa-star text-[#0A2139]"></i></p>
                            <p><i className="fa-solid fa-star text-[#0A2139]"></i></p>
                            <p><i className="fa-solid fa-star text-[#0A2139]"></i></p>
                            <p><i className="fa-solid fa-star text-[#0A2139]"></i></p>
                            <p><i className="fa-regular fa-star text-[#0A2139]"></i></p>
                        </div>
                        <div>
                            <button className="border-2 bg-[#EFEFEF] w-[150px] h-[20px]"></button>
                        </div>
                        <div>
                            <p className="text-gray-500">0</p>
                        </div>
                    </div>
                    <div className="flex space-x-4">
                        <div className="flex">
                            <p><i className="fa-solid fa-star text-[#0A2139]"></i></p>
                            <p><i className="fa-solid fa-star text-[#0A2139]"></i></p>
                            <p><i className="fa-solid fa-star text-[#0A2139]"></i></p>
                            <p><i className="fa-regular fa-star text-[#0A2139]"></i></p>
                            <p><i className="fa-regular fa-star text-[#0A2139]"></i></p>
                        </div>
                        <div>
                            <button className="border-2 bg-[#EFEFEF] w-[150px] h-[20px]"></button>
                        </div>
                        <div>
                            <p className="text-gray-500">0</p>
                        </div>
                    </div>
                    <div className="flex space-x-4">
                        <div className="flex">
                            <p><i className="fa-solid fa-star text-[#0A2139]"></i></p>
                            <p><i className="fa-solid fa-star text-[#0A2139]"></i></p>
                            <p><i className="fa-regular fa-star text-[#0A2139]"></i></p>
                            <p><i className="fa-regular fa-star text-[#0A2139]"></i></p>
                            <p><i className="fa-regular fa-star text-[#0A2139]"></i></p>
                        </div>
                        <div>
                            <button className="border-2 bg-[#EFEFEF] w-[150px] h-[20px]"></button>
                        </div>
                        <div>
                            <p className="text-gray-500">0</p>
                        </div>
                    </div>
                    <div className="flex space-x-4">
                        <div className="flex">
                            <p><i className="fa-solid fa-star text-[#0A2139]"></i></p>
                            <p><i className="fa-regular fa-star text-[#0A2139]"></i></p>
                            <p><i className="fa-regular fa-star text-[#0A2139]"></i></p>
                            <p><i className="fa-regular fa-star text-[#0A2139]"></i></p>
                            <p><i className="fa-regular fa-star text-[#0A2139]"></i></p>
                        </div>
                        <div>
                            <button className="border-2 bg-[#EFEFEF] w-[150px] h-[20px]"></button>
                        </div>
                        <div>
                            <p className="text-gray-500">0</p>
                        </div>
                    </div>

                </div>
                <div>
                    <button className="w-[200px] h-[45px] border-2 mt-2 bg-[#23314b] text-white font-thin hover:opacity-70" onClick={handleToggleForm}>Thêm bình luận</button>
                </div>
            </div>

            <hr className="w-auto ml-[100px] mt-10" />

            {isFormVisible && (

                <form action="" className="mt-[50px]">
                    <h1 className="text-center text-[25.5px] text-[#23314b] font-semibold">THÊM BÌNH LUẬN</h1>
                    <p className="text-center text-[20.5px] text-[#23314b] mt-5">Đánh giá</p>
                    <div className="flex justify-center items-center mt-3">
                        {[1, 2, 3, 4, 5].map((value) => (
                            <p key={value} onClick={() => handleStarClick(value)}>
                                <i
                                    className={`fa-solid fa-star ${value <= rating ? 'text-yellow-500' : 'text-[#0A2139]'
                                        } text-center text-2xl`}
                                ></i>
                            </p>
                        ))}
                    </div>
                    {/* <p className="text-center text-[20.5px] text-[#23314b] mt-8">Tiêu đề</p>
                    <div className="text-center text-[20.5px] text-[#23314b] mt-2">
                        <input
                            type="text"
                            className="p-4 border border-gray-300 w-[550px] h-[40px] "
                            placeholder="Ghi tiêu đề cho đánh giá"
                        />

                    </div> */}
                    <p className="text-center text-[20.5px] text-[#23314b] mt-8">Bình luận</p>
                    <div className="text-center text-[20.5px] text-[#23314b] mt-2">
                        <input
                            type="text"
                            className=" p-4 pb-20 border border-gray-300 w-[550px] h-[150px]"
                            placeholder="Hãy chia sẻ nhận xét cho sản phẩm này bạn nhé!"
                            value={comment}
                            required={true}
                            onChange={(e) => { setComment(e.target.value) }}
                        />

                    </div>
                    {/* <p className="text-center text-[20.5px] text-[#23314b] mt-8">Hình ảnh/video (tùy chọn)</p> */}
                    {/* <div className="text-center text-[20.5px] text-[#23314b] mt-2">
                        <input
                            type="file"
                            className="hidden"
                            id="fileInput"
                            accept=".jpg, .jpeg, .png, .gif"
                        />
                        <label htmlFor="fileInput" className="w-28 h-28 p-2 border border-gray-300 w-[550px] h-[150px] rounded-md cursor-pointer flex items-center justify-center mx-auto">
                            <img src="/upload.jpg" alt="Tải lên" className="w-16 h-16 " />
                        </label>
                    </div> */}
                    <p className="text-center text-[20.5px] text-[#23314b] mt-8">Tên (Hiển thị công khai dưới tên
                        Nguyễn Văn A)</p>
                    <div className="text-center text-[20.5px] text-[#23314b] mt-2">
                        <input
                            type="text"
                            className="p-4 border border-gray-300 w-[550px] h-[40px] "
                            placeholder="Nhập tên của bạn"
                            value={name}
                            onChange={(e) => { setName(e.target.value) }}
                        />
                    </div>
                    <p className="text-center text-[20.5px] text-[#23314b] mt-8">Email</p>
                    <div className="text-center text-[20.5px] text-[#23314b] mt-2">
                        <input
                            type="text"
                            className="p-4 border border-gray-300 w-[550px] h-[40px] "
                            placeholder="Nhập email của bạn"
                            value={email}
                            onChange={(e) => { setEmail(e.target.value) }}
                        />
                    </div>
                    <div className="flex justify-center items-center mt-5">
                        <button className="mr-4 px-4 py-2 border border-black border-[color]-900 bg-white text-black rounded-md hover:bg-red-200 hover:text-white transition duration-200" onClick={handleResetComment}>Hủy bình luận</button>
                        <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200" onClick={handleAddComment}>Gửi bình luận</button>
                    </div>
                </form>
            )}
        </div>
    )
}

export default Comment
