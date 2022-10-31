import { useContext, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import Axios from './../../utils/Axios.js';
import UserContext from "../../contexts/usercontext.js";
const LoginCard = () => {
    const [user, setUser] = useContext(UserContext);
    const Nav = useNavigate()
    const [loginDetails, setLoginDetails] = useState({
        email: '',
        password: '',
    });
    const handleLoginDetails = (e) => {
        setLoginDetails({
            ...loginDetails,
            [e.target.name]: e.target.value,
        });
    };
    const handleLogin = (e) => {
        e.preventDefault();
        Axios.post(
            "/auth/login",
            {
                email: loginDetails.email,
                password: loginDetails.password
            }
        ).then((response) => {
            const { success, accessToken, user } = response.data
            localStorage.setItem('accessToken', accessToken)
            setLoginDetails({
                email: '',
                password: '',
            })
            setUser(user)
            localStorage.setItem('user', JSON.stringify(user))
            Nav("/")
        }).catch((error) => {
            alert(error.response.data.error)
        })

    }
    return (
        <div className='max-w-96 shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px]  px-8 py-4 rounded-lg' >
            <Link to='/' className="flex justify-center items-center">
            <h1
              className=' flex justify-center items-center text-3xl font-bold font-["Nunito"] 
            rounded-lg shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] w-fit'>
              <span className='bg-teal-500 text-white px-1 rounded-l-lg'>
                Car
              </span>
              <span className='px-1'>
                Pool
              </span>
            </h1>
            </Link>
            <form className='mt-6'>
                <div className='flex flex-col'>
                    <label
                        htmlFor="email"
                        className='font-["Nunito"] font-bold text-md'
                    >Email</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        className='border border-teal-500 rounded-md outline-none p-3 mt-2'
                        value={loginDetails.email}
                        onChange={handleLoginDetails} />
                </div>
                <div className='flex flex-col mt-4'>
                    <label
                        htmlFor="password"
                        className='font-["Nunito"] font-bold text-md'
                    >Password</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        className='border border-teal-500 outline-none rounded-md p-3 mt-2'
                        value={loginDetails.password}
                        onChange={handleLoginDetails} />
                </div>
                <div className='flex justify-center items-center'>
                    <button
                        className='bg-teal-500 text-white font-bold font-["Nunito"] mt-4 px-3 py-2 rounded-md'
                        onClick={handleLogin}
                    >Log in</button>
                </div>
                <div className='flex justify-center items-center mt-4'>
                    <p className='font-["Nunito"] font-bold'>
                        Not a member yet?
                        <Link
                            to="/auth/register"
                            className='text-[#484b56] ml-1'
                        >Sign up
                        </Link>
                    </p>
                </div>
            </form>
        </div>
    )
}

export default LoginCard