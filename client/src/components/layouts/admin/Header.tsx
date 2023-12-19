
// import React from 'react'

import { useEffect, useState } from "react";
import { GoSignOut } from "react-icons/go";
import { IoCaretDownOutline } from "react-icons/io5";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useGetAdminByTokenMutation } from "../../../store/Auth/Auth.services";
import { toastError } from "../../../hook/toastify";
import { IUser } from "../../../store/Auth/Auth.interface";






const Header = () =>
{
  const location = useLocation();
  const navigate = useNavigate()
  const [ issOpen, setIssOpen ] = useState( false );
  const [ currentAdmin, setcurrentAdmin ] = useState<IUser | null>( null )
  const [ admin ] = useGetAdminByTokenMutation()
  const token = localStorage.getItem( "checktoken" );
  console.log( currentAdmin );

  useEffect( () =>
  {
    if ( token )
    {
      admin( token )
        .unwrap()
        .then( ( response ) =>
        {
          setcurrentAdmin( response.data );
        } )
        .catch( ( error ) =>
        {
          toastError( error.data.message );
        } );
    }
  }, [ admin, token, location ] );

  const toggleDropdown = () =>
  {
    setIssOpen( ( isOpen ) => !isOpen );
  };
  const logOut = () =>
  {
    localStorage.removeItem( "checktoken" );
    navigate( "/loginAdmin" );
  };
  return (
    <div className=''>
      <div className='flex justify-end max-w-full mt-8 mb-7 mx-6 h-10'>
        <div className='flex items-center ml-8'>
          <div className='flex items-center ml-6'>
            <div className='mr-3'>
              <h3 className='text-sm font-medium text-[#07080B]'>Xin chào:{ currentAdmin?.name }</h3>
              <p className='text-xs font-medium text-black-400 leading-[18px]'>{ currentAdmin?.role }</p>
            </div>
            <div className="relative z-10">
              <div className='flex items-center'><IoCaretDownOutline onClick={ toggleDropdown } className='block text-lg  text-black-400  font-normal ml-2 hover:text-black-500' /></div>
              { issOpen && (
                <div className="absolute right-0 mt-2 w-52 bg-white border border-gray-300 rounded-lg shadow-lg">
                  {/* Các mục menu dropdown */ }
                  <div className="flex flex-col">
                    <ul>

                      <li>
                        <Link to="#" className="flex items-center px-4 py-2 text-black-500 hover:bg-red-100 w-full transition-colors duration-300" onClick={ logOut }>
                          <GoSignOut className="w-5 h-5 mr-2" />
                          Đăng Xuất
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              ) }
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Header