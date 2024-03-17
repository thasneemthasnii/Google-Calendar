import React, { useState, useContext, useEffect } from "react";
import "./App.css";
import { HomeHeader } from "./components/header";
import Sidebar from "./components/Sidebar";
import Month from "./components/Month";
import { getMonth } from "./util";
import AddEvent from "./components/Event/AddEvent";
import GlobalContext from "./contexts/GlobalContext";
import { initializeApp } from 'firebase/app';
import { useAuthState } from "react-firebase-hooks/auth";
import SignIn from './components/SignIn'
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCnk15ymakdXQqFRT-4nUpIabCgXdx_EgA",
  authDomain: "calender-ff2d0.firebaseapp.com",
  databaseURL: "https://calender-ff2d0-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "calender-ff2d0",
  storageBucket: "calender-ff2d0.appspot.com",
  messagingSenderId: "307814161708",
  appId: "1:307814161708:web:c83c01bc53dc561a61e089",
  measurementId: "G-G6DFD7YNLY"
};

const app = initializeApp(firebaseConfig)
const auth = getAuth()
const analytics = getAnalytics(app);

function App() {
  const [currentMonth, setCurrentMonth] = useState(getMonth());
  const { monthIndex, showAddEvent } = useContext(GlobalContext);

  const [user] = useAuthState(auth);

  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex));
  }, [monthIndex]);

  return (
    <>
      {user ? (
        <>
          <HomeHeader />
          <React.Fragment>
            {showAddEvent && <AddEvent />}
            <div className="h-screen flex flex-col calendarH">
              <h1 className="text-2xl font-bold hover:underline"></h1>
              <div className="flex flex-1">
                <Sidebar />
                <Month month={currentMonth} />
              </div>
            </div>
          </React.Fragment>
        </>
      ): (
        <SignIn />
      )}
    </>
  );
}

export default App;
