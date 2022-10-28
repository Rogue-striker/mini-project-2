import React, { useEffect, useState, useContext } from 'react'
import {  useNavigate, useParams } from 'react-router-dom'
import arrowSvg from '../assets/arrow.svg'
import Navbar from '../components/Navbar/Navbar'
import usercontext from '../contexts/usercontext'
import Axios from './../utils/Axios'
const JourneyPage = () => {
    const navigate = useNavigate()
    const [seatCount, setSeatCount] = useState(1)
    const [rideDetails, setRideDetails] = useState({})
    const dateNow = new Date(rideDetails.date)
    const id = useParams()['id'];
    const [user] = useContext(usercontext)
    useEffect(() => {
        Axios.post("/ride/getride", {
            rideID: id,
        }).then((response) => {
            setRideDetails(response.data.ride)
        }).catch((e) => {
            console.log(e)
        })
    }, [])
    const handleRequest = (e) => {
        e.preventDefault()
        Axios.post("/ride/addrequest", {
            rideID: id,
            ownerID : rideDetails.userID,
            seats: seatCount ? seatCount: 1,
            name : user.name,
            source : rideDetails.source,
            destination : rideDetails.destination,
            date : rideDetails.date,
            startTime : rideDetails.startTime,
            endTime : rideDetails.endTime,
            price : (rideDetails.price * seatCount),
        },{
            headers:{
                'authorization' : `Bearer ${localStorage.getItem('accessToken')}`
            }
        }
        ).then((response) => {
            console.log(response)
            navigate("/user/myrequests")
            console.log("/user/requested")
        }).catch((e) => {
            console.log(e)
        })
    }
    return (
        <div>
            <Navbar />
            <div className='container mx-auto flex flex-col justify-center items-center  mt-10'>
                <div className='flex flex-col min-w-[600px]'>
                    <div className='flex justify-center items-center mb-4'>
                        <h1 className='text-5xl font-bold text-teal-800'>{new Date(rideDetails.date).toDateString()}</h1>
                    </div>
                    <div className='text-lg my-4'>
                        <div className='flex gap-20'>
                            <span>{rideDetails.startTime}</span>
                            <span>
                                <span className='h-2 w-2 bg-teal-900 inline-flex rounded-full mr-1'>
                                </span>{rideDetails.source}
                            </span>
                        </div>
                        <div className='flex gap-20'>
                            <span>
                                {rideDetails.endTime}
                            </span>
                            <span>
                                <span className='h-2 w-2 bg-teal-900 inline-flex rounded-full mr-1'>
                                </span>{rideDetails.destination}</span>
                        </div>
                    </div>
                    <div className='mt-2 flex h-1 bg-zinc-200 w-full'></div>
                    <div className='flex justify-between text-lg my-3'>
                        <p>
                            total cost for 1 seat
                        </p>
                        <p>
                            {` ₹ ${rideDetails.price}`}
                        </p>
                    </div>
                    <div className='mt-2 flex h-1 bg-zinc-200 w-full'></div>
                    <div className='mt-4'>
                        <div className='flex justify-between pb-2'>
                            <h1>{ "name" }</h1>
                            <img src={arrowSvg} alt="arrow svg" className='cursor-pointer' />
                        </div>
                        <div>
                            <h2 className='text-2xl'>
                                {rideDetails.car}
                            </h2>
                            <h3>
                                {rideDetails.color}
                            </h3>
                        </div>
                    </div>
                    <div className='mt-2 flex justify-between'>
                        <div className='flex justify-center items-center'>
                            <h2 className='font-semibold mr-2'>
                                No of Seats
                            </h2>
                            <div className='flex justify-center items-center'>
                                <button className='bg-teal-500 text-white font-bold text-xl px-1 rounded'
                                onClick={
                                    () => {
                                        if (seatCount < rideDetails.seats) setSeatCount(seatCount+1);
                                    }
                                }
                                >+</button>
                                <p className='px-2'>
                                {seatCount}
                                </p>
                                <button className='bg-teal-500 text-white text-2xl px-1 rounded'
                                onClick={
                                    () => {
                                        if (seatCount > 1) setSeatCount(seatCount-1);
                                    }
                                }
                                >-</button>
                            </div>
                            {/* <input type="text" ref= {seatCount} className="w-10 border-b-2 px-2 border-black  text-center outline-none ml-1" /> */}
                        </div>
                        <button
                            onClick={handleRequest}
                            className='bg-teal-500 text-white px-2 py-2 rounded-lg font-bold'>
                            Request
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default JourneyPage