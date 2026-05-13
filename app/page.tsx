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
  Terminal,
  Lock,
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
    { id: "contact", label: "Contact" },
  ];

  // Updated Skills for the Graph
  const skills = [
    { name: "Cybersecurity (SOC)", level: 90 },
    { name: "Network Security", level: 85 },
    { name: "Threat Hunting", level: 80 },
    { name: "React/Next.js", level: 88 },
    { name: "Python", level: 85 },
    { name: "Linux (Kali)", level: 82 },
    { name: "CompTIA Security+", level: 95 },
    { name: "SQL & Databases", level: 80 },
    { name: "Cloud Security", level: 75 },
  ];

  const pricingPlans = [
    {
      icon: Shield,
      title: "Security Consultation",
      price: "Custom",
      duration: "audit-based",
      features: [
        "Vulnerability Assessments",
        "Network Infrastructure Audit",
        "Security Best Practices",
        "Compliance Guidance",
      ],
      cta: "Secure Your Site",
    },
    {
      icon: Zap,
      title: "Workflow Automation",
      price: "Custom",
      duration: "project-based",
      features: [
        "Python Scripting for Tasks",
        "System Integration",
        "CI/CD Pipeline Setup",
        "Legacy Migration",
      ],
      cta: "Automate Now",
    },
  ];

  // Helper component for the Skill Graph
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
        <svg
          width={dimensions.width}
          height={dimensions.height}
          viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
        >
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
                        x1={x}
                        y1={y}
                        x2={x2}
                        y2={y2}
                        stroke="#64ffda"
                        strokeWidth="1"
                        opacity="0.3"
                        animate={{
                          x1: [x, x + 3, x - 3, x],
                          y1: [y, y - 3, y + 3, y],
                        }}
                        transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
                      />
                    );
                  }
                  return null;
                })}
                <circle cx={x} cy={y} r={8 + skill.level / 12} fill="#64ffda" />
                <text x={x} y={y + 25} textAnchor="middle" fill="#ccd6f6" fontSize="11" fontWeight="bold">
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
            Cybersecurity Analyst | Air Force Reserve
          </a>
          <nav className="hidden md:flex space-x-8">
            {menuItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`text-sm hover:text-[#64ffda] transition-colors ${
                  activeSection === item.id ? "text-[#64ffda]" : ""
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>
          <button className="md:hidden text-[#64ffda]" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            Menu
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            className="fixed inset-y-0 right-0 w-64 bg-[#112240] z-50 p-6 flex flex-col"
          >
            <button className="self-end text-[#64ffda] mb-8" onClick={() => setIsMenuOpen(false)}>
              Close
            </button>
            <nav className="flex flex-col space-y-6">
              {menuItems.map((item) => (
                <a key={item.id} href={`#${item.id}`} className="text-lg" onClick={() => setIsMenuOpen(false)}>
                  {item.label}
                </a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <main>
        {/* Hero Section */}
        <section id="home" className="min-h-screen flex items-center">
          <div className="container mx-auto px-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <h2 className="text-[#64ffda] font-mono mb-4">Hi, my name is</h2>
              <h1 className="text-5xl md:text-7xl font-bold text-[#ccd6f6] mb-4">
                Juan Jose Vargas.
              </h1>
              <h3 className="text-4xl md:text-6xl font-bold text-[#8892b0] mb-8">
                I protect digital landscapes.
              </h3>
              <p className="text-xl max-w-2xl mb-12">
                Cybersecurity Analyst and Air Force Reservist specializing in Defensive Operations,
                Network Security, and Technical Problem Solving. 
              </p>
              <a
                href="#projects"
                className="inline-flex items-center px-6 py-3 border border-[#64ffda] text-[#64ffda] hover:bg-[#64ffda]/10 transition-colors rounded"
              >
                View My Mission <ChevronRight className="ml-2 h-4 w-4" />
              </a>
            </motion.div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-[#ccd6f6] mb-12 flex items-center">
              <span className="text-[#64ffda] font-mono text-xl mr-2">01.</span> About Me
            </h2>
            <div className="grid md:grid-cols-2 gap-12">
              <div className="space-y-4">
                <p>
                  Multi-lingual professional and <strong>Air Force Reservist</strong> transitioning into <strong>Cybersecurity and Information Technology</strong>. I combine military-grade discipline with a Full Stack development background to protect digital infrastructure.
                </p>
                <p>
                  As a 3E2 in the Air Force Reserve and a lifelong learner, I thrive in mission-critical environments. I specialize in identifying vulnerabilities and automating security workflows, leveraging my foundation in software engineering to understand the architecture of threats.
                </p>
                <p>
                  Currently pursuing a degree at <strong>Western Governors University</strong> and preparing for the <strong>CompTIA Security+</strong> certification, I am dedicated to mastering the tools of the trade—from SIEM platforms like Splunk to network analysis with Wireshark.
                </p>
                <p>
                  Proficient in <strong>JavaScript, React, Python, and SQL</strong>, I am continuously expanding my knowledge in Defensive Security Operations (SOC), Cloud Security, and Incident Response.
                </p>
              </div>
              <div className="relative group max-w-sm mx-auto">
                <div className="absolute inset-0 border-2 border-[#64ffda] translate-x-4 translate-y-4 rounded group-hover:translate-x-2 group-hover:translate-y-2 transition-transform"></div>
                <div className="relative aspect-square bg-[#64ffda] rounded overflow-hidden">
                  <Image
                    src="/images/IMG_6563.jpeg"
                    alt="Juan Jose Vargas"
                    fill
                    className="object-cover grayscale hover:grayscale-0 transition-all duration-300"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-20 bg-[#112240]">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold text-[#ccd6f6] mb-8">Technical Proficiencies</h2>
            <div className="flex justify-center">
               <CircularNodeGraph />
            </div>
          </div>
        </section>

        {/* Learning Section */}
        <section id="learning" className="py-20">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-[#ccd6f6] mb-12">Current Education & Certifications</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: Terminal,
                  title: "WGU",
                  description: "BS in Cybersecurity and Information Assurance. Focused on Network Security and Risk Management.",
                },
                {
                  icon: Shield,
                  title: "Security+",
                  description: "Preparing for CompTIA Security+ certification to validate core security knowledge.",
                },
                {
                  icon: Code,
                  title: "Full Stack Mastery",
                  description: "Rutgers Bootcamp Graduate with expertise in the MERN stack and Python automation.",
                },
              ].map((item, i) => (
                <div key={i} className="bg-[#112240] p-8 rounded hover:-translate-y-2 transition-transform">
                  <item.icon className="text-[#64ffda] h-10 w-10 mb-4" />
                  <h3 className="text-xl font-bold text-[#ccd6f6] mb-2">{item.title}</h3>
                  <p className="text-sm">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 text-center">
          <div className="container mx-auto px-6 max-w-2xl">
            <h2 className="text-[#64ffda] font-mono mb-4">What's Next?</h2>
            <h2 className="text-4xl md:text-5xl font-bold text-[#ccd6f6] mb-6">Get In Touch</h2>
            <p className="mb-10">
              I’m currently looking for new opportunities in Cybersecurity or IT roles. 
              Whether you have a question or just want to say hi, my inbox is always open!
            </p>
            <a
              href="mailto:jjvargas1721@gmail.com"
              className="inline-block px-10 py-4 border border-[#64ffda] text-[#64ffda] rounded hover:bg-[#64ffda]/10 transition-colors"
            >
              Contact Me
            </a>
            
            <div className="mt-12 flex justify-center space-x-8">
                <a href="https://github.com/jv0321" className="hover:text-[#64ffda] transition-colors"><Github /></a>
                <a href="https://www.linkedin.com/in/juan-jose-vargas-molina-55b504299/" className="hover:text-[#64ffda] transition-colors"><Linkedin /></a>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-8 text-center border-t border-[#112240]">
        <p className="text-xs font-mono">
          Designed & Built by Juan Jose Vargas
        </p>
      </footer>
    </div>
  );
} //