import React, { useState } from "react";
import Calendar from "./components/Calendar";
import EventModal from "./components/EventModal"; // Already created
import { useEvents } from "./hooks/useEvents"; // Already created

function App() {
  const { events, addEvent } = useEvents();
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateClick = (date) => {
    setSelectedDate(date);
  };

  const closeModal = () => setSelectedDate(null);

  return (
    <div className="App">
      <h1>Event Calendar</h1>
      <Calendar onDateClick={handleDateClick} events={events} />
      {selectedDate && (
        <EventModal
          date={selectedDate}
          onClose={closeModal}
          onSave={addEvent}
        />
      )}
    </div>
  );
}

export default App;
