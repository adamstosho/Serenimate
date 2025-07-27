"use client"

import { motion, AnimatePresence } from "framer-motion"
import ThemeToggle from "@/components/theme-toggle"
import StorageDebug from "@/components/storage-debug"
import { clearAllData, exportAllData, exportToPDF } from "@/utils/storage"
import { useState } from "react"
import { AlertTriangle, CheckCircle, Info, Trash2, Download, Upload, FileText } from "lucide-react"

export default function Settings() {
  const [showConfirm, setShowConfirm] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [showInfo, setShowInfo] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleReset = () => {
    if (showConfirm) {
      const success = clearAllData()
      setShowConfirm(false)
      
      if (success) {
        setShowSuccess(true)
        // Hide success message after 3 seconds
        setTimeout(() => setShowSuccess(false), 3000)
      } else {
        console.error("Failed to clear data")
        // You could add an error state here if needed
      }
    } else {
      setShowConfirm(true)
    }
  }

  const handleExportData = () => {
    const data = exportAllData()
    
    const blob = new Blob([data], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `serenimate-data-${new Date().toISOString().split('T')[0]}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  const handlePDFExport = async () => {
    setIsLoading(true)
    try {
      const result = await exportToPDF()
      if (result.success && result.blob) {
        const url = URL.createObjectURL(result.blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `serenimate-report-${new Date().toISOString().split('T')[0]}.pdf`
        a.click()
        URL.revokeObjectURL(url)
      } else {
        console.error("Failed to generate PDF:", result.message)
      }
    } catch (error) {
      console.error("Error generating PDF:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-slate-900 dark:to-slate-800 p-4">
      <div className="max-w-md mx-auto pt-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-bold text-slate-800 dark:text-white mb-2 font-nunito">Settings</h1>
          <p className="text-slate-600 dark:text-slate-300 font-inter">Customize your SereniMate experience</p>
        </motion.div>

        {/* Success Message */}
        <AnimatePresence>
          {showSuccess && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.8 }}
              className="mb-6 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-4 flex items-center gap-3"
            >
              <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
              <div>
                <p className="font-medium text-green-800 dark:text-green-200">Data cleared successfully!</p>
                <p className="text-sm text-green-600 dark:text-green-400">Your app has been reset to default</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6 mb-6"
        >
          <h2 className="text-xl font-semibold text-slate-800 dark:text-white mb-4 font-nunito">Appearance</h2>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-slate-700 dark:text-slate-300">Theme</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">Switch between light and dark mode</p>
            </div>
            <ThemeToggle />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6 mb-6"
        >
          <h2 className="text-xl font-semibold text-slate-800 dark:text-white mb-4 font-nunito">Data Management</h2>
          <div className="space-y-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Download className="w-4 h-4 text-blue-500" />
                <p className="font-medium text-slate-700 dark:text-slate-300">Export Data</p>
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">
                Download your mood and journal data as JSON or PDF.
              </p>
              <div className="grid grid-cols-2 gap-2">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleExportData}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                >
                  Export JSON
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handlePDFExport}
                  disabled={isLoading}
                  className="w-full bg-green-500 hover:bg-green-600 disabled:bg-green-300 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <FileText className="w-4 h-4" />
                  {isLoading ? "Generating..." : "Export PDF"}
                </motion.button>
              </div>
            </div>

            <div className="border-t border-slate-200 dark:border-slate-600 pt-4">
              <div className="flex items-center gap-2 mb-2">
                <Trash2 className="w-4 h-4 text-red-500" />
                <p className="font-medium text-slate-700 dark:text-slate-300">Reset All Data</p>
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">
                This will permanently delete all your mood data and journal entries.
              </p>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleReset}
                className={`w-full font-medium py-2 px-4 rounded-lg transition-colors ${
                  showConfirm
                    ? "bg-red-500 hover:bg-red-600 text-white"
                    : "bg-red-100 hover:bg-red-200 text-red-700 dark:bg-red-900/20 dark:text-red-400 dark:hover:bg-red-900/30"
                }`}
              >
                {showConfirm ? "Confirm Reset" : "Reset All Data"}
              </motion.button>
              {showConfirm && (
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowConfirm(false)}
                  className="w-full mt-2 bg-slate-200 hover:bg-slate-300 text-slate-700 dark:bg-slate-600 dark:hover:bg-slate-500 dark:text-slate-300 font-medium py-2 px-4 rounded-lg transition-colors"
                >
                  Cancel
                </motion.button>
              )}
            </div>
          </div>
        </motion.div>

        {/* Storage Debug Component */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <StorageDebug />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6 mb-6"
        >
          <h2 className="text-xl font-semibold text-slate-800 dark:text-white mb-4 font-nunito">About</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-slate-600 dark:text-slate-400">Version</span>
              <span className="font-medium text-slate-700 dark:text-slate-300">1.0.0</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-600 dark:text-slate-400">Last Updated</span>
              <span className="font-medium text-slate-700 dark:text-slate-300">Today</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-600 dark:text-slate-400">Data Storage</span>
              <span className="font-medium text-slate-700 dark:text-slate-300">Local</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center text-slate-500 dark:text-slate-400 text-sm"
        >
          <p className="mb-2">SereniMate. Built by ART_Redox💖</p>
          <p className="mb-4">Your mental wellness companion</p>
          <button
            type="button"
            onClick={() => setShowInfo(!showInfo)}
            className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 underline"
          >
            Privacy & Data
          </button>
        </motion.div>

        {/* Privacy Info Modal */}
        <AnimatePresence>
          {showInfo && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
              onClick={() => setShowInfo(false)}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="bg-white dark:bg-slate-800 rounded-2xl p-6 max-w-sm w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center gap-2 mb-4">
                  <Info className="w-5 h-5 text-blue-500" />
                  <h3 className="font-semibold text-slate-800 dark:text-white">Privacy & Data</h3>
                </div>
                <div className="space-y-3 text-sm text-slate-600 dark:text-slate-400">
                  <p>• All data is stored locally on your device</p>
                  <p>• No data is sent to external servers</p>
                  <p>• You can export your data anytime</p>
                  <p>• Data is automatically backed up in your browser</p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowInfo(false)}
                  className="w-full mt-4 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                >
                  Got it
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
