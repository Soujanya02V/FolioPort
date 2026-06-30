"use client";

import React from "react";
import { motion } from "framer-motion";

interface GadgetProps {
  id: string;
  isActive: boolean;
  isHovered: boolean;
  onHoverStart?: () => void;
  onHoverEnd?: () => void;
  onClick?: () => void;
  anchorRef?: React.RefObject<HTMLDivElement | null>;
}

export const BagGadget: React.FC<GadgetProps> = ({
  isActive,
  isHovered,
  onHoverStart,
  onHoverEnd,
  onClick,
  anchorRef,
}) => {
  const activeOrHovered = isActive || isHovered;

  return (
    <div
      ref={anchorRef}
      className="relative flex items-center justify-center cursor-pointer p-4 group select-none"
      onMouseEnter={onHoverStart}
      onMouseLeave={onHoverEnd}
      onClick={onClick}
    >
      {/* Anchor point in center for wiring */}
      <div className="absolute w-1 h-1 bg-transparent left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      
      {/* Glow aura */}
      <div
        className={`absolute w-32 h-24 rounded-full filter blur-xl transition-all duration-700 pointer-events-none ${
          activeOrHovered ? "bg-accent/20 scale-100" : "bg-transparent scale-50"
        }`}
      />

      <motion.svg
        width="110"
        height="85"
        viewBox="0 0 110 85"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        animate={{
          scale: isHovered ? 1.05 : 1,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {/* Handle */}
        <motion.path
          d="M 40 25 C 40 12, 70 12, 70 25"
          stroke={activeOrHovered ? "#FF6A00" : "#FFFFFF"}
          strokeWidth="2.5"
          strokeLinecap="round"
          animate={{
            stroke: activeOrHovered ? "#FF6A00" : "#FFFFFF",
          }}
        />

        {/* Main Body */}
        <motion.rect
          x="15"
          y="25"
          width="80"
          height="50"
          rx="6"
          stroke={activeOrHovered ? "#FF6A00" : "#FFFFFF"}
          strokeWidth="2.5"
          animate={{
            stroke: activeOrHovered ? "#FF6A00" : "#FFFFFF",
          }}
        />

        {/* Inner panel lines */}
        <motion.path
          d="M 23 25 V 75 M 87 25 V 75"
          stroke={activeOrHovered ? "#FF6A00" : "#FFFFFF"}
          strokeWidth="1.5"
          strokeDasharray="4 3"
          opacity={activeOrHovered ? 0.8 : 0.4}
        />

        {/* Flap */}
        <motion.path
          d="M 15 25 H 95 V 45 C 95 45, 80 48, 70 48 H 40 C 30 48, 15 45, 15 45 Z"
          fill="#0E0E10"
          stroke={activeOrHovered ? "#FF6A00" : "#FFFFFF"}
          strokeWidth="2"
          animate={{
            stroke: activeOrHovered ? "#FF6A00" : "#FFFFFF",
          }}
        />

        {/* Buckle clasp */}
        <motion.rect
          x="48"
          y="42"
          width="14"
          height="12"
          rx="1"
          fill="#0E0E10"
          stroke={activeOrHovered ? "#FF6A00" : "#FFFFFF"}
          strokeWidth="2"
          animate={{
            stroke: activeOrHovered ? "#FF6A00" : "#FFFFFF",
            scale: isHovered ? [1, 1.1, 1] : 1,
          }}
          transition={{ duration: 0.3 }}
        />
        <motion.line
          x1="55"
          y1="48"
          x2="55"
          y2="54"
          stroke={activeOrHovered ? "#FF6A00" : "#FFFFFF"}
          strokeWidth="2"
        />
      </motion.svg>
    </div>
  );
};

export const HeadphonesGadget: React.FC<GadgetProps> = ({
  isActive,
  isHovered,
  onHoverStart,
  onHoverEnd,
  onClick,
  anchorRef,
}) => {
  const activeOrHovered = isActive || isHovered;

  return (
    <div
      ref={anchorRef}
      className="relative flex items-center justify-center cursor-pointer p-4 group select-none"
      onMouseEnter={onHoverStart}
      onMouseLeave={onHoverEnd}
      onClick={onClick}
    >
      <div className="absolute w-1 h-1 bg-transparent left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      
      <div
        className={`absolute w-28 h-28 rounded-full filter blur-xl transition-all duration-700 pointer-events-none ${
          activeOrHovered ? "bg-accent/20 scale-100" : "bg-transparent scale-50"
        }`}
      />

      <motion.svg
        width="80"
        height="80"
        viewBox="0 0 80 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        animate={{
          scale: isHovered ? 1.05 : 1,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {/* Headband Outer Arc */}
        <motion.path
          d="M 16 48 C 16 16, 64 16, 64 48"
          stroke={activeOrHovered ? "#FF6A00" : "#FFFFFF"}
          strokeWidth="2.5"
          strokeLinecap="round"
        />

        {/* Headband Inner Cushion */}
        <motion.path
          d="M 22 45 C 22 24, 58 24, 58 45"
          stroke={activeOrHovered ? "#FF6A00" : "#FFFFFF"}
          strokeWidth="1.5"
          opacity={activeOrHovered ? 0.7 : 0.4}
        />

        {/* Small Connector adjustments */}
        <motion.path
          d="M 16 44 V 50 M 64 44 V 50"
          stroke={activeOrHovered ? "#FF6A00" : "#FFFFFF"}
          strokeWidth="2"
        />

        {/* Left Earcup */}
        <motion.rect
          x="10"
          y="46"
          width="12"
          height="22"
          rx="4"
          fill="#0E0E10"
          stroke={activeOrHovered ? "#FF6A00" : "#FFFFFF"}
          strokeWidth="2"
          animate={{
            x: isHovered ? 9 : 10,
          }}
        />

        {/* Right Earcup */}
        <motion.rect
          x="58"
          y="46"
          width="12"
          height="22"
          rx="4"
          fill="#0E0E10"
          stroke={activeOrHovered ? "#FF6A00" : "#FFFFFF"}
          strokeWidth="2"
          animate={{
            x: isHovered ? 59 : 58,
          }}
        />

        {/* Left Earpad Detail */}
        <motion.rect
          x="20"
          y="50"
          width="3"
          height="14"
          rx="1"
          fill={activeOrHovered ? "#FF6A00" : "#FFFFFF"}
          opacity={activeOrHovered ? 0.8 : 0.3}
        />

        {/* Right Earpad Detail */}
        <motion.rect
          x="57"
          y="50"
          width="3"
          height="14"
          rx="1"
          fill={activeOrHovered ? "#FF6A00" : "#FFFFFF"}
          opacity={activeOrHovered ? 0.8 : 0.3}
        />
      </motion.svg>
    </div>
  );
};

export const BookGadget: React.FC<GadgetProps> = ({
  isActive,
  isHovered,
  onHoverStart,
  onHoverEnd,
  onClick,
  anchorRef,
}) => {
  const activeOrHovered = isActive || isHovered;

  return (
    <div
      ref={anchorRef}
      className="relative flex items-center justify-center cursor-pointer p-4 group select-none"
      onMouseEnter={onHoverStart}
      onMouseLeave={onHoverEnd}
      onClick={onClick}
      style={{ perspective: "600px" }}
    >
      <div className="absolute w-1 h-1 bg-transparent left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      
      <div
        className={`absolute w-24 h-32 rounded-full filter blur-xl transition-all duration-700 pointer-events-none ${
          activeOrHovered ? "bg-accent/20 scale-100" : "bg-transparent scale-50"
        }`}
      />

      <motion.svg
        width="70"
        height="90"
        viewBox="0 0 70 90"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        animate={{
          scale: isHovered ? 1.05 : 1,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {/* Back Cover */}
        <path
          d="M 17 12 H 58 C 60 12, 62 14, 62 16 V 76 C 62 78, 60 80, 58 80 H 17"
          stroke={activeOrHovered ? "#FF6A00" : "#FFFFFF"}
          strokeWidth="2.5"
        />

        {/* Paper stack block */}
        <path
          d="M 17 16 H 56 V 76 H 17"
          stroke={activeOrHovered ? "#FF6A00" : "#FFFFFF"}
          strokeWidth="1.5"
          strokeDasharray="2 2"
          opacity="0.4"
        />

        {/* Front page (Animate on hover with 3D Page Flip simulation) */}
        <motion.path
          d="M 17 12 H 56 C 58 12, 60 14, 60 16 V 76 C 60 78, 58 80, 56 80 H 17"
          stroke={activeOrHovered ? "#FF6A00" : "#FFFFFF"}
          strokeWidth="2.5"
          fill="#0E0E10"
          style={{ originX: 0 }}
          animate={{
            rotateY: isHovered ? -25 : 0,
            skewY: isHovered ? 2 : 0,
          }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />

        {/* Spine lines */}
        <motion.path
          d="M 12 12 H 17 V 80 H 12 C 10 80, 8 78, 8 76 V 16 C 8 14, 10 12, 12 12 Z"
          fill="#0E0E10"
          stroke={activeOrHovered ? "#FF6A00" : "#FFFFFF"}
          strokeWidth="2.5"
        />

        {/* Bookmark Ribbon */}
        <motion.path
          d="M 32 76 V 86 L 36 82 L 40 86 V 76"
          fill={activeOrHovered ? "#FF6A00" : "#FFFFFF"}
          stroke={activeOrHovered ? "#FF6A00" : "#FFFFFF"}
          strokeWidth="1"
          animate={{
            y: isHovered ? 2 : 0,
          }}
        />

        {/* Inside notebook horizontal lines (only visible on flip) */}
        <motion.path
          d="M 23 28 H 48 M 23 38 H 48 M 23 48 H 48 M 23 58 H 48 M 23 68 H 48"
          stroke={activeOrHovered ? "#FF6A00" : "#FFFFFF"}
          strokeWidth="1.5"
          opacity={isHovered ? 0.6 : 0}
          animate={{
            opacity: isHovered ? 0.6 : 0,
            x: isHovered ? -2 : 0,
          }}
          transition={{ duration: 0.3 }}
        />
      </motion.svg>
    </div>
  );
};

export const MonitorGadget: React.FC<GadgetProps> = ({
  isActive,
  isHovered,
  onHoverStart,
  onHoverEnd,
  onClick,
  anchorRef,
}) => {
  const activeOrHovered = isActive || isHovered;

  return (
    <div
      ref={anchorRef}
      className="relative flex items-center justify-center cursor-pointer p-4 group select-none"
      onMouseEnter={onHoverStart}
      onMouseLeave={onHoverEnd}
      onClick={onClick}
    >
      <div className="absolute w-1 h-1 bg-transparent left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      
      <div
        className={`absolute w-36 h-28 rounded-full filter blur-xl transition-all duration-700 pointer-events-none ${
          activeOrHovered ? "bg-accent/20 scale-100" : "bg-transparent scale-50"
        }`}
      />

      <motion.svg
        width="150"
        height="110"
        viewBox="0 0 150 110"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        animate={{
          scale: isHovered ? 1.05 : 1,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {/* Outer Bezel */}
        <motion.rect
          x="10"
          y="10"
          width="130"
          height="74"
          rx="6"
          stroke={activeOrHovered ? "#FF6A00" : "#FFFFFF"}
          strokeWidth="2.5"
        />

        {/* Screen background (Green/White grid when on, dark when off) */}
        <motion.rect
          x="16"
          y="16"
          width="118"
          height="62"
          rx="2"
          fill="#0E0E10"
          animate={{
            fill: activeOrHovered ? "#141416" : "#0E0E10",
          }}
        />

        {/* Blueprint display grid on screen */}
        <motion.path
          d="M 16 28 H 134 M 16 42 H 134 M 16 56 H 134 M 16 70 H 134 M 36 16 V 78 M 66 16 V 78 M 96 16 V 78 M 116 16 V 78"
          stroke="#FF6A00"
          strokeWidth="0.5"
          opacity={activeOrHovered ? 0.15 : 0}
          animate={{
            opacity: activeOrHovered ? 0.15 : 0,
          }}
        />

        {/* Mock code outline inside screen */}
        <motion.path
          d="M 24 28 H 68 M 24 36 H 92 M 24 44 H 56 M 24 52 H 78"
          stroke={activeOrHovered ? "#FF6A00" : "#FFFFFF"}
          strokeWidth="2"
          strokeLinecap="round"
          opacity={activeOrHovered ? 0.8 : 0}
          animate={{
            pathLength: activeOrHovered ? 1 : 0,
            opacity: activeOrHovered ? 0.8 : 0,
          }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        />

        {/* Power button dot */}
        <motion.circle
          cx="75"
          cy="78"
          r="1.5"
          fill={activeOrHovered ? "#FF6A00" : "#FFFFFF"}
        />

        {/* Stand Neck */}
        <motion.path
          d="M 67 84 L 62 98 H 88 L 83 84 Z"
          fill="#0E0E10"
          stroke={activeOrHovered ? "#FF6A00" : "#FFFFFF"}
          strokeWidth="2.5"
        />

        {/* Base */}
        <motion.path
          d="M 45 98 H 105 L 110 102 H 40 Z"
          fill="#0E0E10"
          stroke={activeOrHovered ? "#FF6A00" : "#FFFFFF"}
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
      </motion.svg>
    </div>
  );
};

export const KeyboardGadget: React.FC<GadgetProps> = ({
  isActive,
  isHovered,
  onHoverStart,
  onHoverEnd,
  onClick,
  anchorRef,
}) => {
  const activeOrHovered = isActive || isHovered;

  // Generate standard rows of key paths
  const keysRow1 = [12, 22, 32, 42, 52, 62, 72, 82, 92, 102, 112, 122];
  const keysRow2 = [14, 25, 36, 47, 58, 69, 80, 91, 102, 113, 124];
  const keysRow3 = [18, 30, 42, 54, 66, 78, 90, 102, 114, 126];
  // Spacebar row
  const spaceX = 40;
  const spaceW = 55;

  return (
    <div
      ref={anchorRef}
      className="relative flex items-center justify-center cursor-pointer p-4 group select-none"
      onMouseEnter={onHoverStart}
      onMouseLeave={onHoverEnd}
      onClick={onClick}
    >
      <div className="absolute w-1 h-1 bg-transparent left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      
      <div
        className={`absolute w-36 h-20 rounded-full filter blur-xl transition-all duration-700 pointer-events-none ${
          activeOrHovered ? "bg-accent/20 scale-100" : "bg-transparent scale-50"
        }`}
      />

      <motion.svg
        width="160"
        height="65"
        viewBox="0 0 160 65"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        animate={{
          scale: isHovered ? 1.05 : 1,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {/* Chassis */}
        <motion.rect
          x="5"
          y="5"
          width="150"
          height="55"
          rx="6"
          stroke={activeOrHovered ? "#FF6A00" : "#FFFFFF"}
          strokeWidth="2.5"
        />

        {/* Row 1 Keys */}
        {keysRow1.map((x, idx) => (
          <motion.rect
            key={`r1-${idx}`}
            x={x}
            y="11"
            width="8"
            height="8"
            rx="1.5"
            stroke={activeOrHovered ? "#FF6A00" : "#FFFFFF"}
            strokeWidth="1.2"
            animate={{
              opacity: activeOrHovered ? [0.4, 1, 0.4] : 0.6,
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: idx * 0.08,
              repeatDelay: 2,
            }}
          />
        ))}

        {/* Row 2 Keys */}
        {keysRow2.map((x, idx) => (
          <motion.rect
            key={`r2-${idx}`}
            x={x}
            y="22"
            width="8"
            height="8"
            rx="1.5"
            stroke={activeOrHovered ? "#FF6A00" : "#FFFFFF"}
            strokeWidth="1.2"
            animate={{
              opacity: activeOrHovered ? [0.4, 1, 0.4] : 0.6,
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: idx * 0.08 + 0.3,
              repeatDelay: 2,
            }}
          />
        ))}

        {/* Row 3 Keys */}
        {keysRow3.map((x, idx) => (
          <motion.rect
            key={`r3-${idx}`}
            x={x}
            y="33"
            width="8"
            height="8"
            rx="1.5"
            stroke={activeOrHovered ? "#FF6A00" : "#FFFFFF"}
            strokeWidth="1.2"
            animate={{
              opacity: activeOrHovered ? [0.4, 1, 0.4] : 0.6,
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: idx * 0.08 + 0.6,
              repeatDelay: 2,
            }}
          />
        ))}

        {/* Spacebar Row */}
        <motion.rect
          x="12"
          y="44"
          width="18"
          height="8"
          rx="1.5"
          stroke={activeOrHovered ? "#FF6A00" : "#FFFFFF"}
          strokeWidth="1.2"
        />

        <motion.rect
          x={spaceX}
          y="44"
          width={spaceW}
          height="8"
          rx="1.5"
          stroke={activeOrHovered ? "#FF6A00" : "#FFFFFF"}
          strokeWidth="1.2"
          animate={{
            opacity: activeOrHovered ? [0.5, 1, 0.5] : 0.7,
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            delay: 1.2,
          }}
        />

        <motion.rect
          x="102"
          y="44"
          width="18"
          height="8"
          rx="1.5"
          stroke={activeOrHovered ? "#FF6A00" : "#FFFFFF"}
          strokeWidth="1.2"
        />

        <motion.rect
          x="126"
          y="44"
          width="20"
          height="8"
          rx="1.5"
          stroke={activeOrHovered ? "#FF6A00" : "#FFFFFF"}
          strokeWidth="1.2"
        />
      </motion.svg>
    </div>
  );
};

export const PhoneGadget: React.FC<GadgetProps> = ({
  isActive,
  isHovered,
  onHoverStart,
  onHoverEnd,
  onClick,
  anchorRef,
}) => {
  const activeOrHovered = isActive || isHovered;

  return (
    <div
      ref={anchorRef}
      className="relative flex items-center justify-center cursor-pointer p-4 group select-none"
      onMouseEnter={onHoverStart}
      onMouseLeave={onHoverEnd}
      onClick={onClick}
    >
      <div className="absolute w-1 h-1 bg-transparent left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      
      <div
        className={`absolute w-20 h-32 rounded-full filter blur-xl transition-all duration-700 pointer-events-none ${
          activeOrHovered ? "bg-accent/20 scale-100" : "bg-transparent scale-50"
        }`}
      />

      <motion.svg
        width="65"
        height="105"
        viewBox="0 0 65 105"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        animate={{
          scale: isHovered ? 1.05 : 1,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {/* Chassis */}
        <motion.rect
          x="6"
          y="6"
          width="53"
          height="93"
          rx="8"
          stroke={activeOrHovered ? "#FF6A00" : "#FFFFFF"}
          strokeWidth="2.5"
        />

        {/* Screen Outline */}
        <motion.rect
          x="11"
          y="12"
          width="43"
          height="74"
          rx="3"
          fill="#0E0E10"
          stroke={activeOrHovered ? "#FF6A00" : "#FFFFFF"}
          strokeWidth="1.5"
          animate={{
            fill: activeOrHovered ? "#141416" : "#0E0E10",
          }}
        />

        {/* Speaker Notch */}
        <motion.line
          x1="26"
          y1="9"
          x2="39"
          y2="9"
          stroke={activeOrHovered ? "#FF6A00" : "#FFFFFF"}
          strokeWidth="2"
          strokeLinecap="round"
        />

        {/* Home Button or bottom indicator */}
        <motion.circle
          cx="32.5"
          cy="91"
          r="2.5"
          stroke={activeOrHovered ? "#FF6A00" : "#FFFFFF"}
          strokeWidth="1.5"
        />

        {/* Screen active details (battery, wifi, chat shape overlay) */}
        <motion.path
          d="M 16 20 H 28 M 16 26 H 38"
          stroke={activeOrHovered ? "#FF6A00" : "#FFFFFF"}
          strokeWidth="2"
          strokeLinecap="round"
          opacity={activeOrHovered ? 0.8 : 0}
          animate={{
            opacity: activeOrHovered ? 0.8 : 0,
          }}
        />

        {/* Large phone interface icon (phone receiver outline inside screen) */}
        <motion.path
          d="M 28 44 C 28 50, 36 50, 36 44 M 32 40 V 48"
          stroke="#FF6A00"
          strokeWidth="1.5"
          opacity={activeOrHovered ? 0.4 : 0}
          animate={{
            opacity: activeOrHovered ? 0.4 : 0,
            scale: activeOrHovered ? [0.9, 1.1, 0.9] : 0.9,
          }}
          transition={{ repeat: Infinity, duration: 2 }}
        />
      </motion.svg>
    </div>
  );
};

export const MouseGadget: React.FC<GadgetProps> = ({
  isActive,
  isHovered,
  onHoverStart,
  onHoverEnd,
  onClick,
  anchorRef,
}) => {
  const activeOrHovered = isActive || isHovered;

  return (
    <div
      ref={anchorRef}
      className="relative flex items-center justify-center cursor-pointer p-4 group select-none"
      onMouseEnter={onHoverStart}
      onMouseLeave={onHoverEnd}
      onClick={onClick}
    >
      <div className="absolute w-1 h-1 bg-transparent left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      
      <div
        className={`absolute w-20 h-28 rounded-full filter blur-xl transition-all duration-700 pointer-events-none ${
          activeOrHovered ? "bg-accent/20 scale-100" : "bg-transparent scale-50"
        }`}
      />

      <motion.svg
        width="55"
        height="85"
        viewBox="0 0 55 85"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        animate={{
          scale: isHovered ? 1.05 : 1,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {/* Chassis */}
        <motion.rect
          x="8"
          y="8"
          width="39"
          height="69"
          rx="19.5"
          stroke={activeOrHovered ? "#FF6A00" : "#FFFFFF"}
          strokeWidth="2.5"
        />

        {/* Center Split Line */}
        <motion.line
          x1="27.5"
          y1="8"
          x2="27.5"
          y2="34"
          stroke={activeOrHovered ? "#FF6A00" : "#FFFFFF"}
          strokeWidth="2"
        />

        {/* Horizontal Split Line */}
        <motion.path
          d="M 8 34 H 47"
          stroke={activeOrHovered ? "#FF6A00" : "#FFFFFF"}
          strokeWidth="1.5"
          opacity={activeOrHovered ? 0.8 : 0.4}
        />

        {/* Scroll Wheel */}
        <motion.rect
          x="25"
          y="18"
          width="5"
          height="10"
          rx="2"
          fill="#0E0E10"
          stroke={activeOrHovered ? "#FF6A00" : "#FFFFFF"}
          strokeWidth="1.5"
          animate={{
            y: isHovered ? [18, 20, 18] : 18,
          }}
          transition={{
            duration: 0.6,
            repeat: isHovered ? Infinity : 0,
            ease: "easeInOut",
          }}
        />

        {/* Side grip dashes */}
        <motion.path
          d="M 12 44 H 14 M 12 48 H 14 M 12 52 H 14 M 41 44 H 43 M 41 48 H 43 M 41 52 H 43"
          stroke={activeOrHovered ? "#FF6A00" : "#FFFFFF"}
          strokeWidth="1.5"
          opacity={activeOrHovered ? 0.6 : 0.3}
        />
      </motion.svg>
    </div>
  );
};
