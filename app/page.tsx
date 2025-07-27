"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import MoodSelector from "@/components/mood-selector"
import TipCard from "@/components/tip-card"
import { Sparkles, CheckCircle, TrendingUp, Heart, Sun, Moon, Coffee } from "lucide-react"
import { saveMoodData, getAllMoodData } from "@/utils/storage"

export default function Home() {
  const [selectedMood, setSelectedMood] = useState<string | null>(null)
  const [todaysMood, setTodaysMood] = useState<string | null>(null)
  const [showSuccess, setShowSuccess] = useState(false)
  const [streak, setStreak] = useState(0)
  const [isFirstTime, setIsFirstTime] = useState(false)

  const moods = [
    { id: "amazing", emoji: "😍", label: "Amazing", description: "Feeling incredible and grateful" },
    { id: "good", emoji: "😊", label: "Good", description: "Having a positive day" },
    { id: "okay", emoji: "😐", label: "Okay", description: "Neutral but stable" },
    { id: "down", emoji: "😔", label: "Down", description: "Feeling a bit low" },
    { id: "terrible", emoji: "😢", label: "Terrible", description: "Having a difficult time" }
  ]

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0]
    const existingMood = getAllMoodData().find(entry => entry.date === today)
    if (existingMood) {
      setTodaysMood(existingMood.mood)
      setSelectedMood(existingMood.mood)
    }

    // Check if it's first time
    const allMoodData = getAllMoodData()
    if (allMoodData.length === 0) {
      setIsFirstTime(true)
    }

    calculateStreak()
  }, [])

  const calculateStreak = () => {
    const allMoodData = getAllMoodData()
    let currentStreak = 0
    const today = new Date()
    
    for (let i = 0; i < 30; i++) {
      const date = new Date(today)
      date.setDate(date.getDate() - i)
      const dateStr = date.toISOString().split("T")[0]
      const hasEntry = allMoodData.some(entry => entry.date === dateStr)
      
      if (hasEntry) {
        currentStreak++
      } else {
        break
      }
    }
    
    setStreak(currentStreak)
  }

  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return "Good morning"
    if (hour < 17) return "Good afternoon"
    return "Good evening"
  }

  const handleMoodSelect = (moodId: string) => {
    const today = new Date().toISOString().split("T")[0]
    const success = saveMoodData(today, moodId)
    
    if (success) {
      setSelectedMood(moodId)
      setTodaysMood(moodId)
      setShowSuccess(true)
      calculateStreak()
      
      // Hide success message after 3 seconds
      setTimeout(() => setShowSuccess(false), 3000)
    } else {
      // Show error message if save failed
      console.error("Failed to save mood data")
      // You could add an error state here if needed
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-slate-900 dark:via-purple-900 dark:to-slate-900">
      {/* Background Pattern */}
      <div className="fixed inset-0 bg-pattern opacity-30"></div>
      
      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            className="inline-block mb-4"
          >
            <Sparkles className="w-12 h-12 text-gradient mx-auto" />
          </motion.div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4 heading-gradient">
            {getGreeting()}, Friend! 👋
          </h1>
          
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            How are you feeling today? Take a moment to check in with yourself.
          </p>
        </motion.div>

        {/* First Time Welcome */}
        <AnimatePresence>
          {isFirstTime && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="card-glass mb-8 p-6 text-center"
            >
              <Heart className="w-8 h-8 text-pink-500 mx-auto mb-3 animate-pulse" />
              <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-2">
                Welcome to SereniMate! 💜
              </h3>
              <p className="text-slate-600 dark:text-slate-300">
                Start your wellness journey by logging your first mood. We're here to support you every step of the way.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Streak Display */}
        {streak > 0 && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="card-glass mb-6 p-4 text-center"
          >
            <div className="flex items-center justify-center gap-2 mb-2">
              <TrendingUp className="w-5 h-5 text-green-500" />
              <span className="font-semibold text-slate-800 dark:text-white">
                {streak} Day{streak !== 1 ? 's' : ''} Streak! 🔥
              </span>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              Amazing! You've been checking in for {streak} consecutive day{streak !== 1 ? 's' : ''}.
            </p>
          </motion.div>
        )}

        {/* Success Message */}
        <AnimatePresence>
          {showSuccess && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="card-glass mb-6 p-4 text-center"
            >
              <div className="flex items-center justify-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="font-medium text-slate-800 dark:text-white">
                  Mood logged successfully! ✨
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mood Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="card-glass mb-8 p-6"
        >
          <h2 className="text-2xl font-semibold text-slate-800 dark:text-white mb-6 text-center">
            How are you feeling today?
          </h2>
          <MoodSelector
            moods={moods}
            selectedMood={selectedMood}
            onMoodSelect={handleMoodSelect}
          />
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
        >
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="card-glass p-4 text-center cursor-pointer"
          >
            <Sun className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
            <h3 className="font-semibold text-slate-800 dark:text-white mb-1">Journal</h3>
            <p className="text-sm text-slate-600 dark:text-slate-300">Reflect on your day</p>
          </motion.div>
          
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="card-glass p-4 text-center cursor-pointer"
          >
            <Moon className="w-8 h-8 text-blue-500 mx-auto mb-2" />
            <h3 className="font-semibold text-slate-800 dark:text-white mb-1">Breathe</h3>
            <p className="text-sm text-slate-600 dark:text-slate-300">Find your calm</p>
          </motion.div>
          
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="card-glass p-4 text-center cursor-pointer"
          >
            <Coffee className="w-8 h-8 text-orange-500 mx-auto mb-2" />
            <h3 className="font-semibold text-slate-800 dark:text-white mb-1">Progress</h3>
            <p className="text-sm text-slate-600 dark:text-slate-300">Track your journey</p>
          </motion.div>
        </motion.div>

        {/* Tip Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <TipCard />
        </motion.div>

        {/* Mood Logged Message */}
        {todaysMood && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="card-glass mt-8 p-4 text-center"
          >
            <p className="text-slate-600 dark:text-slate-300">
              You've already logged your mood for today. Great job taking care of yourself! 💜
            </p>
          </motion.div>
        )}
      </div>
    </div>
  )
}
