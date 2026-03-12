import { notFound } from "next/navigation";
import { getProjectById } from "@/lib/data";
import GalleryGrid from "@/components/GalleryGrid";
import Link from "next/link";

export default async function PropertyPage(
  props: {
    params: Promise<{ id: string }>;
  }
) {
  const params = await props.params;
  const project = await getProjectById(params.id);

  if (!project) {
    notFound();
  }

  return (
    <main>
      {/* Hero */}
      <section className="hero property-hero" style={{ height: "65vh", minHeight: "420px" }}>
        <div className="hero-overlay"></div>
        <img className="hero-bg" src={project.heroImage} alt={project.title} />
        <div className="container hero-content" style={{ textAlign: "center", margin: "0 auto", paddingTop: "40px" }}>
          {/* Back link */}
          <Link href="/#empreendimentos" style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", color: "rgba(255,255,255,0.7)", fontSize: "0.8rem", letterSpacing: "1px", textTransform: "uppercase", fontWeight: 600, marginBottom: "1.5rem", textDecoration: "none" }}>
            ← Voltar aos Empreendimentos
          </Link>
          <h1 className="hero-title fade-in-up" style={{ fontSize: "3.5rem" }}>{project.title}</h1>
          <p className="hero-subtitle fade-in-up delay-1" style={{ margin: "0 auto" }}>{project.location}</p>
          <span className={`status-badge ${project.statusClass}`} style={{ position: "static", display: "inline-block", marginTop: "1rem" }}>{project.status}</span>
        </div>
      </section>

      {/* Details */}
      <section className="section" style={{ padding: "var(--space-xl) 0" }}>
        <div className="container">
          {/* Description + Info */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-xl)", alignItems: "start", marginBottom: "var(--space-xl)" }}>
            <div className="fade-in-up">
              <span className="section-subtitle">O Empreendimento</span>
              <h2 style={{ marginBottom: "1rem" }}>Descubra a Excelência</h2>
              <p style={{ color: "var(--clr-text-body)", lineHeight: "1.9", fontSize: "1.05rem" }}>{project.desc}</p>
              <a
                href={`https://wa.me/5512996191400?text=Ol%C3%A1!%20Gostaria%20de%20saber%20mais%20sobre%20o%20empreendimento%20${encodeURIComponent(project.title)}.`}
                className="btn btn-primary"
                style={{ marginTop: "2rem", display: "inline-block" }}
                target="_blank"
                rel="noopener noreferrer"
              >
                Falar com um corretor
              </a>
            </div>

            <div className="fade-in-up delay-1">
              <img src={project.innerImage} alt="Interior" style={{ width: "100%", borderRadius: "12px", boxShadow: "var(--shadow-soft)" }} />
            </div>
          </div>

          {/* Features */}
          <div className="fade-in-up delay-1" style={{ background: "var(--clr-bg-light)", borderRadius: "12px", padding: "var(--space-lg)", marginBottom: "var(--space-xl)", display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "1rem" }}>
            {["Excelente Localização", "Acabamento de Alto Padrão", "Ambientes Espaçosos", "Arquitetura Moderna"].map(f => (
              <div key={f} style={{ display: "flex", alignItems: "center", gap: "0.6rem", fontSize: "0.95rem" }}>
                <i className="ph ph-check-circle" style={{ color: "var(--clr-primary)", fontSize: "1.4rem", flexShrink: 0 }} />
                <span>{f}</span>
              </div>
            ))}
          </div>

          {/* Gallery */}
          {project.gallery && project.gallery.length > 0 && (
            <div className="fade-in-up delay-2">
              <div style={{ textAlign: "center", marginBottom: "0.5rem" }}>
                <span className="section-subtitle">Galeria</span>
                <h2>Fotos e Vídeos</h2>
                <p style={{ color: "var(--clr-text-body)", marginTop: "0.5rem", fontSize: "0.9rem" }}>
                  Clique em qualquer imagem para ampliar
                </p>
              </div>
              <GalleryGrid gallery={project.gallery} title={project.title} />
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
