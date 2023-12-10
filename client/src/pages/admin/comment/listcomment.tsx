import { Table } from "antd";
import { useGetCommentListQuery } from "../../../store/Comment/comment.services";
import { useEffect, useState } from "react";
import { ColumnsType } from "antd/es/table";

const Listcomment = () => {

    const { data: comments, isLoading } = useGetCommentListQuery()
    interface IComment {
        _id: string,
        idProduct: string
        name: string,
        comment: string,
        email: string,
        feedback: number,
        createdAt: string
    }
    const [data1, setdata1] = useState();
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
        <div>
            <h1 className="text-[30px] font-semibold">Quản Lý Bình Luận</h1>
            <Table
                className="bg-white"
                columns={columns}
                dataSource={data1}
                pagination={{ pageSize: 6 }}
            />
        </div>
    );
}

export default Listcomment
