"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Home, BookOpen, Wind, BarChart3, Settings, Sparkles, Info } from "lucide-react"

const navItems = [
  { href: "/app", label: "Home", icon: Home },
  { href: "/journal", label: "Journal", icon: BookOpen },
  { href: "/breathe", label: "Breathe", icon: Wind },
  { href: "/progress", label: "Progress", icon: BarChart3 },
  { href: "/settings", label: "Settings", icon: Settings },
]

export default function Navigation() {
  const pathname = usePathname()
  
  // Don't show navigation on landing page
  if (pathname === "/") {
    return null
  }

  return (
    <nav className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50">
      <div className="card-glass px-4 py-3 shadow-glow">
        <div className="flex items-center gap-1">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            
            return (
              <Link key={item.href} href={item.href}>
                <motion.div
                  whileHover={{ 
                    scale: 1.1,
                    y: -2,
                    backgroundColor: "rgba(255, 255, 255, 0.2)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  className={`relative p-3 rounded-xl transition-all duration-200 ${
                    isActive 
                      ? "bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg" 
                      : "text-slate-600 dark:text-slate-300 hover:text-slate-800 dark:hover:text-white"
                  }`}
                >
                  {/* Active indicator */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full shadow-lg"
                      />
                    )}
                  </AnimatePresence>
                  
                  <Icon className="w-5 h-5" />
                  
                  {/* Hover effect */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-xl"
                  />
                </motion.div>
              </Link>
            )
          })}
          
          {/* Info/Landing page link */}
          <Link href="/">
            <motion.div
              whileHover={{ 
                scale: 1.1,
                y: -2,
                backgroundColor: "rgba(255, 255, 255, 0.2)"
              }}
              whileTap={{ scale: 0.95 }}
              className="relative p-3 rounded-xl transition-all duration-200 text-slate-600 dark:text-slate-300 hover:text-slate-800 dark:hover:text-white"
            >
              <Info className="w-5 h-5" />
              
              {/* Hover effect */}
              <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-xl"
              />
            </motion.div>
          </Link>
        </div>
      </div>
    </nav>
  )
}
