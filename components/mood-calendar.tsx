"use client"

import { motion } from "framer-motion"

interface MoodData {
  date: string
  mood: string
}

interface MoodCalendarProps {
  moodData: MoodData[]
}

const moodEmojis = {
  amazing: "😄",
  good: "😊",
  okay: "😐",
  down: "😔",
  terrible: "😢",
}

const moodColors = {
  amazing: "bg-yellow-400",
  good: "bg-green-400",
  okay: "bg-blue-400",
  down: "bg-orange-400",
  terrible: "bg-red-400",
}

export default function MoodCalendar({ moodData }: MoodCalendarProps) {
  // Get last 30 days
  const getLast30Days = () => {
    const days = []
    const today = new Date()

    for (let i = 29; i >= 0; i--) {
      const date = new Date(today)
      date.setDate(date.getDate() - i)
      days.push(date.toISOString().split("T")[0])
    }

    return days
  }

  const last30Days = getLast30Days()
  const moodMap = moodData.reduce(
    (acc, { date, mood }) => {
      acc[date] = mood
      return acc
    },
    {} as Record<string, string>,
  )

  return (
    <div className="grid grid-cols-7 gap-2">
      {last30Days.map((date, index) => {
        const mood = moodMap[date]
        const dayOfMonth = new Date(date).getDate()

        return (
          <motion.div
            key={date}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.02 }}
            className={`aspect-square rounded-lg flex items-center justify-center text-xs font-medium ${
              mood
                ? `${moodColors[mood as keyof typeof moodColors]} text-white`
                : "bg-slate-100 dark:bg-slate-700 text-slate-400 dark:text-slate-500"
            }`}
            title={mood ? `${date}: ${mood}` : date}
          >
            {mood ? (
              <span className="text-lg">{moodEmojis[mood as keyof typeof moodEmojis]}</span>
            ) : (
              <span>{dayOfMonth}</span>
            )}
          </motion.div>
        )
      })}
    </div>
  )
}
