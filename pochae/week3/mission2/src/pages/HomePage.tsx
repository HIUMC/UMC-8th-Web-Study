import { JSX } from 'react'
import { Outlet } from 'react-router-dom'
import { Navbar } from '../components/Navbar'

const HomePage = (): JSX.Element => {
  return (
    <>
        <Navbar />
        <Outlet />
    </>
  )
}

export default HomePage
