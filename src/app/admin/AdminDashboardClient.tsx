"use client";

import { useState } from "react";
import { Project } from "@/lib/data";

const DARK = {
  bg: "#0f1117",
  card: "#181c25",
  cardBorder: "rgba(255,255,255,0.06)",
  cardHover: "#1e2434",
  inputBg: "#232838",
  inputBorder: "rgba(255,255,255,0.1)",
  inputBorderFocus: "#4c8fdb",
  text: "#e8eaf0",
  textMuted: "rgba(255,255,255,0.4)",
  accent: "#4c8fdb",
  accentMuted: "rgba(76,143,219,0.12)",
  success: "#22c55e",
  successBg: "rgba(34,197,94,0.1)",
  error: "#f87171",
  errorBg: "rgba(248,113,113,0.1)",
  badge: "rgba(172,212,244,0.12)",
};

function EditableField({
  label, value, onChange, multiline
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  multiline?: boolean;
}) {
  const sharedStyle: React.CSSProperties = {
    width: "100%",
    background: DARK.inputBg,
    border: `1px solid ${DARK.inputBorder}`,
    borderRadius: "8px",
    color: DARK.text,
    fontSize: "0.9rem",
    padding: "0.6rem 0.8rem",
    outline: "none",
    boxSizing: "border-box",
    fontFamily: "'Montserrat', sans-serif",
    resize: "vertical" as const,
    transition: "border-color 0.2s ease"
  };

  return (
    <div style={{ flex: 1 }}>
      <div style={{ fontSize: "0.65rem", color: DARK.textMuted, fontWeight: 700, letterSpacing: "1.2px", textTransform: "uppercase", marginBottom: "0.35rem" }}>{label}</div>
      {multiline ? (
        <textarea
          value={value}
          onChange={e => onChange(e.target.value)}
          rows={2}
          style={sharedStyle}
          onFocus={e => e.target.style.borderColor = DARK.inputBorderFocus}
          onBlur={e => e.target.style.borderColor = DARK.inputBorder}
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={e => onChange(e.target.value)}
          style={sharedStyle}
          onFocus={e => e.target.style.borderColor = DARK.inputBorderFocus}
          onBlur={e => e.target.style.borderColor = DARK.inputBorder}
        />
      )}
    </div>
  );
}

