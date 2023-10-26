
import { Outlet } from 'react-router-dom'
import { useState } from 'react';
import { RiLayoutGridFill, RiShoppingCart2Fill } from 'react-icons/ri'
import { BiSolidUserPin, BiSolidLike } from 'react-icons/bi'
import { FaUser, FaCommentAlt } from 'react-icons/fa'
import { Layout, Menu, theme } from 'antd';
import { Link } from 'react-router-dom';
import Header from './Header';

const { Content, Sider } = Layout;





const items = [
  {
    key: '1',
    label: 'Dashboard',
    icon: <RiLayoutGridFill className='text-gray-85 text-lg  hover:text-[#1D1F2C]  ' />,
    path: '',
  },
  {
    key: '2',
    label: 'Cửa hàng',
    icon: <RiShoppingCart2Fill className='text-gray-85 text-lg  hover:text-[#1D1F2C]  ' />,
    children: [
      {
        key: '3',
        label: 'Sản phẩm',
        path: 'products',
      },
      {
        key: '4',
        label: 'Cỡ',
        path: 'size',
      }, {
        key: '5',
        label: 'Màu',
        path: 'color',
      },
      {
        key: '6',
        label: 'Danh mục',
        path: 'category',
      },
      {
        key: '7',
        label: 'Voucher',
        path: 'vouchers',
      },
      {
        key: '8',
        label: 'Đơn hàng',
        path: 'orders',
      },
    ],
  },
  {
    label: 'Khách hàng',
    key: '9',
    icon: <FaUser className='text-gray-85 text-lg  hover:text-[#1D1F2C]  ' />,
    path: 'customers', // Đường dẫn tới khách hàng
  },
  {
    label: 'Liên hệ',
    key: '10',
    icon: <BiSolidUserPin className='text-gray-85 text-lg  hover:text-[#1D1F2C]  ' />,
    path: 'contacts', // Đường dẫn tới liên hệ
  },
  {
    label: 'Bình luận',
    key: '11',
    icon: <FaCommentAlt className='text-gray-85 text-lg  hover:text-[#1D1F2C]  ' />,
    path: 'comments', // Đường dẫn tới bình luận
  },
  {
    label: 'Phản hồi',
    key: '12',
    icon: <BiSolidLike className='text-gray-85 text-lg  hover:text-[#1D1F2C]  ' />,
    path: 'feedback', // Đường dẫn tới phản hồi 
  },
  // Thêm các mục menu khác ở đây
];

const LayoutAdmin = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout style={{ minHeight: '100vh' }} >
      <Sider collapsible collapsed={collapsed} theme='light' style={{ background: colorBgContainer }} onCollapse={(value) => setCollapsed(value)} >
        <div className="demo-logo-vertical" />
        <div className=' text-2xl text-center py-4'>Astro</div>
        <Menu defaultSelectedKeys={['1']} mode="inline">
          {items.map((item) =>
            item.children ? (
              <Menu.SubMenu key={item.key} icon={item.icon} title={item.label}>
                {item.children.map((childItem) => (
                  <Menu.Item key={childItem.key}>
                    <Link to={childItem.path}>{childItem.label}</Link>
                  </Menu.Item>
                ))}
              </Menu.SubMenu>
            ) : (
              <Menu.Item key={item.key} icon={item.icon}>
                <Link to={item.path}>{item.label}</Link>
              </Menu.Item>
            )
          )}
        </Menu>
      </Sider>
      <Layout style={{ background: '#F9F9FC' }}>
        <Header />
        <Content style={{ margin: '0 16px' }}>

          <div style={{ padding: 24, minHeight: 360 }}>
            <Outlet />
          </div>
        </Content>

      </Layout>
    </Layout>
  )
}

export default LayoutAdmin