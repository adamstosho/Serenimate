import type React from "react"

import { Inter, Nunito, Merriweather } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Navigation from "@/components/navigation"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
})

const merriweather = Merriweather({
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
  variable: "--font-merriweather",
})

export const metadata = {
  title: "SereniMate - Your Mental Wellness Companion",
  description: "Track your mood, practice gratitude, and find inner peace with SereniMate. Your daily companion for mental wellness and mindful living.",
  keywords: "mental wellness, mood tracking, gratitude journal, breathing exercises, mindfulness, meditation",
  authors: [{ name: "SereniMate Team" }],
  creator: "SereniMate",
  publisher: "SereniMate",
  robots: "index, follow",
  icons: {
    icon: '/icon',
    apple: '/apple-icon',
  },
  openGraph: {
    title: "SereniMate - Your Mental Wellness Companion",
    description: "Track your mood, practice gratitude, and find inner peace with SereniMate.",
    url: "https://serenimate.app",
    siteName: "SereniMate",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "SereniMate - Mental Wellness App",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SereniMate - Your Mental Wellness Companion",
    description: "Track your mood, practice gratitude, and find inner peace with SereniMate.",
    images: ["/og-image.png"],
  },
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${nunito.variable} ${merriweather.variable} font-inter`}>
        <ThemeProvider
          defaultTheme="system"
          storageKey="serenimate-theme"
        >
          <div className="min-h-screen bg-background">
            {children}
            <Navigation />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
