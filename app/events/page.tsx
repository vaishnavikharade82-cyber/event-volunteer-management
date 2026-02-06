"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type EventType = {
  id: number;
  title: string;
  location: string;
  date: string;
  description: string;
};

export default function EventsPage() {
  const [events, setEvents] = useState<EventType[]>([]);

  // ✅ LOAD EVENTS FROM LOCALSTORAGE
  useEffect(() => {
    const storedEvents = JSON.parse(
      localStorage.getItem("events") || "[]"
    );
    setEvents(storedEvents);
  }, []);

  // ✅ DELETE EVENT (also remove from localStorage)
  const handleDelete = (id: number) => {
    const updatedEvents = events.filter((e) => e.id !== id);
    setEvents(updatedEvents);
    localStorage.setItem("events", JSON.stringify(updatedEvents));
  };

  return (
    <div className="events-page">
      <div className="events-header">
        <div>
          <h1>Discover Events</h1>
          <p>All events you have created</p>
        </div>

        <Link href="/events/new">
          <button className="create-btn">+ Create Event</button>
        </Link>
      </div>

      <div className="events-list">
        {events.length === 0 && (
          <p style={{ marginTop: "20px" }}>No events created yet.</p>
        )}

        {events.map((event) => (
          <div key={event.id} className="event-card">
            <h3>{event.title}</h3>

            <p className="meta">📍 {event.location}</p>
            <p className="meta">📅 {event.date}</p>
            <p className="description">{event.description}</p>

            {/* BUTTON ROW */}
            <div className="event-actions">
              <Link href={`/volunteers/new?eventId=${event.id}`}>
                <button className="assign-btn">
                  👤 Assign Volunteer
                </button>
              </Link>

              <button
                className="delete-btn"
                onClick={() => handleDelete(event.id)}
              >
                🗑 Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}