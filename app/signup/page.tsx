"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { cardStyle, inputStyle, primaryButtonStyle, ghostButtonStyle } from "../_components/authUi";

export default function SignupPage() {
  const [form, setForm] = useState({ name: "", username: "", email: "", password: "" });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  function update(key: keyof typeof form, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();

    if (!res.ok) {
      setError(data.error || "حصل خطأ، حاول تاني");
      setLoading(false);
      return;
    }

    const signInRes = await signIn("credentials", {
      email: form.email,
      password: form.password,
      redirect: false,
    });
    setLoading(false);
    if (signInRes?.error) {
      window.location.href = "/login";
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
        <h1 style={{ fontSize: 22, margin: "0 0 4px" }}>إنشاء حساب</h1>
        <p style={{ color: "var(--text-muted)", fontSize: 13, margin: "0 0 22px" }}>
          انضم لمجتمع مطوري بوتات الواتساب
        </p>

        <button
          type="button"
          style={{ ...ghostButtonStyle, marginBottom: 16 }}
          onClick={() => signIn("github", { callbackUrl: "/complete-profile" })}
        >
          التسجيل عبر GitHub
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
            placeholder="الاسم"
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            required
          />
          <input
            style={inputStyle}
            placeholder="اليوزرنيم (إنجليزي بدون مسافات)"
            value={form.username}
            onChange={(e) => update("username", e.target.value)}
            required
          />
          <input
            style={inputStyle}
            type="email"
            placeholder="الإيميل"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            required
          />
          <input
            style={inputStyle}
            type="password"
            placeholder="كلمة المرور (8 حروف فأكثر)"
            value={form.password}
            onChange={(e) => update("password", e.target.value)}
            required
          />
          {error && <p style={{ color: "var(--danger)", fontSize: 13, margin: 0 }}>{error}</p>}
          <button type="submit" style={primaryButtonStyle} disabled={loading}>
            {loading ? "جاري الإنشاء..." : "إنشاء الحساب"}
          </button>
        </form>

        <p style={{ fontSize: 13, color: "var(--text-muted)", marginTop: 18, textAlign: "center" }}>
          عندك حساب بالفعل؟{" "}
          <Link href="/login" style={{ color: "var(--accent)" }}>
            سجّل دخول
          </Link>
        </p>
      </div>
    </main>
  );
}
