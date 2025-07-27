"use client"

import { motion } from "framer-motion"

interface Mood {
  id: string
  emoji: string
  label: string
  color: string
  description?: string
}

interface MoodSelectorProps {
  moods: Mood[]
  selectedMood: string | null
  onMoodSelect: (moodId: string) => void
}

export default function MoodSelector({ moods, selectedMood, onMoodSelect }: MoodSelectorProps) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-5 gap-3">
        {moods.map((mood) => (
          <motion.button
            key={mood.id}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onMoodSelect(mood.id)}
            className={`aspect-square rounded-2xl flex flex-col items-center justify-center p-2 transition-all duration-200 ${
              selectedMood === mood.id
                ? `${mood.color} shadow-lg scale-105 ring-2 ring-offset-2 ring-offset-white dark:ring-offset-slate-800 ring-slate-300`
                : "bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 hover:shadow-md"
            }`}
          >
            <motion.span 
              className="text-2xl mb-1"
              animate={selectedMood === mood.id ? { scale: [1, 1.2, 1] } : {}}
              transition={{ duration: 0.3 }}
            >
              {mood.emoji}
            </motion.span>
            <span className="text-xs font-medium text-slate-700 dark:text-slate-300">{mood.label}</span>
          </motion.button>
        ))}
      </div>
      
      {selectedMood && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center p-3 bg-slate-50 dark:bg-slate-700/50 rounded-xl"
        >
          <p className="text-sm text-slate-600 dark:text-slate-400">
            {moods.find(m => m.id === selectedMood)?.description || "You selected this mood"}
          </p>
        </motion.div>
      )}
    </div>
  )
}
