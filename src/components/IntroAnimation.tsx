"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { portfolio } from "@/data/portfolio";

interface IntroAnimationProps {
  onComplete: () => void;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  life: number;
  maxLife: number;
  type: "dust" | "paint";
}

export default function IntroAnimation({ onComplete }: IntroAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const runnerRef = useRef<SVGGElement>(null);
  const brushStrokeRef = useRef<SVGPathElement>(null);
  const maskRef = useRef<SVGRectElement>(null);
  const blurFilterRef = useRef<SVGFilterElement>(null);
  const blurRef = useRef<SVGFEGaussianBlurElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const textGroupRef = useRef<SVGTextElement>(null);
  const bgTextRef = useRef<SVGTextElement>(null);

  const [isRunning, setIsRunning] = useState(false);
  const runnerXRef = useRef(-1000); // Track runner's local X coordinate

  useEffect(() => {
    // ----------------------------------------------------
    // GSAP Animation Timeline
    // ----------------------------------------------------
    const tl = gsap.timeline({
      onComplete: () => {
        // Complete hook triggered when container is fully wiped away
      },
    });

    // Initial state: runner is static at bottom-left, paint is hidden
    gsap.set(runnerRef.current, { x: -1000 });
    gsap.set(maskRef.current, { attr: { width: 0 } });
    gsap.set(bgTextRef.current, { opacity: 1 });

    // Frame 1 -> Frame 2 (0.5s): Start running and animate trail
    tl.to(
      {},
      {
        duration: 0.5,
        onStart: () => {
          // Stay paused during Frame 1 (0.0s - 0.5s)
        },
      }
    );

    // Frame 2 (0.5s - 1.5s): Runner sprints diagonally, trail follows
    tl.to(
      runnerRef.current,
      {
        x: 950,
        duration: 1.0,
        ease: "power2.inOut",
        onStart: () => {
          setIsRunning(true);
        },
        onUpdate: function () {
          const currentX = gsap.getProperty(runnerRef.current, "x") as number;
          runnerXRef.current = currentX;
        },
      },
      0.5
    );

    tl.to(
      maskRef.current,
      {
        attr: { width: 2200 },
        duration: 1.0,
        ease: "power2.inOut",
      },
      0.5
    );

    // Animate giant "I AM" opacity down to a subtle background layer
    tl.to(
      bgTextRef.current,
      {
        opacity: 0.12,
        duration: 0.8,
        ease: "power2.out",
      },
      0.6
    );

    // Dynamic horizontal motion blur on runner (accelerates/decelerates)
    tl.to(
      blurRef.current,
      {
        attr: { stdDeviation: "8,0" },
        duration: 0.2,
        ease: "power2.out",
      },
      0.5
    );

    tl.to(
      blurRef.current,
      {
        attr: { stdDeviation: "0,0" },
        duration: 0.4,
        ease: "power2.inOut",
      },
      1.1
    );

    // Frame 3 (1.5s - 2.3s): Runner reaches upper-right, brush complete.
    // Runner decelerates slightly at the top-right before the final burst
    tl.to(
      runnerRef.current,
      {
        x: 1000,
        duration: 0.8,
        ease: "power1.out",
        onUpdate: function () {
          const currentX = gsap.getProperty(runnerRef.current, "x") as number;
          runnerXRef.current = currentX;
        },
      },
      1.5
    );

    // Frame 4 (2.3s - 3.0s): Expand brush stroke, zoom camera, runner exits, wipe transition
    // Runner sprints off-screen completely
    tl.to(
      runnerRef.current,
      {
        x: 1800,
        duration: 0.6,
        ease: "power2.in",
        onStart: () => {
          setIsRunning(true);
        },
        onUpdate: function () {
          const currentX = gsap.getProperty(runnerRef.current, "x") as number;
          runnerXRef.current = currentX;
        },
      },
      2.3
    );

    // Add motion blur again for the final speed exit
    tl.to(
      blurRef.current,
      {
        attr: { stdDeviation: "12,0" },
        duration: 0.2,
        ease: "power1.in",
      },
      2.3
    );

    // Zoom the camera slightly
    tl.to(
      svgRef.current,
      {
        scale: 1.15,
        duration: 0.7,
        ease: "power2.inOut",
      },
      2.3
    );

    // Paint stroke expands to fill the screen
    tl.to(
      brushStrokeRef.current,
      {
        attr: { strokeWidth: 2600 },
        duration: 0.7,
        ease: "power2.in",
      },
      2.3
    );

    // Diagonal clip-path wipe revealing the portfolio page
    tl.to(
      containerRef.current,
      {
        clipPath: "polygon(100% 0%, 100% 0%, 140% 100%, 140% 100%)",
        duration: 0.65,
        ease: "power2.inOut",
        onComplete: () => {
          setIsRunning(false);
          onComplete();
        },
      },
      2.55
    );

    // ----------------------------------------------------
    // Canvas Particles System
    // ----------------------------------------------------
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const particles: Particle[] = [];
    let animationFrameId: number;

    const spawnParticles = (x: number, y: number) => {
      const angleRad = (-25.5 * Math.PI) / 180;

      // Spawn paint splatters (orange)
      if (Math.random() < 0.7) {
        particles.push({
          x,
          y,
          // Shoot backwards relative to run direction
          vx: (Math.random() * -5 - 2) * Math.cos(angleRad) + (Math.random() - 0.5) * 2,
          vy: (Math.random() * -5 - 2) * Math.sin(angleRad) + (Math.random() - 0.5) * 2 - 2.5,
          size: Math.random() * 5 + 3,
          color: "#FF6A00", // Accent Orange
          alpha: 1,
          life: 0,
          maxLife: Math.random() * 25 + 15,
          type: "paint",
        });
      }

      // Spawn dust clouds (cream/beige)
      if (Math.random() < 0.5) {
        particles.push({
          x,
          y,
          vx: (Math.random() * -3 - 1) * Math.cos(angleRad) + (Math.random() - 0.5) * 1.5,
          vy: (Math.random() * -2 - 0.5) * Math.sin(angleRad) - Math.random() * 0.5,
          size: Math.random() * 8 + 4,
          color: "#E2D7C9", // Warm dust
          alpha: 0.7,
          life: 0,
          maxLife: Math.random() * 35 + 25,
          type: "dust",
        });
      }
    };

    const renderLoop = () => {
      const rect = canvas.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;

      // Match canvas internal resolution to client bounds
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }

      ctx.clearRect(0, 0, w, h);

      // SVG preserveAspectRatio="xMidYMid slice" transform math
      const targetRatio = 1920 / 1080;
      const currentRatio = w / h;
      let scale = 1;
      let offsetX = 0;
      let offsetY = 0;

      if (currentRatio > targetRatio) {
        scale = w / 1920;
        offsetY = (h - 1080 * scale) / 2;
      } else {
        scale = h / 1080;
        offsetX = (w - 1920 * scale) / 2;
      }

      // Apply transform so coordinates align 1:1 with SVG 1920x1080 viewBox
      ctx.save();
      ctx.setTransform(scale, 0, 0, scale, offsetX, offsetY);

      if (isRunning) {
        const angleRad = (-25.5 * Math.PI) / 180;
        const localX = runnerXRef.current - 15; // Push-off point under back foot
        const localY = 40; // Foot level

        // Coordinate transformation: Rotate point around (960, 540)
        const fx = 960 + localX * Math.cos(angleRad) - localY * Math.sin(angleRad);
        const fy = 540 + localX * Math.sin(angleRad) + localY * Math.cos(angleRad);

        spawnParticles(fx, fy);
      }

      // Update and draw particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life++;

        if (p.life >= p.maxLife) {
          particles.splice(i, 1);
          continue;
        }

        p.x += p.vx;
        p.y += p.vy;

        if (p.type === "paint") {
          p.vy += 0.16; // gravity
          p.vx *= 0.97; // air friction
          p.vy *= 0.97;
        } else {
          p.vy -= 0.025; // dust rises slightly
          p.vx *= 0.95;
          p.vy *= 0.95;
        }

        p.alpha = 1 - p.life / p.maxLife;

        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      ctx.restore();
      animationFrameId = requestAnimationFrame(renderLoop);
    };

    renderLoop();

    return () => {
      tl.kill();
      cancelAnimationFrame(animationFrameId);
    };
  }, [isRunning, onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] bg-[#F6F0E8] overflow-hidden select-none"
      style={{
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      }}
    >
      {/* CSS Running Cycle Animations */}
      <style jsx global>{`
        /* Running cycle skeleton animation for the vector SVG character */
        @keyframes right-leg-run {
          0%, 100% { transform: rotate(-38deg); }
          50% { transform: rotate(45deg); }
        }
        @keyframes left-leg-run {
          0%, 100% { transform: rotate(45deg); }
          50% { transform: rotate(-38deg); }
        }
        @keyframes right-arm-run {
          0%, 100% { transform: rotate(42deg); }
          50% { transform: rotate(-42deg); }
        }
        @keyframes left-arm-run {
          0%, 100% { transform: rotate(-42deg); }
          50% { transform: rotate(42deg); }
        }
        @keyframes ponytail-bounce {
          0%, 100% { transform: rotate(-8deg) translateY(0px); }
          50% { transform: rotate(14deg) translateY(-2.5px); }
        }
        @keyframes torso-bounce {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-4px) rotate(2deg); }
        }
        @keyframes shadow-pulse {
          0%, 100% { transform: scale(1); opacity: 0.15; }
          50% { transform: scale(0.8); opacity: 0.08; }
        }

        /* Default paused/ready stance styles */
        #right-leg {
          transform: rotate(-15deg);
          transition: transform 0.3s cubic-bezier(0.25, 1, 0.5, 1);
        }
        #left-leg {
          transform: rotate(32deg);
          transition: transform 0.3s cubic-bezier(0.25, 1, 0.5, 1);
        }
        #right-arm {
          transform: rotate(20deg);
          transition: transform 0.3s cubic-bezier(0.25, 1, 0.5, 1);
        }
        #left-arm {
          transform: rotate(-35deg);
          transition: transform 0.3s cubic-bezier(0.25, 1, 0.5, 1);
        }
        #torso-body {
          transform: rotate(4deg);
          transition: transform 0.3s cubic-bezier(0.25, 1, 0.5, 1);
        }
        #ponytail-hair {
          transform: rotate(3deg);
          transition: transform 0.3s cubic-bezier(0.25, 1, 0.5, 1);
        }
        #shadow-ellipse {
          transform: scale(1);
          opacity: 0.15;
          transition: transform 0.3s, opacity 0.3s;
        }

        /* Running overrides active during Frame 2/4 */
        .runner-running #right-leg {
          animation: right-leg-run 0.55s infinite ease-in-out;
        }
        .runner-running #left-leg {
          animation: left-leg-run 0.55s infinite ease-in-out;
        }
        .runner-running #right-arm {
          animation: right-arm-run 0.55s infinite ease-in-out;
        }
        .runner-running #left-arm {
          animation: left-arm-run 0.55s infinite ease-in-out;
        }
        .runner-running #ponytail-hair {
          animation: ponytail-bounce 0.275s infinite ease-in-out;
        }
        .runner-running #torso-body {
          animation: torso-bounce 0.275s infinite ease-in-out;
        }
        .runner-running #shadow-ellipse {
          animation: shadow-pulse 0.275s infinite ease-in-out;
        }
      `}</style>

      {/* Particle Canvas layer */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-20"
      />

      {/* Main cinematic SVG canvas */}
      <svg
        ref={svgRef}
        viewBox="0 0 1920 1080"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 w-full h-full z-10 origin-center"
      >
        <defs>
          {/* Motion blur filter animated via GSAP for horizontal speed effect */}
          <filter id="motion-blur-filter" ref={blurFilterRef} x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur ref={blurRef} in="SourceGraphic" stdDeviation="0,0" />
          </filter>

          {/* Displacement texture to give the orange stroke raw, organic, paint-like edges */}
          <filter id="paint-edge-texture" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="4" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="35" xChannelSelector="R" yChannelSelector="G" />
          </filter>

          {/* Mask to reveal the brush stroke and name following behind the runner */}
          <clipPath id="paint-trail-mask">
            <rect ref={maskRef} x="-1200" y="-300" width="0" height="600" />
          </clipPath>
        </defs>

        {/* Frame 1: Center static giant typography */}
        <text
          ref={bgTextRef}
          x="960"
          y="545"
          textAnchor="middle"
          dominantBaseline="central"
          fill="#000000"
          className="font-bebas font-black tracking-tight"
          fontSize="900"
        >
          I AM
        </text>

        {/* Rotated Group: Simplifies diagonal math to horizontal rendering */}
        <g transform="translate(960, 540) rotate(-25.5)">
          
          {/* Masked orange brush stroke with white SOUJANYA text */}
          <g clipPath="url(#paint-trail-mask)" filter="url(#paint-edge-texture)">
            {/* Orange Brush Stroke */}
            <path
              ref={brushStrokeRef}
              d="M -1200 0 L 1200 0"
              stroke="#FF6A00"
              strokeWidth="185"
              strokeLinecap="round"
            />
            {/* Bold white name inside stroke */}
            <text
              ref={textGroupRef}
              x="0"
              y="5"
              textAnchor="middle"
              dominantBaseline="central"
              fill="#ffffff"
              className="font-bebas tracking-[0.1em]"
              fontSize="120"
            >
              {portfolio.profile.name}
            </text>
          </g>

          {/* Running female character: Counter-rotated to stay perfectly upright */}
          <g
            ref={runnerRef}
            className={isRunning ? "runner-running" : ""}
            filter="url(#motion-blur-filter)"
          >
            <g transform="translate(0, -60) rotate(25.5)">
              <svg viewBox="0 0 100 100" width="130" height="130" style={{ overflow: "visible" }}>
                {/* Shadow beneath feet */}
                <ellipse
                  id="shadow-ellipse"
                  cx="50"
                  cy="88"
                  rx="14"
                  ry="2.5"
                  fill="rgba(0, 0, 0, 0.15)"
                  className="origin-center"
                />

                {/* Left Arm (Back) */}
                <g id="left-arm" className="origin-[50px_35px]">
                  {/* Upper Arm */}
                  <line x1="50" y1="35" x2="63" y2="44" stroke="#e0851a" strokeWidth="6.5" strokeLinecap="round" />
                  {/* Forearm */}
                  <line x1="63" y1="44" x2="57" y2="55" stroke="#dfa262" strokeWidth="5" strokeLinecap="round" />
                  {/* Hand */}
                  <circle cx="57" cy="55" r="3.2" fill="#dfa262" />
                </g>

                {/* Left Leg (Back) */}
                <g id="left-leg" className="origin-[50px_58px]">
                  {/* Thigh */}
                  <line x1="50" y1="58" x2="38" y2="72" stroke="#252528" strokeWidth="7.5" strokeLinecap="round" />
                  {/* Calf */}
                  <line x1="38" y1="72" x2="48" y2="85" stroke="#252528" strokeWidth="6" strokeLinecap="round" />
                  {/* Shoe */}
                  <path d="M 48 85 L 55 85" stroke="#ffffff" strokeWidth="4.5" strokeLinecap="round" />
                </g>

                {/* Torso & Hip */}
                <g id="torso-body" className="origin-[50px_58px]">
                  {/* Hips */}
                  <ellipse cx="50" cy="58" rx="6.5" ry="4.5" fill="#252528" />
                  {/* Torso Athletic Shirt */}
                  <path d="M 47 58 L 45 35 C 45 35, 51.5 32, 53.5 35 L 53 58 Z" fill="#ff6a00" />
                  {/* Neck */}
                  <line x1="49.5" y1="35" x2="50" y2="28" stroke="#dfa262" strokeWidth="4" strokeLinecap="round" />
                </g>

                {/* Head & Hair */}
                <g id="head" className="origin-[50px_35px]">
                  {/* Face */}
                  <circle cx="50" cy="23.5" r="6.2" fill="#dfa262" />
                  {/* Hair */}
                  <path d="M 46 22.5 C 46 17.5, 53.5 17.5, 53.5 22.5 C 53.5 24.5, 46 25, 46 22.5" fill="#1b1b1c" />
                  {/* Ponytail */}
                  <path id="ponytail-hair" d="M 45 20.5 C 36 20.5, 29 27.5, 23 25.5 C 27 31, 38 26.5, 45 23" fill="#1b1b1c" className="origin-[45px_20.5px]" />
                </g>

                {/* Right Leg (Front) */}
                <g id="right-leg" className="origin-[50px_58px]">
                  {/* Thigh */}
                  <line x1="50" y1="58" x2="61" y2="70" stroke="#1c1c1f" strokeWidth="7.5" strokeLinecap="round" />
                  {/* Calf */}
                  <line x1="61" y1="70" x2="52" y2="86" stroke="#1c1c1f" strokeWidth="6" strokeLinecap="round" />
                  {/* Shoe */}
                  <path d="M 52 86 L 59 86.8" stroke="#ffffff" strokeWidth="4.5" strokeLinecap="round" />
                </g>

                {/* Right Arm (Front) */}
                <g id="right-arm" className="origin-[50px_35px]">
                  {/* Sleeve */}
                  <line x1="50" y1="35" x2="42.5" y2="45" stroke="#ff6a00" strokeWidth="7" strokeLinecap="round" />
                  {/* Arm */}
                  <line x1="42.5" y1="45" x2="50" y2="53" stroke="#dfa262" strokeWidth="5" strokeLinecap="round" />
                  {/* Hand */}
                  <circle cx="50" cy="53" r="3.2" fill="#dfa262" />
                </g>
              </svg>
            </g>
          </g>
        </g>
      </svg>
    </div>
  );
}
