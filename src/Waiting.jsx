export default function Waiting({id, name, joinedAt, ticketNumber, next, servingStatus, queuePosition}) {

   let bkgrnd;
   let text;

   if (next?.id === id) {
     bkgrnd = "oklch(51.1% 0.262 276.966)";
     text = "white";
   }

    return (
         <div className="w-full">

                  <div className="flex p-3 outline outline-1 outline-gray-100 justify-between">
                     <div className="flex gap-3 items-center">
                        <p style={{background: bkgrnd, color: text}} className="flex w-7 h-7 shrink-0 justify-center items-center text-xs outline outline-1 outline-gray-100 bg-gray-100 rounded-md">{queuePosition}</p>

                        <div className="flex flex-col">
                            <div className="flex gap-2">
                               <p className="flex justify-center items-center text-xs text-black font-medium">{ticketNumber}</p>
                               {next?.id === id && <button onClick={() => servingStatus(next)} className="text-[10px] font-medium bg-indigo-100 text-indigo-700 px-2 rounded-xl hover:bg-indigo-800 hover:text-white">Next in Line</button>}
                            </div>
                            <p className="flex text-xs font-medium text-gray-500">{name}</p>
                        </div>
                     </div>

                        <p className="flex justify-center items-center text-xs text-gray-400">{joinedAt}</p>
                  </div>
              </div>
    );
}