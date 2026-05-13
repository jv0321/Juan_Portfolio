"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ChevronRight,
  Code,
  Shield,
  Globe,
  Zap,
  Briefcase,
  Search,
  Terminal,
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
      if (currentSection) setActiveSection(currentSection);
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
    { name: "Splunk / SIEM", level: 90 },
    { name: "Cybersecurity", level: 95 },
    { name: "Network Security", level: 85 },
    { name: "React / Node.js", level: 88 },
    { name: "Python Automation", level: 85 },
    { name: "Vulnerability Assessment", level: 82 },
    { name: "Technical Coaching", level: 90 },
    { name: "Process Optimization", level: 88 },
  ];

  // Commented out to prevent build errors while unused
  /* const pricingPlans = [
    {
      icon: Shield,
      title: "Security Consultation",
      price: "Custom",
      duration: "per assessment",
      features: ["Vulnerability Scanning", "Infrastructure Audit", "Security Awareness Training", "Incident Response Planning"],
      cta: "Secure Your Biz",
    },
    {
      icon: Smartphone,
      title: "App Development",
      price: "Custom",
      duration: "project-based",
      features: ["Full-stack development", "Security-first architecture", "UI/UX consultation", "Performance tuning"],
      cta: "Build Your App",
    },
    {
      icon: Briefcase,
      title: "Personal Training",
      price: "$100",
      duration: "per session",
      features: ["1-on-1 assessment", "Personalized Plan", "Nutritional Guidance"],
      cta: "Begin Journey",
    },
    {
      icon: Zap,
      title: "Workflow Automation",
      price: "Custom",
      duration: "project-based",
      features: ["Infrastructure setup", "Expanding Businesses", "Python Automation", "System Integration"],
      cta: "Automate Today",
    },
  ];
  */

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
      <div className="relative w-full h-full flex justify-center items-center" style={{ minHeight: "500px" }}>
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
                        stroke="#64ffda" strokeWidth="1" opacity="0.3"
                        animate={{ opacity: [0.1, 0.4, 0.1] }}
                        transition={{ duration: 5, repeat: Infinity }}
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
    <div className="bg-[#0a192f] text-[#8892b0] min-h-screen font-sans selection:bg-[#64ffda] selection:text-[#0a192f]">
      <header className="fixed w-full z-50 bg-[#0a192f]/80 backdrop-blur-sm border-b border-[#112240]">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <a href="#home" className="text-[#64ffda] font-mono text-lg">
            Juan Vargas // Cyber & Dev
          </a>
          <nav className="hidden md:flex space-x-8">
            {menuItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`text-sm font-mono hover:text-[#64ffda] transition-colors ${activeSection === item.id ? "text-[#64ffda]" : ""}`}
              >
                {item.label}
              </a>
            ))}
          </nav>
          <button className="md:hidden text-[#64ffda]" onClick={() => setIsMenuOpen(!isMenuOpen)}>Menu</button>
        </div>
      </header>

      <main>
        {/* HERO SECTION */}
        <section id="home" className="min-h-screen flex items-center">
          <div className="container mx-auto px-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <p className="text-[#64ffda] font-mono mb-4">Hi, my name is</p>
              <h1 className="text-5xl md:text-7xl font-bold text-[#ccd6f6] mb-4">Juan Jose Vargas Molina.</h1>
              <h2 className="text-4xl md:text-6xl font-bold text-[#8892b0] mb-8">Air Force Reservist & Cybersecurity Analyst.</h2>
              <p className="text-xl max-w-2xl mb-12">
                I specialize in building secure, scalable applications and protecting digital infrastructure. Currently focused on defensive security operations and military-grade discipline.
              </p>
              <div className="flex gap-4">
                <a href="#projects" className="bg-transparent hover:bg-[#64ffda]/10 text-[#64ffda] font-mono py-3 px-6 border border-[#64ffda] rounded transition-all">
                  Check out my projects
                </a>
                <a href="mailto:jjvargas1721@gmail.com" className="bg-[#64ffda] hover:bg-[#64ffda]/90 text-[#0a192f] font-mono py-3 px-6 rounded transition-all">
                  Get in touch
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ABOUT SECTION */}
        <section id="about" className="py-24">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-[#ccd6f6] mb-12 flex items-center">
              <span className="text-[#64ffda] font-mono mr-2 text-xl">01.</span> About Me
            </h2>
            <div className="grid md:grid-cols-2 gap-12">
              <div className="space-y-4">
                <p>
                  I am a professional with a diverse background, transitioning from global business management into <span className="text-[#64ffda]">Cybersecurity and Software Engineering</span>.
                </p>
                <p>
                  As a proud <span className="text-[#64ffda]">Air Force Reservist</span>, I bring a high level of discipline, integrity, and technical focus to every project I touch. My goal is to leverage my Finance degree and technical training to secure organizational assets in complex environments.
                </p>
                <ul className="grid grid-cols-2 gap-2 font-mono text-sm mt-6">
                  {["Splunk", "Kali Linux", "Wireshark", "Python", "React", "SQL"].map(s => (
                    <li key={s} className="flex items-center"><ChevronRight className="h-3 w-3 text-[#64ffda] mr-2"/>{s}</li>
                  ))}
                </ul>
              </div>
              <div className="relative group max-w-xs mx-auto">
                <div className="absolute inset-0 border-2 border-[#64ffda] rounded translate-x-4 translate-y-4 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform"></div>
                <div className="relative aspect-square overflow-hidden rounded bg-[#64ffda]/20 group-hover:bg-transparent transition-colors">
                  <Image src="/images/IMG_6563.jpeg" alt="Juan Vargas" fill className="object-cover grayscale hover:grayscale-0 transition-all" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SKILLS GRAPH */}
        <section id="skills" className="py-24 bg-[#112240]">
           <div className="container mx-auto px-6">
             <h2 className="text-3xl font-bold text-[#ccd6f6] mb-8">Technical Proficiencies</h2>
             <CircularNodeGraph />
           </div>
        </section>

        {/* PROJECTS SECTION */}
        <section id="projects" className="py-24">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-[#ccd6f6] mb-12 flex items-center">
              <span className="text-[#64ffda] font-mono mr-2 text-xl">02.</span> Projects
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  icon: Terminal,
                  title: "Phishing Email Analyzer",
                  subText: "A Python-based tool that parses email headers, checks for SPF/DKIM alignment, and flags look-alike domains using fuzzy logic.",
                  repoURL: "https://github.com/jv0321",
                },
                {
                  icon: Search,
                  title: "SOC Lab: Incident Response",
                  subText: "Simulated a ransomware outbreak in a virtualized lab. Used Splunk to detect IOCs and created a full incident report.",
                  repoURL: "https://github.com/jv0321",
                },
                {
                  icon: Globe,
                  title: "Weather Dashboard",
                  subText: "Full-stack application showing current and 5-day weather. Integrated with OpenWeather API and local storage history.",
                  repoURL: "https://github.com/jv0321/Weather_Dashboard",
                },
                {
                   icon: Code,
                   title: "Holiday Geofactor",
                   subText: "A geospatial application built during my Full Stack bootcamp to help users map out global travel milestones.",
                   repoURL: "https://github.com/TIrwin19/Holiday_GeoFactor",
                }
              ].map((project, i) => (
                <div key={i} className="bg-[#112240] p-8 rounded border-b-4 border-transparent hover:border-[#64ffda] transition-all hover:-translate-y-2 group">
                  <project.icon className="h-10 w-10 text-[#64ffda] mb-6" />
                  <h3 className="text-xl font-bold text-[#ccd6f6] mb-4">{project.title}</h3>
                  <p className="text-sm mb-6 leading-relaxed">{project.subText}</p>
                  <a href={project.repoURL} target="_blank" className="text-[#64ffda] font-mono text-xs flex items-center hover:gap-2 transition-all">
                    VIEW SOURCE <ChevronRight className="h-3 w-3" />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* LEARNING SECTION */}
        <section id="learning" className="py-24 bg-[#112240]">
           <div className="container mx-auto px-6 text-center">
              <h2 className="text-3xl font-bold text-[#ccd6f6] mb-12">Academic Foundation</h2>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="p-6 bg-[#0a192f] rounded">
                  <Shield className="h-8 w-8 text-[#64ffda] mx-auto mb-4" />
                  <h4 className="text-white font-bold">UTD / Fullstack Academy</h4>
                  <p className="text-sm">Cybersecurity Analyst Bootcamp</p>
                </div>
                <div className="p-6 bg-[#0a192f] rounded">
                  <Code className="h-8 w-8 text-[#64ffda] mx-auto mb-4" />
                  <h4 className="text-white font-bold">Rutgers University</h4>
                  <p className="text-sm">Full Stack Web Development</p>
                </div>
                <div className="p-6 bg-[#0a192f] rounded">
                  <Briefcase className="h-8 w-8 text-[#64ffda] mx-auto mb-4" />
                  <h4 className="text-white font-bold">Torrens University</h4>
                  <p className="text-sm">Bachelor of Commerce (Finance)</p>
                </div>
              </div>
           </div>
        </section>

        {/* CONTACT SECTION */}
        <section id="contact" className="py-24 text-center">
          <div className="container mx-auto px-6 max-w-2xl">
            <h2 className="text-4xl font-bold text-[#ccd6f6] mb-4">Get In Touch</h2>
            <p className="mb-12">Currently looking for opportunities in Defensive Security (SOC) and Software Engineering. Whether you have a question or just want to say hi, my inbox is always open!</p>
            <a href="mailto:jjvargas1721@gmail.com" className="inline-block border border-[#64ffda] text-[#64ffda] font-mono py-4 px-10 rounded hover:bg-[#64ffda]/10 transition-all">
              Say Hello
            </a>
          </div>
        </section>
      </main>

      <footer className="py-8 text-center border-t border-[#112240] font-mono text-xs">
        <p>Built by Juan Vargas // 2026 // Air Force Reserve 3E2</p>
      </footer>
    </div>
  );
}