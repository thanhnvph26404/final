import { useState } from 'react'
import { RiLayoutGridFill, RiShoppingCart2Fill } from 'react-icons/ri'
import { IoCaretDownOutline, IoCaretUpOutline } from 'react-icons/io5'
import { BiSolidUserPin, BiSolidLike } from 'react-icons/bi'
import { FaUser, FaCommentAlt } from 'react-icons/fa'
import { useSpring, animated } from 'react-spring';

import { Link } from 'react-router-dom'

const SideBar = () =>
{

  const [ isOpen, setIsOpen ] = useState( false );


  const toggleDropdown = () =>
  {
    setIsOpen( !isOpen );
  };

  // Sử dụng react-spring để tạo hiệu ứng chuyển động
  const dropdownAnimation = useSpring( {
    opacity: isOpen ? 1 : 0,
    transform: isOpen ? 'translateY(0)' : 'translateY(-10px)',
  } );

  return (
    <>
      <div className='max-w-[264px] border border-[#F0F1F3] font-semibold min-h-[900px] bg-white  flex-col justify-between flex-1 hidden lg:max-2xl:flex ' >
        <div>
          <div className="text-2xl ml-5 py-6 ">
            Astro
          </div>
          <Link to='' className='group relative flex px-6 py-3 items-center h-12 mt-2.5 hover:bg-[#F0F1F3]  before:content-[""] before:w-1 before:absolute before:left-0 before:bg-gradient-to-b from-[#3250FF] to-[#2BB2FE] before:h-full before:opacity-0 hover:before:opacity-100' >
            <RiLayoutGridFill className='text-xl text-gray-85 group-hover:text-[#1D1F2C] group-hover:font-bold' />
            <h3 className='ml-3 text-sm font-semibold text-black-400 group-hover:text-[#1D1F2C] group-hover:font-bold'>Dashboard</h3>
          </Link>
          <div onClick={ toggleDropdown } className=' relative flex justify-between px-6 py-3 items-center h-12 mt-2.5 hover:bg-[#F0F1F3]  before:content-[""] before:w-1 before:absolute before:left-0 before:bg-gradient-to-b from-[#3250FF] to-[#2BB2FE] before:h-full before:opacity-0 hover:before:opacity-100 group' >
            <div className='flex'>
              <RiShoppingCart2Fill className='text-xl text-gray-85 group-hover:text-[#1D1F2C] group-hover:font-bold' />
              <h3 className='ml-3 text-sm font-semibold text-black-400 group-hover:text-[#1D1F2C] group-hover:font-bold'>Cửa hàng</h3>
            </div>
            { isOpen ? <IoCaretUpOutline className='text-xl text-gray-85 group-hover:text-[#1D1F2C] group-hover:font-bold' /> : <IoCaretDownOutline className='text-lg text-gray-85 group-hover:text-[#1D1F2C] group-hover:font-bold' /> }

          </div>
          <animated.ul
            style={ dropdownAnimation }
            className={ `ease-linear duration-800 ${ isOpen ? 'block' : 'hidden' }` }
          >
            <Link to='' className='relative flex justify-between px-6 py-3 items-center h-12 mt-2.5 hover:bg-[#F0F1F3]  before:content-[""] before:w-1 before:absolute before:left-0 before:bg-gradient-to-b from-[#3250FF] to-[#2BB2FE] before:h-full before:opacity-0 hover:before:opacity-100 group' >
              <h3 className='ml-3 text-sm font-semibold text-black-400 group-hover:text-[#1D1F2C] group-hover:font-bold'>Sản phẩm</h3>
            </Link >
            <Link to='' className='relative flex justify-between px-6 py-3 items-center h-12 mt-2.5 hover:bg-[#F0F1F3]  before:content-[""] before:w-1 before:absolute before:left-0 before:bg-gradient-to-b from-[#3250FF] to-[#2BB2FE] before:h-full before:opacity-0 hover:before:opacity-100 group' >
              <h3 className='ml-3 text-sm font-semibold text-black-400 group-hover:text-[#1D1F2C] group-hover:font-bold'>Danh mục</h3>
            </Link >
            <Link to='' className='relative flex justify-between px-6 py-3 items-center h-12 mt-2.5 hover:bg-[#F0F1F3]  before:content-[""] before:w-1 before:absolute before:left-0 before:bg-gradient-to-b from-[#3250FF] to-[#2BB2FE] before:h-full before:opacity-0 hover:before:opacity-100 group' >
              <h3 className='ml-3 text-sm font-semibold text-black-400 group-hover:text-[#1D1F2C] group-hover:font-bold'>Mã giảm giá</h3>
            </Link >
            <Link to='' className='relative flex justify-between px-6 py-3 items-center h-12 mt-2.5 hover:bg-[#F0F1F3]  before:content-[""] before:w-1 before:absolute before:left-0 before:bg-gradient-to-b from-[#3250FF] to-[#2BB2FE] before:h-full before:opacity-0 hover:before:opacity-100 group' >
              <h3 className='ml-3 text-sm font-semibold text-black-400 group-hover:text-[#1D1F2C] group-hover:font-bold'>Đơn hàng    </h3>
            </Link >

          </animated.ul>
          <Link to='' className='relative group flex  px-6 py-3 items-center h-12 mt-2.5 hover:bg-[#F0F1F3]  before:content-[""] before:w-1 before:absolute before:left-0 before:bg-gradient-to-b from-[#3250FF] to-[#2BB2FE] before:h-full before:opacity-0 hover:before:opacity-100' >
            <FaUser className='text-xl text-gray-85 group-hover:text-[#1D1F2C] group-hover:font-bold' />
            <h3 className='ml-3 text-sm font-semibold text-black-400 group-hover:text-[#1D1F2C] group-hover:font-bold'>Khách hàng</h3>
          </Link>
          <Link to='' className='relative group flex  px-6 py-3 items-center h-12 mt-2.5 hover:bg-[#F0F1F3]  before:content-[""] before:w-1 before:absolute before:left-0 before:bg-gradient-to-b from-[#3250FF] to-[#2BB2FE] before:h-full before:opacity-0 hover:before:opacity-100' >
            <BiSolidUserPin className='text-xl text-gray-85 group-hover:text-[#1D1F2C] group-hover:font-bold' />
            <h3 className='ml-3 text-sm font-semibold text-black-400 group-hover:text-[#1D1F2C] group-hover:font-bold'>Liên hệ</h3>
          </Link>
          <Link to='' className='relative group flex  px-6 py-3 items-center h-12 mt-2.5 hover:bg-[#F0F1F3]  before:content-[""] before:w-1 before:absolute before:left-0 before:bg-gradient-to-b from-[#3250FF] to-[#2BB2FE] before:h-full before:opacity-0 hover:before:opacity-100' >
            <FaCommentAlt className='text-xl text-gray-85 group-hover:text-[#1D1F2C] group-hover:font-bold' />
            <h3 className='ml-3 text-sm font-semibold text-black-400 group-hover:text-[#1D1F2C] group-hover:font-bold'>Bình luận</h3>
          </Link>
          <Link to='' className='relative group flex  px-6 py-3 items-center h-12 mt-2.5 hover:bg-[#F0F1F3]  before:content-[""] before:w-1 before:absolute before:left-0 before:bg-gradient-to-b from-[#3250FF] to-[#2BB2FE] before:h-full before:opacity-0 hover:before:opacity-100' >
            <BiSolidLike className='text-xl text-gray-85 group-hover:text-[#1D1F2C] group-hover:font-bold' />
            <h3 className='ml-3 text-sm font-semibold text-black-400 group-hover:text-[#1D1F2C] group-hover:font-bold'>Phản hồi  </h3>
          </Link>
          <Link to='' className='relative group flex  px-6 py-3 items-center h-12 mt-2.5 hover:bg-[#F0F1F3]  before:content-[""] before:w-1 before:absolute before:left-0 before:bg-gradient-to-b from-[#3250FF] to-[#2BB2FE] before:h-full before:opacity-0 hover:before:opacity-100' >
            <BiSolidUserPin className='text-xl text-gray-85 group-hover:text-[#1D1F2C] group-hover:font-bold' />
            <h3 className='ml-3 text-sm font-semibold text-black-400 group-hover:text-[#1D1F2C] group-hover:font-bold'>Liên hệ</h3>
          </Link>
        </div>
        {/* <div className='relative group flex justify-between px-6 py-3 items-center h-12 mt-2.5 ' >           
                <h3 className='ml-3 text-sm font-semibold text-black-500'>Ẩn Menu</h3>
                <IoCaretBackOutline className='text-xl text-gray-85 hover:text-black-500'/>             
            </div> */}
      </div>
    </>
  )
}

