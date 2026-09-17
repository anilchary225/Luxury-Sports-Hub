import React from "react";
import { Link } from "react-router-dom";
import { Instagram, Youtube, Facebook } from "lucide-react";

// Custom X (formerly Twitter) icon using the official X logo path
const XIcon = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

export default function Footer() {
  return (
    <footer className="main-footer">
      <div className="absolute inset-0 bg-grain opacity-10 pointer-events-none" />

      <div className="footer-grid relative z-10">
        {/* COL 1: BRANDING */}
        <div className="footer-branding">
          <Link to="/">
            <img loading="lazy"
              src="/images/logo_final.webp"
              alt="Zenithh Sports Arena"
              className="footer-logo logo-glow"
              width="240"
              height="80"
              decoding="async"
            />
          </Link>
          <p>
            Hyderabad's premier multi-sport training facility. Elite coaching.
            World-class infrastructure. Built for the next generation of champions.
          </p>
        </div>

        {/* COL 2: ARENA LINKS */}
        <div>
          <h2 className="footer-heading">Arena Links</h2>
          <ul className="footer-links-list">
            {[
              { label: "Our Story", path: "/about" },
              { label: "Elite Coaches", path: "/coaches" },
              { label: "Infrastructure", path: "/facilities" },
              { label: "Tournaments", path: "/events" },
              { label: "Arena Gallery", path: "/gallery" },
              { label: "Membership", path: "/contact" }
            ].map((link) => (
              <li key={link.label} className="footer-link-item">
                <Link to={link.path} className="footer-link">{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>
        
        {/* COL 3: DISCIPLINES */}
        <div>
          <h2 className="footer-heading">Disciplines</h2>
          <ul className="footer-links-list">
            {["Cricket", "Pickleball", "Volleyball", "Chess", "Zumba", "Table Tennis", "Carrom", "VR Cricket", "Badminton Outdoor"].map((sport) => (
              <li key={sport} className="footer-link-item">
                <Link to="/sports" className="footer-link">{sport}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* COL 4: VISIT US */}
        <div className="footer-info-group">
          <h2 className="footer-heading">Visit Us</h2>
          <p className="footer-info-text">
            <a
              href="https://maps.app.goo.gl/2KYR4nake6HgAnwL8"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--color-gold-primary)] transition-colors"
            >
              Miyapur Metro Station Road, Miyapur, Hyderabad, Telangana 500049
            </a>
          </p>
          <p className="footer-info-text flex flex-col gap-1">
            <a href="tel:+919281472882" className="hover:text-[var(--color-gold-primary)] transition-colors">
              +91 92814 72882
            </a>
            <a href="tel:+917997171607" className="hover:text-[var(--color-gold-primary)] transition-colors">
              +91 79971 71607
            </a>
          </p>
          <p className="footer-info-text">
            Morning: 7:00 AM – 10:00 AM <br />
            Evening: 5:00 PM – 8:00 PM
          </p>
          <p className="text-[10px] text-[var(--color-gold-primary)] opacity-60 uppercase tracking-widest font-bold mt-2">
            * Timings will be changed according to the season
          </p>
          <div className="footer-social-wrap gap-4">
            <a href="https://www.instagram.com/zenithhsportsarena/" aria-label="Zenithh Sports Arena on Instagram" className="footer-social-link footer-social-instagram">
              <Instagram size={20} />
            </a>
            <a href="https://www.facebook.com/profile.php?id=61592650591570" aria-label="Zenithh Sports Arena on Facebook" className="footer-social-link footer-social-facebook">
              <Facebook size={20} />
            </a>
            <a href="https://x.com/ZenithhSports" aria-label="Zenithh Sports Arena on X" className="footer-social-link footer-social-x">
              <XIcon size={18} />
            </a>
            <a href="https://youtube.com/@zenithh-sports-arena?si=W8nXqSN6c9kQIRDI" aria-label="Zenithh Sports Arena on YouTube" className="footer-social-link footer-social-youtube">
              <Youtube size={20} />
            </a>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom relative z-10">
        <p>© 2026 Zenithh Sports Arena Hyderabad | All Rights Reserved.</p>
        <p>DESIGNED BY <span className="text-[var(--color-gold-primary)] italic">AS KREATIV</span></p>
      </div>
    </footer>
  );
}
