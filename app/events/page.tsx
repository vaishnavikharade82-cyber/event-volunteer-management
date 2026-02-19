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
  type VolunteerType = {
  id: string;
  name: string;
  skills: string;
};

const [volunteers, setVolunteers] = useState<VolunteerType[]>([]);
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

        // Fetch volunteers
const { data: volunteerData } = await supabase
  .from("volunteers")
  .select("*");

if (volunteerData) {
  setVolunteers(volunteerData);
}

      if (!error && eventsData) {
        setEvents(eventsData);
      }

      setLoading(false);
    };

    

    init();
  }, []);
const aiSuggestBestVolunteer = async (event: EventType) => {
  try {
    const volunteerList = volunteers
      .map((v) => `Name: ${v.name}, Skills: ${v.skills}`)
      .join("\n");

    const res = await fetch("/api/gemini", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: `
Event:
Title: ${event.title}
Description: ${event.description}

Volunteers:
${volunteerList}

Suggest the best volunteer for this event and explain briefly.
Return only volunteer name and reason.
        `,
      }),
    });

    const data = await res.json();
    alert(data.text);
  } catch (error) {
    alert("AI matching failed");
  }
};
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
          <button
  onClick={() => aiSuggestBestVolunteer(event)}
  style={{
    padding: "6px 12px",
    background: "#7c3aed",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    marginLeft: "10px",
  }}
>
  🤖 AI Suggest Best Volunteer
</button>

          <button className="delete-btn">
            🗑 Delete
          </button>
        </div>
      </div>
    ))}
  </div>
);
}