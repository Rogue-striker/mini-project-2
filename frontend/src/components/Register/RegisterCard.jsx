import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Axios from './../../utils/Axios.js'

const RegisterCard = () => {
  const Nav = useNavigate()
  const [userDetails, setUserDetails] = useState({
    name: '',
    phonenumber: '',
    email: '',
    password: '',
  })
  const handleSignUp = (e) => {
    e.preventDefault();
    Axios.post("/auth/register", {
      phonenumber: userDetails.phonenumber,
      name: userDetails.name,
      email: userDetails.email,
      password: userDetails.password,
    }).then((response) => {
      setUserDetails({
        phonenumber: '',
        name: '',
        email: '',
        password: '',
      })
      Nav("/auth/login")
    }).catch((error) => {
      alert(error.response.data)
    })

  }
  const handleUserDetails = (e) => {
    setUserDetails({
      ...userDetails,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className='shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] px-24 py-4 rounded-lg'>
      <Link to='/' className='flex justify-center'>
        <h1
          className=' flex justify-center items-center text-3xl font-bold font-["Nunito"] 
            rounded-lg shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] w-fit'>
          <span className='bg-teal-500 text-white px-1 rounded-l-lg'>
            Car
          </span>
          <span className='px-1'>
            Pool
          </span>
        </h1>
      </Link>
      <form className='mt-6'>
        <div className='flex flex-col'>
          <label
            htmlFor="Name"
            className='font-["Nunito"] font-bold text-md'
          >Name</label>
          <input
            type="text"
            name="name"
            id="name"
            className='border border-black rounded-md p-3 mt-2'
            value={userDetails.name}
            onChange={handleUserDetails} />
        </div>
        <div className='flex flex-col mt-4'>
          <label
            htmlFor="phonenumber"
            className='font-["Nunito"] font-bold text-md'
          >Phone Number</label>
          <input
            type="text"
            name="phonenumber"
            id="phonenumber"
            className='border border-black rounded-md p-3 mt-2'
            value={userDetails.phonenumber}
            onChange={handleUserDetails} />
        </div>
        <div className='flex flex-col mt-4'>
          <label
            htmlFor="email"
            className='font-["Nunito"] font-bold text-md'
          >Email</label>
          <input
            type="email"
            name="email"
            id="email"
            value={userDetails.email}
            className='border border-black rounded-md p-3 mt-2'
            onChange={handleUserDetails} />
        </div>
        <div className='flex flex-col mt-4'>
          <label
            htmlFor="password"
            className='font-["Nunito"] font-bold text-md'
          >Password</label>
          <input
            type="password"
            name="password"
            id="password"
            value={userDetails.password}
            className='border border-black rounded-md p-3 mt-2'
            onChange={handleUserDetails} />
        </div>
        <div className='flex justify-center items-center'>
          <button
            className='bg-teal-500 text-white font-bold font-["Nunito"] mt-4 px-3 py-2 rounded-md'
            onClick={handleSignUp}
          >Sign up</button>
        </div>
        <div className='flex justify-center items-center mt-4'>
          <p className='font-["Nunito"] font-bold'>Already Registered?<Link to="/auth/login" className='text-[#484b56] ml-1'>Log in</Link></p>
        </div>
      </form>
    </div>
  )
}

export default RegisterCard