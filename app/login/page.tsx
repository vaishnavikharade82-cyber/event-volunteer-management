"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  
const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    alert(error.message);
  } else {
    alert("Login successful 🎉");
    router.push("/");   // 🔥 go to homepage
  }
};

  

  return (
    <div style={styles.container}>
      {/* LEFT HERO SECTION */}
      <div style={styles.left}>
        <h1 style={styles.brand}>EventFlow</h1>

        <h2 style={styles.heading}>
          Start creating <br /> events that inspire.
        </h2>

        <p style={styles.text}>
          Join thousands of organizers building meaningful experiences for
          their communities.
        </p>

        <div style={styles.features}>
          <p>📅 Easy Event Creation</p>
          <p>🧑‍🤝‍🧑 Volunteer Management</p>
          <p>📍 Location-Based Discovery</p>
        </div>
      </div>

      {/* RIGHT LOGIN SECTION */}
      <div style={styles.right}>
        <h2 style={{ marginBottom: "20px" }}>Sign in to your account</h2>

        <form onSubmit={handleLogin} style={styles.form}>
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

          <button type="submit" disabled={loading} style={styles.button}>
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}

/* ================== STYLES ================== */

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
    padding: "80px 60px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },

  brand: {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "40px",
  },

  heading: {
    fontSize: "36px",
    fontWeight: "bold",
    marginBottom: "20px",
    lineHeight: "1.3",
  },

  text: {
    fontSize: "16px",
    marginBottom: "30px",
    maxWidth: "400px",
  },

  features: {
    lineHeight: "2",
    fontSize: "15px",
  },

  right: {
    flex: 1,
    backgroundColor: "white",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: "60px",
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    maxWidth: "350px",
  },

  input: {
    padding: "12px",
    borderRadius: "6px",
    border: "1px solid #ddd",
    fontSize: "14px",
  },

  button: {
    padding: "12px",
    borderRadius: "6px",
    border: "none",
    backgroundColor: "#4f46e5",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer",
  },
};