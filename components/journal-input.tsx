"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Save, Heart, Sparkles, CheckCircle } from "lucide-react"

interface JournalInputProps {
  onSave: (entries: string[]) => void
  initialEntries?: string[]
}

const prompts = [
  "What made you smile today?",
  "What are you grateful for right now?",
  "What's something you're looking forward to?",
  "What's a challenge you overcame today?",
  "What's something kind you did for someone else?",
  "What's something you learned today?",
  "What's a small win you're celebrating?",
  "What's something that made you feel proud?"
]

export default function JournalInput({ onSave, initialEntries = ["", "", ""] }: JournalInputProps) {
  const [entries, setEntries] = useState<string[]>(initialEntries)
  const [showSuccess, setShowSuccess] = useState(false)
  const [hasChanges, setHasChanges] = useState(false)

  const handleEntryChange = (index: number, value: string) => {
    const newEntries = [...entries]
    newEntries[index] = value
    setEntries(newEntries)
    setHasChanges(true)
  }

  const handleSave = () => {
    const validEntries = entries.filter(entry => entry.trim() !== "")
    if (validEntries.length > 0) {
      onSave(entries)
      setShowSuccess(true)
      setHasChanges(false)
      
      setTimeout(() => setShowSuccess(false), 3000)
    }
  }

  const getValidEntries = () => {
    return entries.filter(entry => entry.trim() !== "")
  }

  const validEntriesCount = getValidEntries().length

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="flex items-center justify-center gap-2 mb-3">
          <Heart className="w-6 h-6 text-pink-500" />
          <h2 className="text-2xl font-semibold text-slate-800 dark:text-white">
            Daily Reflection
          </h2>
        </div>
        <p className="text-slate-600 dark:text-slate-300">
          Take a moment to reflect on your day. Write about what's on your mind.
        </p>
      </motion.div>

      {/* Success Message */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="card-glass p-4 text-center"
          >
            <div className="flex items-center justify-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="font-medium text-slate-800 dark:text-white">
                Journal saved successfully! ✨
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Journal Entries */}
      <div className="space-y-4">
        {entries.map((entry, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="space-y-2"
          >
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
              {prompts[index % prompts.length]}
            </label>
            <textarea
              value={entry}
              onChange={(e) => handleEntryChange(index, e.target.value)}
              placeholder="Write your thoughts here..."
              className="input-enhanced w-full min-h-[100px] resize-none focus-ring"
              maxLength={500}
            />
            
            {/* Character count */}
            <div className="flex justify-between items-center text-xs text-slate-500 dark:text-slate-400">
              <span>{entry.length}/500 characters</span>
              {entry.length > 450 && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-orange-500"
                >
                  Getting close to limit!
                </motion.span>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Progress Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="space-y-2"
      >
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Progress
          </span>
          <span className="text-sm text-slate-500 dark:text-slate-400">
            {validEntriesCount}/{entries.length} entries
          </span>
        </div>
        <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${(validEntriesCount / entries.length) * 100}%` }}
            className="h-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"
          />
        </div>
      </motion.div>

      {/* Save Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleSave}
          disabled={validEntriesCount === 0}
          className={`flex items-center justify-center gap-2 w-full py-3 px-6 rounded-xl font-medium transition-all duration-200 ${
            validEntriesCount > 0
              ? "btn-success"
              : "bg-slate-300 dark:bg-slate-600 text-slate-500 dark:text-slate-400 cursor-not-allowed"
          }`}
        >
          <Save className="w-5 h-5" />
          Save Journal
        </motion.button>
        
        {validEntriesCount === 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-sm text-slate-500 dark:text-slate-400 mt-2"
          >
            Write at least one entry to save your journal
          </motion.p>
        )}
      </motion.div>

      {/* Encouragement */}
      {validEntriesCount > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="card-glass p-4 text-center"
        >
          <div className="flex items-center justify-center gap-2 mb-2">
            <Sparkles className="w-5 h-5 text-yellow-500" />
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Great job reflecting!
            </span>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Taking time to reflect helps you understand yourself better and appreciate the good moments in life.
          </p>
        </motion.div>
      )}
    </div>
  )
}
