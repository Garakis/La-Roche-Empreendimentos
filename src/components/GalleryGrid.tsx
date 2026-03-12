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

  const open = (i: number) => setLightboxIndex(i);

  // Split into featured (first) + rest
  const [featured, ...rest] = gallery;

  return (
    <>
      {lightboxIndex !== null && (
        <Lightbox items={gallery} initialIndex={lightboxIndex} onClose={() => setLightboxIndex(null)} />
      )}

      <style>{`
        .pg-gallery { margin-top: 2.5rem; }
        .pg-featured-row {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 6px;
          margin-bottom: 6px;
        }
        @media (max-width: 640px) {
          .pg-featured-row { grid-template-columns: 1fr; }
        }
        .pg-featured-main {
          position: relative; border-radius: 10px 0 0 10px; overflow: hidden;
          cursor: pointer; background: #e8ecf0;
          aspect-ratio: 16/10;
        }
        @media (max-width: 640px) {
          .pg-featured-main { border-radius: 10px; aspect-ratio: 4/3; }
        }
        .pg-featured-side {
          display: grid; grid-template-rows: 1fr 1fr; gap: 6px;
        }
        .pg-featured-side .pg-thumb:first-child { border-radius: 0 10px 0 0; }
        .pg-featured-side .pg-thumb:last-child  { border-radius: 0 0 10px 0; }
        @media (max-width: 640px) {
          .pg-featured-side { grid-template-columns: 1fr 1fr; grid-template-rows: none; }
          .pg-featured-side .pg-thumb:first-child { border-radius: 10px 0 0 10px; }
          .pg-featured-side .pg-thumb:last-child  { border-radius: 0 10px 10px 0; }
        }
        .pg-thumb {
          position: relative; overflow: hidden; cursor: pointer;
          background: #e8ecf0; aspect-ratio: 4/3;
        }
        .pg-thumb img, .pg-featured-main img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform 0.4s ease; }
        .pg-thumb:hover img, .pg-featured-main:hover img { transform: scale(1.05); }
        .pg-overlay {
          position: absolute; inset: 0;
          display: flex; align-items: center; justify-content: center;
          background: rgba(0,31,63,0); transition: background 0.3s;
        }
        .pg-thumb:hover .pg-overlay,
        .pg-featured-main:hover .pg-overlay { background: rgba(0,31,63,0.28); }
        .pg-overlay-icon {
          opacity: 0; transition: opacity 0.25s;
          width: 48px; height: 48px; border-radius: 50%;
          background: rgba(255,255,255,0.92);
          display: flex; align-items: center; justify-content: center;
          font-size: 1.1rem; color: #00315e;
        }
        .pg-thumb:hover .pg-overlay-icon,
        .pg-featured-main:hover .pg-overlay-icon { opacity: 1; }
        .pg-video-bg {
          width: 100%; height: 100%; background: #002040;
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          gap: 0.5rem; color: #fff;
        }
        .pg-video-bg .v-icon { font-size: 2.5rem; }
        .pg-video-bg .v-label { font-size: 0.65rem; letter-spacing: 2px; text-transform: uppercase; opacity: 0.65; }
        /* More button */
        .pg-more-btn {
          position: absolute; inset: 0; display: flex; align-items: center; justify-content: center;
          background: rgba(0,31,63,0.55); color: #fff; flex-direction: column; gap: 0.25rem;
        }
        .pg-more-btn .m-count { font-size: 1.8rem; font-weight: 700; line-height: 1; }
        .pg-more-btn .m-label { font-size: 0.68rem; letter-spacing: 2px; text-transform: uppercase; opacity: 0.8; }
        /* Secondary grid */
        .pg-rest-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 6px;
        }
        @media (max-width: 900px) { .pg-rest-grid { grid-template-columns: repeat(3, 1fr); } }
        @media (max-width: 580px) { .pg-rest-grid { grid-template-columns: repeat(2, 1fr); } }
        .pg-rest-grid .pg-thumb { border-radius: 6px; }
      `}</style>

      <div className="pg-gallery">
        {/* Featured row: first image large + next 2 as side stack */}
        <div className="pg-featured-row">
          {/* Large featured */}
          <div className="pg-featured-main" onClick={() => open(0)}>
            {isVideo(featured) ? (
              <div className="pg-video-bg">
                                      <i className="ph ph-play-circle" />
                <span className="v-label">Vídeo</span>
              </div>
            ) : (
              <img src={featured} alt={`${title} - destaque`} loading="eager" />
            )}
            <div className="pg-overlay"><div className="pg-overlay-icon"><i className="ph ph-magnifying-glass-plus" /></div></div>
          </div>

          {/* Side 2 thumbnails */}
          {rest.length > 0 && (
            <div className="pg-featured-side">
              {rest.slice(0, 2).map((url, i) => {
                const realIdx = i + 1;
                const isLast = i === 1 && rest.length > 2;
                return (
                  <div key={realIdx} className="pg-thumb" onClick={() => open(isLast ? 0 : realIdx)}>
                    {isVideo(url) ? (
                      <div className="pg-video-bg" style={{ borderRadius: 0 }}>
                                                <i className="ph ph-play-circle" />
                      </div>
                    ) : (
                      <img src={url} alt={`${title} - ${realIdx + 1}`} loading="lazy" />
                    )}
                    {isLast && (
                      <div className="pg-more-btn">
                        <span className="m-count">+{rest.length - 1}</span>
                        <span className="m-label">Ver todas</span>
                      </div>
                    )}
                    {!isLast && <div className="pg-overlay"><div className="pg-overlay-icon">🔍</div></div>}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Rest of images (index 3+) in a grid — only if more than 3 total */}
        {rest.length > 2 && (
          <div className="pg-rest-grid">
            {rest.slice(2).map((url, i) => {
              const realIdx = i + 3;
              return (
                <div key={realIdx} className="pg-thumb" onClick={() => open(realIdx)}>
                  {isVideo(url) ? (
                    <div className="pg-video-bg" style={{ borderRadius: 0 }}>
                                              <i className="ph ph-play-circle" />
                    </div>
                  ) : (
                    <img src={url} alt={`${title} - ${realIdx + 1}`} loading="lazy" />
                  )}
                  <div className="pg-overlay"><div className="pg-overlay-icon"><i className="ph ph-magnifying-glass-plus" /></div></div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}
