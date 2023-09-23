import { Link } from "react-router-dom";
import { AiOutlineSearch, AiOutlineUser } from "react-icons/ai";
import { BiHelpCircle } from "react-icons/bi";
import { CiSettings } from "react-icons/ci";
import { RiShoppingBasket2Line } from "react-icons/ri"
import { PiCaretDownThin } from "react-icons/pi"
import { GoSignOut } from "react-icons/go";
import { FaBars } from "react-icons/fa"
import { useState } from "react";
import "./style.css"

const Header = () =>
{


  const [ isOpen, setIsOpen ] = useState( false );
  const [ isProductDropdownOpen, setIsProductDropdownOpen ] = useState( false );

  const toggleDropdown = () =>
  {
    setIsOpen( !isOpen );
  };

  const closeDropdown = () =>
  {
    setIsOpen( false );
  };



  return (
    <div className="content-wrapper logo text-white justify-center text-base mx-auto bg-[#0F172A]">
      <header className="justify-centers flex header-navBar flex-row justify-between item-center py-3 ">
        <div className=" text-xl font-semibold cursor-pointer  mt-2 ml-40  ">
          Astro Ecommerce
        </div>
        <nav className="ml-auto" >
          <ul className="flex flex-row mt-2 mr-3 uppercase  gap-3">
            <Link to={ "" }>
              <span className="inline-block">
                <RiShoppingBasket2Line className="w-6 h-6" />
              </span>
            </Link>
            <Link className=" ml-2  h-6 w-6" to={ "" }>
              <span >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 text-white">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" fill="white" />
                </svg>


              </span>
            </Link>

            <Link to={ "/login" }>
              <button className="">Đăng nhập</button>
            </Link>
            <div>/</div>
            <Link to={ "signup" }>
              <button className="">Đăng kí</button>
            </Link>
          </ul>
        </nav>
        <div className="relative mr-40 z-50 ">

          {/* Avatar */ }
          <button
            className="flex items-center gap-2 rounded-full px-2 py-1 text-blue-gray-900 hover:bg-blue-gray-100 focus:outline-none focus:bg-blue-gray-100"
            onClick={ toggleDropdown }
          >
            <PiCaretDownThin className={ `h-4 w-4 ` } />
            <img
              src="./images/h-f-e-co-studio-svdoLpO_t30-unsplash.png"
              alt="Your Name"
              className="w-8 h-8 rounded-xl "
            />


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
                  <hr />
                  <li>
                    <a
                      href="#"
                      className="flex items-center px-4 py-2 text-black-500 hover:bg-blue-100"
                      onClick={ closeDropdown }
                    >
                      <img src="./2-layers.svg" className="w-5 h-5 mr-2" />
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
                      className="flex items-center px-4 py-2 text-black-500 hover:bg-red-100 w-full transition-colors duration-300"
                      onClick={ closeDropdown }
                    >
                      <GoSignOut className="w-5 h-5 mr-2" />
                      Đăng Xuất
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          ) }

        </div>
      </header>
      <hr className="w-full " />
      <header className="py-3  justify-centers items-center ml-40   ">
        <button onClick={ () => setIsProductDropdownOpen( !isProductDropdownOpen ) } className="nav-btn ">
          <FaBars />
        </button>
        <nav className="flex nav-header flex-row justify-between items-center">
          <div className={ isProductDropdownOpen ? " open  flex items-center  gap-10 font-noto-sans " : "flex items-center  gap-10 font-noto-sans" }>

            <ul className={ "  flex items-center  gap-10 font-noto-sans" }>
              <li className=" button-menu rounded-lg shadow-lg cursor-pointer hover:scale-125 duration-300 py-2 text-center ">
                <Link to={ "" } className=" ml-3 mr-3 "> Cửa hàng </Link>
              </li>
              <li className="hover:text-gray-500 relative after:absolute after:bottom-0 after:left-0 after:bg-gray-700 after:h-0.5 hover:after:w-full after:w-0 after:transition-all after:ease-in-out after:duration-300">
                <Link to={ "" } className=""> Sản Phẩm  </Link>
              </li>
              <li className="group relative">
                <Link
                  className=" p-3 inline-block  hover:text-gray-500 relative after:absolute after:bottom-0 after:left-0 after:bg-gray-700 after:h-0.5 hover:after:w-full after:w-0 after:transition-all after:ease-in-out after:duration-300"
                  to={ "" }
                >
                  Danh mục
                </Link>
                <div className="absolute w-40 left-0 mt-3 rounded-lg shadow-lg bg-white mt-2 bg-[#0F172A] p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible group-hover:mt-0 transition-all duration-500">
                  <ul className=" text-sm font-medium">
                    <li>
                      <Link
                        className="block p-2 text-black-500 hover:bg-gray-300 hover:text-black cursor-pointer"
                        to={ "" }
                      >
                        Áo                       </Link>
                    </li>
                    <li>
                      <Link
                        className="block p-2 text-black-500 hover:bg-gray-300 hover:text-black cursor-pointer"
                        to={ "" }
                      >
                        Quần                       </Link>
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
          </div>

          <form className=" mr-40  relative items-center  search-form" action="">
            <input className="w-full h-10 pl-10 pr-16 font-size:16px rounded-xl bg-gray-600 " type="text" name="search" placeholder="search" />
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <AiOutlineSearch />
            </span>
          </form>
        </nav>
      </header>
    </div >
  );
};

export default Header;
