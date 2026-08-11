"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { cardStyle, inputStyle, primaryButtonStyle } from "../_components/authUi";

export default function CompleteProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (status === "loading") return null;
  if (status === "unauthenticated") {
    router.replace("/login");
    return null;
  }
  if ((session?.user as any)?.username) {
    router.replace("/");
    return null;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const res = await fetch("/api/profile/username", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username }),
    });
    const data = await res.json();
    setLoading(false);
    if (!res.ok) {
      setError(data.error || "حصل خطأ");
      return;
    }
    router.replace("/");
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
        <h1 style={{ fontSize: 22, margin: "0 0 4px" }}>خطوة أخيرة</h1>
        <p style={{ color: "var(--text-muted)", fontSize: 13, margin: "0 0 22px" }}>
          يا {session?.user?.name}، اختار يوزرنيم فريد قبل ما تكمل
        </p>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <input
            style={inputStyle}
            placeholder="اليوزرنيم"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          {error && <p style={{ color: "var(--danger)", fontSize: 13, margin: 0 }}>{error}</p>}
          <button type="submit" style={primaryButtonStyle} disabled={loading}>
            {loading ? "جاري الحفظ..." : "تأكيد"}
          </button>
        </form>
      </div>
    </main>
  );
}
