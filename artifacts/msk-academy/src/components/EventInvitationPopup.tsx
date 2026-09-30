import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

// Hard expiry date: 1 October 2026, 9:00 AM IST
const EVENT_EXPIRY = "2026-10-01T09:00:00+05:30";

// Re-show interval: every 3 minutes (180,000 ms)
const REPEAT_INTERVAL_MS = 3 * 60 * 1000;
const STORAGE_KEY = "ignite_invite_last_dismissed_timestamp";

// Lightweight celebratory gold sparkles/confetti that burst outward on mount
interface SparkleParticle {
  x: number;
  y: number;
  scale: number;
  rot: number;
  delay: number;
  size: number;
  color: string;
}

const CELEBRATION_PARTICLES: SparkleParticle[] = [
  { x: -140, y: -90, scale: 1.1, rot: 45, delay: 0.02, size: 7, color: "#ffd700" },
  { x: 135, y: -95, scale: 0.95, rot: -30, delay: 0.05, size: 6, color: "#f7d070" },
  { x: -160, y: 30, scale: 1.2, rot: 80, delay: 0.08, size: 8, color: "#ffd700" },
  { x: 155, y: 35, scale: 0.9, rot: 20, delay: 0.04, size: 6, color: "#f5c542" },
  { x: -115, y: 130, scale: 1.0, rot: -60, delay: 0.1, size: 7, color: "#ffd700" },
  { x: 125, y: 125, scale: 1.05, rot: 50, delay: 0.07, size: 6, color: "#f7d070" },
  { x: -70, y: -150, scale: 0.85, rot: 25, delay: 0.06, size: 5, color: "#f5c542" },
  { x: 75, y: -145, scale: 1.15, rot: -70, delay: 0.03, size: 8, color: "#ffd700" },
  { x: 0, y: -165, scale: 0.9, rot: 15, delay: 0.09, size: 6, color: "#fbe48e" },
  { x: -80, y: 160, scale: 0.85, rot: -35, delay: 0.12, size: 5, color: "#ffd700" },
  { x: 80, y: 160, scale: 1.0, rot: 55, delay: 0.11, size: 7, color: "#f7d070" },
  { x: 0, y: 175, scale: 0.95, rot: -45, delay: 0.05, size: 6, color: "#ffd700" },
  { x: -175, y: -45, scale: 0.8, rot: 40, delay: 0.08, size: 5, color: "#f5c542" },
  { x: 175, y: -35, scale: 0.9, rot: -55, delay: 0.07, size: 6, color: "#ffd700" },
  { x: -145, y: 85, scale: 1.0, rot: 65, delay: 0.09, size: 7, color: "#fbe48e" },
  { x: 150, y: 90, scale: 0.75, rot: -20, delay: 0.13, size: 5, color: "#ffd700" },
];

/**
 * Subtle gold ornamental corner flourish SVG
 */
function CornerFlourish({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 44 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`pointer-events-none absolute z-10 h-7 w-7 text-[#e5c158] drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] ${className}`}
      aria-hidden="true"
    >
      <path
        d="M2 42V16C2 8.27 8.27 2 16 2H42"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M6 38V18C6 11.37 11.37 6 18 6H38"
        stroke="currentColor"
        strokeWidth="1"
        strokeOpacity="0.7"
        strokeLinecap="round"
      />
      <path
        d="M2 2L12 12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle cx="16" cy="16" r="2.5" fill="currentColor" />
      <circle
        cx="16"
        cy="16"
        r="4.5"
        stroke="currentColor"
        strokeWidth="0.75"
        strokeOpacity="0.5"
      />
    </svg>
  );
}

