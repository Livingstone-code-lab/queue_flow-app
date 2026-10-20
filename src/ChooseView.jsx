import { User, Users, ContactIcon } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export default function ChooseView({}) {

   const backHome = useNavigate();
    
    
    return (
         <div className="flex flex-col w-100 h-auto bg-white p-8 justify-center items-center border border-gray-100 rounded-lg shadow-md gap-5 mt-5">
            
            
               <div className="flex gap-3 justify-center items-center">
                  <Users className="w-7 h-7 text-white outline outline-1 outline-indigo-700 rounded-[10px] bg-indigo-700 p-1" />
                  <h3 className="flex font-bold text-xl text-black">QueueFlow</h3>
               </div>


            <p className="text-base font-bold text-black">How would you like to continue?</p>

           <Link to="/customerqueue" className="flex w-full outline outline-2 outline-gray-200 hover:outline-indigo-200 hover:bg-indigo-50 rounded-[8px] p-3 justify-between items-center transition-colors shadow-md">
    <div className="flex justify-center items-center gap-3 w-full">
        <ContactIcon className="w-9 h-9 text-indigo-600 outline outline-1 outline-indigo-100 rounded-[10px] hover:bg-indigo-200 bg-indigo-100 p-1" />

        <div className="flex flex-col flex-1">
            <div className="flex justify-between items-center">
                <p className="flex text-black text-[14px] font-bold">Customer View</p>
                <span className="text-gray-300">&gt;</span>
            </div>
            <p className="flex text-[11px] text-gray-500">Join a queue and track your position.</p>
        </div>
    </div>
</Link>


<Link to="/institution" className="flex w-full outline outline-2 outline-gray-200 hover:outline-violet-200 hover:bg-violet-50 rounded-[8px] p-3 justify-between items-center transition-colors shadow-md">
    <div className="flex justify-center items-center gap-3 w-full">
        <User className="w-9 h-9 text-violet-600 outline outline-1 outline-violet-100 hover:bg-violet-200 bg-violet-100 rounded-[10px] p-1" />

        <div className="flex flex-col flex-1">
            <div className="flex justify-between items-center">
                <p className="flex text-black text-[14px] font-bold">Staff View</p>
                <span className="text-gray-300">&gt;</span>
            </div>
            <p className="flex text-[11px] text-gray-500">Manage your institution's queue.</p>
        </div>
    </div>
</Link>

            <button className="text-gray-500 text-xs outline outline-1 outline-gray-200 px-2 py-1 rounded-lg shadow-md hover:bg-indigo-500 hover:text-white" onClick={() => backHome("/")}>Back to Home</button>
         </div>
    );
}