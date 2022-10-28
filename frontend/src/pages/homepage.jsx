import React, { useContext, useState } from 'react'
import JourneyList from '../components/journeylist/JourneyList'
import Navbar from '../components/Navbar/Navbar'
import SearchBar from '../components/searchBar/SearchBar'
import SearchContext from '../contexts/searchContext'
import UserContext from './../contexts/usercontext'
import Axios from './../utils/Axios'
const homepage = () => {
    const searchState = useState({
        source:"",
        destination:"",
        date:"",
        seats:""
    })
    const [user] = useContext(UserContext)
    const [searchValues, setSearchValues]  = searchState
    const [rides, setRides] = useState([])
    const handleSearchSubmit = (e)=>{
        e.preventDefault();
        Axios.post("/ride/search",{
            source:searchValues.source,
            destination:searchValues.destination,
            date:searchValues.date,
            seats:searchValues.seats
        }).then((response)=>{
            console.log(response.data)
            const Filterdrides = response.data.rides.filter((ride)=>ride.userID != user._id)
            setRides(Filterdrides)
        }).catch((error)=>{
            console.log(error)
        })
    }

    return (
        <SearchContext.Provider value={searchState}>
        <div className='flex flex-col'>
            <Navbar />
            <div className='flex items-center justify-center mt-10'>
                <SearchBar handleSearchSubmit= {handleSearchSubmit}/>
            </div>
            <JourneyList  rides = {rides}/>
         
        </div>
        </SearchContext.Provider>
    )
}

export default homepage