import { PortfolioData } from "../types/portfolio";

export const portfolio: PortfolioData = {
  profile: {
    name: "SOUJANYA",
    titles: ["Devops ENGINEER", "AI RESEARCHER", "FULL STACK DEVELOPER"],
    status: "Hello World!!",
    quote: "Currently building tomorrow's GitHub commits.",
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
    { icon: "Globe", label: "Building Chrome Extensions" },
    { icon: "Laptop", label: "Building Projects" },
    { icon: "CPU", label: "Exploring Technology" },
    { icon: "FileText", label: "Reading AI Research" },
    // { icon: "Dumbbell", label: "Sports" },
    { icon: "Music", label: "Music" },
    { icon: "Binary", label: "Solving DSA" },
    // { icon: "Camera", label: "Photography" },
    // { icon: "BookOpen", label: "Reading" },
  ],
  education: [
    {
      year: "2023-present",
      school: "MVJ College of Engineering, Bengaluru",
      desc: "Bachelor of Engineering in Computer Science & Engineering.",
    },
    {
      year: "2021-2023",
      school: "Aryabhata College Of Science, Dharwad",
      desc: "Pre-University Course .",
    },
    {
      year: "2020",
      school: "Holy Cross Convent School, Belgaum",
      desc: "Secondary School Leaving Certificate (SSLC).",
    },
  ],
  languages: [
    { name: "English" },
    { name: "Hindi" },
    { name: "Kannada" },
    { name: "Marathi" },
  ],
  projects: [
    {
      title: "LitSync",
      desc: "AI-powered research assistant",
      liveLink: "https://litsync-3m78.onrender.com/",
      githubLink: "https://github.com/Soujanya02V/LitSync",
    },
    {
      title: "AI Resume Builder",
      desc: "Intelligent Resume Generator",
      liveLink: "https://resume-builder-frontend-asvo.onrender.com/",
      githubLink: "https://github.com/Soujanya02V/AI-Resume-Builder",
    },
    {
      title: "SeatIRL",
      desc: "Real Time Seat Reservation System",
      liveLink: "https://seatirl-m5oq.onrender.com/",
      githubLink: "https://github.com/Soujanya02V/seatIRL",
    },
    {
      title: "DevOps Deployment Project",
      desc: "Production Deployment Pipeline",
      liveLink: "http://15.134.221.115/",
      githubLink: "https://github.com/Soujanya02V/DevOOps_Project_1",
    },
    {
      title: "Gokarna Pooja Services",
      desc: "Official Website for Gokarna Temple Services",
      liveLink: "https://narayanabalitripindi.com",
      githubLink: "https://github.com/pratham2820051/sacred-gokarna-services",
    },
  ],
  skills: {
    designers: [
      { abbr: "Git", full: "Git & GitHub" },
      { abbr: "Dkr", full: "Docker" },
      { abbr: "API", full: "Rest APIs " },
    ],
    developers: [
      "C++",

      "Python",
      "JavaScript",
      "SQL",
      "React",
      "Node.js",
      "MongoDB",
      //"HTML",
      //"CSS",
      //"Tailwind",
      "Kubernetes",
      "Ansible",
      "Helm",
      "Grafana",
      "Prometheus",
      "Linux"


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
  achievements: [
    {
      icon: "Briefcase",
      title: "Internship",
      text: "WebMuseHub • Full Stack Intern",
      image: "/images/achievements/internship.jpg",
    },
    {
      icon: "FileText",
      title: "IEEE Research Paper",
      text: "IEEE ICDSCNC • Graph Algorithms Paper",
      image: "/images/achievements/ieee-research.jpg",
    },
    {
      icon: "Flag",
      title: "Hackathon Organizer",
      text: "PixelGenesis • 24-hour National Hackathon",
      image: "/images/achievements/hackathon-organizer.png",
    },
    {
      icon: "Trophy",
      title: "Hackathon Winner",
      text: "3rd Place • IEEE NITK 96-hr ML Challenge",
      image: "/images/achievements/hackathon-winner.jpg",
    },
  ],

  recognition: [
    /*
    {
      icon: "Github",
      title: "Open Source",
      text: "Public GitHub Projects",
      image: "/images/achievements/open-source.svg",
    },
    {
      icon: "Laptop",
      title: "Freelance",
      text: "Gokarna Pooja Services Website",
      image: "/images/achievements/freelance.svg",
    },
    {
      icon: "Code2",
      title: "LeetCode",
      text: "100 Days Badge 2025 • 100+ Days",
      image: "/images/achievements/leetcode.png",
    },
    {
      icon: "Users",
      title: "Leadership",
      text: "Vice President • NIC Technical Club",
      image: "/images/achievements/leadership.svg",
    },
    */
  ],
};
