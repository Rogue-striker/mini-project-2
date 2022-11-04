import React, { useContext, useEffect } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import UserContext from './../../contexts/usercontext'
import Axios from './../../utils/Axios'
import RequestDetails from './RequestDetails'
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
        toast.warn()
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
        toast.error("Not able to fetch the data", {
          autoClose : 1500,
          theme : "colored"
        })
       
      })
  }

  return (
    <div className='flex justify-center flex-col items-center mt-4'>
      <ToastContainer/>
      {
        requests.length ?
          requests.map((request, index) => {
            return (
              <RequestDetails handleDelete={handleDelete} key={index} request={request} />
            )
          })
          :
          <div className='text-center text-lg'>No Requests</div>
      }
    </div>
  )
}
export default MyRequests