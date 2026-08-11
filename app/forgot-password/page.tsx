import Link from "next/link";
import { cardStyle } from "../_components/authUi";

export default function ForgotPasswordPage() {
  return (
    <main
      style={{
        minHeight: "100dvh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
        textAlign: "center",
      }}
    >
      <div style={cardStyle}>
        <h1 style={{ fontSize: 20, margin: "0 0 10px" }}>استعادة كلمة المرور</h1>
        <p style={{ color: "var(--text-muted)", fontSize: 13, marginBottom: 20 }}>
          الميزة دي لسه قيد التطوير. لو عندك حساب مربوط بجيت هاب أو جوجل، تقدر تسجل دخول بيهم مباشرة.
        </p>
        <Link href="/login" style={{ color: "var(--accent)", fontSize: 13 }}>
          الرجوع لتسجيل الدخول
        </Link>
      </div>
    </main>
  );
}
