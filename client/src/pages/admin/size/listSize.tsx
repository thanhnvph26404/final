import { Space, Table, Button, message } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Link } from "react-router-dom";
import { useDeletevalueattributeMutation, useGetSizesQuery } from "../../../store/valueAttribute/valueAttribute.services";
interface DataType {
    key?: string | number;
    _id?: string;
    value: string;
    attribute?: string;
}


const ListSize = () => {

    const { data } = useGetSizesQuery("")
    const [deletevalueattribute] = useDeletevalueattributeMutation()
    console.log(data)
    const removeSize = (id: string) => {
        deletevalueattribute(id)
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
            title: "cỡ ",
            dataIndex: "value",
            key: "value",
            render: (text) => <p>{text}</p>,
        },
        {
            title: "Action",
            key: "action",
            render: (record) => (
                <Space size="middle">
                    <Button
                        type="primary"
                        style={{ backgroundColor: "red" }}
                        onClick={() => {
                            const is = confirm("ban có muốn xóa ko ");
                            if (is) {
                                removeSize(record._id);
                            }
                        }}
                    >
                        Remove
                    </Button>

                    <Button type="primary" className="bg-blue-500">
                        <Link to={`/admin/size/update/${record._id}`}>Update</Link>
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
        <div style={{ marginTop: 100, width: 1200 }}>
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
    );
};

export default ListSize;