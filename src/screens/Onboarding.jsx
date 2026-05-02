import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { ChevronRight, Target, Shield, Clock } from 'lucide-react'
import { useApp } from '../context/AppContext'

const GOALS = [
  { id: 'retirement', label: 'Retirement', desc: 'Build long-term wealth for financial freedom' },
  { id: 'wealth',     label: 'Wealth Growth', desc: 'Grow my savings faster than inflation' },
  { id: 'income',     label: 'Income', desc: 'Generate regular passive income' },
  { id: 'education',  label: 'Education', desc: 'Save for tuition or family education costs' },
]

const RISK_PROFILES = [
  { id: 'Conservative', label: 'Conservative', desc: 'Capital preservation, minimal volatility' },
  { id: 'Balanced',     label: 'Balanced',     desc: 'Moderate growth with manageable risk' },
  { id: 'Growth',       label: 'Growth',       desc: 'Higher returns, accepting more swings' },
  { id: 'Aggressive',   label: 'Aggressive',   desc: 'Maximum growth potential, high risk' },
]

const YEARS = [2030, 2035, 2040, 2045, 2050, 2055]

export default function Onboarding() {
  const { setOnboarded, setUserProfile } = useApp()
  const navigate = useNavigate()
  const [step, setStep] = useState(0)
  const [goal, setGoal] = useState('')
  const [risk, setRisk] = useState('')
  const [targetYear, setTargetYear] = useState(2045)

  const steps = [
    {
      icon: <Target size={28} />,
      title: "What's your investment goal?",
      subtitle: 'We personalize your dashboard and recommendations based on this.',
    },
    {
      icon: <Shield size={28} />,
      title: 'What is your risk tolerance?',
      subtitle: 'How comfortable are you with your portfolio going up and down in value?',
    },
    {
      icon: <Clock size={28} />,
      title: 'When do you need the money?',
      subtitle: 'A longer horizon allows for more growth-oriented strategies.',
    },
  ]

  const canNext = [
    () => goal !== '',
    () => risk !== '',
    () => true,
  ]

  const handleNext = () => {
    if (step < 2) {
      setStep(s => s + 1)
    } else {
      setUserProfile(p => ({ ...p, goal, riskProfile: risk, targetYear }))
      setOnboarded(true)
      navigate('/dashboard')
    }
  }

  return (
    <div className="onboard-wrap">
      <div className="onboard-logo">
        <span className="gs-wordmark">Goldman Stachs</span>
        <span className="onboard-tagline">Smart investing for everyone</span>
      </div>

      <div className="onboard-steps-indicator">
        {steps.map((_, i) => (
          <div key={i} className={`onboard-step-dot${i === step ? ' active' : i < step ? ' done' : ''}`} />
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          className="onboard-card"
          initial={{ x: 40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -40, opacity: 0 }}
          transition={{ duration: 0.22 }}
        >
          <div className="onboard-step-icon">{steps[step].icon}</div>
          <h2 className="onboard-title">{steps[step].title}</h2>
          <p className="onboard-subtitle">{steps[step].subtitle}</p>

          {step === 0 && (
            <div className="onboard-options">
              {GOALS.map(g => (
                <button
                  key={g.id}
                  className={`onboard-option${goal === g.id ? ' selected' : ''}`}
                  onClick={() => setGoal(g.id)}
                >
                  <span className="onboard-option-label">{g.label}</span>
                  <span className="onboard-option-desc">{g.desc}</span>
                </button>
              ))}
            </div>
          )}

          {step === 1 && (
            <div className="onboard-options">
              {RISK_PROFILES.map(r => (
                <button
                  key={r.id}
                  className={`onboard-option${risk === r.id ? ' selected' : ''}`}
                  onClick={() => setRisk(r.id)}
                >
                  <span className="onboard-option-label">{r.label}</span>
                  <span className="onboard-option-desc">{r.desc}</span>
                </button>
              ))}
            </div>
          )}

          {step === 2 && (
            <div className="onboard-year-grid">
              {YEARS.map(y => (
                <button
                  key={y}
                  className={`onboard-year-btn${targetYear === y ? ' selected' : ''}`}
                  onClick={() => setTargetYear(y)}
                >
                  {y}
                </button>
              ))}
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      <button
        className="btn-primary onboard-cta"
        disabled={!canNext[step]()}
        onClick={handleNext}
      >
        {step < 2 ? 'Continue' : 'Start investing'}
        <ChevronRight size={16} />
      </button>
    </div>
  )
}
