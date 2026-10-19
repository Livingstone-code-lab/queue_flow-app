import { useNavigate, Link } from 'react-router-dom';
import { Users } from 'lucide-react';
import { useState, useEffect } from 'react';


export default function CreateAccount({createName, setCreateName, createEmail, setCreateEmail, createRole, setCreateRole, createPass, setCreatePass, createConfirmPass, setCreateConfirmPass, setSavedStaffData, account}) {

   const [isLoginCreated, setIsLoginCreated] = useState(false);

   const [message1, setMessage1] = useState("");

   const [message2, setMessage2] = useState("");

   const [createError, setCreateError] = useState({
      name: "",
      email: "",
      role: "",
      password: "",
      confirmPassword: ""
   });


   useEffect(() => {
      setTimeout(() => {
         setCreateError({
           name: "",
           email: "",
           role: "",
           password: "",
           confirmPassword: "" 
         })
      }, 2500)
   }, [createError]);


   useEffect(() => {
       if (isLoginCreated === true) {
         setIsLoginCreated(true);
          setMessage1("✓ Account created successfully!");
          setMessage2("You can now sign in with your email and password.");

          setTimeout(() => {
            setIsLoginCreated(false);
             setMessage1("");
             setMessage2("");
          }, 4000)
       }
   }, [isLoginCreated]);


   const navigating = useNavigate();


   function validateAccount() {
      const newCreateError = {
         name: "",
         email: "",
         role: "",
         password: "",
         confirmPassword: ""
      };


      if (!createName) {
         newCreateError.name = "Please enter your full name";
      } else if (createName.length < 2) {
         newCreateError.name = "Name must be at least 2 characters";
      }


      if (!createEmail) {
         newCreateError.email = "Please enter your email address";
      } else if (!createEmail.includes("@")) {
         newCreateError.email = "Please enter a valid email address";
      }


      if (!createRole) {
          newCreateError.role = "Please select a role";
      }  


      if (!createPass) {
          newCreateError.password = "Please enter a password";
      } else if (createPass.length < 8) {
         newCreateError.password = "Password must be at least 8 characters";
      }


      if (!createConfirmPass) {
         newCreateError.confirmPassword = "Please confirm your password";
      } else if (createConfirmPass !== createPass) {
         newCreateError.confirmPassword = "Passwords do not match";
      }


      return newCreateError;
   }


   function clearInputs() {
      setCreateName("");
      setCreateEmail("");
      setCreatePass("");
      setCreateConfirmPass("");
   }



    return (
         <div className="flex flex-col w-100 h-auto bg-white p-6 border border-gray-100 rounded-lg shadow-md gap-6">
            {isLoginCreated === true 
               && 
                <div className="w-full rounded-lg border border-green-200 bg-green-50 px-3 py-2 text-xs text-green-700">
                   <p className="font-semibold">{message1}</p>
                   <p className="mt-1 text-[10px] text-green-600">{message2}</p>
                </div>
            }

            <div className="flex gap-2">
                <span className="w-6 outline outline-1 outline-gray-100 rounded-[10px] bg-white p-1" onClick={() => navigating(-1)}>&lt;</span>
                <Users className="w-7 h-7 text-white outline outline-1 outline-indigo-700 rounded-[10px] bg-indigo-700 p-1" />
                <h3 className="flex font-bold text-xl text-black">QueueFlow</h3>
            </div>

            <form className="flex flex-col gap-2" onSubmit={(e) => {
                e.preventDefault();
                const validate = validateAccount(); setCreateError(validate); 
                if (!createName || createName.length < 2 || !createEmail || !createEmail.includes("@") || !createRole || !createPass || createPass.length < 8 || !createConfirmPass || createConfirmPass !== createPass) return;
                    account = {
                    name: createName,
                    email: createEmail,
                    role: createRole,
                    password: createPass
                 };
                 setSavedStaffData(account);
                 setIsLoginCreated(true);
                 clearInputs();
                  }}>

                <div className="flex flex-col gap-1">
                   <label className="flex text-black text-xs font-normal">Full name</label>
                   <input pattern="[A-Za-z\s" value={createName} onChange={(e) => setCreateName(e.target.value)} className="w-full outline outline-1 outline-gray-200 rounded-[8px] focus:outline-indigo-600 focus:outline-2 placeholder:text-[12px] px-3 pb-1" type="text" placeholder="Enter your name" />
                   {createError.name && <p className="text-xs text-red-500">{createError.name}</p>}
                </div>

                <div className="flex flex-col gap-1">
                     <label className="flex text-black text-xs font-normal">Email</label>
                     <input pattern="[A-Za-z\s.,@!?'-]+" value={createEmail} onChange={(e) => setCreateEmail(e.target.value)} className="w-full outline outline-1 outline-gray-200 rounded-[8px] focus:outline-indigo-600 focus:outline-2 placeholder:text-sm placeholder:font-bold px-3 pb-1" type="text" placeholder="........" />
                     {createError.email && <p className="text-xs text-red-500">{createError.email}</p>}
                </div>

                <div className="flex flex-col gap-1">
                   <p className="flex text-black text-xs font-normal">Role</p>
                   <select value={createRole} onChange={(e) => setCreateRole(e.target.value)} className="text-xs text-black w-full outline outline-1 outline-gray-200 focus:outline-indigo-600 focus:outline-2 rounded-[8px] px-3 py-1">
                     <option value="">Select your role</option>
                     <option value="receptionist">Receptionist</option>
                     <option value="doctor">Doctor</option>
                     <option value="nurse">Nurse</option>
                     <option value="administrator">Administrator</option>
                     <option value="teller">Teller</option>
                     <option value="officer">Officer</option>
                     <option value="other">Other</option>
                   </select>
                   {createError.role && <p className="text-xs text-red-500">{createError.role}</p>}
                </div>

                <div className="flex flex-col gap-1">
                   <label className="flex text-black text-xs font-normal">Password</label>
                   <input pattern="[A-Za-z\s.,@&#!?'-]+" value={createPass} onChange={(e) => setCreatePass(e.target.value)} className="w-full outline outline-1 outline-gray-200 rounded-[8px] focus:outline-indigo-600 focus:outline-2 placeholder:text-[12px] px-3 pb-1" type="password" placeholder="Min. 8 characters" />
                   {createError.password && <p className="text-xs text-red-500">{createError.password}</p>}
                </div>

                <div className="flex flex-col gap-1">
                   <label className="flex text-black text-xs font-normal">Confirm Password</label>
                   <input pattern="[A-Za-z\s.,@&#!?'-]+" value={createConfirmPass} onChange={(e) => setCreateConfirmPass(e.target.value)} className="w-full outline outline-1 outline-gray-200 rounded-[8px] focus:outline-indigo-600 focus:outline-2 placeholder:text-[12px] px-3 pb-1" type="password" placeholder="Re-enter password" />
                   {createError.confirmPassword && <p className="text-xs text-red-500">{createError.confirmPassword}</p>}
                </div>

                <button type="submit" className="w-full bg-indigo-300 text-white px-6 py-2 rounded-md hover:bg-indigo-800 transition-colors duration-200 mt-3 text-xs font-medium">Create Account</button>
            </form>

            <div className="flex justify-center items-center gap-1">
                <p className="text-[12px] font-medium">Already have an account?</p>
                <Link to="/stafflogin"  className="text-[12px] text-indigo-700 font-medium">Sign In</Link>
            </div>
         </div>
    );
}