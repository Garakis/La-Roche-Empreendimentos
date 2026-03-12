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
      <section className="hero property-hero" style={{ height: "60vh", minHeight: "380px" }}>
        <div className="hero-overlay"></div>
        <img className="hero-bg" src={project.heroImage} alt={project.title} />
        <div className="container hero-content" style={{ textAlign: "center", margin: "0 auto", paddingTop: "40px" }}>
          <Link href="/#empreendimentos" style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", color: "rgba(255,255,255,0.7)", fontSize: "0.75rem", letterSpacing: "1px", textTransform: "uppercase", fontWeight: 600, marginBottom: "1.25rem", textDecoration: "none" }}>
            <i className="ph ph-caret-left" /> Voltar
          </Link>
          <h1 className="hero-title fade-in-up" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}>{project.title}</h1>
          <p className="hero-subtitle fade-in-up delay-1" style={{ margin: "0 auto", fontSize: "clamp(0.9rem, 2vw, 1.25rem)" }}>{project.location}</p>
          <span className={`status-badge ${project.statusClass}`} style={{ position: "static", display: "inline-block", marginTop: "1rem" }}>{project.status}</span>
        </div>
      </section>

      {/* Details */}
      <section className="section" style={{ padding: "var(--space-xl) 0" }}>
        <div className="container">
          {/* Description + Image - responsive grid */}
          <style>{`
            .property-split {
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: var(--space-xl);
              align-items: start;
              margin-bottom: var(--space-xl);
            }
            @media (max-width: 768px) {
              .property-split { grid-template-columns: 1fr; }
            }
            .feature-grid {
              display: grid;
              grid-template-columns: repeat(2, 1fr);
              gap: 0.75rem;
              margin-bottom: var(--space-xl);
            }
            @media (max-width: 480px) {
              .feature-grid { grid-template-columns: 1fr; }
            }
          `}</style>

          <div className="property-split fade-in-up">
            <div>
              <span className="section-subtitle">O Empreendimento</span>
              <h2 style={{ marginBottom: "1rem" }}>Descubra a Excelência</h2>
              <p style={{ color: "var(--clr-text-body)", lineHeight: "1.9", fontSize: "1rem" }}>{project.desc}</p>
              <a
                href={`https://wa.me/5512996191400?text=Olá!%20Gostaria%20de%20saber%20mais%20sobre%20o%20${encodeURIComponent(project.title)}.`}
                className="btn btn-primary"
                style={{ marginTop: "2rem", display: "inline-block" }}
                target="_blank"
                rel="noopener noreferrer"
              >
                Falar com um corretor
              </a>
            </div>

            <div>
              <img
                src={project.innerImage}
                alt="Interior"
                style={{ width: "100%", borderRadius: "12px", boxShadow: "var(--shadow-soft)", display: "block" }}
              />
            </div>
          </div>

          {/* Features */}
          <div className="feature-grid fade-in-up delay-1">
            {["Excelente Localização", "Acabamento de Alto Padrão", "Ambientes Espaçosos", "Arquitetura Moderna"].map(f => (
              <div key={f} style={{
                display: "flex", alignItems: "center", gap: "0.6rem",
                background: "var(--clr-bg-light)", borderRadius: "8px", padding: "0.9rem 1rem"
              }}>
                <i className="ph ph-check-circle" style={{ color: "var(--clr-primary)", fontSize: "1.3rem", flexShrink: 0 }} />
                <span style={{ fontSize: "0.9rem", fontWeight: 500 }}>{f}</span>
              </div>
            ))}
          </div>

          {/* Gallery */}
          {project.gallery && project.gallery.length > 0 && (
            <div className="fade-in-up delay-2">
              <div style={{ textAlign: "center", marginBottom: "0.25rem" }}>
                <span className="section-subtitle">Galeria</span>
                <h2>Fotos e Vídeos</h2>
                <p style={{ color: "var(--clr-text-body)", marginTop: "0.4rem", fontSize: "0.85rem" }}>
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