export default function EventInvitationPopup() {
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const timerRef = useRef<number | null>(null);

  const showPopup = () => {
    // 1. Hard expiry: never render after 1 October 2026, 9:00 AM IST
    if (Date.now() >= new Date(EVENT_EXPIRY).getTime()) {
      return;
    }
    triggerRef.current = document.activeElement as HTMLElement | null;
    setOpen(true);
  };

  const scheduleNextPopup = (delayMs: number) => {
    if (timerRef.current) {
      window.clearTimeout(timerRef.current);
    }
    timerRef.current = window.setTimeout(() => {
      showPopup();
    }, Math.max(0, delayMs));
  };

  // Mount logic: show immediately on first open, or schedule if within 3-minute window
  useEffect(() => {
    // Clean up any old one-time/daily dismissal keys that might have blocked the popup
    try {
      Object.keys(localStorage).forEach((key) => {
        if (key.startsWith("ignite_invite_dismissed_")) {
          localStorage.removeItem(key);
        }
      });
    } catch {
      // Ignore localStorage errors
    }

    if (Date.now() >= new Date(EVENT_EXPIRY).getTime()) {
      return;
    }

    let lastDismissed = 0;
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        lastDismissed = parseInt(stored, 10) || 0;
      }
    } catch {
      lastDismissed = 0;
    }

    const elapsed = Date.now() - lastDismissed;

    if (!lastDismissed || elapsed >= REPEAT_INTERVAL_MS) {
      // First time opening website, or 3+ minutes elapsed: show immediately!
      showPopup();
    } else {
      // Within 3 minutes of last dismissal: schedule for remaining time
      const remainingTime = REPEAT_INTERVAL_MS - elapsed;
      scheduleNextPopup(remainingTime);
    }

    return () => {
      if (timerRef.current) {
        window.clearTimeout(timerRef.current);
      }
    };
  }, []);

  // Handle focus trapping and keyboard navigation while dialog is open
  useEffect(() => {
    if (!open) return;

    const dialog = dialogRef.current;
    const focusableSelector = [
      "button:not([disabled])",
      "[href]",
      "input:not([disabled])",
      "select:not([disabled])",
      "textarea:not([disabled])",
      '[tabindex]:not([tabindex="-1"])',
    ].join(",");

    // Focus close button initially
    const initialFocusTimer = window.requestAnimationFrame(() => {
      const focusable = dialog?.querySelectorAll<HTMLElement>(focusableSelector);
      if (focusable && focusable.length > 0) {
        focusable[0].focus();
      } else {
        dialog?.focus();
      }
    });

    const handleKeyDown = (event: KeyboardEvent) => {
      // Escape key closes popup
      if (event.key === "Escape") {
        event.preventDefault();
        close();
        return;
      }

      // Trap focus inside modal
      if (event.key === "Tab" && dialog) {
        const focusable = Array.from(dialog.querySelectorAll<HTMLElement>(focusableSelector));
        if (focusable.length === 0) {
          event.preventDefault();
          dialog.focus();
          return;
        }

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      window.cancelAnimationFrame(initialFocusTimer);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  const close = () => {
    const now = Date.now();
    try {
      localStorage.setItem(STORAGE_KEY, now.toString());
    } catch {
      // Ignore localStorage errors
    }

    setOpen(false);

    // Schedule re-appearance in 3 minutes
    scheduleNextPopup(REPEAT_INTERVAL_MS);

    // Return focus to previous element upon closing
    window.setTimeout(() => {
      triggerRef.current?.focus?.();
    }, 180);
  };

  const flyerImageSrc = `${import.meta.env.BASE_URL.replace(/\/$/, "")}/popups/popup-msk.jpeg`;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[500000] flex items-center justify-center bg-black/65 p-4 sm:p-6 backdrop-blur-[2px] cursor-pointer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.2 } }}
          exit={{ opacity: 0, transition: { duration: 0.18 } }}
          onMouseDown={(e) => {
            // Click outside (on backdrop) closes the popup
            if (e.target === e.currentTarget) {
              close();
            }
          }}
        >
          {/* Main Card Frame */}
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label="Grand Inauguration Invitation"
            tabIndex={-1}
            className="relative w-fit max-w-[min(88vw,420px)] rounded-[20px] bg-gradient-to-br from-[#3b2213] via-[#1a0f08] to-[#080503] p-1 sm:p-1.5 shadow-[0_0_45px_rgba(218,165,32,0.35),0_20px_55px_rgba(0,0,0,0.85)] outline-none cursor-default"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{
              opacity: 1,
              scale: 1,
              transition: {
                duration: 0.25,
                ease: [0.34, 1.56, 0.64, 1], // ease-out-back for a gentle celebratory "pop"
              },
            }}
            exit={{
              opacity: 0,
              scale: 0.92,
              transition: {
                duration: 0.18,
                ease: [0.4, 0, 1, 1],
              },
            }}
          >
            {/* Celebratory gold confetti/sparkle particles animating outward on open */}
            {CELEBRATION_PARTICLES.map((particle, idx) => (
              <motion.span
                key={idx}
                aria-hidden="true"
                className="pointer-events-none absolute left-1/2 top-1/2 z-0 rounded-full"
                style={{
                  width: particle.size,
                  height: particle.size,
                  backgroundColor: particle.color,
                  boxShadow: `0 0 10px 2px ${particle.color}`,
                }}
                initial={{ opacity: 0, x: 0, y: 0, scale: 0, rotate: 0 }}
                animate={{
                  opacity: [0, 1, 1, 0],
                  x: particle.x,
                  y: particle.y,
                  scale: [0, particle.scale, particle.scale * 0.8, 0],
                  rotate: [0, particle.rot],
                }}
                transition={{
                  duration: 1.0,
                  delay: particle.delay,
                  times: [0, 0.2, 0.75, 1],
                  ease: "easeOut",
                }}
              />
            ))}

            {/* Inner Frame with 1px gold foil glowing border */}
            <div className="relative overflow-hidden rounded-[16px] border border-[#e5c158]/85 shadow-[inset_0_0_10px_rgba(229,193,88,0.3)] bg-black/40">
              {/* Four ornamental corner accents */}
              <CornerFlourish className="left-1.5 top-1.5" />
              <CornerFlourish className="right-1.5 top-1.5 -scale-x-100" />
              <CornerFlourish className="bottom-1.5 left-1.5 -scale-y-100" />
              <CornerFlourish className="bottom-1.5 right-1.5 -scale-100" />

              {/* Scrollable image container on compact screens */}
              <div className="max-h-[min(76dvh,590px)] overflow-y-auto overflow-x-hidden">
                <img
                  src={flyerImageSrc}
                  alt="Grand Inauguration Invitation - MSK Prasad Cricket Academy and Badminton Arena at Zenithh Sports Arena on 1 October 2026 at 9:00 AM, near Miyapur Metro Station, Hyderabad."
                  className="block h-auto w-auto max-h-[min(74dvh,570px)] max-w-[min(85vw,400px)] rounded-[15px] object-contain mx-auto select-none"
                  draggable={false}
                />
              </div>
            </div>

            {/* Wax-seal styled circular close button in top-right corner */}
            <button
              type="button"
              onClick={close}
              aria-label="Close invitation"
              className="group absolute -right-3 -top-3 z-30 flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full border-2 border-[#e5c158] bg-gradient-to-br from-[#6f1d13] via-[#48110a] to-[#210604] text-[#fde08b] shadow-[0_4px_14px_rgba(0,0,0,0.65),0_0_12px_rgba(229,193,88,0.4),inset_0_1px_3px_rgba(255,235,160,0.6),inset_0_-1px_2px_rgba(0,0,0,0.8)] transition-all duration-200 hover:scale-110 hover:border-[#ffe89c] hover:text-[#fff4c4] hover:shadow-[0_6px_18px_rgba(0,0,0,0.7),0_0_16px_rgba(229,193,88,0.6)] active:scale-95 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e5c158] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
              {/* Embossed inner ring of the wax seal */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-[3px] rounded-full border border-[#f5d37a]/35 shadow-[inset_0_1px_2px_rgba(0,0,0,0.6)]"
              />
              <X className="relative z-10 h-4 w-4 sm:h-4.5 sm:w-4.5 stroke-[2.5] transition-transform duration-200 group-hover:rotate-90" />
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
