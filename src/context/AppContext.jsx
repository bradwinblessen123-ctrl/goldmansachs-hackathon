import { createContext, useContext, useState, useCallback } from 'react'
import { COURSES } from '../data/courses'
import { USER } from '../data/portfolio'

const AppContext = createContext(null)

export function AppProvider({ children }) {
  const [onboarded, setOnboarded] = useState(false)
  const [userProfile, setUserProfile] = useState({
    name: USER.name,
    riskProfile: USER.riskProfile,
    goal: USER.goal,
    targetYear: USER.targetYear,
  })
  const [activeTerm, setActiveTerm] = useState(null)
  const [creditsEarned, setCreditsEarned] = useState(USER.creditsEarned)
  const [creditsAvailable, setCreditsAvailable] = useState(USER.creditsAvailable)
  const [courseProgress, setCourseProgress] = useState(() => {
    const init = {}
    COURSES.forEach(c => {
      init[c.id] = {
        completedModules: [],
        certificateEarned: false,
        started: false,
      }
    })
    return init
  })
  const [activeAICard, setActiveAICard] = useState(null)
  const [dismissedSignals, setDismissedSignals] = useState([])

  const openTerm = useCallback((termKey) => setActiveTerm(termKey), [])
  const closeTerm = useCallback(() => setActiveTerm(null), [])

  const completeModule = useCallback((courseId, moduleId) => {
    setCourseProgress(prev => {
      const cp = prev[courseId]
      if (cp.completedModules.includes(moduleId)) return prev
      const updated = { ...cp, completedModules: [...cp.completedModules, moduleId], started: true }
      return { ...prev, [courseId]: updated }
    })
  }, [])

  const earnCertificate = useCallback((courseId) => {
    setCourseProgress(prev => {
      if (prev[courseId].certificateEarned) return prev
      return { ...prev, [courseId]: { ...prev[courseId], certificateEarned: true } }
    })
    const course = COURSES.find(c => c.id === courseId)
    if (course) {
      setCreditsEarned(e => e + course.creditsOnCompletion)
      setCreditsAvailable(a => a + course.creditsOnCompletion)
    }
  }, [])

  const dismissSignal = useCallback((symbol) => {
    setDismissedSignals(prev => [...prev, symbol])
  }, [])

  return (
    <AppContext.Provider value={{
      onboarded, setOnboarded,
      userProfile, setUserProfile,
      activeTerm, openTerm, closeTerm,
      creditsEarned, creditsAvailable, setCreditsAvailable,
      courseProgress, completeModule, earnCertificate,
      activeAICard, setActiveAICard,
      dismissedSignals, dismissSignal,
    }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}
