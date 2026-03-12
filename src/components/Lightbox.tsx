"use client";

import { useState, useEffect, useCallback, useRef } from "react";

interface LightboxProps {
  items: string[];
  initialIndex?: number;
  onClose: () => void;
}

const isVideo = (url: string) => /\.(mp4|webm|mov|ogg)(\?.*)?$/i.test(url);

export default function Lightbox({ items, initialIndex = 0, onClose }: LightboxProps) {
  const [current, setCurrent] = useState(initialIndex);
  const [animDir, setAnimDir] = useState<"left" | "right" | null>(null);
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const stripRef = useRef<HTMLDivElement>(null);

  const navigate = useCallback((dir: "left" | "right") => {
    setAnimDir(dir);
    setTimeout(() => {
      setCurrent(i =>
        dir === "left"
          ? (i - 1 + items.length) % items.length
          : (i + 1) % items.length
      );
      setAnimDir(null);
    }, 150);
  }, [items.length]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") navigate("left");
      else if (e.key === "ArrowRight") navigate("right");
      else if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [navigate, onClose]);

  // Scroll thumbnail strip to center on active item
  useEffect(() => {
    const strip = stripRef.current;
    if (!strip) return;
    const thumb = strip.children[current] as HTMLElement;
    if (thumb) thumb.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }, [current]);

  // Touch swipe support
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    const dy = e.changedTouches[0].clientY - touchStartY.current;
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
      navigate(dx < 0 ? "right" : "left");
    }
    touchStartX.current = null;
    touchStartY.current = null;
  };

  const url = items[current];

  return (
    <>
      <style>{`
        @keyframes lb-slide-in-right { from { opacity: 0; transform: translateX(40px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes lb-slide-in-left  { from { opacity: 0; transform: translateX(-40px);} to { opacity: 1; transform: translateX(0); } }
        @keyframes lb-fade-bg { from { opacity: 0; } to { opacity: 1; } }

        .lb-root {
          position: fixed; inset: 0; z-index: 9999;
          background: rgba(0,0,0,0.96);
          display: flex; flex-direction: column;
          animation: lb-fade-bg 0.2s ease;
          touch-action: pan-y;
          font-family: 'Montserrat', sans-serif;
        }
        /* Top bar */
        .lb-top {
          position: absolute; top: 0; left: 0; right: 0;
          padding: env(safe-area-inset-top, 0.75rem) 1rem 0.75rem;
          padding-top: max(env(safe-area-inset-top), 0.75rem);
          display: flex; justify-content: space-between; align-items: center;
          background: linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, transparent 100%);
          z-index: 10;
        }
        .lb-counter {
          background: rgba(255,255,255,0.12); border: 1px solid rgba(255,255,255,0.18);
          color: #fff; font-size: 0.78rem; font-weight: 600;
          padding: 0.3rem 0.8rem; border-radius: 20px; letter-spacing: 0.5px;
        }
        .lb-close {
          width: 42px; height: 42px; border-radius: 50%;
          background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2);
          color: #fff; font-size: 1.1rem; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          transition: background 0.2s;
        }
        .lb-close:hover { background: rgba(255,255,255,0.2); }
        /* Media stage */
        .lb-stage {
          flex: 1; display: flex; align-items: center; justify-content: center;
          padding: 64px 60px 90px;
          position: relative; min-height: 0;
          overflow: hidden;
        }
        .lb-stage img, .lb-stage video {
          max-width: 100%; max-height: 100%;
          object-fit: contain; border-radius: 4px;
          user-select: none; -webkit-user-drag: none;
          animation-duration: 0.2s; animation-fill-mode: both; animation-timing-function: ease-out;
        }
        .lb-anim-right { animation-name: lb-slide-in-right; }
        .lb-anim-left  { animation-name: lb-slide-in-left; }
        /* Arrows */
        .lb-btn {
          position: absolute; top: 50%; transform: translateY(-50%);
          width: 52px; height: 52px; border-radius: 50%;
          background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.18);
          color: #fff; font-size: 1.6rem;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; transition: all 0.2s; z-index: 5;
          -webkit-tap-highlight-color: transparent;
        }
        .lb-btn:hover { background: rgba(255,255,255,0.18); transform: translateY(-50%) scale(1.06); }
        .lb-btn.prev { left: 0.75rem; }
        .lb-btn.next { right: 0.75rem; }
        .lb-btn:disabled { opacity: 0.2; pointer-events: none; }
        /* Strip */
        .lb-strip-wrap {
          position: absolute; bottom: 0; left: 0; right: 0;
          padding-bottom: max(env(safe-area-inset-bottom), 0.75rem);
          background: linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 100%);
          padding-top: 1.5rem;
        }
        .lb-strip {
          display: flex; gap: 6px; overflow-x: auto;
          padding: 0 1rem;
          scroll-snap-type: x mandatory;
          scrollbar-width: none; -ms-overflow-style: none;
          align-items: center;
          justify-content: center;
        }
        .lb-strip::-webkit-scrollbar { display: none; }
        .lb-thumb {
          flex-shrink: 0; width: 54px; height: 54px; border-radius: 6px; overflow: hidden;
          cursor: pointer; transition: all 0.2s ease;
          border: 2px solid transparent; opacity: 0.45;
          scroll-snap-align: center;
        }
        .lb-thumb.active { border-color: #fff; opacity: 1; transform: scale(1.08); }
        .lb-thumb:hover:not(.active) { opacity: 0.75; }
        .lb-thumb img { width: 100%; height: 100%; object-fit: cover; }
        .lb-thumb-video { width: 100%; height: 100%; background: #002040; display: flex; align-items: center; justify-content: center; color: #fff; font-size: 1.2rem; }
        /* Mobile */
        @media (max-width: 600px) {
          .lb-stage { padding: 60px 0 88px; }
          .lb-stage img, .lb-stage video { border-radius: 0; }
          .lb-btn { width: 40px; height: 40px; font-size: 1.2rem; }
          .lb-btn.prev { left: 0.25rem; }
          .lb-btn.next { right: 0.25rem; }
          .lb-thumb { width: 48px; height: 48px; }
        }
      `}</style>

      <div
        className="lb-root"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {/* Top bar */}
        <div className="lb-top">
          <span className="lb-counter">{current + 1} / {items.length}</span>
          <button className="lb-close" onClick={onClose} aria-label="Fechar"><i className="ph ph-x" /></button>
        </div>

        {/* Media stage */}
        <div className="lb-stage" onClick={onClose}>
          <div onClick={e => e.stopPropagation()} style={{ maxWidth: "100%", maxHeight: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
            {isVideo(url) ? (
              <video
                key={url}
                src={url}
                controls
                autoPlay
                className={animDir === "right" ? "lb-anim-right" : animDir === "left" ? "lb-anim-left" : ""}
              />
            ) : (
              <img
                key={url}
                src={url}
                alt={`Foto ${current + 1}`}
                className={animDir === "right" ? "lb-anim-right" : animDir === "left" ? "lb-anim-left" : ""}
              />
            )}
          </div>

          {items.length > 1 && (
            <>
              <button className="lb-btn prev" onClick={e => { e.stopPropagation(); navigate("left"); }} aria-label="Anterior">‹</button>
              <button className="lb-btn next" onClick={e => { e.stopPropagation(); navigate("right"); }} aria-label="Próxima">›</button>
            </>
          )}
        </div>

        {/* Thumbnail strip */}
        {items.length > 1 && (
          <div className="lb-strip-wrap">
            <div className="lb-strip" ref={stripRef}>
              {items.map((item, i) => (
                <div
                  key={i}
                  className={`lb-thumb${i === current ? " active" : ""}`}
                  onClick={() => { setAnimDir(i > current ? "right" : "left"); setTimeout(() => { setCurrent(i); setAnimDir(null); }, 150); }}
                  aria-label={`Ir para foto ${i + 1}`}
                >
                  {isVideo(item)
                    ? <div className="lb-thumb-video"><i className="ph ph-play-circle" /></div>
                    : <img src={item} alt="" />
                  }
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
