import React from 'react'
import Template from '../Components/Template'
import loginImg from "../assets/1.png"

const Login = ({setIsLoggedIn}) => {
  return (
    <Template
      title2="Welcome Back"
      desc1="Strengthen relationships and faster customer loyalty for long-term success."
      // desc2="Empowering your business with tools to enhance customer engagement and retention."
      image={loginImg}
      formType="login"
      setIsLoggedIn={setIsLoggedIn}
    />
  )
}

export default Login