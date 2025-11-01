import { motion } from "framer-motion"
import { useState } from "react"
import { Link } from "react-router-dom"
import { FaHeart, FaReact, FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa"

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [isSent, setIsSent] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const form = new FormData()
      form.append("access_key", "d8ce9390-db27-49dc-b772-649ff6b82ed9")
      form.append("name", formData.name)
      form.append("email", formData.email)
      form.append("message", formData.message)

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: form,
      })

      const data = await response.json()

      if (data.success) {
        setIsSent(true)
        setFormData({ name: "", email: "", message: "" })
        setTimeout(() => setIsSent(false), 4000)
      } else {
        alert("Something went wrong. Please try again.")
      }
    } catch (error) {
      console.error("Error submitting form:", error)
      alert("Failed to send message. Check your internet or try later.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-black text-white relative overflow-hidden px-6">
      {/* Animated background grid */}
      <motion.div
        className="absolute inset-0 bg-[radial-gradient(white_1.2px,transparent_1px)]"
        style={{ backgroundSize: "18px 18px", opacity: 0.35 }}
        animate={{ backgroundPosition: ["0px 0px", "18px 18px"] }}
        transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
      />

      {/* Title */}
      <motion.h1
        className="text-4xl md:text-6xl font-bold mb-6 z-10 text-emerald-400"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        Contact Me
      </motion.h1>

      {/* Form */}
      <motion.form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-zinc-900 p-6 md:p-8 rounded-2xl shadow-lg z-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <label className="block mb-3">
          <span className="text-gray-300">Name</span>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full mt-2 p-2 rounded-lg bg-black border border-emerald-500 text-white focus:outline-none focus:border-emerald-400"
          />
        </label>

        <label className="block mb-3">
          <span className="text-gray-300">Email</span>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full mt-2 p-2 rounded-lg bg-black border border-emerald-500 text-white focus:outline-none focus:border-emerald-400"
          />
        </label>

        <label className="block mb-3">
          <span className="text-gray-300">Message</span>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows="4"
            className="w-full mt-2 p-2 rounded-lg bg-black border border-emerald-500 text-white focus:outline-none focus:border-emerald-400"
          />
        </label>

        {/* Animated Submit Button */}
        <motion.button
          type="submit"
          disabled={isLoading || isSent}
          whileTap={{ scale: 0.95 }}
          animate={{
            backgroundColor: isSent ? "#3B82F6" : "#10B981",
            color: isSent ? "#fff" : "#000",
          }}
          transition={{ duration: 0.3 }}
          className="w-full mt-4 font-bold py-2 rounded-lg transition text-black flex items-center justify-center space-x-2"
        >
          {isLoading ? (
            <>
              <motion.div
                className="w-5 h-5 border-2 border-t-emerald-400 border-white rounded-full"
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
              />
              <span>Sending...</span>
            </>
          ) : isSent ? (
            "✅ Sent Successfully!"
          ) : (
            "Send Message"
          )}
        </motion.button>
      </motion.form>

      {/* Social Icons */}
      <motion.div
        className="flex items-center space-x-6 mt-6 text-xl z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <motion.a
          href="https://www.linkedin.com/in/avishek-sadhukhan-159158314/"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{
            scale: 1.2,
            color: "#0A66C2",
            textShadow: "0 0 15px #0A66C2",
          }}
          className="text-gray-400 hover:text-emerald-400 transition"
        >
          <FaLinkedin />
        </motion.a>

        <motion.a
          href="https://github.com/psudocode-monk"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{
            scale: 1.2,
            color: "#ffffff",
            textShadow: "0 0 15px #10B981",
          }}
          className="text-gray-400 hover:text-emerald-400 transition"
        >
          <FaGithub />
        </motion.a>

        <motion.a
          href="mailto:avi.codemail@gmail.com"
          whileHover={{
            scale: 1.2,
            color: "#EA4335",
            textShadow: "0 0 15px #EA4335",
          }}
          className="text-gray-400 hover:text-emerald-400 transition"
        >
          <FaEnvelope />
        </motion.a>
      </motion.div>

      {/* Footer */}
      <motion.div
        className="mt-3 flex items-center space-x-2 text-gray-400 z-10 text-sm font-bold"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <span>© {new Date().getFullYear()} Avishek. Made with</span>
        <FaHeart className="text-emerald-500 animate-pulse" />
        <span>and</span>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
        >
          <a
            href="https://react.dev/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-500 hover:underline"
          >
            <FaReact className="text-blue-400" />
          </a>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default Contact
