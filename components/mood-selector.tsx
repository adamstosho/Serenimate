"use client"

import { motion, AnimatePresence } from "framer-motion"

interface Mood {
  id: string
  emoji: string
  label: string
  description: string
}

interface MoodSelectorProps {
  moods: Mood[]
  selectedMood: string | null
  onMoodSelect: (moodId: string) => void
}

export default function MoodSelector({ moods, selectedMood, onMoodSelect }: MoodSelectorProps) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {moods.map((mood, index) => (
          <motion.button
            key={mood.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)"
            }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onMoodSelect(mood.id)}
            className={`relative group p-4 rounded-2xl transition-all duration-300 ${
              selectedMood === mood.id
                ? "bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/25"
                : "bg-white/20 backdrop-blur-sm border border-white/30 hover:bg-white/30 hover:border-white/50 text-slate-700 dark:text-slate-300"
            }`}
          >
            {/* Background glow effect for selected */}
            {selectedMood === mood.id && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-2xl blur-sm"
              />
            )}
            
            <div className="relative z-10">
              <motion.div
                animate={selectedMood === mood.id ? { scale: [1, 1.1, 1] } : {}}
                transition={{ duration: 0.3 }}
                className="text-3xl mb-2 block"
              >
                {mood.emoji}
              </motion.div>
              
              <div className="text-sm font-medium">
                {mood.label}
              </div>
            </div>
            
            {/* Hover effect */}
            <motion.div
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-2xl"
            />
          </motion.button>
        ))}
      </div>
      
      {/* Selected mood description */}
      <AnimatePresence>
        {selectedMood && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="card-glass p-4 text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
              className="text-2xl mb-2"
            >
              {moods.find(m => m.id === selectedMood)?.emoji}
            </motion.div>
            <p className="text-slate-600 dark:text-slate-300 text-sm">
              {moods.find(m => m.id === selectedMood)?.description}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
