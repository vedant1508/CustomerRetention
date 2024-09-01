import React, { useState } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { toast } from "react-hot-toast"
import { useNavigate } from 'react-router-dom';

const SignupForm = ({ setIsLoggedIn, redirectPath = "/login" }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    employeeId: "",
    password: "",
    confirmPassword: ""
  })

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [accountType, setAccountType] = useState("Employee");

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

    const { firstName, lastName, email, employeeId, password, confirmPassword } = formData;

    try {
        const response = await fetch('http://localhost:8000/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ firstName, lastName, email, employeeId, password, confirmPassword })
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


  const accountData = {
    ...formData
  };

  const finalData = {
    ...accountData,
    accountType
  }
  console.log("printing Final account data ");
  console.log(finalData);

  return (
    <div>
      {/*Employee tab */}
      <div
        className='flex bg-800 p-1 gap-x-1 my-6 rounded-full max-w-max'>

        {/* <button
        className={`${accountType === "Customer"
          ?
          "bg-900 text-5"
          : "bg-transparent text-200"} py-2 px-5 rounded-full transition-all duration-200`}
        onClick={() => setAccountType("Customer")}>
        Customer
      </button> */}

        <button
          className={`${accountType === "Employee"
            ?
            "bg-900 text-5"
            : "bg-transparent text-200"} py-2 px-5 rounded-full transition-all duration-200`}
          onClick={() => setAccountType("Employee")}>
          Employee
        </button>

      </div>

      <form onSubmit={submitHandler} >
        {/* first name and lastName */}
        <div className='flex flex-col md:flex-row gap-4 mt-[20px]'>
          <label className='w-full'>
            <p className='text-[0.875rem] text-5 mb-1 leading-[1.375rem]'>
              First Name<sup className='text-pink-200'>*</sup>
            </p>
            <input
              required
              type="text"
              name="firstName"
              onChange={changeHandler}
              placeholder="Enter First Name"
              value={formData.firstName}
              className='bg-800 rounded-[0.5rem] text-5 w-full p-[12px] '
            />
          </label>

          <label className='w-full'>
            <p className='text-[0.875rem] text-5 mb-1 leading-[1.375rem]'>Last Name<sup className='text-pink-200'>*</sup></p>
            <input
              required
              type="text"
              name="lastName"
              onChange={changeHandler}
              placeholder="Enter Last Name"
              value={formData.lastName}
              className='bg-800 rounded-[0.5rem] text-5 w-full p-[12px]'
            />
          </label>
        </div>
        {/* email Add */}
        <div className='mt-[20px]'>
          <label className='w-full mt-[20px]'>
            <p className='text-[0.875rem] text-5 mb-1 leading-[1.375rem]'>Email Address<sup className='text-pink-200'>*</sup></p>
            <input
              required
              type="email"
              name="email"
              onChange={changeHandler}
              placeholder="Enter Email Address "
              value={formData.email}
              className='bg-800 rounded-[0.5rem] text-5 w-full p-[12px]'
            />
          </label>
        </div>

        {/* Account Number */}
        <div className='mt-[20px]'>
          <label className='w-full mt-[20px]'>
            <p className='text-[0.875rem] text-5 mb-1 leading-[1.375rem]'>Employee Id <sup className='text-pink-200'>*</sup></p>
            <input
              required
              type="number"
              name="employeeId"
              onChange={changeHandler}
              placeholder="Enter employee Id "
              value={formData.employeeId}
              className='bg-800 rounded-[0.5rem] text-5 w-full p-[12px]'
              minLength={4}
              maxLength={4}
              style={{
                // Remove the number input spinner
                WebkitAppearance: 'none',
                MozAppearance: 'textfield',
              }}
            />
          </label>
        </div>

        {/* createPassword and Confirm Password */}
        <div className='w-full flex flex-col md:flex-row gap-4 mt-[20px] '>
          <label className='w-full relative'>
            <p className='text-[0.875rem] text-5 mb-1 leading-[1.375rem]'>Create Password<sup className='text-pink-200'>*</sup></p>
            <input
              required
              type={showPassword ? ("text") : ("password")}
              name="password"
              onChange={changeHandler}
              placeholder="Enter Password"
              value={formData.password}
              className='bg-800 rounded-[0.5rem] text-5 w-full p-[12px]'
            />
            <span
              className='absolute right-3 top-[38px] cursor-pointer'
              onClick={() => setShowPassword((prev) => !prev)}>
              {showPassword ?

                (<AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF' />) :

                (<AiOutlineEye fontSize={24} fill='#AFB2BF' />)}
            </span>
          </label>

          <label className='w-full relative'>
            <p className='text-[0.875rem] text-5 mb-1 leading-[1.375rem]'>Confirm Password<sup className='text-pink-200'>*</sup></p>
            <input
              required
              type={showConfirmPassword ? ("text") : ("password")}
              name="confirmPassword"
              onChange={changeHandler}
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              className='bg-800 rounded-[0.5rem] text-5 w-full p-[12px]'
            />
            <span
              className='absolute right-3 top-[38px] cursor-pointer'
              onClick={() => setShowConfirmPassword((prev) => !prev)}>
              {showConfirmPassword ?

                (<AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF' />) :

                (<AiOutlineEye fontSize={24} fill='#AFB2BF' />)}
            </span>
          </label>
        </div>
        <button className=' w-full bg-yellow-50 rounded-[8px] font-medium text-900 px-[12px] py-[8px] mt-6'>
          Create Account
        </button>
      </form>

    </div>
  )
}

export default SignupForm