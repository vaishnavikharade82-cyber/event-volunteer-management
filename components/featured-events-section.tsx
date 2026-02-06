import Link from "next/link";

const events = [
  {
    title: "NGO Volunteering Drive",
    date: "18 Apr 2026",
    location: "Mumbai",
  },
  {
    title: "College Tech Fest",
    date: "10 Mar 2026",
    location: "Pune",
  },
  {
    title: "Wedding Event",
    date: "26 Feb 2026",
    location: "Goa",
  },
];

export default function FeaturedEventsSection() {
  return (
    <section style={{ padding: "80px 24px" }}>
      <h2
        style={{
          textAlign: "center",
          fontSize: "28px",
          fontWeight: 600,
          marginBottom: "40px",
        }}
      >
        Featured Events
      </h2>

      {/* EVENTS ROW */}
      <div
        style={{
          display: "flex",
          gap: "24px",
          justifyContent: "center",
          flexWrap: "nowrap",
        }}
      >
        {events.map((event, index) => (
          <div
            key={index}
            style={{
              width: "260px",
              height: "160px",
              borderRadius: "16px",
              padding: "20px",
              color: "white",
              background:
                index === 0
                  ? "linear-gradient(135deg, #3b82f6, #6366f1)"
                  : index === 1
                  ? "linear-gradient(135deg, #6366f1, #a855f7)"
                  : "linear-gradient(135deg, #a855f7, #ec4899)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div>
              <h3 style={{ fontSize: "16px", fontWeight: 600 }}>
                {event.title}
              </h3>
              <p style={{ fontSize: "13px", opacity: 0.9 }}>
                📍 {event.location}
              </p>
              <p style={{ fontSize: "13px", opacity: 0.9 }}>
                📅 {event.date}
              </p>
            </div>

            <Link
              href="/events"
              style={{
                fontSize: "13px",
                color: "white",
                textDecoration: "underline",
              }}
            >
              View Event →
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}