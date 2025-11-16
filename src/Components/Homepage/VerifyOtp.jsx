import  { useEffect } from 'react'
import { useSelector } from 'react-redux'
import Button from './Button.jsx'
import { connectionApi } from '../../services/apiconnector.js'
import { Auth } from '../../services/apis.js'
const VerifyOtp = () => {
    const {user}=useSelector((state)=>state.user)

   const clicked = async () => {
  try {
    const getOtp = await connectionApi(
      Auth.GENERATE_OTP,
      "POST",
      null,
      null,
      { email: user.email }   
    );
    console.log(getOtp);
  } catch (error) {
    console.log("error while verification of email");
    console.log(error);
  }
};


    useEffect(()=>{
        clicked()
    },[])
  return (
    <div className='w-full   flex flex-col justify-center  '>
    <div className='w-11/12 mx-auto max-w-[1020px] flex flex-col  font-bold text-white  h-[500px] items-center justify-center gap-5 text-xl'>
      <h1 className='text-2xl'>Verify Your Email Here <span className='text-sky-300'>{user.email}</span> </h1>
      <div onClick={clicked}>
        <Button  active={true} linkto={"/otp"}  >
            Next
        </Button>
        </div>
    </div>
    </div>
  )
}

export default VerifyOtp
