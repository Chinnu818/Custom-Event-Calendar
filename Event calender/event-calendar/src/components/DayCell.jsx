import React from "react";
import { isToday, format } from "date-fns";

export default function DayCell({ date, onClick }) {
  return (
    <div
      className={`day-cell ${isToday(date) ? "today" : ""}`}
      onClick={() => onClick(date)}
    >
      <div className="day-number">{format(date, "d")}</div>
    </div>
  );
}
