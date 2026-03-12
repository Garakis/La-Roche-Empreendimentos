"use client";

import { useState, useRef } from "react";
import { Project } from "@/lib/data";
import Lightbox from "@/components/Lightbox";

const D = {
  bg: "#0f1117",
  card: "#181c25",
  cardBorder: "rgba(255,255,255,0.07)",
  inputBg: "#1e2230",
  inputBorder: "rgba(255,255,255,0.1)",
  inputBorderFocus: "#4c8fdb",
  text: "#e8eaf0",
  textMuted: "rgba(255,255,255,0.4)",
  accent: "#4c8fdb",
  accentBg: "rgba(76,143,219,0.12)",
  dangerBg: "rgba(248,113,113,0.08)",
  dangerBorder: "rgba(248,113,113,0.25)",
  danger: "#f87171",
  success: "#22c55e",
  successBg: "rgba(34,197,94,0.1)",
  error: "#f87171",
  errorBg: "rgba(248,113,113,0.1)",
};

// ── Helpers ──────────────────────────────────────────────────────────────────
const generateId = (title: string) =>
  title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "").slice(0, 40) + "-" + Date.now().toString(36);

const isVideo = (url: string) => /\.(mp4|webm|mov|ogg)(\?.*)?$/i.test(url);

// ── Sub-components ────────────────────────────────────────────────────────────
function Field({ label, value, onChange, multiline, placeholder }: {
  label: string; value: string; onChange: (v: string) => void;
  multiline?: boolean; placeholder?: string;
}) {
  const base: React.CSSProperties = {
    width: "100%", background: D.inputBg, border: `1px solid ${D.inputBorder}`,
    borderRadius: "8px", color: D.text, fontSize: "0.875rem", padding: "0.6rem 0.85rem",
    outline: "none", boxSizing: "border-box", fontFamily: "'Montserrat', sans-serif",
    resize: "vertical" as const, transition: "border-color 0.2s",
  };
  return (
    <div style={{ flex: 1 }}>
      <div style={{ fontSize: "0.65rem", color: D.textMuted, fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", marginBottom: "0.35rem" }}>{label}</div>
      {multiline
        ? <textarea rows={3} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} style={base}
            onFocus={e => e.target.style.borderColor = D.inputBorderFocus}
            onBlur={e => e.target.style.borderColor = D.inputBorder} />
        : <input type="text" value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} style={{ ...base, resize: undefined }}
            onFocus={e => e.target.style.borderColor = D.inputBorderFocus}
            onBlur={e => e.target.style.borderColor = D.inputBorder} />}
    </div>
  );
}

function UploadZone({ projectId, onUploaded }: { projectId: string; onUploaded: (url: string) => void }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [uploadError, setUploadError] = useState("");

  const uploadFile = async (file: File) => {
    setUploading(true);
    setUploadError("");
    const formData = new FormData();
    formData.append("file", file);
    formData.append("projectId", projectId);
    try {
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await res.json();
      if (res.ok && data.url) {
        onUploaded(data.url);
      } else {
        setUploadError(data.error || "Erro no upload");
      }
    } catch {
      setUploadError("Erro de rede");
    }
    setUploading(false);
  };

  const handleFiles = (files: FileList | null) => {
    if (!files) return;
    Array.from(files).forEach(f => uploadFile(f));
  };

  return (
    <div style={{ marginTop: "0.75rem" }}>
      <div style={{ fontSize: "0.65rem", color: D.textMuted, fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", marginBottom: "0.35rem" }}>Upload de Fotos/Vídeos</div>
      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={e => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={e => { e.preventDefault(); setDragOver(false); handleFiles(e.dataTransfer.files); }}
        style={{
          border: `2px dashed ${dragOver ? D.accent : D.inputBorder}`,
          borderRadius: "10px",
          padding: "1.25rem",
          textAlign: "center",
          cursor: "pointer",
          background: dragOver ? D.accentBg : "rgba(255,255,255,0.02)",
          transition: "all 0.2s",
          color: D.textMuted,
          fontSize: "0.82rem"
        }}
      >
        {uploading
          ? <span style={{ color: D.accent }}>⟳ Enviando...</span>
          : <span>📁 Clique ou arraste fotos/vídeos aqui<br /><span style={{ fontSize: "0.72rem", opacity: 0.6 }}>JPG, PNG, WEBP, MP4, MOV</span></span>
        }
      </div>
      {uploadError && <div style={{ color: D.error, fontSize: "0.78rem", marginTop: "0.35rem" }}>⚠ {uploadError}</div>}
      <input
        ref={inputRef}
        type="file"
        multiple
        accept="image/*,video/*"
        style={{ display: "none" }}
        onChange={e => handleFiles(e.target.files)}
      />
    </div>
  );
}

function ModalOverlay({ children, onClose }: { children: React.ReactNode; onClose: () => void }) {
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 500, background: "rgba(0,0,0,0.6)", display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }} onClick={onClose}>
      <div onClick={e => e.stopPropagation()} style={{ background: "#1a1e2b", border: `1px solid ${D.cardBorder}`, borderRadius: "16px", padding: "2rem", width: "100%", maxWidth: "500px", boxShadow: "0 30px 80px rgba(0,0,0,0.5)" }}>
        {children}
      </div>
    </div>
  );
}

