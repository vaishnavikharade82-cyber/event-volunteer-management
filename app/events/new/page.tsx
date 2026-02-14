"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function NewEventPage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);

  // ✅ Get current logged in user
  // Get current logged in user
const {
  data: { session },
} = await supabase.auth.getSession();

const user = session?.user;

if (!user) {
  alert("You must be logged in");
  setLoading(false);
  router.push("/login");
  return;
}

  // ✅ Insert event WITH user_id
  const { error } = await supabase.from("events").insert([
    {
      title,
      location,
      date,
      description,
      user_id: user.id, // ⭐ VERY IMPORTANT
    },
  ]);

  setLoading(false);

  if (error) {
    alert(error.message);
    return;
  }

  alert("Event created successfully!");
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

          <button className="submit-btn" disabled={loading}>
            {loading ? "Creating..." : "Create Event"}
          </button>
        </form>
      </div>
    </div>
  );
}