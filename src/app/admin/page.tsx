import LogoutButton from "@/components/LogoutButton";
import Link from "next/link";
import AdminDashboardClient from "./AdminDashboardClient";
import { getProjects } from "@/lib/data";

export default async function AdminDashboard() {
  const projects = await getProjects();

  return (
    <div style={{ 
      minHeight: "100vh", 
      background: "#0f1117",
      fontFamily: "'Montserrat', sans-serif",
      color: "#fff"
    }}>
      {/* Top Header */}
      <header style={{
        background: "linear-gradient(90deg, #00204a 0%, #001f3f 100%)",
        borderBottom: "1px solid rgba(172,212,244,0.12)",
        padding: "0 2rem",
        height: "64px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        position: "sticky",
        top: 0,
        zIndex: 100,
        boxShadow: "0 2px 20px rgba(0,0,0,0.4)"
      }}>
        {/* Left: Brand */}
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <img src="/assets/logo.png" alt="La Roche" style={{ height: "36px", width: "auto" }} />
          <div style={{ width: "1px", height: "30px", background: "rgba(255,255,255,0.15)" }} />
          <div>
            <div style={{ fontSize: "0.9rem", fontWeight: 700, color: "#fff", letterSpacing: "0.02em" }}>Painel de Controle</div>
            <div style={{ fontSize: "0.65rem", color: "rgba(172,212,244,0.6)", letterSpacing: "1px", textTransform: "uppercase" }}>La Roche Empreendimentos</div>
          </div>
        </div>

        {/* Right: Actions */}
        <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
          <Link href="/" target="_blank" style={{
            display: "flex",
            alignItems: "center",
            gap: "0.4rem",
            color: "rgba(172,212,244,0.7)",
            textDecoration: "none",
            fontSize: "0.8rem",
            fontWeight: 500,
            transition: "color 0.2s",
            padding: "0.4rem 0.8rem",
            border: "1px solid rgba(172,212,244,0.2)",
            borderRadius: "6px"
          }}>
            <i className="ph ph-arrow-square-out" style={{ fontSize: "1rem" }} />
            Ver Site
          </Link>
          <LogoutButton />
        </div>
      </header>

      {/* Main */}
      <main style={{ maxWidth: "1400px", margin: "0 auto", padding: "2.5rem 2rem" }}>
        {/* Page Title */}
        <div style={{ marginBottom: "2rem" }}>
          <h1 style={{
            fontSize: "1.5rem",
            fontWeight: 700,
            color: "#fff",
            fontFamily: "'Playfair Display', serif",
            marginBottom: "0.25rem"
          }}>
            Vitrine de Empreendimentos
          </h1>
          <p style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.45)" }}>
            Gerencie a ordem, textos e status dos projetos exibidos publicamente.
          </p>
        </div>

        <AdminDashboardClient initialProjects={projects} />
      </main>
    </div>
  );
}
