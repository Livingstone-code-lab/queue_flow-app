import { useNavigate, Link } from "react-router-dom";
import { Mail, User } from "lucide-react";
import { useState, useEffect } from "react";

export default function ForgetPassword({account, savedStaffData, setSavedStaffData}) {

    const [resetInput, setResetInput] = useState("");

    const [resetPassword, setResetPassword] = useState("");

    const [ResetConfirmPassword, setResetConfirmPassword] = useState("");

    const [isResetSent, setIsResetSent] = useState(false);

    const [message1, setMessage1] = useState("");

   const [message2, setMessage2] = useState("");

    const [resetError, setResetError] = useState({
       email: "",
       password: "",
       confirmPassword: ""
    });


    useEffect(() => {
         setTimeout(() => {
           setResetError({
              email: "",
              password: "",
              confirmPassword: ""
           }) 
         }, 2500)
    }, [resetError]);


    useEffect(() => {
       if (isResetSent === true) {
          setIsResetSent(true);
            setMessage1("✓ Password reset successfully!");
            setMessage2("You can now sign in with your new password. ");

            setTimeout(() => {
               setIsResetSent(false);
                  setMessage1("");
                  setMessage2("");
            }, 2500)
       }
    }, [isResetSent]);
    

    const isNavigate = useNavigate();

    let style;

    if (resetInput !== "") {
      style = "oklch(45.7% 0.24 277.023)";
    }


    function isResetError() {
       
      const newResetError = {
         email: "",
         password: "",
         confirmPassword: ""
      };


      if (!resetInput) {
        newResetError.email = "Please enter your email address!";
      } else if (!resetInput.includes("@")) {
         newResetError.email = "Please enter a valid email address";
      }


      if (!resetPassword) {
         newResetError.password = "Please enter your password";
      } else if (resetPassword.length < 8) {
         newResetError.password = "Password must be at least 8 characters";
      }

      
        if (!ResetConfirmPassword) {
          newResetError.confirmPassword = "Please confirm your password";
        } else if (ResetConfirmPassword !== resetPassword) {
          newResetError.confirmPassword = "Password do not match! pls check again.";
        }

        return newResetError;
    }


    function clearResetInput() {
       setResetInput("");
       setResetPassword("");
       setResetConfirmPassword("");
    }

    

    return (
          <div className="flex flex-col w-100 h-auto bg-white p-6 border border-gray-100 rounded-lg shadow-md gap-6">
              {isResetSent === true && (
                <div className="w-full rounded-lg border border-green-200 bg-green-50 px-3 py-2 text-xs text-green-700">
                  <p className="font-semibold">{message1}</p>
                  <p className="mt-1 text-[10px] text-green-600">{message2}</p>
                </div>
              )}

             <div className="flex gap-2">
                <span className="w-6 outline outline-1 outline-gray-100 rounded-[10px] bg-white p-1" onClick={() => isNavigate("/stafflogin")}>&lt;</span>
                <User className="w-7 h-7 text-white outline outline-1 outline-indigo-700 rounded-[10px] bg-indigo-700 p-1" />
                <h3 className="flex font-bold text-xl text-black">QueueFlow</h3>
             </div>

                <Mail className="w-9 h-9 text-indigo-700 outline outline-1 outline-indigo-100 rounded-[10px] bg-indigo-100 px-2 py-2" />

                <div className="flex flex-col gap-1">
                    <h4 className="flex text-sm font-bold text-black">Forget Password?</h4>
                    <p  className="flex text-xs">Enter your work email and we will send you a reset Link.</p>
                </div>

                <form onSubmit={(e) => {
                    e.preventDefault();
                    const errors = isResetError();
                    setResetError(errors);
                    if(!resetInput || !resetPassword || !ResetConfirmPassword || ResetConfirmPassword !== resetPassword || !resetInput.includes("@") || resetPassword.length < 8) return;    
                     if (resetPassword === ResetConfirmPassword) {
                        account = { 
                          name: savedStaffData.name,
                          email: savedStaffData.email,
                          role: savedStaffData.role,
                          password: resetPassword
                        };
                     }
                    setSavedStaffData(account);
                    setIsResetSent(true);
                    clearResetInput();
                    }} className="flex flex-col gap-2">
                    <label className="flex text-black text-xs font-medium">Work Email</label>
                    <div>
                     <input value={resetInput} onChange={(e) => setResetInput(e.target.value)} pattern="[A-Za-z\s.,@!?'-]+" className="w-full outline outline-1 outline-gray-200 rounded-lg placeholder:text-[12px] focus:outline-indigo-600 focus:outline-2 px-3 pb-1" type="text" placeholder="you@gmail.com" />
                     {resetError.email && <p className="text-[10px] text-red-600 mt-1">{resetError.email}</p>}
                    </div>


                    {resetInput === savedStaffData.email 
                       && 
                      <div className="flex flex-col gap-2">
                         <div className="flex flex-col gap-1">
                            <label className="flex text-black text-xs font-medium">New Password</label>
                            <input value={resetPassword} onChange={(e) => setResetPassword(e.target.value)} pattern="[A-Za-z\s.,@&#!?'-]+" className="w-full outline outline-1 outline-gray-200 rounded-lg placeholder:text-[12px] focus:outline-indigo-600 focus:outline-2 px-3 pb-1" type="text" placeholder="Min. 8 characters" /> 
                            {resetError.password && <p className="text-[10px] text-red-600">{resetError.password}</p>}
                         </div>

                         <div className="flex flex-col gap-1">
                            <label className="flex text-black text-xs font-medium">Confirm Password</label>
                            <input value={ResetConfirmPassword} onChange={(e) => setResetConfirmPassword(e.target.value)} pattern="[A-Za-z\s.,@&#!?'-]+" className="w-full outline outline-1 outline-gray-200 rounded-lg placeholder:text-[12px] focus:outline-indigo-600 focus:outline-2 px-3 pb-1" type="text" placeholder="Re-enter your password" /> 
                            {resetError.confirmPassword && <p className="text-[10px] text-red-600">{resetError.confirmPassword}</p>}
                         </div>
                      </div>
                    }
                     
                    <button type="submit" style={{backgroundColor: style}} className="w-full bg-violet-200 text-white px-6 py-2 rounded-lg transition-colors duration-200 mt-3 text-xs font-bold">Send Reset Link</button>
                </form>
                <div className="flex justify-center items-center gap-1">
                    <p className="text-xs">Remember it?</p>
                    <p className="text-xs text-indigo-600 font-medium"><Link to="/stafflogin">Back to sign In</Link></p>
                </div>
          </div>
    );
}