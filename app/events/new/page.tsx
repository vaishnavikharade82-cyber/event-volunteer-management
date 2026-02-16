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

  // ✅ NEW: AI Loading State
  const [aiLoading, setAiLoading] = useState(false);

  // ✅ NEW: Generate AI Description
  const generateAIDescription = async () => {
    if (!title) {
      alert("Please enter event title first");
      return;
    }

    setAiLoading(true);

    const res = await fetch("/api/gemini", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: `Write a professional event description for an event titled "${title}" happening at ${location}.`,
      }),
    });

    const data = await res.json();
    setAiLoading(false);

    if (data.result) {
      setDescription(data.result);
    } else {
      alert("AI generation failed");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

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

    const { error } = await supabase.from("events").insert([
      {
        title,
        location,
        date,
        description,
        user_id: user.id,
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

            {/* ✅ NEW AI BUTTON */}
            <button
              type="button"
              onClick={generateAIDescription}
              style={{
                marginBottom: "10px",
                padding: "6px 12px",
                background: "#7c3aed",
                color: "white",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              {aiLoading ? "Generating..." : "✨ Generate with AI"}
            </button>

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