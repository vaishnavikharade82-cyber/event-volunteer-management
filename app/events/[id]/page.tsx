"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

type EventType = {
  id: string;
  title: string;
  location: string;
  date: string;
  description: string;
};

type VolunteerType = {
  id: string;
  name: string;
  email: string;
  phone: string;
};

export default function EventDetailsPage() {
  const params = useParams();
  const eventId = params.id as string;

  const [event, setEvent] = useState<EventType | null>(null);
  const [volunteers, setVolunteers] = useState<VolunteerType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEventDetails = async () => {
      setLoading(true);

      // ✅ Fetch event
      const { data: eventData, error: eventError } = await supabase
        .from("events")
        .select("*")
        .eq("id", eventId)
        .single();

      if (eventError) {
        console.error(eventError);
        setLoading(false);
        return;
      }

      setEvent(eventData);

      // ✅ Fetch volunteers for this event
      const { data: volunteerData, error: volunteerError } = await supabase
        .from("volunteers")
        .select("id, name, email, phone")
        .eq("event_id", eventId);

      if (volunteerError) {
        console.error(volunteerError);
      } else {
        setVolunteers(volunteerData || []);
      }

      setLoading(false);
    };

    fetchEventDetails();
  }, [eventId]);

  if (loading) {
    return <p style={{ padding: "20px" }}>Loading event...</p>;
  }

  if (!event) {
    return <p style={{ padding: "20px" }}>Event not found</p>;
  }

  return (
    <div className="event-details-page">
      <div className="event-details-card">
        <h1>{event.title}</h1>

        <p className="meta">📍 {event.location}</p>
        <p className="meta">📅 {event.date}</p>

        <p className="description">{event.description}</p>

        <hr />

        <h2>👥 Assigned Volunteers</h2>

        {volunteers.length === 0 ? (
          <p>No volunteers assigned yet.</p>
        ) : (
          <ul className="volunteer-list">
            {volunteers.map((v) => (
              <li key={v.id}>
                <strong>{v.name}</strong>
                <br />
                📧 {v.email}
                <br />
                📞 {v.phone}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}