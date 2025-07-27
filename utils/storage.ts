// Storage keys for consistency
const STORAGE_KEYS = {
  MOODS: "serenimate_moods",
  JOURNAL: "serenimate_journal",
  THEME: "serenimate_theme",
  SETTINGS: "serenimate_settings",
  SESSIONS: "serenimate_sessions"
} as const

// Data interfaces
export interface MoodEntry {
  date: string
  mood: string
  timestamp?: number
}

export interface JournalEntry {
  date: string
  entry: string[]
  timestamp?: number
}

export interface BreathingSession {
  date: string
  duration: number
  breaths: number
  timestamp?: number
}

export interface AppSettings {
  theme: "light" | "dark" | "system"
  notifications: boolean
  reminderTime?: string
}

// Utility functions for safe localStorage operations
const safeGetItem = (key: string): string | null => {
  try {
    return localStorage.getItem(key)
  } catch (error) {
    console.error(`Error reading from localStorage (${key}):`, error)
    return null
  }
}

const safeSetItem = (key: string, value: string): boolean => {
  try {
    localStorage.setItem(key, value)
    return true
  } catch (error) {
    console.error(`Error writing to localStorage (${key}):`, error)
    return false
  }
}

const safeRemoveItem = (key: string): boolean => {
  try {
    localStorage.removeItem(key)
    return true
  } catch (error) {
    console.error(`Error removing from localStorage (${key}):`, error)
    return false
  }
}

// Data validation functions
const isValidDate = (date: string): boolean => {
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/
  return dateRegex.test(date) && !isNaN(Date.parse(date))
}

const isValidMood = (mood: string): boolean => {
  const validMoods = ["amazing", "good", "okay", "down", "terrible"]
  return validMoods.includes(mood)
}

const isValidJournalEntry = (entry: string[]): boolean => {
  return Array.isArray(entry) && entry.every(item => typeof item === "string")
}

// Mood data management
export const saveMoodData = (date: string, mood: string): boolean => {
  if (!isValidDate(date) || !isValidMood(mood)) {
    console.error("Invalid mood data:", { date, mood })
    return false
  }

  const existingData = getAllMoodData()
  const updatedData = existingData.filter((entry) => entry.date !== date)
  updatedData.push({ 
    date, 
    mood, 
    timestamp: Date.now() 
  })
  
  // Sort by date for consistency
  updatedData.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  
  const success = safeSetItem(STORAGE_KEYS.MOODS, JSON.stringify(updatedData))
  
  if (success) {
    console.log(`Mood data saved for ${date}:`, mood)
  }
  
  return success
}

export const getMoodForDate = (date: string): string | null => {
  if (!isValidDate(date)) {
    console.error("Invalid date format:", date)
    return null
  }

  const data = getAllMoodData()
  const entry = data.find((entry) => entry.date === date)
  return entry ? entry.mood : null
}

export const getAllMoodData = (): MoodEntry[] => {
  const data = safeGetItem(STORAGE_KEYS.MOODS)
  if (!data) return []
  
  try {
    const parsed = JSON.parse(data)
    if (!Array.isArray(parsed)) {
      console.error("Invalid mood data format")
      return []
    }
    
    // Validate and clean data
    return parsed.filter((entry: any) => 
      entry && 
      typeof entry === "object" && 
      isValidDate(entry.date) && 
      isValidMood(entry.mood)
    )
  } catch (error) {
    console.error("Error parsing mood data:", error)
    return []
  }
}

// Journal data management
export const saveJournalData = (date: string, entry: string[]): boolean => {
  if (!isValidDate(date) || !isValidJournalEntry(entry)) {
    console.error("Invalid journal data:", { date, entry })
    return false
  }

  const existingData = getAllJournalData()
  const updatedData = existingData.filter((journal) => journal.date !== date)
  updatedData.push({ 
    date, 
    entry, 
    timestamp: Date.now() 
  })
  
  // Sort by date for consistency
  updatedData.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  
  const success = safeSetItem(STORAGE_KEYS.JOURNAL, JSON.stringify(updatedData))
  
  if (success) {
    console.log(`Journal data saved for ${date}:`, entry.length, "entries")
  }
  
  return success
}

export const getJournalForDate = (date: string): JournalEntry | null => {
  if (!isValidDate(date)) {
    console.error("Invalid date format:", date)
    return null
  }

  const data = getAllJournalData()
  const entry = data.find((journal) => journal.date === date)
  return entry || null
}

export const getAllJournalData = (): JournalEntry[] => {
  const data = safeGetItem(STORAGE_KEYS.JOURNAL)
  if (!data) return []
  
  try {
    const parsed = JSON.parse(data)
    if (!Array.isArray(parsed)) {
      console.error("Invalid journal data format")
      return []
    }
    
    // Validate and clean data
    return parsed.filter((entry: any) => 
      entry && 
      typeof entry === "object" && 
      isValidDate(entry.date) && 
      isValidJournalEntry(entry.entry)
    )
  } catch (error) {
    console.error("Error parsing journal data:", error)
    return []
  }
}

