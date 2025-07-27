"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import BreathingCircle from "@/components/breathing-circle"

export default function Breathe() {
  const [isActive, setIsActive] = useState(false)
  const [phase, setPhase] = useState<"inhale" | "exhale">("inhale")

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 p-4">
      <div className="max-w-md mx-auto pt-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-bold text-slate-800 dark:text-white mb-2 font-nunito">Breathing Exercise</h1>
          <p className="text-slate-600 dark:text-slate-300 font-inter">Take a moment to breathe and center yourself</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8"
        >
          <BreathingCircle isActive={isActive} phase={phase} onPhaseChange={setPhase} />

          <div className="text-center mt-8">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsActive(!isActive)}
              className={`px-8 py-3 rounded-full font-semibold transition-colors ${
                isActive ? "bg-red-500 hover:bg-red-600 text-white" : "bg-teal-500 hover:bg-teal-600 text-white"
              }`}
            >
              {isActive ? "Stop" : "Start Breathing"}
            </motion.button>
          </div>

          <div className="text-center mt-6">
            <p className="text-2xl font-semibold text-slate-700 dark:text-slate-300 capitalize">
              {isActive ? phase : "Ready to begin"}
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
              {isActive ? "Follow the circle with your breath" : "Click start when you're ready"}
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
