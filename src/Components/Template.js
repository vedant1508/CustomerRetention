import React from 'react'
import SignupForm from './SignupForm'
import LoginForm from './LoginForm'




const Template = ({title1, title2, desc1, desc2, image, formType, setIsLoggedIn, redirectPath="/"}) => {

  return (
    <div className='flex flex-wrap lg:justify-between justify-center w-11/12 max-w-[1160px] py-12 mx-auto gap-12'>

        <div className='w-11/12 max-w-[450px] lg:order-1 order-2 tracking-wide'>
            <h1
            className='text-5 font-bold text-[1.875rem] leading-[2.375rem]' 
            >
                {title1}
            </h1>

            <h1
            className='text-5 font-bold text-4xl tracking-wider leading-[2.375rem]' 
            >
                {title2}
            </h1>

            <p className='text-[1.125rem] leading[1.625rem] mt-4' >
                <span className='text-5'>{desc1}</span>
                <br/>
                <span className='text-5 italic'>{desc2}</span>
            </p>

            {formType === "signup" ? 
            (<SignupForm setIsLoggedIn={setIsLoggedIn}/>):
            (<LoginForm setIsLoggedIn={setIsLoggedIn}/>)}

            {/* <div className='flex w-full items-center my-4 gap-x-2'>
                <div className='w-full h-[1px] bg-800'></div>
                <p className='text-5 font-medium leading[1.375rem]'>
                    OR
                </p>
                <div className='w-full h-[1px] bg-800'></div>
            </div> */}


        </div>

        <div className='relative w-11/12 max-w-[500px] lg:order-1'>
            {/* <img src={frameImage}
                alt="Pattern"
                width={558}
                height={504}
                loading="lazy"
                className='absolute inset-0'
                /> */}

            <img src={image}
                alt="Students"
                width={558}
                height={700}
                loading="lazy"
                className='absolute w-490px h-471px top-12 right-0'
                />    
        </div>

    </div>
  )
}

export default Template