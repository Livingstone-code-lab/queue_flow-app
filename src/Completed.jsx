export default function Completed({name, joinedAt, ticketNumber}) {

    return (
         <div className="w-full">

               <div className="flex p-3 outline outline-1 outline-gray-100 justify-between">
                     <div className="flex gap-3 items-center">
                        <p className="flex w-7 h-7 shrink-0 justify-center items-center text-xs outline outline-1 outline-green-50 bg-green-50 text-green-600 font-bold rounded-md">✔</p>

                        <div className="flex flex-col">                           
                            <p className="flex text-xs text-black font-medium">{ticketNumber}</p>
                            <p className="flex text-xs font-medium text-gray-500">{name}</p>
                        </div>
                     </div>

                     <p className="flex justify-center items-center text-xs">{joinedAt}</p>
                  </div>
         </div>
    );
}