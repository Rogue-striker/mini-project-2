import React from 'react'
import { useContext } from 'react'
import { useEffect } from 'react'
import Axios from './../../utils/Axios'
import UserContext from './../../contexts/usercontext'
import MyRides from '../MyRides/MyRides'
const MyRequests = () => {
  const [user] = useContext(UserContext)
  const [requests, setRequests] = React.useState([])
  useEffect(() => {
    Axios.post("/ride/getrequests", {}, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
      }
    })
      .then((response) => {
        setRequests(response.data)
      })
      .catch((error) => {
        alert(error.response.data)
      })

  }, [])
  const handleDelete = (e) => {
    Axios.post("/ride/deleterequest", { id: e.target.value }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
      }
    })
      .then((response) => {
        const newRequests = requests.filter((request) => request._id !== e.target.value)
        setRequests(newRequests)
      })
      .catch((error) => {
        alert(error.response.data)
      })
  }
  const getDetails = (e) => {
  Axios.post("/auth/getphonenumber", {
    ownerID: e.target.value
  }, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`
    }
  }).then((response) => {
   console.log(response.data)
    alert(
      `Contact Number : ${response.data.phonenumber}` 
    )
  }).catch((error) => {
    console.log(error)
  })
}

  return (
    <div className='flex justify-center flex-col items-center mt-4'>
      {
        requests.length ?
          requests.map((request, index) => {
            return (
              <div className='rounded-md p-4 shadow-md mb-4 w-[400px]' key={index}>
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
                    <button onClick={getDetails}
                    className = "bg-black px-1 rounded-md text-white"
                    value = {request.ownerID}
                    >
                       get details
                    </button>
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
              </div>
            )
          })
          :
          <div className='text-center text-lg'>No Requests</div>
      }
    </div>
  )
}
export default MyRequests