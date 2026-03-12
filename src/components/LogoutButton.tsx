"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <button
      onClick={handleLogout}
      disabled={isLoggingOut}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "0.4rem",
        background: "rgba(248,113,113,0.1)",
        border: "1px solid rgba(248,113,113,0.25)",
        borderRadius: "6px",
        color: "#fca5a5",
        fontSize: "0.8rem",
        fontWeight: 600,
        cursor: isLoggingOut ? "not-allowed" : "pointer",
        padding: "0.4rem 0.8rem",
        transition: "background 0.2s ease, border-color 0.2s ease",
        fontFamily: "'Montserrat', sans-serif",
        opacity: isLoggingOut ? 0.6 : 1
      }}
      onMouseOver={e => !isLoggingOut && ((e.currentTarget as HTMLElement).style.background = "rgba(248,113,113,0.18)")}
      onMouseOut={e => !isLoggingOut && ((e.currentTarget as HTMLElement).style.background = "rgba(248,113,113,0.1)")}
    >
      <span style={{ fontSize: "1rem" }}>⏻</span>
      {isLoggingOut ? "Saindo..." : "Sair"}
    </button>
  );
}
