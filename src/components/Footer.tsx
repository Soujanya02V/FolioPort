"use client";

import React from "react";
import { getIcon } from "@/utils/icons";

export default function Footer() {
  return (
    <footer className="w-full border-t border-white/10 py-10 mt-16 md:mt-24 text-center">
      <div className="max-w-4xl mx-auto px-4 flex flex-col items-center space-y-4">
        {/* Copyright */}
        <p className="text-sm font-sans font-medium text-white/95 tracking-wide">
          &copy; 2026 Soujanya Maharudra Bailawad
        </p>

        {/* Taglines */}
        {/* <div className="text-[11px] font-mono text-white/40 space-y-1">
          <p>Built from scratch.</p>
          <p>Powered by curiosity.</p>
        </div> */}

        {/* Domain Name */}
        <p className="text-xs font-mono text-accent/80 hover:text-accent transition-colors duration-300">
          <a href="https://soujanyamaharudra.dev" target="_blank" rel="noopener noreferrer">
            soujanyamaharudra.dev
          </a>
        </p>

        {/* Social Icons Links */}
        <div className="flex items-center justify-center gap-6 pt-2">
          {/* GitHub Link */}
          <a
            href="https://github.com/Soujanya02V"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 text-xs font-mono text-white/50 hover:text-accent transition-all duration-300"
          >
            <span className="transition-all duration-300 group-hover:scale-110 group-hover:text-accent group-hover:drop-shadow-[0_0_8px_rgba(255,106,0,0.85)]">
              {getIcon("Github", 16)}
            </span>
            <span>GitHub</span>
          </a>

          <span className="text-white/10 select-none">•</span>

          {/* LinkedIn Link */}
          <a
            href="https://www.linkedin.com/in/soujanya-maharudra-896920291/"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 text-xs font-mono text-white/50 hover:text-accent transition-all duration-300"
          >
            <span className="transition-all duration-300 group-hover:scale-110 group-hover:text-accent group-hover:drop-shadow-[0_0_8px_rgba(255,106,0,0.85)]">
              {getIcon("LinkedinIcon", 16)}
            </span>
            <span>LinkedIn</span>
          </a>

          <span className="text-white/10 select-none">•</span>

          {/* Email Link */}
          <a
            href="mailto:soujanyabailawad@gmail.com"
            className="group flex items-center gap-2 text-xs font-mono text-white/50 hover:text-accent transition-all duration-300"
          >
            <span className="transition-all duration-300 group-hover:scale-110 group-hover:text-accent group-hover:drop-shadow-[0_0_8px_rgba(255,106,0,0.85)]">
              {getIcon("Mail", 16)}
            </span>
            <span>Email</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
