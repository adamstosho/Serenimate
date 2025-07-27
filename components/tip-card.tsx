"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Lightbulb, Heart, Brain, Coffee, ChevronDown, ChevronUp } from "lucide-react"

const tips = [
  {
    text: "Practice gratitude by writing down 3 things you're thankful for each day",
    category: "Gratitude",
    icon: Heart,
    color: "from-pink-400 to-rose-500"
  },
  {
    text: "Take 5 deep breaths when you feel overwhelmed",
    category: "Mindfulness",
    icon: Brain,
    color: "from-blue-400 to-indigo-500"
  },
  {
    text: "Connect with a friend or family member today",
    category: "Connection",
    icon: Heart,
    color: "from-green-400 to-emerald-500"
  },
  {
    text: "Do something kind for yourself today",
    category: "Self-Care",
    icon: Lightbulb,
    color: "from-yellow-400 to-orange-500"
  },
  {
    text: "Take a short walk outside to clear your mind",
    category: "Movement",
    icon: Coffee,
    color: "from-purple-400 to-pink-500"
  }
]

export default function TipCard() {
  const [isExpanded, setIsExpanded] = useState(false)
  
  // Get today's tip based on date
  const getTodaysTip = () => {
    const today = new Date().getDate()
    return tips[today % tips.length]
  }
  
  const todaysTip = getTodaysTip()
  const IconComponent = todaysTip.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="card-glass p-6 cursor-pointer hover:shadow-glow-hover transition-all duration-300"
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <div className="flex items-start gap-4">
        <div className={`p-3 rounded-xl bg-gradient-to-br ${todaysTip.color} text-white shadow-lg`}>
          <IconComponent className="w-6 h-6" />
        </div>
        
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium px-2 py-1 bg-white/20 rounded-full text-slate-700 dark:text-slate-300">
                {todaysTip.category}
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                Today's Tip
              </span>
            </div>
            
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              {isExpanded ? (
                <ChevronUp className="w-5 h-5 text-slate-400" />
              ) : (
                <ChevronDown className="w-5 h-5 text-slate-400" />
              )}
            </motion.div>
          </div>
          
          <p className="text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
            {todaysTip.text}
          </p>
          
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-4 pt-4 border-t border-white/20"
              >
                <div className="bg-white/10 rounded-lg p-3">
                  <h4 className="font-semibold text-slate-800 dark:text-white mb-2">
                    Why this helps:
                  </h4>
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {todaysTip.category === "Gratitude" && 
                      "Practicing gratitude shifts your focus from what's wrong to what's right, improving overall mood and reducing stress."
                    }
                    {todaysTip.category === "Mindfulness" && 
                      "Deep breathing activates your parasympathetic nervous system, helping you feel calmer and more centered."
                    }
                    {todaysTip.category === "Connection" && 
                      "Social connections release oxytocin, reducing stress and increasing feelings of happiness and belonging."
                    }
                    {todaysTip.category === "Self-Care" && 
                      "Taking time for yourself reduces stress, improves mood, and helps you show up better for others."
                    }
                    {todaysTip.category === "Movement" && 
                      "Physical activity releases endorphins, natural mood boosters that help reduce stress and anxiety."
                    }
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  )
}
