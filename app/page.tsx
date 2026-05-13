"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronRight,
  Github,
  Linkedin,
  Mail,
  Book,
  Code,
  Shield,
  Smartphone,
  Globe,
  Users,
  Check,
  Zap,
  Briefcase,
  Cpu,
} from "lucide-react";
import Image from "next/image";

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "skills", "projects", "pricing", "contact"];
      const currentSection = sections.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "projects", label: "Projects" },
    { id: "pricing", label: "Services" },
    { id: "contact", label: "Contact" },
  ];

  const skills = [
    { name: "AI & Machine Learning", level: 90 },
    { name: "Cybersecurity", level: 85 },
    { name: "React", level: 88 },
    { name: "Node.js", level: 85 },
    { name: "PostgreSQL", level: 80 },
    { name: "Mobile App Development", level: 82 },
    { name: "Algorithms & Data Structures", level: 85 },
    { name: "Technical Coaching", level: 90 },
    { name: "Process Optimization", level: 88 },
    { name: "Mentoring", level: 92 },
  ];

  const pricingPlans = [
    {
      icon: Smartphone,
      title: "Application Development",
      price: "Custom",
      duration: "project-based",
      features: ["Full-stack app development", "Mobile and web app expertise", "UI/UX design consultation", "Performance optimization"],
      cta: "Build Your App",
    },
    {
      icon: Briefcase,
      title: "Personal Training Session",
      price: "$100",
      duration: "per session",
      features: ["1-on-1 assessment", "Personalized Plan", "Nutrition"],
      cta: "Begin Journey",
    },
    {
      icon: Cpu,
      title: "Trainers Coaching",
      price: "$150",
      duration: "per consultation",
      features: ["Knowledge Assessment", "Manage Clientele", "Starting your own business", "ad-hoc consulting"],
      cta: "Enhance Your AI",
    },
    {
      icon: Zap,
      title: "Small Business Development",
      price: "Custom",
      duration: "project-based",
      features: ["Infrastructure environment", "Expanding Businesses", "Workflow Automation", "Integration with existing systems"],
      cta: "Expand Your Business",
    },
  ];

  const CircularNodeGraph = () => {
    const [dimensions, setDimensions] = useState({ width: 800, height: 600 });

    useEffect(() => {
      const updateDimensions = () => {
        const width = Math.min(800, window.innerWidth - 40);
        const height = Math.min(600, window.innerHeight - 200);
        setDimensions({ width, height });
      };

      updateDimensions();
      window.addEventListener("resize", updateDimensions);
      return () => window.removeEventListener("resize", updateDimensions);
    }, []);

    const nodePositions = skills.map((_, index) => {
      const angle = (index / skills.length) * 2 * Math.PI;
      const x = dimensions.width / 2 + dimensions.width * 0.35 * Math.cos(angle);
      const y = dimensions.height / 2 + dimensions.height * 0.35 * Math.sin(angle);
      return { x, y };
    });

    return (
      <div className="relative w-full h-full" style={{ minHeight: "600px" }}>
        <svg width={dimensions.width} height={dimensions.height} viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}>
          {skills.map((skill, index) => {
            const { x, y } = nodePositions[index];
            return (
              <g key={index}>
                {skills.map((_, i) => {
                  if (i !== index) {
                    const { x: x2, y: y2 } = nodePositions[i];
                    return (
                      <motion.line
                        key={`${index}-${i}`}
                        x1={x} y1={y} x2={x2} y2={y2}
                        stroke="#64ffda" strokeWidth="1" opacity="0.2"
                        animate={{
                          x1: [x, x + 2, x - 2, x],
                          y1: [y, y - 2, y + 2, y],
                        }}
                        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                      />
                    );
                  }
                  return null;
                })}
                <circle cx={x} cy={y} r={8 + skill.level / 12} fill="#64ffda" />
                <text x={x} y={y + 25} textAnchor="middle" fill="#ccd6f6" fontSize="10" fontWeight="bold">
                  {skill.name}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    );
  };

  return (
    <div className="bg-[#0a192f] text-[#8892b0] min-h-screen font-sans">
      <header className="fixed w-full z-50 bg-[#0a192f]/80 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <a href="#home" className="text-[#64ffda] font-bold text-lg md:text-xl">
            Software Engineer & Consultant
          </a>
          <nav className="hidden md:flex space-x-8">
            {menuItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`text-sm hover:text-[#64ffda] transition-colors ${activeSection === item.id ? "text-[#64ffda]" : ""}`}
              >
                {item.label}
              </a>
            ))}
          </nav>
          <button className="md:hidden text-[#64ffda]" onClick={() => setIsMenuOpen(!isMenuOpen)}>Menu</button>
        </div>
      </header>

      <main>
        <section id="home" className="min-h-screen flex items-center">
          <div className="container mx-auto px-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <h1 className="text-5xl md:text-7xl font-bold text-[#ccd6f6] mb-4">
                Software Engineer and Personal Trainer
              </h1>
              <p className="text-xl md:text-2xl mb-8 max-w-2xl">
                Always curious, always learning, always building. Teamwork isn’t just a value—it’s how we achieve greatness together.
              </p>
              <a href="#projects" className="inline-flex items-center bg-transparent hover:bg-[#64ffda]/10 text-[#64ffda] font-semibold py-2 px-4 border border-[#64ffda] rounded transition-colors">
                View Projects <ChevronRight className="ml-2 h-4 w-4" />
              </a>
            </motion.div>
          </div>
        </section>

        <section id="about" className="py-20">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-[#ccd6f6] mb-8">About Me</h2>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="mb-6 relative w-64 h-64 mx-auto md:mx-0 bg-[#112240] rounded-full overflow-hidden border-2 border-[#64ffda]">
                  <Image
                    src="/images/IMG_6563.jpeg" 
                    alt="Profile"
                    fill
                    className="object-cover"
                    priority
                    unoptimized // Helps if there are issues with Next.js image optimization during build
                  />
                </div>
                <p className="mb-4">Multi-lingual global business manager turned Full Stack Software Engineer...</p>
                <p className="mb-4 text-sm">I bring a unique blend of business acumen and technical expertise to every project.</p>
              </div>
              <div className="bg-[#112240] p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-[#ccd6f6] mb-4">Core Competencies</h3>
                <ul className="grid grid-cols-2 gap-2">
                  {["AI & ML", "Cybersecurity", "Full-Stack", "Mobile Apps", "Optimization", "Mentoring"].map((skill) => (
                    <li key={skill} className="flex items-center text-sm">
                      <ChevronRight className="mr-2 h-4 w-4 text-[#64ffda]" /> {skill}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section id="skills" className="py-20 bg-[#112240]">
            <div className="container mx-auto px-6 text-center">
                <h2 className="text-3xl font-bold text-[#ccd6f6] mb-8">Technical Proficiencies</h2>
                <CircularNodeGraph />
            </div>
        </section>

        <section id="contact" className="py-20">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold text-[#ccd6f6] mb-8">Get in Touch</h2>
            <a
              href="mailto:jjvargas1721@gmail.com"
              className="inline-flex items-center bg-[#64ffda] text-[#0a192f] font-semibold py-3 px-8 rounded hover:bg-[#64ffda]/90 transition-colors"
            >
              Reach Out <Mail className="ml-2 h-4 w-4" />
            </a>
          </div>
        </section>
      </main>

      <footer className="bg-[#0a192f] py-6 border-t border-[#112240]">
        <div className="container mx-auto px-6 text-center">
          <p className="text-xs">Designed & Built by Juan — 2026</p>
        </div>
      </footer>
    </div>
  );
}