import React from "react";
import { motion } from "framer-motion";
import {
  FaReact,
  FaNodeJs,
  FaJava,
  FaHtml5,
  FaCss3Alt,
  FaGithub,
  FaDatabase,
} from "react-icons/fa";
import {
  SiMongodb,
  SiTailwindcss,
  SiJavascript,
  SiExpress,
  SiFirebase,
} from "react-icons/si";

const Skills = () => {
  const icons = [
    { Icon: FaHtml5, label: "HTML" },
    { Icon: FaCss3Alt, label: "CSS" },
    { Icon: SiJavascript, label: "JavaScript" },
    { Icon: FaReact, label: "React.js" },
    { Icon: SiTailwindcss, label: "Tailwind CSS" },
    { Icon: FaNodeJs, label: "Node.js" },
    { Icon: SiExpress, label: "Express.js" },
    { Icon: SiMongodb, label: "MongoDB" },
    { Icon: FaJava, label: "Java" },
    { Icon: FaDatabase, label: "SQL" },
    { Icon: FaGithub, label: "Git & GitHub" },
    { Icon: SiFirebase, label: "Firebase" },
  ];

  const marqueeIcons = [...icons, ...icons];

  return (
    <section className="relative min-h-screen bg-linear-to-br from-[#000000] via-[#0a0a0a] to-[#001a1a]/30 text-white overflow-hidden flex items-center justify-center px-4 sm:px-6 lg:px-8">
      
      {/* SINGLE SUBTLE MARQUEE BACKGROUND */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute bottom-1/3 flex gap-16 text-6xl sm:text-7xl md:text-8xl whitespace-nowrap"
          animate={{ x: [0, -50 + "%"] }}
          transition={{
            x: {
              duration: 60,
              repeat: Infinity,
              ease: "linear",
            },
          }}
          style={{ filter: "blur(0.8px)" }} /* Sharper for visibility */
        >
          {marqueeIcons.map((item, idx) => (
            <div
              key={idx}
              className="text-emerald-400/20 transition-opacity duration-300"
            >
              <item.Icon />
            </div>
          ))}
        </motion.div>
      </div>

      {/* FOREGROUND: SKILLS GRID */}
      <motion.div
        className="relative z-10 max-w-5xl w-full text-center"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 bg-linear-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
          Skills & Expertise
        </h2>
        <p className="text-lg md:text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
          I craft scalable, high-performance web solutions using the modern web
          stack. From elegant front-end interfaces to efficient back-end logic,
          I build systems that drive growth, enhance usability, and improve
          performance.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
          {icons.map((item, idx) => (
            <motion.div
              key={idx}
              className="group"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.05, duration: 0.4 }}
              viewport={{ once: true }}
            >
              <div className="bg-white/5 backdrop-blur-xl border border-emerald-400/20 rounded-2xl p-4 md:p-5 text-center transition-all duration-300 group-hover:bg-emerald-500/10 group-hover:border-emerald-400/40 group-hover:shadow-2xl group-hover:shadow-emerald-500/20 group-hover:scale-105">
                <item.Icon className="w-8 h-8 md:w-10 md:h-10 mx-auto mb-2 text-emerald-400 group-hover:scale-110 transition-transform" />
                <p className="text-xs md:text-sm font-semibold text-gray-200">
                  {item.label}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Skills;