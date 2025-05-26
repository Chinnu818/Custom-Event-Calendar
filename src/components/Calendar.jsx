import React, { useState } from "react";
import { addMonths, subMonths } from "date-fns";
import { generateCalendarDays, formatMonthYear } from "../utils/dateUtils";
import DayCell from "./DayCell";

export default function Calendar({ onDateClick }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const days = generateCalendarDays(currentDate);

  const handlePrevMonth = () => setCurrentDate(subMonths(currentDate, 1));
  const handleNextMonth = () => setCurrentDate(addMonths(currentDate, 1));

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <button onClick={handlePrevMonth}>‹</button>
        <h2>{formatMonthYear(currentDate)}</h2>
        <button onClick={handleNextMonth}>›</button>
      </div>

      <div className="calendar-grid">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
          <div key={d} className="day-name">{d}</div>
        ))}
        {days.map((day, index) => (
          <DayCell key={index} date={day} onClick={onDateClick} />
        ))}
      </div>
    </div>
  );
}
