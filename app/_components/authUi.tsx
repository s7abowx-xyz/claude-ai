export const cardStyle: React.CSSProperties = {
  width: "100%",
  maxWidth: 400,
  background: "var(--surface)",
  border: "1px solid var(--border)",
  borderRadius: 18,
  padding: "32px 26px",
  boxShadow: "0 0 60px rgba(0, 245, 200, 0.06)",
};

export const logoWrapStyle: React.CSSProperties = {
  width: 76,
  height: 76,
  borderRadius: "50%",
  margin: "0 auto 18px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "radial-gradient(circle at 30% 20%, rgba(0,245,200,0.35), rgba(11,30,33,0.9))",
  border: "1px solid var(--border)",
  boxShadow: "0 0 30px rgba(0,245,200,0.15)",
  fontFamily: "var(--font-display)",
  fontWeight: 700,
  fontSize: 20,
  color: "var(--accent)",
};

export const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "11px 13px",
  borderRadius: 8,
  border: "1px solid var(--border)",
  background: "var(--surface-alt)",
  color: "var(--text)",
  fontSize: 14,
  outline: "none",
};

export const primaryButtonStyle: React.CSSProperties = {
  width: "100%",
  padding: "12px",
  borderRadius: 8,
  border: "none",
  background: "linear-gradient(90deg, var(--accent), var(--accent-cyan))",
  color: "#041412",
  fontWeight: 700,
  fontSize: 14,
  cursor: "pointer",
};

export const ghostButtonStyle: React.CSSProperties = {
  flex: 1,
  padding: "11px",
  borderRadius: 8,
  border: "1px solid var(--border)",
  background: "var(--surface-alt)",
  color: "var(--text)",
  fontWeight: 600,
  fontSize: 13,
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 6,
};

export const providerRowStyle: React.CSSProperties = {
  display: "flex",
  gap: 10,
  marginBottom: 16,
};

export const dividerRowStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 10,
  color: "var(--text-muted)",
  fontSize: 12,
  margin: "16px 0",
};

export const linkMutedStyle: React.CSSProperties = {
  fontSize: 12,
  color: "var(--text-muted)",
  textDecoration: "none",
};
