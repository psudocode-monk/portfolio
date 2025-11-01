import React from "react"
import { motion } from "framer-motion"

const About = () => {
  // Generate particles
  const particles = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: 3 + Math.random() * 5, // bigger
    duration: 6 + Math.random() * 6, // faster cycle (6–12s)
    delay: Math.random() * 5,
    opacity: 0.6 + Math.random() * 0.4, // brighter
  }))

  return (
    <section className="relative min-h-screen bg-linear-to-br from-black via-gray-900 to-emerald-900/20 text-white overflow-hidden flex items-center justify-center px-6 py-16">
      {/* Floating Particle Field */}
      <div className="absolute inset-0 pointer-events-none">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute bg-emerald-400 rounded-full mix-blend-screen filter blur-[2px] drop-shadow-[0_0_6px_#10b981]"
            style={{
              width: `${p.size}px`,
              height: `${p.size}px`,
              top: `${p.y}vh`,
              left: `${p.x}vw`,
            }}
            animate={{
              x: [
                `${p.x}vw`,
                `${p.x + (Math.random() * 25 - 12)}vw`,
                `${p.x + (Math.random() * 50 - 25)}vw`,
                `${p.x}vw`,
              ],
              y: [
                `${p.y}vh`,
                `${p.y + (Math.random() * 25 - 12)}vh`,
                `${p.y + (Math.random() * 50 - 25)}vh`,
                `${p.y}vh`,
              ],
              opacity: [p.opacity, p.opacity * 0.9, p.opacity * 1.2, p.opacity],
              scale: [1, 1.3, 0.8, 1],
            }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Text Section */}
      <div className="relative z-10 max-w-3xl text-center space-y-6">
        <motion.h2
          className="text-4xl sm:text-5xl font-bold bg-linear-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          viewport={{ once: true }}
        >
          About Me
        </motion.h2>

        <motion.p
          className="text-lg text-gray-300 leading-relaxed"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          viewport={{ once: true }}
        >
          I’m a developer who focuses on creating solutions that drive growth and scalability.
          My strength lies in turning complex problems into clean, maintainable systems —
          whether it’s optimizing performance, building robust APIs, or refining user experiences
          for better engagement. I believe in writing code that doesn’t just work, but helps
          teams move faster, deploy safer, and innovate without friction.
        </motion.p>

        <motion.p
          className="text-lg text-gray-300 leading-relaxed"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          viewport={{ once: true }}
        >
          With solid experience in JavaScript, React, and backend technologies, I focus on
          designing systems that are efficient, secure, and built to last. My approach blends
          technical precision with business awareness — ensuring that every line of code
          contributes to a company’s long-term goals, not just short-term delivery.
        </motion.p>
      </div>
    </section>
  )
}

export default About