function ConfirmModal({ onClose, onConfirm, count }: { onClose: () => void; onConfirm: () => void; count: number }) {
  return (
    <ModalOverlay onClose={onClose}>
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>☁️</div>
        <h2 style={{ color: D.text, fontFamily: "'Playfair Display', serif", marginBottom: "0.5rem", fontSize: "1.3rem" }}>Publicar Alterações</h2>
        <p style={{ color: D.textMuted, fontSize: "0.875rem", marginBottom: "2rem" }}>
          Você está prestes a atualizar <strong style={{ color: D.text }}>{count} empreendimento{count !== 1 ? "s" : ""}</strong> no banco de dados. Esta ação afetará o site ao vivo.
        </p>
        <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center" }}>
          <button onClick={onClose} style={{ padding: "0.7rem 1.5rem", background: "rgba(255,255,255,0.05)", border: `1px solid ${D.cardBorder}`, borderRadius: "8px", color: D.textMuted, cursor: "pointer", fontFamily: "'Montserrat', sans-serif" }}>
            Cancelar
          </button>
          <button onClick={onConfirm} style={{ padding: "0.7rem 1.5rem", background: "linear-gradient(135deg, #1a6fdb, #0050a0)", border: "none", borderRadius: "8px", color: "#fff", fontWeight: 700, cursor: "pointer", fontFamily: "'Montserrat', sans-serif" }}>
            Confirmar e Publicar ✓
          </button>
        </div>
      </div>
    </ModalOverlay>
  );
}

function DeleteModal({ project, onClose, onConfirm }: { project: Project; onClose: () => void; onConfirm: () => void }) {
  return (
    <ModalOverlay onClose={onClose}>
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>🗑️</div>
        <h2 style={{ color: D.text, fontFamily: "'Playfair Display', serif", marginBottom: "0.5rem", fontSize: "1.3rem" }}>Excluir Empreendimento</h2>
        <p style={{ color: D.textMuted, fontSize: "0.875rem", marginBottom: "2rem" }}>
          Tem certeza que deseja excluir <strong style={{ color: D.danger }}>{project.title}</strong>? Esta ação é irreversível e removerá o registro do banco de dados.
        </p>
        <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center" }}>
          <button onClick={onClose} style={{ padding: "0.7rem 1.5rem", background: "rgba(255,255,255,0.05)", border: `1px solid ${D.cardBorder}`, borderRadius: "8px", color: D.textMuted, cursor: "pointer", fontFamily: "'Montserrat', sans-serif" }}>
            Cancelar
          </button>
          <button onClick={onConfirm} style={{ padding: "0.7rem 1.5rem", background: D.dangerBg, border: `1px solid ${D.dangerBorder}`, borderRadius: "8px", color: D.danger, fontWeight: 700, cursor: "pointer", fontFamily: "'Montserrat', sans-serif" }}>
            Excluir Definitivamente
          </button>
        </div>
      </div>
    </ModalOverlay>
  );
}

const EMPTY_PROJECT: Omit<Project, "id" | "order"> = {
  title: "", location: "", status: "Pronto", statusClass: "ready",
  desc: "", heroImage: "", innerImage: "", gallery: [],
};

