"use client";

import { useState, useEffect, useCallback } from "react";

interface LightboxProps {
  items: string[]; // URLs: images or video files (.mp4, .webm, .mov)
  initialIndex?: number;
  onClose: () => void;
}

const isVideo = (url: string) =>
  /\.(mp4|webm|mov|ogg)(\?.*)?$/i.test(url);

export default function Lightbox({ items, initialIndex = 0, onClose }: LightboxProps) {
  const [current, setCurrent] = useState(initialIndex);

  const prev = useCallback(() => setCurrent(i => (i - 1 + items.length) % items.length), [items.length]);
  const next = useCallback(() => setCurrent(i => (i + 1) % items.length), [items.length]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      else if (e.key === "ArrowRight") next();
      else if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [prev, next, onClose]);

  const url = items[current];

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 9999,
        background: "rgba(0,0,0,0.92)",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
      }}
    >
      {/* Top bar */}
      <div
        style={{ position: "absolute", top: 0, left: 0, right: 0, padding: "1rem 1.5rem", display: "flex", justifyContent: "space-between", alignItems: "center", background: "linear-gradient(to bottom, rgba(0,0,0,0.6), transparent)", zIndex: 2 }}
        onClick={e => e.stopPropagation()}
      >
        <span style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.85rem", fontWeight: 600 }}>
          {current + 1} / {items.length}
        </span>
        <button
          onClick={onClose}
          style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", color: "#fff", borderRadius: "50%", width: "40px", height: "40px", cursor: "pointer", fontSize: "1.2rem", display: "flex", alignItems: "center", justifyContent: "center" }}
        >✕</button>
      </div>

      {/* Media */}
      <div onClick={e => e.stopPropagation()} style={{ maxWidth: "90vw", maxHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        {isVideo(url) ? (
          <video
            src={url}
            controls
            autoPlay
            style={{ maxWidth: "90vw", maxHeight: "80vh", borderRadius: "8px" }}
          />
        ) : (
          <img
            src={url}
            alt={`Mídia ${current + 1}`}
            style={{ maxWidth: "90vw", maxHeight: "80vh", objectFit: "contain", borderRadius: "8px", userSelect: "none" }}
          />
        )}
      </div>

      {/* Arrows */}
      {items.length > 1 && (
        <>
          <button
            onClick={e => { e.stopPropagation(); prev(); }}
            style={{
              position: "absolute", left: "1rem", top: "50%", transform: "translateY(-50%)",
              background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)",
              color: "#fff", borderRadius: "50%", width: "48px", height: "48px",
              cursor: "pointer", fontSize: "1.4rem", display: "flex", alignItems: "center", justifyContent: "center"
            }}
          >‹</button>
          <button
            onClick={e => { e.stopPropagation(); next(); }}
            style={{
              position: "absolute", right: "1rem", top: "50%", transform: "translateY(-50%)",
              background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)",
              color: "#fff", borderRadius: "50%", width: "48px", height: "48px",
              cursor: "pointer", fontSize: "1.4rem", display: "flex", alignItems: "center", justifyContent: "center"
            }}
          >›</button>
        </>
      )}

      {/* Thumbnail strip */}
      {items.length > 1 && (
        <div
          onClick={e => e.stopPropagation()}
          style={{
            position: "absolute", bottom: 0, left: 0, right: 0,
            padding: "1rem",
            background: "linear-gradient(to top, rgba(0,0,0,0.7), transparent)",
            display: "flex", gap: "0.5rem", overflowX: "auto", justifyContent: "center"
          }}
        >
          {items.map((item, i) => (
            <div
              key={i}
              onClick={() => setCurrent(i)}
              style={{
                width: "56px", height: "56px", flexShrink: 0, borderRadius: "6px", overflow: "hidden",
                cursor: "pointer", border: i === current ? "2px solid #fff" : "2px solid transparent",
                opacity: i === current ? 1 : 0.55, transition: "all 0.15s ease"
              }}
            >
              {isVideo(item) ? (
                <div style={{ width: "100%", height: "100%", background: "#333", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: "1.2rem" }}>▶</div>
              ) : (
                <img src={item} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
