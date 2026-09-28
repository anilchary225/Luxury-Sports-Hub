import React, { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion, Variants } from "framer-motion";
import {
  ArrowLeft,
  CheckCircle,
  Clock,
  Users,
  Layers,
  Cpu,
  Zap,
  Award,
  Trophy,
  Target,
  Shield,
  Activity,
  Sparkles,
  Eye,
  Flame,
  Timer,
} from "lucide-react";
import FAQSection from "@/components/FAQSection";
import { SPORTS_FAQS } from "@/constants/faqs";
import SEO from "@/components/SEO";
import { SPORT_SEO } from "@/data/seo";

/* =========================================================
   SEO-FRIENDLY SPORT SLUGS
   Internal sport IDs remain unchanged.
   ========================================================= */

const SPORT_SLUGS: Record<string, string> = Object.fromEntries(
  Object.entries(SPORT_SEO).map(([sportId, seo]) => [sportId, seo.slug])
);

/* =========================================================
   SEO METADATA
   ========================================================= */

const SEO_METADATA: Record<
  string,
  {
    title: string;
    description: string;
    keywords: string;
    seoKeyword: string;
  }
> = {
  cricket: {
    title: "Box Cricket Near Me Miyapur | Turf & Booking | Zenithh",
    description:
      "Looking for box cricket near me in Miyapur? Book Zenithh's box cricket turf for exciting games with friends, teams, and groups. Reserve your slot today!",
    keywords: "box cricket near me miyapur",
    seoKeyword: "box cricket near me miyapur",
  },

  pickleball: {
    title: "Pickleball Court Near Me Miyapur | Book Court | Zenithh",
    description:
      "Looking for a pickleball court near me in Miyapur? Book Zenithh's premium pickleball court for exciting games, great facilities, and easy slot booking today!",
    keywords: "Pickleball court near me Miyapur",
    seoKeyword: "Pickleball court near me Miyapur",
  },

  volleyball: {
    title: "Volleyball Court Near Me Miyapur | Book Court | Zenithh",
    description:
      "Looking for a volleyball court near me in Miyapur? Book Zenithh for quality volleyball facilities, exciting games, and easy slot booking for teams and groups!",
    keywords: "Volleyball Court Near Me Miyapur",
    seoKeyword: "Volleyball Court Near Me Miyapur",
  },

  chess: {
    title: "Chess Club Near Me Miyapur | Play Chess at Zenithh",
    description:
      "Looking for a chess club near me in Miyapur? Play chess at Zenithh with friends and fellow players in a fun, engaging environment. Join us today!",
    keywords: "Chess Club Near Me Miyapur",
    seoKeyword: "Chess Club Near Me Miyapur",
  },

  zumba: {
    title: "Zumba Studio Near Me | Zumba Fitness & Classes | Zenithh",
    description:
      "Looking for a Zumba studio near me? Join Zenithh for energetic Zumba fitness sessions, fun workouts, and engaging classes designed to keep you active.",
    keywords: "Zumba Studio Near Me",
    seoKeyword: "Zumba Studio Near Me",
  },

  "table-tennis": {
    title: "Table Tennis Court Near Me Miyapur | Book Court | Zenithh",
    description:
      "Looking for a table tennis court near me in Miyapur? Book Zenithh for exciting games, quality facilities, and easy slot booking for friends and players!",
    keywords: "Table Tennis Court Near Me Miyapur",
    seoKeyword: "Table Tennis Court Near Me Miyapur",
  },

  foosball: {
    title: "Foosball Near Me Miyapur | Play Foosball | Zenithh",
    description:
      "Looking for foosball near me in Miyapur? Play foosball at Zenithh with friends and enjoy a fun indoor game experience. Book your slot today!",
    keywords: "Foosball Near Me Miyapur",
    seoKeyword: "Foosball Near Me Miyapur",
  },

  carrom: {
    title: "Indoor Games Near Me Miyapur | Play & Book | Zenithh",
    description:
      "Looking for indoor games near me in Miyapur? Enjoy chess, carrom, foosball, table tennis and more at Zenithh. Play with friends and book today!",
    keywords: "Indoor Games Near Me Miyapur",
    seoKeyword: "Indoor Games Near Me Miyapur",
  },

  "air-hockey": {
    title: "Air Hockey Table Near Me Miyapur | Play & Book | Zenithh",
    description:
      "Looking for an air hockey table near me in Miyapur? Play at Zenithh with friends and enjoy an exciting indoor gaming experience. Book your slot today!",
    keywords: "Air Hockey Table Near Me Miyapur",
    seoKeyword: "Air Hockey Table Near Me Miyapur",
  },

  "vr-cricket": {
    title: "VR Cricket Game Near Me Miyapur | Play & Book | Zenithh",
    description:
      "Looking for a VR cricket game near me in Miyapur? Experience immersive VR cricket at Zenithh with friends and family. Play, have fun and book today!",
    keywords: "VR Cricket Game Near Me Miyapur",
    seoKeyword: "VR Cricket Game Near Me Miyapur",
  },

  "badminton-outdoor": {
    title: "Badminton Court Near Me Miyapur | Book Court | Zenithh",
    description:
      "Looking for a badminton court near me in Miyapur? Book Zenithh for badminton games, quality facilities and easy court booking for friends, teams and players!",
    keywords: "Badminton Court Near Me Miyapur",
    seoKeyword: "Badminton Court Near Me Miyapur",
  },
};

/* =========================================================
   SPEC ICON HELPER
   ========================================================= */

const renderSpecIcon = (iconName: string) => {
  const iconProps = { className: "w-6 h-6 text-primary" };
  switch (iconName) {
    case "layers":
      return <Layers {...iconProps} />;
    case "cpu":
      return <Cpu {...iconProps} />;
    case "eye":
      return <Eye {...iconProps} />;
    case "sparkles":
      return <Sparkles {...iconProps} />;
    case "target":
      return <Target {...iconProps} />;
    case "shield":
      return <Shield {...iconProps} />;
    case "zap":
      return <Zap {...iconProps} />;
    case "timer":
      return <Timer {...iconProps} />;
    case "award":
      return <Award {...iconProps} />;
    case "flame":
      return <Flame {...iconProps} />;
    case "trophy":
      return <Trophy {...iconProps} />;
    case "activity":
      return <Activity {...iconProps} />;
    default:
      return <Target {...iconProps} />;
  }
};

/* =========================================================
   SPORT DETAILS
   ========================================================= */

