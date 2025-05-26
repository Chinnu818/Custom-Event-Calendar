import React, { useState } from "react";


const EventModal = ({ event, onClose, onSave, onDelete, selectedDate }) => {
  const [title, setTitle] = useState(event ? event.title : "");
  const [description, setDescription] = useState(event ? event.description : "");
  const [color, setColor] = useState(event ? event.color : "#607d8b");
  const [date, setDate] = useState(event ? event.date : selectedDate);
  const [time, setTime] = useState(event ? event.time : "");

  const handleSubmit = () => {
    if (!title || !date) return alert("Title and date are required");
    onSave({
      ...event,
      id: event?.id || Date.now(),
      title,
      description,
      color,
      date,
      time,
    });
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>{event ? "Edit Event" : "Add Event"}</h2>

        <input
          type="text"
          placeholder="Event Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />

        <div className="modal-actions">
          <button onClick={handleSubmit}>{event ? "Save" : "Add"}</button>
          <button onClick={onClose}>Cancel</button>
          {event && (
            <button onClick={() => { onDelete(event.id); onClose(); }} style={{ backgroundColor: "red", color: "white" }}>
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventModal;
