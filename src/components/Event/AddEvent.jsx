import React, { useContext, useState } from "react";
import GlobalContext from "../../contexts/GlobalContext";
const labelClass = ["indigo", "gray", "green", "blue", "red", "purple"];
// import dayjs from "dayjs";

export default function AddEvent() {
  const { setShowAddEvent, daySelected } = useContext(GlobalContext);
  const { dispatchCalEvent, selectedEvent }= useContext(GlobalContext);
  const [description, setDescription] = useState("");
  //const [selectedLabel, setSelectedLabel] = useState(labelClass[0]);
  const [title, setTitle] = useState("");
  const [selectedLabel, setSelectedLabel] = useState(
    selectedEvent
      ? labelClass.find((lbl) => lbl === selectedEvent.label)
      : labelClass[0]
  );
  const handleSubmit = (e) => {
    //console.log(e);
    e.preventDefault();
    const calendarEvent = {
      title,
      description,
      label: selectedLabel,
      day: daySelected.valueOf(),
      id: selectedEvent ? selectedEvent.id : Date.now(),
    };
    if (selectedEvent) {
      dispatchCalEvent({ type: "update", payload: calendarEvent });
    } else {
      dispatchCalEvent({ type: "push", payload: calendarEvent });
    }

    setShowAddEvent(false);
  
    // const formData = new FormData(e.currentTarget)
  }

  // debug
  // const currentDate = daySelected ? daySelected : dayjs();

  // end
  return (
    <div className="h-screen w-full fixed left-0 top-0 flex justify-center items-center">
      <form className="bg-white rounded-lg shadow-2xl w-1/4" onSubmit={handleSubmit}>
        <header className="eventHead px-4 py-2 flex justify-between items-center">
          <span className="material-icons-outlined text-gray-400">
            drag_handle
          </span>
          <div>
            {selectedEvent && (
              <span
                onClick={() => {
                  dispatchCalEvent({
                    type: "delete",
                    payload: selectedEvent,
                  });
                  setShowAddEvent(false);
                }}
                className="material-icons-outlined text-gray-400 cursor-pointer">
                delete
              </span>)}
          <button onClick={() => setShowAddEvent(false)}>
            <span className="material-icons-outlined text-gray-400">close</span>
          </button>
          </div>
        </header>
        <div className="p-3">
          <div className="grid grid-cols-1/5 items-end gap-y-7">
            <div></div>
            <input
              type="text"
              name="title"
              placeholder="Add Title"
              value={title}
              required
              className="pt-3 border-0 text-gray-600 text-xl font-semibold pb-2 w-full border-b-2 borderColorGray200 focus:outline-none focus:ring-0 borderColorBlue500"
              onChange={(e) => setTitle(e.target.value)}
            />
            <span className="material-icons-outlined text-gray-400">
              schedule
            </span>
            <p>{daySelected.format("dddd, MMMM DD")}</p>
            <span className="material-icons-outlined text-gray-400">
              segment
            </span>
            <input
              type="text"
              name="description"
              placeholder="Add a description"
              value={description}
              required
              className="pt-3 border-0 text-gray-600  font-semibold pb-2 w-full"
              onChange={(e) => setDescription(e.target.value)}
            />
            <span className="material-icons-outlined text-gray-400">
              bookmark_border
            </span>

            <div className="flex gap-x-2">
              {labelClass.map((lblClass, i) => (
                <span
                  key={i}
                  onClick={() => setSelectedLabel(lblClass)}
                  className={`bg-${lblClass}-500 w-6 h-6 rounded-full flex items-center justify-center cursor-pointer`}
                >
                  {selectedLabel === lblClass && (
                    <span className="material-icons-outlined text-white text-sm">
                      check
                    </span>
                  )}
                </span>
              ))}
            </div>
          </div>
        </div>
        <footer className="flex justify-end w-100 border-t p-3 mt-5">
          <button
            type="submit"
            onClick={handleSubmit}
            className="bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded text-white"
          >
            Save
          </button>
        </footer>
        </form>
     
      
      { <div className="bg-purple-500">
        <div className="bg-red-500">
          <div className="bg-indigo-500 ">
            <div className="bg-gray-500">
              <div className="bg-blue-500">
                <div className="bg-green-500"></div>
              </div>
            </div>
          </div>
        </div>
                  </div>}
      
      </div>  
  );
}

