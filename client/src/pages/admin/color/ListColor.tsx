import { Space, Table, Button, message, Popconfirm } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Link } from "react-router-dom";
import { useDeleteColorMutation, useGetcolorListQuery } from "../../../store/valueAttribute/colorsevice";
import { IoPencilSharp } from "react-icons/io5";
import { FaTrashCan } from "react-icons/fa6";

interface DataType {
    key?: string | number;
    _id?: string;
    value: string;
    attribute?: string;
}


const ListColor = () => {

    const { data: color } = useGetcolorListQuery([])
    const [deletevalueattribute] = useDeleteColorMutation()
    console.log(color)
    const removecolor = (id: string) => {
        deletevalueattribute(id)
        message.success("Xóa thành công Màu")
    };


    const columns: ColumnsType<DataType> = [
        {
            title: "ID",
            dataIndex: "_id",
            key: "_id",
            render: (text) => <p>{text}</p>,
        },
        {
            title: "Màu ",
            dataIndex: "color",
            key: "color",
            render: (text) => <p>{text}</p>,
        },
        {
            title: "Hành động",
            key: "action",
            render: (record) => (
                <Space size="middle">
                    {/* <Button
                        type="primary"
                        style={{ backgroundColor: "red" }}
                        onClick={() => {
                            const is = confirm("ban có muốn xóa ko ");
                            if (is) {
                                removecolor(record._id);
                            }
                        }}
                    >
                        Xoá
                    </Button>

                    <Button type="primary" className="bg-blue-500">

                        <Link to={ `/admin/color/update/${ record._id }` }>Cập Nhật</Link>
                      
                    </Button> */}
                    <Link to={`/admin/color/update/${ record._id }`}>
                        <IoPencilSharp className="text-lg text-gray-85 hover:text-[#1D1F2C]" />
                    </Link>

                    <Popconfirm
                        title="Xóa danh mục"
                        description="Bạn có chắc muốn xóa danh mục này?"
                        onConfirm={() => removecolor(record._id)}
                        okText="Xóa"
                        cancelText="Hủy"
                    >
                        <FaTrashCan className="text-lg text-gray-85 hover:text-[#1D1F2C]" />
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    const data1: DataType[] = color?.data?.map((item: DataType) => {
        return {
            key: item._id,
            ...item,
        };
    });

    return (
        <div>
            <Button type="primary" className="bg-blue-500" style={{ marginBottom: 30 }}>
                <Link to={"/admin/color/add"}>Thêm  màu</Link>
            </Button>
            <Table

                style={{ backgroundColor: "white" }}
                columns={columns}
                dataSource={data1}
                pagination={{ pageSize: 15 }}
            />
        </div>
    );
};

export default ListColor;