import { useEffect, useState } from "react"
import Axios from './../../utils/Axios'
const RequestDetails = ({ handleDelete, request }) => {
  console.log(request)
  const [userDetails, setUserDetails] = useState([])
  useEffect(() => {
    Axios.post("/auth/getDetails", {
      ownerID: request.ownerID
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
    <div className='rounded-md p-4 shadow-md mb-4 w-[400px]'>
      <div className='flex justify-between w-full'>
        <div className='flex flex-col justify-center'>
          <div className='flex gap-7'>
            <span>{request.startTime}</span>
            <span className='font-semibold'>
              <span className='h-3 w-3 border-2 border-blue-900 inline-flex rounded-full mr-1'>
              </span>{request.source}
            </span>
          </div>
          <div className='flex gap-7'>
            <span>
              {request.endTime}
            </span>
            <span className='font-semibold'>
              <span className='h-3 w-3 border-2 border-blue-900 inline-flex rounded-full mr-1'>
              </span>{request.destination}</span>
          </div>
          <div>
          </div>
        </div>
        <div className='flex flex-col justify-center font-bold  '>
          <h1>
            {` ₹${request.price}`}
          </h1>
          <h1>
            {`Seats: ${request.seats}`}
          </h1>

        </div>
      </div>
      <div className='flex justify-center items-center my-2 text-bold'>
        {request.status ?
          <div className='flex gap-5'>
            <p className='bg-green-400 text-white rounded-md px-1 py-1 font-bold'>
              Accepted
            </p>
          </div>
          :
          <p className=' bg-yellow-500 text-white rounded-md px-1 py-1 font-bold'>
            Pending
          </p>
        }
        <div>
          <button className='bg-red-500 text-white rounded-md px-1 py-1 font-bold ml-2'
            value={request._id}
            onClick={handleDelete}
          >
            Cancel
          </button>

        </div>

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
    </div>
  )
}

export default RequestDetails