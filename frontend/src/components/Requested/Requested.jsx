import React from 'react'
import { useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import Axios from './../../utils/Axios'
import RideRequest from './RideRequest'
const Requested = () => {
  const [rides, setRides] = React.useState([])
  useEffect(() => {
    Axios.post("/ride/getriderequests", {}, {
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
  const handleDelete = (e) => {
    Axios.post("/ride/deleterequest", { id: e.target.value }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
      }
    }
    ).then((response) => {
      alert("Request deleted")

      setRides(rides.filter((ride) => ride._id !== e.target.value))
    }).catch((error) => {
      alert("Error deleting request")
    })

  }
  const handleAccept = (e) => {
    Axios.post("/ride/acceptrequest", {
      rideID: e.target.value
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
      }
    }).then((response) => {
     toast.success("Request accepted")
      setRides(rides.map((item) => {
        if (item._id === e.target.value) {
          item.status = true;
        }
        return item
      }))
    }).catch((error) => {
      console.log(error)
      alert("error accepting request")
    })
  }
  return (
    <div className='mt-5'>
      <ToastContainer 
      autoClose={2000}
      theme="colored"
      />
      {
        rides.length ?
          rides.map((ride, index) => {
            return (<RideRequest ride={ride} key={index} handleAccept={handleAccept} handleDelete={handleDelete} />)
          }) : <div className='text-center text-lg'> No Requests </div>


      }
    </div>
  )
}

export default Requested