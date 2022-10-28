import React from 'react'
import { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import UserContext from './../../contexts/usercontext'
import add from './../../assets/add.svg';
import search from './../../assets/search.svg';

const Navbar = () => {
  const navigate = useNavigate()
  const [user, setUser] = useContext(UserContext)
  const handleLogout = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('accessToken')
    setUser(null)
    navigate("/")
  }
  return (
    <div className='flex justify-center items-center h-14'>
      <div className='container flex justify-between items-center'>
        <div className='flex'>
          <Link to="/">
            <h1
              className=' flex justify-center items-center text-3xl font-bold font-["Nunito"] 
            rounded-lg shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px]'>
              <span className='bg-teal-500 text-white px-1 rounded-l-lg'>
                Car
              </span>
              <span className='px-1'>
                Pool
              </span>
            </h1>
          </Link>
        </div>
        <div className='flex gap-5 items-center'>
          <Link to="/">
            <button className='flex text-teal-600 font-bold justify-center items-center'>
              <img src={search} alt="search svg" className='h-4 mr-1' />
              Search
            </button>
          </Link>
          <Link to="/publishride">
            <button className='flex text-teal-600 font-bold justify-center items-center'>
              <img src={add} alt="add button" className='h-4 mr-1' />
              Publish a Ride</button>
          </Link>

          <Link to="/user">
            <h1 className='bg-teal-500 text-white font-bold px-1 py-1 rounded'>Profile</h1>
          </Link>
          <button
            onClick={handleLogout}
            className='bg-teal-500 text-white font-bold px-1 py-1 rounded'
          >
            Logout</button>
        </div>
      </div>
    </div>
  )
}

export default Navbar