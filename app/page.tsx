"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import MoodSelector from "@/components/mood-selector"
import TipCard from "@/components/tip-card"
import { getMoodForDate, saveMoodData, getAllMoodData } from "@/utils/storage"
import { CheckCircle, Sparkles, TrendingUp } from "lucide-react"

const moods = [
  { id: "amazing", emoji: "😄", label: "Amazing", color: "bg-yellow-400", description: "Feeling fantastic!" },
  { id: "good", emoji: "😊", label: "Good", color: "bg-green-400", description: "Having a good day" },
  { id: "okay", emoji: "😐", label: "Okay", color: "bg-blue-400", description: "Feeling neutral" },
  { id: "down", emoji: "😔", label: "Down", color: "bg-orange-400", description: "Having a rough day" },
  { id: "terrible", emoji: "😢", label: "Terrible", color: "bg-red-400", description: "Really struggling" },
]

export default function Home() {
  const [selectedMood, setSelectedMood] = useState<string | null>(null)
  const [todaysMood, setTodaysMood] = useState<string | null>(null)
  const [showSuccess, setShowSuccess] = useState(false)
  const [streak, setStreak] = useState(0)
  const [isFirstTime, setIsFirstTime] = useState(false)

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0]
    const mood = getMoodForDate(today)
    setTodaysMood(mood)
    setSelectedMood(mood)
    
    // Check if this is first time user
    const allMoodData = getAllMoodData()
    setIsFirstTime(allMoodData.length === 0)
    
    // Calculate streak
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
      const mood = getMoodForDate(dateStr)
      
      if (mood) {
        currentStreak++
      } else {
        break
      }
    }
    
    setStreak(currentStreak)
  }

  const handleMoodSelect = (moodId: string) => {
    const today = new Date().toISOString().split("T")[0]
    saveMoodData(today, moodId)
    setSelectedMood(moodId)
    setTodaysMood(moodId)
    setShowSuccess(true)
    calculateStreak()
    
    // Hide success message after 3 seconds
    setTimeout(() => setShowSuccess(false), 3000)
  }

  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return "Good morning"
    if (hour < 17) return "Good afternoon"
    return "Good evening"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50 dark:from-slate-900 dark:to-slate-800 p-4">
      <div className="max-w-md mx-auto pt-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-6"
        >
          <h1 className="text-4xl font-bold text-slate-800 dark:text-white mb-2 font-nunito">SereniMate</h1>
          <p className="text-slate-600 dark:text-slate-300 font-inter">Your daily mental wellness companion</p>
        </motion.div>

        {/* Greeting and Streak */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-center mb-6"
        >
          <h2 className="text-xl font-semibold text-slate-700 dark:text-slate-300 mb-2">
            {getGreeting()}! 👋
          </h2>
          {streak > 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-4 py-2 rounded-full text-sm font-medium"
            >
              <Sparkles className="w-4 h-4" />
              {streak} day{streak > 1 ? 's' : ''} streak!
            </motion.div>
          )}
        </motion.div>

        {/* Success Message */}
        <AnimatePresence>
          {showSuccess && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.8 }}
              className="mb-6"
            >
              <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-4 flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                <div>
                  <p className="font-medium text-green-800 dark:text-green-200">Mood logged successfully!</p>
                  <p className="text-sm text-green-600 dark:text-green-400">Great job checking in with yourself</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* First Time User Welcome */}
        {isFirstTime && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-6 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-4 border border-purple-200 dark:border-purple-800"
          >
            <div className="text-center">
              <div className="text-3xl mb-2">🎉</div>
              <h3 className="font-semibold text-purple-800 dark:text-purple-200 mb-1">Welcome to SereniMate!</h3>
              <p className="text-sm text-purple-600 dark:text-purple-400">
                Start your mental wellness journey by logging your mood below
              </p>
            </div>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-6"
        >
          <TipCard />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6"
        >
          <h2 className="text-2xl font-semibold text-slate-800 dark:text-white mb-4 text-center font-nunito">
            How are you feeling today?
          </h2>

          {todaysMood && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center mb-4 p-4 bg-teal-50 dark:bg-teal-900/20 rounded-xl border border-teal-200 dark:border-teal-800"
            >
              <div className="flex items-center justify-center gap-2 mb-2">
                <CheckCircle className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                <p className="text-teal-700 dark:text-teal-300 font-medium">Mood logged for today!</p>
              </div>
              <p className="text-sm text-teal-600 dark:text-teal-400">You can update your mood if it's changed</p>
            </motion.div>
          )}

          <MoodSelector moods={moods} selectedMood={selectedMood} onMoodSelect={handleMoodSelect} />
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-6 grid grid-cols-2 gap-3"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-4 rounded-xl font-medium"
          >
            📝 Journal
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-gradient-to-r from-teal-500 to-blue-500 text-white p-4 rounded-xl font-medium"
          >
            🌬️ Breathe
          </motion.button>
        </motion.div>
      </div>
    </div>
  )
}
