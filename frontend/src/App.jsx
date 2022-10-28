import React from 'react'
import { useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import LoginCard from './components/LoginCard/LoginCard'
import MyRequests from './components/MyRequests/MyRequests'
import MyRides from './components/MyRides/MyRides'
import RegisterCard from './components/Register/RegisterCard'
import UserContext from './contexts/usercontext'
import AuthPage from './pages/AuthPage'
import HomePage from './pages/homepage'
import JourneyPage from './pages/JourneyPage'
import LandingPage from './pages/LandingPage'
import PublishRidePage from './pages/PublishRidePage'
import Userpage from './pages/userpage'
import Requested from './components/Requested/Requested'
const App = () => {
  const userState = React.useState(null)
  const [user, setUser] = userState;
  useEffect(() => {
    if (localStorage.getItem('user')) {
      setUser(JSON.parse(localStorage.getItem('user')))
    }
  }, [])
  return (
    <UserContext.Provider value={userState}>
      <Router>
        <Routes>
          {
            user ?
              <>
                <Route path='/' element={<HomePage />} />
                <Route path='/journey/:id' element={<JourneyPage />} />
                <Route path="/user" element={< Userpage />} >
                  <Route path="myrides" element={< MyRides />}></Route>
                  <Route path="myrequests" element={<MyRequests />}></Route>
                  <Route path="requested" element={<Requested />}></Route>
                </Route>
                <Route path="/publishride" element={<PublishRidePage />} />
              </> : ""
          }
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth" element={<AuthPage />}>
            <Route path="login" element={<LoginCard />}></Route>
            <Route path="register" element={<RegisterCard />}></Route>
          </Route>

        </Routes>
      </Router>
    </UserContext.Provider>
  )
}

export default App