"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

type Volunteer = {
  id: string;
  name: string;
  email: string;
  phone: string;
  event_id: string | null;
};

type Event = {
  id: string;
  title: string;
};

export default function VolunteersPage() {
  const [volunteers, setVolunteers] = useState<Volunteer[]>([]);
  const [events, setEvents] = useState<Event[]>([]);

  /* ==============================
     STEP 1️⃣ - Load Data
  ============================== */
  const loadData = async () => {
    const { data: volunteersData } = await supabase
      .from("volunteers")
      .select("*");

    const { data: eventsData } = await supabase
      .from("events")
      .select("id, title");

    if (volunteersData) setVolunteers(volunteersData);
    if (eventsData) setEvents(eventsData);
  };

  useEffect(() => {
    loadData();
  }, []);

  /* ==============================
     STEP 2️⃣ - Delete Volunteer
  ============================== */
  const handleDelete = async (id: string) => {
    await supabase.from("volunteers").delete().eq("id", id);
    setVolunteers(volunteers.filter((v) => v.id !== id));
  };

  /* ==============================
     STEP 3️⃣ - Assign Event
  ============================== */
  
/* ===============================
   STEP 1️⃣ - Assign Event Properly
================================ */
const handleAssign = async (volunteerId: string, eventId: string) => {
  if (!eventId) return;

  const { error } = await supabase
    .from("volunteers")
    .update({ event_id: eventId })
    .eq("id", volunteerId);

  if (error) {
    alert("❌ Failed to assign event");
    console.error(error);
    return;
  }

  // ✅ Update UI instantly without reload
  setVolunteers((prev) =>
    prev.map((v) =>
      v.id === volunteerId ? { ...v, event_id: eventId } : v
    )
  );
};
  /* ==============================
     STEP 4️⃣ - Common Button Style
  ============================== */
  const buttonStyle = {
    padding: "10px 18px",
    borderRadius: "12px",
    border: "none",
    background: "linear-gradient(135deg, #2563eb, #1e40af)",
    color: "white",
    fontWeight: "600",
    cursor: "pointer",
    boxShadow: "0 4px 12px rgba(37, 99, 235, 0.4)",
    transition: "0.2s ease",
  };

  return (
    <div
      style={{
        padding: "40px",
        background: "#f3f4f6",
        minHeight: "100vh",
      }}
    >
      <h1 style={{ fontSize: "32px", marginBottom: "30px" }}>
        👥 Volunteers
      </h1>

      {volunteers.map((volunteer) => {
        const assignedEvent = events.find(
          (e) => e.id === volunteer.event_id
        );

        return (
          <div
            key={volunteer.id}
            style={{
              background: "white",
              padding: "20px",
              borderRadius: "15px",
              marginBottom: "20px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              boxShadow: "0 5px 15px rgba(0,0,0,0.08)",
            }}
          >
            {/* LEFT SIDE INFO */}
            <div>
              <h3 style={{ marginBottom: "6px" }}>
                👤 {volunteer.name}
              </h3>
              <p>📧 {volunteer.email}</p>
              <p>📞 {volunteer.phone}</p>

              {assignedEvent ? (
                <p style={{ fontWeight: "bold", marginTop: "6px" }}>
                  📅 Event: {assignedEvent.title}
                </p>
              ) : (
                <div
                  style={{
                    marginTop: "12px",
                    display: "flex",
                    gap: "14px",
                    alignItems: "center",
                  }}
                >
                  <select
                    defaultValue=""
                    onChange={(e) =>
                      handleAssign(volunteer.id, e.target.value)
                    }
                    style={{
                      ...buttonStyle,
                      appearance: "none",
                      minWidth: "200px",
                    }}
                  >
                    <option
                      value=""
                      disabled
                      style={{ color: "black" }}
                    >
                      ✨ Select Event
                    </option>

                    {events.map((event) => (
                      <option
                        key={event.id}
                        value={event.id}
                        style={{
                          color: "black",
                          background: "white",
                        }}
                      >
                        {event.title}
                      </option>
                    ))}
                  </select>

                  <span style={{ color: "red", fontWeight: "600" }}>
                    ⚠ Not Assigned
                  </span>
                </div>
              )}
            </div>

            {/* DELETE BUTTON */}
            <button
              onClick={() => handleDelete(volunteer.id)}
              style={{
                ...buttonStyle,
                background:
                  "linear-gradient(135deg, #ef4444, #dc2626)",
                boxShadow:
                  "0 4px 12px rgba(239, 68, 68, 0.4)",
              }}
            >
              🗑 Delete
            </button>
          </div>
        );
      })}
    </div>
  );
}