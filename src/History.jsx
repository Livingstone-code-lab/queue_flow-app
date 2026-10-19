import HistoryRendered from "./HistoryRendered";
import { useState, useMemo, useEffect } from "react";
import { SearchX } from "lucide-react";


export default function History({history, compledtedOnHistory, skippedOnHistory}) {

    const today = new Date();

    const [selectedMonth, setSelectedMonth] = useState(today.getMonth());

    const [selectedYear, setSelectedYear] = useState(today.getFullYear());

    const [searchTicket, setSearchTicket] = useState("");

    const [trackDate, setTrackDate] = useState(JSON.parse(localStorage.getItem("trackDate")) || Date.now());

    useEffect(() => {
        if (new Date().toLocaleDateString() !== new Date(trackDate).toLocaleDateString()) {
           setTrackDate(Date.now());
        }
    }, [trackDate]);


    useEffect(() => {
        localStorage.setItem("trackDate", JSON.stringify(trackDate));
    }, [trackDate]);



    let filteredTicket;
     
    if   (selectedMonth !== null && selectedYear !== null) {
        filteredTicket = history.filter(item => {
            const itemDate = new Date(item.historyDate);
            return itemDate.getMonth() === selectedMonth && itemDate.getFullYear() === selectedYear;
        });
    }


    const searchedTickets = useMemo(() => {
        return filteredTicket.filter(item => 
            item.name.toLowerCase().includes(searchTicket.toLowerCase()) || item.ticketNumber.toLowerCase().includes(searchTicket.toLowerCase())
        )
    }, [searchTicket, filteredTicket]);


   


  // grouping tickets array with its date. An object where each key is a date, and each value is an array of tickets.

        let ticketAndDate = {} 

        searchedTickets.forEach(ticket => {
            const date = ticket.historyDate;

            if (!ticketAndDate[date]) {
                ticketAndDate[date] = []
            }

               ticketAndDate[date] = [...ticketAndDate[date], ticket]
        })    


     const daysActive =  Object.keys(ticketAndDate).length;

     
    return (
         <div className="w-full flex flex-col gap-5">
            <div className="flex flex-col gap-4">
            <div className="flex sm:flex-row flex-col gap-4 sm:justify-between">
                <div className="flex gap-2">
                    <select value={selectedMonth} onChange={(e) => setSelectedMonth(Number(e.target.value))} className="outline outline-1 outline-gray-300 rounded-lg px-2 py-1 text-xs focus:outline-indigo-700 focus:outline-2 hover:outline-indigo-700">
                       <option value="0">January</option>
                       <option value="1">February</option>
                       <option value="2">March</option>
                       <option value="3">April</option> 
                       <option value="4">May</option>
                       <option value="5">June</option>
                       <option value="6">July</option>
                       <option value="7">August</option>
                       <option value="8">September</option>
                       <option value="9">October</option>
                       <option value="10">November</option>
                       <option value="11">December</option>
                    </select>
                    <select value={selectedYear} onChange={(e) => setSelectedYear(Number(e.target.value))} className="outline outline-1 outline-gray-300 rounded-lg px-2 py-1 text-xs focus:outline-indigo-700 focus:outline-2 hover:outline-indigo-700">
                          <option value="2023">2023</option>
                          <option value="2024">2024</option>
                          <option value="2025">2025</option>
                          <option value="2026">2026</option>
                    </select>
                    <div className="flex justify-center items-center gap-1">
                       <p className="text-sm font-gray-200">{new Date(2026, selectedMonth).toLocaleDateString("en-US", {month: "long"})}</p>
                       <p className="text-sm font-gray-200">{selectedYear}</p>
                    </div>
                </div>
                <input value={searchTicket} onChange={(e) => setSearchTicket(e.target.value)} placeholder="🔍 search name or ticket..." className="w-50 outline outline-1 outline-gray-200 rounded-lg focus:outline-2 focus:outline-indigo-600 placeholder:text-[12px] px-3 pb-1"  />
            </div>

            <div className="flex gap-4">
                <div className="w-full outline outline-1 outline-gray-100 bg-white rounded-lg p-3">
                    <p className="text-2xl font-bold text-indigo-600">{daysActive}</p>
                    <p className="text-xs font-medium text-gray-500">Days Active</p> 
                </div>
                <div className="w-full outline outline-1 outline-gray-100 bg-white rounded-lg p-3">
                    <p className="text-2xl font-bold text-green-600">{compledtedOnHistory}</p>
                    <p className="text-xs font-medium text-gray-500">Served</p>
                </div>
                <div className="w-full outline outline-1 outline-gray-100 bg-white rounded-lg p-3">
                    <p className="text-2xl font-bold text-red-600">{skippedOnHistory}</p>
                    <p className="text-xs font-medium text-gray-500">Skipped</p>
                </div>
            </div>
           </div> 

            <div className="w-full">
                {history.length === 0 ? (
                  <div className="flex min-h-[240px] w-full flex-col items-center justify-center rounded-xl border border-gray-100 bg-white px-5 py-10 text-center shadow-sm">

                    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 ring-1 ring-indigo-100">
                      <SearchX className="h-7 w-7 text-indigo-500" strokeWidth={1.8} />
                    </div>

                    <h3 className="text-sm font-semibold text-gray-800">Oops! Ticket not available.</h3>

                    <p className="mt-2 max-w-xs text-xs leading-5 text-gray-500">Completed and skipped tickets will be recorded here for easy reference.</p>
                  </div>
                ) : (
                    Object.entries(ticketAndDate).map(([date, tickets]) => (
                     <HistoryRendered
                         key={date}
                         dateForHistory={date}
                         tickets={tickets}
                     />
                )))}
            </div>
         </div>
    );
}