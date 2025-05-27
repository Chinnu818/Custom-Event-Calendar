import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export function useEvents() {
  const [events, setEvents] = useState([]);

  const addEvent = (event) => {
    setEvents((prev) => [
      ...prev,
      { ...event, id: uuidv4(), date: event.date.toISOString() },
    ]);
  };

  return { events, addEvent };
}
