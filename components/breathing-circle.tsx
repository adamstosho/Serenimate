"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Wind, Play, Pause, RotateCcw } from "lucide-react"

interface BreathingCircleProps {
  onStart?: () => void
  onStop?: () => void
  onReset?: () => void
}

export default function BreathingCircle({ onStart, onStop, onReset }: BreathingCircleProps) {
  const [isActive, setIsActive] = useState(false)
  const [phase, setPhase] = useState<"inhale" | "exhale">("inhale")
  const [countdown, setCountdown] = useState(4)

  useEffect(() => {
    let interval: NodeJS.Timeout

    if (isActive) {
      interval = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            setPhase(phase === "inhale" ? "exhale" : "inhale")
            return 4
          }
          return prev - 1
        })
      }, 1000)
    }

    return () => clearInterval(interval)
  }, [isActive, phase])

  const handleStart = () => {
    setIsActive(true)
    onStart?.()
  }

  const handleStop = () => {
    setIsActive(false)
    setPhase("inhale")
    setCountdown(4)
    onStop?.()
  }

  const handleReset = () => {
    setIsActive(false)
    setPhase("inhale")
    setCountdown(4)
    onReset?.()
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] relative">
      {/* Background particles */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 pointer-events-none"
          >
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ 
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                  x: Math.cos(i * 60 * Math.PI / 180) * 100,
                  y: Math.sin(i * 60 * Math.PI / 180) * 100
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                  delay: i * 0.5
                }}
                className="absolute w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full"
                style={{
                  left: '50%',
                  top: '50%',
                  transform: 'translate(-50%, -50%)'
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main breathing circle */}
      <motion.div
        animate={{
          scale: isActive ? (phase === "inhale" ? 1.2 : 0.8) : 1,
          opacity: isActive ? 0.9 : 0.7
        }}
        transition={{ duration: 4, ease: "easeInOut" }}
        className="relative"
      >
        {/* Outer circle */}
        <motion.div
          animate={{
            scale: isActive ? (phase === "inhale" ? 1.3 : 0.7) : 1,
            opacity: isActive ? 0.3 : 0.1
          }}
          transition={{ duration: 4, ease: "easeInOut" }}
          className="absolute inset-0 w-64 h-64 bg-gradient-to-br from-blue-400/20 to-purple-500/20 rounded-full blur-sm"
        />
        
        {/* Middle circle */}
        <motion.div
          animate={{
            scale: isActive ? (phase === "inhale" ? 1.15 : 0.85) : 1,
            opacity: isActive ? 0.5 : 0.2
          }}
          transition={{ duration: 4, ease: "easeInOut" }}
          className="absolute inset-0 w-64 h-64 bg-gradient-to-br from-blue-400/30 to-purple-500/30 rounded-full blur-sm"
        />
        
        {/* Inner circle */}
        <div className="w-64 h-64 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full shadow-2xl flex items-center justify-center backdrop-blur-sm">
          <div className="text-center">
            {/* Phase indicator */}
            <AnimatePresence mode="wait">
              <motion.div
                key={phase}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-4xl mb-2"
              >
                {phase === "inhale" ? "⬇️" : "⬆️"}
              </motion.div>
            </AnimatePresence>
            
            {/* Instructions */}
            <motion.div
              animate={{ opacity: isActive ? 1 : 0.7 }}
              className="text-white font-semibold text-lg mb-1"
            >
              {isActive ? phase.charAt(0).toUpperCase() + phase.slice(1) : "Ready"}
            </motion.div>
            
            {/* Countdown */}
            {isActive && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="text-white/80 text-sm"
              >
                {countdown}s
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>

      {/* Controls */}
      <div className="flex items-center gap-4 mt-8">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={isActive ? handleStop : handleStart}
          className={`p-4 rounded-full shadow-lg transition-all duration-200 ${
            isActive 
              ? "bg-gradient-to-r from-red-500 to-pink-600 text-white" 
              : "bg-gradient-to-r from-green-500 to-emerald-600 text-white"
          }`}
        >
          {isActive ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleReset}
          className="p-4 bg-gradient-to-r from-slate-500 to-gray-600 text-white rounded-full shadow-lg"
        >
          <RotateCcw className="w-6 h-6" />
        </motion.button>
      </div>

      {/* Instructions */}
      <AnimatePresence>
        {!isActive && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mt-6 text-center"
          >
            <div className="flex items-center justify-center gap-2 mb-2">
              <Wind className="w-5 h-5 text-blue-500" />
              <span className="text-slate-600 dark:text-slate-300 font-medium">
                Mindful Breathing
              </span>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md">
              Follow the circle's rhythm. Inhale as it expands, exhale as it contracts. 
              Focus on your breath and let your mind find peace.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top-right countdown indicator */}
      {isActive && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full w-12 h-12 flex items-center justify-center"
        >
          <span className="text-white font-bold text-lg">{countdown}</span>
        </motion.div>
      )}
    </div>
  )
}
