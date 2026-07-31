import { PortfolioData } from "../types/portfolio";

export const portfolio: PortfolioData = {
  profile: {
    name: "SOUJANYA",
    titles: ["SOFTWARE ENGINEER", "AI RESEARCHER", "FULL STACK DEVELOPER"],
    status: "SYSTEM ONLINE",
    quote: "Building solutions, creating impact.",
  },
  experience: [
    // {
    //   year: "2018",
    //   text: "Volunteer of charity project in countryside village to improve the social living.",
    // },
    // {
    //   year: "2017",
    //   text: "รางวัล popular vote การประกวดออกแบบ Logo Lanna Coffee CMU.",
    // },
    {
      year: "2025-present",
      text: "Full Stack Developer Intern - WebMuseHub",
    },
    {
      year: "2025-2026",
      text: "Vice President - NIC Technical Club, MVJCE",
    },
    {
      year: "2024-present",
      text: "Free Lance Developer",
    },
    {
      year: "2024-2026",
      text: "Tech Team Member - NIC Technical Club, MVJCE",
    },
  ],
  hobbies: [
    { icon: "Plane", label: "Travel" },
    { icon: "Utensils", label: "Cooking" },
    { icon: "Bike", label: "Biking" },
    { icon: "Clapperboard", label: "Movies" },
    { icon: "Dumbbell", label: "Sports" },
    // { icon: "Music", label: "Music" },
    // { icon: "Coffee", label: "Chilling at cafe" },
    // { icon: "Camera", label: "Photography" },
    // { icon: "BookOpen", label: "Reading" },
  ],
  education: [
    {
      year: "2013-2017",
      school: "RAJAMANGALA UNIVERSITY OF TECHNOLOGY LANNA",
      desc: "Faculty of Fine Arts and Architecture. ( GPA 3.73 )",
    },
    {
      year: "2010-2012",
      school: "SANSAIWITTAYAKOM SCHOOL",
      desc: "ม.ปลาย (ม.4-6) ( GPA 3.06 )",
    },
    {
      year: "2007-2009",
      school: "SANSAIWITTAYAKOM SCHOOL",
      desc: "ม.ต้น (ม.1-3) ( GPA 3.69 )",
    },
  ],
  languages: [
    { name: "Thai", level: "Native", code: "TH" },
    { name: "English", level: "Professional", code: "GB" },
  ],
  projects: [
    {
      title: "LitSync",
      desc: "AI-powered research assistant",
      link: "#",
    },
    {
      title: "LockedIn",
      desc: "Productivity & habit tracking app",
      link: "#",
    },
    {
      title: "AI Video Editor",
      desc: "Smart clip selection using AI",
      link: "#",
    },
    {
      title: "VoiceSheet",
      desc: "Voice assisted data filling",
      link: "#",
    },
    {
      title: "Food Delivery Web App",
      desc: "Full-stack MERN application",
      link: "#",
    },
  ],
  skills: {
    designers: [
      { abbr: "Ai", full: "Adobe Illustrator" },
      { abbr: "Ps", full: "Adobe Photoshop" },
      { abbr: "Lr", full: "Adobe Lightroom" },
    ],
    developers: [
      "C++",
      "Java",
      "Python",
      "JavaScript",
      "SQL",
      "React",
      "Node.js",
      "MongoDB",
      "HTML",
      "CSS",
      "Tailwind",
    ],
  },
  contact: [
    { icon: "MapPin", text: "Bengaluru, India", href: null },
    // { icon: "Phone", text: "9380594015", href: "tel:9380594015" },
    { icon: "Mail", text: "soujanyabailawad@gmail.com", href: "mailto:soujanyabailawad@gmail.com" },
    { icon: "LinkedinIcon", text: "linkedin.com/in/soujanya", href: "https://www.linkedin.com/in/soujanya-maharudra-896920291/" },
    { icon: "GithubIcon", text: "github.com/soujanya", href: "https://github.com/Soujanya02V" },
    // { icon: "InstagramIcon", text: "soujanya.codes", href: "https://instagram.com/soujanya.codes" },
    // { icon: "MessageSquare", text: "soujanya_ln", href: null },
  ],
  research: [
    { icon: "FileText", title: "Research Papers", text: "Published ML paper" },
    { icon: "Cloud", title: "AWS Certified", text: "Cloud Architect Associate" },
    { icon: "Layers", title: "Docker", text: "Container orchestration" },
    { icon: "Cpu", title: "Terraform", text: "Infrastructure as Code" },
  ],
  certifications: [
    { icon: "Brain", title: "RAG", text: "Retrieval Augmented Gen" },
    { icon: "Workflow", title: "DevOps", text: "CI/CD & Pipelines" },
    { icon: "Terminal", title: "LLM", text: "Large Language Models" },
    { icon: "Grid", title: "System Design", text: "Scalable Architecture" },
  ],
};
