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
  ExternalLink,
} from "lucide-react";
import Image from "next/image";

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "skills", "projects", "contact"];
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

  // Projects imported from your GitHub README
  const projects = [
    {
      title: "Phishing Email Detector",
      description: "Python-based tool that analyzes email headers, URLs, and content to identify phishing attempts using pattern matching and threat intelligence.",
      tech: ["Python", "Threat Intel", "Security Automation"],
      link: "https://github.com/jv0321",
    },
    {
      title: "Malware Analysis Sandbox",
      description: "Documented malware behavior analysis lab using REMnux and FlareVM. Includes static and dynamic analysis reports on real malware samples.",
      tech: ["REMnux", "FlareVM", "Incident Response"],
      link: "https://github.com/jv0321",
    },
    {
      title: "Splunk SIEM Alert Lab",
      description: "Simulated SOC environment ingesting BOTS datasets. Includes custom detection rules, dashboards, and full incident response workflow.",
      tech: ["Splunk", "SIEM", "Log Analysis"],
      link: "https://github.com/jv0321",
    },
    {
      title: "Network Threat Detection",
      description: "Python script using Scapy/PyShark to detect IOCs in live or captured traffic including port scans and C2 beaconing patterns.",
      tech: ["Python", "Scapy", "Wireshark"],
      link: "https://github.com/jv0321",
    },
    {
      title: "Vulnerability Assessment",
      description: "Full assessment against Metasploitable and DVWA using Nessus. Includes risk-rated findings and remediation guidance.",
      tech: ["Nessus", "Vulnerability Mgmt", "Risk Assessment"],
      link: "https://github.com/jv0321",
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
                        x1={x} y1={y} x2={x2} y2={y2}
                        stroke="#64ffda"
                        strokeWidth="1"
                        opacity="0.2"
                        animate={{ x1: [x, x + 2, x], y1: [y, y - 2, y] }}
                        transition={{ duration: 8, repeat: Infinity }}
                      />
                    );
                  }
                  return null;
                })}
                <circle cx={x} cy={y} r={8 + skill.level / 15} fill="#64ffda" />
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
          <a href="#home" className="text-[#64ffda] font-mono font-bold">
            JV.SHIELD
          </a>
          <nav className="hidden md:flex space-x-8">
            {menuItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`text-xs font-mono hover:text-[#64ffda] transition-colors ${
                  activeSection === item.id ? "text-[#64ffda]" : ""
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>
          <button className="md:hidden text-[#64ffda]" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <Terminal className="h-6 w-6" />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
            className="fixed inset-y-0 right-0 w-64 bg-[#112240] z-50 p-6 flex flex-col"
          >
            <button className="self-end text-[#64ffda] mb-8" onClick={() => setIsMenuOpen(false)}>Close</button>
            <nav className="flex flex-col space-y-6">
              {menuItems.map((item) => (
                <a key={item.id} href={`#${item.id}`} className="text-lg font-mono" onClick={() => setIsMenuOpen(false)}>
                  {item.label}
                </a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <main>
        <section id="home" className="min-h-screen flex items-center">
          <div className="container mx-auto px-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <h2 className="text-[#64ffda] font-mono mb-4">Establishing secure connection...</h2>
              <h1 className="text-5xl md:text-7xl font-bold text-[#ccd6f6] mb-4">Juan Jose Vargas.</h1>
              <h3 className="text-4xl md:text-6xl font-bold text-[#8892b0] mb-8">Defending Digital Assets.</h3>
              <p className="text-lg max-w-2xl mb-12">
                Cybersecurity Analyst and Air Force Reservist. I specialize in SOC operations, 
                incident response, and building defensive automation.
              </p>
              <a href="#projects" className="inline-flex items-center px-6 py-3 border border-[#64ffda] text-[#64ffda] hover:bg-[#64ffda]/10 transition-colors rounded font-mono text-sm">
                GO TO PROJECTS <ChevronRight className="ml-2 h-4 w-4" />
              </a>
            </motion.div>
          </div>
        </section>

        <section id="about" className="py-20">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-[#ccd6f6] mb-12 flex items-center">
              <span className="text-[#64ffda] font-mono text-xl mr-2">01.</span> About Me
            </h2>
            <div className="grid md:grid-cols-2 gap-12">
              <div className="space-y-4 text-md">
                <p>
                  I am an <strong>Air Force Reservist</strong> and <strong>Cybersecurity Analyst</strong> dedicated to mastering the art of defense. My transition from Full-Stack development to Security allows me to understand the code-level architecture of modern threats.
                </p>
                <p>
                  Recently, I completed the <strong>Cybersecurity Analyst Bootcamp at UT Dallas</strong>, where I gained hands-on experience in log analysis, threat hunting, and vulnerability management.
                </p>
                <p>
                  I thrive in mission-critical environments, combining military discipline with technical agility. Whether it's analyzing PCAPs or automating security alerts with Python, I am focused on minimizing risk and maximizing resilience.
                </p>
              </div>
              <div className="relative group max-w-sm mx-auto">
                <div className="absolute inset-0 border-2 border-[#64ffda] translate-x-4 translate-y-4 rounded group-hover:translate-x-2 group-hover:translate-y-2 transition-transform"></div>
                <div className="relative aspect-square bg-[#112240] rounded overflow-hidden">
                  <Image src="/images/IMG_6563.jpeg" alt="Juan Jose Vargas" fill className="object-cover grayscale hover:grayscale-0 transition-all duration-300" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="skills" className="py-20 bg-[#112240]">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold text-[#ccd6f6] mb-8">Defensive Skill Matrix</h2>
            <div className="flex justify-center">
              <CircularNodeGraph />
            </div>
          </div>
        </section>

        <section id="projects" className="py-20">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-[#ccd6f6] mb-12 flex items-center">
              <span className="text-[#64ffda] font-mono text-xl mr-2">02.</span> Featured Labs
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project, index) => (
                <motion.div 
                  key={index} 
                  whileHover={{ y: -5 }}
                  className="bg-[#112240] p-8 rounded-lg flex flex-col h-full shadow-lg border border-transparent hover:border-[#64ffda]/30 transition-all"
                >
                  <div className="flex justify-between items-center mb-6">
                    <Shield className="text-[#64ffda] h-8 w-8" />
                    <div className="flex space-x-4">
                      <a href={project.link} target="_blank" rel="noreferrer" className="text-[#8892b0] hover:text-[#64ffda]">
                        <Github className="h-5 w-5" />
                      </a>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-[#ccd6f6] mb-3">{project.title}</h3>
                  <p className="text-[#8892b0] text-sm mb-6 flex-grow">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.tech.map((t, i) => (
                      <span key={i} className="text-[#64ffda] font-mono text-[10px] bg-[#64ffda]/10 px-2 py-1 rounded">
                        {t}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="py-32 text-center">
          <div className="container mx-auto px-6 max-w-2xl">
            <h2 className="text-[#64ffda] font-mono mb-4 text-sm">03. End of Line</h2>
            <h2 className="text-4xl font-bold text-[#ccd6f6] mb-6">Get In Touch</h2>
            <p className="mb-10 text-[#8892b0]">
              I'm actively seeking SOC Analyst or IT Security roles. 
              If you have a project or a position that needs a disciplined defender, let's talk.
            </p>
            <a href="mailto:jjvargas1721@gmail.com" className="inline-block px-10 py-4 border border-[#64ffda] text-[#64ffda] rounded font-mono hover:bg-[#64ffda]/10 transition-colors">
              ping @juanvargas
            </a>
            <div className="mt-16 flex justify-center space-x-8">
              <a href="https://github.com/jv0321" target="_blank" rel="noreferrer" className="text-[#8892b0] hover:text-[#64ffda]"><Github /></a>
              <a href="https://www.linkedin.com/in/juan-jose-vargas-molina-55b504299/" target="_blank" rel="noreferrer" className="text-[#8892b0] hover:text-[#64ffda]"><Linkedin /></a>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-8 text-center border-t border-[#112240]">
        <p className="text-[10px] font-mono text-[#495670]">
          Built by Juan Jose Vargas | Protocol: Secure
        </p>
      </footer>
    </div>
  );
}