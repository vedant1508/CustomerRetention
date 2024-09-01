import React from 'react'
import signupImg from "../assets/2.png"
import Template from '../Components/Template'

const Signup = ({setIsLoggedIn}) => {
  return (
    <Template
      title1="Join the millions mastering customer retention strategies with Retainify for free"
      desc1="Develop critical skills to retain customers today, tomorrow, and beyond."
      // desc2="Equip yourself with the knowledge to secure long-term customer loyalty"
      image={signupImg}
      formType="signup"
      setIsLoggedIn={setIsLoggedIn}
    />
  )
}

export default Signup