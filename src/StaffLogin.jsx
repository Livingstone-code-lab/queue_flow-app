import { User } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function StaffLogin({institutionName, setIsStaffLoggedIn, staffPassword, setStaffPassword, staffEmail, setStaffEmail, savedStaffData}) {

  const [loginError , setLoginError] = useState({
        email: "",
        password: ""
    });


    useEffect(() => {
        setTimeout(() => {
          setLoginError({
             email: "",
             password: ""
          })
        }, 2500);
    }, [loginError]);


    const navigates = useNavigate();


    let newLoginError = {
        email: "",
        password: ""
    };


    function errorCheck() {

        if (savedStaffData === null) {
           newLoginError.password = "No account found. Please create an account.";
           return newLoginError;
        };
        
    
           if (!staffEmail) {
               newLoginError.email = "Please enter your email address";
           } else if (!staffEmail.includes("@") || savedStaffData?.email !== staffEmail) {
               newLoginError.email = "Please enter a valid email address!";
           } 
        
        
            if (!staffPassword) {
               newLoginError.password = "Please enter your password";
            } else if (staffPassword.length < 8) {
               newLoginError.password = "Password must be at least 8 characters long";
            } else if (savedStaffData.password !== staffPassword) {
               newLoginError.password = "Please enter a valid password!";
            }
        


        return newLoginError;
    } 


     
    return (
         <div className="flex flex-col w-100 h-auto bg-white p-6 border border-gray-100 rounded-lg shadow-md gap-6">
            <div className="flex gap-3">
                <span className="flex justify-center items-center w-6 outline outline-1 outline-gray-100 rounded-[10px] bg-white py-1 px-5" onClick={() => navigates("/institution")}>&lt;</span>
                <div className="flex gap-2">
                  <User className="w-7 h-7 text-white outline outline-1 outline-indigo-700 rounded-[10px] bg-indigo-700 p-1" />
                  <h3 className="flex font-bold text-xl text-black">QueueFlow</h3>
                </div>
            </div>

            <div className="flex flex-col">
                <h6 className="flex text-sm text-black font-bold">Staff Sign In</h6>
                <div className="flex gap-1">
                    <p className="text-xs">{institutionName}</p>
                    <p className="text-xs">.</p>
                    <p className="text-xs">Staff Portal</p>
                </div>
            </div>
            
            <form onSubmit={(e) => {
                e.preventDefault(); 
                const result = errorCheck(); 
                setLoginError(result); 
                if (savedStaffData === null || !staffPassword || !staffEmail || !staffEmail.includes("@") || staffPassword.length < 8 || savedStaffData.email !== staffEmail || savedStaffData.password !== staffPassword) return; 
                if (savedStaffData !== null) {
                  savedStaffData.email === staffEmail && savedStaffData.password === staffPassword && navigates("/dashboard");
                } 
                setIsStaffLoggedIn(true);}} 
                className="flex flex-col gap-2">

                <div className="flex flex-col gap-1">
                   <label className="flex text-black text-xs font-normal">Email</label>
                   <input type="email" value={staffEmail} onChange={(e) => setStaffEmail(e.target.value.trim())} className="w-full outline outline-1 outline-gray-200 rounded-lg placeholder:text-[12px] px-3 pb-1 focus:outline-indigo-600 focus:outline-2" placeholder="Enter your email" />
                   {loginError.email && <p className="text-xs text-red-500">{loginError?.email}</p>}
                </div>

                <div className="flex flex-col gap-1">
                    <label className="flex text-black text-xs font-normal">Password</label>
                    <input type="password" value={staffPassword} onChange={(e) => setStaffPassword(e.target.value.trim())} className="w-full outline outline-1 outline-gray-200 rounded-lg placeholder:text-2xl placeholder:font-bold px-3 pb-1 focus:outline-indigo-600 focus:outline-2" placeholder="........" />
                    {loginError.password && <p className="text-xs text-red-500">{loginError.password}</p>}
                </div>

                <div className="flex justify-between">
                   <Link to="/forgetpassword" className="text-xs text-indigo-600 hover:text-indigo-900">Forgot Password?</Link>
                   <Link to="/createaccount" className="text-xs hover:text-indigo-700">Create Account</Link>
                </div>

                <button type="submit" className="w-full bg-indigo-700 text-white px-6 py-2 rounded-md hover:bg-indigo-800 transition-colors duration-200 mt-3 text-xs font-medium">Sign In</button>
            </form>
         </div>     
    );
}