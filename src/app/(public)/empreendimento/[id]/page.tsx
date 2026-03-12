import { notFound } from "next/navigation";
import { getProjectById } from "@/lib/data";

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
      <section className="hero property-hero" style={{ height: "60vh", minHeight: "400px" }}>
        <div className="hero-overlay"></div>
        <img className="hero-bg" src={project.heroImage} alt={project.title} />
        <div className="container hero-content" style={{ textAlign: "center", margin: "0 auto", paddingTop: "40px" }}>
          <h1 className="hero-title fade-in-up" style={{ fontSize: "3.5rem" }}>{project.title}</h1>
          <p className="hero-subtitle fade-in-up delay-1" style={{ margin: "0 auto" }}>{project.location}</p>
        </div>
      </section>

      <section className="property-details section container" style={{ padding: "var(--space-xl) 0" }}>
        <div className="property-header fade-in-up" style={{ marginBottom: "var(--space-xl)", textAlign: "center" }}>
          <span className={`status-badge ${project.statusClass}`} style={{ position: "static", display: "inline-block", marginBottom: "1rem" }}>
            {project.status}
          </span>
          <h2>Descubra a Excelência</h2>
          <p style={{ maxWidth: "800px", margin: "0 auto", color: "var(--clr-text-light)", lineHeight: "1.8" }}>
            {project.desc}
          </p>
        </div>

        <div className="property-grid fade-in-up delay-1" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-xl)", alignItems: "center" }}>
          <div>
            <img src={project.innerImage} alt="Interior" style={{ width: "100%", borderRadius: "8px", boxShadow: "var(--shadow-soft)" }} />
          </div>
          <div>
            <h3>Detalhes do Empreendimento</h3>
            <ul className="property-info-list" style={{ marginTop: "1.5rem", listStyle: "none", padding: 0 }}>
              <li style={{ marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "1.1rem" }}>
                <i className="ph ph-check-circle" style={{ color: "var(--clr-primary)", fontSize: "1.5rem" }}></i> Excelente Localização
              </li>
              <li style={{ marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "1.1rem" }}>
                <i className="ph ph-check-circle" style={{ color: "var(--clr-primary)", fontSize: "1.5rem" }}></i> Acabamento de Alto Padrão
              </li>
              <li style={{ marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "1.1rem" }}>
                <i className="ph ph-check-circle" style={{ color: "var(--clr-primary)", fontSize: "1.5rem" }}></i> Ambientes Espaçosos
              </li>
              <li style={{ marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "1.1rem" }}>
                <i className="ph ph-check-circle" style={{ color: "var(--clr-primary)", fontSize: "1.5rem" }}></i> Arquitetura Moderna
              </li>
            </ul>
            <a
              href={`https://wa.me/5512996191400?text=Ol%C3%A1!%20Gostaria%20de%20agendar%20uma%20visita%20e%20saber%20mais%20sobre%20o%20empreendimento%20${encodeURIComponent(project.title)}.`}
              className="btn btn-primary"
              style={{ marginTop: "2rem", display: "inline-block" }}
              target="_blank"
              rel="noopener noreferrer"
            >
              Fale com um corretor pelo WhatsApp
            </a>
          </div>
        </div>

        <div className="property-gallery fade-in-up delay-2">
          <h3 style={{ marginTop: "4rem", textAlign: "center" }}>Galeria de Fotos</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: "1rem", marginTop: "3rem" }}>
            {project.gallery.map((imgUrl, i) => (
              <img
                key={i}
                src={imgUrl}
                alt={`${project.title} Foto ${i}`}
                loading="lazy"
                style={{ width: "100%", height: "200px", objectFit: "cover", borderRadius: "8px", cursor: "pointer", transition: "transform 0.3s ease" }}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
