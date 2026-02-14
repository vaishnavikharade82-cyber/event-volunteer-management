"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

type Volunteer = {
  id: string;
  name: string;
  email: string;
  phone: string;
};

export default function EventVolunteersPage() {
  const params = useParams();
  const eventId = params.id as string;

  const [volunteers, setVolunteers] = useState<Volunteer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVolunteers = async () => {
      const { data, error } = await supabase
        .from("volunteers")
        .select("id, name, email, phone")
        .eq("event_id", eventId);

      if (!error && data) {
        setVolunteers(data);
      }

      setLoading(false);
    };

    fetchVolunteers();
  }, [eventId]);

  return (
    <div className="events-page">
      <div className="events-header">
        <div>
          <h1>Assigned Volunteers</h1>
          <p>Volunteers registered for this event</p>
        </div>
      </div>

      {loading && <p>Loading volunteers...</p>}

      {!loading && volunteers.length === 0 && (
        <p>No volunteers assigned yet.</p>
      )}

      <div className="events-list">
        {volunteers.map((v) => (
          <div key={v.id} className="event-card">
            <h3>{v.name}</h3>
            <p className="meta">📧 {v.email}</p>
            <p className="meta">📞 {v.phone}</p>
          </div>
        ))}
      </div>
    </div>
  );
}