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
      year: "2016",
      text: "ตัวแทนนำเสนอผลงานในโครงการประกวด Fashion Smart Start Up 2016",
    },
    {
      year: "2015",
      text: "Top 10 Creative Textile Award 2016",
    },
    {
      year: "2014",
      text: "งานแสดงผลงานด้านทัศนศิลป์และสถาปัตยกรรมศาสตร์ มหาวิทยาลัยเชียงใหม่ ปีการศึกษา 2557-2559",
    },
    {
      year: "2013",
      text: "ประธานออกแบบเสื้อผ้า องค์การการปรับเปลี่ยนชุมชนใหม่ จัดกิจกรรมวันเด็กบนม่อนแจ่มพื้นที่ใกล้",
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
    { icon: "MapPin", text: "108/1 หมู่ 7 ต.หนองหาร อ.สันทราย จ.เชียงใหม่ 50290", href: null },
    { icon: "Phone", text: "094-6201999", href: "tel:0946201999" },
    { icon: "Mail", text: "soujanya.dev@gmail.com", href: "mailto:soujanya.dev@gmail.com" },
    { icon: "LinkedinIcon", text: "linkedin.com/in/soujanya", href: "https://linkedin.com/in/soujanya" },
    // { icon: "GithubIcon", text: "github.com/soujanya", href: "https://github.com/soujanya" },
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
