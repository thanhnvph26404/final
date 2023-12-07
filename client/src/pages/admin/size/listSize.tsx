import { Space, Table, Button, message, Popconfirm } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Link } from "react-router-dom";
import { useDeleteSizeMutation, useGetsizeListQuery } from "../../../store/valueAttribute/Sizesevice";
interface DataType {
    key?: string | number;
    _id?: string;
    value: string;
    attribute?: string;
}
const ListSize = () => {

    const { data } = useGetsizeListQuery("")
    const [deteleSize] = useDeleteSizeMutation()
    console.log(data)
    const removeSize = (id: string) => {
        deteleSize(id)
        message.success("Xóa thành công kích cỡ")
    };


    const columns: ColumnsType<DataType> = [
        {
            title: "ID",
            dataIndex: "_id",
            key: "_id",
            render: (text) => <p>{text}</p>,
        },
        {
            title: "Cỡ",
            dataIndex: "size",
            key: "size",
            render: (text) => <p>{text}</p>,
        },
        {
            title: "Hành động",
            key: "action",
            render: (record) => (
                <Space size="middle">
                    <Popconfirm
                        title="Delete the task"
                        description="Are you sure to delete this task?"
                        onConfirm={() => removeSize(record._id)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button danger>Xoá</Button>
                    </Popconfirm>

                    <Button type="primary" className="bg-blue-500">
                        <Link to={`/admin/size/update/${record._id}`}>Cập Nhật</Link>
                    </Button>
                </Space>
            ),
        },
    ];

    const data1: DataType[] = data?.data?.map((item: DataType) => {
        return {
            key: item._id,
            ...item,
        };
    });

    return (
        <div>
            <div className="">
                <Button type="primary" className="bg-blue-500" style={{ marginBottom: 30 }}>
                    <Link to={"/admin/size/add"}>Thêm kích cỡ</Link>
                </Button>
                <Table

                    style={{ backgroundColor: "white" }}
                    columns={columns}
                    dataSource={data1}
                    pagination={{ pageSize: 15 }}
                />
            </div>
        </div>
    );
};

export default ListSize;