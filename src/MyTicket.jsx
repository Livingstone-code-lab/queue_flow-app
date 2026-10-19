import { CheckCircle } from 'lucide-react';

export default function MyTicket({customerTicket, setCustomerTicket, deleteTicket}) {
   
    return (
         <div className="flex flex-col justify-center items-center gap-3 mt-15">
            <div className="flex w-80 h-auto bg-green-50 px-3 py-3 border border-green-200 rounded-xl gap-3">
               <CheckCircle className="w-8 h-8 text-white outline outline-1 outline-green-400 rounded-2xl bg-green-400 p-1" />
               <div className="flex flex-col">
                 <p className="flex text-[11px]/4 font-bold text-green-900">You're in the queue!</p>
                 <p className="text-[10px]/4 text-green-400">We'll notify you when its your turn</p>
               </div>
            </div> 

            <div className="flex flex-col">
                <div className="w-80 h-auto outline outline-1 outline-indigo-700 bg-indigo-700 px-3 py-3 rounded-t-xl">
                    <p className="text-gray-300 text-xs">YOUR TICKET</p>
                    <p className="text-white text-4xl font-bold">{customerTicket.ticketNumber}</p>
                </div>

                <div className="flex flex-col w-80 h-auto outline outline-1 outline-white bg-white px-4 py-3 gap-2 rounded-b-xl">
                   <div className="flex justify-between">
                    <p className="text-gray-400 text-xs">Name:</p>
                    <p className="text-xs text-black font-medium">{customerTicket.name}</p>
                   </div>

                   <div className="flex justify-between">
                    <p className="text-gray-400 text-xs">Status:</p>
                    <p className="text-[12px] text-amber-700 bg-yellow-100 rounded-xl px-2">{customerTicket.status}</p>
                   </div>

                    <div className="flex justify-between">
                     <p className="text-gray-400 text-xs">People Ahead:</p> 
                     <p className="text-xs text-black font-medium">{customerTicket.peopleAhead}</p>
                   </div>

                    <div className="flex justify-between">
                     <p className="text-gray-400 text-xs">Currently Serving:</p>
                     <p className="text-xs text-indigo-700 font-medium">{customerTicket.currentlyServing || "Not Yet"}</p>
                   </div>

                    <div className="flex justify-between">
                     <p className="text-gray-400 text-xs">Joined At:</p>
                     <p className="text-xs text-black font-normal">{customerTicket.joinedAt}</p>
                   </div>
                </div>
            </div>

            <button className="w-full outline outline-2 outline-red-200 text-red-700 px-6 py-2 rounded-md hover:bg-red-400 hover:text-white hover:outline-red-400 transition-colors duration-200 mt-3 text-xs font-medium" onClick={() => {deleteTicket(customerTicket); setCustomerTicket(null);}}>Leave Queue</button>

            <p className="text-gray-400 text-xs">Keep this screen open to track your position</p>
         </div>
    );
}