export default function AdminDashboardClient({ initialProjects }: { initialProjects: Project[] }) {
  const [projects, setProjects] = useState<Project[]>(
    [...initialProjects].sort((a, b) => a.order - b.order)
  );
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; msg: string } | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const updateField = (index: number, field: keyof Project, value: string) => {
    const updated = [...projects];
    (updated[index] as any)[field] = value;
    setProjects(updated);
    setFeedback(null);
  };

  const moveProject = (index: number, direction: "up" | "down") => {
    const newItems = [...projects];
    if (direction === "up" && index > 0) {
      [newItems[index - 1], newItems[index]] = [newItems[index], newItems[index - 1]];
    } else if (direction === "down" && index < newItems.length - 1) {
      [newItems[index + 1], newItems[index]] = [newItems[index], newItems[index + 1]];
    }
    newItems.forEach((p, i) => { p.order = i + 1; });
    setProjects(newItems);
    setFeedback(null);
  };

  const handleSave = async () => {
    setLoading(true);
    setFeedback(null);
    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(projects),
      });
      if (res.ok) {
        setFeedback({ type: "success", msg: "Alterações salvas no Supabase com sucesso!" });
        setTimeout(() => setFeedback(null), 6000);
      } else {
        throw new Error("API Error");
      }
    } catch {
      setFeedback({ type: "error", msg: "Erro ao salvar. Verifique a conexão com o Supabase." });
    }
    setLoading(false);
  };

  return (
    <>
      {/* Action Bar */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "1.5rem",
        gap: "1rem",
        flexWrap: "wrap"
      }}>
        <div style={{ fontSize: "0.8rem", color: DARK.textMuted }}>
          {projects.length} empreendimentos · Arraste para reordenar
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          {feedback && (
            <div style={{
              padding: "0.5rem 1rem",
              borderRadius: "8px",
              fontSize: "0.8rem",
              fontWeight: 600,
              background: feedback.type === "success" ? DARK.successBg : DARK.errorBg,
              color: feedback.type === "success" ? DARK.success : DARK.error,
              border: `1px solid ${feedback.type === "success" ? "rgba(34,197,94,0.25)" : "rgba(248,113,113,0.25)"}`
            }}>
              {feedback.type === "success" ? "✓" : "⚠"} {feedback.msg}
            </div>
          )}

          <button
            onClick={handleSave}
            disabled={loading}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.7rem 1.5rem",
              background: loading ? "rgba(76,143,219,0.3)" : "linear-gradient(135deg, #1a6fdb, #0050a0)",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              fontSize: "0.85rem",
              fontWeight: 700,
              cursor: loading ? "not-allowed" : "pointer",
              boxShadow: "0 4px 15px rgba(0,80,160,0.35)",
              transition: "opacity 0.2s ease",
              letterSpacing: "0.3px"
            }}
          >
            {loading ? (
              <>⟳ Salvando...</>
            ) : (
              <>☁ Publicar Alterações</>
            )}
          </button>
        </div>
      </div>

      {/* Project List */}
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {projects.map((project, index) => {
          const isExpanded = expandedId === project.id;
          return (
            <div
              key={project.id}
              style={{
                background: DARK.card,
                border: `1px solid ${isExpanded ? DARK.accent : DARK.cardBorder}`,
                borderRadius: "14px",
                overflow: "hidden",
                transition: "border-color 0.2s ease, box-shadow 0.2s ease",
                boxShadow: isExpanded ? "0 0 0 1px rgba(76,143,219,0.15)" : "none"
              }}
            >
              {/* Card Header Row */}
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                padding: "1rem 1.2rem",
                cursor: "pointer"
              }}
                onClick={() => setExpandedId(isExpanded ? null : project.id)}
              >
                {/* Order Badge */}
                <div style={{
                  minWidth: "32px",
                  height: "32px",
                  borderRadius: "8px",
                  background: DARK.accentMuted,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "0.8rem",
                  fontWeight: 700,
                  color: DARK.accent
                }}>
                  #{index + 1}
                </div>

                {/* Thumbnail */}
                <img
                  src={project.heroImage}
                  alt={project.title}
                  style={{ width: "52px", height: "52px", borderRadius: "8px", objectFit: "cover", border: `1px solid ${DARK.cardBorder}`, flexShrink: 0 }}
                />

                {/* Info */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 700, color: DARK.text, fontSize: "0.95rem", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {project.title}
                  </div>
                  <div style={{ fontSize: "0.75rem", color: DARK.textMuted, marginTop: "0.2rem" }}>
                    {project.location}
                  </div>
                </div>

                {/* Status Badge */}
                <span style={{
                  padding: "0.3rem 0.8rem",
                  borderRadius: "6px",
                  fontSize: "0.72rem",
                  fontWeight: 700,
                  letterSpacing: "0.5px",
                  background: DARK.badge,
                  color: DARK.accent,
                  whiteSpace: "nowrap"
                }}>
                  {project.status}
                </span>

                {/* Reorder Buttons */}
                <div style={{ display: "flex", flexDirection: "column", gap: "2px" }} onClick={e => e.stopPropagation()}>
                  <button
                    onClick={() => moveProject(index, "up")}
                    disabled={index === 0}
                    style={{
                      width: "28px", height: "28px",
                      background: index === 0 ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.07)",
                      border: `1px solid ${DARK.cardBorder}`,
                      borderRadius: "5px",
                      color: index === 0 ? "rgba(255,255,255,0.15)" : DARK.text,
                      cursor: index === 0 ? "not-allowed" : "pointer",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: "0.75rem"
                    }}
                  >▲</button>
                  <button
                    onClick={() => moveProject(index, "down")}
                    disabled={index === projects.length - 1}
                    style={{
                      width: "28px", height: "28px",
                      background: index === projects.length - 1 ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.07)",
                      border: `1px solid ${DARK.cardBorder}`,
                      borderRadius: "5px",
                      color: index === projects.length - 1 ? "rgba(255,255,255,0.15)" : DARK.text,
                      cursor: index === projects.length - 1 ? "not-allowed" : "pointer",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: "0.75rem"
                    }}
                  >▼</button>
                </div>

                {/* Expand toggle */}
                <span style={{ color: DARK.textMuted, fontSize: "0.9rem", transition: "transform 0.2s", transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)" }}>▾</span>
              </div>

              {/* Expanded Edit Area */}
              {isExpanded && (
                <div style={{
                  borderTop: `1px solid ${DARK.cardBorder}`,
                  padding: "1.2rem",
                  background: "rgba(0,0,0,0.2)",
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem"
                }}>
                  <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                    <EditableField label="Título" value={project.title} onChange={v => updateField(index, "title", v)} />
                    <div style={{ width: "160px", flexShrink: 0 }}>
                      <EditableField label="Status (Tag)" value={project.status} onChange={v => updateField(index, "status", v)} />
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                    <EditableField label="Localização" value={project.location} onChange={v => updateField(index, "location", v)} />
                  </div>
                  <EditableField label="Descrição Comercial" value={project.desc} onChange={v => updateField(index, "desc", v)} multiline />

                  {/* Gallery preview */}
                  {project.gallery && project.gallery.length > 0 && (
                    <div>
                      <div style={{ fontSize: "0.65rem", color: DARK.textMuted, fontWeight: 700, letterSpacing: "1.2px", textTransform: "uppercase", marginBottom: "0.5rem" }}>
                        Galeria ({project.gallery.length} fotos)
                      </div>
                      <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                        {project.gallery.slice(0, 6).map((img, gi) => (
                          <img
                            key={gi}
                            src={img}
                            alt={`foto ${gi + 1}`}
                            style={{ width: "72px", height: "72px", borderRadius: "6px", objectFit: "cover", border: `1px solid ${DARK.cardBorder}` }}
                          />
                        ))}
                        {project.gallery.length > 6 && (
                          <div style={{ width: "72px", height: "72px", borderRadius: "6px", background: DARK.inputBg, border: `1px solid ${DARK.cardBorder}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.75rem", color: DARK.textMuted, fontWeight: 700 }}>
                            +{project.gallery.length - 6}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}