const SPORT_DETAILS: Record<string, any> = {
  cricket: {
    title: "Cricket",
    seoKeyword: "box cricket near me miyapur",
    subtitle: "Premium Cricket Nets & Coaching",
    heroImage: "/images/cricket-card.webp",

    description:
      "Experience world-class cricket training at Zenithh Sports Arena. Our facility features professional-grade nets, high-speed bowling machines, and expert coaching designed to refine your technique and elevate your game to the next level. If you are searching for box cricket near me miyapur, Zenithh offers quality facilities and easy booking. Book your box cricket near me miyapur experience at Zenithh Sports Arena today.",

    features: [
      "Professional-grade artificial turf pitches",
      "Automated high-speed bowling machines",
      "Video analysis for batting and bowling techniques",
      "Dedicated strength and conditioning for cricketers",
    ],

    specs: [
      {
        title: "All-Weather Turf Nets",
        icon: "layers",
        description:
          "Multi-lane synthetic turf wickets calibrated for authentic bounce, true pace, and natural seam movement.",
      },
      {
        title: "RoboArm & Bowling Machines",
        icon: "cpu",
        description:
          "High-velocity automated bowling units delivering programmable speeds from 60 km/h to 145 km/h+ with swing and spin.",
      },
      {
        title: "Biomechanical Video Bay",
        icon: "eye",
        description:
          "High-frame-rate video capture and slow-motion breakdown for batting backlift, stance balance, and release point.",
      },
      {
        title: "Shadowless Floodlights",
        icon: "sparkles",
        description:
          "Day-night LED sports lighting calibrated to eliminate glare and blind spots during high-speed evening sessions.",
      },
    ],

    pathway: [
      {
        tag: "BATTING",
        title: "Technical Stance & Power Hitting",
        description:
          "Mastering balance, weight transfer, defensive solidity against express pace, and modern 360-degree boundary striking.",
      },
      {
        tag: "BOWLING",
        title: "Pace & Spin Artistry",
        description:
          "Seam presentation, wrist control, off-cutter and googly variations, and pinpoint yorker accuracy in death overs.",
      },
      {
        tag: "MATCH PLAY",
        title: "Pressure & Chase Simulation",
        description:
          "Simulated match overs, death-over run-rate targets, tactical box cricket situational awareness, and game management.",
      },
      {
        tag: "FITNESS",
        title: "Cricket-Specific Conditioning",
        description:
          "Rotational core strength, explosive running between wickets, reflex catching drills, and shoulder injury prevention.",
      },
    ],

    schedule: "Morning: 7 AM – 10 AM, Evening: 5 PM – 8 PM",
    coaches: "BCCI Certified Level 2 Coaches",
    gallery: [
      "/images/cricket-1.webp",
      "/images/cricket-2.webp",
      "/images/cricket-3.webp",
    ],
  },

  pickleball: {
    title: "Pickleball",
    seoKeyword: "Pickleball court near me Miyapur",
    subtitle: "Elite Pickleball Courts",
    heroImage: "/images/pickleball.webp",

    description:
      "Join the fastest growing sport in the world on our premium pickleball courts. Whether you are a beginner looking to learn the basics or an advanced player seeking competitive matches, our courts offer the perfect environment. If you are searching for Pickleball court near me Miyapur, Zenithh offers quality facilities and easy booking. Book your Pickleball court near me Miyapur experience at Zenithh Sports Arena today.",

    features: [
      "Tournament-standard court dimensions and netting",
      "High-grip, shock-absorbing surface",
      "Equipment rental available (paddles and balls)",
      "Regular weekend tournaments and leagues",
    ],

    specs: [
      {
        title: "USAPA Official Sizing",
        icon: "target",
        description:
          "Dedicated 20x44 ft tournament courts with precision non-volley kitchen boundaries and regulation sideline margins.",
      },
      {
        title: "Cushioned Acrylic Surface",
        icon: "layers",
        description:
          "Shock-absorbing multi-layer acrylic sports coating engineered to minimize joint impact and ensure consistent ball bounce.",
      },
      {
        title: "Tournament Tension Nets",
        icon: "shield",
        description:
          "Heavy-duty anchored center posts with anti-sag cable tension set to strict 34-inch center regulation height.",
      },
      {
        title: "Anti-Glare Court Illumination",
        icon: "sparkles",
        description:
          "Uniform overhead LED lighting ensuring crisp, clear tracking of neon pickleballs throughout evening play.",
      },
    ],

    pathway: [
      {
        tag: "KITCHEN PLAY",
        title: "Dink Control & Soft Game",
        description:
          "Patience at the non-volley zone, soft-touch resets, angle dinking, and unforced error minimization.",
      },
      {
        tag: "TRANSITION",
        title: "Third-Shot Drop Mastery",
        description:
          "Calibrating baseline drop arcs and driving shots to advance safely to the offensive kitchen line.",
      },
      {
        tag: "DOUBLES STRATEGY",
        title: "Stacking & Court Coverage",
        description:
          "Partner rotation communication, tactical stacking, court positioning, and aggressive middle-poach attacks.",
      },
      {
        tag: "REFLEXES",
        title: "Hand Speed & Fast Volleys",
        description:
          "Defending rapid-fire hand battles at the net, punch volleys, roll volleys, and decisive overhead put-aways.",
      },
    ],

    schedule: "Morning: 7 AM – 10 AM, Evening: 5 PM – 8 PM",
    coaches: "Professional Pickleball Instructors",
    gallery: [
      "/images/gallery-pickle-1.webp",
      "/images/pickle-ball.webp",
    ],
  },

  volleyball: {
    title: "Volleyball",
    seoKeyword: "Volleyball Court Near Me Miyapur",
    subtitle: "Professional Volleyball Arena",
    heroImage: "/images/volleyball.webp",

    description:
      "Spike, set, and serve in our state-of-the-art volleyball arena. Designed to international standards, our courts are perfect for rigorous training sessions, casual games, and competitive leagues. If you are searching for Volleyball Court Near Me Miyapur, Zenithh offers quality facilities, exciting games, and easy booking. Book your Volleyball Court Near Me Miyapur experience at Zenithh Sports Arena today.",

    features: [
      "FIVB standard net systems and antennas",
      "Premium synthetic flooring for injury prevention",
      "High-ceiling clearance for competitive play",
      "Specialized jump training equipment",
    ],

    specs: [
      {
        title: "FIVB Standard Arena",
        icon: "target",
        description:
          "Full 18m x 9m regulation dimensions with official antenna posts and adjustable net heights for men, women, and juniors.",
      },
      {
        title: "Impact-Absorbing Flooring",
        icon: "layers",
        description:
          "High-grip synthetic sports floor formulated for safe diving, rapid direction changes, and landing impact absorption.",
      },
      {
        title: "Spacious Safety Perimeter",
        icon: "shield",
        description:
          "Generous runoff buffer zones and high-clearance overhead space for deep digs and unobstructed high-arc sets.",
      },
      {
        title: "Pro Ball Systems & Aids",
        icon: "zap",
        description:
          "Official tournament match balls, setter training rings, spike approach boards, and vertical jump measurement stations.",
      },
    ],

    pathway: [
      {
        tag: "ATTACK",
        title: "Spike Explosion & Approach Footwork",
        description:
          "Refining 4-step approach mechanics, vertical jump height, explosive arm swing, and hitting around double blocks.",
      },
      {
        tag: "SETTING",
        title: "Tempo & Distribution Strategy",
        description:
          "Soft fingertip control, quick tempo sets to middle blockers, back-sets, and deceptive setter dumps under pressure.",
      },
      {
        tag: "DEFENSE",
        title: "Platform Passing & Floor Defense",
        description:
          "Forearm platform consistency, reading attacker shoulder angles, diving pancakes, and emergency roll recoveries.",
      },
      {
        tag: "SERVE & TACTICS",
        title: "Jump Serves & System Rotations",
        description:
          "Developing floating dip serves, power topspin jump serves, rotational coverage, and transitional counter-attacks.",
      },
    ],

    schedule: "Morning: 7 AM – 10 AM, Evening: 5 PM – 8 PM",
    coaches: "National Level Volleyball Coaches",
    gallery: [
      "/images/gallery-volley-1.webp",
      "/images/gallery-volley-2.webp",
      "/images/gallery-volley-3.webp",
      "/images/volleyball-action-1.webp",
      "/images/volleyball-action-2.webp",
    ],
  },

  chess: {
    title: "Chess",
    seoKeyword: "Chess Club Near Me Miyapur",
    subtitle: "Strategic Chess Academy",
    heroImage: "/images/chess.webp",

    description:
      "Sharpen your mind and master strategy at the Zenithh Chess Academy. We provide a quiet, focused environment with expert guidance to help players of all ages develop critical thinking and tactical brilliance. If you are searching for Chess Club Near Me Miyapur, Zenithh offers quality facilities and easy booking. Book your Chess Club Near Me Miyapur experience at Zenithh Sports Arena today.",

    features: [
      "FIDE standard chess boards and tournament clocks",
      "Quiet, distraction-free environment",
      "Tactical analysis and puzzle-solving sessions",
      "Regular internal rating tournaments",
    ],

    specs: [
      {
        title: "FIDE Tournament Boards & Clocks",
        icon: "timer",
        description:
          "Weighted Staunton pieces, non-glare tournament boards, and precision digital DGT chess clocks for official time controls.",
      },
      {
        title: "Acoustically Treated Zone",
        icon: "shield",
        description:
          "Sound-insulated, quiet environment crafted for deep calculation, tactical vision, and distraction-free concentration.",
      },
      {
        title: "Master Demonstration Boards",
        icon: "layers",
        description:
          "Large magnetic wall boards for coaches to deconstruct grandmaster games, thematic openings, and puzzle patterns.",
      },
      {
        title: "Digital Database & Game Library",
        icon: "award",
        description:
          "Access to thousands of annotated classical master games, thematic opening repertoires, and tactical drill sheets.",
      },
    ],

    pathway: [
      {
        tag: "OPENINGS",
        title: "Principles & Repertoire Building",
        description:
          "Understanding classical opening principles (1.e4, 1.d4, Sicilian, Indian defenses) through ideas rather than rote memory.",
      },
      {
        tag: "TACTICS",
        title: "Calculation & Combinational Vision",
        description:
          "Spotting pins, skewers, double attacks, deflections, and tactical sacrifices to seize decisive material advantage.",
      },
      {
        tag: "ENDGAME",
        title: "Pawn Structures & King Activity",
        description:
          "Mastering critical endgame techniques: opposition, Lucena & Philidor positions, minor piece endgames, and promotion races.",
      },
      {
        tag: "PSYCHOLOGY",
        title: "Time Management & Tournament Resilience",
        description:
          "Managing clock pressure, avoiding blunder traps, maintaining emotional composure, and fighting back from difficult positions.",
      },
    ],

    schedule: "Morning: 7 AM – 10 AM, Evening: 5 PM – 8 PM",
    coaches: "FIDE Rated Masters",
    gallery: [
      "/images/gallery-chess-1.webp",
      "/images/about-interior.webp",
    ],
  },

  zumba: {
    title: "Zumba",
    seoKeyword: "Zumba Studio Near Me",
    subtitle: "Zumba & Fitness Studio",
    heroImage: "/images/zumba-card.webp",

    description:
      "Dance your way to fitness in our high-energy Zumba studio. Our certified instructors combine Latin and international music with dance moves for an exhilarating, effective workout. If you are searching for Zumba Studio Near Me, Zenithh offers quality facilities and easy booking. Book your Zumba Studio Near Me experience at Zenithh Sports Arena today.",

    features: [
      "Spacious studio with sprung wooden flooring",
      "Premium sound system and acoustics",
      "Full-length wall mirrors",
      "High-energy, certified instructors",
    ],

    specs: [
      {
        title: "Sprung Wooden Dance Floor",
        icon: "layers",
        description:
          "Shock-absorbing floating timber flooring engineered to cushion joints and protect knees during high-energy dance routines.",
      },
      {
        title: "Panoramic Wall Mirrors",
        icon: "eye",
        description:
          "Full-length studio mirrors providing clear visibility for participants to check posture, rhythm, and body alignment.",
      },
      {
        title: "Concert Acoustic Soundstage",
        icon: "zap",
        description:
          "High-definition surround sound system delivering deep bass and energetic Latin, Afrobeat, and global workout tracks.",
      },
      {
        title: "Climate-Controlled Airflow",
        icon: "flame",
        description:
          "High-volume air filtration and cooling that keeps participants refreshed throughout intense 60-minute sweat sessions.",
      },
    ],

    pathway: [
      {
        tag: "CARDIO",
        title: "High-Calorie Interval Burn",
        description:
          "Alternating fast and slow rhythms to maximize calorie expenditure (up to 700 kcal/hr) and boost cardiovascular capacity.",
      },
      {
        tag: "TONING",
        title: "Core & Full-Body Sculpting",
        description:
          "Rhythmic choreography integrating squats, lunges, hip rotations, and arm extensions to build lean muscle definition.",
      },
      {
        tag: "COORDINATION",
        title: "Rhythm & Motor Agility",
        description:
          "Learning international dance styles including Salsa, Merengue, Cumbia, Reggaeton, and high-tempo Bollywood fusion.",
      },
      {
        tag: "WELLNESS",
        title: "Endorphin Elevation & Stress Relief",
        description:
          "A joyful, inclusive, community-driven workout experience that melts mental stress and elevates daily energy.",
      },
    ],

    schedule: "Morning: 7 AM – 10 AM, Evening: 5 PM – 8 PM",
    coaches: "Certified Zumba Instructors",
    gallery: [
      "/images/about-interior.webp",
      "/images/facility-indoor.webp",
    ],
  },

  "table-tennis": {
    title: "Table Tennis",
    seoKeyword: "Table Tennis Court Near Me Miyapur",
    subtitle: "Table Tennis Championship Hall",
    heroImage: "/images/table-tennis.webp",

    description:
      "Experience lightning-fast rallies on our ITTF-approved table tennis setups. Perfect your spin, speed, and agility in our dedicated indoor championship hall. If you are searching for Table Tennis Court Near Me Miyapur, Zenithh offers quality facilities and easy booking. Book your Table Tennis Court Near Me Miyapur experience at Zenithh Sports Arena today.",

    features: [
      "ITTF approved competition tables",
      "Professional anti-glare lighting",
      "Robot ball feeders for solo practice",
      "Advanced multi-ball training sessions",
    ],

    specs: [
      {
        title: "ITTF Approved 25mm Tables",
        icon: "layers",
        description:
          "Championship-level table surfaces providing uniform ball bounce, true spin response, and anti-glare finish.",
      },
      {
        title: "Robotic Multi-Spin Feeders",
        icon: "cpu",
        description:
          "Programmable robotic launchers capable of variable speed, oscillation, topspin, backspin, and side-spin combinations.",
      },
      {
        title: "Anti-Glare Shadowless Lighting",
        icon: "sparkles",
        description:
          "Professional overhead sports illumination delivering optimal ball contrast at speeds exceeding 100 km/h.",
      },
      {
        title: "High-Traction Court Matting",
        icon: "shield",
        description:
          "Dedicated non-slip tournament court matting ensuring stability during aggressive lateral lunges and recovery steps.",
      },
    ],

    pathway: [
      {
        tag: "SPIN & DRIVE",
        title: "Loop & Counter-Attack Mastery",
        description:
          "Generating explosive topspin with brush contact, waist torque, forehand kill loops, and backhand banana flicks.",
      },
      {
        tag: "SERVICE",
        title: "Serve Deception & Spin Control",
        description:
          "Developing ghost underspin serves, heavy side-spin pendulum serves, and disguised no-spin fast deliveries.",
      },
      {
        tag: "FOOTWORK",
        title: "Lateral Agility & Recovery Speed",
        description:
          "Executing rapid side-to-side shuffle steps, in-and-out table transitions, and maintaining balance during extended rallies.",
      },
      {
        tag: "REFLEXES",
        title: "Close-Table Block & Multi-Ball Drills",
        description:
          "High-speed multi-ball repetition training that builds lightning reflexes and subconscious shot placement.",
      },
    ],

    schedule: "Morning: 7 AM – 10 AM, Evening: 5 PM – 8 PM",
    coaches: "State Level Table Tennis Champions",
    gallery: [
      "/images/gallery-tabletennis-1.webp",
      "/images/gallery-tabletennis-2.webp",
      "/images/gallery-tabletennis-3.webp",
    ],
  },

  foosball: {
    title: "Foosball",
    seoKeyword: "Foosball Near Me Miyapur",
    subtitle: "Foosball & Gaming Lounge",
    heroImage: "/images/foosball.webp",

    description:
      "Take a break or challenge your friends in our dedicated foosball and recreation lounge. Featuring tournament-grade tables, it's the perfect place to unwind and test your reflexes. If you are searching for Foosball Near Me Miyapur, Zenithh offers quality facilities and easy booking. Book your Foosball Near Me Miyapur experience at Zenithh Sports Arena today.",

    features: [
      "Tournament-grade ITSF approved tables",
      "Smooth rod action and precision players",
      "Comfortable lounge seating area",
      "Perfect for corporate events and team building",
    ],

    specs: [
      {
        title: "ITSF Tournament-Grade Tables",
        icon: "trophy",
        description:
          "Professional competition tables with solid stainless-steel through-rods, balanced players, and precision foot profiles.",
      },
      {
        title: "Zero-Friction Glass Playfield",
        icon: "layers",
        description:
          "Sandblasted tempered glass bed ensuring perfectly true ball rolling without dead zones or accidental roll drifts.",
      },
      {
        title: "Octagonal Ergonomic Grips",
        icon: "target",
        description:
          "High-torque textured handles engineered for finger-roll spin control, wrist snap power, and zero hand slippage.",
      },
      {
        title: "Dedicated Recreation Lounge",
        icon: "sparkles",
        description:
          "Comfortable spectator seating, warm ambient lighting, and bracket boards for casual friend games and tournaments.",
      },
    ],

    pathway: [
      {
        tag: "SHOT MASTERY",
        title: "The Snake & Pull Shot",
        description:
          "Mastering tournament-standard rollover (snake) shots and explosive pull shots clocked at over 40 km/h.",
      },
      {
        tag: "BALL CONTROL",
        title: "5-Bar Passing & Lane Control",
        description:
          "Executing crisp wall passes, brush passes, and maintaining midfield offensive possession against defensive guards.",
      },
      {
        tag: "GOALKEEPING",
        title: "2-Man Rod Defense & Angle Cutting",
        description:
          "Synchronizing goalie and 2-bar defense to eliminate straight-lane and bank angles, clearing rebounds decisively.",
      },
      {
        tag: "TEAM TACTICS",
        title: "2v2 Coordination & Mental Speed",
        description:
          "Building unspoken chemistry between front and back players, baiting opponent defenders, and managing clutch match balls.",
      },
    ],

    schedule: "Morning: 7 AM – 10 AM, Evening: 5 PM – 8 PM",
    coaches: "Recreational Supervisors",
    gallery: [
      "/images/gallery-foosball-1.webp",
      "/images/gallery-foosball-2.webp",
      "/images/gallery-foosball-3.webp",
      "/images/gallery-foosball-4.webp",
      "/images/gallery-foosball-5.webp",
    ],
  },

  carrom: {
    title: "Carrom",
    seoKeyword: "Indoor Games Near Me Miyapur",
    subtitle: "Carrom Training Center",
    heroImage: "/images/carroms.webp",

    description:
      "Master precision and focus at our specialized carrom center. Our smooth, championship-quality boards provide the ideal surface for players looking to perfect their striking techniques. If you are searching for Indoor Games Near Me Miyapur, Zenithh offers quality facilities and easy booking. Book your Indoor Games Near Me Miyapur experience at Zenithh Sports Arena today.",

    features: [
      "Championship quality smooth boards",
      "Proper overhead focused lighting",
      "Premium quality coins and strikers",
      "Quiet zone for maximum concentration",
    ],

    specs: [
      {
        title: "English Birch Champion Boards",
        icon: "layers",
        description:
          "Handcrafted tournament playing surfaces with satin finish and high-rebound natural rubber borders for frictionless glide.",
      },
      {
        title: "Circular Shadowless Lighting",
        icon: "sparkles",
        description:
          "Overhead diffused ring illumination positioned directly above the board to eliminate coin and striker shadows.",
      },
      {
        title: "Precision Weighted Strikers",
        icon: "target",
        description:
          "Regulation weight-compliant 15g tournament strikers and authentic wooden carrom coin sets with champion finish.",
      },
      {
        title: "Posture-Correct Seating",
        icon: "shield",
        description:
          "Ergonomic seating matched to board table height to provide maximum shoulder stability and comfortable long-session play.",
      },
    ],

    pathway: [
      {
        tag: "FINGER TECHNIQUE",
        title: "Thumb & Scissor Grip Accuracy",
        description:
          "Mastering the straight flick, middle finger flick, and thumb push to generate pinpoint directional control and power.",
      },
      {
        tag: "GEOMETRY",
        title: "Rebound Angles & Bank Shots",
        description:
          "Calculating mathematical rebound angles off borders to free trapped coins and convert difficult indirect pockets.",
      },
      {
        tag: "BOARD STRATEGY",
        title: "Queen Cover & Coin Management",
        description:
          "Strategic coin clustering, blocking opponent pockets, and timing the decisive queen pocketing and cover confirmation.",
      },
      {
        tag: "FOCUS",
        title: "Breath Control & Match Calmness",
        description:
          "Developing laser-sharp concentration, fine motor discipline, and composure when executing match-winning shots.",
      },
    ],

    schedule: "Morning: 7 AM – 10 AM, Evening: 5 PM – 8 PM",
    coaches: "Experienced Carrom Professionals",
    gallery: [
      "/images/gallery-carroms-1.webp",
      "/images/gallery-carroms-2.webp",
    ],
  },

  "air-hockey": {
    title: "Air Hockey",
    seoKeyword: "Air Hockey Table Near Me Miyapur",
    subtitle: "Arcade Zone - Air Hockey",
    heroImage: "/images/air-hockey.webp",

    description:
      "Feel the rush of high-speed arcade action with our premium air hockey tables. Featuring powerful airflow and electronic scoring, it's an exciting addition to your recreational time at Zenithh. If you are searching for Air Hockey Table Near Me Miyapur, Zenithh offers quality facilities and easy booking. Book your Air Hockey Table Near Me Miyapur experience at Zenithh Sports Arena today.",

    features: [
      "Commercial-grade air hockey tables",
      "Powerful, consistent airflow",
      "Electronic score tracking",
      "High-energy arcade environment",
    ],

    specs: [
      {
        title: "Industrial Air Cushion Bed",
        icon: "flame",
        description:
          "Commercial blower motor pushing thousands of micro-air jets through precision perforations for effortless puck glide.",
      },
      {
        title: "Hardened Aluminum Bank Rails",
        icon: "shield",
        description:
          "Impact-grade tournament perimeter rails engineered for 100% true bounce deflection and high-speed rail shots.",
      },
      {
        title: "Infrared Electronic Scoreboard",
        icon: "cpu",
        description:
          "Overhead digital display with infrared goal detection sensors and immersive arcade arena sound effects.",
      },
      {
        title: "Weighted Pro Mallets & Pucks",
        icon: "target",
        description:
          "Ergonomic high-density mallets with felt-padded undersides and aerodynamic pucks designed for intense gameplay.",
      },
    ],

    pathway: [
      {
        tag: "REFLEXES",
        title: "Reaction Speed & Visual Tracking",
        description:
          "Honing split-second twitch reflexes to track and intercept pucks rocketing at over 80 km/h across the table.",
      },
      {
        tag: "ANGLES",
        title: "Bank Cuts & Wall Trick Shots",
        description:
          "Utilizing acute rail angles to ricochet pucks around defender mallets into unattended goal corners.",
      },
      {
        tag: "DEFENSE",
        title: "Center-Line Mallet Shielding",
        description:
          "Centering the mallet, absorbing fast attacks, preventing self-goals, and converting blocks into instant counter-strikes.",
      },
      {
        tag: "COMPETITION",
        title: "Match Strategy & Tournament Play",
        description:
          "Managing match tempo, sudden-death overtime pressure, and winning best-of-7 series against top recreational rivals.",
      },
    ],

    schedule: "Morning: 7 AM – 10 AM, Evening: 5 PM – 8 PM",
    coaches: "Recreational Supervisors",
    gallery: [
      "/images/gallery-airhockey-1.webp",
      "/images/gallery-foosball-3.webp",
    ],
  },

  "vr-cricket": {
    title: "VR Cricket",
    seoKeyword: "VR Cricket Game Near Me Miyapur",
    subtitle: "Immersive Virtual Reality Cricket",
    heroImage: "/images/vr-cricket-card.webp",

    description:
      "Step into the ultimate virtual reality cricket experience at Zenithh Sports Arena. Face international-level pacers and spinners in hyper-realistic stadiums using state-of-the-art VR technology. Perfect for honing your reflexes, shot selection, and match awareness in a fully controlled digital environment. If you are searching for VR Cricket Game Near Me Miyapur, Zenithh offers quality facilities and easy booking. Book your VR Cricket Game Near Me Miyapur experience at Zenithh Sports Arena today.",

    features: [
      "Hyper-realistic VR cricket simulation technology",
      "Face bowling speeds from 60kmph to 150kmph+",
      "Multiple international stadium environments",
      "Real-time shot analysis and impact feedback",
      "Progress tracking and reflex improvement",
      "Safe, weather-proof, immersive training",
    ],

    specs: [
      {
        title: "6-DOF Spatial Motion Sensors",
        icon: "cpu",
        description:
          "Sub-millimeter tracking sensors capturing real bat angle, swing speed, backlift path, and point of ball impact.",
      },
      {
        title: "Haptic Sensor-Equipped Bat",
        icon: "zap",
        description:
          "Genuine willow cricket bat fitted with wireless kinetic sensors delivering authentic physical impact feedback.",
      },
      {
        title: "360° Photorealistic Stadiums",
        icon: "eye",
        description:
          "Hyper-immersive virtual international arenas complete with floodlights, dynamic crowds, and authentic field settings.",
      },
      {
        title: "Adaptive Bowling Trajectory AI",
        icon: "activity",
        description:
          "Proprietary physics engine simulating seam, swing, drift, and spin from 70 km/h leg-breaks to 150 km/h bouncers.",
      },
    ],

    pathway: [
      {
        tag: "TIMING",
        title: "Early Ball Pick-up & Bat Speed",
        description:
          "Training eyes to read the bowler's hand release, picking up length instantaneously, and swinging through the line.",
      },
      {
        tag: "SHOT ARSENAL",
        title: "Front & Back Foot Strokeplay",
        description:
          "Honing cover drives, pull shots, late cuts, and ramp shots in a completely risk-free, weather-independent environment.",
      },
      {
        tag: "ANALYTICS",
        title: "Telemetry & Performance Metrics",
        description:
          "Reviewing instant post-shot telemetry: impact sweet-spot percentage, bat speed, launch angle, and ball exit velocity.",
      },
      {
        tag: "PRESSURE",
        title: "Super Over & Chase Scenarios",
        description:
          "Testing nerves in simulated stadium match crises: chasing 15 runs in the final over with 50,000 virtual fans watching.",
      },
    ],

    schedule: "Morning: 7 AM – 10 AM, Evening: 5 PM – 8 PM",
    coaches: "VR Training Specialists",
    gallery: [
      "/images/facility-indoor.webp",
      "/images/msk_facility.webp",
    ],
  },

  "badminton-outdoor": {
    title: "Badminton Outdoor",
    seoKeyword: "Badminton Court Near Me Miyapur",
    subtitle: "High-Energy Outdoor Badminton",
    heroImage: "/images/badminton-card.webp",

    description:
      "Experience the thrill of outdoor badminton at Zenithh Sports Arena. Specifically designed for all-weather recreational and competitive play, our outdoor badminton courts offer an exhilarating environment to improve fitness, agility, and racquet skills under the open sky. If you are searching for Badminton Court Near Me Miyapur, Zenithh offers quality facilities and easy booking. Book your Badminton Court Near Me Miyapur experience at Zenithh Sports Arena today.",

    features: [
      "Premium outdoor all-weather surfaces",
      "Professional lighting for evening play",
      "Singles and doubles court configurations",
      "Improves agility, reflexes, and cardiovascular health",
      "Available for casual booking and structured coaching",
      "Perfect for early morning and evening fitness routines",
    ],

    specs: [
      {
        title: "All-Weather Synthetic Court",
        icon: "layers",
        description:
          "Textured multi-layer outdoor sports coating offering dependable traction and drainage in varying weather conditions.",
      },
      {
        title: "Wind-Resistant AirShuttle Compatibility",
        icon: "target",
        description:
          "Engineered for both standard and aerodynamic AirShuttles to deliver stable flight arcs under open-air breezes.",
      },
      {
        title: "High-Mast Perimeter Floodlights",
        icon: "sparkles",
        description:
          "Evenly distributed floodlights allowing sharp visual contrast of white and neon shuttlecocks throughout the night.",
      },
      {
        title: "Regulation Posts & Netting",
        icon: "shield",
        description:
          "Rigid anchor posts with heavy-duty weather-treated netting tensioned to official 1.55m height specifications.",
      },
    ],

    pathway: [
      {
        tag: "POWER",
        title: "Smash Mechanics & Jump Smashes",
        description:
          "Full-body kinetic chain transfer, wrist pronation snap, and downward steep smash angles that pierce defenses.",
      },
      {
        tag: "FINESSE",
        title: "Drop Shots & Net Tumbling",
        description:
          "Deceptive wrist slices, cross-court drop shots, and delicate net spins that force opponents into defensive lifts.",
      },
      {
        tag: "AGILITY",
        title: "6-Corner Footwork & Recovery",
        description:
          "Split-step timing, chassé movements, lunging balance, and instant center-court recovery between rapid exchanges.",
      },
      {
        tag: "ENDURANCE",
        title: "Cardio Conditioning & Rally Stamina",
        description:
          "Aerobic and anaerobic fitness drills designed to maintain explosive speed and shot accuracy deep into the 3rd set.",
      },
    ],

    schedule: "Morning: 7 AM – 10 AM, Evening: 5 PM – 8 PM",
    coaches: "Certified Badminton Coaches",
    gallery: [
      "/images/facility-indoor.webp",
      "/images/about-arena.webp",
    ],
  },
};

