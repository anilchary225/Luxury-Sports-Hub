import { useEffect, useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { X } from "lucide-react";

const SPORTS = [
  { name: "Chess",       cats: "U-12, 14, 16 · Boys & Girls", fee: "₹299",              dates: "15th & 16th Aug, 2026" },
  { name: "Volleyball",  cats: "U-12, 14, 16 · Boys & Girls", fee: "₹599 / Team",        dates: "15th & 16th Aug, 2026" },
  { name: "Pickleball",  cats: "U-14, 16 · Boys & Girls",     fee: "₹299 Doubles / ₹149 Singles", dates: "23rd Aug, 2026" },
  { name: "Box Cricket",  cats: "U-14, 16 · Boys & Girls",    fee: "₹1099 / Team",       dates: "23rd Aug, 2026" },
  { name: "Throwball",   cats: "U-14, 16 · Boys & Girls",     fee: "₹699 / Team",        dates: "6th Sep, 2026" },
];

export default function SportsMeetDialog() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("sportsMeetSeen")) {
      return;
    }
  
    const timer = setTimeout(() => setOpen(true), 800);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    sessionStorage.setItem("sportsMeetSeen", "1");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={(v) => { if (!v) handleClose(); }}>
      <DialogContent
        className="p-0 gap-0 max-w-5xl w-[95vw] overflow-hidden border-0 shadow-2xl bg-[var(--bg-primary)]"
        style={{ borderRadius: 0 }}
      >
        {/* Custom close button */}
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 z-50 w-8 h-8 flex items-center justify-center bg-black/60 hover:bg-black/80 text-white transition-colors"
          style={{ borderRadius: 0 }}
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex flex-col md:flex-row h-full">

          {/* ── LEFT: Poster ── */}
          <div className="relative md:w-[55%] w-full flex-shrink-0 bg-black flex items-center justify-center">
            <img
              src="/images/sports-meet-poster.jpeg"
              alt="Inter-School Sports Meet Poster"
              className="w-full h-full object-contain"
            />
          </div>

          {/* ── RIGHT: Details ── */}
          <div className="flex-1 flex flex-col px-6 py-7 md:px-8 md:py-8 overflow-y-auto bg-[var(--bg-primary)]">

            {/* Heading */}
            <div className="mb-5">
              <p className="text-[10px] font-black tracking-[0.4em] uppercase text-primary mb-2">
                Sponsored by IGNITE INSTITUTIONS
              </p>
              <h2 className="text-2xl md:text-3xl font-black uppercase tracking-widest text-[var(--text-primary)] leading-tight mb-1">
                INTER-SCHOOL<br />SPORTS MEET
              </h2>
              <p className="text-xl md:text-2xl font-black uppercase tracking-[0.25em] text-[var(--color-gold-primary)]">
                🏆 PARTICIPATE &amp; WIN
              </p>
            </div>

            <div className="w-12 h-[2px] bg-primary mb-5" />

            {/* Sports list */}
            <div className="space-y-3 mb-6">
              {SPORTS.map((s) => (
                <div
                  key={s.name}
                  className="flex items-start justify-between gap-3 border border-[var(--border-light)] px-3 py-2 hover:border-primary/40 transition-colors"
                >
                  <div>
                    <p className="font-black uppercase text-[11px] tracking-widest text-[var(--text-primary)]">{s.name}</p>
                    <p className="text-[10px] text-[var(--text-muted)] tracking-wider mt-0.5">{s.cats}</p>
                    <p className="text-[10px] text-[var(--text-muted)] tracking-wider">{s.dates} · 10 AM</p>
                  </div>
                  <span className="text-primary font-black text-xs whitespace-nowrap">{s.fee}</span>
                </div>
              ))}
            </div>

            {/* Venue */}
            <p className="text-[10px] uppercase tracking-widest text-[var(--text-muted)] mb-6 leading-relaxed">
              📍 Near Miyapur Metro Station, Calvary Temple Road,<br />
              Dream View Colony – 85 &nbsp;·&nbsp; 📞 9281472883
            </p>

            {/* CTA */}
            <a
              href="https://forms.gle/ufjZyjrx7utc5jMx7"
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleClose}
              className="btn-primary w-full text-center text-sm font-black tracking-[0.3em] uppercase py-4 flex items-center justify-center gap-2"
            >
              APPLY NOW →
            </a>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
