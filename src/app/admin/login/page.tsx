"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        router.push("/admin");
        router.refresh();
      } else {
        const data = await res.json();
        setError(data.error || "Senha incorreta");
      }
    } catch {
      setError("Erro de rede. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #001f3f 0%, #00315e 50%, #005090 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "'Montserrat', sans-serif",
      padding: "1rem"
    }}>
      {/* Decorative background pattern */}
      <div style={{
        position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0,
        backgroundImage: "radial-gradient(circle at 20% 50%, rgba(172,212,244,0.07) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(0,80,144,0.15) 0%, transparent 50%)"
      }} />

      <div style={{
        background: "rgba(255,255,255,0.04)",
        backdropFilter: "blur(24px)",
        border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: "20px",
        padding: "3rem",
        width: "100%",
        maxWidth: "420px",
        boxShadow: "0 30px 80px rgba(0,0,0,0.4)",
        position: "relative",
        zIndex: 1
      }}>
        {/* Logo */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "2rem" }}>
          <div style={{
            background: "rgba(255,255,255,0.08)",
            borderRadius: "16px",
            padding: "1rem",
            border: "1px solid rgba(255,255,255,0.12)"
          }}>
            <img src="/assets/logo.png" alt="La Roche" style={{ height: "70px", width: "auto", display: "block" }} />
          </div>
        </div>

        {/* Heading */}
        <h1 style={{
          color: "#fff",
          fontSize: "1.6rem",
          fontWeight: 700,
          textAlign: "center",
          marginBottom: "0.4rem",
          fontFamily: "'Playfair Display', serif",
          letterSpacing: "0.02em"
        }}>
          Acesso Restrito
        </h1>
        <p style={{ color: "rgba(172,212,244,0.8)", textAlign: "center", fontSize: "0.85rem", marginBottom: "2rem" }}>
          Painel Administrativo · La Roche Empreendimentos
        </p>

        {/* Form */}
        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: "1.25rem" }}>
            <label style={{ display: "block", color: "rgba(255,255,255,0.7)", fontSize: "0.75rem", fontWeight: 600, letterSpacing: "1px", textTransform: "uppercase", marginBottom: "0.5rem" }}>
              Senha de Acesso
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••"
              style={{
                width: "100%",
                padding: "0.9rem 1rem",
                background: "rgba(255,255,255,0.07)",
                border: "1px solid rgba(255,255,255,0.15)",
                borderRadius: "10px",
                color: "#fff",
                fontSize: "1rem",
                outline: "none",
                boxSizing: "border-box",
                transition: "border-color 0.2s ease"
              }}
              onFocus={e => e.target.style.borderColor = "rgba(172,212,244,0.6)"}
              onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.15)"}
            />
          </div>

          {error && (
            <div style={{
              background: "rgba(239,68,68,0.15)",
              border: "1px solid rgba(239,68,68,0.4)",
              borderRadius: "8px",
              padding: "0.7rem 1rem",
              color: "#fca5a5",
              fontSize: "0.85rem",
              marginBottom: "1.25rem",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem"
            }}>
              <span>⚠</span> {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "0.9rem",
              background: loading ? "rgba(172,212,244,0.3)" : "linear-gradient(135deg, #005090, #00315e)",
              color: "#fff",
              border: "none",
              borderRadius: "10px",
              fontSize: "0.9rem",
              fontWeight: 700,
              letterSpacing: "0.5px",
              cursor: loading ? "not-allowed" : "pointer",
              transition: "opacity 0.2s ease, transform 0.1s ease",
              boxShadow: "0 4px 15px rgba(0,49,94,0.4)"
            }}
            onMouseOver={e => !loading && ((e.target as HTMLElement).style.opacity = "0.9")}
            onMouseOut={e => !loading && ((e.target as HTMLElement).style.opacity = "1")}
          >
            {loading ? "Verificando..." : "Entrar no Painel"}
          </button>
        </form>

        {/* Footer */}
        <p style={{ color: "rgba(255,255,255,0.25)", textAlign: "center", fontSize: "0.7rem", marginTop: "2rem" }}>
          Acesso protegido por sessão criptografada
        </p>
      </div>
    </div>
  );
}
