import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route,Routes } from 'react-router-dom'
import Home from './Pages/Home.jsx'
import NavBar from './Components/Common/NavBar.jsx'
import Login from './Components/Homepage/Login.jsx'
import Info from './Components/Homepage/Info.jsx'
import VerifyOtp from './Components/Homepage/VerifyOtp.jsx'
import Otp from './Components/Homepage/otp.jsx'
import CreateCourse from './Components/Homepage/CreateCourse.jsx'
import Section from './Components/Homepage/Section.jsx'
import Section2 from './Components/Homepage/Section2.jsx'
import CourseComponent from './Components/Homepage/CourseComponent.jsx'
import Coursedetails from './Components/Homepage/Coursedetails.jsx'
import DashBoard from './Components/Homepage/DashBoard.jsx'
import { Toaster } from 'react-hot-toast'
import DashboardCourse from './Components/Homepage/DashboardCourse.jsx'
import ReviewPage from './Components/Homepage/ReviewPage.jsx'
import ContactForm from './Components/Homepage/Contact.jsx'
import Cart from './Components/Homepage/Cart.jsx'
function App() {
  

  return (
    <div className='flex flex-col w-screen min-h-screen font-inter bg-slate-950'>
      <Toaster />
      <NavBar />
      <Routes className="w-full ">
        <Route path='/' element={ <Home />} />
        <Route path="/Login" element={<Login />}/>
        <Route path='/signup' element={<Info />} />
        <Route  path='verifyotp' element={<VerifyOtp />}/>
        <Route path='/otp' element= {<Otp />} />
        <Route path='/coursecreate' element={<CreateCourse />}/>
       <Route path='/section'  element={<Section />} />
      <Route path='/subsection/:id' element={<Section2 />} />
      <Route path='/courseDetails' element={<CourseComponent />} />
      <Route path='/Details' element={<Coursedetails />} />
      <Route path='/dashboard' element={<DashBoard />} />
      <Route path="/fullcourse" element={<DashboardCourse />} />
      <Route path='/review'    element={<ReviewPage />} />
      <Route  path="/contact" element={<ContactForm />}/>
      <Route path='/cart' element={<Cart />} />
      </Routes>
    </div>
  )
}

export default App
