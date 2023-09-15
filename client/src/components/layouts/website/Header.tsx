import { Link } from "react-router-dom";
import { AiOutlineSearch, AiOutlineShoppingCart, AiFillCaretUp, AiOutlineInbox, AiOutlineUser } from "react-icons/ai";
import { BiUserCircle, BiHelpCircle } from "react-icons/bi";
import { CiSettings } from "react-icons/ci";

import { GoSignOut } from "react-icons/go";
import { FcLike } from "react-icons/fc";
import { useState } from "react";

const Header = () =>
{
  const [ isOpen, setIsOpen ] = useState( false );

  const toggleDropdown = () =>
  {
    setIsOpen( !isOpen );
  };

  const closeDropdown = () =>
  {
    setIsOpen( false );
  };

  return (
    <div>
      <div className="content-wrapper  text-white  justify-center text-base mx-auto  bg-[#0F172A]">
        <header className="justify-centers flex flex-row justify-between py-4  ">
          <div className="logo text-xl font-semibold cursor-pointer   mt-2 ml-40 ">
            Astro Ecommerce
          </div>
          <nav className="ml-auto" >
            <ul className="flex flex-row mt-2 mr-3 uppercase text-sm gap-3  ">
              <Link to={ "" }>
                <span>
                  <FcLike className="w-5 h-5" />
                </span>
              </Link>
              <Link to={ "" }>
                <span className="inline-block">
                  <AiOutlineShoppingCart className="w-5 h-5" />
                </span>
              </Link>
              <Link to={ "" }>
                <button className="">Đăng nhập</button>
              </Link>
              <div>/</div>
              <Link to={ "" }>
                <button className="">Đăng kí</button>
              </Link>

            </ul> </nav>
          <div className="relative ml-50 mr-40 z-50  ">

            {/* Avatar */ }
            <button
              className="flex items-center gap-2 rounded-full px-2 py-1 text-blue-gray-900 hover:bg-blue-gray-100 focus:outline-none focus:bg-blue-gray-100"
              onClick={ toggleDropdown }
            >
              <img
                src="https://tse1.mm.bing.net/th?id=OIP.NmmLScNzzl_2MW_2_fuE5wHaD4&pid=Api&P=0&h=220"
                alt="Your Name"
                className="w-8 h-8 rounded-full "
              />
              <AiFillCaretUp className={ `h-4 w-4 ${ isOpen ? "rotate-180" : "" }` } />
            </button>







            {/* Dropdown */ }
            { isOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white  border border-gray-300 rounded-lg shadow-lg ">
                <div className="flex flex-col  text-sm font-medium ">
                  <ul>
                    <li>
                      <a
                        href="admin"
                        className="flex items-center px-4 py-2 text-black-500 hover:bg-blue-100"
                        onClick={ closeDropdown }
                      >
                        <AiOutlineUser className="w-5 h-5 mr-2" />
                        Tài khoản của tôi
                      </a>
                    </li>
                    <li>
                      <a
                        href="admin"
                        className="flex items-center px-4 py-2 text-black-500 hover:bg-blue-100"
                        onClick={ closeDropdown }
                      >
                        <CiSettings className="w-5 h-5 mr-2" />
                        Cài đặt
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="flex items-center px-4 py-2 text-black-500 hover:bg-blue-100"
                        onClick={ closeDropdown }
                      >
                        <AiOutlineInbox className="w-5 h-5 mr-2" />
                        ChangeLog
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="flex items-center px-4 py-2 text-black-500 hover:bg-blue-100"
                        onClick={ closeDropdown }
                      >
                        <BiHelpCircle className="w-5 h-5 mr-2" />
                        Support
                      </a>
                    </li>
                    <li>
                      <hr className="my-1 border-t border-gray-200" />
                    </li>
                    <li className=" ">
                      <a
                        href="#"
                        className="flex items-center px-4 py-2 text-red-500 hover:bg-red-100 w-full transition-colors duration-300"
                        onClick={ closeDropdown }
                      >
                        <GoSignOut className="w-5 h-5 mr-2" />
                        Sign Out
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            ) }

          </div>
        </header>
        <hr className="w-full" />
        <header className="py-8  ml-40 ">
          <nav className="flex flex-row justify-between items-center ">
            <ul className=" flex items-center gap-10  font-medium  ">
              <li className="bg-gray-700 h-10 w-20 rounded-xl cursor-pointer py-1 hover:scale-125 duration-300 py-2 text-center ">
                <Link to={ "" } className=" "> Cửa hàng </Link>
              </li>
              <li className="hover:text-gray-500 relative after:absolute after:bottom-0 after:left-0 after:bg-gray-700 after:h-0.5 hover:after:w-full after:w-0 after:transition-all after:ease-in-out after:duration-300">
                <Link to={ "" } className=" "> Sản phẩm </Link>
              </li>
              <li className="group relative">
                <Link
                  className="hover:text-gray-500 relative after:absolute after:bottom-0 after:left-0 after:bg-gray-700 after:h-0.5 hover:after:w-full after:w-0 after:transition-all after:ease-in-out after:duration-300"
                  to={ "" }
                >
                  Danh mục
                </Link>
                <div className="absolute w-40 left-0 mt-3 rounded-lg shadow-lg bg-white mt-2 bg-[#0F172A] p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible group-hover:mt-0 transition-all duration-500">
                  <ul className="">
                    <li>
                      <Link
                        className="block p-2 text-black-500 hover:bg-gray-300 hover:text-black cursor-pointer"
                        to={ "" }
                      >
                        áo
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="block p-2 text-black-500 hover:bg-gray-300 hover:text-black cursor-pointer"
                        to={ "" }
                      >
                        quần
                      </Link>
                    </li>
                    <hr />
                    <li>
                      <Link
                        className="block p-2 text-black-500 hover:bg-gray-300 hover:text-black cursor-pointer"
                        to={ "" }
                      >
                        Áo Khoác
                      </Link>
                    </li>
                  </ul>
                </div>
              </li>
              <li className="hover:text-gray-500 relative after:absolute after:bottom-0 after:left-0 after:bg-gray-700 after:h-0.5 hover:after:w-full after:w-0 after:transition-all after:ease-in-out after:duration-300">
                <Link to={ "" } className=""> Blog </Link>
              </li>
              <li className="hover:text-gray-500 relative after:absolute after:bottom-0 after:left-0 after:bg-gray-700 after:h-0.5 hover:after:w-full after:w-0 after:transition-all after:ease-in-out after:duration-300">
                <Link to={ "" } className=""> Liên hệ với chúng tôi </Link>
              </li>
            </ul>
            <form className=" mr-40  relative " action="">
              <input className="w-full h-10 pl-10 pr-16 font-size:16px rounded-xl bg-gray-600 " type="text" name="search" placeholder="search" />
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <AiOutlineSearch />
              </span>
            </form>
          </nav>
        </header>
      </div >
    </div >
  );
};

export default Header;
