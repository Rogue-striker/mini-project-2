import { Outlet } from 'react-router-dom'

const AuthPage = () => {
  return (
    <div className='h-screen w-screen flex justify-center items-center'>
      <Outlet />
    </div>
  )
}
export default AuthPage;