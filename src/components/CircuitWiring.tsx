"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

interface WirePath {
  id: string;
  fromKey: string;
  toKey: string;
  pathD: string;
  isActive: boolean;
}

interface CircuitWiringProps {
  anchors: Record<string, React.RefObject<HTMLDivElement | null>>;
  activePulses: Record<string, boolean>; // e.g. { "bag-to-experience": true }
}

export const CircuitWiring: React.FC<CircuitWiringProps> = ({ anchors, activePulses }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [wires, setWires] = useState<WirePath[]>([]);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const calculatePaths = () => {
    if (!containerRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    setDimensions({ width: containerRect.width, height: containerRect.height });

    const getElRect = (ref: React.RefObject<HTMLDivElement | null>) => {
      if (!ref.current) return null;
      return ref.current.getBoundingClientRect();
    };

    const newWires: WirePath[] = [];

    // Helper to add orthogonal path
    // type: 'L-shape' | 'Z-shape' | 'U-shape'
    const addWire = (
      id: string,
      fromKey: string,
      fromSide: "left" | "right" | "top" | "bottom" | "center",
      toKey: string,
      toSide: "left" | "right" | "top" | "bottom" | "center",
      routing: "direct" | "h-v" | "v-h" | "h-v-h" | "v-h-v" | "experience" | "profile-tablet" | "book-edu" | "mouse-skills"
    ) => {
      const fromRect = getElRect(anchors[fromKey]);
      const toRect = getElRect(anchors[toKey]);

      if (!fromRect || !toRect) return;

      // Calculate relative coordinates
      const getCoord = (rect: DOMRect, side: string) => {
        const x_l = rect.left - containerRect.left;
        const x_r = rect.right - containerRect.left;
        const x_c = rect.left + rect.width / 2 - containerRect.left;
        const y_t = rect.top - containerRect.top;
        const y_b = rect.bottom - containerRect.top;
        const y_c = rect.top + rect.height / 2 - containerRect.top;

        if (side === "left") return { x: x_l, y: y_c };
        if (side === "right") return { x: x_r, y: y_c };
        if (side === "top") return { x: x_c, y: y_t };
        if (side === "bottom") return { x: x_c, y: y_b };
        return { x: x_c, y: y_c };
      };

      const start = getCoord(fromRect, fromSide);
      const end = getCoord(toRect, toSide);

      let d = "";

      if (routing === "direct") {
        d = `M ${start.x} ${start.y} L ${end.x} ${end.y}`;
      } else if (routing === "h-v") {
        d = `M ${start.x} ${start.y} H ${end.x} V ${end.y}`;
      } else if (routing === "v-h") {
        d = `M ${start.x} ${start.y} V ${end.y} H ${end.x}`;
      } else if (routing === "h-v-h") {
        const midX = start.x + (end.x - start.x) / 2;
        d = `M ${start.x} ${start.y} H ${midX} V ${end.y} H ${end.x}`;
      } else if (routing === "v-h-v") {
        const midY = start.y + (end.y - start.y) / 2;
        d = `M ${start.x} ${start.y} V ${midY} H ${end.x} V ${end.y}`;
      } else if (routing === "experience") {
        // Experience wiring: from Bag left, goes left, then up, then left to timeline dot
        const midX = start.x - 45;
        d = `M ${start.x} ${start.y} H ${midX} V ${end.y} H ${end.x}`;
      } else if (routing === "profile-tablet") {
        // Profile to tablet split: goes right, down, then right. Capped dynamically to midpoint.
        const maxMidX = start.x + 55;
        const midX = Math.min(maxMidX, start.x + (end.x - start.x) / 2);
        d = `M ${start.x} ${start.y} H ${midX} V ${end.y} H ${end.x}`;
      } else if (routing === "book-edu") {
        // Book to education: from Book bottom-left, goes left, down, left
        const midX = start.x - 30;
        d = `M ${start.x} ${start.y} H ${midX} V ${end.y} H ${end.x}`;
      } else if (routing === "mouse-skills") {
        // Mouse to skills: goes vertical down, then horizontal right
        d = `M ${start.x} ${start.y} V ${end.y} H ${end.x}`;
      }

      newWires.push({
        id,
        fromKey,
        toKey,
        pathD: d,
        isActive: !!activePulses[id],
      });
    };

    // Define all connection wiring in the infographic
    // 1. Profile to Tablet (Phone) & Split to Contact
    addWire("profile-to-phone", "profile", "right", "phone", "left", "profile-tablet");
    addWire("phone-to-contact", "phone", "right", "contact", "left", "h-v-h");

    // 2. Bag to Experience timeline
    addWire("bag-to-experience", "bag", "left", "experience", "right", "experience");

    // 3. Monitor to Projects header
    addWire("monitor-to-projects", "monitor", "right", "projects", "left", "h-v");

    // 4. Monitor stand to Keyboard
    addWire("monitor-to-keyboard", "monitor", "bottom", "keyboard", "top", "direct");

    // 5. Keyboard to Achievements section
    addWire("keyboard-to-achievements", "keyboard", "bottom", "achievements", "top", "v-h-v");

    // 6. Mouse to Software Skills
    addWire("mouse-to-skills", "mouse", "bottom", "skills", "left", "mouse-skills");

    // 7. Headphones to Hobbies (Cooking)
    addWire("hobbies-to-headphones", "hobbies", "right", "headphones", "left", "h-v-h");

    // 8. Book to Education timeline
    addWire("book-to-education", "book", "left", "education", "right", "book-edu");

    // Connect Headphones & Book & Mouse to the central hub for electric pulse flow
    addWire("monitor-to-headphones", "monitor", "left", "headphones", "right", "h-v-h");
    addWire("headphones-to-book", "headphones", "bottom", "book", "top", "v-h-v");
    addWire("keyboard-to-mouse", "keyboard", "right", "mouse", "left", "h-v-h");

    setWires(newWires);
  };

  useEffect(() => {
    // Run after initial mount and layouts stabilize
    const timer = setTimeout(() => {
      calculatePaths();
    }, 100);

    window.addEventListener("resize", calculatePaths);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", calculatePaths);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [anchors, activePulses]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-10"
      style={{ minHeight: "100%" }}
    >
      <svg
        width={dimensions.width}
        height={dimensions.height}
        viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Render static white background wiring */}
        {wires.map((wire) => (
          <path
            key={`bg-${wire.id}`}
            d={wire.pathD}
            stroke="#ffffff"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.15"
            className="transition-all duration-500"
          />
        ))}

        {/* Render active glowing orange circuit lines */}
        {wires.map((wire) => (
          <g key={`group-${wire.id}`}>
            {/* The underlying wire path, highlighted when active */}
            <motion.path
              d={wire.pathD}
              stroke="#FF6A00"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity={wire.isActive ? 0.8 : 0}
              animate={{
                opacity: wire.isActive ? 0.8 : 0,
              }}
              transition={{ duration: 0.3 }}
            />

            {/* Glowing background path line */}
            <motion.path
              d={wire.pathD}
              stroke="#FF6A00"
              strokeWidth="6"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity={wire.isActive ? 0.25 : 0}
              className="blur-[4px]"
              animate={{
                opacity: wire.isActive ? 0.25 : 0,
              }}
              transition={{ duration: 0.3 }}
            />

            {/* The moving electric particle pulse */}
            {wire.isActive && (
              <PulseParticle pathD={wire.pathD} />
            )}
          </g>
        ))}
      </svg>
    </div>
  );
};

// Component for animating the electric pulse particle along the wire
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
      {/* Hidden path used only for measuring length in DOM */}
      <path ref={pathRef} d={pathD} className="hidden" />

      {pathLength > 0 && (
        <>
          {/* Main glowing pulse segment */}
          <motion.path
            d={pathD}
            stroke="#FF6A00"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeDasharray={`15 ${pathLength}`}
            initial={{ strokeDashoffset: pathLength }}
            animate={{ strokeDashoffset: 0 }}
            transition={{
              duration: 1.2,
              ease: "easeInOut",
              repeat: Infinity,
            }}
          />
          {/* Outer fuzzy glow of the pulse */}
          <motion.path
            d={pathD}
            stroke="#FF6A00"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={`20 ${pathLength}`}
            className="blur-[3px]"
            initial={{ strokeDashoffset: pathLength }}
            animate={{ strokeDashoffset: 0 }}
            transition={{
              duration: 1.2,
              ease: "easeInOut",
              repeat: Infinity,
            }}
            opacity="0.6"
          />
        </>
      )}
    </>
  );
};