/* =========================================================
   ANIMATION VARIANTS
   ========================================================= */

const fadeIn: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
  },

  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const staggerContainer: Variants = {
  hidden: {
    opacity: 0,
  },

  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

/* =========================================================
   KEYWORD HIGHLIGHT
   ========================================================= */

const renderKeyword = (text: string, keyword: string) => {
  const escapedKeyword = keyword.replace(
    /[.*+?^${}()|[\]\\]/g,
    "\\$&"
  );

  const parts = text.split(
    new RegExp(`(${escapedKeyword})`, "gi")
  );

  return parts.map((part, index) =>
    part.toLowerCase() === keyword.toLowerCase() ? (
      <strong
        key={index}
        className="font-bold text-[var(--text-primary)]"
      >
        {part}
      </strong>
    ) : (
      part
    )
  );
};

/* =========================================================
   COMPONENT
   ========================================================= */

export default function SportDetail() {
  /*
   * The route parameter is called sportSlug.
   *
   * It can contain either:
   *
   * NEW:
   * /sports/box-cricket-near-me-miyapur
   *
   * OLD:
   * /sports/cricket
   *
   * This allows old links to continue resolving while
   * the new SEO-friendly URLs become canonical.
   */

  const { sportSlug } = useParams<{
    sportSlug: string;
  }>();

  const navigate = useNavigate();

  /* =======================================================
     RESOLVE SPORT ID
     ======================================================= */

  const resolvedSportId =
    sportSlug &&
    (SPORT_DETAILS[sportSlug]
      ? sportSlug
      : Object.entries(SPORT_SLUGS).find(
          ([, slug]) => slug === sportSlug
        )?.[0]);

  /* =======================================================
     SEO
     ======================================================= */

  const currentSEO = resolvedSportId
    ? SEO_METADATA[resolvedSportId]
    : undefined;

  const canonicalSlug = resolvedSportId
    ? SPORT_SLUGS[resolvedSportId]
    : undefined;

  /* =======================================================
     SCROLL TO TOP
     ======================================================= */

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [resolvedSportId]);

  /* =======================================================
     SPORT NOT FOUND
     ======================================================= */

  if (
    !resolvedSportId ||
    !SPORT_DETAILS[resolvedSportId]
  ) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[var(--bg-primary)] px-6">
        <h1 className="text-4xl font-bold uppercase text-[var(--text-primary)] mb-4 text-center">
          Sport Not Found
        </h1>

        <p className="text-[var(--text-muted)] mb-8 text-center max-w-xl">
          The program you are looking for doesn't exist or
          is currently unavailable.
        </p>

        <Link
          to="/sports"
          className="btn-primary"
        >
          Back to All Sports
        </Link>
      </div>
    );
  }

  /* =======================================================
     SPORT DATA
     ======================================================= */

  const sport = SPORT_DETAILS[resolvedSportId];

  /* =======================================================
     PAGE
     ======================================================= */

  return (
    <>
      {/* ===================================================
          SEO
          =================================================== */}

      {currentSEO && canonicalSlug && (
        <SEO
          title={currentSEO.title}
          description={currentSEO.description}
          keywords={currentSEO.keywords}
          canonical={`https://www.zenithh.com/sports/${canonicalSlug}`}
        />
      )}

      <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)]">

        {/* =================================================
            HERO
            ================================================= */}

        <section className="relative h-[60vh] md:h-[70vh] flex items-end pb-16 overflow-hidden pt-20">

          <div className="premium-image-hover absolute inset-0 z-0">
            <img
              src={sport.heroImage}
              alt={sport.title}
              className="w-full h-full object-cover object-center"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src =
                  "/images/about-arena.webp";
              }}
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)] via-[var(--bg-primary)]/60 to-transparent z-10" />
          </div>

          <div className="container mx-auto px-6 relative z-10">

            {/* BACK BUTTON */}

            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-[var(--text-primary)]/80 hover:text-primary mb-8 transition-colors text-sm uppercase tracking-widest font-bold"
            >
              <ArrowLeft className="w-4 h-4" />

              Back
            </motion.button>

            {/* HERO TEXT */}

            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="max-w-3xl"
            >
              <motion.span
                variants={fadeIn}
                className="text-primary font-bold tracking-[0.3em] uppercase text-sm block mb-3"
              >
                {sport.subtitle}
              </motion.span>

              <motion.h1
                variants={fadeIn}
                className="text-5xl md:text-7xl font-black uppercase text-[var(--text-primary)] tracking-tight mb-6 leading-[1.3]"
              >
                {sport.title}
              </motion.h1>
            </motion.div>

          </div>
        </section>

        {/* =================================================
            CONTENT
            ================================================= */}

        <section className="py-20 bg-[var(--bg-primary)]">

          <div className="container mx-auto px-6">

            <div className="flex flex-col lg:flex-row gap-16">

              {/* ===========================================
                  LEFT: DESCRIPTION & FEATURES
                  =========================================== */}

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={staggerContainer}
                className="flex-1"
              >

                <motion.h2
                  variants={fadeIn}
                  className="text-3xl font-extrabold uppercase text-[var(--text-primary)] mb-6 leading-[1.3]"
                >
                  About the Program
                </motion.h2>

                <motion.p
                  variants={fadeIn}
                  className="text-[var(--text-muted)] text-lg leading-relaxed mb-10"
                >
                  {renderKeyword(
                    sport.description,
                    sport.seoKeyword
                  )}
                </motion.p>

                <motion.h3
                  variants={fadeIn}
                  className="text-xl font-bold uppercase tracking-wide text-[var(--text-primary)] mb-6"
                >
                  Program Highlights
                </motion.h3>

                <motion.div
                  variants={fadeIn}
                  className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10"
                >
                  {sport.features.map(
                    (feature: string, idx: number) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3 p-4 bg-[var(--bg-secondary)] border border-[var(--border-light)]"
                      >
                        <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />

                        <span className="text-[var(--text-muted)] font-medium text-sm">
                          {feature}
                        </span>
                      </div>
                    )
                  )}
                </motion.div>

              </motion.div>

              {/* ===========================================
                  RIGHT: INFO CARD & BOOKING
                  =========================================== */}

              <motion.div
                initial={{
                  opacity: 0,
                  x: 30,
                }}
                whileInView={{
                  opacity: 1,
                  x: 0,
                }}
                viewport={{ once: true }}
                className="w-full lg:w-1/3 flex-shrink-0"
              >

                <div className="bg-[var(--bg-secondary)] text-[var(--text-primary)] p-8 border border-[var(--border-light)] shadow-2xl sticky top-24">

                  <h3 className="text-2xl font-bold uppercase tracking-wide mb-6">
                    Program Details
                  </h3>

                  <div className="space-y-6 mb-8">

                    {/* TIMINGS */}

                    <div className="flex items-start gap-4">

                      <Clock className="w-6 h-6 text-primary" />

                      <div>

                        <p className="text-xs text-[var(--text-muted)] uppercase tracking-widest font-bold mb-1">
                          Timings
                        </p>

                        <p className="text-sm font-medium">
                          Morning: 7:00 AM – 10:00 AM
                        </p>

                        <p className="text-sm font-medium">
                          Evening: 5:00 PM – 8:00 PM
                        </p>

                        <p className="text-[10px] text-primary opacity-60 mt-2 uppercase tracking-widest font-black leading-tight">
                          * Timings will be changed according
                          to the season
                        </p>

                      </div>
                    </div>

                    {/* COACHING */}

                    <div className="flex items-start gap-4">

                      <Users className="w-6 h-6 text-primary" />

                      <div>

                        <p className="text-xs text-[var(--text-muted)] uppercase tracking-widest font-bold mb-1">
                          Coaching
                        </p>

                        <p className="text-sm font-medium">
                          {sport.coaches}
                        </p>

                      </div>
                    </div>

                  </div>

                  <Link
                    to="/contact"
                    className="btn-primary"
                  >
                    Enquire Now
                  </Link>

                </div>
              </motion.div>

            </div>
          </div>
        </section>

        {/* =================================================
            1. ARENA & EQUIPMENT SPECIFICATIONS
            ================================================= */}

        {sport.specs && sport.specs.length > 0 && (
          <section className="py-20 md:py-24 bg-[var(--bg-secondary)] border-t border-[var(--border-light)]">
            <div className="container mx-auto px-6">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={staggerContainer}
                className="text-center mb-16"
              >
                <motion.span
                  variants={fadeIn}
                  className="text-primary font-bold tracking-[0.3em] uppercase text-xs block mb-3"
                >
                  World-Class Setup
                </motion.span>

                <motion.h2
                  variants={fadeIn}
                  className="text-3xl md:text-5xl font-black uppercase text-[var(--text-primary)] tracking-tight leading-[1.3]"
                >
                  Facility & Equipment Specifications
                </motion.h2>

                <motion.p
                  variants={fadeIn}
                  className="text-[var(--text-muted)] text-base md:text-lg max-w-2xl mx-auto mt-4 font-normal leading-relaxed"
                >
                  Engineered to tournament standards with professional infrastructure and high-performance equipment.
                </motion.p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
                {sport.specs.map((spec: any, idx: number) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="p-6 rounded-lg bg-[var(--bg-primary)] border border-[var(--border-light)] hover:border-primary/50 transition-all duration-300 group flex flex-col justify-between hover:-translate-y-1 shadow-lg shadow-black/10"
                  >
                    <div>
                      <div className="w-12 h-12 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mb-5 group-hover:scale-110 transition-transform">
                        {renderSpecIcon(spec.icon)}
                      </div>

                      <h3 className="text-lg font-bold uppercase text-[var(--text-primary)] mb-2 tracking-wide">
                        {spec.title}
                      </h3>

                      <p className="text-sm text-[var(--text-muted)] leading-relaxed font-normal">
                        {spec.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* =================================================
            2. TRAINING DYNAMICS & FOCUS AREAS
            ================================================= */}

        {sport.pathway && sport.pathway.length > 0 && (
          <section className="py-20 md:py-24 bg-[var(--bg-primary)] border-t border-[var(--border-light)]">
            <div className="container mx-auto px-6">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={staggerContainer}
                className="text-center mb-16"
              >
                <motion.span
                  variants={fadeIn}
                  className="text-primary font-bold tracking-[0.3em] uppercase text-xs block mb-3"
                >
                  Skill Progression
                </motion.span>

                <motion.h2
                  variants={fadeIn}
                  className="text-3xl md:text-5xl font-black uppercase text-[var(--text-primary)] tracking-tight leading-[1.3]"
                >
                  Training Dynamics & Core Focus
                </motion.h2>

                <motion.p
                  variants={fadeIn}
                  className="text-[var(--text-muted)] text-base md:text-lg max-w-2xl mx-auto mt-4 font-normal leading-relaxed"
                >
                  Structured skill development designed to take your {sport.title} technique from fundamentals to competitive mastery.
                </motion.p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
                {sport.pathway.map((item: any, idx: number) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="p-6 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-light)] hover:border-primary/50 transition-all duration-300 relative overflow-hidden group flex flex-col justify-between hover:-translate-y-1 shadow-lg shadow-black/10"
                  >
                    <div className="absolute top-0 right-0 w-14 h-14 bg-primary/5 rounded-bl-full flex items-start justify-end p-2.5 text-xs font-black text-primary/40 group-hover:text-primary transition-colors">
                      0{idx + 1}
                    </div>

                    <div>
                      <span className="text-[10px] font-extrabold uppercase tracking-widest text-primary mb-2 block">
                        {item.tag}
                      </span>

                      <h3 className="text-lg font-bold uppercase text-[var(--text-primary)] mb-3 tracking-wide">
                        {item.title}
                      </h3>

                      <p className="text-sm text-[var(--text-muted)] leading-relaxed font-normal">
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* =================================================
            GALLERY
            ================================================= */}

        {sport.gallery &&
          sport.gallery.length > 0 && (
            <section className="py-20 bg-[var(--bg-secondary)] border-t border-[var(--border-light)]">

              <div className="container mx-auto px-6">

                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={staggerContainer}
                  className="text-center mb-12"
                >

                  <motion.span
                    variants={fadeIn}
                    className="text-primary font-bold tracking-[0.3em] uppercase text-xs block mb-3"
                  >
                    Inside the Arena
                  </motion.span>

                  <motion.h2
                    variants={fadeIn}
                    className="text-3xl md:text-5xl font-black uppercase text-[var(--text-primary)] leading-[1.3]"
                  >
                    {sport.title} Gallery
                  </motion.h2>

                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-6xl mx-auto">

                  {sport.gallery.map(
                    (img: string, idx: number) => (
                      <motion.div
                        key={img}
                        initial={{
                          opacity: 0,
                          scale: 0.95,
                        }}
                        whileInView={{
                          opacity: 1,
                          scale: 1,
                        }}
                        viewport={{ once: true }}
                        transition={{
                          delay: idx * 0.1,
                        }}
                        className="premium-image-hover aspect-square overflow-hidden bg-[var(--bg-primary)] group"
                      >

                        <img
                          loading="lazy"
                          decoding="async"
                          src={img}
                          alt={`${sport.title} Gallery ${
                            idx + 1
                          }`}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.src =
                              "/images/about-arena.webp";
                          }}
                        />

                      </motion.div>
                    )
                  )}

                </div>

              </div>
            </section>
          )}

        {/* =================================================
            FAQ SECTION
            ================================================= */}

        {resolvedSportId &&
          SPORTS_FAQS[resolvedSportId] && (
            <FAQSection
              faqs={SPORTS_FAQS[resolvedSportId]}
              sportName={sport.title}
            />
          )}

      </div>
    </>
  );
}
