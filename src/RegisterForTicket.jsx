import { useState, useEffect } from "react";

export default function RegisterForTicket({ticketInput, setTicketInput, handleTicket, setTicketCounter, numOfPeopleWaiting, customerTicket, estimatedWait}) {
    
    const [registerError, setRegisterError] = useState({
        name: ""
    });


    useEffect(() => {
       setTimeout(() => {
         setRegisterError({
            name: ""
         }) 
       }, 1500);
    }, [registerError]);


    function isError() {
       const newRegisterError = {
          name: ""
       };

       if (!ticketInput) {
          newRegisterError.name = "Pls enter your name!";
       }

       return newRegisterError;
    }


    
    return (
        <div className="flex flex-col gap-4 mt-15">
            <div className="w-70 h-auto bg-indigo-700 outline outline-1 outline-indigo-700 rounded-[8px] flex flex-col justify-between items-center py-2 gap-2">
                <p className="text-white text-xs text-gray-200">CURRENTLY SERVING</p>
                <p className="font-bold text-2xl text-gray-200">{customerTicket?.servingCurrently || "No one yet"}</p>
                <p className="text-gray-200 text-[10px]">{customerTicket?.name}</p>
            </div>

            <div className="flex gap-4">
                <div className="w-33 bg-white h-auto outline outline-1 outline-indigo-50 rounded-[6px] p-2">
                    <p className="text-base font-medium text-indigo-700">{numOfPeopleWaiting}</p> 
                    <p className="text-xs">Waiting</p>
                </div>
                <div className="w-33 bg-white h-auto outline outline-1 outline-indigo-50 rounded-[6px] p-2">
                    <p className="text-base text-indigo-700">{estimatedWait} mins</p>
                    <p className="text-xs">Est. Wait</p>
                </div>
            </div>

            <form className="flex flex-col w-70 bg-white h-auto outline outline-1 outline-white rounded-[6px] p-3 gap-2"
             onSubmit={(e) => {e.preventDefault(); const errorResult = isError(); setRegisterError(errorResult); if (!ticketInput) return;  handleTicket(ticketInput); setTicketCounter(prev => prev + 1); setTicketInput("");}}>
                <h6 className="flex text-sm text-black font-bold">Join the Queue</h6>

                <div className="flex flex-col gap-1"> 
                    <label className="flex text-black text-xs font-normal">Full Name</label>
                    <input className="w-full outline outline-1 outline-gray-200 rounded-[4px] placeholder:text-[12px] px-3 pb-1 focus:outline-indigo-600 focus:outline-2" value={ticketInput} onChange={(e) => setTicketInput(e.target.value)} type="text" placeholder="Enter your full name" />
                    {registerError.name && <p className="text-xs text-red-500">{registerError.name}</p>}
                </div>

                <button type="submit" className="w-full bg-indigo-700 text-white px-6 py-2 rounded-md hover:bg-indigo-800 transition-colors duration-200 mt-3 text-xs font-medium">Get a Ticket</button>
            </form> 
        </div>
    );
}