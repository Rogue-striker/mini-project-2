import React from 'react'
import arrowSvg from './../../assets/arrow.svg'
import { useNavigate } from 'react-router-dom'
const JourneyCard = ({ ride }) => {
    const { source, destination, startTime, endTime, price, seats, name, _id } = ride
    const Navigate = useNavigate();
    const openJourneyPage = () => {
        Navigate(`/journey/${_id}`)
    }
    return (
        <div className='flex  flex-col w-80  rounded-md  shadow-[0_3px_10px_rgb(0,0,0,0.2)] p-3 h-32'>
            <div className='flex justify-between w-full h-full'>
                <div className='flex flex-col justify-center'>
                    <div className='flex gap-7'>
                        <span className='w-[36px]'>{startTime}</span>
                        <span className='font-semibold'>
                            <span className='h-3 w-3 border-2 border-blue-900 inline-flex rounded-full mr-1'>
                            </span>{source}
                        </span>
                    </div>
                    <div className='flex gap-7'>
                        <span className='w-[36px]'>
                            {endTime}
                        </span>
                        <span className='font-semibold'>
                            <span className='h-3 w-3 border-2 border-blue-900 inline-flex rounded-full mr-1'>
                            </span>{destination}</span>
                    </div>
                    <div>
                    </div>
                </div>
                <div className='flex flex-col justify-center'>
                    <h1 className='font-bold'>
                        {` ₹${price}`}
                    </h1>
                    <h1>
                        {`Seats: ${seats}`}
                    </h1>

                </div>
            </div>

            <div className='flex justify-between items-center'>
                <p>
                    <span className='font-semibold mr-1'>
                        Rider :
                    </span>
                    <span className='font-bold text-lg'>
                        {name}
                    </span>
                </p>
                <img src={arrowSvg} alt="arrow" className='h-4 w-4 cursor-pointer' onClick={openJourneyPage} />
            </div>
        </div>

    )
}

export default JourneyCard