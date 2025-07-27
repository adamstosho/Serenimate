"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import BreathingCircle from "@/components/breathing-circle"
import { Wind, Play, Pause, RotateCcw, Info, Timer } from "lucide-react"
import { saveBreathingSession } from "@/utils/storage"

export default function Breathe() {
  const [isActive, setIsActive] = useState(false)
  const [phase, setPhase] = useState<"inhale" | "exhale">("inhale")
  const [sessionCount, setSessionCount] = useState(0)
  const [showInstructions, setShowInstructions] = useState(false)
  const [breathCount, setBreathCount] = useState(0)

  useEffect(() => {
    if (isActive) {
      const interval = setInterval(() => {
        setBreathCount(prev => prev + 1)
      }, 8000) // 8 seconds per breath cycle (4 inhale + 4 exhale)
      
      return () => clearInterval(interval)
    }
  }, [isActive])

  const handleStart = () => {
    setIsActive(true)
    setBreathCount(0)
  }

  const handleStop = () => {
    setIsActive(false)
    if (breathCount > 0) {
      setSessionCount(prev => prev + 1)
      
      // Save the breathing session data
      const today = new Date().toISOString().split("T")[0]
      const duration = breathCount * 4 // 4 seconds per breath cycle
      const breaths = Math.floor(breathCount / 2) // Each breath cycle has 2 phases
      
      const success = saveBreathingSession(today, duration, breaths)
      if (!success) {
        console.error("Failed to save breathing session data")
      }
    }
  }

  const handleReset = () => {
    setIsActive(false)
    setBreathCount(0)
    setSessionCount(0)
  }

  const getBreathingTip = () => {
    const tips = [
      "Find a comfortable position and relax your shoulders",
      "Focus on the rhythm of your breath",
      "Let your thoughts come and go like clouds",
      "Feel the air filling your lungs completely",
      "Release tension with each exhale",
      "Notice how your body feels with each breath"
    ]
    
    const today = new Date()
    const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000)
    return tips[dayOfYear % tips.length]
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 p-4">
      <div className="max-w-md mx-auto pt-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-6"
        >
          <h1 className="text-3xl font-bold text-slate-800 dark:text-white mb-2 font-nunito">Breathing Exercise</h1>
          <p className="text-slate-600 dark:text-slate-300 font-inter">Take a moment to breathe and center yourself</p>
        </motion.div>

        {/* Session Stats */}
        {sessionCount > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center mb-6"
          >
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-teal-500 to-blue-500 text-white px-4 py-2 rounded-full text-sm font-medium">
              <Timer className="w-4 h-4" />
              {sessionCount} session{sessionCount > 1 ? 's' : ''} completed
            </div>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8"
        >
          <BreathingCircle isActive={isActive} phase={phase} onPhaseChange={setPhase} />

          <div className="text-center mt-8">
            <div className="flex justify-center gap-3 mb-6">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={isActive ? handleStop : handleStart}
                className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-colors ${
                  isActive 
                    ? "bg-red-500 hover:bg-red-600 text-white" 
                    : "bg-teal-500 hover:bg-teal-600 text-white"
                }`}
              >
                {isActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                {isActive ? "Stop" : "Start Breathing"}
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleReset}
                className="flex items-center gap-2 px-4 py-3 rounded-full font-semibold bg-slate-200 hover:bg-slate-300 text-slate-700 dark:bg-slate-600 dark:hover:bg-slate-500 dark:text-slate-300 transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                Reset
              </motion.button>
            </div>

            <div className="text-center mb-6">
              <p className="text-2xl font-semibold text-slate-700 dark:text-slate-300 capitalize mb-2">
                {isActive ? phase : "Ready to begin"}
              </p>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">
                {isActive ? "Follow the circle with your breath" : "Click start when you're ready"}
              </p>
              {isActive && (
                <p className="text-xs text-slate-400 dark:text-slate-500">
                  Breath {Math.floor(breathCount / 2) + 1} of this session
                </p>
              )}
            </div>

            {/* Breathing Tip */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-teal-50 dark:bg-teal-900/20 rounded-xl p-4 border border-teal-200 dark:border-teal-800"
            >
              <div className="flex items-center gap-2 mb-2">
                <Wind className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                <span className="text-sm font-medium text-teal-700 dark:text-teal-300">Tip</span>
              </div>
              <p className="text-sm text-teal-600 dark:text-teal-400">
                {getBreathingTip()}
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Instructions Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-6"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowInstructions(!showInstructions)}
            className="flex items-center gap-2 mx-auto px-4 py-2 text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-colors"
          >
            <Info className="w-4 h-4" />
            How to breathe mindfully
          </motion.button>
        </motion.div>

        {/* Instructions Modal */}
        <AnimatePresence>
          {showInstructions && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
              onClick={() => setShowInstructions(false)}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="bg-white dark:bg-slate-800 rounded-2xl p-6 max-w-sm w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center gap-2 mb-4">
                  <Wind className="w-5 h-5 text-teal-500" />
                  <h3 className="font-semibold text-slate-800 dark:text-white">Mindful Breathing Guide</h3>
                </div>
                <div className="space-y-3 text-sm text-slate-600 dark:text-slate-400">
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-teal-500 rounded-full mt-2"></div>
                    <p>Find a comfortable, quiet place to sit or lie down</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-teal-500 rounded-full mt-2"></div>
                    <p>Close your eyes and relax your body</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-teal-500 rounded-full mt-2"></div>
                    <p>Follow the circle's rhythm: inhale as it expands, exhale as it contracts</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-teal-500 rounded-full mt-2"></div>
                    <p>Focus on your breath and let thoughts pass by</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-teal-500 rounded-full mt-2"></div>
                    <p>Start with 5-10 minutes and gradually increase</p>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowInstructions(false)}
                  className="w-full mt-4 bg-teal-500 hover:bg-teal-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                >
                  Got it
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Benefits Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-6 bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6"
        >
          <h3 className="font-semibold text-slate-800 dark:text-white mb-3 flex items-center gap-2">
            <Wind className="w-5 h-5 text-teal-500" />
            Benefits of Mindful Breathing
          </h3>
          <div className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
              <span>Reduces stress and anxiety</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
              <span>Improves focus and concentration</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
              <span>Lowers blood pressure and heart rate</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
              <span>Promotes better sleep quality</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
