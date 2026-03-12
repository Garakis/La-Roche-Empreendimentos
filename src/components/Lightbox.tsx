"use client";

import { useState, useEffect, useCallback } from "react";

interface LightboxProps {
  items: string[];
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
    <>
      <style>{`
        .lb-overlay {
          position: fixed; inset: 0; z-index: 9999;
          background: rgba(0,0,0,0.94);
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          touch-action: pan-y;
        }
        .lb-topbar {
          position: absolute; top: 0; left: 0; right: 0;
          padding: 0.85rem 1rem;
          display: flex; justify-content: space-between; align-items: center;
          background: linear-gradient(to bottom, rgba(0,0,0,0.65), transparent);
          z-index: 2;
        }
        .lb-counter { color: rgba(255,255,255,0.6); font-size: 0.8rem; font-weight: 600; font-family: 'Montserrat', sans-serif; }
        .lb-close {
          background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2);
          color: #fff; border-radius: 50%; width: 38px; height: 38px;
          cursor: pointer; font-size: 1.1rem;
          display: flex; align-items: center; justify-content: center;
        }
        .lb-media-wrap {
          max-width: 92vw; max-height: 78vh;
          display: flex; align-items: center; justify-content: center;
        }
        .lb-media-wrap img, .lb-media-wrap video {
          max-width: 92vw; max-height: 78vh;
          object-fit: contain; border-radius: 6px; user-select: none;
        }
        .lb-arrow {
          position: absolute; top: 50%; transform: translateY(-50%);
          background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2);
          color: #fff; border-radius: 50%;
          width: 44px; height: 44px;
          cursor: pointer; font-size: 1.4rem;
          display: flex; align-items: center; justify-content: center;
          transition: background 0.2s;
          z-index: 3;
        }
        .lb-arrow:hover { background: rgba(255,255,255,0.2); }
        .lb-arrow.prev { left: 0.6rem; }
        .lb-arrow.next { right: 0.6rem; }
        .lb-strip {
          position: absolute; bottom: 0; left: 0; right: 0;
          padding: 0.75rem;
          background: linear-gradient(to top, rgba(0,0,0,0.7), transparent);
          display: flex; gap: 0.4rem; overflow-x: auto; justify-content: center;
          scrollbar-width: none;
        }
        .lb-strip::-webkit-scrollbar { display: none; }
        .lb-thumb {
          width: 50px; height: 50px; flex-shrink: 0;
          border-radius: 5px; overflow: hidden; cursor: pointer;
          transition: all 0.15s ease;
          border: 2px solid transparent;
          opacity: 0.5;
        }
        .lb-thumb.active { border-color: #fff; opacity: 1; }
        .lb-thumb img, .lb-thumb .vt { width: 100%; height: 100%; object-fit: cover; }
        .lb-thumb .vt { background: #333; display: flex; align-items: center; justify-content: center; color: #fff; font-size: 1rem; }
        @media (max-width: 600px) {
          .lb-arrow.prev { left: 0.2rem; }
          .lb-arrow.next { right: 0.2rem; }
          .lb-arrow { width: 38px; height: 38px; font-size: 1.1rem; }
          .lb-media-wrap { max-width: 100vw; max-height: 70vh; }
          .lb-media-wrap img, .lb-media-wrap video { max-width: 100vw; max-height: 70vh; border-radius: 0; }
          .lb-thumb { width: 44px; height: 44px; }
        }
      `}</style>

      <div className="lb-overlay" onClick={onClose}>
        {/* Top bar */}
        <div className="lb-topbar" onClick={e => e.stopPropagation()}>
          <span className="lb-counter">{current + 1} / {items.length}</span>
          <button className="lb-close" onClick={onClose}>✕</button>
        </div>

        {/* Media */}
        <div className="lb-media-wrap" onClick={e => e.stopPropagation()}>
          {isVideo(url) ? (
            <video src={url} controls autoPlay />
          ) : (
            <img src={url} alt={`Foto ${current + 1}`} />
          )}
        </div>

        {/* Arrows */}
        {items.length > 1 && (
          <>
            <button className="lb-arrow prev" onClick={e => { e.stopPropagation(); prev(); }}>‹</button>
            <button className="lb-arrow next" onClick={e => { e.stopPropagation(); next(); }}>›</button>
          </>
        )}

        {/* Thumbnail strip */}
        {items.length > 1 && (
          <div className="lb-strip" onClick={e => e.stopPropagation()}>
            {items.map((item, i) => (
              <div key={i} className={`lb-thumb${i === current ? " active" : ""}`} onClick={() => setCurrent(i)}>
                {isVideo(item)
                  ? <div className="vt">▶</div>
                  : <img src={item} alt="" />
                }
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
