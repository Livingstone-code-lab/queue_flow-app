import { useState, useEffect } from "react";
import { User, Users, Timer, Menu } from 'lucide-react';
import StaffDashboard1 from "./StaffDashboard1";
import StaffDashboard2 from "./StaffDashboard2";
import History from "./History";
import { useNavigate } from "react-router-dom";

export default function StaffDashboard({institutionName, isStaffLoggedIn, currentDate, numOfPeopleWaiting, serving, servingStatus, completedStatus, waiting, completed, queue, numOfCompleted, next, skipped, skipTicket, callSkipped, recallSkipped, deleteSkipped, handleCompletedHistory, handleSkippedHistory, history, compledtedOnHistory, addToCompleted, skippedOnHistory, serviceTime, setServiceTime, savedStaffData, setTimeInput}) {

   const [showModal, setShowModal] = useState(false);

   const [showWelcome, setShowWelcome] = useState(false);

   const [welcomeMessage, setWelcomeMessage] = useState("");

    useEffect(() => {
      if (isStaffLoggedIn === true) {
         setShowWelcome(true);

         setWelcomeMessage(`You’re all set and ready to go at ${institutionName}. 🎉`);

        setTimeout(() => {
             setShowWelcome(false);
            setWelcomeMessage("");
        }, 2000);
      }
    }, [isStaffLoggedIn, institutionName]);


    const isExit = useNavigate();


    const splited = savedStaffData.name.split(" ");
   const first = splited[0]?.slice(0, 1);
   const second = splited[1]?.slice(0, 1);

    return (
         <div className="w-full flex flex-col sm:pt-15 pt-27">
            {showWelcome && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 backdrop-blur-sm">
    <div className="w-full max-w-md mx-4 rounded-2xl bg-white p-8 shadow-2xl ring-1 ring-black/5">

    <div className="flex flex-col items-center text-center">

      <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100">
        <svg className="h-6 w-6 text-indigo-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>

      <h2 className="text-2xl font-bold tracking-tight text-slate-900">Welcome!</h2> 

      <p className="mt-2 text-sm leading-6 text-slate-500">{welcomeMessage}</p>

      <div className="mt-6 h-1 w-full overflow-hidden rounded-full bg-slate-100">
        <div className="h-full w-full origin-left animate-[shrink_2s_linear] bg-indigo-600" />
      </div>

    </div>
  </div>
</div>
            )}

              
<div className="flex flex-col gap-3 min-h-screen bg-gray-50 rounded-lg">

  <div className="w-full fixed top-0 left-0 z-50 border-b border-gray-100 bg-white/95 backdrop-blur-md">

    <div className="w-full max-w-7xl mx-auto px-3 sm:px-5 lg:px-6">

      <div className="min-h-[64px] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4 py-2 sm:py-0">

        {/* LEFT — QueueFlow + Institution */}
        <div className="w-full sm:w-auto flex items-center justify-between gap-2 sm:gap-3">

          <div className="flex shrink-0 items-center gap-2">

            <User className="w-8 h-8 text-white outline outline-1 outline-indigo-700 rounded-lg bg-indigo-700 p-1" />

            <h3 className="font-bold text-xl text-black whitespace-nowrap">
              QueueFlow
            </h3>

          </div>

          <p className="block text-gray-300 font-extralight">
            |
          </p>

          <div className="min-w-0 block">
            <p className="text-sm text-black font-medium truncate max-w-[180px]">
              {institutionName}
            </p>

            <p className="sm:text-xs text-[10px] text-gray-400 whitespace-nowrap">
              {currentDate}
            </p>
          </div>

        </div>


        {/* CENTER + RIGHT — Queue/History and Staff Profile */}
        <div className="w-full sm:w-auto flex items-center justify-between sm:justify-normal gap-4 sm:gap-8">

          {/* Queue / History */}
          <div className="h-7 flex shrink-0 outline outline-1 outline-gray-200 bg-gray-100 rounded-lg px-1 py-1 gap-1 sm:gap-2">

            <div
              className={`flex justify-center items-center gap-1 cursor-pointer transition-all duration-200 ease-in-out ${
                showModal === false
                  ? "bg-white px-2 sm:px-3 py-1 text-black font-medium rounded-md shadow-sm"
                  : "px-2 sm:px-1 py-1 text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setShowModal(false)}
            >
              <Menu className="w-3.5 h-3.5" />

              <p className="text-xs">
                Queue
              </p>
            </div>

            <div
              className={`flex justify-center items-center gap-1 cursor-pointer transition-all duration-200 ease-in-out ${
                showModal === true
                  ? "bg-white px-2 sm:px-3 py-1 text-black font-medium rounded-md shadow-sm"
                  : "px-2 sm:px-1 py-1 text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setShowModal(true)}
            >
              <Timer className="w-3.5 h-3.5" />

              <p className="text-xs">
                History
              </p>
            </div>

          </div>


          {/* RIGHT — Staff Profile + Exit */}
          <div className="flex shrink-0 items-center gap-2 sm:gap-3">

            <div className="flex items-center outline outline-1 outline-gray-200 bg-gray-50 rounded-lg py-1 px-1.5 sm:px-2 gap-1.5 sm:gap-2">

              <div className="h-5 w-5 sm:h-8 sm:w-8 shrink-0 flex items-center justify-center rounded-full bg-indigo-100 outline outline-1 outline-indigo-100">
                <span className="text-xs font-semibold text-indigo-600">{first}{second}</span>
              </div>

              <div className="block leading-tight min-w-0">
                <p className="text-xs text-black font-medium truncate max-w-[90px] sm:max-w-[100px]">{savedStaffData.name}</p>

                <p className="flex text-[10px] text-gray-500 font-medium">Staff</p>
              </div>

            </div>

            <button onClick={() => isExit("/stafflogin")} className="shrink-0 text-gray-500 border border-gray-200 bg-white hover:bg-gray-50 hover:text-gray-700 rounded-md px-1 sm:px-3 sm:py-1.5 text-xs font-medium transition-all duration-200">Exit</button>

          </div>

        </div>

      </div>

    </div>

  </div>


  {/* PAGE CONTENT */}
  <div className="w-full pt-[30px] sm:pt-[50px] px-3 sm:px-5 lg:px-6 pb-8">

    <div className="w-full max-w-7xl mx-auto">

      {showModal === false ? (

        <div>

          <StaffDashboard1 numOfPeopleWaiting={numOfPeopleWaiting} numOfCompleted={numOfCompleted} serving={serving} skipped={skipped} />

          <div className="w-full pt-6">

            {queue?.length > 0 ? (

              <StaffDashboard2
                serving={serving}
                numOfPeopleWaiting={numOfPeopleWaiting}
                servingStatus={servingStatus}
                completedStatus={completedStatus}
                waiting={waiting}
                completed={completed}
                numOfCompleted={numOfCompleted}
                next={next}
                skipped={skipped}
                skipTicket={skipTicket}
                callSkipped={callSkipped}
                recallSkipped={recallSkipped}
                deleteSkipped={deleteSkipped}
                handleCompletedHistory={handleCompletedHistory}
                handleSkippedHistory={handleSkippedHistory}
                addToCompleted={addToCompleted}
                serviceTime={serviceTime}
                setServiceTime={setServiceTime}
                setTimeInput={setTimeInput}
              />

            ) : (

              <div className="w-full flex flex-col items-center justify-center p-10 outline outline-1 outline-gray-200 bg-white rounded-xl text-center shadow-sm">

                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-indigo-50 mb-3">
                  <Users className="w-6 h-6 text-indigo-600" />
                </div>

                <p className="text-sm font-semibold text-gray-600">
                  The queue is currently empty.
                </p>

                <p className="text-xs text-gray-400 mt-1 max-w-xs">
                  New check-ins will appear here automatically.
                </p>

              </div>

            )}

          </div>

        </div>

      ) : (

        <div>

          <History
            history={history}
            compledtedOnHistory={compledtedOnHistory}
            skippedOnHistory={skippedOnHistory}
          />

        </div>

      )}

    </div>

  </div>

</div>
         </div>
    );
}