"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  ExternalLink,
  GraduationCap,
} from "lucide-react";

import {
  BagGadget,
  HeadphonesGadget,
  BookGadget,
  MonitorGadget,
  KeyboardGadget,
  PhoneGadget,
  MouseGadget
} from "@/components/Gadget";
import { CircuitWiring } from "@/components/CircuitWiring";
import IntroAnimation from "@/components/IntroAnimation";

// Centralized portfolio data
import { portfolio } from "@/data/portfolio";
import { getIcon } from "@/utils/icons";

export default function Home() {
  // Navigation / Active highlights
  const [hoveredGadget, setHoveredGadget] = useState<string | null>(null);
  const [booting, setBooting] = useState<boolean>(true);
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });

  // Intro animation states
  const [showIntro, setShowIntro] = useState<boolean>(false);
  const [introFinished, setIntroFinished] = useState<boolean>(false);

  // Visibility states for sections (starts invisible for boot sequence)
  const [visibleSections, setVisibleSections] = useState<Record<string, boolean>>({
    header: false,
    experience: false,
    hobbies: false,
    education: false,
    contact: false,
    projects: false,
    skills: false,
    research: false,
  });

  // Active pulses state for CircuitWiring
  const [activePulses, setActivePulses] = useState<Record<string, boolean>>({
    "profile-to-phone": false,
    "phone-to-contact": false,
    "bag-to-experience": false,
    "monitor-to-projects": false,
    "monitor-to-keyboard": false,
    "keyboard-to-research": false,
    "mouse-to-skills": false,
    "hobbies-to-headphones": false,
    "book-to-education": false,
  });

  // React Refs for layout nodes (anchors for circuit lines)
  const anchors = {
    profile: useRef<HTMLDivElement>(null),
    bag: useRef<HTMLDivElement>(null),
    headphones: useRef<HTMLDivElement>(null),
    book: useRef<HTMLDivElement>(null),
    monitor: useRef<HTMLDivElement>(null),
    keyboard: useRef<HTMLDivElement>(null),
    phone: useRef<HTMLDivElement>(null),
    mouse: useRef<HTMLDivElement>(null),
    experience: useRef<HTMLDivElement>(null),
    hobbies: useRef<HTMLDivElement>(null),
    education: useRef<HTMLDivElement>(null),
    contact: useRef<HTMLDivElement>(null),
    projects: useRef<HTMLDivElement>(null),
    skills: useRef<HTMLDivElement>(null),
    research: useRef<HTMLDivElement>(null),
  };

  // Check if first-time visitor on client mount
  useEffect(() => {
    const introSeen = localStorage.getItem("portfolio-intro-seen");
    if (!introSeen) {
      setShowIntro(true);
    } else {
      setIntroFinished(true);
    }
  }, []);

  const handleIntroComplete = () => {
    localStorage.setItem("portfolio-intro-seen", "true");
    setShowIntro(false);
    setIntroFinished(true);
  };

  // Coordinated Boot Sequence (deferred until intro finishes)
  const bootSequenceStarted = useRef(false);
  useEffect(() => {
    if (!introFinished) return;
    if (bootSequenceStarted.current) return;
    bootSequenceStarted.current = true;

    const runBootSequence = async () => {
      // 0. Initial silence: only gadgets, profile, and inactive wires visible.
      await delay(1200);

      // 1. Profile to Phone/Tablet pulse starts
      setPulse("profile-to-phone", true);
      await delay(1000);

      // 2. Pulse reaches Phone. Phone powers on. Pulse to Contact starts.
      setVisibleSections(prev => ({ ...prev, header: true }));
      setPulse("profile-to-phone", false);
      setPulse("phone-to-contact", true);
      await delay(1000);

      // 3. Contact section appears.
      setVisibleSections(prev => ({ ...prev, contact: true }));
      setPulse("phone-to-contact", false);
      await delay(800);

      // 4. Pulse starts from central hub to Bag -> Experience
      setPulse("bag-to-experience", true);
      await delay(1100);

      // 5. Bag powers on. Experience section appears.
      setVisibleSections(prev => ({ ...prev, experience: true }));
      setPulse("bag-to-experience", false);
      await delay(800);

      // 6. Pulse flows down from central hub: Monitor to Projects and Monitor to Headphones
      setPulse("monitor-to-projects", true);
      setPulse("monitor-to-headphones", true);
      await delay(1100);

      // 7. Monitor powers on. Projects appears.
      setVisibleSections(prev => ({ ...prev, projects: true }));
      setPulse("monitor-to-projects", false);
      await delay(400);

      // 8. Headphones power on. Hobbies pulse (from Headphones to Hobbies) starts.
      setPulse("monitor-to-headphones", false);
      setPulse("hobbies-to-headphones", true);
      await delay(1000);

      // 9. Hobbies section appears.
      setVisibleSections(prev => ({ ...prev, hobbies: true }));
      setPulse("hobbies-to-headphones", false);
      await delay(600);

      // 10. Pulse flows from Headphones down to Book, then to Education
      setPulse("headphones-to-book", true);
      await delay(800);
      setPulse("headphones-to-book", false);
      setPulse("book-to-education", true);
      await delay(1000);

      // 11. Book powers on. Education and Languages appear.
      setVisibleSections(prev => ({ ...prev, education: true }));
      setPulse("book-to-education", false);
      await delay(600);

      // 12. Monitor flows to Keyboard -> Research
      setPulse("monitor-to-keyboard", true);
      await delay(600);
      setPulse("monitor-to-keyboard", false);
      setPulse("keyboard-to-research", true);
      await delay(1000);

      // 13. Keyboard powers on. Research & Certifications appear.
      setVisibleSections(prev => ({ ...prev, research: true }));
      setPulse("keyboard-to-research", false);
      await delay(600);

      // 14. Keyboard flows to Mouse -> Skills
      setPulse("keyboard-to-mouse", true);
      await delay(600);
      setPulse("keyboard-to-mouse", false);
      setPulse("mouse-to-skills", true);
      await delay(1000);

      // 15. Mouse powers on. Software Skills appear.
      setVisibleSections(prev => ({ ...prev, skills: true }));
      setPulse("mouse-to-skills", false);
      
      // 16. Boot sequence complete
      setBooting(false);
    };

    runBootSequence();
  }, [introFinished]);

  // Track cursor position for the tiny orange glow
  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, []);

  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  const setPulse = (id: string, state: boolean) => {
    setActivePulses(prev => ({ ...prev, [id]: state }));
  };

  // Helper to flash pulse on gadget hover (post-boot)
  const triggerHoverPulse = (wireId: string) => {
    if (booting) return;
    setActivePulses(prev => ({ ...prev, [wireId]: true }));
  };

  const clearHoverPulse = (wireId: string) => {
    if (booting) return;
    setActivePulses(prev => ({ ...prev, [wireId]: false }));
  };

  // Animation variants for sections (scroll/boot)
  const sectionVariants = {
    hidden: { opacity: 0, y: 20, filter: "blur(6px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as any }
    }
  };

  return (
    <>
      {showIntro && <IntroAnimation onComplete={handleIntroComplete} />}
      <main className="min-h-screen bg-[#0E0E10] text-white relative blueprint-grid py-12 md:py-20 select-none overflow-x-hidden">
      {/* Tiny orange glow cursor follower */}
      <div
        className="fixed w-6 h-6 rounded-full bg-accent/25 pointer-events-none z-50 -translate-x-1/2 -translate-y-1/2 blur-[2px] mix-blend-screen hidden md:block border border-accent/30 transition-transform duration-100 ease-out"
        style={{ left: cursorPos.x, top: cursorPos.y }}
      />

      {/* Dynamic Wiring Layout (Only visible on Desktop/Tablet landscape) */}
      <div className="hidden lg:block">
        <CircuitWiring anchors={anchors} activePulses={activePulses} />
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-20">
        {/* Desktop Layout Grid (Preserves Blueprint composition exactly) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-4 items-stretch">
          
          {/* ================= LEFT COLUMN ================= */}
          <div className="col-span-1 lg:col-span-4 flex flex-col justify-between space-y-12 lg:space-y-0">
            
            {/* 1. EXPERIENCE AND ACHIEVEMENTS */}
            <motion.div
              ref={anchors.experience}
              initial="hidden"
              animate={visibleSections.experience ? "visible" : "hidden"}
              variants={sectionVariants}
              className={`transition-all duration-300 ${
                hoveredGadget === "bag" ? "scale-[1.01]" : ""
              }`}
            >
              <h2
                className={`text-2xl font-bold font-display uppercase tracking-widest mb-6 transition-colors duration-300 ${
                  hoveredGadget === "bag" ? "text-accent" : "text-accent"
                }`}
              >
                Experience & Achievements
              </h2>
              
              <div className="relative border-l border-white/10 pl-6 ml-4 space-y-6">
                {portfolio.experience.map((item, idx) => (
                  <div key={idx} className="relative group">
                    {/* Node Dot */}
                    <div
                      className={`absolute -left-[31px] top-1.5 w-4 h-4 rounded-full border-2 bg-[#0E0E10] transition-all duration-300 ${
                        hoveredGadget === "bag"
                          ? "border-accent scale-125 bg-accent/20 shadow-[0_0_8px_rgba(255,106,0,0.5)]"
                          : "border-white/30"
                      }`}
                    />
                    {/* Year Tag */}
                    <div
                      className={`inline-block px-2.5 py-0.5 rounded text-xs font-bold font-display mb-1.5 border transition-all duration-300 ${
                        hoveredGadget === "bag"
                          ? "bg-accent/15 border-accent text-accent"
                          : "bg-white/5 border-white/10 text-white/70"
                      }`}
                    >
                      {item.year}
                    </div>
                    {/* Text */}
                    <p className="text-sm font-sans leading-relaxed text-white/80 group-hover:text-white transition-colors duration-300">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Middle connecting area for headphones/hobbies (desktop layout element helper) */}
            <div className="hidden lg:flex justify-end lg:pr-1 lg:mr-[-16px] items-center h-28">
              <HeadphonesGadget
                id="headphones"
                isActive={visibleSections.hobbies}
                isHovered={hoveredGadget === "headphones"}
                onHoverStart={() => {
                  setHoveredGadget("headphones");
                  triggerHoverPulse("hobbies-to-headphones");
                }}
                onHoverEnd={() => {
                  setHoveredGadget(null);
                  clearHoverPulse("hobbies-to-headphones");
                }}
                anchorRef={anchors.headphones}
              />
            </div>

            {/* 2. HOBBIES */}
            <motion.div
              ref={anchors.hobbies}
              initial="hidden"
              animate={visibleSections.hobbies ? "visible" : "hidden"}
              variants={sectionVariants}
              className={`transition-all duration-300 ${
                hoveredGadget === "headphones" ? "scale-[1.01]" : ""
              }`}
            >
              <h2 className="text-2xl font-bold font-display uppercase tracking-widest mb-6 text-accent">
                Hobbies
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {portfolio.hobbies.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center space-x-3 group cursor-pointer py-1"
                  >
                    <motion.div
                      animate={
                        hoveredGadget === "headphones"
                          ? { scale: [1, 1.15, 1], rotate: [0, 5, -5, 0] }
                          : {}
                      }
                      transition={{ duration: 0.6, delay: idx * 0.05 }}
                      className={`p-2 rounded border border-white/5 bg-white/5 transition-all duration-300 ${
                        hoveredGadget === "headphones"
                          ? "border-accent/40 text-accent bg-accent/5 scale-110 shadow-[0_0_8px_rgba(255,106,0,0.2)]"
                          : "group-hover:border-accent/30 group-hover:text-accent group-hover:bg-accent/5"
                      }`}
                    >
                      {getIcon(item.icon, 16)}
                    </motion.div>
                    <span className="text-sm font-sans text-white/80 group-hover:text-white transition-colors duration-300">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Middle connecting area for book/education (desktop layout element helper) */}
            <div className="hidden lg:flex justify-end lg:pr-1 lg:mr-[-16px] items-center h-28">
              <BookGadget
                id="book"
                isActive={visibleSections.education}
                isHovered={hoveredGadget === "book"}
                onHoverStart={() => {
                  setHoveredGadget("book");
                  triggerHoverPulse("book-to-education");
                }}
                onHoverEnd={() => {
                  setHoveredGadget(null);
                  clearHoverPulse("book-to-education");
                }}
                anchorRef={anchors.book}
              />
            </div>

            {/* 3. EDUCATION & LANGUAGES */}
            <motion.div
              ref={anchors.education}
              initial="hidden"
              animate={visibleSections.education ? "visible" : "hidden"}
              variants={sectionVariants}
              className={`transition-all duration-300 ${
                hoveredGadget === "book" ? "scale-[1.01]" : ""
              }`}
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                {/* Education */}
                <div className="md:col-span-8">
                  <div className="flex items-center space-x-3 mb-6">
                    <GraduationCap className="text-accent" size={24} />
                    <h2 className="text-2xl font-bold font-display uppercase tracking-widest text-accent">
                      Education
                    </h2>
                  </div>
                  <div className="space-y-6 pl-2 border-l border-white/5">
                    {portfolio.education.map((item, idx) => (
                      <div key={idx} className="group">
                        <div
                          className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold font-display mb-1.5 border transition-all duration-300 ${
                            hoveredGadget === "book"
                              ? "bg-accent/15 border-accent text-accent"
                              : "bg-white/5 border-white/10 text-white/50"
                          }`}
                        >
                          {item.year}
                        </div>
                        <h4 className="text-xs font-bold text-white/95 leading-tight mb-0.5">
                          {item.school}
                        </h4>
                        <p className="text-[11px] text-white/60 group-hover:text-white/80 transition-colors duration-300">
                          {item.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Languages */}
                <div className="md:col-span-4">
                  <h2 className="text-xl font-bold font-display uppercase tracking-widest mb-6 text-accent">
                    Languages
                  </h2>
                  <div className="space-y-4">
                    {portfolio.languages.map((item, idx) => (
                      <div key={idx} className="flex items-center space-x-3 group">
                        <div className="w-8 h-8 rounded-full overflow-hidden border border-white/10 flex items-center justify-center shrink-0">
                          {item.code === "TH" ? (
                            /* Thai Flag SVG */
                            <svg viewBox="0 0 9 6" className="w-full h-full object-cover">
                              <rect fill="#A51931" width="9" height="6" />
                              <rect fill="#F4F5F8" y="1" width="9" height="4" />
                              <rect fill="#2D2A4A" y="2" width="9" height="2" />
                            </svg>
                          ) : (
                            /* UK Flag SVG */
                            <svg viewBox="0 0 50 30" className="w-full h-full object-cover">
                              <rect fill="#012169" width="50" height="30" />
                              <path d="M0 0 L50 30 M50 0 L0 30" stroke="#FFF" strokeWidth="6" />
                              <path d="M0 0 L50 30 M50 0 L0 30" stroke="#C8102E" strokeWidth="4" />
                              <path d="M25 0 V30 M0 15 H50" stroke="#FFF" strokeWidth="10" />
                              <path d="M25 0 V30 M0 15 H50" stroke="#C8102E" strokeWidth="6" />
                            </svg>
                          )}
                        </div>
                        <div>
                          <span className="text-sm font-bold block text-white/85">{item.name}</span>
                          <span className="text-[10px] text-white/50 group-hover:text-accent transition-colors duration-300">{item.level}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

          </div>

          {/* ================= CENTER COLUMN (CENTRAL HUB) ================= */}
          <div className="col-span-1 lg:col-span-4 flex flex-col items-center justify-between space-y-12 lg:space-y-0">
            
            {/* Header Identity */}
            <div className="flex flex-col items-center text-center">
              <h1 className="text-5xl font-black font-display tracking-[0.2em] text-white mb-2 select-text uppercase">
                {portfolio.profile.name}
              </h1>
              <div className="flex items-center justify-center space-x-2 text-xs font-semibold font-display tracking-widest text-white/60 mb-8">
                {portfolio.profile.titles.map((title, idx) => (
                  <React.Fragment key={idx}>
                    {idx > 0 && <span className="text-accent">|</span>}
                    <span>{title}</span>
                  </React.Fragment>
                ))}
              </div>

              {/* Central Circular Profile Hub */}
              <motion.div
                ref={anchors.profile}
                className="relative group mb-6 cursor-pointer"
                animate={{
                  y: [0, -4, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                {/* Expanding pulse rings every few seconds */}
                <motion.div
                  className="absolute inset-0 rounded-full border border-accent/50 pointer-events-none"
                  animate={{
                    scale: [1, 1.35, 1],
                    opacity: [0, 0.35, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatDelay: 5,
                    ease: "easeOut",
                  }}
                />

                {/* Radar tick ticks circles */}
                <div className="absolute inset-0 -m-3 rounded-full border border-dashed border-white/10 animate-spin" style={{ animationDuration: "40s" }} />
                <div className="absolute inset-0 -m-1.5 rounded-full border border-white/5" />

                {/* Profile circular frame */}
                <div className="w-40 h-40 rounded-full border-2 border-white/20 p-1 relative flex items-center justify-center bg-[#0E0E10] group-hover:border-accent transition-colors duration-500">
                  <div className="absolute inset-2 rounded-full overflow-hidden border border-white/10 relative">
                    {/* Silhouette Profile Blueprint SVG */}
                    <svg viewBox="0 0 100 100" fill="none" className="w-full h-full bg-[#111115]">
                      {/* Warm orange back-glow */}
                      <circle cx="50" cy="55" r="32" fill="url(#orangeGlow)" opacity="0.35" />
                      
                      {/* Circuit elements behind silhouette */}
                      <path d="M 15 25 H 45 V 45" stroke="#FF6A00" strokeWidth="0.5" strokeDasharray="2 2" opacity="0.4" />
                      <path d="M 85 30 V 55 H 65" stroke="#FF6A00" strokeWidth="0.5" strokeDasharray="2 2" opacity="0.4" />

                      {/* Schematic Woman Silhouette */}
                      <path
                        d="M 50 25 C 38 25 32 32 30 45 C 29 48 30 50 32 50 C 35 50 38 46 39 42 C 40 38 44 32 50 32 C 56 32 60 38 61 42 C 62 46 65 50 68 50 C 70 50 71 48 70 45 C 68 32 62 25 50 25 Z"
                        fill="#0E0E10"
                        stroke="#FFFFFF"
                        strokeWidth="1.5"
                      />
                      {/* Body base */}
                      <path
                        d="M 22 88 C 22 72 32 60 50 60 C 68 60 78 72 78 88"
                        fill="#0E0E10"
                        stroke="#FFFFFF"
                        strokeWidth="1.5"
                      />
                      {/* Stylized hair strands */}
                      <path
                        d="M 33 42 C 24 55 25 78 28 88 M 67 42 C 76 55 75 78 72 88"
                        stroke="#FFFFFF"
                        strokeWidth="1.2"
                      />
                      {/* Technical nodes overlay */}
                      <circle cx="50" cy="25" r="2" fill="#FF6A00" />
                      <circle cx="30" cy="45" r="2" fill="#FF6A00" />
                      <circle cx="70" cy="45" r="2" fill="#FF6A00" />
                      <line x1="50" y1="25" x2="50" y2="15" stroke="#FF6A00" strokeWidth="0.8" />
                      <circle cx="50" cy="15" r="1.5" fill="#FF6A00" />

                      {/* Definitions */}
                      <defs>
                        <radialGradient id="orangeGlow" cx="50%" cy="50%" r="50%">
                          <stop offset="0%" stopColor="#FF6A00" />
                          <stop offset="100%" stopColor="#FF6A00" stopOpacity="0" />
                        </radialGradient>
                      </defs>
                    </svg>

                    {/* Glowing pulse ring */}
                    <div className="absolute inset-0 border border-accent/0 group-hover:border-accent/40 rounded-full transition-all duration-500 scale-105 group-hover:scale-100" />
                  </div>
                  
                  {/* Floating status display */}
                  <div className="absolute -bottom-2 px-3 py-1 bg-[#0E0E10] border border-white/10 rounded-full text-[9px] font-mono tracking-widest text-accent uppercase flex items-center space-x-1.5 shadow-md">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent animate-ping" />
                    <span>{portfolio.profile.status}</span>
                  </div>
                </div>
              </motion.div>

              {/* Introduction Quote */}
              <div className="max-w-xs mb-8 transition-opacity duration-700">
                <div className="flex items-start justify-center space-x-1 text-white/80 italic text-sm font-sans font-medium">
                  <span className="text-accent text-lg font-bold font-display leading-none">“</span>
                  <span className="leading-snug select-text">{portfolio.profile.quote}</span>
                  <span className="text-accent text-lg font-bold font-display leading-none">”</span>
                </div>
              </div>
            </div>

            {/* Central Gadget Cluster */}
            <div className="flex flex-col items-center justify-center space-y-4 lg:space-y-3 mt-2">
              {/* Bag Gadget Container */}
              <div className="flex flex-col items-center">
                <BagGadget
                  id="bag"
                  isActive={visibleSections.experience}
                  isHovered={hoveredGadget === "bag"}
                  onHoverStart={() => {
                    setHoveredGadget("bag");
                    triggerHoverPulse("bag-to-experience");
                  }}
                  onHoverEnd={() => {
                    setHoveredGadget(null);
                    clearHoverPulse("bag-to-experience");
                  }}
                  anchorRef={anchors.bag}
                />
              </div>

              {/* Monitor Gadget Container */}
              <div className="flex flex-col items-center">
                <MonitorGadget
                  id="monitor"
                  isActive={visibleSections.projects}
                  isHovered={hoveredGadget === "monitor"}
                  onHoverStart={() => {
                    setHoveredGadget("monitor");
                    triggerHoverPulse("monitor-to-projects");
                  }}
                  onHoverEnd={() => {
                    setHoveredGadget(null);
                    clearHoverPulse("monitor-to-projects");
                  }}
                  anchorRef={anchors.monitor}
                />
              </div>

              {/* Keyboard Gadget Container */}
              <div className="flex flex-col items-center">
                <KeyboardGadget
                  id="keyboard"
                  isActive={visibleSections.research}
                  isHovered={hoveredGadget === "keyboard"}
                  onHoverStart={() => {
                    setHoveredGadget("keyboard");
                    triggerHoverPulse("keyboard-to-research");
                  }}
                  onHoverEnd={() => {
                    setHoveredGadget(null);
                    clearHoverPulse("keyboard-to-research");
                  }}
                  anchorRef={anchors.keyboard}
                />
              </div>
            </div>

            {/* Bottom spacer for grid balance */}
            <div className="h-6" />

          </div>

          {/* ================= RIGHT COLUMN ================= */}
          <div className="col-span-1 lg:col-span-4 flex flex-col justify-between space-y-12 lg:space-y-0">
            
            {/* 1. CONTACT */}
            <motion.div
              ref={anchors.contact}
              initial="hidden"
              animate={visibleSections.contact ? "visible" : "hidden"}
              variants={sectionVariants}
              className={`transition-all duration-300 ${
                hoveredGadget === "phone" ? "scale-[1.01]" : ""
              }`}
            >
              <h2 className="text-2xl font-bold font-display uppercase tracking-widest mb-6 text-accent">
                Contact
              </h2>
              <div className="space-y-4">
                {portfolio.contact.map((item, idx) => {
                  const content = (
                    <div className="flex items-center space-x-3 group py-1 cursor-pointer">
                      <motion.div
                        animate={
                          hoveredGadget === "phone"
                            ? { scale: [1, 1.15, 1] }
                            : {}
                        }
                        transition={{ duration: 0.4, delay: idx * 0.05 }}
                        className={`p-2 rounded border border-white/5 bg-white/5 transition-all duration-300 ${
                          hoveredGadget === "phone"
                            ? "border-accent/40 text-accent bg-accent/5 scale-110 shadow-[0_0_8px_rgba(255,106,0,0.2)]"
                            : "group-hover:border-accent/30 group-hover:text-accent group-hover:bg-accent/5"
                        }`}
                      >
                        {getIcon(item.icon, 16)}
                      </motion.div>
                      <span className="text-sm font-sans text-white/80 group-hover:text-white transition-colors duration-300 select-text break-all leading-normal">
                        {item.text}
                      </span>
                    </div>
                  );
                  return item.href ? (
                    <a href={item.href} target="_blank" rel="noopener noreferrer" key={idx}>
                      {content}
                    </a>
                  ) : (
                    <div key={idx}>{content}</div>
                  );
                })}
              </div>
            </motion.div>

            {/* Middle connecting area for phone/contact (desktop layout element helper) */}
            <div className="hidden lg:flex justify-start lg:pl-1 lg:ml-[-16px] items-center h-28">
              <PhoneGadget
                id="phone"
                isActive={visibleSections.contact}
                isHovered={hoveredGadget === "phone"}
                onHoverStart={() => {
                  setHoveredGadget("phone");
                  triggerHoverPulse("phone-to-contact");
                }}
                onHoverEnd={() => {
                  setHoveredGadget(null);
                  clearHoverPulse("phone-to-contact");
                }}
                anchorRef={anchors.phone}
              />
            </div>

            {/* 2. PROJECTS */}
            <motion.div
              ref={anchors.projects}
              initial="hidden"
              animate={visibleSections.projects ? "visible" : "hidden"}
              variants={sectionVariants}
              className={`transition-all duration-300 ${
                hoveredGadget === "monitor" ? "scale-[1.01]" : ""
              }`}
            >
              <h2 className="text-2xl font-bold font-display uppercase tracking-widest mb-6 text-accent">
                Projects
              </h2>
              <div className="space-y-4 pl-2 border-l border-white/5">
                {portfolio.projects.map((project, idx) => (
                  <div
                    key={idx}
                    className="group flex items-start justify-between p-2 rounded hover:bg-white/5 transition-all duration-300"
                  >
                    <div className="pr-4">
                      <div className="flex items-center space-x-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                        <h4 className="text-sm font-bold text-white/95 group-hover:text-accent transition-colors duration-300 select-text">
                          {project.title}
                        </h4>
                      </div>
                      <p className="text-[11px] text-white/60 group-hover:text-white/80 pl-3 leading-relaxed">
                        {project.desc}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2 shrink-0 pt-0.5 opacity-40 group-hover:opacity-100 transition-opacity duration-300">
                      <a href={project.link} target="_blank" rel="noopener noreferrer" className="hover:text-accent">
                        {getIcon("GithubIcon", 13)}
                      </a>
                      <a href={project.link} target="_blank" rel="noopener noreferrer" className="hover:text-accent">
                        <ExternalLink size={13} />
                      </a>
                    </div>
                  </div>
                ))}
                <div className="text-xs text-white/40 italic pl-3 pt-1">
                  - and more...
                </div>
              </div>
            </motion.div>

            {/* Middle connecting area for mouse/skills (desktop layout element helper) */}
            <div className="hidden lg:flex justify-start lg:pl-1 lg:ml-[-16px] items-center h-28">
              <MouseGadget
                id="mouse"
                isActive={visibleSections.skills}
                isHovered={hoveredGadget === "mouse"}
                onHoverStart={() => {
                  setHoveredGadget("mouse");
                  triggerHoverPulse("mouse-to-skills");
                }}
                onHoverEnd={() => {
                  setHoveredGadget(null);
                  clearHoverPulse("mouse-to-skills");
                }}
                anchorRef={anchors.mouse}
              />
            </div>

            {/* 3. SOFTWARE SKILLS */}
            <motion.div
              ref={anchors.skills}
              initial="hidden"
              animate={visibleSections.skills ? "visible" : "hidden"}
              variants={sectionVariants}
              className={`transition-all duration-300 ${
                hoveredGadget === "mouse" ? "scale-[1.01]" : ""
              }`}
            >
              <h2 className="text-2xl font-bold font-display uppercase tracking-widest mb-6 text-accent">
                Software Skills
              </h2>
              
              <div className="space-y-4">
                {/* Designers circles */}
                <div className="flex flex-wrap gap-3">
                  {portfolio.skills.designers.map((skill, idx) => (
                    <div
                      key={idx}
                      className="group flex items-center space-x-2 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full hover:border-accent/40 hover:bg-accent/5 transition-all duration-300"
                    >
                      <div className="w-6 h-6 rounded-full bg-[#0E0E10] border border-accent flex items-center justify-center text-[10px] font-bold text-accent font-display shrink-0">
                        {skill.abbr}
                      </div>
                      <span className="text-[11px] font-sans font-medium text-white/80 group-hover:text-white transition-colors duration-300">
                        {skill.full}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Developer skills line */}
                <div className="border border-white/5 rounded p-3 bg-white/5 relative overflow-hidden group">
                  <div className="absolute top-0 left-0 w-0.5 h-full bg-accent opacity-50 group-hover:h-full transition-all duration-300" />
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-[10px] font-bold font-mono text-accent">Code:</span>
                  </div>
                  <div className="flex flex-wrap gap-x-2 gap-y-1.5">
                    {portfolio.skills.developers.map((lang, idx) => (
                      <span
                        key={idx}
                        className="text-xs font-mono px-2 py-0.5 bg-[#0E0E10] rounded text-white/70 hover:text-accent transition-colors duration-300 border border-white/5 hover:border-accent/20 cursor-default"
                      >
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>

        {/* ================= BOTTOM ROW (RESEARCH & CERTIFICATIONS) ================= */}
        <div className="mt-16 md:mt-24 max-w-4xl mx-auto">
          <motion.div
            ref={anchors.research}
            initial="hidden"
            animate={visibleSections.research ? "visible" : "hidden"}
            variants={sectionVariants}
            className={`transition-all duration-300 ${
              hoveredGadget === "keyboard" ? "scale-[1.01]" : ""
            }`}
          >
            <h2 className="text-2xl font-bold font-display uppercase tracking-widest text-center mb-8 text-accent">
              Research & Certifications
            </h2>

            {/* Technical grid blueprint boxes */}
            <div className="border border-white/10 rounded overflow-hidden bg-white/5 grid grid-cols-1 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-white/10 text-center">
              {portfolio.research.map((item, idx) => (
                <div
                  key={idx}
                  className="p-6 flex flex-col items-center justify-center group hover:bg-[#0E0E10]/40 transition-colors duration-300"
                >
                  <motion.div
                    animate={
                      hoveredGadget === "keyboard"
                        ? { scale: [1, 1.15, 1], y: [0, -2, 0] }
                        : {}
                    }
                    transition={{ duration: 0.4, delay: idx * 0.08 }}
                    className={`p-3 rounded border border-white/5 bg-white/5 mb-3 transition-all duration-300 ${
                      hoveredGadget === "keyboard"
                        ? "border-accent/40 text-accent bg-accent/5 scale-110 shadow-[0_0_8px_rgba(255,106,0,0.2)]"
                        : "group-hover:border-accent/30 group-hover:text-accent group-hover:bg-accent/5"
                    }`}
                  >
                    {getIcon(item.icon, 20)}
                  </motion.div>
                  <h4 className="text-xs font-bold uppercase tracking-widest mb-1 text-white/90 group-hover:text-white transition-colors duration-300">
                    {item.title}
                  </h4>
                  <p className="text-[10px] text-white/50">{item.text}</p>
                </div>
              ))}
            </div>

            {/* Bottom Row inside Grid: RAG, DevOps, LLM, System Design */}
            <div className="border-x border-b border-white/10 rounded-b bg-white/5 grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-white/10 text-center">
              {portfolio.certifications.map((item, idx) => (
                <div
                  key={idx}
                  className="p-5 flex flex-col items-center justify-center group hover:bg-[#0E0E10]/40 transition-colors duration-300"
                >
                  <motion.div
                    animate={
                      hoveredGadget === "keyboard"
                        ? { scale: [1, 1.15, 1] }
                        : {}
                    }
                    transition={{ duration: 0.4, delay: (idx + 4) * 0.08 }}
                    className={`p-2 rounded border border-white/5 bg-[#0E0E10] mb-2 transition-all duration-300 ${
                      hoveredGadget === "keyboard"
                        ? "border-accent/40 text-accent bg-accent/5 scale-110 shadow-[0_0_8px_rgba(255,106,0,0.2)]"
                        : "group-hover:border-accent/30 group-hover:text-accent group-hover:bg-accent/5"
                    }`}
                  >
                    {getIcon(item.icon, 16)}
                  </motion.div>
                  <h4 className="text-[10px] font-bold uppercase tracking-widest text-white/80 group-hover:text-white transition-colors duration-300">
                    {item.title}
                  </h4>
                  <p className="text-[9px] text-white/40">{item.text}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

      </div>
    </main>
    </>
  );
}
