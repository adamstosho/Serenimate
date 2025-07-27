"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { 
  getStorageStats, 
  isLocalStorageAvailable, 
  exportAllData, 
  importData,
  exportToPDF,
  clearAllData 
} from "@/utils/storage"
import { Database, Download, Upload, Trash2, RefreshCw, CheckCircle, AlertCircle, FileText } from "lucide-react"
import { AnimatePresence } from "framer-motion"

export default function StorageDebug() {
  const [stats, setStats] = useState<any>(null)
  const [isAvailable, setIsAvailable] = useState(false)
  const [showImport, setShowImport] = useState(false)
  const [importData, setImportData] = useState("")
  const [importMessage, setImportMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    updateStats()
    setIsAvailable(isLocalStorageAvailable())
  }, [])

  const updateStats = () => {
    setStats(getStorageStats())
  }

  const handleExport = () => {
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
        setImportMessage("PDF exported successfully!")
        setTimeout(() => setImportMessage(""), 3000)
      } else {
        setImportMessage(result.message || "Failed to generate PDF")
        setTimeout(() => setImportMessage(""), 3000)
      }
    } catch (error) {
      setImportMessage("Error generating PDF")
      setTimeout(() => setImportMessage(""), 3000)
    } finally {
      setIsLoading(false)
    }
  }

  const handleImport = () => {
    if (importData.trim()) {
      setIsLoading(true)
      const result = importData(importData)
      
      if (result.success) {
        updateStats()
        setShowImport(false)
        setImportData("")
        setImportMessage(result.message)
        setTimeout(() => setImportMessage(""), 3000)
      } else {
        setImportMessage(result.message)
        setTimeout(() => setImportMessage(""), 3000)
      }
      setIsLoading(false)
    }
  }

  const handleClear = () => {
    if (confirm("Are you sure you want to clear all data? This cannot be undone.")) {
      const success = clearAllData()
      if (success) {
        updateStats()
        setImportMessage("All data cleared successfully!")
        setTimeout(() => setImportMessage(""), 3000)
      } else {
        setImportMessage("Failed to clear data.")
        setTimeout(() => setImportMessage(""), 3000)
      }
    }
  }

  if (!isAvailable) {
    return (
      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4 mb-6">
        <div className="flex items-center gap-2 text-red-700 dark:text-red-300">
          <AlertCircle className="w-5 h-5" />
          <span className="font-medium">localStorage is not available</span>
        </div>
        <p className="text-sm text-red-600 dark:text-red-400 mt-1">
          Data persistence may not work properly in this environment.
        </p>
      </div>
    )
  }

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6 mb-6">
      <div className="flex items-center gap-2 mb-4">
        <Database className="w-5 h-5 text-slate-600 dark:text-slate-400" />
        <h3 className="font-semibold text-slate-800 dark:text-white">Storage Debug</h3>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={updateStats}
          className="ml-auto p-2 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
        >
          <RefreshCw className="w-4 h-4" />
        </motion.button>
      </div>

      {/* Message Display */}
      <AnimatePresence>
        {importMessage && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`mb-4 p-3 rounded-lg text-sm ${
              importMessage.includes("successfully") || importMessage.includes("Successfully")
                ? "bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-300"
                : "bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300"
            }`}
          >
            {importMessage}
          </motion.div>
        )}
      </AnimatePresence>

      {stats && (
        <div className="space-y-3 mb-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-3">
              <div className="text-2xl font-bold text-slate-800 dark:text-white">
                {stats.totalMoodEntries}
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400">Mood Entries</div>
            </div>
            <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-3">
              <div className="text-2xl font-bold text-slate-800 dark:text-white">
                {stats.totalJournalEntries}
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400">Journal Entries</div>
            </div>
          </div>
          
          <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-3">
            <div className="text-sm text-slate-600 dark:text-slate-400">
              Storage Size: {(stats.storageSize / 1024).toFixed(2)} KB
            </div>
            <div className="text-sm text-slate-600 dark:text-slate-400">
              Last Mood: {stats.lastMoodEntry || "None"}
            </div>
            <div className="text-sm text-slate-600 dark:text-slate-400">
              Last Journal: {stats.lastJournalEntry || "None"}
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 gap-2 mb-4">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleExport}
          disabled={isLoading}
          className="flex items-center justify-center gap-2 px-3 py-2 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white text-sm rounded-lg transition-colors"
        >
          <Download className="w-4 h-4" />
          Export JSON
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handlePDFExport}
          disabled={isLoading}
          className="flex items-center justify-center gap-2 px-3 py-2 bg-green-500 hover:bg-green-600 disabled:bg-green-300 text-white text-sm rounded-lg transition-colors"
        >
          <FileText className="w-4 h-4" />
          Export PDF
        </motion.button>
      </div>

      <div className="flex gap-2">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowImport(!showImport)}
          disabled={isLoading}
          className="flex items-center justify-center gap-2 px-3 py-2 bg-purple-500 hover:bg-purple-600 disabled:bg-purple-300 text-white text-sm rounded-lg transition-colors flex-1"
        >
          <Upload className="w-4 h-4" />
          Import
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleClear}
          disabled={isLoading}
          className="flex items-center justify-center gap-2 px-3 py-2 bg-red-500 hover:bg-red-600 disabled:bg-red-300 text-white text-sm rounded-lg transition-colors"
        >
          <Trash2 className="w-4 h-4" />
          Clear
        </motion.button>
      </div>

      {showImport && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="mt-4"
        >
          <textarea
            value={importData}
            onChange={(e) => setImportData(e.target.value)}
            placeholder="Paste JSON data here..."
            className="w-full p-3 border border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 resize-none"
            rows={4}
          />
          <div className="flex gap-2 mt-2">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleImport}
              disabled={isLoading || !importData.trim()}
              className="px-4 py-2 bg-green-500 hover:bg-green-600 disabled:bg-green-300 text-white text-sm rounded-lg transition-colors"
            >
              {isLoading ? "Importing..." : "Import Data"}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                setShowImport(false)
                setImportData("")
              }}
              className="px-4 py-2 bg-slate-500 hover:bg-slate-600 text-white text-sm rounded-lg transition-colors"
            >
              Cancel
            </motion.button>
          </div>
        </motion.div>
      )}
    </div>
  )
} 