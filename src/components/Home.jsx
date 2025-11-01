import React, { useEffect, useState, useRef } from "react";
import Typewriter from "typewriter-effect";

const randomSnippets = [
  "const greet = (name) => `Hello, ${name}!`",
  "const sum = (a, b) => a + b",
  "const fetchData = async () => await fetch('/api/data')",
  "const user = { name: 'Avi', role: 'Full Stack Developer' }",
  "console.log('Building something awesome...')",
  "for(let i=0; i<5; i++) console.log(i)",
];

const Home = () => {
  const [terminalContent, setTerminalContent] = useState("$ Welcome to Avi's World\n");
  const [currentSnippetIndex, setCurrentSnippetIndex] = useState(0);
  const [lineCount, setLineCount] = useState(0); // Track number of lines typed
  const [isTyping, setIsTyping] = useState(false);
  const terminalRef = useRef(null);
  const typingIntervalRef = useRef(null);
  const lineIntervalRef = useRef(null);

  // Function to start typing a new snippet character by character directly into terminalContent
  const startTypingSnippet = () => {
    if (lineCount >= 10) {
      // Vanish: Clear after 10 lines and reset
      setTerminalContent("$ Welcome to Avi's World\n");
      setLineCount(0);
      setCurrentSnippetIndex(0);
      setTimeout(() => startTypingSnippet(), 500); // Brief pause before restart
      return;
    }

    const snippet = randomSnippets[currentSnippetIndex % randomSnippets.length];
    setIsTyping(true);

    let charIndex = 0;
    const currentPrompt = terminalContent; // Snapshot for building
    typingIntervalRef.current = setInterval(() => {
      if (charIndex < snippet.length) {
        // Append character directly to terminalContent
        setTerminalContent(`${currentPrompt}$ ` + snippet.slice(0, charIndex + 1));
        charIndex++;
      } else {
        // Typing complete: Finalize line and increment count
        clearInterval(typingIntervalRef.current);
        setTerminalContent(`${currentPrompt}$ ${snippet}\n`);
        setLineCount((prev) => prev + 1);
        setIsTyping(false);
        setCurrentSnippetIndex((prev) => prev + 1);
        
        // Auto-scroll after a brief delay
        setTimeout(() => {
          if (terminalRef.current) {
            terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
          }
        }, 100);
      }
    }, 30); // Typing speed: 30ms per character
  };

  useEffect(() => {
    // Start the first snippet after a short delay
    const initialDelay = setTimeout(() => {
      startTypingSnippet();
    }, 1000);

    // Set up interval for next lines (only if not at 10)
    lineIntervalRef.current = setInterval(() => {
      if (!isTyping && lineCount < 10) {
        startTypingSnippet();
      }
    }, 3500); // 3.5s between starting new lines

    return () => {
      clearTimeout(initialDelay);
      if (typingIntervalRef.current) clearInterval(typingIntervalRef.current);
      if (lineIntervalRef.current) clearInterval(lineIntervalRef.current);
    };
  }, [isTyping, lineCount, currentSnippetIndex]);

  return (
    <section className="min-h-screen bg-linear-to-br from-black via-gray-900 to-black text-white flex flex-col lg:flex-row justify-center items-center px-4 sm:px-8 lg:px-12 gap-8 lg:gap-16 py-12 overflow-hidden">
      {/* Left Section - Hero Text */}
      <div className="flex flex-col items-start space-y-6 max-w-md lg:max-w-lg text-left">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight bg-linear-to-r from-white to-emerald-400 bg-clip-text text-transparent">
          Hi, I'm <span className="text-emerald-400 font-bold">Avishek.</span>
        </h1>
        <div className="text-xl sm:text-2xl lg:text-3xl text-gray-300">
          <Typewriter
            options={{
              strings: [
                "Web Developer",
                "JavaScript Developer",
                "Full Stack Developer",
                "MERN Developer",
              ],
              autoStart: true,
              loop: true,
              delay: 75,
              deleteSpeed: 30,
              cursor: '<span class="text-emerald-400">|</span>',
            }}
          />
        </div>
        <p className="text-gray-400 text-base sm:text-lg leading-relaxed max-w-prose">
          Crafting digital experiences with code that breathes. Let's build something extraordinary together.
        </p>
      </div>

      {/* Right Section - Enhanced Terminal */}
      <div className="w-full lg:w-[500px] max-w-lg h-[400px] sm:h-[450px] lg:h-[500px] bg-[#0a0a0a] rounded-2xl shadow-2xl border border-emerald-500/20 overflow-hidden relative">
        {/* Terminal Header */}
        <div className="flex items-center space-x-2 px-4 py-3 bg-[#1a1a1a] border-b border-gray-800/50">
          <div className="flex space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-400/80"></div>
            <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
          </div>
          <span className="text-xs text-gray-400 ml-4 font-mono tracking-wider">terminal.js</span>
        </div>
        
        {/* Terminal Body */}
        <div 
          ref={terminalRef}
          className="p-4 font-mono text-emerald-400 text-sm h-full overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900 relative"
          style={{ 
            background: 'linear-gradient(to bottom, #0a0a0a 0%, #111 100%)',
            fontFamily: 'Monaco, Menlo, "Ubuntu Mono", monospace'
          }}
        >
          <div className="space-y-1">
            {terminalContent.split('\n').filter(line => line.trim()).map((line, idx) => (
              <div key={idx} className="flex">
                <span className="text-gray-500 mr-2">$</span>
                <span>{line.startsWith('$ ') ? line.slice(2) : line}</span>
              </div>
            ))}
          </div>
          {/* Idle cursor when not typing */}
          {!isTyping && (
            <div className="flex mt-2">
              <span className="text-gray-500 mr-2">$</span>
              <span className="animate-pulse text-emerald-400">▌</span>
            </div>
          )}
        </div>
        
        {/* Subtle Glow Effect */}
        <div className="absolute inset-0 bg-emerald-500/5 rounded-2xl blur-xl animate-pulse" />
      </div>
    </section>
  );
};

export default Home;