import React from 'react'
import { Link } from 'react-router-dom'
const LandingPage = () => {
  return (
    <>
      <div className='h-screen w-screen absolute top-0 left-0 -z-30'>
        <lottie-player src="https://assets6.lottiefiles.com/packages/lf20_znsmxbjo.json" background="transparent" speed="1" loop autoplay></lottie-player>
      </div>
      <div className='grid grid-rows-6 justify-items-center mt-10'>
        <h1
          className='flex justify-center items-center text-5xl font-bold font-["Nunito"] 
          rounded-lg shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] w-fit'
        >
          <span className='bg-teal-500 text-white px-4
            py-4 rounded-l-lg'>
            Car
          </span>
          <span className='px-2'>
            Pool
          </span>
        </h1>
        <div className='text-xl mt-10'>
          Welcome to Car Pooling you can find the rides for the best prices
        </div>
        <div className='mt-10'>
          <Link to="/auth/login" className='text-3xl ml-2'>
            Login
          </Link>
          <Link to="/auth/register" className='text-3xl ml-2 bg-teal-500 text-white rounded px-2 py-1'>
            Register
          </Link>
        </div>
      </div>
    </>
  )
}

export default LandingPage