import { Space, Table, Button, message } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Link } from "react-router-dom";
import { useDeleteBrandMutation, useGetBrandListQuery } from "../../../store/Brand/brand.services"
interface DataType {
    key?: string | number;
    _id?: string;
    title: string;
}


const ListBrand = () => {

    const { data: brand } = useGetBrandListQuery([])
    const [deletebrand] = useDeleteBrandMutation()
    console.log(brand)
    const removebrand = (id: string) => {
        deletebrand(id)
        message.success("Xóa thành công thương hiệu")
    };


    const columns: ColumnsType<DataType> = [
        {
            title: "ID",
            dataIndex: "_id",
            key: "_id",
            render: (text) => <p>{text}</p>,
        },
        {
            title: "Thương hiệu ",
            dataIndex: "title",
            key: "title",
            render: (text) => <p>{text}</p>,
        },
        {
            title: "Hành động",
            key: "action",
            render: (record) => (
                <Space size="middle">
                    <Button
                        type="primary"
                        style={{ backgroundColor: "red" }}
                        onClick={() => {
                            const is = confirm("Bạn có muốn xóa không? ");
                            if (is) {
                                removebrand(record._id);
                            }
                        }}
                    >
                        Xoá
                    </Button>

                    <Button type="primary" className="bg-blue-500">

                        <Link to={`/admin/brand/update/${record._id}`}>Cập Nhật</Link>

                    </Button>
                </Space>
            ),
        },
    ];

    const data1: DataType[] = brand?.data?.map((item: DataType) => {
        return {
            key: item._id,
            ...item,
        };
    });

    return (
        <div style={{ marginTop: 100, width: 1200 }}>
            <Button type="primary" className="bg-blue-500" style={{ marginBottom: 30 }}>
                <Link to={"/admin/brand/add"}>Thêm thương hiệu</Link>
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

export default ListBrand;