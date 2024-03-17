import React, { useContext,useState,useEffect } from "react";
import dayjs from "dayjs";
import GlobalContext from "../contexts/GlobalContext";

export default function Day({ day, rowIdx }) {
  function getCurrentDayClass() {
    return day.format("DD-MM-YY") === dayjs().format("DD-MM-YY")
      ? "todayDate text-white rounded-full w-7"
      : "";
  }
  const [dayEvents, setDayEvents] = useState([]);
  const { setDaySelected, setShowAddEvent,filteredEvents,
    setSelectedEvent } = useContext(GlobalContext);
    useEffect(() => {
      const events = filteredEvents.filter(
        (evt) =>
          dayjs(evt.day).format("DD-MM-YY") === day.format("DD-MM-YY")
      );
      setDayEvents(events);
    }, [filteredEvents, day]);
  return (
    <div className=" border calendarBorder flex flex-col">
      <header className="flex flex-col items-center">
        {rowIdx === 0 && (
          <p className="text-sm mt-1">{day.format("ddd").toUpperCase()}</p>
        )}
        <p className={`text-sm p-1 my-1 text-center ${getCurrentDayClass()}`}>
          {day.format("DD")}
        </p>
      </header>
      <div
        className="flex-1 cursor-pointer"
        onClick={() => {
          setDaySelected(day);
          setShowAddEvent(true);
        }}
      >{dayEvents.map((evt, idx) => (
          <div
            key={idx}
            onClick={() => setSelectedEvent(evt)}
            className={`bg-${evt.label}-200 p-1 mr-3 text-gray-600 text-sm rounded mb-1 truncate`}
          >
            {evt.title}
          </div>
      ))}
      </div>
    </div>
  );
}
