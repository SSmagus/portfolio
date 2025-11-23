import React, { useState, useEffect, useRef } from 'react';
import {
  Github,
  Linkedin,
  Mail,
  FileText,
  ExternalLink,
  Moon,
  Sun,
  Terminal,
  Folder,
  FileCode,
  ChevronRight,
  ChevronDown,
  Download,
  Menu,
  X,
  Star,
  GitCommit,
  Coffee,
  Code2,
  Cpu,
  Database,
  Play
} from 'lucide-react';

/**
 * DATA SECTION
 */
const PERSONAL_INFO = {
  name: "Saumya Dhakad",
  role: "Software Engineer",
  email: "Saumya122004@gmail.com",
  socials: {
    github: "https://github.com/SSmagus",
    linkedin: "https://www.linkedin.com/in/saumya-dhakad-100x/",
    resume: import.meta.env.BASE_URL + "resume.pdf"
  }
};

const ACHIEVEMENTS = [
  {
    role: "Competitive Programming",
    period: "Ongoing",
    icon: <Code2 className="text-pink-500" size={24} />,
    details: [
      { text: "LeetCode Knight (2000+, Top 1.98%)", link: "https://leetcode.com/crackedDev" },
      { text: "Codeforces Specialist (1400+)", link: "https://codeforces.com/profile/Sdhakad" },
      { text: "CodeChef 3★ (1600+)", link: "https://www.codechef.com/users/smoothy" },
      { text: "Solved 1300+ problems across platforms", link: "https://codolio.com/profile/SSmagus" }
    ]
  },

  {
    role: "Backend Engineering & System Design",
    period: "2023–Present",
    icon: <Cpu className="text-cyan-500" size={24} />,
    details: [
      { text: "Built production-style backend systems using Spring Boot", link: null },
      { text: "Implemented JWT, OTP login, RBAC & secure API flows", link: null },
      { text: "Used Redis caching, MySQL indexing & query optimization", link: null },
      { text: "Explored scalability, rate limiting & distributed concepts", link: null }
    ]
  },

  {
    role: "Independent Software Projects",
    period: "2023–Present",
    icon: <Folder className="text-green-500" size={24} />,
    details: [
      { text: "Developed backend-focused applications with real use cases", link: null },
      { text: "Integrated mailing services, authentication and deployment pipelines", link: null },
      { text: "Focused on clean architecture, modular code & version control discipline", link: null },
      { text: "Maintained consistent GitHub activity and project improvements", link: null }
    ]
  }
];




const PROJECTS = [
  {
    id: "LeetHost",
    ext: ".java",
    color: "text-orange-500",
    description: "Spring Boot backend for LeetCode tracking. Integrates GraphQL APIs, Elo rating, and secure verification.",
    tech: ["Spring Boot", "MySQL", "GraphQL"],
    featured: true,
    video: import.meta.env.BASE_URL + "endR.mp4",
    repo: "https://github.com/SSmagus/Leetcode-Discord-Bot"
  },
  {
    id: "OTP_Auth",
    ext: ".java",
    color: "text-orange-500",
    description: "Secure email-based authentication system with time-bound JWT tokens, Redis caching, and BCrypt hashing.",
    tech: ["Spring Security", "Redis", "JavaMail"],
    featured: false,
    video: null,
    repo: "https://github.com/SSmagus/email-auth-service"
  }
];

/**
 * HELPER HOOKS & COMPONENTS
 */

// Hook to detect when an element enters the viewport
const useOnScreen = (ref, rootMargin = "0px") => {
  const [isIntersecting, setIntersecting] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIntersecting(entry.isIntersecting),
      { rootMargin, threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref, rootMargin]);
  return isIntersecting;
};

// Typewriter Component
const Typewriter = ({ text, delay = 50, infinite = false }) => {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setCurrentText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, delay);
      return () => clearTimeout(timeout);
    } else if (infinite) {
      // Optional: reset logic could go here
    }
  }, [currentIndex, delay, infinite, text]);

  return <span>{currentText}</span>;
};

