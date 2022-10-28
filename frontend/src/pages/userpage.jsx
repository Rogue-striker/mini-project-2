import React, { useContext } from 'react'
import { Outlet, useParams, NavLink } from 'react-router-dom'
import Navbar from '../components/Navbar/Navbar'
import Axios from './../utils/Axios'
import UserContext from './../contexts/usercontext'

const userpage = () => {
  const [user] = useContext(UserContext)
  return (
    <div>
      <Navbar />
      <div className='container mx-auto flex flex-col justify-center items-center  mt-10'>
        <div className='flex flex-col min-w-[600px]'>
          <div className='flex justify-center items-center mb-4 flex-col'>
            <h1 className='text-5xl font-bold text-teal-800 mb-4'>{user?.name}</h1>
            <div className='mt-2 flex h-1 bg-zinc-200 w-full'></div>
            <div className='flex  justify-between w-full my-4'>
              <p className='text-lg font-semibold'>
                Email
              </p>
              <p>
                {user?.email}
              </p>
            </div>
            <div className='mt-2 flex h-1 bg-zinc-200 w-full rounded'></div>
            <div className='flex  justify-between w-full my-4'>
              <p className='text-lg font-semibold'>
                Phone Number
              </p>
              <p>
                {user?.phonenumber}
              </p>
            </div>
            <div className='mt-2 flex h-1 bg-zinc-200 w-full rounded'></div>
            <div className='flex justify-between w-full mt-2'>
              <NavLink
                to="myrides"
                className={
                  ({isActive})=> isActive? 'flex w-1/2 justify-center items-center bg-teal-700 text-white rounded-lg font-bold' : 'flex w-1/2 justify-center items-center '
                }
              >
                <button className='px-1 py-1'>
                  My Rides
                </button>
              </NavLink>
              <NavLink
                to="myrequests"
                className={
                  ({isActive})=> isActive? 'flex w-1/2 justify-center items-center bg-teal-700 text-white rounded-lg font-bold' : 'flex w-1/2 justify-center items-center '
                }
              >
                <button className='px-1 py-1'>
                  My Requests
                </button>
              </NavLink>
              <NavLink
                to="requested"
                className={
                  ({isActive})=> isActive? 'flex w-1/2 justify-center items-center bg-teal-700 text-white rounded-lg font-bold' : 'flex w-1/2 justify-center items-center '
                }
              >
                <button className='px-1 py-1'>
                   Ride Request
                </button>
              </NavLink>
            </div>
              <Outlet />
          </div>
        </div>
      </div>
    </div>
  )
}

export default userpage