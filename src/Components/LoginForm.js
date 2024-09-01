import React, { useState } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { FcGoogle } from "react-icons/fc"
import { auth, provider, signInWithPopup } from '../Firebase'


const LoginForm = ({ setIsLoggedIn, redirectPath = "/Prediction" }) => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "", password: ""
    })
    const [showPassword, setShowPassword] = useState(false);

    function changeHandler(event) {

        setFormData((prevData) => (
            {
                ...prevData,
                [event.target.name]: event.target.value
            }
        ))
    }

    async function submitHandler(event) {
        event.preventDefault();
    
        const { email, password } = formData;
    
        try {
            const response = await fetch('http://localhost:8000/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
    
            const data = await response.json();
    
            if (response.ok) {
                setIsLoggedIn(true);
                toast.success(data.message);
                navigate(redirectPath);
            } else {
                toast.error(data.error);
            }
        } catch (error) {
            toast.error("Something went wrong");
        }
    }
    

    const handleGoogleSignIn = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            console.log("Google Sign-In successful:", user);
            setIsLoggedIn(true);
            toast.success("Logged In with Google");
            navigate(redirectPath);
        } catch (error) {
            console.error("Error during Google Sign-In:", error);
            toast.error("Google Sign-In failed");
        }
    };



    return (
        <form onSubmit={submitHandler}
            className="flex flex-col w-full gap-y-4 mt-6">
            <label className='w-full'>
                <p className='text-[0.875rem] text-5 mb-1 leading-[1.375rem]'>
                    Email Address<sup className='text-pink-200'>*</sup>
                </p>
                <input
                    required
                    type="email"
                    value={formData.email}
                    onChange={changeHandler}
                    placeholder="Enter email address"
                    name="email"
                    className='bg-800 rounded-[0.5rem] text-5 w-full p-[12px]'
                />
            </label>

            <label className='w-full relative'>
                <p className='text-[0.875rem] text-5 mb-1 leading-[1.375rem]'>
                    Password<sup className='text-pink-200'>*</sup>
                </p>
                <input
                    required
                    type={showPassword ? ("text") : ("password")}
                    value={formData.password}
                    onChange={changeHandler}
                    placeholder="Enter Password"
                    name="password"
                    className='bg-800 rounded-[0.5rem] text-5 w-full p-[12px]'
                />

                <span
                    className='absolute right-3 top-[38px] cursor-pointer'
                    onClick={() => setShowPassword((prev) => !prev)}>
                    {showPassword ?

                        (<AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF' />) :

                        (<AiOutlineEye fontSize={24} fill='#AFB2BF' />)}
                </span>

                <Link to="#">
                    <p className='text-xs mt-1 text-blue-100 max-w-max ml-auto'>
                        Forgot Password
                    </p>
                </Link>
            </label>

            <button

                className='bg-yellow-50 rounded-[8px] font-medium text-900 px-[12px] py-[8px] mt-6'>
                Sign In
            </button>

            <div className='flex w-full items-center mt-4 mb-0 gap-x-2'>
                <div className='w-full h-[1px] bg-800'></div>
                <p className='text-5 font-medium leading[1.375rem]'>
                    OR
                </p>
                <div className='w-full h-[1px] bg-800'></div>
            </div>

            <button
                type="button"
                onClick={handleGoogleSignIn}
                className='w-full flex justify-center items-center rounded-[8px] font-medium text-100
            border border-800 bg-800 px-[12px] py-[8px] gap-x-2 mt-4 '>
                <FcGoogle />
                <p>Sign Up with Google</p>
            </button>

        </form>
    )
}

export default LoginForm