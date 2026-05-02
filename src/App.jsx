import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { AppProvider, useApp } from './context/AppContext'
import BottomNav from './components/BottomNav'
import TermDrawer from './components/TermDrawer'
import Onboarding from './screens/Onboarding'
import Dashboard from './screens/Dashboard'
import Holdings from './screens/Holdings'
import PositionDetail from './screens/PositionDetail'
import MarketIntel from './screens/MarketIntel'
import LearningCenter from './screens/LearningCenter'
import Goals from './screens/Goals'
import Scenarios from './screens/Scenarios'

function AppShell() {
  const { onboarded, activeTerm, closeTerm } = useApp()
  const location = useLocation()

  if (!onboarded) return <Onboarding />

  return (
    <div className="app-shell">
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/holdings" element={<Holdings />} />
          <Route path="/holdings/:symbol" element={<PositionDetail />} />
          <Route path="/markets" element={<MarketIntel />} />
          <Route path="/learn" element={<LearningCenter />} />
          <Route path="/goals" element={<Goals />} />
          <Route path="/scenarios" element={<Scenarios />} />
        </Routes>
      </AnimatePresence>
      <BottomNav />
      <TermDrawer termKey={activeTerm} onClose={closeTerm} />
    </div>
  )
}

export default function App() {
  return (
    <AppProvider>
      <AppShell />
    </AppProvider>
  )
}
