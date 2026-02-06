export default function HeroSection() {
  return (
    <section
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background:
          "linear-gradient(135deg, #eef2ff 0%, #fdf2f8 50%, #eef2ff 100%)",
        padding: "0 24px",
      }}
    >
      <div
        style={{
          maxWidth: "900px",
          textAlign: "center",
        }}
      >
        {/* Badge */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            background: "rgba(255,255,255,0.7)",
            padding: "6px 14px",
            borderRadius: "999px",
            fontSize: "13px",
            color: "#6b7280",
            marginBottom: "20px",
          }}
        >
          ✨ The future of event management
        </div>

        {/* Heading */}
        <h1
          style={{
            fontSize: "56px",
            fontWeight: 800,
            lineHeight: "1.1",
            color: "#111827",
            marginBottom: "16px",
          }}
        >
          Create & Manage <br />
          <span
            style={{
              background:
                "linear-gradient(90deg, #6366f1, #ec4899)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Events That Matter
          </span>
        </h1>

        {/* Subtitle */}
        <p
          style={{
            maxWidth: "680px",
            margin: "0 auto 36px",
            fontSize: "18px",
            color: "#6b7280",
            lineHeight: "1.6",
          }}
        >
          Organize meaningful volunteer events, connect with passionate
          individuals, and make a lasting impact in your community.
          Simple, powerful, and designed for changemakers.
        </p>

        {/* CTA */}
        <a
          href="/events/new"
          style={{
            display: "inline-block",
            padding: "14px 28px",
            borderRadius: "12px",
            background:
              "linear-gradient(90deg, #6366f1, #ec4899)",
            color: "#ffffff",
            fontSize: "16px",
            fontWeight: 600,
            textDecoration: "none",
            boxShadow: "0 10px 25px rgba(99,102,241,0.35)",
          }}
        >
          Create Event →
        </a>
      </div>
    </section>
  );
}