"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function VolunteerForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // ✅ NEW: read eventId from URL
  const eventId = searchParams.get("eventId");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newVolunteer = {
      id: Date.now(),
      name,
      email,
      phone,
      // ✅ NEW: save eventId with volunteer
      eventId: eventId ? Number(eventId) : null,
    };

    const existing = JSON.parse(
      localStorage.getItem("volunteers") || "[]"
    );

    localStorage.setItem(
      "volunteers",
      JSON.stringify([...existing, newVolunteer])
    );

    router.push("/volunteers");
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

          <button type="submit" className="submit-btn">
            Register Volunteer
          </button>
        </form>
      </div>
    </div>
  );
}