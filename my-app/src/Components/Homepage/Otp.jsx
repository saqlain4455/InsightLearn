import React from 'react';
import Button from './Button';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../../Slice/user';
import { Auth } from '../../services/apis';
import { connectionApi } from '../../services/apiconnector';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Otp = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log(user)
  function handleInput(e) {
    const { name, value } = e.target;
    dispatch(setUser({ [name]: value }));
  }

  async function handleSubmit() {
    console.log("clicked")
    if (!user.otp) {
      toast.error("Please enter your OTP");
      return;
    }

    try {
      const data = await connectionApi(
        Auth.SIGN_UP,
        "POST",
        {},
        {},
        {
          firstName: user.firstName,
          lastName: user.lastName,
          password: user.password,
          confirmPassword: user.confirmPassword,
          email: user.email,
          accountType: user.accountType,
          otp:user.otp
        }
      );
      console.log(data)
      if (data) {
        toast.success("OTP verification successful!");
        navigate("/login");
      } else {
        toast.error("OTP verification failed");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
      console.log(error)
    }
  }

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <div className="w-11/12 max-w-md bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl shadow-lg flex flex-col gap-6 text-white">
        <h1 className="text-2xl font-bold text-center">Verify Your OTP</h1>

        <input
          type="text"
          name="otp"
          placeholder="Enter OTP"
          onChange={handleInput}
          className="px-4 py-2 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-yellow-500"
        />
        <div onClick={handleSubmit}>
        <Button active={true} >
          Verify & Continue
        </Button>
        </div>
      </div>
    </div>
  );
};

export default Otp;
