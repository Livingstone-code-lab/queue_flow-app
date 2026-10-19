import { User } from "lucide-react";
import { useState } from "react";
import RegisterForTicket from "./RegisterForTicket";
import MyTicket from "./MyTicket";
import { Link } from "react-router-dom";

export default function CustomerQueue({ticketCounter, setTicketCounter, ticketInput, setTicketInput, queue, setQueue, servingCurrently, deleteTicket, ticketStatus, peopleOnQueue, joinedQueueAt, numOfPeopleWaiting, estimatedWait}) {
  
  const [customerTicket, setCustomerTicket] = useState(null); 

  const allTicketNumber = queue?.map(item => item.ticketNumber);

const ticketNumbers = allTicketNumber?.map(ticket => Number(ticket.slice(1)));

const highestTicketNumber = ticketNumbers?.length ? Math.max(...ticketNumbers) : 0;

const isNumber = highestTicketNumber + 1;

  const finalTicketNumber = queue?.length === 0 ? `A00${ticketCounter}` : `A00${isNumber}`;


  function handleTicket(ticketInput) {
   const newTicket = {
    id: Date.now(),        
    name: ticketInput,
    ticketNumber: finalTicketNumber,
    queuePosition: ticketCounter,
    status: ticketStatus,
    peopleAhead: peopleOnQueue, 
    currentlyServing: servingCurrently,
    joinedAt: new Date(joinedQueueAt).toLocaleTimeString()
  };
     
    setQueue(prev => [...(prev || []), newTicket]);
    setCustomerTicket(newTicket); 
  }



    return (
        <div className="flex flex-col">
            <div className="w-full fixed top-0 left-0 flex gap-3 justify-center items-center py-2 bg-white outline outline-1 outline-gray-200">
                <span className="absolute left-5 flex text-black outline outline-1 outline-gray-300 shadow-md px-2 rounded-md"><Link to="/chooseview">&lt;</Link></span>
                   <div className="flex gap-2">
                     <User className="flex w-5 h-5 text-white outline outline-1 outline-indigo-700 rounded-[10px] bg-indigo-700 p-1" />
                     <h3 className="flex text-base text-black font-bold">QueueFlow</h3>
                   </div>
            </div>
            
            <div>
                {customerTicket === null ? (
                    <div>
                        <RegisterForTicket ticketInput={ticketInput} setTicketInput={setTicketInput} handleTicket={handleTicket} setTicketCounter={setTicketCounter} numOfPeopleWaiting={numOfPeopleWaiting} customerTicket={customerTicket} estimatedWait={estimatedWait} />
                    </div>
                ) : (
                    <div>
                          <MyTicket customerTicket={customerTicket} setCustomerTicket={setCustomerTicket} deleteTicket={deleteTicket} />
                    </div>
                )}
            </div>
        </div>
    );
}