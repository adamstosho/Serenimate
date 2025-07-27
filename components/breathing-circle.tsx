"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface BreathingCircleProps {
  isActive: boolean
  phase: "inhale" | "exhale"
  onPhaseChange: (phase: "inhale" | "exhale") => void
}

export default function BreathingCircle({ isActive, phase, onPhaseChange }: BreathingCircleProps) {
  const [countdown, setCountdown] = useState(4)

  useEffect(() => {
    if (!isActive) {
      setCountdown(4)
      return
    }

    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          onPhaseChange(phase === "inhale" ? "exhale" : "inhale")
          return 4
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [isActive, phase, onPhaseChange])

  return (
    <div className="flex flex-col items-center justify-center h-80 relative">
      {/* Background particles */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-teal-400/30 rounded-full"
                style={{
                  left: `${50 + 30 * Math.cos((i * 60 * Math.PI) / 180)}%`,
                  top: `${50 + 30 * Math.sin((i * 60 * Math.PI) / 180)}%`,
                }}
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.3, 0.8, 0.3],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  delay: i * 0.5,
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main breathing circle */}
      <motion.div
        animate={
          isActive
            ? {
                scale: phase === "inhale" ? 1.5 : 1,
                opacity: phase === "inhale" ? 0.9 : 0.5,
              }
            : { scale: 1, opacity: 0.7 }
        }
        transition={{
          duration: 4,
          ease: "easeInOut",
        }}
        className="relative w-40 h-40 rounded-full bg-gradient-to-br from-teal-400 to-blue-500 flex items-center justify-center shadow-2xl"
      >
        <motion.div
          animate={
            isActive
              ? {
                  scale: phase === "inhale" ? 1.3 : 0.7,
                }
              : { scale: 1 }
          }
          transition={{
            duration: 4,
            ease: "easeInOut",
          }}
          className="w-24 h-24 rounded-full bg-white/40 flex items-center justify-center backdrop-blur-sm"
        >
          <motion.div
            animate={
              isActive
                ? {
                    scale: phase === "inhale" ? 1.2 : 0.8,
                  }
                : { scale: 1 }
            }
            transition={{
              duration: 4,
              ease: "easeInOut",
            }}
            className="w-12 h-12 rounded-full bg-white/60 flex items-center justify-center"
          >
            <AnimatePresence mode="wait">
              {isActive && (
                <motion.span
                  key={phase}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  className="text-lg font-bold text-slate-700"
                >
                  {phase === "inhale" ? "↗" : "↘"}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Instructions */}
      <AnimatePresence mode="wait">
        {isActive && (
          <motion.div
            key={phase}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute -bottom-16 text-center"
          >
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="text-2xl mb-2"
            >
              {phase === "inhale" ? "🫁" : "💨"}
            </motion.div>
            <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-300 capitalize mb-1">
              {phase}
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {countdown} second{countdown !== 1 ? "s" : ""} remaining
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Countdown indicator */}
      {isActive && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute top-4 right-4 w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center"
        >
          <span className="text-sm font-bold text-slate-700">{countdown}</span>
        </motion.div>
      )}
    </div>
  )
}
