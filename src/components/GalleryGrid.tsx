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

      <style>{`
        .gallery-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 0.6rem;
          margin-top: 2rem;
        }
        @media (max-width: 1100px) {
          .gallery-grid { grid-template-columns: repeat(3, 1fr); }
        }
        @media (max-width: 700px) {
          .gallery-grid { grid-template-columns: repeat(2, 1fr); gap: 0.4rem; }
        }
        @media (max-width: 420px) {
          .gallery-grid { grid-template-columns: 1fr 1fr; }
        }
        .gallery-item {
          position: relative;
          border-radius: 8px;
          overflow: hidden;
          cursor: pointer;
          aspect-ratio: 4/3;
          background: #eaeaea;
        }
        .gallery-item img, .gallery-item .video-thumb {
          width: 100%; height: 100%; object-fit: cover;
          transition: transform 0.3s ease;
          display: block;
        }
        .gallery-item:hover img, .gallery-item:hover .video-thumb {
          transform: scale(1.06);
        }
        .gallery-item .overlay {
          position: absolute; inset: 0;
          background: rgba(0,49,94,0);
          display: flex; align-items: center; justify-content: center;
          transition: background 0.25s;
        }
        .gallery-item:hover .overlay {
          background: rgba(0,49,94,0.3);
        }
        .gallery-item .overlay-icon {
          opacity: 0;
          background: rgba(255,255,255,0.9);
          border-radius: 50%;
          width: 44px; height: 44px;
          display: flex; align-items: center; justify-content: center;
          font-size: 1.2rem;
          transition: opacity 0.25s;
        }
        .gallery-item:hover .overlay-icon { opacity: 1; }
        .video-thumb {
          background: #00315e;
          display: flex !important;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 0.4rem;
          color: #fff;
          font-size: 2rem;
        }
        .video-thumb span { font-size: 0.7rem; letter-spacing: 1px; text-transform: uppercase; opacity: 0.7; }
      `}</style>

      <div className="gallery-grid">
        {gallery.map((url, i) => (
          <div key={i} className="gallery-item" onClick={() => setLightboxIndex(i)} role="button" aria-label={`Ver ${title} foto ${i + 1}`}>
            {isVideo(url) ? (
              <div className="video-thumb">
                <span>▶</span>
                <span>Vídeo</span>
              </div>
            ) : (
              <img src={url} alt={`${title} - ${i + 1}`} loading="lazy" />
            )}
            <div className="overlay">
              <div className="overlay-icon">{isVideo(url) ? "▶" : "🔍"}</div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
