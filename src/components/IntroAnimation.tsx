"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";

interface IntroAnimationProps {
  onComplete: () => void;
}

interface Cell {
  c: number; // column index
  r: number; // row index
  px: number; // pixel center x
  py: number; // pixel center y
  isTextCell: boolean;
  charIndex: number;
  baseShadeIdx: number; // base contribution shade index (0-3)
  pulseSpeed: number; // slow shimming frequency
  pulsePhase: number; // random shimmer phase offset
  randomOffset: number; // organic reveal delay variation
}

// Custom pixel-perfect font maps for "I AM" and "SOUJANYA"
// 7x11 grid font for desktop/large screens (cols >= 125)
const FONT_7X11: Record<string, string[]> = {
  'I': [
    "1111111",
    "0001000",
    "0001000",
    "0001000",
    "0001000",
    "0001000",
    "0001000",
    "0001000",
    "0001000",
    "0001000",
    "1111111"
  ],
  'A': [
    "0011100",
    "0100010",
    "1000001",
    "1000001",
    "1000001",
    "1111111",
    "1000001",
    "1000001",
    "1000001",
    "1000001",
    "1000001"
  ],
  'M': [
    "1000001",
    "1100011",
    "1010101",
    "1001001",
    "1000001",
    "1000001",
    "1000001",
    "1000001",
    "1000001",
    "1000001",
    "1000001"
  ],
  'S': [
    "0111110",
    "1000001",
    "1000000",
    "1000000",
    "0111110",
    "0000001",
    "0000001",
    "0000001",
    "0000001",
    "1000001",
    "0111110"
  ],
  'O': [
    "0111110",
    "1000001",
    "1000001",
    "1000001",
    "1000001",
    "1000001",
    "1000001",
    "1000001",
    "1000001",
    "1000001",
    "0111110"
  ],
  'U': [
    "1000001",
    "1000001",
    "1000001",
    "1000001",
    "1000001",
    "1000001",
    "1000001",
    "1000001",
    "1000001",
    "1000001",
    "0111110"
  ],
  'J': [
    "1111111",
    "0000100",
    "0000100",
    "0000100",
    "0000100",
    "0000100",
    "0000100",
    "1000100",
    "1000100",
    "1000100",
    "0111000"
  ],
  'N': [
    "1000001",
    "1100001",
    "1010001",
    "1010001",
    "1001001",
    "1001001",
    "1000101",
    "1000101",
    "1000011",
    "1000011",
    "1000001"
  ],
  'Y': [
    "1000001",
    "0100010",
    "0100010",
    "0010100",
    "0010100",
    "0001000",
    "0001000",
    "0001000",
    "0001000",
    "0001000",
    "0001000"
  ],
  ' ': [
    "0000000",
    "0000000",
    "0000000",
    "0000000",
    "0000000",
    "0000000",
    "0000000",
    "0000000",
    "0000000",
    "0000000",
    "0000000"
  ]
};

// 5x7 grid font for mobile/small screens (cols < 125)
const FONT_5X7: Record<string, string[]> = {
  'I': [
    "11111",
    "00100",
    "00100",
    "00100",
    "00100",
    "00100",
    "11111"
  ],
  'A': [
    "01110",
    "10001",
    "10001",
    "11111",
    "10001",
    "10001",
    "10001"
  ],
  'M': [
    "10001",
    "11011",
    "10101",
    "10001",
    "10001",
    "10001",
    "10001"
  ],
  'S': [
    "01111",
    "10000",
    "01110",
    "00001",
    "00001",
    "10001",
    "01110"
  ],
  'O': [
    "01110",
    "10001",
    "10001",
    "10001",
    "10001",
    "10001",
    "01110"
  ],
  'U': [
    "10001",
    "10001",
    "10001",
    "10001",
    "10001",
    "10001",
    "01110"
  ],
  'J': [
    "11111",
    "00100",
    "00100",
    "00100",
    "00100",
    "10100",
    "01000"
  ],
  'N': [
    "10001",
    "11001",
    "10101",
    "10011",
    "10001",
    "10001",
    "10001"
  ],
  'Y': [
    "10001",
    "01010",
    "00100",
    "00100",
    "00100",
    "00100",
    "00100"
  ],
  ' ': [
    "00000",
    "00000",
    "00000",
    "00000",
    "00000",
    "00000",
    "00000"
  ]
};

