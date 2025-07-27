"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import MoodCalendar from "@/components/mood-calendar"
import { getAllMoodData } from "@/utils/storage"
import { TrendingUp, Calendar, Award, Target, BarChart3 } from "lucide-react"

export default function Progress() {
  const [moodData, setMoodData] = useState<Array<{ date: string; mood: string }>>([])
  const [selectedPeriod, setSelectedPeriod] = useState<"week" | "month" | "all">("month")

  useEffect(() => {
    const data = getAllMoodData()
    setMoodData(data)
  }, [])

  const getMoodStats = () => {
    const moodCounts = moodData.reduce(
      (acc, { mood }) => {
        acc[mood] = (acc[mood] || 0) + 1
        return acc
      },
      {} as Record<string, number>,
    )

    const total = moodData.length
    return Object.entries(moodCounts).map(([mood, count]) => ({
      mood,
      count,
      percentage: total > 0 ? Math.round((count / total) * 100) : 0,
    }))
  }

  const getStreak = () => {
    let currentStreak = 0
    const today = new Date()
    
    for (let i = 0; i < 30; i++) {
      const date = new Date(today)
      date.setDate(date.getDate() - i)
      const dateStr = date.toISOString().split("T")[0]
      const mood = moodData.find(d => d.date === dateStr)
      
      if (mood) {
        currentStreak++
      } else {
        break
      }
    }
    
    return currentStreak
  }

  const getAverageMood = () => {
    if (moodData.length === 0) return null
    
    const moodScores = {
      amazing: 5,
      good: 4,
      okay: 3,
      down: 2,
      terrible: 1
    }
    
    const totalScore = moodData.reduce((sum, { mood }) => sum + (moodScores[mood as keyof typeof moodScores] || 0), 0)
    return Math.round((totalScore / moodData.length) * 10) / 10
  }

  const moodEmojis = {
    amazing: "😄",
    good: "😊",
    okay: "😐",
    down: "😔",
    terrible: "😢",
  }

  const moodColors = {
    amazing: "from-yellow-400 to-orange-400",
    good: "from-green-400 to-emerald-400",
    okay: "from-blue-400 to-cyan-400",
    down: "from-orange-400 to-red-400",
    terrible: "from-red-400 to-pink-400",
  }

  const stats = getMoodStats()
  const streak = getStreak()
  const averageMood = getAverageMood()

  const getMoodInsight = () => {
    if (moodData.length === 0) return "Start tracking your mood to see insights!"
    
    const mostFrequentMood = stats.reduce((prev, current) => 
      prev.count > current.count ? prev : current
    )
    
    const insights = {
      amazing: "You're having an amazing time! Keep up the positive energy! ✨",
      good: "You're doing great! Your positive outlook is shining through! 🌟",
      okay: "You're maintaining balance. Consider trying some new activities! 🎯",
      down: "It's okay to have rough days. Remember, this too shall pass. 💙",
      terrible: "You're going through a tough time. Be kind to yourself. 🤗"
    }
    
    return insights[mostFrequentMood.mood as keyof typeof insights] || "Keep tracking to see your patterns!"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-50 dark:from-slate-900 dark:to-slate-800 p-4">
      <div className="max-w-md mx-auto pt-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-bold text-slate-800 dark:text-white mb-2 font-nunito">Your Progress</h1>
          <p className="text-slate-600 dark:text-slate-300 font-inter">Track your mental wellness journey</p>
        </motion.div>

        {moodData.length > 0 ? (
          <>
            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="grid grid-cols-2 gap-4 mb-6"
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-white dark:bg-slate-800 rounded-xl p-4 text-center shadow-lg"
              >
                <div className="text-2xl mb-1">🔥</div>
                <div className="text-2xl font-bold text-slate-800 dark:text-white">{streak}</div>
                <div className="text-xs text-slate-500 dark:text-slate-400">Day Streak</div>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-white dark:bg-slate-800 rounded-xl p-4 text-center shadow-lg"
              >
                <div className="text-2xl mb-1">📊</div>
                <div className="text-2xl font-bold text-slate-800 dark:text-white">{averageMood}</div>
                <div className="text-xs text-slate-500 dark:text-slate-400">Avg Mood</div>
              </motion.div>
            </motion.div>

            {/* Mood Insight */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl p-4 mb-6 text-white shadow-lg"
            >
              <div className="flex items-center gap-2 mb-2">
                <Target className="w-5 h-5" />
                <h3 className="font-semibold">Your Insight</h3>
              </div>
              <p className="text-sm opacity-90">{getMoodInsight()}</p>
            </motion.div>

            {/* Mood Overview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6 mb-6"
            >
              <div className="flex items-center gap-2 mb-4">
                <BarChart3 className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                <h2 className="text-xl font-semibold text-slate-800 dark:text-white font-nunito">Mood Overview</h2>
              </div>
              <div className="space-y-4">
                {stats.map(({ mood, count, percentage }) => (
                  <motion.div
                    key={mood}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${moodColors[mood as keyof typeof moodColors]} flex items-center justify-center text-white text-sm`}>
                        {moodEmojis[mood as keyof typeof moodEmojis]}
                      </div>
                      <div>
                        <span className="capitalize text-slate-700 dark:text-slate-300 font-medium">{mood}</span>
                        <div className="text-xs text-slate-500 dark:text-slate-400">{count} days</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-20 bg-slate-200 dark:bg-slate-600 rounded-full h-2">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${percentage}%` }}
                          transition={{ duration: 1, delay: 0.5 }}
                          className={`h-2 rounded-full bg-gradient-to-r ${moodColors[mood as keyof typeof moodColors]}`}
                        />
                      </div>
                      <span className="text-sm font-medium text-slate-600 dark:text-slate-400 w-8">{percentage}%</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Mood Calendar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6"
            >
              <div className="flex items-center gap-2 mb-4">
                <Calendar className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                <h2 className="text-xl font-semibold text-slate-800 dark:text-white font-nunito">Mood Calendar</h2>
              </div>
              <MoodCalendar moodData={moodData} />
            </motion.div>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 text-center"
          >
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-6xl mb-4"
            >
              📊
            </motion.div>
            <h2 className="text-xl font-semibold text-slate-800 dark:text-white mb-2">No data yet</h2>
            <p className="text-slate-600 dark:text-slate-300 mb-4">Start tracking your mood to see your progress here!</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-teal-500 to-blue-500 text-white px-6 py-3 rounded-xl font-medium"
            >
              Start Tracking
            </motion.button>
          </motion.div>
        )}
      </div>
    </div>
  )
}