// Animated Section Wrapper
const FadeInSection = ({ children, delay = "0ms" }) => {
  const ref = useRef();
  const onScreen = useOnScreen(ref, "-50px");

  return (
    <div
      ref={ref}
      style={{ transitionDelay: delay }}
      className={`transition-all duration-1000 ease-out transform ${
        onScreen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      {children}
    </div>
  );
};

const FileTreeItem = ({ icon: Icon, label, isActive, onClick, indent = false, colorClass = "text-slate-500" }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-2 px-3 py-2 text-sm transition-all rounded-md mx-2 max-w-[90%] font-medium group
      ${
        isActive
          ? "bg-amber-100 text-amber-900 dark:bg-amber-900/30 dark:text-amber-100 translate-x-1"
          : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-200 hover:translate-x-1"
      }
      ${indent ? "pl-8" : "pl-4"}
    `}
  >
    <Icon
      size={16}
      className={`${
        isActive ? "text-amber-600 dark:text-amber-400" : colorClass
      } transition-transform group-hover:scale-110`}
    />
    <span className={isActive ? "font-bold" : ""}>{label}</span>
  </button>
);

const SectionHeader = ({ title, icon: Icon, color }) => (
  <div className="flex items-center gap-3 mb-8 pb-4 border-b-2 border-slate-100 dark:border-slate-800">
    <div className={`p-3 rounded-xl ${color} bg-opacity-10 dark:bg-opacity-20 shadow-sm`}>
      <Icon size={28} className={color.replace("bg-", "text-")} />
    </div>
    <h2 className="text-4xl font-black text-slate-800 dark:text-slate-100 tracking-tight">
      {title}
    </h2>
  </div>
);

const Tag = ({ text, color }) => (
  <span
    className={`px-4 py-1.5 rounded-lg text-sm font-bold border-2 ${color} hover:scale-105 transition-transform cursor-default shadow-sm`}
  >
    {text}
  </span>
);

// Video Modal
const VideoModal = ({ video, onClose }) => {
  if (!video) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[999]">
      <div className="bg-[#111] p-4 rounded-2xl shadow-xl max-w-3xl w-[90%] relative">
        <button
          className="absolute top-3 right-3 text-white hover:text-amber-400 transition text-xl"
          onClick={onClose}
        >
          ✕
        </button>
        <video src={video} controls autoPlay className="rounded-xl w-full" />
      </div>
    </div>
  );
};

