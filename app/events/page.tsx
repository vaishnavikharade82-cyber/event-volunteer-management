"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";

type EventType = {
  id: string;
  title: string;
  location: string;
  date: string;
  description: string;
};

export default function EventsPage() {
  const [events, setEvents] = useState<EventType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      // ✅ Check if user logged in
      const { data } = await supabase.auth.getSession();

      if (!data.session) {
        window.location.href = "/login";
        return;
      }

      // ✅ Fetch events
      const { data: eventsData, error } = await supabase
        .from("events")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && eventsData) {
        setEvents(eventsData);
      }

      setLoading(false);
    };

    init();
  }, []);

  if (loading) return <p style={{ padding: 20 }}>Loading...</p>;

return (
  <div className="events-container">
    <div className="events-header">
      <div>
        <h1>Discover Events</h1>
        <p>All events you have created</p>
      </div>

      <Link href="/events/new">
        <button className="create-btn">+ Create Event</button>
      </Link>
    </div>

    {events.length === 0 && <p>No events created yet.</p>}

    {events.map((event) => (
      <div key={event.id} className="event-card">
        <h3>{event.title}</h3>
        <p>📍 {event.location}</p>
        <p>📅 {event.date}</p>
        <p>{event.description}</p>

        <div className="event-actions">
          <Link href={`/volunteers/new?eventId=${event.id}`}>
            <button className="assign-btn">👤 Assign Volunteer</button>
          </Link>

          <button className="delete-btn">
            🗑 Delete
          </button>
        </div>
      </div>
    ))}
  </div>
);
}