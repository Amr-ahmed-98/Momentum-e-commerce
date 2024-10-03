import { Outlet } from 'react-router-dom'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'

const Layout = () => {
  return (
    // this layout to make all pages have navbar and footer and  all content go in outlet
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  )
}

export default Layout