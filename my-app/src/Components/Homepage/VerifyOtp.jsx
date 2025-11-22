import { useSelector } from 'react-redux';
import Button from './Button.jsx';
import { connectionApi } from '../../services/apiconnector.js';
import { Auth } from '../../services/apis.js';

const VerifyOtp = () => {
  const { user } = useSelector((state) => state.user);
  console.log(user.email)
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
      console.log("Error while verification of email", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-slate-800/70 backdrop-blur-md rounded-2xl shadow-xl border border-slate-700 p-8 text-center">
        <h1 className="text-3xl font-bold text-white mb-6">
          Verify Your Email
        </h1>
        <p className="text-slate-300 mb-6">
          We have sent an OTP to your email: 
          <span className="text-sky-400 font-semibold ml-1">{user.email}</span>
        </p>

        <div onClick={clicked} className="cursor-pointer">
          <Button active={true} linkto="/otp">
            Proceed to OTP Verification
          </Button>
        </div>

        <p className="mt-6 text-sm text-slate-400">
          Didn't receive the email? Check your spam folder or try again.
        </p>
      </div>
    </div>
  );
};

export default VerifyOtp;
