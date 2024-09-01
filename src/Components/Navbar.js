import React from 'react'
import logo from "../assets/10 copy (1).png"
import {Link} from "react-router-dom"
import {toast} from "react-hot-toast"


const Navbar = (props) => {
    let isLoggedIn = props.isLoggedIn;
    let setIsLoggedIn = props.setIsLoggedIn;

  return (
    <div className='flex flex-col md:flex-row bg-800 gap-8 justify-between items-center w-full p-0'>

        <Link to="/" className='md:ml-48'> 
            <img src={logo} alt="Logo" width={160} height={100} loading="lazy" />
        </Link>

        <nav>
            <ul className='text-gray-100  flex gap-x-6  text-xl '>
                <li>
                    <Link to="/">Home </Link>
                </li>
                {/* <li>
                    <Link to="/about">About</Link>
                </li> */}
                <li>
                    <Link to="/contact">Contact us</Link>
                </li>
                <li>
                    <Link to="/Dashboard">Dashboard</Link>
                </li>
                <li>
                    <Link to="/Prediction">Prediction</Link>
                </li>
            </ul>
        </nav>

        {/* Login - SignUp - LogOut - Dashboard */}
        <div className='flex items-center gap-x-10 md:mr-24'>
            { !isLoggedIn &&
                <Link to="/login">
                    <button className='bg-800 text-100 py-[8px] 
                    px-[12px] rounded-[8px] border border-700'>
                        Log in
                    </button>
                </Link>
            }
            { !isLoggedIn &&
                <Link to="/signup">
                    <button  className='bg-800 text-100 py-[8px] 
                    px-[12px] rounded-[8px] border border-700'>
                        Sign up
                    </button>
                </Link>
            }
            { isLoggedIn &&
                <Link to="/">
                    <button onClick={() => {
                        setIsLoggedIn(false);
                        toast.error("Logged Out");
                    }}
                    className='bg-800 text-100 py-[8px] 
                    px-[12px] rounded-[8px] border border-700'>
                        Log Out
                    </button>
                </Link>
            }
            
        </div>
      
    </div>
  )
}

export default Navbar