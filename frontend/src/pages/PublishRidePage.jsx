import React, { useContext, useState } from 'react'
import Navbar from '../components/Navbar/Navbar'
import Axios from './../utils/Axios'
import UserContext from './../contexts/usercontext'
import { useNavigate } from 'react-router-dom'
const PublishRidePage = () => {
  const navigate = useNavigate()
  const [user] = useContext(UserContext)
  console.log(user)
  const tempDate = new Date();
  const todayDate = tempDate.getFullYear() + '-' + (tempDate.getMonth() + 1) + '-' + tempDate.getDate()
  const [rideDetails, setRideDetails] = useState({});
  const handleRideChanges = (e) => {
    setRideDetails({ ...rideDetails, [e.target.name]: e.target.value })
  }
  const handleRideSubmit = (e) => {
    e.preventDefault();
    console.log(
      {
        ...rideDetails,
        name: user.name,
      }
    )
    Axios.post("/ride/addride", {
      ...rideDetails,
      name: user.name,
    }, {
      headers: {
        'authorization': `Bearer ${localStorage.getItem('accessToken')}`
      }
    }).then((response) => {
      console.log("published ride")
      navigate("/user/myrides")

    }).catch((error) => {
      console.log(error)
    })

  }

  return (
    <div>
      <Navbar />
      <div className='w-[760px] mx-auto mt-4'>
        <h1 className='text-center text-4xl mt-10 w-full text-teal-500 font-bold mb-4'>
          Publish Ride
        </h1>
        <div className="grid grid-cols-2 gap-10">
          <div>
            <label
              htmlFor="source"
              className='font-bold mb-1'
            >
              From
            </label>
            <input
              className='w-full border border-teal-300 rounded-md outline-none p-2'
              type="text"
              placeholder='From'
              name="source"
              onChange={handleRideChanges}
              value={rideDetails.source}
            />
          </div>
          <div>
            <label
              htmlFor="destination"
              className='font-bold mb-1'
            >
              To
            </label>
            <input
              className='w-full border border-teal-300 rounded-md outline-none p-2'
              type="text"
              placeholder='To'
              name="destination"
              onChange={handleRideChanges}
              value={rideDetails.destination}
            />
          </div>
          <div>
            <label
              htmlFor="startTime"
              className='font-bold mb-1'
            >
              Start Time
            </label>
            <input
              className='w-full border border-teal-300 rounded-md outline-none p-2'
              type="text"
              placeholder='hh:mm'
              name="startTime"
              onChange={handleRideChanges}
              value={rideDetails.startTime}
            />
          </div>
          <div>
            <label
              htmlFor="endTime"
              className='font-bold mb-1'
            >
              End Time
            </label>
            <input
              className='w-full border border-teal-300 rounded-md outline-none p-2'
              type="text"
              placeholder='hh:mm'
              name="endTime"
              onChange={handleRideChanges}
              value={rideDetails.endTime}
            />
          </div>
          <div>
            <label
              htmlFor="price"
              className='font-bold mb-1'
            >
              Price
            </label>
            <input
              className='w-full border border-teal-300 rounded-md outline-none p-2'
              type="text"
              placeholder='Prices'
              name="price"
              onChange={handleRideChanges}
              value={rideDetails.price}
            />
          </div>
          <div>
            <label
              htmlFor="seats"
              className='font-bold mb-1'
            >
              Seats
            </label>
            <input
              className='w-full border border-teal-300 rounded-md outline-none p-2'
              type="text"
              placeholder='Seats'
              name="seats"
              onChange={handleRideChanges}
              value={rideDetails.seats}
            />
          </div>
          <div>
            <label
              htmlFor="car name"
              className='font-bold mb-1'
            >
              Car Model
            </label>
            <input
              className='w-full border border-teal-300 rounded-md outline-none p-2'
              type="text"
              placeholder='car name'
              name="car"
              onChange={handleRideChanges}
              value={rideDetails.car}
            />
          </div>
          <div>
            <label
              htmlFor="car color"
              className='font-bold mb-1'
            >
              Car Color
            </label>
            <input
              className='w-full border border-teal-300 rounded-md outline-none p-2'
              type="text"
              placeholder='car color'
              name="color"
              onChange={handleRideChanges}
              value={rideDetails.color}
            />
          </div>
          <div>
            <label
              htmlFor="date"
              className='font-bold mb-1'
            >
              Date</label>
            <input
              className='w-full border border-teal-300 rounded-md outline-none p-2'
              type="date"
              placeholder="yyyy-mm-dd"
              name='date'
              onChange={handleRideChanges}
              value={rideDetails.date}
              min={todayDate}
            />
          </div>
        </div>
        <div className='flex justify-center items-center mt-10'>
          <button
            className='text-white bg-teal-500 px-2 py-1 rounded font-bold'
            onClick={handleRideSubmit}
          >
            Publish
          </button>
        </div>
      </div>
    </div>
  )
}

export default PublishRidePage