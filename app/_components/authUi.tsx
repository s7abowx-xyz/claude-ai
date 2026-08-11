export const cardStyle: React.CSSProperties = {
  width: "100%",
  maxWidth: 400,
  background: "var(--surface)",
  border: "1px solid var(--border)",
  borderRadius: 14,
  padding: "28px 26px",
  boxShadow: "0 0 60px rgba(0, 245, 200, 0.05)",
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
  background: "var(--accent)",
  color: "#041412",
  fontWeight: 700,
  fontSize: 14,
  cursor: "pointer",
};

export const ghostButtonStyle: React.CSSProperties = {
  width: "100%",
  padding: "12px",
  borderRadius: 8,
  border: "1px solid var(--border)",
  background: "transparent",
  color: "var(--text)",
  fontWeight: 600,
  fontSize: 14,
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 8,
};
