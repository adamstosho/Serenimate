"use client"

import { motion } from "framer-motion"
import Link from "next/link"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-4 flex items-center justify-center">
      <div className="max-w-md mx-auto text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="text-8xl mb-4">🌸</div>
          <h1 className="text-4xl font-bold text-slate-800 dark:text-white mb-4 font-nunito">Page Not Found</h1>
          <p className="text-slate-600 dark:text-slate-300 mb-8 font-inter">
            Looks like you've wandered off the path to wellness. Let's get you back on track.
          </p>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              href="/"
              className="inline-block bg-teal-500 hover:bg-teal-600 text-white font-semibold px-8 py-3 rounded-full transition-colors"
            >
              Return Home
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
