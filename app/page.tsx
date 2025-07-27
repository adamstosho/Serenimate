"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"
import { 
  Heart, 
  Sparkles, 
  Wind, 
  BookOpen, 
  TrendingUp, 
  ArrowRight, 
  Play,
  CheckCircle,
  Star,
  Moon,
  Sun,
  Coffee
} from "lucide-react"

export default function LandingPage() {
  const router = useRouter()
  const [currentFeature, setCurrentFeature] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)

  const features = [
    {
      icon: Heart,
      title: "Mood Tracking",
      description: "Track your daily emotions and build awareness of your mental well-being",
      color: "from-pink-400 to-rose-500"
    },
    {
      icon: BookOpen,
      title: "Gratitude Journal",
      description: "Practice gratitude through daily reflection and positive thinking",
      color: "from-purple-400 to-pink-500"
    },
    {
      icon: Wind,
      title: "Mindful Breathing",
      description: "Find your calm with guided breathing exercises and meditation",
      color: "from-blue-400 to-cyan-500"
    },
    {
      icon: TrendingUp,
      title: "Progress Insights",
      description: "Visualize your wellness journey with detailed analytics and trends",
      color: "from-green-400 to-emerald-500"
    }
  ]

  useEffect(() => {
    setIsLoaded(true)
    
    // Auto-rotate features
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const handleGetStarted = () => {
    router.push("/app")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-slate-900 dark:via-purple-900 dark:to-slate-900 overflow-hidden">
      {/* Background Animation */}
      <div className="fixed inset-0">
        <motion.div
          animate={{
            background: [
              "radial-gradient(circle at 20% 80%, rgba(102, 126, 234, 0.1) 0%, transparent 50%)",
              "radial-gradient(circle at 80% 20%, rgba(118, 75, 162, 0.1) 0%, transparent 50%)",
              "radial-gradient(circle at 40% 40%, rgba(236, 72, 153, 0.1) 0%, transparent 50%)",
              "radial-gradient(circle at 20% 80%, rgba(102, 126, 234, 0.1) 0%, transparent 50%)"
            ]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0"
        />
        
        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full opacity-30"
            animate={{
              x: [0, 100, 0],
              y: [0, -100, 0],
              scale: [0, 1, 0],
              opacity: [0, 0.5, 0]
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut"
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
            className="inline-block mb-6"
          >
            <div className="relative">
              <Sparkles className="w-16 h-16 text-gradient mx-auto" />
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full blur-xl opacity-30"
              />
            </div>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-6xl md:text-7xl font-bold mb-6 heading-gradient"
          >
            SereniMate
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto mb-8"
          >
            Your daily companion for mental wellness and mindful living
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex items-center justify-center gap-4 mb-12"
          >
            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span>Free & Private</span>
            </div>
            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span>No Ads</span>
            </div>
            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span>Offline Ready</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Feature Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white mb-4">
              Everything you need for mental wellness
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-300">
              Simple tools to help you build healthy habits and find inner peace
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1 + index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="card-glass p-6 text-center group"
                >
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg`}
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </motion.div>
                  
                  <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-2">
                    {feature.title}
                  </h3>
                  
                  <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* Animated Feature Highlight */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="card-glass p-8 mb-16 text-center"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentFeature}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="space-y-4"
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                className={`w-20 h-20 bg-gradient-to-br ${features[currentFeature].color} rounded-3xl flex items-center justify-center mx-auto shadow-xl`}
              >
                {(() => {
                  const Icon = features[currentFeature].icon
                  return <Icon className="w-10 h-10 text-white" />
                })()}
              </motion.div>
              
              <h3 className="text-2xl font-bold text-slate-800 dark:text-white">
                {features[currentFeature].title}
              </h3>
              
              <p className="text-slate-600 dark:text-slate-300 max-w-md mx-auto">
                {features[currentFeature].description}
              </p>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Testimonials */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="mb-16"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-slate-800 dark:text-white mb-4">
              Join thousands of users
            </h2>
            <p className="text-slate-600 dark:text-slate-300">
              People are already improving their mental wellness with SereniMate
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: "Sarah M.",
                text: "SereniMate helped me develop a daily gratitude practice. I feel more positive and mindful.",
                rating: 5
              },
              {
                name: "Alex K.",
                text: "The breathing exercises are amazing. I use them whenever I feel stressed or anxious.",
                rating: 5
              },
              {
                name: "Maria L.",
                text: "Tracking my mood daily has given me insights into my emotional patterns. Highly recommend!",
                rating: 5
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.6 + index * 0.1 }}
                className="card-glass p-6"
              >
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                
                <p className="text-slate-600 dark:text-slate-300 mb-4 italic">
                  "{testimonial.text}"
                </p>
                
                <p className="font-semibold text-slate-800 dark:text-white">
                  {testimonial.name}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.8 }}
          className="text-center"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block"
          >
            <motion.button
              onClick={handleGetStarted}
              className="btn-primary text-lg px-8 py-4 flex items-center gap-3 mx-auto shadow-2xl"
            >
              <Play className="w-5 h-5" />
              Start Your Wellness Journey
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </motion.div>
          
          <p className="text-slate-500 dark:text-slate-400 mt-4 text-sm">
            No registration required • Your data stays private
          </p>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 2 }}
          className="text-center mt-16 pt-8 border-t border-white/20"
        >
          <div className="flex items-center justify-center gap-6 mb-4">
            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
              <Heart className="w-4 h-4 text-pink-500" />
              <span>Made with love</span>
            </div>
            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
              <Moon className="w-4 h-4 text-blue-500" />
              <span>Dark mode ready</span>
            </div>
            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
              <Coffee className="w-4 h-4 text-orange-500" />
              <span>Free forever</span>
            </div>
          </div>
          
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            © 2024 SereniMate. Your mental wellness companion.
          </p>
        </motion.div>
      </div>
    </div>
  )
}
