// Mood data management
export interface MoodEntry {
  date: string
  mood: string
}

export interface JournalEntry {
  date: string
  entry: string[]
}

export const saveMoodData = (date: string, mood: string): void => {
  const existingData = getAllMoodData()
  const updatedData = existingData.filter((entry) => entry.date !== date)
  updatedData.push({ date, mood })
  localStorage.setItem("serenimate_moods", JSON.stringify(updatedData))
}

export const getMoodForDate = (date: string): string | null => {
  const data = getAllMoodData()
  const entry = data.find((entry) => entry.date === date)
  return entry ? entry.mood : null
}

export const getAllMoodData = (): MoodEntry[] => {
  const data = localStorage.getItem("serenimate_moods")
  return data ? JSON.parse(data) : []
}

// Journal data management
export const saveJournalData = (date: string, entry: string[]): void => {
  const existingData = getAllJournalData()
  const updatedData = existingData.filter((journal) => journal.date !== date)
  updatedData.push({ date, entry })
  localStorage.setItem("serenimate_journal", JSON.stringify(updatedData))
}

export const getJournalForDate = (date: string): JournalEntry | null => {
  const data = getAllJournalData()
  const entry = data.find((journal) => journal.date === date)
  return entry || null
}

export const getAllJournalData = (): JournalEntry[] => {
  const data = localStorage.getItem("serenimate_journal")
  return data ? JSON.parse(data) : []
}

// Theme management
export const saveTheme = (theme: "light" | "dark"): void => {
  localStorage.setItem("serenimate_theme", theme)
}

export const getTheme = (): "light" | "dark" | null => {
  return localStorage.getItem("serenimate_theme") as "light" | "dark" | null
}

// Clear all data
export const clearAllData = (): void => {
  localStorage.removeItem("serenimate_moods")
  localStorage.removeItem("serenimate_journal")
  localStorage.removeItem("serenimate_theme")
}
