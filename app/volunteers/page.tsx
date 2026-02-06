"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function VolunteersPage() {
  const [volunteers, setVolunteers] = useState<any[]>([]);
  const [events, setEvents] = useState<any[]>([]);

  // ✅ LOAD volunteers + events
  useEffect(() => {
    setVolunteers(
      JSON.parse(localStorage.getItem("volunteers") || "[]")
    );
    setEvents(
      JSON.parse(localStorage.getItem("events") || "[]")
    );
  }, []);

  const handleDelete = (id: number) => {
    const updated = volunteers.filter((v) => v.id !== id);
    setVolunteers(updated);
    localStorage.setItem("volunteers", JSON.stringify(updated));
  };

  return (
    <div className="volunteers-page">
      <div className="volunteers-header">
        <h1>Volunteers</h1>

        <Link href="/volunteers/new">
          <button className="add-btn">➕ Add Volunteer</button>
        </Link>
      </div>

      <div className="volunteer-list">
        {volunteers.map((volunteer) => {
          const assignedEvent = events.find(
            (e) => e.id === volunteer.eventId
          );

          return (
            <div key={volunteer.id} className="volunteer-card">
              <div className="volunteer-info">
                <h3>{volunteer.name}</h3>
                <p>📧 {volunteer.email}</p>
                <p>📞 {volunteer.phone}</p>

                {/* ✅ SHOW EVENT */}
                {assignedEvent && (
                  <p>📅 Event: {assignedEvent.title}</p>
                )}
              </div>

              <button
                className="delete-btn"
                onClick={() => handleDelete(volunteer.id)}
              >
                🗑 Delete
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}