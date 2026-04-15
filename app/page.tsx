"use client";

import { motion } from "framer-motion";

export default function Home() {
  return (
    <main className="h-screen w-full bg-black text-white flex flex-col items-center justify-center relative overflow-hidden">

      {/* Glow Background */}
      <div className="absolute w-72 h-72 bg-orange-500 rounded-full blur-3xl opacity-30 top-10 left-10"></div>
      <div className="absolute w-72 h-72 bg-blue-500 rounded-full blur-3xl opacity-30 bottom-10 right-10"></div>

      {/* Title */}
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-6xl font-bold mb-4 z-20 text-center"
      >
        AgniMitra 🔥
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-gray-300 mb-8 z-20 text-center"
      >
        Smart LPG Sharing Platform
      </motion.p>

      {/* Buttons */}
      <div className="flex gap-4 z-20">
        <a href="/login">
          <button className="bg-blue-500 px-6 py-2 rounded">
            Login
          </button>
        </a>

        <a href="/register">
          <button className="bg-orange-500 px-6 py-2 rounded">
            Register
          </button>
        </a>
      </div>

    </main>
  );
}