function CreatePanel({ onSave, onClose }: { onSave: (p: Project) => void; onClose: () => void }) {
  const [form, setForm] = useState({ ...EMPTY_PROJECT });
  const [galleryText, setGalleryText] = useState("");

  const set = (field: string) => (v: string) => setForm(f => ({ ...f, [field]: v }));

  const handleSubmit = () => {
    if (!form.title.trim()) return alert("Título é obrigatório");
    const gallery = galleryText.split("\n").map(s => s.trim()).filter(Boolean);
    const newProject: Project = {
      ...form,
      id: generateId(form.title),
      gallery,
      order: 9999, // will be reassigned after sort
    };
    onSave(newProject);
  };

  const statusOptions = [
    { value: "Pronto", cls: "ready" },
    { value: "Lançamento", cls: "release" },
    { value: "Em Obras", cls: "construction" },
  ];

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 400, background: "rgba(0,0,0,0.55)", display: "flex", justifyContent: "flex-end" }} onClick={onClose}>
      <div
        onClick={e => e.stopPropagation()}
        style={{
          width: "min(550px, 100%)", height: "100%", background: "#13172070",
          backdropFilter: "blur(20px)",
          borderLeft: `1px solid ${D.cardBorder}`,
          overflowY: "auto", padding: "2rem",
          display: "flex", flexDirection: "column", gap: "1.25rem",
          boxShadow: "-20px 0 60px rgba(0,0,0,0.5)"
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h2 style={{ color: D.text, fontFamily: "'Playfair Display', serif", fontSize: "1.3rem", margin: 0 }}>Novo Empreendimento</h2>
          <button onClick={onClose} style={{ background: "rgba(255,255,255,0.06)", border: "none", color: D.textMuted, borderRadius: "50%", width: "36px", height: "36px", cursor: "pointer", fontSize: "1rem" }}>✕</button>
        </div>

        <Field label="Título *" value={form.title} onChange={set("title")} placeholder="Ex: Casa Pinda 03" />
        <Field label="Localização" value={form.location} onChange={set("location")} placeholder="Ex: Pindamonhangaba, SP" />

        <div>
          <div style={{ fontSize: "0.65rem", color: D.textMuted, fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", marginBottom: "0.5rem" }}>Status</div>
          <div style={{ display: "flex", gap: "0.5rem" }}>
            {statusOptions.map(opt => (
              <button
                key={opt.cls}
                onClick={() => setForm(f => ({ ...f, status: opt.value, statusClass: opt.cls }))}
                style={{
                  flex: 1, padding: "0.5rem", borderRadius: "7px", cursor: "pointer", fontSize: "0.8rem", fontWeight: 600,
                  border: form.status === opt.value ? `2px solid ${D.accent}` : `1px solid ${D.cardBorder}`,
                  background: form.status === opt.value ? D.accentBg : "transparent",
                  color: form.status === opt.value ? D.accent : D.textMuted,
                  fontFamily: "'Montserrat', sans-serif"
                }}
              >{opt.value}</button>
            ))}
          </div>
        </div>

        <Field label="Descrição Comercial" value={form.desc} onChange={set("desc")} multiline placeholder="Descreva o empreendimento para os visitantes..." />
        <Field label="URL da Imagem de Capa (heroImage)" value={form.heroImage} onChange={set("heroImage")} placeholder="https://..." />
        <Field label="URL da Imagem Interna (innerImage)" value={form.innerImage} onChange={set("innerImage")} placeholder="https://..." />

        <div style={{ flex: 1 }}>
          <div style={{ fontSize: "0.65rem", color: D.textMuted, fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", marginBottom: "0.35rem" }}>URLs da Galeria (uma por linha)</div>
          <textarea
            rows={5}
            value={galleryText}
            onChange={e => setGalleryText(e.target.value)}
            placeholder={"https://url1.jpg\nhttps://url2.jpg\nhttps://video.mp4"}
            style={{ width: "100%", background: D.inputBg, border: `1px solid ${D.inputBorder}`, borderRadius: "8px", color: D.text, fontSize: "0.875rem", padding: "0.6rem 0.85rem", outline: "none", boxSizing: "border-box", fontFamily: "monospace", resize: "vertical" }}
          />
        </div>

        {/* Preview capa */}
        {form.heroImage && (
          <img src={form.heroImage} alt="Preview" style={{ width: "100%", height: "160px", objectFit: "cover", borderRadius: "8px", border: `1px solid ${D.cardBorder}` }} />
        )}

        <button
          onClick={handleSubmit}
          style={{ padding: "0.85rem", background: "linear-gradient(135deg, #1a6fdb, #0050a0)", border: "none", borderRadius: "8px", color: "#fff", fontWeight: 700, cursor: "pointer", fontFamily: "'Montserrat', sans-serif", fontSize: "0.9rem", boxShadow: "0 4px 15px rgba(0,80,160,0.3)" }}
        >
          + Adicionar Empreendimento
        </button>
      </div>
    </div>
  );
}

// ── Main Dashboard ────────────────────────────────────────────────────────────
export default function AdminDashboardClient({ initialProjects }: { initialProjects: Project[] }) {
  const [projects, setProjects] = useState<Project[]>(
    [...initialProjects].sort((a, b) => a.order - b.order)
  );
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; msg: string } | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<Project | null>(null);
  const [showCreate, setShowCreate] = useState(false);
  const [lightbox, setLightbox] = useState<{ items: string[]; index: number } | null>(null);
  const [uploadingIds, setUploadingIds] = useState<Set<string>>(new Set());

  const updateField = (index: number, field: keyof Project, value: any) => {
    setProjects(prev => { const n = [...prev]; (n[index] as any)[field] = value; return n; });
    setFeedback(null);
  };

  const move = (index: number, dir: "up" | "down") => {
    setProjects(prev => {
      const n = [...prev];
      if (dir === "up" && index > 0) [n[index - 1], n[index]] = [n[index], n[index - 1]];
      else if (dir === "down" && index < n.length - 1) [n[index + 1], n[index]] = [n[index], n[index + 1]];
      n.forEach((p, i) => { p.order = i + 1; });
      return n;
    });
    setFeedback(null);
  };

  const doSave = async () => {
    setShowConfirm(false);
    setSaving(true);
    setFeedback(null);
    try {
      const res = await fetch("/api/projects", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(projects) });
      if (res.ok) {
        setFeedback({ type: "success", msg: "Publicado com sucesso!" });
        setTimeout(() => setFeedback(null), 6000);
      } else throw new Error();
    } catch { setFeedback({ type: "error", msg: "Erro ao salvar. Verifique o Supabase." }); }
    setSaving(false);
  };

  const doDelete = async () => {
    if (!deleteTarget) return;
    const id = deleteTarget.id;
    setDeleteTarget(null);
    // remove locally first
    setProjects(prev => prev.filter(p => p.id !== id).map((p, i) => ({ ...p, order: i + 1 })));
    // then remove from DB
    await fetch(`/api/projects?id=${encodeURIComponent(id)}`, { method: "DELETE" });
    setFeedback({ type: "success", msg: `"${deleteTarget.title}" excluído.` });
    setTimeout(() => setFeedback(null), 5000);
  };

  const addProject = (p: Project) => {
    setProjects(prev => {
      const n = [...prev, { ...p, order: prev.length + 1 }];
      return n;
    });
    setShowCreate(false);
    setExpandedId(p.id);
    setFeedback({ type: "success", msg: "Empreendimento adicionado! Clique em Publicar para salvar." });
    setTimeout(() => setFeedback(null), 6000);
  };

  return (
    <>
      {/* Modals */}
      {showConfirm && <ConfirmModal count={projects.length} onClose={() => setShowConfirm(false)} onConfirm={doSave} />}
      {deleteTarget && <DeleteModal project={deleteTarget} onClose={() => setDeleteTarget(null)} onConfirm={doDelete} />}
      {showCreate && <CreatePanel onSave={addProject} onClose={() => setShowCreate(false)} />}
      {lightbox && <Lightbox items={lightbox.items} initialIndex={lightbox.index} onClose={() => setLightbox(null)} />}

      {/* Action Bar */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem", gap: "0.75rem", flexWrap: "wrap" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <div style={{ fontSize: "0.8rem", color: D.textMuted }}>{projects.length} empreendimento{projects.length !== 1 ? "s" : ""}</div>
          <button
            onClick={() => setShowCreate(true)}
            style={{ display: "flex", alignItems: "center", gap: "0.4rem", padding: "0.6rem 1rem", background: D.accentBg, border: `1px solid rgba(76,143,219,0.3)`, borderRadius: "8px", color: D.accent, fontWeight: 700, cursor: "pointer", fontSize: "0.8rem", fontFamily: "'Montserrat', sans-serif" }}
          >＋ Novo Empreendimento</button>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          {feedback && (
            <div style={{ padding: "0.45rem 0.9rem", borderRadius: "7px", fontSize: "0.78rem", fontWeight: 600, background: feedback.type === "success" ? D.successBg : D.errorBg, color: feedback.type === "success" ? D.success : D.error, border: `1px solid ${feedback.type === "success" ? "rgba(34,197,94,0.25)" : "rgba(248,113,113,0.25)"}` }}>
              {feedback.type === "success" ? "✓ " : "⚠ "}{feedback.msg}
            </div>
          )}
          <button
            onClick={() => setShowConfirm(true)}
            disabled={saving}
            style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.7rem 1.4rem", background: saving ? "rgba(76,143,219,0.3)" : "linear-gradient(135deg, #1a6fdb, #0050a0)", color: "#fff", border: "none", borderRadius: "8px", fontSize: "0.85rem", fontWeight: 700, cursor: saving ? "not-allowed" : "pointer", boxShadow: "0 4px 15px rgba(0,80,160,0.3)", fontFamily: "'Montserrat', sans-serif" }}
          >{saving ? "⟳ Salvando..." : "☁ Publicar Alterações"}</button>
        </div>
      </div>

      {/* Project Cards */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        {projects.map((project, idx) => {
          const isOpen = expandedId === project.id;
          const allMedia = [...(project.gallery || [])];

          return (
            <div key={project.id} style={{ background: D.card, border: `1px solid ${isOpen ? D.accent : D.cardBorder}`, borderRadius: "12px", overflow: "hidden", transition: "border-color 0.2s" }}>
              {/* Row */}
              <div style={{ display: "flex", alignItems: "center", gap: "1rem", padding: "0.9rem 1.1rem", cursor: "pointer" }} onClick={() => setExpandedId(isOpen ? null : project.id)}>
                <span style={{ minWidth: "28px", height: "28px", borderRadius: "7px", background: D.accentBg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.75rem", fontWeight: 700, color: D.accent }}>#{idx + 1}</span>
                <img src={project.heroImage} alt={project.title} style={{ width: "48px", height: "48px", borderRadius: "7px", objectFit: "cover", border: `1px solid ${D.cardBorder}`, flexShrink: 0 }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 700, color: D.text, fontSize: "0.9rem", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{project.title}</div>
                  <div style={{ fontSize: "0.72rem", color: D.textMuted }}>{project.location}</div>
                </div>
                <span style={{ padding: "0.25rem 0.65rem", borderRadius: "5px", fontSize: "0.7rem", fontWeight: 700, background: D.accentBg, color: D.accent, whiteSpace: "nowrap" }}>{project.status}</span>
                {allMedia.length > 0 && <span style={{ fontSize: "0.72rem", color: D.textMuted }}>📸 {allMedia.length}</span>}

                {/* Reorder */}
                <div style={{ display: "flex", flexDirection: "column", gap: "2px" }} onClick={e => e.stopPropagation()}>
                  {[{ dir: "up" as const, label: "▲", disabled: idx === 0 }, { dir: "down" as const, label: "▼", disabled: idx === projects.length - 1 }].map(({ dir, label, disabled }) => (
                    <button key={dir} onClick={() => move(idx, dir)} disabled={disabled}
                      style={{ width: "26px", height: "26px", border: `1px solid ${D.cardBorder}`, borderRadius: "4px", background: disabled ? "transparent" : "rgba(255,255,255,0.05)", color: disabled ? "rgba(255,255,255,0.12)" : D.textMuted, cursor: disabled ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.7rem" }}
                    >{label}</button>
                  ))}
                </div>

                {/* Delete */}
                <button onClick={e => { e.stopPropagation(); setDeleteTarget(project); }}
                  style={{ background: D.dangerBg, border: `1px solid ${D.dangerBorder}`, color: D.danger, borderRadius: "7px", padding: "0.3rem 0.6rem", cursor: "pointer", fontSize: "0.75rem", fontFamily: "'Montserrat', sans-serif" }}
                  title="Excluir empreendimento"
                >🗑</button>

                <span style={{ color: D.textMuted, transform: isOpen ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}>▾</span>
              </div>

              {/* Expanded Editor */}
              {isOpen && (
                <div style={{ borderTop: `1px solid ${D.cardBorder}`, padding: "1.25rem", background: "rgba(0,0,0,0.2)" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 160px", gap: "0.75rem", marginBottom: "0.75rem" }}>
                    <Field label="Título" value={project.title} onChange={v => updateField(idx, "title", v)} />
                    <Field label="Status" value={project.status} onChange={v => updateField(idx, "status", v)} />
                  </div>
                  <div style={{ marginBottom: "0.75rem" }}>
                    <Field label="Localização" value={project.location} onChange={v => updateField(idx, "location", v)} />
                  </div>
                  <div style={{ marginBottom: "0.75rem" }}>
                    <Field label="Descrição Comercial" value={project.desc} onChange={v => updateField(idx, "desc", v)} multiline />
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", marginBottom: "1rem" }}>
                    <Field label="URL Imagem Capa (heroImage)" value={project.heroImage} onChange={v => updateField(idx, "heroImage", v)} placeholder="https://..." />
                    <Field label="URL Imagem Interna" value={project.innerImage} onChange={v => updateField(idx, "innerImage", v)} placeholder="https://..." />
                  </div>

                  {/* Gallery */}
                  {allMedia.length > 0 && (
                    <div>
                      <div style={{ fontSize: "0.65rem", color: D.textMuted, fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", marginBottom: "0.5rem" }}>
                        Galeria · clique para ampliar · ⭐ para definir como capa
                      </div>
                      <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                        {allMedia.map((url, gi) => (
                          <div key={gi} style={{ position: "relative" }}>
                            <div
                              onClick={() => setLightbox({ items: allMedia, index: gi })}
                              style={{ width: "80px", height: "80px", borderRadius: "8px", overflow: "hidden", cursor: "pointer", border: url === project.heroImage ? `2px solid gold` : `1px solid ${D.cardBorder}` }}
                            >
                              {isVideo(url)
                                ? <div style={{ width: "100%", height: "100%", background: "#222", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff" }}>▶</div>
                                : <img src={url} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                              }
                            </div>
                            {/* Set as cover */}
                            {!isVideo(url) && (
                              <button
                                title="Definir como capa"
                                onClick={() => updateField(idx, "heroImage", url)}
                                style={{ position: "absolute", top: "2px", right: "2px", background: url === project.heroImage ? "gold" : "rgba(0,0,0,0.5)", border: "none", borderRadius: "50%", width: "20px", height: "20px", fontSize: "0.65rem", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
                              >⭐</button>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Gallery URL editor */}
                  <div style={{ marginTop: "0.75rem" }}>
                    <div style={{ fontSize: "0.65rem", color: D.textMuted, fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", marginBottom: "0.35rem" }}>URLs da Galeria (uma por linha)</div>
                    <textarea
                      rows={3}
                      value={(project.gallery || []).join("\n")}
                      onChange={e => updateField(idx, "gallery", e.target.value.split("\n").map(s => s.trim()).filter(Boolean))}
                      style={{ width: "100%", background: D.inputBg, border: `1px solid ${D.inputBorder}`, borderRadius: "8px", color: D.text, fontSize: "0.8rem", padding: "0.6rem 0.85rem", outline: "none", boxSizing: "border-box", fontFamily: "monospace", resize: "vertical" }}
                    />
                  </div>

                  {/* Upload Zone */}
                  <UploadZone
                    projectId={project.id}
                    onUploaded={url => {
                      updateField(idx, "gallery", [...(project.gallery || []), url]);
                      setFeedback({ type: "success", msg: "Arquivo enviado com sucesso! Clique em Publicar para salvar." });
                      setTimeout(() => setFeedback(null), 6000);
                    }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}
