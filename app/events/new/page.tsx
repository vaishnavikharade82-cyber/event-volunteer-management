"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewEventPage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newEvent = {
      id: Date.now(),
      title,
      location,
      date,
      description,
    };

    // ✅ FIXED LINE (array, not object)
    const storedEvents =
      JSON.parse(localStorage.getItem("events") || "[]");

    localStorage.setItem(
      "events",
      JSON.stringify([...storedEvents, newEvent])
    );

    router.push("/events");
  };

  return (
    <div className="create-event-page">
      <div className="event-form-card">
        <h1>Create New Event</h1>
        <p className="subtitle">
          Fill in the details below to create your event
        </p>

        <form className="event-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Event Title</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              placeholder="Enter event title"
            />
          </div>

          <div className="form-group">
            <label>Location</label>
            <input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
              placeholder="Enter location"
            />
          </div>

          <div className="form-group">
            <label>Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              placeholder="Describe the event..."
            />
          </div>

          <button className="submit-btn">Create Event</button>
        </form>
      </div>
    </div>
  );
} 