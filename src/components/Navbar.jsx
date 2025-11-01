import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Link } from "react-router-dom"
import { Menu, X } from "lucide-react"

const MotionMenu = motion(Menu)
const MotionX = motion(X)

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { name: "Home", to: "/" },
    { name: "About", to: "/about" },
    { name: "Skills", to: "/skills" },
    { name: "Projects", to: "/projects" },
    { name: "Contact", to: "/contact" },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  }

  const itemVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.4, ease: "easeOut" } },
  }

  const menuVariants = {
    hidden: { x: "100%" },
    visible: {
      x: 0,
      transition: { duration: 0.3, ease: "easeInOut" },
    },
    exit: {
      x: "100%",
      transition: { duration: 0.3, ease: "easeInOut" },
    },
  }

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 bg-[#000000] border-b border-emerald-500/20 text-white py-4 px-4 md:px-8 flex justify-between items-center shadow-[0_0_20px_rgba(16,185,129,0.15)]"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Logo */}
      <motion.h1
        className="text-2xl font-bold tracking-wide"
        variants={itemVariants}
      >
        <Link to="/" className="hover:text-emerald-400 transition-colors duration-200 font-light">
          Avishek.
        </Link>
      </motion.h1>

      {/* Desktop Menu */}
      <motion.ul
        className="hidden md:flex space-x-8 text-lg"
        variants={containerVariants}
      >
        {navItems.map((item) => (
          <motion.li key={item.name} variants={itemVariants}>
            <Link
              to={item.to}
              className="hover:text-emerald-400 transition-colors duration-200 font-light relative group"
            >
              {item.name}
              <motion.div
                className="absolute inset-0 rounded-md bg-emerald-500/20 -z-10"
                initial={{ scale: 0, opacity: 0 }}
                whileHover={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.2 }}
              />
            </Link>
          </motion.li>
        ))}
      </motion.ul>

      {/* Mobile Hamburger */}
      <motion.button
        className="md:hidden text-white relative z-60"
        onClick={() => setIsOpen(!isOpen)}
        whileTap={{ scale: 0.95 }}
      >
        <AnimatePresence mode="wait" initial={false}>
          {isOpen ? (
            <MotionX
              key="close"
              initial={{ rotate: 0, scale: 0 }}
              animate={{ rotate: 90, scale: 1 }}
              exit={{ rotate: 0, scale: 0 }}
              transition={{ duration: 0.3, type: "spring" }}
              size={28}
              className="text-emerald-400"
            />
          ) : (
            <MotionMenu
              key="open"
              initial={{ rotate: -90, scale: 0 }}
              animate={{ rotate: 0, scale: 1 }}
              exit={{ rotate: 90, scale: 0 }}
              transition={{ duration: 0.3, type: "spring" }}
              size={28}
              className="text-white"
            />
          )}
        </AnimatePresence>
      </motion.button>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.ul
            className="fixed top-0 right-0 w-64 h-full bg-[#050505] border-l border-emerald-500/20 p-8 flex flex-col space-y-6 text-lg z-50 md:hidden shadow-[0_0_25px_rgba(16,185,129,0.4)]"
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {navItems.map((item) => (
              <motion.li
                key={item.name}
                variants={itemVariants}
                onClick={() => setIsOpen(false)}
              >
                <Link
                  to={item.to}
                  className="hover:text-emerald-400 transition-colors duration-200 block py-2 relative group"
                >
                  {item.name}
                  <motion.div
                    className="absolute inset-0 rounded-md bg-emerald-500/20 -z-10"
                    initial={{ scale: 0, opacity: 0 }}
                    whileHover={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                </Link>
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

export default Navbar
