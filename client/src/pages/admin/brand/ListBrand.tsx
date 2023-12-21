import { Space, Table, Button, message, Popconfirm } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Link } from "react-router-dom";
import { useDeleteBrandMutation, useGetBrandListQuery } from "../../../store/Brand/brand.services"
import { IoPencilSharp } from "react-icons/io5";
import { FaTrashCan } from "react-icons/fa6";

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
                    {/* <Button
                        type="primary"
                        style={ { backgroundColor: "red" } }
                        onClick={ () =>
                        {
                            const is = confirm( "Bạn có muốn xóa không? " );
                            if ( is )
                            {
                                removebrand( record._id );
                            }
                        } }
                    >
                        Xoá
                    </Button>

                    <Button type="primary" className="bg-blue-500">

                        <Link to={ `/admin/brand/update/${ record._id }` }>Cập Nhật</Link>

                    </Button> */}
                    <Link to={`/admin/brand/update/${record._id}`}>
                        <IoPencilSharp className="text-lg text-gray-85 hover:text-[#1D1F2C]" />
                    </Link>

                    {/* <Popconfirm
                        title="Xóa danh mục"
                        description="Bạn có chắc muốn xóa danh mục này?"
                        onConfirm={() => removebrand( record._id )}
                        okText="Xóa"
                        cancelText="Hủy"
                    >
                        <FaTrashCan className="text-lg text-gray-85 hover:text-[#1D1F2C]" />
                    </Popconfirm> */}
                </Space>
            ),
        },
    ];

    const data1: DataType[] = brand?.brand?.map((item: DataType) => {
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