import { Outlet } from "react-router-dom"
import Header from "./Header"
import Footer from "./Footer"


const LayoutWebsite = () => {
  return (
    <div>
      <Header currentUser={ null } />
      <Outlet />
      <Footer />
    </div>
  )
}

export default LayoutWebsite