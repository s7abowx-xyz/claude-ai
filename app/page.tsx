import { auth } from "@/auth";
import Link from "next/link";

export default async function Home() {
  const session = await auth();

  return (
    <main
      style={{
        minHeight: "100dvh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 16,
        padding: 24,
        textAlign: "center",
      }}
    >
      <h1 style={{ fontSize: 28 }}>
        sylpha<span style={{ color: "var(--accent)" }}>hub</span>
      </h1>

      {session?.user ? (
        <>
          <p style={{ color: "var(--text-muted)" }}>
            أهلاً {session.user.name} — الجاي: واجهة الشات وصفحات البروفايل
          </p>
          {!(session.user as any)?.username && (
            <Link href="/complete-profile" style={{ color: "var(--accent)" }}>
              كمّل بياناتك (اختار يوزرنيم)
            </Link>
          )}
        </>
      ) : (
        <>
          <p style={{ color: "var(--text-muted)" }}>
            المرحلة الأولى شغالة: التحقق من الإنسان + تسجيل الدخول
          </p>
          <div style={{ display: "flex", gap: 10 }}>
            <Link
              href="/login"
              style={{
                padding: "10px 18px",
                borderRadius: 8,
                background: "var(--accent)",
                color: "#041412",
                fontWeight: 700,
                textDecoration: "none",
              }}
            >
              دخول
            </Link>
            <Link
              href="/signup"
              style={{
                padding: "10px 18px",
                borderRadius: 8,
                border: "1px solid var(--border)",
                color: "var(--text)",
                textDecoration: "none",
              }}
            >
              حساب جديد
            </Link>
          </div>
        </>
      )}
    </main>
  );
}
