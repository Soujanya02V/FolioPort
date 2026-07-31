export interface Profile {
  name: string;
  titles: string[];
  status: string;
  quote: string;
}

export interface ExperienceItem {
  year: string;
  text: string;
}

export interface HobbyItem {
  icon: string;
  label: string;
}

export interface EducationItem {
  year: string;
  school: string;
  desc: string;
}

export interface LanguageItem {
  name: string;
  level?: string;
}

export interface ProjectItem {
  title: string;
  desc: string;
  liveLink?: string;
  githubLink?: string;
}

export interface DesignerSkill {
  abbr: string;
  full: string;
}

export interface Skills {
  designers: DesignerSkill[];
  developers: string[];
}

export interface ContactItem {
  icon: string;
  text: string;
  href: string | null;
}

export interface ResearchItem {
  icon: string;
  title: string;
  text: string;
}

export interface PortfolioData {
  profile: Profile;
  experience: ExperienceItem[];
  hobbies: HobbyItem[];
  education: EducationItem[];
  languages: LanguageItem[];
  projects: ProjectItem[];
  skills: Skills;
  contact: ContactItem[];
  research: ResearchItem[];
  certifications: ResearchItem[];
}
