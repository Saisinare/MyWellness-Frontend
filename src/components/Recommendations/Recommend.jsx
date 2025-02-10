"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Activity, Moon, Brain, Check, AlertTriangle, Sparkles } from "lucide-react"

export default function Recommend() {
  const [expandedCard, setExpandedCard] = useState(null)
  const [prediction, setPrediction] = useState(null)
  const [isPredicting, setIsPredicting] = useState(false)

  // Simulate prediction API call
  const predictSleepDisorder = async () => {
    setIsPredicting(true)
    // Simulating API call delay
    await new Promise((resolve) => setTimeout(resolve, 3000))
    // Random prediction for demo
    const result = {
      success: true,
      prediction: Math.random() > 0.5 ? 1 : 0,
      message: "Sleep disorder predicted successfully",
    }
    setPrediction(result)
    setIsPredicting(true)
  }

  useEffect(() => {
    predictSleepDisorder()
  }, [predictSleepDisorder]) // Added predictSleepDisorder to dependencies

  return (
    <div className="min-h-screen bg-gradient-to-b p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex items-center gap-4 mb-12">
          <Sparkles className="h-10 w-10 text-blue-600 dark:text-blue-400" />
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Health Dashboard</h1>
        </div>

        {/* Sleep Disorder Prediction Card */}
        <div className="mb-12">
          <motion.div
            className="bg-white  rounded-2xl shadow-xl overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="p-8">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-full bg-black dark:bg-blue-900">
                    <Brain className="h-8 w-8 text-white dark:text-gray-400" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Sleep Disorder Analysis</h2>
                </div>
              </div>

              <div className="mt-8">
                {isPredicting ? (
                  <PredictionAnimation />
                ) : prediction ? (
                  <PredictionResult prediction={prediction} />
                ) : null}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Health Recommendations Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <RecommendationCard
            title="Sleep Health"
            icon={<Moon className="h-8 w-8" />}
            image="/placeholder.svg?height=200&width=400"
            data={healthData.sleep.response}
            isExpanded={expandedCard === "sleep"}
            onClick={() => setExpandedCard(expandedCard === "sleep" ? null : "sleep")}
          />
          <RecommendationCard
            title="Physical Activity"
            icon={<Activity className="h-8 w-8" />}
            image="/placeholder.svg?height=200&width=400"
            data={healthData.physical.response}
            isExpanded={expandedCard === "activity"}
            onClick={() => setExpandedCard(expandedCard === "activity" ? null : "activity")}
          />
        </div>
      </div>
    </div>
  )
}

function PredictionAnimation() {
  return (
    <div className="flex flex-col items-center justify-center py-8">
      <motion.div
        className="relative w-64 h-64"
        animate={{ rotate: 360 }}
        transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-32 h-32 border-4 border-black rounded-full border-t-transparent animate-spin" />
        </div>
        {[0, 1, 2, 3].map((i) => (
          <motion.div
            key={i}
            className="absolute w-3 h-3 bg-black rounded-full"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [1, 0.5, 1],
            }}
            transition={{
              duration: 1,
              repeat: Number.POSITIVE_INFINITY,
              delay: i * 0.2,
            }}
            style={{
              top: `${50 + Math.sin(i * (Math.PI / 2)) * 40}%`,
              left: `${50 + Math.cos(i * (Math.PI / 2)) * 40}%`,
            }}
          />
        ))}
      </motion.div>
      <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">Analyzing sleep patterns...</p>
    </div>
  )
}

function PredictionResult({ prediction }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="rounded-xl p-6 bg-gray-50 dark:bg-gray-700"
    >
      {prediction.prediction === 1 ? (
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <AlertTriangle className="h-8 w-8 text-amber-500" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Sleep Disorder Detected</h3>
          </div>
          <div className="pl-11 space-y-3">
            <p className="text-gray-600 dark:text-gray-300">
              Our analysis indicates potential sleep-related concerns. Here are some professional recommendations:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-300">
              <li>Consider consulting a sleep specialist for a thorough evaluation</li>
              <li>Keep a sleep diary to track your patterns</li>
              <li>Review and adjust your sleep hygiene practices</li>
              <li>Schedule a follow-up appointment for detailed assessment</li>
            </ul>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Check className="h-8 w-8 text-green-500" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Healthy Sleep Patterns</h3>
          </div>
          <div className="pl-11">
            <p className="text-gray-600 dark:text-gray-300">
              Great news! Your sleep patterns appear to be healthy. Continue maintaining good sleep hygiene and regular
              sleep schedule.
            </p>
          </div>
          <motion.div
            className="pl-11 pt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="inline-block mr-2"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.8 + i * 0.1 }}
              >
                <span className="text-2xl">🌟</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      )}
    </motion.div>
  )
}

