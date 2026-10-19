import { Check, Hourglass, Target, UserX } from 'lucide-react';

export default function StaffDashboard1({numOfPeopleWaiting, numOfCompleted, serving, skipped}) {
    return (
            <div className="grid grid-cols-2 w-full gap-4">
                <div className="flex w-full outline outline-1 outline-gray-100 bg-amber-100 px-3 py-3 rounded-lg shadow-md">
                  <div className="flex gap-2">
                    <Hourglass className="w-9 h-9 shrink-0 outline outline-1 outline-amber-50 rounded-[10px] bg-amber-50 p-1" />
                    <div className="flex flex-col justify-center gap-1">
                        <p className="flex text-xl font-bold text-amber-600 leading-none">{numOfPeopleWaiting}</p>
                        <p className="text-xs leading-tight text-gray-500">Waiting</p>
                    </div>
                  </div>   
                </div>

                <div className="flex w-full outline outline-1 outline-gray-100 bg-green-100 px-3 py-3 rounded-lg shadow-md">
                    <div className="flex gap-2">
                        <Check className="w-9 h-9 shrink-0 outline outline-1 outline-green-50 rounded-[10px] bg-green-50 p-1" />
                        <div className="flex flex-col justify-center gap-1">
                            <p className="flex text-xl font-bold text-green-600 leading-none">{serving ? 1 : 0}</p>
                            <p className="text-xs leading-tight text-gray-500">Serving</p>
                        </div>
                    </div>
                </div>

                <div className="flex w-full outline outline-1 outline-gray-100 bg-indigo-200 px-3 py-3 rounded-lg shadow-md">
                    <div className="flex gap-2">
                        <Target className="w-9 h-9 shrink-0 outline outline-1 outline-indigo-50 rounded-[10px] bg-indigo-50 p-1" />
                        <div className="flex flex-col justify-center gap-1">
                            <p className="flex text-xl font-bold text-indigo-700 leading-none">{numOfCompleted}</p>
                            <p className="text-xs leading-tight text-gray-500">Completed</p>
                        </div>
                    </div>
                </div>

                <div className="flex w-full outline outline-1 outline-gray-100 bg-slate-300 px-3 py-3 rounded-lg shadow-md">
                    <div className="flex gap-2">
                        <UserX className="w-9 h-9 shrink-0 outline outline-1 outline-slate-50 rounded-[10px] bg-slate-50 p-1" />
                        <div className="flex flex-col justify-center gap-1">
                            <p className="flex text-xl font-bold text-gray-600 leading-none">{skipped?.length}</p>
                            <p className="text-xs leading-tight text-gray-500">Skipped</p>
                        </div>
                    </div>
                </div>
            </div>
    );
}