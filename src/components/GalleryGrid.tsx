"use client";

import { useState } from "react";
import Lightbox from "@/components/Lightbox";

interface Props {
  gallery: string[];
  title: string;
}

const isVideo = (url: string) => /\.(mp4|webm|mov|ogg)(\?.*)?$/i.test(url);

export default function GalleryGrid({ gallery, title }: Props) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  if (!gallery || gallery.length === 0) return null;

  return (
    <>
      {lightboxIndex !== null && (
        <Lightbox items={gallery} initialIndex={lightboxIndex} onClose={() => setLightboxIndex(null)} />
      )}

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "0.75rem", marginTop: "2.5rem" }}>
        {gallery.map((url, i) => (
          <div
            key={i}
            onClick={() => setLightboxIndex(i)}
            style={{
              position: "relative", borderRadius: "10px", overflow: "hidden",
              cursor: "pointer", height: "200px",
              boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
              transition: "transform 0.25s ease, box-shadow 0.25s ease"
            }}
            onMouseOver={e => {
              (e.currentTarget as HTMLElement).style.transform = "scale(1.03)";
              (e.currentTarget as HTMLElement).style.boxShadow = "0 10px 30px rgba(0,49,94,0.25)";
            }}
            onMouseOut={e => {
              (e.currentTarget as HTMLElement).style.transform = "scale(1)";
              (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 15px rgba(0,0,0,0.1)";
            }}
          >
            {isVideo(url) ? (
              <div style={{ width: "100%", height: "100%", background: "#00315e", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "0.5rem" }}>
                <span style={{ fontSize: "2.5rem" }}>▶</span>
                <span style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.75rem", fontWeight: 600, letterSpacing: "1px", textTransform: "uppercase" }}>Vídeo</span>
              </div>
            ) : (
              <img src={url} alt={`${title} - Foto ${i + 1}`} loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            )}
            {/* Hover overlay */}
            <div style={{ position: "absolute", inset: 0, background: "rgba(0,49,94,0)", transition: "background 0.25s", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ opacity: 0, transition: "opacity 0.25s", background: "rgba(0,0,0,0.4)", borderRadius: "50%", width: "48px", height: "48px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.2rem", color: "#fff" }}>
                🔍
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
