import React from "react";
import {
  MapPin,
  Phone,
  Mail,
  MessageSquare,
  GraduationCap,
  BookOpen,
  Plane,
  Utensils,
  Bike,
  Clapperboard,
  Dumbbell,
  Music,
  Coffee,
  Camera,
  FileText,
  Cloud,
  Layers,
  Cpu,
  Brain,
  Workflow,
  Terminal,
  Grid,
  Globe,
  Laptop,
  Binary,
} from "lucide-react";

// Custom SVG components for brand icons to ensure compatibility
export const GithubIcon = ({ size = 16 }: { size?: number }) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="lucide"
  >
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
  </svg>
);

export const LinkedinIcon = ({ size = 16 }: { size?: number }) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="lucide"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

export const InstagramIcon = ({ size = 16 }: { size?: number }) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="lucide"
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

export const getIcon = (name: string, size: number = 16) => {
  switch (name) {
    case "MapPin":
      return <MapPin size={size} />;
    case "Phone":
      return <Phone size={size} />;
    case "Mail":
      return <Mail size={size} />;
    case "MessageSquare":
      return <MessageSquare size={size} />;
    case "GraduationCap":
      return <GraduationCap size={size} />;
    case "BookOpen":
      return <BookOpen size={size} />;
    case "Plane":
      return <Plane size={size} />;
    case "Utensils":
      return <Utensils size={size} />;
    case "Bike":
      return <Bike size={size} />;
    case "Clapperboard":
      return <Clapperboard size={size} />;
    case "Dumbbell":
      return <Dumbbell size={size} />;
    case "Music":
      return <Music size={size} />;
    case "Coffee":
      return <Coffee size={size} />;
    case "Camera":
      return <Camera size={size} />;
    case "FileText":
      return <FileText size={size} />;
    case "Cloud":
      return <Cloud size={size} />;
    case "Layers":
      return <Layers size={size} />;
    case "Cpu":
    case "CPU":
      return <Cpu size={size} />;
    case "Globe":
      return <Globe size={size} />;
    case "Laptop":
      return <Laptop size={size} />;
    case "Binary":
      return <Binary size={size} />;
    case "Brain":
      return <Brain size={size} />;
    case "Workflow":
      return <Workflow size={size} />;
    case "Terminal":
      return <Terminal size={size} />;
    case "Grid":
      return <Grid size={size} />;
    case "GithubIcon":
      return <GithubIcon size={size} />;
    case "LinkedinIcon":
      return <LinkedinIcon size={size} />;
    case "InstagramIcon":
      return <InstagramIcon size={size} />;
    default:
      return null;
  }
};
