import { Route, Routes } from "react-router-dom"
import "./App.css"
import Navbar from "./Components/Navbar"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Dashboard from "./pages/Dashboard"
import Contact from "./pages/Contact"
import Prediction from "./pages/Prediction"
import {useState } from 'react'
import PrivateRoute from "./Components/PrivateRoute";
import CustomerProfileDashboard from "./Components/CustomerProfileDashboard"


function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [redirectPath, setRedirectPath] = useState("/dashboard");

  return (
    <div className="w-screen min-h-screen bg-customBlue flex flex-col">
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}>

        <button onClick={() => setRedirectPath("/dashboard")}>
          <a href="/login">Dashboard</a>
        </button>
        <button onClick={() => setRedirectPath("/prediction")}>
          <a href="/login">Prediction</a>
        </button>
      </Navbar>

      <Routes>

        <Route path="/" element={<Home isLoggedIn={isLoggedIn} redirectPath={redirectPath} />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/signup" element={<Signup setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/CustomerProfileDashboard" element={<CustomerProfileDashboard />} />
        <Route path="/dashboard" element={
          <PrivateRoute isLoggedIn={isLoggedIn}>
            <Dashboard />
          </PrivateRoute>

        } />
        <Route path="/prediction" element={
          <PrivateRoute isLoggedIn={isLoggedIn}>
            <Prediction />
          </PrivateRoute>

        } />

      </Routes>


      
    </div>
  )
}

export default App;