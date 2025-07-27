"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import JournalInput from "@/components/journal-input"
import { getJournalForDate, saveJournalData } from "@/utils/storage"
import { Heart, Sparkles, BookOpen, Calendar } from "lucide-react"

export default function Journal() {
  const [entries, setEntries] = useState<string[]>(["", "", ""])
  const [hasEntries, setHasEntries] = useState(false)
  const [showMotivation, setShowMotivation] = useState(false)

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0]
    const journalData = getJournalForDate(today)
    if (journalData) {
      setEntries(journalData.entry)
      setHasEntries(true)
    }
    
    // Show motivation after 2 seconds if no entries
    if (!journalData) {
      setTimeout(() => setShowMotivation(true), 2000)
    }
  }, [])

  const handleSave = (newEntries: string[]) => {
    const today = new Date().toISOString().split("T")[0]
    const validEntries = newEntries.filter((entry) => entry.trim() !== "")

    if (validEntries.length > 0) {
      const success = saveJournalData(today, newEntries)
      
      if (success) {
        setEntries(newEntries)
        setHasEntries(true)
        setShowMotivation(false)
      } else {
        console.error("Failed to save journal data")
        // You could add an error state here if needed
      }
    }
  }

  const getDailyQuote = () => {
    const quotes = [
      "Gratitude turns what we have into enough.",
      "The more grateful I am, the more beauty I see.",
      "Gratitude is the fairest blossom which springs from the soul.",
      "When we focus on our gratitude, the tide of disappointment goes out and the tide of love rushes in.",
      "Gratitude is riches. Complaint is poverty.",
      "Gratitude is not only the greatest of virtues but the parent of all others.",
      "The root of joy is gratefulness.",
      "Gratitude makes sense of our past, brings peace for today, and creates a vision for tomorrow."
    ]
    
    const today = new Date()
    const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000)
    return quotes[dayOfYear % quotes.length]
  }

  const getJournalStreak = () => {
    let streak = 0
    const today = new Date()
    
    for (let i = 0; i < 30; i++) {
      const date = new Date(today)
      date.setDate(date.getDate() - i)
      const dateStr = date.toISOString().split("T")[0]
      const journalData = getJournalForDate(dateStr)
      
      if (journalData && journalData.entry.some(entry => entry.trim() !== "")) {
        streak++
      } else {
        break
      }
    }
    
    return streak
  }

  const streak = getJournalStreak()

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 dark:from-slate-900 dark:to-slate-800 p-4">
      <div className="max-w-md mx-auto pt-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-6"
        >
          <h1 className="text-3xl font-bold text-slate-800 dark:text-white mb-2 font-nunito">Gratitude Journal</h1>
          <p className="text-slate-600 dark:text-slate-300 font-inter">What are you grateful for today?</p>
        </motion.div>

        {/* Streak Display */}
        {streak > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center mb-6"
          >
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-medium">
              <BookOpen className="w-4 h-4" />
              {streak} day{streak > 1 ? 's' : ''} journaling streak!
            </div>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6"
        >
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <Heart className="w-5 h-5 text-purple-500" />
              <h3 className="font-semibold text-slate-800 dark:text-white">Today's Quote</h3>
            </div>
            <blockquote className="text-center italic text-slate-600 dark:text-slate-300 font-merriweather text-sm leading-relaxed">
              "{getDailyQuote()}"
            </blockquote>
          </div>

          {hasEntries && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center mb-4 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl border border-purple-200 dark:border-purple-800"
            >
              <div className="flex items-center justify-center gap-2 mb-2">
                <Calendar className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                <p className="text-purple-700 dark:text-purple-300 font-medium">Journaled today!</p>
              </div>
              <p className="text-sm text-purple-600 dark:text-purple-400">
                Feel free to update your entries or add new ones.
              </p>
            </motion.div>
          )}

          <JournalInput entries={entries} onSave={handleSave} />
        </motion.div>

        {/* Motivation Message */}
        <AnimatePresence>
          {showMotivation && !hasEntries && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mt-6 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-xl p-4 border border-yellow-200 dark:border-yellow-800"
            >
              <div className="flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-yellow-500 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-1">
                    Start Your Gratitude Practice
                  </h3>
                  <p className="text-sm text-yellow-700 dark:text-yellow-300">
                    Writing down what you're grateful for can improve your mood, reduce stress, and help you focus on the positive aspects of life. Start with just one thing!
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Benefits Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-6 bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6"
        >
          <h3 className="font-semibold text-slate-800 dark:text-white mb-3 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-500" />
            Benefits of Gratitude Journaling
          </h3>
          <div className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span>Improves mental well-being and reduces stress</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span>Helps you focus on positive aspects of life</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span>Builds resilience and emotional strength</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span>Enhances relationships and social connections</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
