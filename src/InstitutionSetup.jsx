import { Users } from "lucide-react";
import { useNavigate, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function InstitutionSetup({institutionName, setInstitutionName, currentDate}) {

    const [setupError, setSetupError] = useState({
       name: ""
    });


    useEffect(() => {
       setTimeout(() => {
         setSetupError({
            name: ""
         })  
       }, 2000);  
    }, [setupError]);


    const scrollBack = useNavigate();


    function isSetupError() {
       const newSetupError = {
          name: ""
       };

       if (!institutionName) {
          newSetupError.name = "Pls add institution name!";
       }

       return newSetupError;
    }

 
    return (
         <div className="flex flex-col w-100 h-auto bg-white p-6 justify-center items-center border border-gray-100 rounded-lg shadow-md gap-6 mt-5">
            <div className="relative w-full flex justify-around">
                <span className="absolute left-0 flex justify-center items-center w-6 outline outline-1 outline-gray-100 rounded-[10px] bg-white px-5" onClick={() => scrollBack("/chooseview")}>&lt;</span>
                <div className="flex justify-center items-center gap-3">
                  <Users className="w-7 h-7 text-white outline outline-1 outline-indigo-700 rounded-[10px] bg-indigo-700 p-1" />
                  <h2 className="font-extrabold text-2xl">QueueFlow</h2>
                </div>
            </div> 

            <div className="flex flex-col gap-2">
                <h3 className="font-bold text-black text-xl">Welcome to Queue Flow</h3>
                <p className="text-xs font-medium text-gray-400">Set up your institution to get started</p>
            </div>

            <form className="w-full max-w-xl flex flex-col gap-4" onSubmit={(e) => {e.preventDefault(); const setUpResult = isSetupError(); setSetupError(setUpResult); if (!institutionName) return; institutionName && scrollBack("/stafflogin");}}>
                <div className="flex flex-col gap-3">
                   <label className="flex text-xs font-medium">Institution Name</label>
                   <input className="w-full outline outline-1 outline-gray-200 rounded-[8px] placeholder:text-xs px-6 py-1 focus:outline-2 focus:outline-indigo-600" value={institutionName} onChange={(e) => setInstitutionName(e.target.value)} type="text" placeholder="Enter institution name" />
                   {setupError.name && <p className="text-xs text-red-500">{setupError.name}</p>}
                </div>

                <div className="flex flex-col gap-3">
                     <p className="flex text-xs font-medium">Today's Date</p>
                     <div className="flex w-full outline outline-1 outline-gray-100 rounded-[8px] text-xs px-6 py-2 bg-gradient-to-br from-indigo-50 via-white to-violet-50">{currentDate}</div>
                </div>
                <button type="submit" className="w-full bg-indigo-700 text-white px-6 py-2 rounded-md hover:bg-indigo-800 transition-colors duration-200 mt-3 text-xs">
                    continue
                </button>
            </form>

            <p className="text-[12px] text-gray-400 font-medium">Queue management for modern service businesses</p>
         </div>
    );
}