"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import {
  cardStyle,
  logoWrapStyle,
  inputStyle,
  primaryButtonStyle,
  ghostButtonStyle,
  providerRowStyle,
  dividerRowStyle,
} from "../_components/authUi";

export default function SignupPage() {
  const [form, setForm] = useState({ name: "", username: "", email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
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
      identifier: form.email,
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
        <div style={logoWrapStyle}>SH</div>
        <h1 style={{ fontSize: 20, margin: "0 0 4px", textAlign: "center" }}>إنشاء حساب</h1>
        <p style={{ color: "var(--text-muted)", fontSize: 13, margin: "0 0 22px", textAlign: "center" }}>
          انضم لمجتمع مطوري بوتات الواتساب
        </p>

        <div style={providerRowStyle}>
          <button
            type="button"
            style={ghostButtonStyle}
            onClick={() => signIn("google", { callbackUrl: "/complete-profile" })}
          >
            جوجل
          </button>
          <button
            type="button"
            style={ghostButtonStyle}
            onClick={() => signIn("github", { callbackUrl: "/complete-profile" })}
          >
            جيت هاب
          </button>
        </div>

        <div style={dividerRowStyle}>
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
          <div style={{ position: "relative" }}>
            <input
              style={{ ...inputStyle, paddingLeft: 40 }}
              type={showPassword ? "text" : "password"}
              placeholder="كلمة المرور (8 حروف فأكثر)"
              value={form.password}
              onChange={(e) => update("password", e.target.value)}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword((s) => !s)}
              style={{
                position: "absolute",
                left: 10,
                top: "50%",
                transform: "translateY(-50%)",
                background: "none",
                border: "none",
                color: "var(--text-muted)",
                cursor: "pointer",
                padding: 0,
                fontSize: 12,
              }}
            >
              {showPassword ? "إخفاء" : "إظهار"}
            </button>
          </div>
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
