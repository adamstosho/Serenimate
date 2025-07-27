"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Home, BookOpen, Wind, TrendingUp, Settings } from "lucide-react"

const navItems = [
  { href: "/", icon: Home, label: "Home" },
  { href: "/journal", icon: BookOpen, label: "Journal" },
  { href: "/breathe", icon: Wind, label: "Breathe" },
  { href: "/progress", icon: TrendingUp, label: "Progress" },
  { href: "/settings", icon: Settings, label: "Settings" },
]

export default function Navigation() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border-t border-slate-200 dark:border-slate-700 px-4 py-3 z-50">
      <div className="max-w-md mx-auto">
        <div className="flex justify-around">
          {navItems.map(({ href, icon: Icon, label }) => {
            const isActive = pathname === href

            return (
              <Link key={href} href={href} className="relative group">
                <motion.div
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  className={`flex flex-col items-center p-2 rounded-xl transition-all duration-200 ${
                    isActive
                      ? "text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-900/20"
                      : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50"
                  }`}
                >
                  <motion.div
                    animate={isActive ? { scale: [1, 1.2, 1] } : {}}
                    transition={{ duration: 0.3 }}
                  >
                    <Icon className="w-6 h-6 mb-1" />
                  </motion.div>
                  <span className="text-xs font-medium">{label}</span>

                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        layoutId="activeTab"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0 }}
                        className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-teal-600 dark:bg-teal-400 rounded-full"
                      />
                    )}
                  </AnimatePresence>
                </motion.div>
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
