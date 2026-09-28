import React, { useState } from "react";
import { X, Play } from "lucide-react";

interface GalleryItem {
  src: string;
  fallbackSrc?: string;
  caption: string;
  category: string;
  type?: 'video' | 'image';
}

const GALLERY_IMAGES: GalleryItem[] = [
  // Arena (Volleyball, Handball, Infrastructure)
  { src: "/images/gallery-volley-1.webp", caption: "Volleyball Training Session", category: "Arena" },
  { src: "/images/gallery-volley-2.webp", caption: "Volleyball Net Setup", category: "Arena" },
  { src: "/images/gallery-volley-3.webp", caption: "Volleyball Court View", category: "Arena" },
  { src: "/images/gallery-volley-4.webp", caption: "Volleyball Spiking Practice", category: "Arena" },
  { src: "/images/gallery-volley-5.webp", caption: "Volleyball Serve Setup", category: "Arena" },
  { src: "/images/volleyball-action-1.webp", caption: "Volleyball Court Rally", category: "Arena" },
  { src: "/images/volleyball-action-2.webp", caption: "Volleyball Attack & Defense", category: "Arena" },
  { src: "/images/about-arena.webp", caption: "Zenithh Infrastructure", category: "Arena" },
  { src: "/images/handball-1.webp", caption: "Handball Arena Court Play", category: "Arena" },
  { src: "/images/handball-2.webp", caption: "Handball Team Positioning", category: "Arena" },
  { src: "/images/handball-3.webp", caption: "Handball Fast-Break Drill", category: "Arena" },
  { src: "/images/handball-4.webp", caption: "Handball Practice Match", category: "Arena" },
  { src: "/images/handball-5.webp", caption: "Handball Skill Development", category: "Arena" },
  { src: "/images/handball-6.webp", caption: "Handball Defensive Setup", category: "Arena" },
  { src: "/images/handball-7.webp", caption: "Handball Jump Shot Action", category: "Arena" },
  { src: "/videos/volleyball-boys.webm", caption: "Boys Volleyball Spiking & Rally", category: "Arena", type: "video" },
  { src: "/videos/handball-1.webm", caption: "Handball Match Fast Break", category: "Arena", type: "video" },
  { src: "/videos/handball-2.webm", caption: "Handball Goal Attack Drill", category: "Arena", type: "video" },

  // Cricket
  { src: "/images/cricket-card.webp", caption: "Premium Cricket Nets", category: "Cricket" },
  { src: "/images/cricket-1.webp", caption: "MSK Academy Net Session", category: "Cricket" },
  { src: "/images/cricket-2.webp", caption: "Cricket Coaching & Drills", category: "Cricket" },
  { src: "/images/cricket-3.webp", caption: "Batting Technique Practice", category: "Cricket" },
  { src: "/videos/cricket-boys-1.webm", caption: "Boys Cricket Match Practice 1", category: "Cricket", type: "video" },
  { src: "/videos/cricket-boys-2.webm", caption: "Boys Cricket Net Session 2", category: "Cricket", type: "video" },
  { src: "/videos/cricket-boys-3.webm", caption: "Boys Cricket Intensive Training 3", category: "Cricket", type: "video" },
  { src: "/videos/girls-cricket-1.webm", caption: "Girls Cricket Batting Drill 1", category: "Cricket", type: "video" },
  { src: "/videos/girls-cricket-2.webm", caption: "Girls Cricket Fielding Practice 2", category: "Cricket", type: "video" },
  { src: "/videos/girls-cricket-3.webm", caption: "Girls Cricket Bowling Technique 3", category: "Cricket", type: "video" },
  { src: "/videos/girls-cricket-4.webm", caption: "Girls Cricket Academy Session 4", category: "Cricket", type: "video" },

  // Racket Sports
  { src: "/images/gallery-pickle-1.webp", caption: "Pickleball Academy Courts", category: "Racket Sports" },
  { src: "/images/pickle-ball.webp", caption: "Pickleball Match Rally", category: "Racket Sports" },
  { src: "/images/badminton-card.webp", caption: "Championship Badminton Arena", category: "Racket Sports" },

  // Indoor Sports
  { src: "/images/gallery-tabletennis-1.webp", caption: "Table Tennis Championship Hall", category: "Indoor Sports" },
  { src: "/images/gallery-tabletennis-2.webp", caption: "Table Tennis Racket & Ball", category: "Indoor Sports" },
  { src: "/images/gallery-tabletennis-3.webp", caption: "Table Tennis Practice Session", category: "Indoor Sports" },
  { src: "/images/gallery-chess-1.webp", caption: "Strategic Chess Arena", category: "Indoor Sports" },
  { src: "/images/gallery-carroms-1.webp", caption: "Carrom Board Focus", category: "Indoor Sports" },
  { src: "/images/gallery-carroms-2.webp", caption: "Carrom Coins Arrangement", category: "Indoor Sports" },
  { src: "/images/zumba-card.webp", caption: "Zumba & Fitness Studio", category: "Indoor Sports" },

  // Recreation
  { src: "/images/gallery-foosball-1.webp", caption: "Tournament Foosball Table", category: "Recreation" },
  { src: "/images/gallery-foosball-2.webp", caption: "Foosball Action Shot", category: "Recreation" },
  { src: "/images/gallery-foosball-3.webp", caption: "Foosball Players Lounge", category: "Recreation" },
  { src: "/images/gallery-foosball-4.webp", caption: "Foosball Table Setup", category: "Recreation" },
  { src: "/images/gallery-foosball-5.webp", caption: "Foosball Tournament Match", category: "Recreation" },
  { src: "/images/gallery-airhockey-1.webp", caption: "High-Speed Air Hockey Zone", category: "Recreation" },

  // Events
  { src: "/images/DLP03630.webp", caption: "Bridge Course Visit 1", category: "Events" },
  { src: "/images/DLP03631.webp", caption: "Bridge Course Visit 2", category: "Events" },
  { src: "/images/DLP03633.webp", caption: "Bridge Course Visit 3", category: "Events" },

  // Videos
  { src: "/videos/C0010.webm", caption: "Bridge Course Video 1", category: "Videos", type: "video" },
  { src: "/videos/C0011.webm", caption: "Bridge Course Video 2", category: "Videos", type: "video" },
  { src: "/videos/C0013.webm", caption: "Bridge Course Video 3", category: "Videos", type: "video" },
  { src: "/videos/C0018.webm", caption: "Bridge Course Video 4", category: "Videos", type: "video" },
  { src: "/videos/C0021.webm", caption: "Bridge Course Video 5", category: "Videos", type: "video" },
];

