"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Save, Heart, Sparkles, CheckCircle } from "lucide-react"

interface JournalInputProps {
  entries: string[]
  onSave: (entries: string[]) => void
}

export default function JournalInput({ entries, onSave }: JournalInputProps) {
  const [currentEntries, setCurrentEntries] = useState(entries)
  const [showSuccess, setShowSuccess] = useState(false)
  const [hasChanges, setHasChanges] = useState(false)

  const handleEntryChange = (index: number, value: string) => {
    const newEntries = [...currentEntries]
    newEntries[index] = value
    setCurrentEntries(newEntries)
    setHasChanges(true)
  }

  const handleSave = () => {
    onSave(currentEntries)
    setShowSuccess(true)
    setHasChanges(false)
    
    // Hide success message after 3 seconds
    setTimeout(() => setShowSuccess(false), 3000)
  }

  const getValidEntries = () => {
    return currentEntries.filter(entry => entry.trim() !== "")
  }

  const prompts = [
    "What made you smile today?",
    "Who are you grateful for?",
    "What's a small win you had?",
    "What's something beautiful you noticed?",
    "What's something you're looking forward to?"
  ]

  return (
    <div className="space-y-4">
      {/* Success Message */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.8 }}
            className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-4 flex items-center gap-3"
          >
            <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
            <div>
              <p className="font-medium text-green-800 dark:text-green-200">Journal saved successfully!</p>
              <p className="text-sm text-green-600 dark:text-green-400">Your gratitude practice is growing</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {[0, 1, 2].map((index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="relative"
        >
          <div className="flex items-center gap-2 mb-2">
            <div className="flex items-center gap-1">
              <Heart className="w-4 h-4 text-pink-500" />
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                Gratitude {index + 1}
              </label>
            </div>
            <span className="text-xs text-slate-400">
              {currentEntries[index]?.length || 0}/200
            </span>
          </div>
          
          <textarea
            value={currentEntries[index]}
            onChange={(e) => handleEntryChange(index, e.target.value)}
            placeholder={prompts[index % prompts.length]}
            maxLength={200}
            className="w-full p-3 border border-slate-200 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none transition-all duration-200"
            rows={3}
          />
          
          {/* Character limit indicator */}
          {currentEntries[index]?.length > 180 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute bottom-2 right-2 text-xs text-orange-500"
            >
              {200 - (currentEntries[index]?.length || 0)} left
            </motion.div>
          )}
        </motion.div>
      ))}

      {/* Progress indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-slate-50 dark:bg-slate-700/50 rounded-xl p-3"
      >
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Progress</span>
          <span className="text-sm text-slate-500 dark:text-slate-400">
            {getValidEntries().length}/3 entries
          </span>
        </div>
        <div className="w-full bg-slate-200 dark:bg-slate-600 rounded-full h-2">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${(getValidEntries().length / 3) * 100}%` }}
            className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
          />
        </div>
      </motion.div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleSave}
        disabled={getValidEntries().length === 0}
        className={`w-full font-semibold py-3 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 ${
          getValidEntries().length > 0
            ? "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg"
            : "bg-slate-200 dark:bg-slate-700 text-slate-400 cursor-not-allowed"
        }`}
      >
        <Save className="w-4 h-4" />
        {getValidEntries().length > 0 ? "Save Journal Entry" : "Add at least one entry"}
      </motion.button>

      {/* Encouragement */}
      {getValidEntries().length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl border border-purple-200 dark:border-purple-800"
        >
          <Sparkles className="w-6 h-6 text-purple-500 mx-auto mb-2" />
          <p className="text-sm text-purple-700 dark:text-purple-300">
            Start with one thing you're grateful for today. Every entry counts! ✨
          </p>
        </motion.div>
      )}
    </div>
  )
}
