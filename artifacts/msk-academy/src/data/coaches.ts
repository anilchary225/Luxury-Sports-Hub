export interface Coach {
  id: string;
  name: string;
  role: string;
  shortSummary: string;
  image: string;
  imagePosition?: string;
  expertise: string[];
  highlights: string[];
  skills: string[];
  about: string;
  philosophy?: string;
  achievements?: string[];
  programs?: string[];
  specializations?: string[];
  experienceTimeline?: { year: string; event: string }[];
  certifications?: string[];
  sportsManaged?: string[];
  ctaText: string;
}

export const COACHES_DATA: Coach[] = [
  {
    id: "gaalla-venkatesh",
    name: "Gaalla Venkatesh",
    role: "Physical Director & Multi-Sport Coach",
    shortSummary: "Senior Kabaddi champion 2 times and Senior National wrestling player 3 times, with All-Inter-University participation in other states and multi-sport coaching experience.",
    image: "/images/coach-gaalla-venkatesh.webp",
    imagePosition: "center top",
    expertise: ["Kabaddi", "Wrestling", "Athletics", "Multi-Sport Training"],
    highlights: [
      "Senior Kabaddi champion - 2 times",
      "Senior National wrestling player - 3 times",
      "All-Inter-University participations, other state - 3 times",
      "Coaching experience across multiple sports and games"
    ],
    skills: ["Athletics", "Wrestling", "Kabaddi", "Basketball", "Badminton", "Kho-Kho", "Cricket", "Lawn Tennis", "Track & Field"],
    about: "Gaalla Venkatesh is a Physical Director and multi-sport coach. He has been a senior Kabaddi champion 2 times and a Senior National wrestling player 3 times. He has also participated in All-Inter-University wrestling competitions in other states 3 times. His coaching experience spans athletics, wrestling, Kabaddi, basketball, badminton, Kho-Kho, cricket, lawn tennis, and track and field events.",
    achievements: [
      "Kabaddi - Senior Champion 2 times",
      "Wrestling - Senior National Player 3 times",
      "Wrestling - All-Inter-University participations, other state - 3 times"
    ],
    specializations: ["Kabaddi", "Wrestling", "Athletics", "Basketball", "Badminton", "Kho-Kho", "Cricket", "Lawn Tennis", "Track & Field"],
    programs: [
      "Kabaddi Fundamentals & Team Play",
      "Wrestling Skills & Technique",
      "Athletics, Track & Field Development",
      "Multi-Sport Skills & Coordination"
    ],
    ctaText: "Develop your skills across sports with Gaalla Venkatesh."
  },
  {
    id: "ch-vijayalakshmi",
    name: "Ch. Vijayalakshmi",
    role: "Volleyball, Throwball & Multi-Sport Coach",
    shortSummary: "National volleyball and state-level throwball player, qualified in B.P.Ed. and M.P.Ed., with a South Zone multi-sport background.",
    image: "/images/coach-ch-vijayalakshmi-uniform.webp",
    imagePosition: "center top",
    expertise: ["Volleyball", "Throwball", "Multi-Sport Training", "Physical Education"],
    highlights: [
      "National Volleyball Player",
      "State-level Throwball Player",
      "B.P.Ed. and M.P.Ed. qualifications",
      "2 years of experience",
      "South Zone participation in Handball, Kho-Kho and Kabaddi",
      "All-rounder across multiple games"
    ],
    skills: ["Volleyball", "Handball", "Kho-Kho", "Kabaddi", "Throwball", "Physical Education", "Multi-Sport Training"],
    about: "Ch. Vijayalakshmi is a national volleyball player and state-level throwball player with B.P.Ed. and M.P.Ed. qualifications and 2 years of experience. Her sporting background includes South Zone participation in handball, Kho-Kho and kabaddi. An all-rounder across multiple games, she brings a broad physical education and competitive sports background to Zenithh Sports Arena.",
    achievements: [
      "National Volleyball Player",
      "South Zone participation - Handball, Kho-Kho and Kabaddi",
      "State-level Throwball Player"
    ],
    specializations: ["Volleyball", "Handball", "Kho-Kho", "Kabaddi", "Throwball"],
    certifications: ["Bachelor of Physical Education (B.P.Ed.)", "Master of Physical Education (M.P.Ed.)"],
    programs: [
      "Volleyball Fundamentals & Team Play",
      "Throwball Skills & Match Practice",
      "Multi-Sport Skills: Handball, Kho-Kho & Kabaddi",
      "Fitness, Agility & Coordination"
    ],
    ctaText: "Explore volleyball and multi-sport training with Ch. Vijayalakshmi."
  },
  {
    id: "ramesh-gowda",
    name: "Donikena Ramesh",
    role: "Physical Director",
    shortSummary: "Experienced performance-focused sports professional specializing in athlete development, fitness training, and coaching methodologies.",
    image: "/images/coach-donikena-ramesh-uniform.webp",
    imagePosition: "center top",
    expertise: ["Athlete Conditioning", "Sports Performance Training", "Team Leadership"],
    highlights: [
      "Expert in athlete performance enhancement",
      "Specialized in structured sports training programs",
      "Focused on discipline, leadership, and competitive excellence",
      "Strong experience in fitness development and sports mentoring",
      "Skilled in youth athlete development and coaching operations"
    ],
    skills: ["Athlete Conditioning", "Sports Performance Training", "Team Leadership", "Coaching Strategy", "Fitness & Endurance Training", "Sports Mentoring"],
    about: "Donikena Ramesh Gowda is a dedicated Physical Director with a wealth of experience in high-performance sports environments. He has a proven track record of developing elite athletes and implementing structured coaching methodologies that focus on both physical excellence and mental discipline.",
    philosophy: "I believe in a holistic approach to athlete development where discipline, structured training, and constant mentorship create the foundation for competitive excellence.",
    achievements: [
      "Developed comprehensive performance modules for multiple sports disciplines",
      "Led youth development programs that produced inter-state level athletes",
      "Recognized for excellence in sports mentoring and leadership building"
    ],
    programs: ["Elite Athlete Performance Level 1", "Advanced Fitness & Endurance Module", "Coaching Leadership Workshops"],
    ctaText: "Train with a performance expert and unlock your true athletic potential."
  },
  // {
  //   id: "pallavi-podhula",
  //   name: "Pallavi Podhula",
  //   role: "Physical Education Teacher (PET) & Multi-Sport Coach",
  //   shortSummary: "Results-driven Physical Education professional with 5+ years of experience in sports management and multi-sport coaching.",
  //   image: "/images/coach-pallavi podhula.webp",
  //   expertise: ["Handball", "Basketball", "Tournament Management"],
  //   highlights: [
  //     "5+ years of sports coaching and physical education experience",
  //     "Managed tournaments with 300+ participants",
  //     "Coach for Telangana Junior National Women’s Team",
  //     "CBSE Tournament Manager for Handball, Basketball & Chess",
  //     "Produced state and national-level athletes",
  //     "Best Player of the South (2 Times) – Handball",
  //     "Bronze Medalist – Senior National Championship",
  //     "Gold Medal – Inter-College Championship",
  //     "Athlete at Sports Authority of India (SAI)",
  //     "Participant in Senior Asian Handball Camp"
  //   ],
  //   skills: ["Athlete Performance Development", "Tournament Management", "Sports Leadership", "Injury Prevention", "Multi-Sport Coaching", "Student Fitness Training"],
  //   about: "Pallavi Podhula is a highly accomplished multi-sport professional with an extensive competitive background. As a former national-level athlete and current coach for the Telangana Junior National Women's Team, she brings unmatched expertise in handball and tournament management to Zenithh Sports Arena.",
  //   experienceTimeline: [
  //     { year: "2018-Present", event: "Multi-Sport Coach and Tournament Manager" },
  //     { year: "2021", event: "Coach for Telangana Junior National Women's Team" },
  //     { year: "2019", event: "CBSE Tournament Manager for Handball and Basketball" }
  //   ],
  //   achievements: [
  //     "Bronze Medalist – Senior National Championship",
  //     "2-Time Best Player of the South – Handball",
  //     "Gold Medal – Inter-College Championship"
  //   ],
  //   specializations: ["Handball", "Basketball", "Chess", "Throwball", "Aerobics", "Fitness Training"],
  //   certifications: ["CPR Certified", "First Aid Certified", "National Sports Coaching Certification"],
  //   sportsManaged: ["Handball", "Basketball", "Chess", "Throwball", "Frisbee", "Aerobics"],
  //   ctaText: "Train with a nationally experienced coach and elevate your game to the next level."
  // },
  {
    id: "mounika-nagilla",
    name: "Nagilla Mounika",
    role: "Physical Education Teacher (PET) & Kabaddi Coach",
    shortSummary: "Dedicated Physical Education professional with experience in athlete training, kabaddi coaching, and athletics.",
    image: "/images/coach-nagilla-mounika-uniform.webp",
    imagePosition: "center top",
    expertise: ["Kabaddi", "Athletics", "Youth Development"],
    highlights: [
      "National-level Kabaddi participant",
      "South Zone University Games participant",
      "Best Player Award in Kabaddi Senior State Meet",
      "Experience as Physical Education Teacher",
      "Specialized training in athletics and swimming",
      "NCC-B Certified",
      "Strong focus on discipline and teamwork",
      "Skilled in youth sports development"
    ],
    skills: ["Kabaddi Coaching", "Athletics Training", "Swimming Training", "Basketball Coaching", "Volleyball Coaching"],
    about: "Nagilla Mounika is a passionate physical educator and national-level Kabaddi player. Her coaching focuses on building strength, confidence, and competitive spirit in young athletes through disciplined training programs and strategic gameplay.",
    achievements: [
      "Senior State Meet Best Player Award - Kabaddi",
      "National Level Participation - Kabaddi",
      "South Zone University Games - Athletics"
    ],
    specializations: ["Kabaddi", "Athletics", "Swimming", "Basketball", "Volleyball", "Gymnastics", "Cricket"],
    certifications: ["NCC-B Certificate", "Physical Education Teaching Diploma"],
    programs: ["Kabaddi Mastery Program", "Athletics & Speed Training", "Youth Fitness Fundamentals"],
    ctaText: "Build strength, confidence, and competitive spirit with expert sports coaching."
  }
];
