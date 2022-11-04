import { useEffect, useState } from "react"
import Axios from './../../utils/Axios'
const RideRequest = ({ ride, handleDelete, handleAccept }) => {
  const [userDetails, setUserDetails] = useState([])
  console.log(ride)
  useEffect(() => {
    Axios.post("/auth/getDetails", {
      ownerID: ride.RequestID
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
      }
    }).then((response) => {
      setUserDetails(response.data)
    }).catch((error) => {
      console.log(error)
    })
  }, [])
  return (
    <div className='rounded-md p-4 shadow-md mb-4 w-[500px]'>
      <div className="text-center font-bold">
        {new Date(ride.date).toDateString()}
      </div>
      <div className='flex  justify-between w-full'>
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
      <div>

      </div>
      {
        userDetails && 
          <div className="my-1">
            <h6 className="text-md font-bold">
              Contact Details
            </h6>
            <div className="grid grid-cols-2 w-full content-center">
              <div className="flex flex-col">
                <span className="font-bold text-sm">Name</span>
                <h6>{userDetails.name}</h6>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-sm">Phone Number</span >
                <h6>{userDetails.phonenumber}</h6>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-sm">Email</span >
                <h6>{userDetails.email}</h6>
              </div>
            </div>
          </div>
      }
      {
        ride.status === true ?
          <div> <span className='font-bold'> status :</span> <span className='text-green-500 font-bold'>Accepted</span></div> :
          <div className='flex justify-end mt-1 gap-3'>
            <button className='bg-red-600 text-sm text-white rounded font-bold px-1 py-1'
              onClick={handleDelete}
              value={ride._id}
            >Delete</button>
            <button className='bg-green-600 text-sm text-white rounded font-bold px-1 py-1'
              onClick={handleAccept}
              value={ride._id}
            >Accept</button>
          </div>
      }


    </div>)
}

export default RideRequest