// Precise color palette defined in brief
const SHADES = [
  { r: 26, g: 14, b: 5 },    // 0: Very Dark (#1a0e05)
  { r: 58, g: 20, b: 6 },    // 1: Dark (#3a1406)
  { r: 106, g: 30, b: 7 },   // 2: Medium (#6a1e07)
  { r: 178, g: 58, b: 9 },   // 3: Bright (#b23a09)
  { r: 255, g: 106, b: 0 }  // 4: Accent Text (#ff6a00)
];

export default function IntroAnimation({ onComplete }: IntroAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let animationFrameId: number;
    let time = 0;
    let lastTime = performance.now();
    let width = window.innerWidth;
    let height = window.innerHeight;

    let cells: Cell[] = [];
    let cols = 0;
    let rows = 0;
    let currentCellWidth = 6;

    const initializeGrid = () => {
      width = window.innerWidth;
      height = window.innerHeight;

      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      // Select dynamic responsive scale for grid cols
      let targetCols = Math.round(Math.max(120, Math.min(200, width / 7)));
      if (targetCols < 80) {
        targetCols = 80; // Enforce minimum columns so the text maps correctly
      }

      const step = width / targetCols;
      const cellWidth = Math.max(1, Math.floor(step * 0.75));
      currentCellWidth = cellWidth;
      const cellGap = step - cellWidth;

      cols = Math.ceil(width / step);
      rows = Math.ceil(height / step);

      const gridWidth = cols * step - cellGap;
      const gridHeight = rows * step - cellGap;
      const offsetX = (width - gridWidth) / 2;
      const offsetY = (height - gridHeight) / 2;

      // Font Configuration & Two-Line Setup
      const lines = ["I AM", "SOUJANYA"];
      const useLargeFont = cols >= 125;
      const fontMap = useLargeFont ? FONT_7X11 : FONT_5X7;
      const fontWidth = useLargeFont ? 7 : 5;
      const fontHeight = useLargeFont ? 11 : 7;
      const charGap = useLargeFont ? 2 : 1;
      const spaceWidth = useLargeFont ? 5 : 3;
      const lineGap = useLargeFont ? 4 : 2;

      // Calculate line widths
      const line1Width = lines[0].split('').reduce((acc, char) => acc + (char === ' ' ? spaceWidth : fontWidth), 0) + (lines[0].length - 1) * charGap;
      const line2Width = lines[1].split('').reduce((acc, char) => acc + (char === ' ' ? spaceWidth : fontWidth), 0) + (lines[1].length - 1) * charGap;

      // Center both lines vertically
      const totalTextHeight = fontHeight + lineGap + fontHeight;
      const startY1 = Math.floor((rows - totalTextHeight) / 2);
      const startY2 = startY1 + fontHeight + lineGap;

      // Precompute exact bounding limits for characters on both lines
      const charPositions: { char: string; startX: number; endX: number; lineIndex: number; charIndex: number }[] = [];
      let overallCharIndex = 0;

      // Precompute Line 1 ("I AM")
      let currentX1 = Math.floor((cols - line1Width) / 2);
      for (let i = 0; i < lines[0].length; i++) {
        const char = lines[0][i];
        const charWidth = char === ' ' ? spaceWidth : fontWidth;
        charPositions.push({
          char,
          startX: currentX1,
          endX: currentX1 + charWidth,
          lineIndex: 0,
          charIndex: overallCharIndex++
        });
        currentX1 += charWidth + charGap;
      }

      // Precompute Line 2 ("SOUJANYA")
      let currentX2 = Math.floor((cols - line2Width) / 2);
      for (let i = 0; i < lines[1].length; i++) {
        const char = lines[1][i];
        const charWidth = char === ' ' ? spaceWidth : fontWidth;
        charPositions.push({
          char,
          startX: currentX2,
          endX: currentX2 + charWidth,
          lineIndex: 1,
          charIndex: overallCharIndex++
        });
        currentX2 += charWidth + charGap;
      }

      const checkTextCell = (c: number, r: number): number | null => {
        // Check Line 1 range
        if (r >= startY1 && r < startY1 + fontHeight) {
          for (let i = 0; i < charPositions.length; i++) {
            const pos = charPositions[i];
            if (pos.lineIndex === 0 && c >= pos.startX && c < pos.endX) {
              if (pos.char === ' ') return null;
              const localX = c - pos.startX;
              const localY = r - startY1;
              const charData = fontMap[pos.char];
              if (charData && charData[localY] && charData[localY][localX] === '1') {
                return pos.charIndex;
              }
            }
          }
        }
        // Check Line 2 range
        else if (r >= startY2 && r < startY2 + fontHeight) {
          for (let i = 0; i < charPositions.length; i++) {
            const pos = charPositions[i];
            if (pos.lineIndex === 1 && c >= pos.startX && c < pos.endX) {
              if (pos.char === ' ') return null;
              const localX = c - pos.startX;
              const localY = r - startY2;
              const charData = fontMap[pos.char];
              if (charData && charData[localY] && charData[localY][localX] === '1') {
                return pos.charIndex;
              }
            }
          }
        }
        return null;
      };

      cells = [];
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const px = offsetX + c * step + cellWidth / 2;
          const py = offsetY + r * step + cellWidth / 2;

          const charIndex = checkTextCell(c, r);
          const isTextCell = charIndex !== null;

          // GitHub contribution distribution: sparse distribution of shades 0-3
          const rand = Math.random();
          let baseShadeIdx = 0; // Very dark (#1a0e05)
          if (rand > 0.86) {
            baseShadeIdx = 3; // Bright (#b23a09)
          } else if (rand > 0.7) {
            baseShadeIdx = 2; // Medium (#6a1e07)
          } else if (rand > 0.35) {
            baseShadeIdx = 1; // Dark (#3a1406)
          }

          cells.push({
            c,
            r,
            px,
            py,
            isTextCell,
            charIndex: isTextCell ? (charIndex as number) : -1,
            baseShadeIdx,
            pulseSpeed: 0.6 + Math.random() * 0.8, // Very slow contribution shimmer speed
            pulsePhase: Math.random() * Math.PI * 2,
            randomOffset: Math.random()
          });
        }
      }
    };

    console.log("[INTRO] IntroAnimation initialized");
    initializeGrid();
    window.addEventListener("resize", initializeGrid);

    // Animation States for GSAP Timeline
    const animState = {
      textRevealProgress: 0.0,
      backgroundIntensity: 1.0, // starts at full intensity (1.0) and fades to 0.15 during hold
      fadeOutProgress: 0.0
    };

    // Coordinated GSAP timeline matching the design brief timing exactly (4.2 seconds total):
    // Frame 1: 0.0s - 1.0s -> Living contribution grid only (no text)
    // Frame 2: 1.0s - 2.8s -> Text emerge (flickers in progressively on two lines)
    // Frame 3: 2.8s - 3.8s -> Hold completed text while background becomes much darker (dims to 0.15)
    // Frame 4: 3.8s - 4.2s -> Text fades back into the original background shades, and container fades to 0
    const tl = gsap.timeline({
      onComplete: () => {
        console.log("[INTRO] Timeline complete");
        onComplete();
      }
    });

    gsap.set(containerRef.current, { opacity: 1 });

    // Frame 2 (1.0s - 2.8s): Text emerge (progressive reveal)
    tl.to(
      animState,
      {
        textRevealProgress: 1.0,
        duration: 1.8,
        ease: "none"
      },
      1.0
    );

    // Frame 3 (2.8s - 3.8s): Background dims to 0.15 visual intensity during the hold for strong contrast focus
    tl.to(
      animState,
      {
        backgroundIntensity: 0.15,
        duration: 1.0,
        ease: "power1.inOut"
      },
      2.8
    );

    // Frame 4 (3.8s - 4.2s): Smooth fade out / transition to homepage
    tl.to(
      animState,
      {
        fadeOutProgress: 1.0,
        duration: 0.4,
        ease: "power1.inOut"
      },
      3.8
    );

    tl.to(
      containerRef.current,
      {
        opacity: 0,
        duration: 0.4,
        ease: "power1.inOut"
      },
      3.8
    );

    // Render loop
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;

    const renderLoop = (now: number) => {
      const dt = (now - lastTime) / 1000;
      lastTime = now;
      time += dt;

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, width, height);

      const revealProgress = animState.textRevealProgress;
      const fadeOutProgress = animState.fadeOutProgress;
      const textIntensity = 1.0 - fadeOutProgress; // Interpolation factor for text fade out (1 to 0)

      // Background scale adjusts according to backgroundIntensity and dim slightly more during final fade out
      const bgScale = animState.backgroundIntensity * (1.0 - 0.3 * fadeOutProgress);

      for (let i = 0; i < cells.length; i++) {
        const cell = cells[i];

        // 1. Calculate slow, subtle individual pixel shimmer (drift offset between -0.4 and 0.4)
        const shimmer = Math.sin(time * cell.pulseSpeed + cell.pulsePhase) * 0.4;
        
        // Compute continuous float shade index value (constrained inside 0.0 - 3.0 range)
        const shadeVal = Math.max(0, Math.min(3, cell.baseShadeIdx + shimmer));
        const idx = Math.floor(shadeVal);
        const frac = shadeVal - idx;

        // Smooth RGB interpolation between neighbor shades
        const c1 = SHADES[idx];
        const c2 = SHADES[Math.min(3, idx + 1)];
        const bgShade = {
          r: Math.round(c1.r + (c2.r - c1.r) * frac),
          g: Math.round(c1.g + (c2.g - c1.g) * frac),
          b: Math.round(c1.b + (c2.b - c1.b) * frac)
        };

        let finalShade = {
          r: Math.round(bgShade.r * bgScale),
          g: Math.round(bgShade.g * bgScale),
          b: Math.round(bgShade.b * bgScale)
        };

        if (cell.isTextCell) {
          // Calculate individual progressive reveal timing per character
          const charRevealStart = (cell.charIndex / 12) * 0.6; // Spreads across first 60% of Phase 2
          const charRevealDuration = 0.25; // 0.25s reveal window per character
          const pixelDelay = cell.randomOffset * 0.15; // organic pixel flicker delay

          const cellProgress = Math.max(0, Math.min(1, (revealProgress - charRevealStart - pixelDelay) / charRevealDuration));

          let isTextActive = false;
          if (cellProgress >= 1.0) {
            isTextActive = true;
          } else if (cellProgress > 0.0) {
            // High frequency pixelated flicker-in
            isTextActive = Math.random() < cellProgress;
          }

          if (isTextActive) {
            // Text cell active uses strict Accent Text color (#ff6a00), blending into background shade during fade-out
            const textShade = SHADES[4];
            finalShade = {
              r: Math.round(finalShade.r + (textShade.r - bgShade.r * bgScale) * textIntensity),
              g: Math.round(finalShade.g + (textShade.g - bgShade.g * bgScale) * textIntensity),
              b: Math.round(finalShade.b + (textShade.b - bgShade.b * bgScale) * textIntensity)
            };
          }
        }

        // Draw the square grid cell (No rounded corners, no soft glow - strictly technical)
        ctx.fillStyle = `rgb(${finalShade.r}, ${finalShade.g}, ${finalShade.b})`;
        ctx.fillRect(cell.px - currentCellWidth / 2, cell.py - currentCellWidth / 2, currentCellWidth, currentCellWidth);
      }

      ctx.restore();
      animationFrameId = requestAnimationFrame(renderLoop);
    };

    animationFrameId = requestAnimationFrame(renderLoop);

    return () => {
      window.removeEventListener("resize", initializeGrid);
      tl.kill();
      cancelAnimationFrame(animationFrameId);
    };
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] bg-[#0E0E10] overflow-hidden select-none"
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />
    </div>
  );
}