const SubSideBar = () =>
{
  const [ isOpen, setIsOpen ] = useState( false );


  const toggleDropdown = () =>
  {
    setIsOpen( !isOpen );
  };

  // Sử dụng react-spring để tạo hiệu ứng chuyển động
  const dropdownAnimation = useSpring( {
    opacity: isOpen ? 1 : 0,
    transform: isOpen ? 'translateY(0)' : 'translateY(-10px)',
  } );
  return (
    <div className={ `z-30 w-[264px] border border-[#F0F1F3] font-semibold min-h-[900px] bg-white  flex-col justify-between flex-1 lg:hidden absolute z-20 top-0 left-0` } >
      <div>
        <div className="text-2xl ml-5 py-6 ">
          Astro
        </div>
        <Link to='' className='group relative flex px-6 py-3 items-center h-12 mt-2.5 hover:bg-[#F0F1F3]  before:content-[""] before:w-1 before:absolute before:left-0 before:bg-gradient-to-b from-[#3250FF] to-[#2BB2FE] before:h-full before:opacity-0 hover:before:opacity-100' >
          <RiLayoutGridFill className='text-xl text-gray-85 group-hover:text-[#1D1F2C] group-hover:font-bold' />
          <h3 className='ml-3 text-sm font-semibold text-black-400 group-hover:text-[#1D1F2C] group-hover:font-bold'>Dashboard</h3>
        </Link>
        <div onClick={ toggleDropdown } className=' relative flex justify-between px-6 py-3 items-center h-12 mt-2.5 hover:bg-[#F0F1F3]  before:content-[""] before:w-1 before:absolute before:left-0 before:bg-gradient-to-b from-[#3250FF] to-[#2BB2FE] before:h-full before:opacity-0 hover:before:opacity-100 group' >
          <div className='flex'>
            <RiShoppingCart2Fill className='text-xl text-gray-85 group-hover:text-[#1D1F2C] group-hover:font-bold' />
            <h3 className='ml-3 text-sm font-semibold text-black-400 group-hover:text-[#1D1F2C] group-hover:font-bold'>Cửa hàng</h3>
          </div>
          { isOpen ? <IoCaretUpOutline className='text-xl text-gray-85 group-hover:text-[#1D1F2C] group-hover:font-bold' /> : <IoCaretDownOutline className='text-lg text-gray-85 group-hover:text-[#1D1F2C] group-hover:font-bold' /> }

        </div>
        <animated.ul
          style={ dropdownAnimation }
          className={ `ease-linear duration-800 ${ isOpen ? 'block' : 'hidden' }` }
        >
          <Link to='' className='relative flex justify-between px-6 py-3 items-center h-12 mt-2.5 hover:bg-[#F0F1F3]  before:content-[""] before:w-1 before:absolute before:left-0 before:bg-gradient-to-b from-[#3250FF] to-[#2BB2FE] before:h-full before:opacity-0 hover:before:opacity-100 group' >
            <h3 className='ml-3 text-sm font-semibold text-black-400 group-hover:text-[#1D1F2C] group-hover:font-bold'>Sản phẩm</h3>
          </Link >
          <Link to='' className='relative flex justify-between px-6 py-3 items-center h-12 mt-2.5 hover:bg-[#F0F1F3]  before:content-[""] before:w-1 before:absolute before:left-0 before:bg-gradient-to-b from-[#3250FF] to-[#2BB2FE] before:h-full before:opacity-0 hover:before:opacity-100 group' >
            <h3 className='ml-3 text-sm font-semibold text-black-400 group-hover:text-[#1D1F2C] group-hover:font-bold'>Danh mục</h3>
          </Link >
          <Link to='' className='relative flex justify-between px-6 py-3 items-center h-12 mt-2.5 hover:bg-[#F0F1F3]  before:content-[""] before:w-1 before:absolute before:left-0 before:bg-gradient-to-b from-[#3250FF] to-[#2BB2FE] before:h-full before:opacity-0 hover:before:opacity-100 group' >
            <h3 className='ml-3 text-sm font-semibold text-black-400 group-hover:text-[#1D1F2C] group-hover:font-bold'>Mã giảm giá</h3>
          </Link >
          <Link to='' className='relative flex justify-between px-6 py-3 items-center h-12 mt-2.5 hover:bg-[#F0F1F3]  before:content-[""] before:w-1 before:absolute before:left-0 before:bg-gradient-to-b from-[#3250FF] to-[#2BB2FE] before:h-full before:opacity-0 hover:before:opacity-100 group' >
            <h3 className='ml-3 text-sm font-semibold text-black-400 group-hover:text-[#1D1F2C] group-hover:font-bold'>Đơn hàng    </h3>
          </Link >

        </animated.ul>
        <Link to='' className='relative group flex  px-6 py-3 items-center h-12 mt-2.5 hover:bg-[#F0F1F3]  before:content-[""] before:w-1 before:absolute before:left-0 before:bg-gradient-to-b from-[#3250FF] to-[#2BB2FE] before:h-full before:opacity-0 hover:before:opacity-100' >
          <FaUser className='text-xl text-gray-85 group-hover:text-[#1D1F2C] group-hover:font-bold' />
          <h3 className='ml-3 text-sm font-semibold text-black-400 group-hover:text-[#1D1F2C] group-hover:font-bold'>Khách hàng</h3>
        </Link>
        <Link to='' className='relative group flex  px-6 py-3 items-center h-12 mt-2.5 hover:bg-[#F0F1F3]  before:content-[""] before:w-1 before:absolute before:left-0 before:bg-gradient-to-b from-[#3250FF] to-[#2BB2FE] before:h-full before:opacity-0 hover:before:opacity-100' >
          <BiSolidUserPin className='text-xl text-gray-85 group-hover:text-[#1D1F2C] group-hover:font-bold' />
          <h3 className='ml-3 text-sm font-semibold text-black-400 group-hover:text-[#1D1F2C] group-hover:font-bold'>Liên hệ</h3>
        </Link>
        <Link to='' className='relative group flex  px-6 py-3 items-center h-12 mt-2.5 hover:bg-[#F0F1F3]  before:content-[""] before:w-1 before:absolute before:left-0 before:bg-gradient-to-b from-[#3250FF] to-[#2BB2FE] before:h-full before:opacity-0 hover:before:opacity-100' >
          <FaCommentAlt className='text-xl text-gray-85 group-hover:text-[#1D1F2C] group-hover:font-bold' />
          <h3 className='ml-3 text-sm font-semibold text-black-400 group-hover:text-[#1D1F2C] group-hover:font-bold'>Bình luận</h3>
        </Link>
        <Link to='' className='relative group flex  px-6 py-3 items-center h-12 mt-2.5 hover:bg-[#F0F1F3]  before:content-[""] before:w-1 before:absolute before:left-0 before:bg-gradient-to-b from-[#3250FF] to-[#2BB2FE] before:h-full before:opacity-0 hover:before:opacity-100' >
          <BiSolidLike className='text-xl text-gray-85 group-hover:text-[#1D1F2C] group-hover:font-bold' />
          <h3 className='ml-3 text-sm font-semibold text-black-400 group-hover:text-[#1D1F2C] group-hover:font-bold'>Phản hồi  </h3>
        </Link>
        <Link to='' className='relative group flex  px-6 py-3 items-center h-12 mt-2.5 hover:bg-[#F0F1F3]  before:content-[""] before:w-1 before:absolute before:left-0 before:bg-gradient-to-b from-[#3250FF] to-[#2BB2FE] before:h-full before:opacity-0 hover:before:opacity-100' >
          <BiSolidUserPin className='text-xl text-gray-85 group-hover:text-[#1D1F2C] group-hover:font-bold' />
          <h3 className='ml-3 text-sm font-semibold text-black-400 group-hover:text-[#1D1F2C] group-hover:font-bold'>Liên hệ</h3>
        </Link>
        <Link to='' className='relative group flex  px-6 py-3 items-center h-12 mt-2.5 hover:bg-[#F0F1F3]  before:content-[""] before:w-1 before:absolute before:left-0 before:bg-gradient-to-b from-[#3250FF] to-[#2BB2FE] before:h-full before:opacity-0 hover:before:opacity-100' >
          <BiSolidUserPin className='text-xl text-gray-85 group-hover:text-[#1D1F2C] group-hover:font-bold' />
          <h3 className='ml-3 text-sm font-semibold text-black-400 group-hover:text-[#1D1F2C] group-hover:font-bold'>Thống kê</h3>
        </Link>
      </div>

    </div>
  )
}
export { SideBar, SubSideBar }