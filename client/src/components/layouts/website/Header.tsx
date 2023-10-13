import { Link } from "react-router-dom";
import { AiOutlineShopping, AiOutlineHeart, AiOutlineSearch } from "react-icons/ai";
import { CiSearch } from "react-icons/ci";
import { FiUser } from "react-icons/fi"
import { FaBars } from "react-icons/fa"
import { useState } from "react";
import { HiOutlineX } from "react-icons/hi"
import "./style.css"

const Header = () =>
{
  const [ isSearchVisible, setIsSearchVisible ] = useState( false );
  const [ searchInput, setSearchInput ] = useState( "" );

  const toggleSearch = () =>
  {
    setIsSearchVisible( !isSearchVisible );
  };

  const handleInputChange = ( e: any ) =>
  {
    setSearchInput( e.target.value );
  };

  const clearSearchInput = () =>
  {
    setSearchInput( "" );
  };

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
    <div className="content-wrapper logo text-black justify-center text-base mx-auto bg-[#ffffff]">
      <div className="bg-[#5A6D57] text-center text-white text-sm font-medium py-2">
        Enjoy Free Shipping On All Orders
      </div>
      <header className="justify-centers flex header-navBar flex-row justify-between item-center ">
        <div className=" font-serif text-[#404040]   ml-16  ">
          Bee Fashion
        </div>
        <header className="py-3  justify-centers items-center ml-auto   ">
          <button onClick={ () => setIsProductDropdownOpen( !isProductDropdownOpen ) } className="nav-btn ">
            <FaBars />
          </button>
          <nav className="flex nav-header flex-row justify-between items-center">
            <div className={ isProductDropdownOpen ? " open  flex items-center   " : "flex items-center  gap-10 " }>

              <ul className={ " flex items-center  gap-10  font-monster" }>
                <li className="  cursor-pointer ">
                  <Link to={ "" } className="  p-3 inline-block  hover:text-gray-500 relative after:absolute after:bottom-0 after:left-0 after:bg-gray-700 after:h-0.5 hover:after:w-full after:w-0 after:transition-all after:ease-in-out after:duration-300"
                  > New In </Link>


                </li>

                <li className="group relative">
                  <Link
                    className=" p-3 inline-block"
                    to={ "" }
                  >
                    Clothings
                  </Link>
                  <div className="z-50 absolute w-40 left-0 mt-3 rounded-lg shadow-lg bg-white mt-2 bg-[#0F172A] p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible group-hover:mt-0 transition-all duration-500">
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
                      <li>
                        <Link
                          className="block p-2 text-black-500 hover:bg-gray-300 hover:text-black cursor-pointer"
                          to={ "" }
                        >
                          Áo Khoác
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="block p-2 text-black-500 hover:bg-gray-300 hover:text-black cursor-pointer"
                          to={ "" }
                        >
                          Áo Khoác
                        </Link>
                      </li>      <li>
                        <Link
                          className="block p-2 text-black-500 hover:bg-gray-300 hover:text-black cursor-pointer"
                          to={ "" }
                        >
                          Áo Khoác
                        </Link>
                      </li>      <li>
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
                  <Link to={ "" } className="p-3"> Contact Us  </Link>
                </li>

              </ul>
            </div>


          </nav>
        </header>
        <nav className="ml-auto" >
          <ul className="flex flex-row mt-2 mr-16 uppercase  gap-3">
            <Link onClick={ toggleSearch } to={ "" }>
              <span className="inline-block">
                <AiOutlineSearch className="w-6 h-6" />
              </span>
            </Link>
            <div >
              <Link to={ "/login" }>
                <button className=" ml-2 "><FiUser className="h-6 w-6" /></button>
              </Link>
            </div>
            <Link className=" ml-2  h-6 w-6" to={ "" }>
              <Link to={ "" }>
                <span className="inline-block">
                  <AiOutlineHeart className="w-6 h-6" />
                </span>
              </Link>
            </Link>
            <Link className=" ml-2  h-6 w-6" to={ "" }>
              <Link to={ "" }>
                <span className="inline-block">
                  <AiOutlineShopping className="w-6 h-6" />
                </span>
              </Link>
            </Link>

          </ul>
        </nav>
        {/* <div className="relative mr-40 z-50 ">

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

        </div> */}

      </header>
      <form
        className={ `text-sm md:text-lg lg:text-xl xl:text-xl relative items-center py-5 ml-16 mr-16 search-form ${ isSearchVisible ? "visible" : ""
          }` }
        action=""
      >
        <div className="relative">
          <input
            className="w-full h-10 pl-10 pr-16 font-size:16px outline-none"
            type="text"
            name="search"
            placeholder="Tìm Kiếm"
            value={ searchInput }
            onChange={ handleInputChange }
          />
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            <CiSearch />
          </span>
          { searchInput && ( // Hiển thị biểu tượng "X" nếu có nội dung trong input
            <span
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer"
              onClick={ clearSearchInput }
            >
              <HiOutlineX />
            </span>
          ) }
        </div>
        <hr />
      </form>
    </div>
  );
};

export default Header;
