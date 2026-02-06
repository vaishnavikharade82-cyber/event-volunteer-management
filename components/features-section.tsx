export default function FeaturesSection() {
  const features = [
    {
      title: "Create Events Easily",
      desc: "Launch your event in minutes with simple tools.",
      gradient: "linear-gradient(135deg, #3b82f6, #6366f1)",
    },
    {
      title: "Manage Volunteers",
      desc: "Track registrations and communicate easily.",
      gradient: "linear-gradient(135deg, #6366f1, #a855f7)",
    },
    {
      title: "Location & Date Based",
      desc: "Help volunteers find events near them.",
      gradient: "linear-gradient(135deg, #a855f7, #ec4899)",
    },
  ];

  return (
    <section style={{ padding: "80px 24px", background: "#f9fafb" }}>
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: "32px",
        }}
      >
        {features.map((f, i) => (
          <div
            key={i}
            style={{
              padding: "32px",
              borderRadius: "20px",
              background: f.gradient,
              color: "white",
              boxShadow: "0 20px 40px rgba(0,0,0,0.12)",
              transition: "transform 0.3s ease",
            }}
          >
            <h3
              style={{
                fontSize: "20px",
                fontWeight: 700,
                marginBottom: "12px",
              }}
            >
              {f.title}
            </h3>

            <p
              style={{
                fontSize: "15px",
                lineHeight: 1.6,
                opacity: 0.95,
              }}
            >
              {f.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}