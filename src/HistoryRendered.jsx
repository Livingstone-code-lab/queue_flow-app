import ShowHistory from "./ShowHistory";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function HistoryRendered({tickets, dateForHistory}) {

    const [openDate, setOpenDate] = useState(null);


          let completedCount;
          let skippedCount;
          let totalCount;


           let todaysDate = tickets?.filter(item => item.historyDate === new Date(dateForHistory).toLocaleDateString());

  
              completedCount = todaysDate?.filter(item => item.status === "completed").length;
              skippedCount = todaysDate?.filter(item => item.status === "skipped").length;
              totalCount = todaysDate?.length;



    return (
         <div className="flex flex-col gap-4 w-full">
            
             <div className="flex flex-col cursor-pointer hover:bg-gray-50" onClick={() => setOpenDate(openDate === dateForHistory ? null : dateForHistory)}>
                 {/* Always visible */}
                    <div className="flex items-center justify-between px-6 py-5">
                       <div>
                          <h5 className="text-sm font-semibold text-gray-900">{new Date(dateForHistory).toLocaleDateString("en-US", {weekday: "long", year: "numeric", month: "long", day: "numeric"})}</h5>

                           <div className="flex gap-3 mt-2 text-xs">
                              <div className="flex gap-1">
                                 <p className="text-green-600">{completedCount}</p>
                                 <p className="text-green-600">served</p>
                              </div>
                              <div className="flex gap-1">
                                 <p className="text-red-400">{skippedCount}</p>
                                 <p className="text-red-400">skipped</p>
                              </div>
                              <div className="flex gap-1">
                                 <p className="text-gray-500">{totalCount}</p>
                                 <p className="text-gray-500">total</p>
                              </div>
                            </div>
                        </div>

                        <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${openDate === dateForHistory ? "rotate-180" : ""}`} />
                    </div>

                 {/* Only visible when clicked */}
                      {openDate === dateForHistory && (
                    <div className="px-6 pb-6">
                           {/* Table header */}
                        <div className="grid grid-cols-[1fr_2fr_1fr] px-2 py-3 text-[10px] font-medium text-gray-500 uppercase border-b border-gray-100">
                           <span>Ticket</span>
                           <span>Name</span>
                           <span className="text-right">Time</span>
                        </div>

                 {tickets.map(ticket => (
                    <ShowHistory
                       key={ticket.id}
                       id={ticket.id}
                       name={ticket.name}
                       ticketNumber={ticket.ticketNumber}
                       queuePosition={ticket.queuePosition}
                       status={ticket.status}
                       peopleAhead={ticket.peopleAhead}
                       currentlyServing={ticket.currentlyServing}
                       joinedAt={ticket.joinedAt}
                       historyDate={ticket.historyDate}
                    /> 
                 ))}
              </div>
                )}
            </div>       
         </div>
    );
}