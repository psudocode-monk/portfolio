/*  Project.jsx  */
import React, { useState, useMemo } from "react";
import {
  motion,
  AnimatePresence,
  useAnimationControls,
} from "framer-motion";
import { FaGithub, FaSearch, FaTimes } from "react-icons/fa";

const projects = [
  {
    title: "Maach Bhaat - Social Media & Food",
    stack: "MongoDB, Express.js, Node.js, React.js, ImageKit",
    date: "Sept 2025",
    github: "https://github.com/psudocode-monk/maach-bhaat",
    details: [
      "10+ features including authentication, video uploads, like/save functionality, and partner profiles in a full-stack MERN app.",
      "100% responsive UI using React + Tailwind ensuring smooth UX across devices.",
      "Optimized backend API response time by 30% for faster video and data retrieval.",
      "Implemented JWT + cookie-based auth for secure, role-specific access.",
    ],
  },
  {
    title: "MovieVault - Films Organized Beautifully",
    stack: "React.js, Tailwind, Express.js, Node.js, MongoDB",
    date: "Oct 2025",
    github: "https://github.com/psudocode-monk/movie-tracker-app",
    details: [
      "JWT-secured user access eliminating unauthorized API hits.",
      "Full CRUD operations with 9+ optimized endpoints under 200ms latency.",
      "70% faster UI synchronization after CRUD operations with minimal rerenders.",
      "Fully responsive design tested across 10+ screen sizes.",
    ],
  },
  {
    title: "Cravezy - Config Driven Food Delivery App",
    stack: "Swiggy API, JavaScript, React.js, Redux.js",
    date: "June–July 2025",
    github: "https://github.com/psudocode-monk/cravezy",
    details: [
      "Developed 20+ reusable components reducing code duplication by 60%.",
      "Achieved pixel-perfect responsiveness from 375px to 1440px.",
      "Redux Toolkit cart system handling 1000+ items smoothly with persistence.",
      "Implemented client-side routing for 5+ pages with optimized SPA navigation.",
    ],
  },
];

/* -------------------------------------------------------------------------- */
/*                               MAIN COMPONENT                               */
/* -------------------------------------------------------------------------- */
const Project = () => {
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState("");

  /* ---- Filter projects (memoized) ---- */
  const filtered = useMemo(() => {
    if (!search.trim()) return projects;
    const term = search.toLowerCase();
    return projects.filter(
      (p) =>
        p.title.toLowerCase().includes(term) ||
        p.stack.toLowerCase().includes(term) ||
        p.date.toLowerCase().includes(term)
    );
  }, [search]);

  /* ---- Reset animation for the search bar ---- */
  const searchCtrl = useAnimationControls();
  const resetSearch = () => {
    setSearch("");
    searchCtrl.start({ scaleX: 0, transition: { duration: 0.2 } });
  };

  return (
    <section className="relative min-h-screen bg-black text-white px-6 py-20 flex flex-col items-center overflow-hidden">
      {/* Animated grid background */}
      <motion.div
        className="absolute inset-0 opacity-50 bg-[linear-gradient(to_right,rgba(16,185,129,0.25)_2px,transparent_2px),linear-gradient(to_bottom,rgba(16,185,129,0.25)_2px,transparent_2px)] bg-size-[60px_60px] blur-[1px]"
        animate={{ backgroundPosition: ["0px 0px", "60px 60px"] }}
        transition={{ repeat: Infinity, repeatType: "mirror", duration: 6, ease: "linear" }}
      />

      {/* Title */}
      <motion.h2
        className="text-4xl font-bold text-emerald-400 mb-6 tracking-wide relative z-10"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Projects
      </motion.h2>

      {/* ---- SEARCH + RESET ---- */}
      <motion.div
        className="relative w-full max-w-xl mb-12 z-10"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex items-center bg-gray-900/60 backdrop-blur-md border border-emerald-500/30 rounded-full overflow-hidden">
          <FaSearch className="ml-4 text-emerald-400" />
          <input
            type="text"
            placeholder="Search by title, stack, or date..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full py-3 px-4 bg-transparent text-white placeholder-gray-500 focus:outline-none"
          />
          {/* Reset button – appears only when there is text */}
          <AnimatePresence>
            {search && (
              <motion.button
                className="mr-3 text-gray-400 hover:text-emerald-400"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                onClick={resetSearch}
                whileHover={{ rotate: 90 }}
              >
                <FaTimes />
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        {/* Animated underline for the input */}
        <motion.div
          className="absolute bottom-0 left-0 h-0.5 bg-emerald-400 origin-left"
          initial={{ scaleX: 0 }}
          animate={searchCtrl}
          style={{ width: "100%" }}
        />
      </motion.div>

      {/* ---- PROJECT GRID ---- */}
      <motion.div
        className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 max-w-7xl w-full relative z-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.15 } },
        }}
      >
        {/* Empty state */}
        {filtered.length === 0 ? (
          <motion.p
            className="col-span-full text-center text-gray-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            No projects match your search.
          </motion.p>
        ) : (
          filtered.map((project, idx) => (
            <motion.div
              key={idx}
              className="group relative bg-linear-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl border border-emerald-500/20 hover:border-emerald-400/60 p-8 shadow-lg hover:shadow-[0_0_40px_rgba(16,185,129,0.4)] transition-all duration-500 cursor-pointer flex flex-col justify-between min-h-[330px]"
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
              }}
              whileHover={{ y: -10 }}
            >
              <div>
                <h3 className="text-2xl font-semibold text-emerald-300 mb-3">
                  {project.title}
                </h3>
                <p className="text-sm text-gray-400">{project.stack}</p>
                <p className="text-xs text-gray-500 mt-1">{project.date}</p>
              </div>

              <div className="flex justify-between items-center mt-6">
                <motion.button
                  className="text-sm text-emerald-400 font-medium hover:text-emerald-300 transition"
                  onClick={() => setSelected(project)}
                  whileTap={{ scale: 0.95 }}
                >
                  View Details
                </motion.button>

                <motion.a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition"
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FaGithub size={24} />
                </motion.a>
              </div>
            </motion.div>
          ))
        )}
      </motion.div>

      {/* ---- MODAL ---- */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative bg-linear-to-br from-gray-900 via-gray-800 to-gray-900 border border-emerald-500/30 rounded-2xl max-w-2xl w-full p-8 shadow-lg"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 120, damping: 15 }}
            >
              <button
                className="absolute top-3 right-4 text-gray-400 hover:text-emerald-400 text-2xl"
                onClick={() => setSelected(null)}
              >
                x
              </button>

              <h3 className="text-2xl font-semibold text-emerald-300 mb-3">
                {selected.title}
              </h3>
              <p className="text-sm text-gray-400 mb-1">{selected.stack}</p>
              <p className="text-xs text-gray-500 mb-5">{selected.date}</p>

              <ul className="list-disc list-inside text-gray-300 space-y-2">
                {selected.details.map((d, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08 }}
                  >
                    {d}
                  </motion.li>
                ))}
              </ul>

              <motion.a
                href={selected.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 mt-6 text-emerald-400 hover:text-emerald-300 transition text-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaGithub className="text-xl" /> View Repository
              </motion.a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Project;