import { useState } from 'react'
import Header from './Header'
import {SideBar, SubSideBar} from './SideBar'
import { Outlet } from 'react-router-dom'

const LayoutAdmin = () => {
  const [openSidebar, setOpenSidebar] = useState(false)

  const toggleSidebar = () => {
    console.log('sdfsdf');
    
    setOpenSidebar(!openSidebar)
  }
  return (
    <>
      
      <div className='max-w-screen-2xl  mx-auto flex' >
        <SideBar/>
        <div className='bg-[#F9F9FC] flex-1 '>
          <Header change={toggleSidebar} />
          <div className='relative'>
            { openSidebar && <SubSideBar/>}
            <Outlet />
          </div>
        </div>
        </div>
      </>
  )
}

export default LayoutAdmin