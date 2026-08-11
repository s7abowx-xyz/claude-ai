"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Script from "next/script";

const BOOT_LINES = [
  "sylpha-hub secure gateway v1.0",
  "> initializing connection...",
  "> checking client fingerprint...",
  "> awaiting human verification...",
];

declare global {
  interface Window {
    turnstile?: {
      render: (el: string | HTMLElement, opts: Record<string, unknown>) => string;
    };
  }
}

export default function VerifyPage() {
  const router = useRouter();
  const params = useSearchParams();
  const [lines, setLines] = useState<string[]>([]);
  const [showWidget, setShowWidget] = useState(false);
  const [status, setStatus] = useState<"idle" | "checking" | "error">("idle");
  const widgetRef = useRef<HTMLDivElement>(null);
  const rendered = useRef(false);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setLines((prev) => [...prev, BOOT_LINES[i]]);
      i++;
      if (i >= BOOT_LINES.length) {
        clearInterval(interval);
        setShowWidget(true);
      }
    }, 450);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!showWidget || rendered.current) return;
    const tryRender = () => {
      if (window.turnstile && widgetRef.current) {
        rendered.current = true;
        window.turnstile.render(widgetRef.current, {
          sitekey: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY,
          theme: "dark",
          callback: onSuccess,
          "error-callback": () => setStatus("error"),
        });
      } else {
        setTimeout(tryRender, 200);
      }
    };
    tryRender();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showWidget]);

  async function onSuccess(token: string) {
    setStatus("checking");
    try {
      const res = await fetch("/api/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });
      const data = await res.json();
      if (data.success) {
        const next = params.get("next") || "/";
        router.replace(next);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <main
      style={{
        minHeight: "100dvh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
      }}
    >
      <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer />

      <div
        className="mono"
        style={{
          width: "100%",
          maxWidth: 480,
          background: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: 12,
          boxShadow: "0 0 40px rgba(0, 245, 200, 0.08)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: 6,
            padding: "10px 14px",
            borderBottom: "1px solid var(--border)",
            background: "var(--surface-alt)",
          }}
        >
          <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#ff5c5c" }} />
          <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#ffbd44" }} />
          <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#00ca4e" }} />
        </div>

        <div style={{ padding: "20px", fontSize: 13, lineHeight: 1.9, minHeight: 160 }}>
          {lines.map((line, idx) => (
            <div key={idx} style={{ color: idx === 0 ? "var(--accent)" : "var(--text-muted)" }}>
              {line}
            </div>
          ))}
          {showWidget && (
            <div style={{ marginTop: 16 }}>
              <div ref={widgetRef} />
              {status === "checking" && (
                <p style={{ color: "var(--accent-cyan)", marginTop: 8 }}>
                  &gt; verifying, please wait...
                </p>
              )}
              {status === "error" && (
                <p style={{ color: "var(--danger)", marginTop: 8 }}>
                  &gt; فشل التحقق، حدّث الصفحة وحاول تاني.
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
