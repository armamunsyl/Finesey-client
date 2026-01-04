import React from 'react'
import Navbar from '../Component/Navbar'
import { Outlet } from 'react-router'
import Footer from '../Component/Footer'

const Layout = () => {
  return (
        <div className=''>
        <Navbar> </Navbar>
        <Outlet></Outlet>
        <Footer></Footer>
    </div>
  )
}

export default Layout