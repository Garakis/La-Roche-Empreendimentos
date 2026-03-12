import Link from "next/link";
import { getProjects } from "@/lib/data";

export default async function Home() {
  const projects = await getProjects();

  return (
    <main>
      {/* Hero Section */}
      <section className="hero" id="home">
        <div className="hero-overlay"></div>
        <img
          className="hero-bg"
          src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop"
          alt="Empreendimento Destaque"
        />
        <div className="container hero-content">
          <h1 className="hero-title fade-in-up">O Ápice do Viver Bem</h1>
          <p className="hero-subtitle fade-in-up delay-1">
            Exclusividade e sofisticação em cada detalhe. Descubra o padrão La Roche.
          </p>
          <div className="hero-cta fade-in-up delay-2">
            <Link href="#empreendimentos" className="btn btn-primary">
              Conheça nossos projetos
            </Link>
          </div>
        </div>
      </section>

      {/* Empreendimentos Section */}
      <section className="empreendimentos section" id="empreendimentos">
        <div className="container">
          <div className="section-header fade-in-up">
            <span className="section-subtitle">Portfólio</span>
            <h2 className="section-title">Nossos Empreendimentos</h2>
            <div className="filter-group">
              <button className="filter-btn active" data-filter="all">Todos</button>
              <button className="filter-btn" data-filter="release">Lançamento</button>
              <button className="filter-btn" data-filter="ready">Pronta Entrega</button>
              <button className="filter-btn" data-filter="construction">Em Obras</button>
            </div>
          </div>

          <div className="grid cards-grid">
            {projects.map((project, i) => (
              <article key={project.id} className={`project-card fade-in-up ${i > 0 && `delay-${i}`}`} data-category={project.statusClass}>
                <div className="card-image-wrapper">
                  <img
                    src={project.heroImage}
                    alt={project.title}
                    loading="lazy"
                  />
                  <span className={`status-badge ${project.statusClass}`}>{project.status}</span>
                  {project.gallery && project.gallery.length > 0 && (
                    <span style={{ position: "absolute", bottom: "0.75rem", right: "0.75rem", background: "rgba(0,0,0,0.55)", backdropFilter: "blur(4px)", color: "#fff", fontSize: "0.72rem", fontWeight: 700, padding: "0.3rem 0.6rem", borderRadius: "20px", display: "flex", alignItems: "center", gap: "0.3rem" }}>
                      📷 {project.gallery.length}
                    </span>
                  )}
                </div>
                <div className="card-content">
                  <h3 className="card-title">{project.title}</h3>
                  <p className="card-location"><i className="ph ph-map-pin"></i> {project.location}</p>
                  <Link href={`/empreendimento/${project.id}`} className="btn-link">
                    Ver Detalhes <i className="ph ph-arrow-right"></i>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Institucional Section */}
      <section className="institucional section bg-light" id="institucional">
        <div className="container container-split">
          <div className="institucional-image fade-in-up">
            <img
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2000&auto=format&fit=crop"
              alt="Escritório La Roche"
              loading="lazy"
            />
            <div className="experience-badge">
              <span className="years">25</span>
              <span className="text">Anos de<br />Tradição</span>
            </div>
          </div>
          <div className="institucional-content fade-in-up delay-1">
            <span className="section-subtitle">A Incorporadora</span>
            <h2 className="section-title">Solidez e Inovação em cada Fundamento</h2>
            <p>
              Como a montanha que inspira nossa marca, a La Roche Empreendimentos é sinônimo de solidez,
              grandiosidade e permanência. Há mais de duas décadas, redefinimos o conceito de morar bem,
              entregando projetos que unem arquitetura contemporânea a acabamentos impecáveis.
            </p>
            <p>
              Nossa missão é construir não apenas edifícios, mas legados. Cada empreendimento é meticulosamente
              planejado para oferecer uma experiência de vida inigualável, respeitando o entorno e valorizando
              o seu patrimônio.
            </p>
            <Link href="#" className="btn btn-outline">Conheça nossa história</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