const CATEGORIES = ["All", "Arena", "Events", "Videos", "Cricket", "Racket Sports", "Indoor Sports", "Recreation"];

const GalleryImageItem = ({ image, onOpenLightbox }: { image: GalleryItem, onOpenLightbox: () => void }) => {
  const [src, setSrc] = useState(image.src);
  const isVideo = image.type === 'video' || src.toLowerCase().endsWith('.webm') || src.toLowerCase().endsWith('.mp4');

  return (
    <div
      className="premium-image-hover group relative overflow-hidden break-inside-avoid cursor-pointer bg-[var(--bg-secondary)] border border-[var(--border-light)] transition-all duration-500 hover:border-[var(--color-gold-primary)]/30"
      onClick={onOpenLightbox}
    >
      {isVideo ? (
        <div className="relative">
          <video
            className="w-full h-auto object-cover"
            muted
            loop
            playsInline
            preload="metadata"
            onMouseOver={(e) => (e.target as HTMLVideoElement).play()}
            onMouseOut={(e) => {
              const v = e.target as HTMLVideoElement;
              v.pause();
              v.currentTime = 0;
            }}
          >
            <source src={image.src} type="video/webm" />
            {image.fallbackSrc && <source src={image.fallbackSrc} type="video/mp4" />}
          </video>
          <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm text-white/90 p-1.5 rounded-full pointer-events-none group-hover:scale-110 transition-transform">
            <Play className="w-3.5 h-3.5 fill-current" />
          </div>
        </div>
      ) : (
        <img
          src={src}
          alt={image.caption}
          className="w-full h-auto object-cover"
          loading="lazy"
          onError={() => {
            if (src !== '/images/gallery-hero.webp') {
              setSrc('/images/gallery-hero.webp');
            }
          }}
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end p-6 pointer-events-none">
        <div>
          <span className="text-[var(--color-gold-primary)] text-[9px] font-black uppercase tracking-widest block mb-1">{image.category}</span>
          <p className="text-[var(--text-primary)] text-[11px] font-bold uppercase tracking-wider leading-tight">{image.caption}</p>
        </div>
      </div>
    </div>
  );
};

export default function Gallery() {
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredImages = activeCategory === "All" 
    ? GALLERY_IMAGES 
    : activeCategory === "Videos"
      ? GALLERY_IMAGES.filter(img => img.type === "video" || img.category === "Videos")
      : GALLERY_IMAGES.filter(img => img.category === activeCategory);

  return (
    <div className="pt-20 min-h-screen bg-[var(--bg-primary)]">
      {/* PAGE HERO */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-24 pb-12 overflow-hidden bg-grain">
        <div className="absolute inset-0 z-0">
          <img loading="lazy" 
            src="/images/gallery-hero.webp" 
            alt="Zenithh Gallery" 
            className="w-full h-full object-cover"
            style={{ filter: 'brightness(var(--hero-brightness))' }}
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative z-10 text-center px-6">
          <span className="text-[var(--color-gold-primary)] font-bold tracking-[0.5em] uppercase text-[10px] block mb-6">VISUAL PORTFOLIO</span>
          <h1 className="text-3xl md:text-5xl font-black uppercase text-white mb-6">
            ELITE <span className="text-[var(--color-gold-primary)] italic">VIEW</span>
          </h1>
          <p className="text-white/80 text-lg max-w-xl mx-auto font-light leading-relaxed">
            A window into Hyderabad's most sophisticated multi-sport environment.
          </p>
        </div>
      </section>

      {/* FILTER */}
      <section className="py-12 bg-[var(--bg-secondary)] border-y border-[var(--border-light)] sticky top-20 z-40">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-6 md:gap-12">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  setLightbox(null);
                }}
                className={`text-[10px] font-black uppercase tracking-[0.4em] transition-all relative py-2 ${
                  activeCategory === cat ? "text-[var(--color-gold-primary)]" : "text-[var(--text-primary)]/40 hover:text-[var(--text-primary)]"
                }`}
              >
                {cat}
                {activeCategory === cat && <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[var(--color-gold-primary)]" />}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* GRID */}
      <section className="py-24 bg-[var(--bg-primary)]">
        <div className="container mx-auto px-6">
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
            {filteredImages.map((image, idx) => (
              <GalleryImageItem 
                key={`${image.src}-${idx}`} 
                image={image} 
                onOpenLightbox={() => setLightbox(idx)} 
              />
            ))}
          </div>
        </div>
      </section>

      {/* LIGHTBOX */}
      {lightbox !== null && filteredImages[lightbox] && (
        <div className="fixed inset-0 z-[100] bg-[var(--bg-primary)]/95 backdrop-blur-sm flex items-center justify-center p-6" onClick={() => setLightbox(null)}>
          <button className="absolute top-10 right-10 text-[var(--text-primary)] hover:text-[var(--color-gold-primary)] transition-colors"><X className="w-10 h-10" /></button>
          {filteredImages[lightbox].type === 'video' || filteredImages[lightbox].src.toLowerCase().endsWith('.webm') || filteredImages[lightbox].src.toLowerCase().endsWith('.mp4') ? (
            <video
              key={filteredImages[lightbox].src}
              className="max-w-full max-h-[85vh] shadow-2xl outline-none"
              controls
              autoPlay
              playsInline
              preload="metadata"
              onClick={(e) => e.stopPropagation()}
            >
              <source src={filteredImages[lightbox].src} type="video/webm" />
              {filteredImages[lightbox].fallbackSrc && (
                <source src={filteredImages[lightbox].fallbackSrc} type="video/mp4" />
              )}
            </video>
          ) : (
            <img
              src={filteredImages[lightbox].src}
              alt={filteredImages[lightbox].caption}
              className="max-w-full max-h-[85vh] object-contain shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          )}
          <div className="absolute bottom-10 text-center pointer-events-none">
            <span className="text-[var(--color-gold-primary)] text-xs font-black uppercase tracking-[0.5em] mb-2 block">{filteredImages[lightbox].category}</span>
            <h4 className="text-[var(--text-primary)] text-xl font-black uppercase tracking-widest">{filteredImages[lightbox].caption}</h4>
          </div>
        </div>
      )}
    </div>
  );
}