// Breathing session management
export const saveBreathingSession = (date: string, duration: number, breaths: number): boolean => {
  if (!isValidDate(date) || duration < 0 || breaths < 0) {
    console.error("Invalid breathing session data:", { date, duration, breaths })
    return false
  }

  const existingData = getAllBreathingSessions()
  const updatedData = existingData.filter((session) => session.date !== date)
  updatedData.push({ 
    date, 
    duration, 
    breaths, 
    timestamp: Date.now() 
  })
  
  // Sort by date for consistency
  updatedData.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  
  const success = safeSetItem(STORAGE_KEYS.SESSIONS, JSON.stringify(updatedData))
  
  if (success) {
    console.log(`Breathing session saved for ${date}:`, { duration, breaths })
  }
  
  return success
}

export const getAllBreathingSessions = (): BreathingSession[] => {
  const data = safeGetItem(STORAGE_KEYS.SESSIONS)
  if (!data) return []
  
  try {
    const parsed = JSON.parse(data)
    if (!Array.isArray(parsed)) {
      console.error("Invalid breathing sessions data format")
      return []
    }
    
    // Validate and clean data
    return parsed.filter((session: any) => 
      session && 
      typeof session === "object" && 
      isValidDate(session.date) && 
      typeof session.duration === "number" && 
      typeof session.breaths === "number"
    )
  } catch (error) {
    console.error("Error parsing breathing sessions data:", error)
    return []
  }
}

// Settings management
export const saveSettings = (settings: Partial<AppSettings>): boolean => {
  const existingSettings = getSettings()
  const updatedSettings = { ...existingSettings, ...settings }
  
  const success = safeSetItem(STORAGE_KEYS.SETTINGS, JSON.stringify(updatedSettings))
  
  if (success) {
    console.log("Settings saved:", updatedSettings)
  }
  
  return success
}

export const getSettings = (): AppSettings => {
  const data = safeGetItem(STORAGE_KEYS.SETTINGS)
  if (!data) {
    return {
      theme: "system",
      notifications: true
    }
  }
  
  try {
    const parsed = JSON.parse(data)
    return {
      theme: parsed.theme || "system",
      notifications: parsed.notifications !== false,
      reminderTime: parsed.reminderTime
    }
  } catch (error) {
    console.error("Error parsing settings:", error)
    return {
      theme: "system",
      notifications: true
    }
  }
}

// Theme management (backward compatibility)
export const saveTheme = (theme: "light" | "dark"): boolean => {
  return saveSettings({ theme })
}

export const getTheme = (): "light" | "dark" | null => {
  const settings = getSettings()
  return settings.theme === "system" ? null : settings.theme
}

// Data export functionality
export const exportAllData = (): string => {
  const data = {
    moods: getAllMoodData(),
    journal: getAllJournalData(),
    breathingSessions: getAllBreathingSessions(),
    settings: getSettings(),
    exportDate: new Date().toISOString(),
    version: "1.0.0"
  }
  
  return JSON.stringify(data, null, 2)
}

// Data import functionality
export const importData = (jsonData: string): boolean => {
  try {
    const data = JSON.parse(jsonData)
    
    if (data.moods && Array.isArray(data.moods)) {
      safeSetItem(STORAGE_KEYS.MOODS, JSON.stringify(data.moods))
    }
    
    if (data.journal && Array.isArray(data.journal)) {
      safeSetItem(STORAGE_KEYS.JOURNAL, JSON.stringify(data.journal))
    }
    
    if (data.breathingSessions && Array.isArray(data.breathingSessions)) {
      safeSetItem(STORAGE_KEYS.SESSIONS, JSON.stringify(data.breathingSessions))
    }
    
    if (data.settings && typeof data.settings === "object") {
      safeSetItem(STORAGE_KEYS.SETTINGS, JSON.stringify(data.settings))
    }
    
    console.log("Data imported successfully")
    return true
  } catch (error) {
    console.error("Error importing data:", error)
    return false
  }
}

// Clear all data
export const clearAllData = (): boolean => {
  const success = Object.values(STORAGE_KEYS).every(key => safeRemoveItem(key))
  
  if (success) {
    console.log("All data cleared successfully")
  }
  
  return success
}

// Get storage statistics
export const getStorageStats = () => {
  const moods = getAllMoodData()
  const journal = getAllJournalData()
  const sessions = getAllBreathingSessions()
  
  return {
    totalMoodEntries: moods.length,
    totalJournalEntries: journal.length,
    totalBreathingSessions: sessions.length,
    storageSize: JSON.stringify({ moods, journal, sessions }).length,
    lastMoodEntry: moods[0]?.date || null,
    lastJournalEntry: journal[0]?.date || null,
    lastBreathingSession: sessions[0]?.date || null
  }
}

// Check if localStorage is available
export const isLocalStorageAvailable = (): boolean => {
  try {
    const test = "__localStorage_test__"
    localStorage.setItem(test, test)
    localStorage.removeItem(test)
    return true
  } catch {
    return false
  }
}
