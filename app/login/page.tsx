"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { cardStyle, inputStyle, primaryButtonStyle, ghostButtonStyle } from "../_components/authUi";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    setLoading(false);
    if (res?.error) {
      setError("الإيميل أو كلمة المرور غلط");
    } else {
      window.location.href = "/";
    }
  }

  return (
    <main
      style={{
        minHeight: "100dvh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
      }}
    >
      <div style={cardStyle}>
        <h1 style={{ fontSize: 22, margin: "0 0 4px" }}>تسجيل الدخول</h1>
        <p style={{ color: "var(--text-muted)", fontSize: 13, margin: "0 0 22px" }}>
          سجّل دخولك عشان توصل للشاتات والأكواد
        </p>

        <button
          type="button"
          style={{ ...ghostButtonStyle, marginBottom: 16 }}
          onClick={() => signIn("github", { callbackUrl: "/" })}
        >
          <GithubIcon /> الدخول عبر GitHub
        </button>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            color: "var(--text-muted)",
            fontSize: 12,
            margin: "16px 0",
          }}
        >
          <span style={{ flex: 1, height: 1, background: "var(--border)" }} />
          أو
          <span style={{ flex: 1, height: 1, background: "var(--border)" }} />
        </div>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <input
            style={inputStyle}
            type="email"
            placeholder="الإيميل"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            style={inputStyle}
            type="password"
            placeholder="كلمة المرور"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <p style={{ color: "var(--danger)", fontSize: 13, margin: 0 }}>{error}</p>}
          <button type="submit" style={primaryButtonStyle} disabled={loading}>
            {loading ? "جاري الدخول..." : "دخول"}
          </button>
        </form>

        <p style={{ fontSize: 13, color: "var(--text-muted)", marginTop: 18, textAlign: "center" }}>
          معندكش حساب؟{" "}
          <Link href="/signup" style={{ color: "var(--accent)" }}>
            سجّل دلوقتي
          </Link>
        </p>
      </div>
    </main>
  );
}

function GithubIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 .5a12 12 0 0 0-3.79 23.4c.6.11.82-.26.82-.58v-2.02c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.2.09 1.84 1.24 1.84 1.24 1.07 1.84 2.81 1.3 3.5 1 .11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.66.24 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58A12 12 0 0 0 12 .5Z" />
    </svg>
  );
}
