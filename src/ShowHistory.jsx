export default function ShowHistory({name, ticketNumber, joinedAt, status}) {

    return (
         <div className="flex flex-col w-full">
                      <div className="grid grid-cols-[1fr_2fr_1fr] items-center px-2 py-4 border-t border-gray-100">
                          <span className="text-xs font-medium text-gray-700">{ticketNumber}</span>

                          <span className="text-xs text-gray-700">{name}</span>

                        <div className="flex flex-col items-end gap-1">
                          <span className="text-xs text-gray-500">{joinedAt}</span>

                          {status === "completed" ? (
                             <span className="px-3 rounded-full bg-green-100 text-green-700 text-[10px]">completed</span>
                          ) : (
                             <span className="px-3 rounded-full bg-red-100 text-red-700 text-[10px]">Skipped</span>
                          )}
                        </div>
                    </div>
            </div>
    );
}