import { useEffect, useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

const SPORTS = [
  {
    name: "Chess",
    cats: "U-12, 14, 16 · Boys & Girls",
    fee: "₹299",
    dates: "15th & 16th Aug, 2026",
  },
  {
    name: "Volleyball",
    cats: "U-12, 14, 16 · Boys & Girls",
    fee: "₹599 / Team",
    dates: "15th & 16th Aug, 2026",
  },
  {
    name: "Pickleball",
    cats: "U-14, 16 · Boys & Girls",
    fee: "₹299 Doubles / ₹149 Singles",
    dates: "23rd Aug, 2026",
  },
  {
    name: "Box Cricket",
    cats: "U-14, 16 · Boys & Girls",
    fee: "₹799 / Team",
    dates: "23rd Aug, 2026",
  },
  {
    name: "Throwball",
    cats: "U-14, 16 · Boys & Girls",
    fee: "₹699 / Team",
    dates: "6th Sep, 2026",
  },
];

export default function SportsMeetDialog() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("sportsMeetSeen")) {
      return;
    }

    const timer = setTimeout(() => {
      setOpen(true);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    sessionStorage.setItem("sportsMeetSeen", "1");
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        if (!value) {
          handleClose();
        }
      }}
    >
      <DialogContent
  className="max-w-4xl gap-0 overflow-hidden border-0 bg-[var(--bg-primary)] p-0 shadow-2xl outline-none ring-0 lg:w-[95vw]"
  style={{ borderRadius: 0 }}
>
        {/* ===================== DESKTOP ===================== */}
        <div className="hidden h-full lg:flex">
          {/* LEFT */}
          <div className="relative flex w-[55%] items-center justify-center bg-black">
            <img
              src="/images/sports-meet-poster.jpeg"
              alt="Inter-School Sports Meet Poster"
              className="h-full w-full object-contain"
            />
          </div>

          {/* RIGHT */}
          <div className="flex flex-1 flex-col overflow-y-auto bg-[var(--bg-primary)] px-6 py-7 md:px-8 md:py-8">
            <div className="mb-5">
              <p className="mb-2 text-[8px] font-black uppercase tracking-[0.4em] text-primary">
                Sponsored by IGNITE INSTITUTIONS
              </p>

              <h2 className="mb-1 text-md font-black uppercase leading-tight tracking-widest text-[var(--text-primary)]">
              <div className="flex flex-col gap-0.5">
  <span className="text-center">INTER-SCHOOL</span>
  {/* <div className="relative mt-1 flex items-center justify-center">
    <span className="h-[1px] w-24 bg-gradient-to-r from-transparent via-orange-500 to-orange-500" />

    <span className="mx-1 h-2 w-2 rotate-45 border border-orange-500 bg-[var(--bg-primary)]" />

    <span className="h-[1px] w-24 bg-gradient-to-l from-transparent via-orange-500 to-orange-500" />
  </div> */}

  <span className="text-center mt-1">SPORTS MEET</span>

  
</div>
              </h2>

              <p className="text-[10px] text-center mt-2 font-black uppercase tracking-[0.25em] text-[var(--color-gold-primary)]">
                🏆 PARTICIPATE &amp; WIN
              </p>
            </div>

            <div className="mb-5 h-[2px] w-12 bg-primary" />

            <div className="mb-3 space-y-3">
              {SPORTS.map((s) => (
                <div
                  key={s.name}
                  className="flex items-start justify-between gap-3 border border-[var(--border-light)] px-3 py-1 transition-colors hover:border-primary/40"
                >
                  <div>
                    <p className="text-[8px] font-black uppercase tracking-widest text-[var(--text-primary)]">
                      {s.name}
                    </p>

                    <p className="mt-0.5 text-[7px] tracking-wider text-[var(--text-muted)]">
                      {s.cats}
                    </p>

                    <p className="text-[7px] tracking-wider text-[var(--text-muted)]">
                      {s.dates} · 10 AM
                    </p>
                  </div>

                  <span className="whitespace-nowrap text-[10px] font-black text-primary">
                    {s.fee}
                  </span>
                </div>
              ))}
            </div>

            <p className="mb-6 text-[10px] uppercase leading-relaxed tracking-widest text-[var(--text-muted)]">
              📍 Near Miyapur Metro Station, Calvary Temple Road,
              <br />
              Dream View Colony – 85 · 📞 9281472883
            </p>

            <a
              href="https://forms.gle/ufjZyjrx7utc5jMx7"
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleClose}
              className="btn-primary flex w-full items-center justify-center gap-2 py-4 text-center text-sm font-black uppercase tracking-[0.3em]"
            >
              APPLY NOW →
            </a>
          </div>
        </div>

        {/* ===================== MOBILE ===================== */}
        <div className="flex flex-col lg:hidden">
          <img
            src="/images/sports-meet-poster.jpeg"
            alt="Sports Meet"
            className="h-84 w-full bg-black object-contain sm:h-72 md:h-80 lg:h-auto"
          />

          <div className="p-5 px-18">
            <p className="mb-2 text-[8px] font-black uppercase tracking-[0.4em] text-primary">
              Sponsored by IGNITE INSTITUTIONS
            </p>

            <h2 className="text-2xl font-black uppercase leading-tight tracking-widest text-[var(--text-primary)]">
              INTER-SCHOOL
              <br />
              SPORTS MEET
            </h2>

            <p className="mt-2 text-lg font-black uppercase tracking-[0.2em] text-[var(--color-gold-primary)]">
              🏆 PARTICIPATE &amp; WIN
            </p>

            <div className="my-5 h-[2px] w-12 bg-primary" />

            <p className="mb-6 text-xs uppercase leading-relaxed tracking-wider text-[var(--text-muted)]">
              📍 Near Miyapur Metro Station,
              <br />
              Calvary Temple Road,
              <br />
              Dream View Colony – 85
              <br />
              📞 9281472883
            </p>

            <a
              href="https://forms.gle/ufjZyjrx7utc5jMx7"
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleClose}
              className="btn-primary flex w-full items-center justify-center py-4 text-sm font-black uppercase tracking-[0.3em]"
            >
              APPLY NOW →
            </a>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}