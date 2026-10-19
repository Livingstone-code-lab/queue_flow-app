import Waiting from "./Waiting";
import Completed from "./Completed";
import Skipped from "./Skipped";
import { useState, useEffect } from "react";

export default function StaffDashboard2({numOfPeopleWaiting, serving, servingStatus, completedStatus, waiting, completed, numOfCompleted, next, skipped, skipTicket, callSkipped, recallSkipped, deleteSkipped, handleCompletedHistory, handleSkippedHistory, addToCompleted, serviceTime, setServiceTime, setTimeInput}) {
   
   const [timerError, setTimerError] = useState({
      time: ""
   });

   const [timerMessage, setTimerMessage] = useState("");

   const [timer, setTimer] = useState(false);


   useEffect(() => {
      setTimeout(() => {
        setTimerError({
          time: ""
        })
      }, 3500)
   });


    useEffect(() => {
      if (timer === true) {
          setTimer(true);
          setTimerMessage(`Service duration set to ${serviceTime} minutes.`);

          setTimeout(() => {
            setTimer(false);
            setTimerMessage("");
          }, 3500)
      }
    }, [timer]);


    function hasError() {
        const newTimeError = {
          time: ""
        };

       if (!serviceTime) {
         newTimeError.time = "Please set service duration.";
       } else if (!Number.isFinite(Number(serviceTime))) {
          newTimeError.time = "Service duration should be a number!";
       }

       return newTimeError;
    }



   let update;
   let color;
   let line;
   let bkGround;

   if (serving) {
     update = "Active";
     color = "green";
     line = "1px solid oklch(96.2% 0.044 156.743)";
     bkGround = "oklch(96.2% 0.044 156.743)";
   }


    return (
         <div className="w-full flex flex-col gap-6">
              {timer === true 
               && 
                <div className="w-full rounded-lg border border-green-200 bg-green-50 px-3 py-2 text-xs text-green-700">
                   <p className="mt-1 text-[10px] text-green-600">{timerMessage}</p>
                </div>
            }


              {serving ? (
                 <div className="w-full flex flex-col outline outline-1 outline-gray-100 bg-white rounded-lg">
                  <div className="flex justify-between p-3 outline outline-1 outline-gray-100">
                    <p className="text-sm font-bold text-black">Now Serving</p>
                    <p className="text-xs px-3 py-1 rounded-xl font-medium" style={{color: color, border: line, backgroundColor: bkGround}}>{update}</p>
                  </div>

                  <div className="flex flex-col justify-center items-center p-3 outline outline-1 outline-gray-100 gap-4">
                    <p className="bg-indigo-700 text-white outline outline-1 outline-indigo-700 text-lg font-medium px-2 py-3 rounded-xl">{serving.ticketNumber}</p>
                    <div className="flex flex-col gap-2">
                       <p className="text-sm text-black font-medium">{serving.name}</p>
                       <p className="text-xs text-gray-500">Joined at {serving.joinedAt}</p>
                       <form className="flex flex-col gap-2" onSubmit={(e) => {
                          e.preventDefault();
                          const isError = hasError();
                          setTimerError(isError);
                          if (!serviceTime || !Number.isFinite(Number(serviceTime))) return; 
                          setTimer(true); 
                          setTimeInput(serviceTime);
                          setServiceTime("");
                          }}>
                           <div className="flex gap-2">
                              <input type="number" className="h-9 w-28 rounded-lg border border-gray-200 bg-gray-50 px-3 text-sm text-gray-700 placeholder:text-xs placeholder:text-gray-400 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100" value={serviceTime} onChange={(e) => setServiceTime(e.target.value)} placeholder="e.g 10 mins" />
                              <button  className="h-9 rounded-lg bg-indigo-600 px-4 text-xs font-medium text-white transition hover:bg-indigo-700">Set Time</button>
                           </div>
                           {timerError.time && <p className="text-red-500 text-xs">{timerError.time}</p>}
                       </form>
                    </div>
                    <button className="w-full bg-indigo-700 text-white px-6 py-2 rounded-md hover:bg-indigo-800 transition-colors duration-200 mt-3 text-xs font-medium" onClick={() => {completedStatus(serving); handleCompletedHistory(); addToCompleted()}}>Complete</button>         
                    <div className="flex w-full gap-3">
                      <button className="w-full font-medium text-xs outline outline-2 outline-gray-100 bg-white px-6 py-2 rounded-md" onClick={() => {servingStatus(next); completedStatus(serving); handleCompletedHistory(); addToCompleted();}}>Call Next</button>
                      <button className="w-full font-medium text-xs outline outline-2 outline-gray-100 bg-white px-6 py-2 rounded-md" onClick={() => skipTicket(serving)}>Skip</button>
                    </div>
                  </div>
              </div>
              ) : (
                 <div className="w-full flex flex-col items-center justify-center p-8 outline outline-1 outline-gray-100 bg-white rounded-lg text-center">
                       <p className="text-sm font-medium text-gray-500">No customer is currently being served.</p>
                       <p className="text-xs text-gray-400 mt-1">Call the next customer to begin service by clicking <span className="text-indigo-700">"Next in line"</span> below.</p>
                 </div>
              )}

               
               <div className="w-full outline outline-1 outline-gray-100 bg-white rounded-lg">
                   <div className="flex justify-between p-3 outline outline-1 outline-gray-100">
                    <p className="text-sm font-bold text-black">Waiting Queue</p>
                    <p className="text-xs px-3 py-1 rounded-xl outline outline-1 outline-amber-100 bg-amber-100 text-amber-600 font-medium">{numOfPeopleWaiting} Waiting</p>
                  </div>
                  {waiting?.length > 0 ? (
                     waiting.map(item => (
                     <Waiting
                        key={item.id}
                        id={item.id}
                        name={item.name}
                        ticketNumber={item.ticketNumber}
                        queuePosition={item.queuePosition}
                        status={item.status}
                        peopleAhead={item.peopleAhead}
                        currentlyServing={item.currentlyServing}
                        joinedAt={item.joinedAt}
                        next={next}
                        servingStatus={servingStatus}
                     />
                  ))) : (
                     <div className="w-full flex flex-col items-center justify-center p-8 outline outline-1 outline-gray-100 bg-white rounded-lg text-center">
                       <p className="text-sm font-medium text-gray-500">No customers are currently waiting.</p>
                       <p className="text-xs text-gray-400 mt-1">New customers will appear here when they join the queue.</p>
                     </div>
                  )}
               </div>


               <div className="w-full outline outline-1 outline-gray-100 bg-white rounded-lg">
                   <div className="flex justify-between p-3 outline outline-1 outline-gray-100">
                      <p className="text-sm font-bold text-black">Recently Completed</p>
                      <p className="text-xs px-3 py-1 rounded-xl outline outline-1 outline-gray-100 bg-gray-100 text-gray-500 font-medium">{numOfCompleted} done</p>
                   </div>
                   {completed?.length > 0 ? (
                      completed.map(item => (
                        <Completed 
                          key={item.id}
                          id={item.id}
                          name={item.name}
                          ticketNumber={item.ticketNumber}
                          queuePosition={item.queuePosition}
                          status={item.status}
                          peopleAhead={item.peopleAhead}
                          currentlyServing={item.currentlyServing}
                          joinedAt={item.joinedAt}
                          historyDate={item.historyDate}
                          handleCompletedHistory={handleCompletedHistory}
                      />
                    ))) : (
                        <div className="w-full flex flex-col items-center justify-center p-8 outline outline-1 outline-gray-100 bg-white rounded-lg text-center">
                            <p className="text-sm font-medium text-gray-500">No recently completed customers.</p>
                           <p className="text-xs text-gray-400 mt-1">Completed customers will appear here once their service is finished.</p>
                        </div> 
                    )}
               </div>


               <div className="w-full outline outline-1 outline-gray-100 bg-white rounded-lg">
                   <div className="flex justify-between p-3 outline outline-1 outline-gray-100">
                      <p className="text-sm font-bold text-black">Skipped Customers</p>
                      <p className="text-xs px-3 py-1 rounded-xl outline outline-1 outline-red-300 bg-red-300 text-white font-medium">{skipped.length} skipped</p>
                   </div>
                   {skipped?.length > 0 ? (
                      skipped.map(item => (
                        <Skipped 
                          key={item.id}
                          id={item.id}
                          name={item.name}
                          ticketNumber={item.ticketNumber}
                          queuePosition={item.queuePosition}
                          status={item.status}
                          peopleAhead={item.peopleAhead}
                          currentlyServing={item.currentlyServing}
                          joinedAt={item.joinedAt}
                          callSkipped={callSkipped} 
                          recallSkipped={recallSkipped}
                          deleteSkipped={deleteSkipped}
                          historyDate={item.historyDate}
                          handleSkippedHistory={handleSkippedHistory}
                      />
                    ))) : (
                        <div className="w-full flex flex-col items-center justify-center p-8 outline outline-1 outline-gray-100 bg-white rounded-lg text-center">
                            <p className="text-sm font-medium text-gray-500">No recently skipped customers.</p>
                           <p className="text-xs text-gray-400 mt-1">Customers who miss their turn will appear here.</p>
                        </div> 
                    )}
               </div>
         </div>
    );
}