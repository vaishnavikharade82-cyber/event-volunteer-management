"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function SignupPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
const handleSignup = async (e: React.FormEvent) => {
  e.preventDefault();

  const { error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    alert(error.message);
  } else {
    alert("Signup successful 🎉 Please login now");
    router.push("/login");   // 🔥 IMPORTANT
  }
};
  return (
    <div style={styles.container}>
      {/* LEFT PANEL */}
      <div style={styles.left}>
        <h1 style={styles.brand}>EventFlow</h1>

        <h2 style={styles.heading}>
          Start creating <br /> events that inspire.
        </h2>

        <p style={styles.text}>
          Join thousands of organizers building meaningful experiences for their communities.
        </p>

        <div style={styles.features}>
          <p>📅 Easy Event Creation</p>
          <p>🤝 Volunteer Management</p>
          <p>📍 Location-Based Discovery</p>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div style={styles.right}>
        <h2>Create your account</h2>
        <p>
          Already have an account?{" "}
          <span
            style={styles.link}
            onClick={() => router.push("/login")}
          >
            Sign in
          </span>
        </p>

        <form onSubmit={handleSignup} style={styles.form}>
          <input
            type="email"
            placeholder="Email address"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
          />

          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
          />

          <input
            type="password"
            placeholder="Confirm password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            style={styles.input}
          />

          <button type="submit" disabled={loading} style={styles.button}>
            {loading ? "Creating..." : "Create Account"}
          </button>
        </form>
      </div>
    </div>
  );
}

/* ================= STYLES ================= */

const styles: any = {
  container: {
    display: "flex",
    minHeight: "100vh",
    fontFamily: "Arial, sans-serif",
  },

  left: {
    flex: 1,
    background: "linear-gradient(135deg, #667eea, #764ba2)",
    color: "white",
    padding: "60px",
  },

  brand: {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "40px",
  },

  heading: {
    fontSize: "36px",
    marginBottom: "20px",
  },

  text: {
    fontSize: "16px",
    marginBottom: "30px",
    opacity: 0.9,
  },

  features: {
    fontSize: "16px",
    lineHeight: "2",
  },

  right: {
    flex: 1,
    padding: "80px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },

  form: {
    marginTop: "30px",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },

  input: {
    padding: "12px",
    fontSize: "16px",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },

  button: {
    padding: "12px",
    backgroundColor: "#667eea",
    color: "white",
    border: "none",
    borderRadius: "6px",
    fontSize: "16px",
    cursor: "pointer",
  },

  link: {
    color: "#667eea",
    cursor: "pointer",
    fontWeight: "bold",
  },
};