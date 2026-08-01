"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, GraduationCap } from "lucide-react";

import {
  BagGadget,
  HeadphonesGadget,
  BookGadget,
  MonitorGadget,
  KeyboardGadget,
  PhoneGadget,
  MouseGadget
} from "@/components/Gadget";

// Centralized portfolio data
import { portfolio } from "@/data/portfolio";
import { getIcon } from "@/utils/icons";

export default function MobilePortfolio() {
  const [activeSection, setActiveSection] = useState<string | null>("experience");
  const contentRef = useRef<HTMLDivElement>(null);

  const handleGadgetTap = (section: string) => {
    if (activeSection === section) {
      setActiveSection(null);
    } else {
      setActiveSection(section);
      // Smooth scroll to content panel after it finishes mounting/sliding
      setTimeout(() => {
        contentRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 150);
    }
  };

  const wires = [
    { id: "bag", pathD: "M 160 150 L 100 90 V 60", isActive: activeSection === "experience" },
    { id: "book", pathD: "M 160 150 L 220 90 V 60", isActive: activeSection === "education" },
    { id: "headphones", pathD: "M 160 150 H 50", isActive: activeSection === "hobbies" },
    { id: "phone", pathD: "M 160 150 H 270", isActive: activeSection === "contact" },
    { id: "mouse", pathD: "M 160 150 L 100 210 V 240", isActive: activeSection === "skills" },
    { id: "keyboard", pathD: "M 160 150 L 220 210 V 240", isActive: activeSection === "achievements" },
  ];

  const renderSectionContent = (section: string) => {
    switch (section) {
      case "experience":
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-bold font-display uppercase tracking-widest text-accent">
              Experience & Achievements
            </h2>
            <div className="relative border-l border-white/10 pl-6 ml-2 space-y-6">
              {portfolio.experience.map((item, idx) => (
                <div key={idx} className="relative">
                  <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full border-2 border-accent bg-accent/20 shadow-[0_0_8px_rgba(255,106,0,0.5)]" />
                  <div className="inline-block px-2.5 py-0.5 rounded text-xs font-bold font-display mb-1.5 border bg-accent/15 border-accent text-accent">
                    {item.year}
                  </div>
                  <p className="text-sm font-sans leading-relaxed text-white/80">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        );
      case "hobbies":
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-bold font-display uppercase tracking-widest text-accent">
              Hobbies
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {portfolio.hobbies.map((item, idx) => (
                <div key={idx} className="flex items-center space-x-3 py-1">
                  <div className="p-2 rounded border border-accent/40 text-accent bg-accent/5 scale-110 shadow-[0_0_8px_rgba(255,106,0,0.2)]">
                    {getIcon(item.icon, 16)}
                  </div>
                  <span className="text-sm font-sans text-white/80">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        );
      case "education":
        return (
          <div className="space-y-6">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <GraduationCap className="text-accent" size={20} />
                <h2 className="text-xl font-bold font-display uppercase tracking-widest text-accent">
                  Education
                </h2>
              </div>
              <div className="space-y-6 pl-2 border-l border-white/5">
                {portfolio.education.map((item, idx) => (
                  <div key={idx}>
                    <div className="inline-block px-2 py-0.5 rounded text-[10px] font-bold font-display mb-1.5 border bg-accent/15 border-accent text-accent">
                      {item.year}
                    </div>
                    <h4 className="text-xs font-bold text-white/95 leading-tight mb-0.5">
                      {item.school}
                    </h4>
                    <p className="text-[11px] text-white/60">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-lg font-bold font-display uppercase tracking-widest mb-4 text-accent">
                Languages
              </h2>
              <div className="space-y-4">
                {portfolio.languages.map((item, idx) => (
                  <div key={idx} className="flex items-center space-x-3">
                    <div>
                      <span className="text-sm font-bold block text-white/85">{item.name}</span>
                      {item.level && (
                        <span className="text-[10px] text-accent font-semibold">{item.level}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      case "projects":
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-bold font-display uppercase tracking-widest text-accent">
              Projects
            </h2>
            <div className="space-y-4 pl-2 border-l border-white/5">
              {portfolio.projects.map((project, idx) => (
                <div
                  key={idx}
                  className="flex items-start justify-between p-3 rounded bg-white/5 border border-white/5"
                >
                  <div className="pr-4">
                    <div className="flex items-center space-x-1.5 mb-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                      <h4 className="text-sm font-bold text-white select-text">
                        {project.title}
                      </h4>
                    </div>
                    <p className="text-[11px] text-white/70 pl-3 leading-relaxed">
                      {project.desc}
                    </p>
                  </div>
                  <div className="flex items-center space-x-3 shrink-0 pt-0.5">
                    {project.githubLink && (
                      <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="text-accent hover:text-white">
                        {getIcon("GithubIcon", 15)}
                      </a>
                    )}
                    {project.liveLink && (
                      <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="text-accent hover:text-white">
                        <ExternalLink size={15} />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case "contact":
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-bold font-display uppercase tracking-widest text-accent">
              Contact
            </h2>
            <div className="space-y-4">
              {portfolio.contact.map((item, idx) => {
                const content = (
                  <div className="flex items-center space-x-3 py-1 cursor-pointer">
                    <div className="p-2 rounded border border-accent/40 text-accent bg-accent/5 scale-110 shadow-[0_0_8px_rgba(255,106,0,0.2)]">
                      {getIcon(item.icon, 16)}
                    </div>
                    <span className="text-sm font-sans text-white/80 select-text break-all leading-normal">
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
          </div>
        );
      case "skills":
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-bold font-display uppercase tracking-widest text-accent">
              Software Skills
            </h2>
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2.5">
                {portfolio.skills.designers.map((skill, idx) => (
                  <div
                    key={idx}
                    className="flex items-center space-x-2 bg-accent/5 border border-accent/30 px-3 py-1.5 rounded-full"
                  >
                    <div className="w-6 h-6 rounded-full bg-[#0E0E10] border border-accent flex items-center justify-center text-[10px] font-bold text-accent font-display shrink-0">
                      {skill.abbr}
                    </div>
                    <span className="text-[11px] font-sans font-medium text-white/90">
                      {skill.full}
                    </span>
                  </div>
                ))}
              </div>
              <div className="border border-white/5 rounded p-3 bg-white/5 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-0.5 h-full bg-accent opacity-50" />
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-[10px] font-bold font-mono text-accent">Code:</span>
                </div>
                <div className="flex flex-wrap gap-x-2 gap-y-1.5">
                  {portfolio.skills.developers.map((lang, idx) => (
                    <span
                      key={idx}
                      className="text-xs font-mono px-2 py-0.5 bg-[#0E0E10] rounded text-accent border border-accent/20"
                    >
                      {lang}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      case "achievements":
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold font-display uppercase tracking-widest mb-4 text-accent">
                Achievements & Recognition
              </h2>
              <div className="border border-white/10 rounded overflow-hidden bg-white/5 grid grid-cols-2 divide-x divide-y divide-white/10 text-center">
                {portfolio.achievements.map((item, idx) => (
                  <div key={idx} className="p-4 flex flex-col items-center justify-center">
                    <div className="p-2 rounded border border-accent/40 text-accent bg-accent/5 scale-110 shadow-[0_0_8px_rgba(255,106,0,0.2)] mb-2">
                      {getIcon(item.icon, 16)}
                    </div>
                    <h4 className="text-[10px] font-bold uppercase tracking-widest mb-1 text-white/90">
                      {item.title}
                    </h4>
                    <p className="text-[9px] text-white/50">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="border border-white/10 rounded bg-white/5 grid grid-cols-2 divide-x divide-y divide-white/10 text-center">
                {portfolio.recognition.map((item, idx) => (
                  <div key={idx} className="p-4 flex flex-col items-center justify-center">
                    <div className="p-2 rounded border border-accent/40 text-accent bg-accent/5 scale-110 shadow-[0_0_8px_rgba(255,106,0,0.2)] mb-2">
                      {getIcon(item.icon, 14)}
                    </div>
                    <h4 className="text-[9px] font-bold uppercase tracking-widest text-white/80">
                      {item.title}
                    </h4>
                    <p className="text-[8px] text-white/40">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <main className="min-h-screen bg-[#0E0E10] text-white relative blueprint-grid py-8 px-4 select-none overflow-x-hidden">
      
      {/* Header Identity */}
      <div className="flex flex-col items-center text-center px-4 mb-6">
        {/* Circular Profile Hub */}
        <div className="relative group mb-4">
          <div className="absolute inset-0 -m-1.5 rounded-full border border-dashed border-white/10 animate-spin" style={{ animationDuration: "40s" }} />
          <div className="w-24 h-24 rounded-full border-2 border-white/20 p-1 relative flex items-center justify-center bg-[#0E0E10]">
            <div className="absolute inset-1 rounded-full overflow-hidden border border-white/10 relative">
              <svg viewBox="0 0 100 100" fill="none" className="w-full h-full bg-[#111115]">
                <circle cx="50" cy="55" r="32" fill="url(#orangeGlowMobile)" opacity="0.35" />
                <path d="M 15 25 H 45 V 45" stroke="#FF6A00" strokeWidth="0.5" strokeDasharray="2 2" opacity="0.4" />
                <path d="M 85 30 V 55 H 65" stroke="#FF6A00" strokeWidth="0.5" strokeDasharray="2 2" opacity="0.4" />
                <path
                  d="M 50 25 C 38 25 32 32 30 45 C 29 48 30 50 32 50 C 35 50 38 46 39 42 C 40 38 44 32 50 32 C 56 32 60 38 61 42 C 62 46 65 50 68 50 C 70 50 71 48 70 45 C 68 32 62 25 50 25 Z"
                  fill="#0E0E10"
                  stroke="#FFFFFF"
                  strokeWidth="1.5"
                />
                <path
                  d="M 22 88 C 22 72 32 60 50 60 C 68 60 78 72 78 88"
                  fill="#0E0E10"
                  stroke="#FFFFFF"
                  strokeWidth="1.5"
                />
                <path
                  d="M 33 42 C 24 55 25 78 28 88 M 67 42 C 76 55 75 78 72 88"
                  stroke="#FFFFFF"
                  strokeWidth="1.2"
                />
                <circle cx="50" cy="25" r="2" fill="#FF6A00" />
                <circle cx="30" cy="45" r="2" fill="#FF6A00" />
                <circle cx="70" cy="45" r="2" fill="#FF6A00" />
                <line x1="50" y1="25" x2="50" y2="15" stroke="#FF6A00" strokeWidth="0.8" />
                <circle cx="50" cy="15" r="1.5" fill="#FF6A00" />
                <defs>
                  <radialGradient id="orangeGlowMobile" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#FF6A00" />
                    <stop offset="100%" stopColor="#FF6A00" stopOpacity="0" />
                  </radialGradient>
                </defs>
              </svg>
            </div>
          </div>
        </div>

        <h1 className="text-3xl font-black font-display tracking-[0.2em] text-white mb-1 uppercase">
          {portfolio.profile.name}
        </h1>
        <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-[10px] font-semibold font-display tracking-widest text-white/60 mb-3">
          {portfolio.profile.titles.map((title, idx) => (
            <React.Fragment key={idx}>
              {idx > 0 && <span className="text-accent">|</span>}
              <span>{title}</span>
            </React.Fragment>
          ))}
        </div>
        <div className="flex items-start justify-center space-x-1 text-white/80 italic text-xs font-sans font-medium max-w-xs">
          <span className="text-accent text-md font-bold font-display leading-none">“</span>
          <span className="leading-snug select-text">{portfolio.profile.quote}</span>
          <span className="text-accent text-md font-bold font-display leading-none">”</span>
        </div>
      </div>

      {/* Interactive Gadget Cluster */}
      <div className="w-full flex justify-center py-4">
        <div className="relative w-[320px] h-[300px]">
          {/* SVG wiring behind gadgets */}
          <svg className="absolute inset-0 w-full h-full z-0 pointer-events-none" viewBox="0 0 320 300">
            {/* Background static lines */}
            {wires.map(wire => (
              <path
                key={`bg-${wire.id}`}
                d={wire.pathD}
                stroke="#ffffff"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity="0.1"
              />
            ))}
            
            {/* Active glowing path lines */}
            {wires.map(wire => (
              <g key={`active-${wire.id}`}>
                <motion.path
                  d={wire.pathD}
                  stroke="#FF6A00"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  opacity={wire.isActive ? 0.8 : 0}
                  animate={{ opacity: wire.isActive ? 0.8 : 0 }}
                  transition={{ duration: 0.3 }}
                />
                <motion.path
                  d={wire.pathD}
                  stroke="#FF6A00"
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  opacity={wire.isActive ? 0.25 : 0}
                  className="blur-[4px]"
                  animate={{ opacity: wire.isActive ? 0.25 : 0 }}
                  transition={{ duration: 0.3 }}
                />
                {wire.isActive && <PulseParticle pathD={wire.pathD} />}
              </g>
            ))}

            {/* Monitor glowing circle */}
            {activeSection === "projects" && (
              <>
                <motion.circle
                  cx="160"
                  cy="150"
                  r="32"
                  stroke="#FF6A00"
                  strokeWidth="2"
                  fill="none"
                  opacity="0.8"
                  animate={{ scale: [1, 1.15, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                />
                <circle
                  cx="160"
                  cy="150"
                  r="32"
                  stroke="#FF6A00"
                  strokeWidth="5"
                  fill="none"
                  opacity="0.25"
                  className="blur-[3px]"
                />
              </>
            )}
          </svg>

          {/* Gadget wrappers with absolute layout centers */}
          <div className="absolute inset-0 z-10">
            {/* Bag Gadget */}
            <div
              className="absolute"
              style={{
                left: "100px",
                top: "60px",
                transform: "translate(-50%, -50%)",
              }}
            >
              <BagGadget
                id="bag"
                isActive={activeSection === "experience"}
                isHovered={false}
                onClick={() => handleGadgetTap("experience")}
              />
            </div>

            {/* Book Gadget */}
            <div
              className="absolute"
              style={{
                left: "220px",
                top: "60px",
                transform: "translate(-50%, -50%)",
              }}
            >
              <BookGadget
                id="book"
                isActive={activeSection === "education"}
                isHovered={false}
                onClick={() => handleGadgetTap("education")}
              />
            </div>

            {/* Headphones Gadget */}
            <div
              className="absolute"
              style={{
                left: "50px",
                top: "150px",
                transform: "translate(-50%, -50%)",
              }}
            >
              <HeadphonesGadget
                id="headphones"
                isActive={activeSection === "hobbies"}
                isHovered={false}
                onClick={() => handleGadgetTap("hobbies")}
              />
            </div>

            {/* Monitor Gadget */}
            <div
              className="absolute"
              style={{
                left: "160px",
                top: "150px",
                transform: "translate(-50%, -50%)",
              }}
            >
              <MonitorGadget
                id="monitor"
                isActive={activeSection === "projects"}
                isHovered={false}
                onClick={() => handleGadgetTap("projects")}
              />
            </div>

            {/* Phone Gadget */}
            <div
              className="absolute"
              style={{
                left: "270px",
                top: "150px",
                transform: "translate(-50%, -50%)",
              }}
            >
              <PhoneGadget
                id="phone"
                isActive={activeSection === "contact"}
                isHovered={false}
                onClick={() => handleGadgetTap("contact")}
              />
            </div>

            {/* Mouse Gadget */}
            <div
              className="absolute"
              style={{
                left: "100px",
                top: "240px",
                transform: "translate(-50%, -50%)",
              }}
            >
              <MouseGadget
                id="mouse"
                isActive={activeSection === "skills"}
                isHovered={false}
                onClick={() => handleGadgetTap("skills")}
              />
            </div>

            {/* Keyboard Gadget */}
            <div
              className="absolute"
              style={{
                left: "220px",
                top: "240px",
                transform: "translate(-50%, -50%)",
              }}
            >
              <KeyboardGadget
                id="keyboard"
                isActive={activeSection === "achievements"}
                isHovered={false}
                onClick={() => handleGadgetTap("achievements")}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Accordion Content Panel */}
      <div ref={contentRef} className="max-w-md mx-auto mt-4 px-2">
        <AnimatePresence mode="wait">
          {activeSection && (
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, height: 0, y: 15 }}
              animate={{ opacity: 1, height: "auto", y: 0 }}
              exit={{ opacity: 0, height: 0, y: 15 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="w-full border border-white/10 rounded-lg p-5 bg-white/5 relative overflow-hidden shadow-2xl"
            >
              {/* Corner brackets */}
              <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t border-l border-accent" />
              <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t border-r border-accent" />
              <div className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b border-l border-accent" />
              <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b border-r border-accent" />
              
              {renderSectionContent(activeSection)}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </main>
  );
}

const PulseParticle: React.FC<{ pathD: string }> = ({ pathD }) => {
  const pathRef = useRef<SVGPathElement>(null);
  const [pathLength, setPathLength] = useState(0);

  useEffect(() => {
    if (pathRef.current) {
      setPathLength(pathRef.current.getTotalLength());
    }
  }, [pathD]);

  return (
    <>
      <path ref={pathRef} d={pathD} className="hidden" />

      {pathLength > 0 && (
        <>
          <motion.path
            d={pathD}
            stroke="#FF6A00"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray={`12 ${pathLength}`}
            initial={{ strokeDashoffset: pathLength }}
            animate={{ strokeDashoffset: 0 }}
            transition={{
              duration: 1.0,
              ease: "easeInOut",
              repeat: Infinity,
            }}
          />
          <motion.path
            d={pathD}
            stroke="#FF6A00"
            strokeWidth="7"
            strokeLinecap="round"
            strokeDasharray={`16 ${pathLength}`}
            className="blur-[2px]"
            initial={{ strokeDashoffset: pathLength }}
            animate={{ strokeDashoffset: 0 }}
            transition={{
              duration: 1.0,
              ease: "easeInOut",
              repeat: Infinity,
            }}
            opacity="0.5"
          />
        </>
      )}
    </>
  );
};
