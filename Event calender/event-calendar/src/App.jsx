import React, { useState, useEffect } from "react";
import EventModal from "./EventModal";
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, isSameDay } from "date-fns";

const App = () => {
  // Load events from localStorage (parse date strings to Date objects)
  const [events, setEvents] = useState(() => {
    const stored = localStorage.getItem("events");
    if (stored) {
      return JSON.parse(stored).map((e) => ({
        ...e,
        date: new Date(e.date),
      }));
    }
    return [];
  });

  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [modalEvent, setModalEvent] = useState(null);

  // Save events to localStorage on change
  useEffect(() => {
    localStorage.setItem("events", JSON.stringify(events));
  }, [events]);

  // Generate calendar days for current month (including prev/next month days to fill weeks)
  const generateCalendarDays = () => {
    const startMonth = startOfMonth(currentMonth);
    const endMonth = endOfMonth(currentMonth);
    const startDate = startOfWeek(startMonth);
    const endDate = endOfWeek(endMonth);

    const days = [];
    let day = startDate;
    while (day <= endDate) {
      days.push(day);
      day = addDays(day, 1);
    }
    return days;
  };

  // Find events for a given day
  const eventsForDay = (day) =>
    events.filter((e) => isSameDay(e.date, day));

  // Open modal to add event for clicked day
  const handleDayClick = (day) => {
    setSelectedDate(day);
    setModalEvent(null);
  };

  // Open modal to edit existing event
  const handleEventClick = (event) => {
    setModalEvent(event);
    setSelectedDate(event.date);
  };

  // Save event (add or edit)
  const handleSaveEvent = (eventData) => {
    setEvents((prev) => {
      if (eventData.id) {
        // Update existing event
        return prev.map((e) => (e.id === eventData.id ? eventData : e));
      } else {
        // Add new event with unique id
        return [...prev, { ...eventData, id: Date.now() }];
      }
    });
  };

  // Delete event
  const handleDeleteEvent = (id) => {
    setEvents((prev) => prev.filter((e) => e.id !== id));
  };

  // Navigate months
  const prevMonth = () => setCurrentMonth(addDays(startOfMonth(currentMonth), -1));
  const nextMonth = () => setCurrentMonth(addDays(endOfMonth(currentMonth), 1));

  const calendarDays = generateCalendarDays();

  return (
    <div style={{ maxWidth: 800, margin: "auto", padding: 20 }}>
      <h1>Event Calendar</h1>

      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
        <button onClick={prevMonth}>{"<"}</button>
        <h2>{format(currentMonth, "MMMM yyyy")}</h2>
        <button onClick={nextMonth}>{">"}</button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 5 }}>
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
          <div key={d} style={{ fontWeight: "bold", textAlign: "center" }}>{d}</div>
        ))}

        {calendarDays.map((day) => {
          const dayEvents = eventsForDay(day);
          const isToday = isSame
