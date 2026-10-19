import { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import InstitutionSetup from './InstitutionSetup';
import ChooseView from './ChooseView';
import CustomerQueue from './CustomerQueue';
import StaffLogin from './StaffLogin';
import ForgetPassword from './ForgetPassword';
import CreateAccount from './CreateAccount';
import StaffDashboard from './StaffDashboard';
import Home from './Home';

export default function App() {

  const [startedAt, setStartedAt] = useState(JSON.parse(localStorage.getItem("startedAt")) || Date.now());

  const [queue , setQueue] = useState(new Date().toLocaleDateString() === new Date(startedAt).toLocaleDateString()
        ? JSON.parse(localStorage.getItem("queue")) 
        : []
  );

  const [completed, setCompleted] = useState(new Date().toLocaleDateString() === new Date(startedAt).toLocaleDateString() 
        ? JSON.parse(localStorage.getItem("completed"))
        : []
      );

  const [history, setHistory] = useState(JSON.parse(localStorage.getItem("history")) || []);

  const [staffEmail, setStaffEmail] = useState("");

  const [staffPassword, setStaffPassword] = useState("");

  const [ticketInput, setTicketInput] = useState("");

  const [ticketCounter, setTicketCounter] = useState(1);

  const [ticketStatus] = useState("waiting");

  const [isStaffLoggedIn, setIsStaffLoggedIn] = useState(JSON.parse(localStorage.getItem("isStaffLoggedIn")) || false);

  const [serviceTime, setServiceTime] = useState("");

  const [timeInput, setTimeInput] = useState(JSON.parse(localStorage.getItem("timeInput")) || "");

  const [institutionName, setInstitutionName] = useState(JSON.parse(localStorage.getItem("institutionName")) || "");

  const [createName, setCreateName] = useState("");

  const [createEmail, setCreateEmail] = useState("");

  const [createRole, setCreateRole] = useState("");

  const [createPass, setCreatePass] = useState("");
  
  const [createConfirmPass, setCreateConfirmPass] = useState("");

  const [savedStaffData, setSavedStaffData] = useState(JSON.parse(localStorage.getItem("savedStaffData")) || null);


   useEffect(() => {
      localStorage.setItem("savedStaffData", JSON.stringify(savedStaffData));
   }, [savedStaffData]);


  useEffect(() => {
     localStorage.setItem("queue", JSON.stringify(queue))
  }, [queue]); 


  useEffect(() => {
      localStorage.setItem("completed", JSON.stringify(completed))
  }, [completed]);


  useEffect(() => {
      if (new Date().toLocaleDateString() !== new Date(startedAt).toLocaleDateString()) {
           setStartedAt(Date.now());
           setQueue([]);
           setCompleted([]);
      }
  }, [startedAt]);


  useEffect(() => {
     localStorage.setItem("startedAt", JSON.stringify(startedAt))
  }, [startedAt]);


  useEffect(() => {
     localStorage.setItem("history", JSON.stringify(history))
  }, [history]);


  useEffect(() => {
     localStorage.setItem("isStaffLoggedIn", JSON.stringify(isStaffLoggedIn))
  }, [isStaffLoggedIn]);


  useEffect(() => {
    localStorage.setItem("timeInput", JSON.stringify(timeInput));
  }, [timeInput]);


  useEffect(() => {
     localStorage.setItem("institutionName", JSON.stringify(institutionName))
  }, [institutionName]);

  let account;

  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  });

  const serving = queue?.find(item => item.status === "serving");

  const servingCurrently =  serving?.ticketNumber;

  const joinedQueueAt = Date.now();

  const peopleOnQueue = queue?.filter(item => item.status === "waiting" && item.joinedAt < item.ticketNumber.joinedAt).length; 

  const numOfPeopleWaiting = queue?.filter(item => item.status === "waiting").length;


  function deleteTicket(customerTicket) {
     setQueue(prev => prev.filter(item => item.id !== customerTicket.id));
  }


    const waiting = queue?.filter(item => item.status === "waiting");

    const skipped = queue?.filter(item => item.status === "skipped");

    const numOfCompleted = completed?.length;


   const next = waiting?.[0];

   function servingStatus(next) {
    setQueue(prev => prev.map(item => {
      if (item.id === next?.id) {
        return {...item, status: "serving"};
      } else {
        return item;
      }
    }));
    } 


    function completedStatus(serving) {
    setQueue(prev => prev.map(item => {
      if (item.id === serving.id) {
        return {...item, status: "completed"};
      } else {
        return item;
      }
    }));
    } 


    function skipTicket(serving) {
       setQueue(prev => prev.map(item => {
         if (item.id === serving.id) {
          return {...item, status: "skipped"}
         } else {
          return item;
         }
       }));
    }


   const recallSkipped = skipped?.[0];

   function callSkipped(recallSkipped) {
     setQueue(prev => prev.map(item => {
         if (item.id === recallSkipped.id) {
            return {...item, status: "serving"} 
         } else {
          return item;
         }
     }));
   }


   function deleteSkipped(recallSkipped) {
      setQueue(prev => prev.filter(item => item.id !== recallSkipped.id));
   } 

  
   function addToCompleted() {
      setCompleted(prev => 
        [...(prev || []), {...serving, status: "completed", historyDate: new Date().toLocaleDateString()}]
      );
   }


   function handleCompletedHistory() {
     setHistory(prev => 
        [...(prev || []), {...serving, status: "completed", historyDate: new Date().toLocaleDateString()}]
     );
   }


   function handleSkippedHistory() {
       setHistory(prev => 
        [...(prev || []), {...recallSkipped, status: "skipped", historyDate: new Date().toLocaleDateString()}]
     );
   }


   const compledtedOnHistory = history?.filter(item => item.status === "completed").length;

   const skippedOnHistory = history?.filter(item => item.status === "skipped").length;


   const noOfPeopleAhead = waiting?.map(item => item.peopleAhead).length;
  
   const estimatedWait = Number(timeInput) * noOfPeopleAhead;
   
 

  return (
       <div className="flex justify-center items-start min-h-screen w-full bg-indigo-50 p-6 overflow-x-hidden">
         <Routes>
             <Route path="/" element={ <Home /> } />
             <Route path="/chooseview" element={ <ChooseView /> } /> 
             <Route path="/institution" element={ <InstitutionSetup institutionName={institutionName} setInstitutionName={setInstitutionName} currentDate={currentDate} /> } />
             <Route path="/customerqueue" element={ <CustomerQueue ticketCounter={ticketCounter} setTicketCounter={setTicketCounter} ticketInput={ticketInput} setTicketInput={setTicketInput} queue={queue} setQueue={setQueue} servingCurrently={servingCurrently} joinedQueueAt={joinedQueueAt} peopleOnQueue={peopleOnQueue} deleteTicket={deleteTicket} ticketStatus={ticketStatus} numOfPeopleWaiting={numOfPeopleWaiting} estimatedWait={estimatedWait} /> } />
             <Route path="/dashboard" element={ isStaffLoggedIn === true ? <StaffDashboard institutionName={institutionName} isStaffLoggedIn={isStaffLoggedIn} currentDate={currentDate} numOfPeopleWaiting={numOfPeopleWaiting} serving={serving} servingStatus={servingStatus} completedStatus={completedStatus} waiting={waiting} completed={completed} queue={queue} numOfCompleted={numOfCompleted} next={next} skipped={skipped} skipTicket={skipTicket} callSkipped={callSkipped} recallSkipped={recallSkipped} deleteSkipped={deleteSkipped} handleCompletedHistory={handleCompletedHistory} handleSkippedHistory={handleSkippedHistory} history={history} compledtedOnHistory={compledtedOnHistory} addToCompleted={addToCompleted} skippedOnHistory={skippedOnHistory} serviceTime={serviceTime} setServiceTime={setServiceTime} savedStaffData={savedStaffData} setTimeInput={setTimeInput} /> : <Navigate to="/stafflogin" /> } />
             <Route path="/stafflogin" element={ <StaffLogin institutionName={institutionName} setIsStaffLoggedIn={setIsStaffLoggedIn} staffPassword={staffPassword} setStaffPassword={setStaffPassword} staffEmail={staffEmail} setStaffEmail={setStaffEmail} savedStaffData={savedStaffData} /> } />
             <Route path="/forgetpassword" element={ <ForgetPassword account={account} savedStaffData={savedStaffData} setSavedStaffData={setSavedStaffData} /> } />
             <Route path="/createaccount" element={ <CreateAccount createName={createName} setCreateName={setCreateName} createEmail={createEmail} setCreateEmail={setCreateEmail} createRole={createRole} setCreateRole={setCreateRole} createPass={createPass} setCreatePass={setCreatePass} createConfirmPass={createConfirmPass} setCreateConfirmPass={setCreateConfirmPass} setSavedStaffData={setSavedStaffData} account={account} /> } />    
         </Routes>
       </div>
  );
}