function RecommendationCard({ title, icon, image, data, isExpanded, onClick }) {
  return (
    <motion.div layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      <div
        className={`bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-2xl ${
          isExpanded ? "ring-2 ring-black" : ""
        }`}
        onClick={onClick}
      >
        <div className="relative h-48 overflow-hidden">
          <img
            src={image || "/placeholder.svg"}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-0 left-0 p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-white/10 text-white backdrop-blur-sm">{icon}</div>
              <h2 className="text-2xl font-bold text-white">{title}</h2>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="p-6 space-y-6">
                {data.map((item, index) => (
                  <motion.div
                    key={item.Title}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="space-y-4"
                  >
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{item.Title}</h3>
                    <p className="text-gray-600 dark:text-gray-300">{item.Summary}</p>
                    <div className="space-y-4">
                      {Object.entries(item.Description).map(([key, value]) => (
                        <div key={key} className="pl-4 border-l-2 border-black">
                          <h4 className="font-medium text-gray-900 dark:text-white">{key}</h4>
                          {typeof value === "string" ? (
                            <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">{value}</p>
                          ) : (
                            <ul className="mt-2 space-y-2">
                              {Object.entries(value).map(([subKey, subValue]) => (
                                <li key={subKey} className="text-sm text-gray-600 dark:text-gray-300">
                                  <span className="font-medium">{subKey}:</span> {subValue}
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {!isExpanded && (
          <div className="p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-sm text-gray-600 dark:text-gray-300"
            >
              Click to explore detailed recommendations
              <div className="mt-4 h-1 w-full bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gray-900 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                />
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </motion.div>
  )
}

const healthData = {
  sleep: {
    response: [
      {
        Title: "Optimized Sleep Strategies",
        Summary: "Actionable sleep improvement recommendations tailored to individual sleep patterns.",
        Description: {
          "Adjust Bedtime Routine": "Establish a consistent sleep schedule and create a relaxing bedtime routine.",
          "Optimize Sleep Cycles": "Gradually adjust sleep duration to achieve 7-9 hours of sleep per night.",
          "Address Disturbances":
            "Implement relaxation techniques, such as deep breathing or progressive muscle relaxation, to reduce stress and anxiety.",
        },
      },
      {
        Title: "Lifestyle Adjustments for Better Sleep",
        Summary: "Practical changes in daily habits to enhance sleep quality.",
        Description: {
          "Structured Bedtime Routine":
            "Establish a calming pre-sleep routine, including activities like reading or meditation.",
          "Environmental Modifications": "Optimize sleep environment by controlling light, noise, and temperature.",
          "Scientifically Backed Sleep Hygiene Tips": {
            "Avoid Screens Before Bed": "Limit exposure to screens for at least an hour before bedtime.",
            "Exercise Regularly":
              "Engage in regular physical activity, but avoid vigorous exercise within 2 hours of bedtime.",
            "Avoid Stimulants": "Limit consumption of caffeine, nicotine, and heavy meals close to bedtime.",
          },
        },
      },
    ],
  },
  physical: {
    response: [
      {
        Title: "Personalized Exercise Plan",
        Summary: "Customized physical activity recommendations based on your fitness level.",
        Description: {
          "Cardio Activities":
            "Engage in 150 minutes of moderate-intensity or 75 minutes of vigorous-intensity aerobic activity weekly.",
          "Strength Training": "Include muscle-strengthening activities at least 2 days per week.",
          "Flexibility Work": "Incorporate stretching and mobility exercises daily for better range of motion.",
        },
      },
      {
        Title: "Daily Movement Strategies",
        Summary: "Simple ways to increase daily physical activity levels.",
        Description: {
          "Active Breaks": "Take short walking breaks every hour during sedentary activities.",
          "Lifestyle Integration": {
            "Take the Stairs": "Choose stairs over elevator when possible.",
            "Walking Meetings": "Convert sedentary meetings into walking discussions.",
            "Active Commuting": "Consider biking or walking for short-distance travel.",
          },
          "Movement Reminders": "Set regular reminders to stand up and move throughout the day.",
        },
      },
    ],
  },
}