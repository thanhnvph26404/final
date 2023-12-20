import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useEditUserAdminMutation, useGetUserQuery } from '../../store/Auth/Auth.services'
import { Button, Form, Input } from 'antd'
import { toastError, toastSuccess } from '../../hook/toastify'

const EditUser = () => {
    const navigate = useNavigate()
    const { id } = useParams()
    const { data, isLoading } = useGetUserQuery(id)
    console.log(data);

    const [editUserAdmin] = useEditUserAdminMutation()
    const [form] = Form.useForm()
    useEffect(() => {
        console.log(data);

        if (data) {
            form.setFieldsValue({
                _id: data?.user?._id,
                name: data?.user?.name,
                email: data?.user?.email,
                phone: data?.user?.phone,
                Address: data?.user?.Address,
                address: data?.user?.address,
                country: data?.user?.country,
                role: data?.user?.role,



            })
        }
    }, [isLoading])
    const updateUser = async (values: any) => {
        const edit: any = {
            _id: values._id,
            name: values.name,
            email: values.email,
            phone: values.phone,
            Address: values.Address,
            address: values.address,
            country: values.country,
            role: values.role,
        }
        console.log(edit);

        try {
            editUserAdmin(edit).unwrap().then((res) => {
                toastSuccess("cập nhật thành công")
                console.log(res);
                navigate('/admin/customers')

            }).catch((error: any) => {
                toastError(error.data.message)
            })
        } catch (error: any) {
            toastError(error.data.message)

        }
    }
    return (
        <div>

            <div className=" h-10">
                <h1 className="text-2xl font-semibold ">Cập nhật người dùng </h1>
            </div>
            <div className="bg-white pt-[20px] pb-[30px]">
                <Form form={form} onFinish={updateUser}
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 800 }}
                >
                    <div className="space-y-4">
                        <Form.Item
                            label=""
                            name="_id"
                            initialValue={id}
                            style={{ display: "none" }}
                            rules={[{ required: true, message: "vui lòng nhập kích cỡ!" }]}
                            hasFeedback

                        >

                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Tên người dùng"

                            name="name"
                            rules={[{ required: true, message: "trường name không được để trống " }]}
                            initialValue={data?.user?.name} // Sử dụng giá trị `currentUser?.name` để điền giá trị mặc định
                        >
                            <Input placeholder="Tên" />
                        </Form.Item>
                        <Form.Item
                            label="Email"

                            name="email"
                            rules={[
                                { required: true, message: "trường email không được để trống " },
                                { type: "email", message: "vui lòng nhập đúng định dạng " },
                            ]}
                            initialValue={data?.user?.email} // Sử dụng giá trị `currentUser?.email` để điền giá trị mặc định
                        >
                            <Input placeholder="Email" />
                        </Form.Item>
                        <Form.Item
                            label="Số điện thoại"

                            name="phone"
                            rules={[{ required: true, message: "trường phone không được để trống " }]}
                            initialValue={data?.user?.phone} // Sử dụng giá trị `currentUser?.phone` để điền giá trị mặc định
                        >
                            <Input placeholder="Số điện thoại" />
                        </Form.Item>
                        <Form.Item
                            label="Thành phố"

                            name="address"
                            rules={[{ required: true, message: "trường address không được để trống " }]}
                            initialValue={data?.user?.address} // Sử dụng giá trị `currentUser?.phone` để điền giá trị mặc định
                        >
                            <Input placeholder="Thành phố " />
                        </Form.Item>
                        <Form.Item
                            label="Quận huyện"

                            name="Address"
                            rules={[{ required: true, message: "trường Address không được để trống " }]}
                            initialValue={data?.user?.Address} // Sử dụng giá trị `currentUser?.phone` để điền giá trị mặc định
                        >
                            <Input placeholder="huyện" />
                        </Form.Item>
                        <Form.Item
                            label="Địa chỉ cụ thể"

                            name="country"
                            rules={[{ required: true, message: "trường country không được để trống " }]}
                            initialValue={data?.user?.country} // Sử dụng giá trị `currentUser?.phone` để điền giá trị mặc định
                        >
                            <Input placeholder="làng ngõ xóm" />
                        </Form.Item>
                        <Form.Item
                            label="Phân quyền"

                            name="role"
                            rules={[{ required: true, message: "trường role không được để trống " }]}
                            initialValue={data?.user?.role} // Sử dụng giá trị `currentUser?.phone` để điền giá trị mặc định
                        >
                            <Input placeholder="Quyền" />
                        </Form.Item>
                    </div>

                    <div className="mt-5 flex justify-center">
                        <div className="w-1/3">
                            <Button type="primary" htmlType="submit" className="bg-blue-500">Cập nhật</Button>
                        </div>
                    </div>
                </Form>


            </div>
        </div>
    )
}

export default EditUser