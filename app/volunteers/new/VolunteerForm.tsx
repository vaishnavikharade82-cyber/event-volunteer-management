"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function VolunteerForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // eventId is UUID (string)
  const eventId = searchParams.get("eventId");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!eventId) {
      alert("Event ID missing");
      return;
    }

    setLoading(true);

    // ✅ PHASE C — GET LOGGED-IN USER
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      alert("You must be logged in");
      setLoading(false);
      return;
    }

    // ✅ INSERT WITH user_id (REQUIRED FOR RLS)
    const { error } = await supabase
      .from("volunteers")
      .insert([
        {
          name,
          email,
          phone,
          event_id: eventId, // UUID
          user_id: user.id,  // 🔐 AUTH LINK
        },
      ]);

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Volunteer registered successfully!");
    router.push("/events");
  };

  return (
    <div className="form-wrapper">
      <div className="form-card">
        <h1>Register Volunteer</h1>
        <p>Fill the details below</p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter full name"
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
            />
          </div>

          <div className="form-group">
            <label>Phone</label>
            <input
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter phone number"
            />
          </div>

          <button
            type="submit"
            className="submit-btn"
            disabled={loading}
          >
            {loading ? "Registering..." : "Register Volunteer"}
          </button>
        </form>
      </div>
    </div>
  );
}