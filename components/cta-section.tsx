import Link from "next/link";

export default function CTASection() {
  return (
    <section
      style={{
        margin: "80px 24px",
        borderRadius: "24px",
        padding: "64px 32px",
        textAlign: "center",
        color: "white",
        background:
          "linear-gradient(135deg, #3b82f6, #6366f1, #a855f7, #ec4899)",
      }}
    >
      <h2
        style={{
          fontSize: "32px",
          fontWeight: 700,
          marginBottom: "16px",
        }}
      >
        Ready to host your next event?
      </h2>

      <p
        style={{
          fontSize: "16px",
          opacity: 0.95,
          marginBottom: "32px",
        }}
      >
        Start creating impactful events today.
      </p>

      <Link
        href="/events/new"
        style={{
          display: "inline-block",
          background: "white",
          color: "#4f46e5",
          padding: "12px 24px",
          borderRadius: "999px",
          fontWeight: 600,
          textDecoration: "none",
        }}
      >
        Create Event →
      </Link>
    </section>
  );
}