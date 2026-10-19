export default function Skipped({id, name, joinedAt, ticketNumber, callSkipped, recallSkipped, deleteSkipped, handleSkippedHistory}) {

    return (
         <div className="w-full">

               <div className="flex p-3 outline outline-1 outline-gray-100 justify-between">
                     <div className="flex gap-3 items-center">
                        <p className="flex w-7 h-7 shrink-0 justify-center items-center text-xs outline outline-1 outline-red-50 bg-red-50 text-red-600 font-bold rounded-md">🚫</p>

                        <div className="flex flex-col">
                            <div className="flex gap-2">
                                <p className="flex text-xs text-black font-medium">{ticketNumber}</p>
                                {recallSkipped?.id === id && <button onClick={() => callSkipped(recallSkipped)} className="text-[10px] font-medium bg-indigo-100 text-indigo-700 px-2 rounded-xl hover:bg-indigo-800 hover:text-white">Recall Customer</button>}
                                {recallSkipped?.id === id && <button onClick={() => {deleteSkipped(recallSkipped); handleSkippedHistory()}} className="text-[10px] font-medium bg-red-300 text-white px-2 rounded-xl hover:bg-red-700 hover:text-white">Remove</button>}
                            </div>                           
                            
                            <p className="flex text-xs font-medium text-gray-500">{name}</p>
                        </div>
                     </div>

                     <p className="flex justify-center items-center text-xs">{joinedAt}</p>
                  </div>
         </div>
    );
}