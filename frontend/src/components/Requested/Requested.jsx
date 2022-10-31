import React from 'react'
import { useEffect } from 'react'
import Axios from './../../utils/Axios'
const Requested = () => {
  const [ rides, setRides ] = React.useState([])
  useEffect(() => {
    Axios.post("/ride/getriderequests",{}, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
      }
    }).then((response) => {
      setRides(response.data)
      
    })
      .catch((error) => {
        alert("error fetching data")
      })
  }, [])
  const handleDelete = (e)=>{
    Axios.post("/ride/deleterequest", { id: e.target.value }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
      }
    }
    ).then((response)=>{
      alert("Request deleted")
      setRides(rides.filter((ride)=>ride._id !== e.target.value))
    }).catch((error)=>{
      alert("Error deleting request")
    })

  }
const handleAccept = (e)=>{
 Axios.post("/ride/acceptrequest",{
    rideID : e.target.value
 }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
      }
 }).then((response)=>{
  alert("Request accepted")

 }).catch((error)=>{
    alert("error accepting request")
 })
}
  return (
    <div className='mt-5'>
      {
        rides.length ?
          rides.map((ride, index) => {
            return (
              <div className='rounded-md p-4 shadow-md mb-4 w-[500px]' key={index}>
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
                {
                  ride.status === true ?
                  <div> <span className='font-bold'> status :</span> <span className='text-green-500 font-bold'>Accepted</span></div> : 
                <div className='flex justify-end mt-1 gap-3'>
                    <button className='bg-red-600 text-sm text-white rounded font-bold px-1 py-1'
                    onClick={handleDelete}
                    value= {ride._id}
                    >Delete</button>
                    <button className='bg-green-600 text-sm text-white rounded font-bold px-1 py-1'
                    onClick={handleAccept}
                    value= {ride._id}
                    >Accept</button>
                </div>
                }
              </div>
            )
          }) : <div className='text-center text-lg'> No Requests </div>


      }
    </div>
  )
}

export default Requested