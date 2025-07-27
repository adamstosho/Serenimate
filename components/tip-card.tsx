"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Lightbulb, Heart, Brain, Coffee } from "lucide-react"

const tips = [
  {
    text: "Take three deep breaths before starting your day.",
    category: "mindfulness",
    icon: "🧘",
    color: "from-teal-500 to-blue-500"
  },
  {
    text: "Practice gratitude by writing down three things you're thankful for.",
    category: "gratitude",
    icon: "🙏",
    color: "from-purple-500 to-pink-500"
  },
  {
    text: "Take a 5-minute walk outside to connect with nature.",
    category: "wellness",
    icon: "🌿",
    color: "from-green-500 to-emerald-500"
  },
  {
    text: "Drink a glass of water and notice how it makes you feel.",
    category: "self-care",
    icon: "💧",
    color: "from-blue-500 to-cyan-500"
  },
  {
    text: "Smile at yourself in the mirror - you deserve kindness.",
    category: "self-love",
    icon: "💝",
    color: "from-pink-500 to-rose-500"
  },
  {
    text: "Listen to your favorite song and let yourself feel the music.",
    category: "joy",
    icon: "🎵",
    color: "from-indigo-500 to-purple-500"
  },
  {
    text: "Call or text someone you care about.",
    category: "connection",
    icon: "💌",
    color: "from-orange-500 to-red-500"
  },
  {
    text: "Do one small thing that brings you joy today.",
    category: "happiness",
    icon: "✨",
    color: "from-yellow-500 to-orange-500"
  },
  {
    text: "Practice saying 'no' to things that drain your energy.",
    category: "boundaries",
    icon: "🛡️",
    color: "from-slate-500 to-gray-500"
  },
  {
    text: "Celebrate a small win from today, no matter how tiny.",
    category: "achievement",
    icon: "🏆",
    color: "from-amber-500 to-yellow-500"
  },
]

export default function TipCard() {
  const [currentTip, setCurrentTip] = useState(tips[0])
  const [isExpanded, setIsExpanded] = useState(false)

  useEffect(() => {
    // Get tip based on current date to ensure same tip per day
    const today = new Date()
    const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000)
    const tipIndex = dayOfYear % tips.length
    setCurrentTip(tips[tipIndex])
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className={`bg-gradient-to-r ${currentTip.color} rounded-2xl shadow-lg p-6 text-white cursor-pointer`}
      onClick={() => setIsExpanded(!isExpanded)}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="flex items-start gap-3">
        <div className="text-2xl">{currentTip.icon}</div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <Lightbulb className="w-4 h-4" />
            <h3 className="font-semibold font-nunito">Tip of the Day</h3>
            <span className="text-xs bg-white/20 px-2 py-1 rounded-full capitalize">
              {currentTip.category}
            </span>
          </div>
          <p className="text-sm opacity-90 font-inter leading-relaxed">{currentTip.text}</p>
          
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-3 pt-3 border-t border-white/20"
            >
              <p className="text-xs opacity-75">
                💡 <strong>Why this helps:</strong> Taking small, intentional actions like this can significantly improve your mental well-being and create positive habits.
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  )
}