export default function IDEPortfolio() {
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      return (
        localStorage.getItem("theme") === "dark" ||
        (!localStorage.getItem("theme") &&
          window.matchMedia("(prefers-color-scheme: dark)").matches)
      );
    }
    return false;
  });

  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [activeSection, setActiveSection] = useState("readme");
  const [videoPreview, setVideoPreview] = useState(null);

  // Toggle Theme Logic
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const scrollTo = (id) => {
    setActiveSection(id);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    if (window.innerWidth < 768) setSidebarOpen(false);
  };

  return (
    <div
      className={`min-h-screen flex transition-colors duration-300 font-sans ${
        darkMode ? "dark bg-[#1a1b26]" : "bg-[#f8f9fa]"
      }`}
    >
      {/* Custom Styles for Animations */}
      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .animate-blink {
          animation: blink 1s infinite;
        }
        .neo-shadow {
          box-shadow: 4px 4px 0px 0px rgba(0,0,0,0.1);
        }
        .dark .neo-shadow {
          box-shadow: 4px 4px 0px 0px rgba(0,0,0,0.5);
        }
        .neo-shadow-hover:hover {
          transform: translate(-2px, -2px);
          box-shadow: 6px 6px 0px 0px rgba(245, 158, 11, 0.4);
        }
      `}</style>

      {/* MOBILE HEADER */}
      <div className="md:hidden fixed top-0 w-full h-16 bg-white dark:bg-[#1a1b26] border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-4 z-50 shadow-sm">
        <span className="font-bold text-slate-800 dark:text-amber-400 flex items-center gap-2 text-lg">
          <Terminal size={20} className="text-amber-500" /> Saumya.dev
        </span>
        <button
          onClick={() => setSidebarOpen(!isSidebarOpen)}
          className="p-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
        >
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* SIDEBAR */}
      <aside
        className={`
          fixed md:sticky top-0 h-screen w-72 bg-white dark:bg-[#1f2335] border-r border-slate-200 dark:border-slate-800 flex flex-col z-40 transition-transform duration-300 shadow-xl md:shadow-none
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 pt-16 md:pt-0
        `}
      >
        <div className="p-6 flex items-center gap-3 font-black text-slate-800 dark:text-slate-100 border-b border-slate-100 dark:border-slate-800 text-xl tracking-tight">
          <div className="bg-amber-100 dark:bg-amber-900/50 p-2 rounded-lg text-amber-600 dark:text-amber-400">
            <Code2 size={24} />
          </div>
          <span>RESUME</span>
        </div>

        <div className="flex-1 overflow-y-auto py-6 space-y-2">
          <div className="px-6 pb-2 text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">
            Project Files
          </div>

          <FileTreeItem
            icon={FileText}
            label="README.md"
            isActive={activeSection === "readme"}
            onClick={() => scrollTo("readme")}
            colorClass="text-blue-500"
          />
          <FileTreeItem
            icon={Star}
            label="achievements.json"
            isActive={activeSection === "achievements"}
            onClick={() => scrollTo("achievements")}
            colorClass="text-yellow-500"
          />

          <div className="pt-4 pb-2 px-6 flex items-center gap-2 text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">
            <ChevronDown size={12} strokeWidth={4} /> src
          </div>

          <FileTreeItem
            icon={Folder}
            label="projects"
            isActive={activeSection === "projects"}
            onClick={() => scrollTo("projects")}
            indent
            colorClass="text-green-500 fill-green-500"
          />
          <FileTreeItem
            icon={Mail}
            label="contact.yml"
            isActive={activeSection === "contact"}
            onClick={() => scrollTo("contact")}
            indent
            colorClass="text-pink-500"
          />
        </div>

        {/* Sidebar Footer */}
        <div className="p-6 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-[#1f2335]">
          <div className="flex gap-4 justify-center mb-6">
            <a
              href={PERSONAL_INFO.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-slate-500 hover:text-black dark:hover:text-white hover:bg-white dark:hover:bg-slate-700 rounded-lg transition-all shadow-sm hover:shadow-md"
            >
              <Github size={22} />
            </a>
            <a
              href={PERSONAL_INFO.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-slate-500 hover:text-blue-600 hover:bg-white dark:hover:bg-slate-700 rounded-lg transition-all shadow-sm hover:shadow-md"
            >
              <Linkedin size={22} />
            </a>
            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className="p-2 text-slate-500 hover:text-pink-500 hover:bg-white dark:hover:bg-slate-700 rounded-lg transition-all shadow-sm hover:shadow-md"
            >
              <Mail size={22} />
            </a>
          </div>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="w-full flex items-center justify-center gap-3 p-3 rounded-xl bg-white dark:bg-[#1a1b26] border-2 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold text-sm hover:border-amber-400 dark:hover:border-amber-400 transition-all shadow-sm active:scale-95"
          >
            {darkMode ? (
              <>
                <Sun size={18} className="text-amber-400" /> Light Mode
              </>
            ) : (
              <>
                <Moon size={18} className="text-indigo-500" /> Dark Mode
              </>
            )}
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 min-w-0 pt-16 md:pt-0 bg-[#f8f9fa] dark:bg-[#1a1b26] relative">
        {/* Breadcrumb / Top Bar */}
        <div className="hidden md:flex h-16 bg-white/80 dark:bg-[#1a1b26]/80 border-b border-slate-200 dark:border-slate-800 items-center px-10 text-sm text-slate-500 sticky top-0 z-30 backdrop-blur-xl">
          <span className="flex items-center gap-2 font-mono">
            saumya-dhakad <ChevronRight size={14} /> portfolio <ChevronRight size={14} />{" "}
            <span className="text-amber-600 dark:text-amber-400 font-bold bg-amber-50 dark:bg-amber-900/20 px-3 py-1 rounded-md border border-amber-100 dark:border-amber-900/50">
              {activeSection}
            </span>
          </span>
        </div>

        {/* Content Scroll Area */}
        <div className="p-6 md:p-12 max-w-5xl mx-auto space-y-32 pb-32">
          {/* SECTION: README (About) */}
          <FadeInSection>
            <section id="readme" className="scroll-mt-32">
              <div className="bg-white dark:bg-[#24283b] rounded-3xl neo-shadow border-2 border-slate-900 dark:border-slate-900 overflow-hidden relative">
                {/* Terminal Header */}
                <div className="bg-slate-100 dark:bg-[#1f2335] px-6 py-4 border-b-2 border-slate-200 dark:border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-400 border border-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-400 border border-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-400 border border-green-500"></div>
                    </div>
                    <div className="text-xs font-bold text-slate-400 font-mono ml-2">
                      bash — 80x24
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm font-bold text-slate-600 dark:text-slate-300 font-mono bg-white dark:bg-slate-800 px-3 py-1 rounded-md shadow-sm">
                    <FileText size={14} className="text-blue-500" /> README.md
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 md:p-12">
                  <div className="mb-8 font-mono text-sm md:text-base text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800/50 p-4 rounded-lg border-l-4 border-amber-500">
                    <span className="text-green-500 font-bold">➜</span>{" "}
                    <span className="text-blue-500 font-bold">~</span>{" "}
                    <span className="text-slate-800 dark:text-slate-200">whoami</span>
                    <br />
                    <span className="text-slate-800 dark:text-white font-bold block mt-2">
                      <Typewriter
                        text="Loading user profile: Saumya Dhakad..."
                        delay={30}
                      />
                    </span>
                  </div>

                  <div className="inline-block px-4 py-1.5 mb-6 text-xs font-black tracking-wider text-amber-700 uppercase bg-amber-100 rounded-full border border-amber-200 dark:text-amber-300 dark:bg-amber-900/30 dark:border-amber-800">
                    Top 1.98% LeetCode
                  </div>

                  <h1 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white mb-8 tracking-tight leading-tight">
                    Hi, I'm{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-orange-500 to-pink-500 animate-pulse">
                      Saumya
                    </span>{" "}
                    <span className="inline-block animate-bounce">👋</span>
                  </h1>

                  <div className="prose dark:prose-invert max-w-none text-slate-600 dark:text-slate-300 leading-relaxed text-lg md:text-xl mb-10 font-medium">
                    <p>
                      I engineer{" "}
                      <span className="bg-yellow-200 dark:bg-yellow-900/40 px-1 rounded text-slate-900 dark:text-white">
                        high-performance backend systems
                      </span>{" "}
                      that scale. Currently a Knight on LeetCode with a passion for optimizing
                      algorithms and database architecture.
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-3 mb-12">
                    {["C++", "Java", "Spring Boot", "MySQL", "System Design", "Algorithms"].map(
                      (tag, i) => {
                        const colors = [
                          "bg-yellow-50 text-yellow-700 border-yellow-300 dark:bg-yellow-900/20 dark:text-yellow-300 dark:border-yellow-700",
                          "bg-pink-50 text-pink-700 border-pink-300 dark:bg-pink-900/20 dark:text-pink-300 dark:border-pink-700",
                          "bg-cyan-50 text-cyan-700 border-cyan-300 dark:bg-cyan-900/20 dark:text-cyan-300 dark:border-cyan-700",
                          "bg-orange-50 text-orange-700 border-orange-300 dark:bg-orange-900/20 dark:text-orange-300 dark:border-orange-700",
                          "bg-purple-50 text-purple-700 border-purple-300 dark:bg-purple-900/20 dark:text-purple-300 dark:border-purple-700"
                        ];
                        return (
                          <Tag
                            key={tag}
                            text={tag}
                            color={colors[i % colors.length]}
                          />
                        );
                      }
                    )}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    {/* Download Button */}
                    <a
                      href={PERSONAL_INFO.socials.resume}
                      download
                      className="flex items-center justify-center gap-2 px-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl font-bold neo-shadow hover:translate-y-[-2px] hover:shadow-lg transition-all"
                    >
                      <Download size={20} /> Download Resume
                    </a>

                    {/* View Online Button */}
                    <a
                      href={PERSONAL_INFO.socials.resume}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 px-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl font-bold neo-shadow hover:translate-y-[-2px] hover:shadow-lg transition-all"
                    >
                      <FileText size={20} /> View Resume
                    </a>
                  </div>
                </div>
              </div>
            </section>
          </FadeInSection>

          {/* SECTION: ACHIEVEMENTS */}
          <FadeInSection delay="100ms">
            <section id="achievements" className="scroll-mt-32">
              <SectionHeader
                title="Technical Journey"
                icon={Star}
                color="bg-yellow-500 text-yellow-500"
              />

              <div className="grid gap-6">
                {ACHIEVEMENTS.map((item, idx) => (
                  <div
                    key={idx}
                    className="bg-white dark:bg-[#24283b] p-8 rounded-2xl border-2 border-slate-100 dark:border-slate-700 neo-shadow hover:border-amber-400 dark:hover:border-amber-400 transition-all group"
                  >
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="flex-shrink-0">
                        <div className="w-16 h-16 rounded-2xl bg-slate-50 dark:bg-[#1f2335] flex items-center justify-center border-2 border-slate-100 dark:border-slate-700 group-hover:scale-110 transition-transform duration-300">
                          {item.icon}
                        </div>
                      </div>
                      <div className="flex-grow">
                        <div className="flex flex-col md:flex-row md:items-center justify-between mb-3">
                          <h3 className="text-2xl font-black text-slate-900 dark:text-white">
                            {item.role}
                          </h3>
                          <span className="text-xs font-black text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 uppercase tracking-widest w-fit mt-2 md:mt-0">
                            {item.period}
                          </span>
                        </div>
                        <ul className="space-y-3 mt-4">
                          {item.details.map((detail, dIdx) => (
                            <li
                              key={dIdx}
                              className="flex items-start gap-3 text-slate-700 dark:text-slate-300 font-bold text-sm md:text-base"
                            >
                              <ChevronRight
                                size={20}
                                strokeWidth={3}
                                className="text-amber-500 mt-0.5 shrink-0"
                              />

                              {detail.link ? (
                                <a
                                  href={detail.link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1 hover:text-amber-500 underline underline-offset-4"
                                >
                                  <span>{detail.text}</span>
                                  <ExternalLink size={14} className="mt-[1px]" />
                                </a>
                              ) : (
                                <span>{detail.text}</span>
                              )}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </FadeInSection>

          {/* SECTION: PROJECTS */}
          <FadeInSection delay="200ms">
            <section id="projects" className="scroll-mt-32">
              <SectionHeader
                title="Projects"
                icon={Folder}
                color="bg-cyan-500 text-cyan-500"
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {PROJECTS.map((project, idx) => (
                  <div
                    key={idx}
                    className="neo-shadow-hover bg-white dark:bg-[#24283b] border-2 border-slate-200 dark:border-slate-700 rounded-3xl p-8 transition-all duration-300 relative overflow-hidden flex flex-col h-full group"
                  >
                    {/* Decorative Top Line */}
                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-amber-400 to-pink-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>

                    <div className="flex justify-between items-start mb-6">
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-orange-50 dark:bg-orange-900/20 rounded-xl border border-orange-100 dark:border-orange-800">
                          <FileCode className="text-orange-500" size={28} />
                        </div>
                        <div>
                          <h3 className="font-black text-2xl text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                            {project.id}
                          </h3>
                          <span className="text-xs font-mono font-bold text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded ml-1">
                            {project.ext}
                          </span>
                        </div>
                      </div>

                      {/* Always show top-right repo link */}
                      <a href={project.repo} target="_blank" rel="noopener noreferrer">
                        <ExternalLink
                          size={24}
                          className="text-slate-300 hover:text-amber-500 hover:rotate-12 transition-all cursor-pointer"
                        />
                      </a>
                    </div>

                    <p className="text-slate-600 dark:text-slate-300 mb-8 leading-relaxed font-medium flex-grow text-lg">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mt-auto">
                      {project.tech.map((tech, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-3 py-1 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-xs font-black uppercase tracking-wider rounded-lg border border-slate-200 dark:border-slate-700"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Play button ONLY if project has a video */}
                    {project.video && (
                      <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
                        <button
                          onClick={() => setVideoPreview(project.video)}
                          className="bg-amber-500 text-white p-3 rounded-full shadow-lg hover:scale-110 transition"
                        >
                          <Play size={20} />
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          </FadeInSection>

          {/* SECTION: CONTACT */}
          <FadeInSection delay="300ms">
            <section id="contact" className="scroll-mt-32">
              <SectionHeader
                title="Contact"
                icon={Mail}
                color="bg-pink-500 text-pink-500"
              />

              <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-3xl p-12 text-center text-white relative overflow-hidden neo-shadow border-4 border-indigo-800">
                <div className="absolute top-0 right-0 -mr-12 -mt-12 w-48 h-48 bg-white opacity-10 rounded-full blur-3xl animate-pulse"></div>
                <div
                  className="absolute bottom-0 left-0 -ml-12 -mb-12 w-48 h-48 bg-yellow-400 opacity-20 rounded-full blur-3xl animate-pulse"
                  style={{ animationDelay: "1s" }}
                ></div>

                <div className="relative z-10">
                  <div className="inline-block p-4 bg-white/10 rounded-2xl mb-6 backdrop-blur-sm border border-white/20">
                    <Coffee size={48} className="text-yellow-300" />
                  </div>
                  <h3 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">
                    Let's Build Something Awesome!
                  </h3>
                  <p className="text-indigo-100 mb-10 max-w-xl mx-auto text-lg md:text-xl font-medium leading-relaxed">
                    I am actively seeking internship opportunities. Drop a mail, check out my code,
                    or connect on LinkedIn.
                  </p>
                  <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <a
                      href={`mailto:${PERSONAL_INFO.email}`}
                      className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-indigo-700 rounded-xl font-black hover:bg-yellow-300 hover:text-indigo-900 transition-all shadow-lg hover:scale-105"
                    >
                      <Mail size={22} /> Say Hello
                    </a>
                    <a
                      href={PERSONAL_INFO.socials.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-indigo-800/50 text-white border border-indigo-400/30 rounded-xl font-black hover:bg-indigo-800 transition-all shadow-lg hover:scale-105 backdrop-blur-sm"
                    >
                      <Linkedin size={22} /> Connect
                    </a>
                  </div>
                </div>
              </div>
            </section>
          </FadeInSection>
        </div>

        {/* Video Modal */}
        {videoPreview && (
          <VideoModal
            video={videoPreview}
            onClose={() => setVideoPreview(null)}
          />
        )}
      </main>
    </div>
  );
}
