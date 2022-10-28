import React from 'react'
import JourneyCard from '../journeyCard/JourneyCard'
const JourneyList = ({ rides }) => {
  return (
    <div className='mt-10 grid grid-cols-2 gap-5 mx-auto'>
      {
        rides?.length ? rides.map((ride, index) => <JourneyCard key={index} ride={ride} />) :
          <div className='flex justify-center flex-col items-center col-span-2 relative'>
            <div className='flex flex-col absolute top-10'> 
               <h1 className='text-2xl'>Seems No Rides are there...</h1>
            </div>
            <div>

            <lottie-player src="https://assets2.lottiefiles.com/packages/lf20_gst7kkoi.json"
              background="transparent"
              speed="1"
              loop
              autoplay
              style={{ width: "400px", height: "400px" }}
              ></lottie-player>
              </div>
          </div>
      }
    </div>
  )
}

export default JourneyList