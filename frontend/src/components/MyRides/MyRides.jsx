import React from 'react'
import { useEffect, useContext } from 'react'
import Axios from './../../utils/Axios'
import UserContext from './../../contexts/usercontext'
const MyRides = () => {
  const [rides, setRides] = React.useState([])
  const [user] = useContext(UserContext)
  useEffect(() => {
    Axios.post("/ride/getrides", {},{
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
      }
    }).then((response) => {
      console.log(response.data)
      console.log(user._id)
      setRides(response.data)
    })
      .catch((error) => {
        console.log(error)
      })
  }, [])
  const handleDelete = (e)=>{
    e.preventDefault()
    console.log(e.target.value)
    Axios.post("/ride/deleteride", {
      rideID : e.target.value
    },{
      headers: {
        authorization: `Bearer ${localStorage.getItem('accessToken')}`
      }
    }).then((response)=>{
      console.log(response)
      const newRides = rides.filter((ride)=>ride._id != e.target.value)
      setRides(newRides)
    }).catch((error)=>{
      console.log(error)
    })
  }
  return (
    <div className='mt-5'>
      {
        rides?.length ?
          rides.map((ride, index) => {
            return (
              <div className='rounded-md p-4 shadow-md mb-4 w-[500px]'>
                <div className='flex justify-between w-full'>
                  <div className='flex flex-col justify-center'>
                    <div className='flex gap-7 font-semibold'>
                      <span>{ride.startTime}</span>
                      <span className='font-semibold'>
                        <span className='h-3 w-3 border-2 border-blue-900 inline-flex rounded-full mr-1'>
                        </span>{ride.source}
                      </span>
                    </div>
                    <div className='flex gap-7 font-semibold '>
                      <span>
                        {ride.endTime}
                      </span>
                      <span className='font-semibold'>
                        <span className='h-3 w-3 border-2 border-blue-900 inline-flex rounded-full mr-1'>
                        </span>{ride.destination}</span>
                    </div>
                    <div>
                    </div>
                  </div>
                  <div className='flex flex-col justify-center font-bold  '>
                    <h1>
                      {` ₹${ride.price}`}
                    </h1>
                    <h1>
                      {`Seats: ${ride.seats}`}
                    </h1>
                  </div>
                </div>
                <div>
                </div>
                <div className='flex justify-end mt-1'>
                    <button className='bg-red-600 text-sm text-white rounded font-bold px-1 py-1'
                    onClick={handleDelete}
                    value= {ride._id}
                    >Delete</button>
                  </div>
              </div>
            )
          }) : <div className='text-center text-lg'> No Rides </div>


      }
    </div>
  )
}

export default MyRides