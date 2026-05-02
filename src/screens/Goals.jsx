import { motion } from 'framer-motion'
import { Target, TrendingUp, Shield, GraduationCap, Home } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { POSITIONS } from '../data/portfolio'
import { Link } from 'react-router-dom'

function fmt(n) {
  return n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })
}

const GOAL_TEMPLATES = [
  {
    id: 'retirement',
    title: 'Retirement',
    icon: Shield,
    color: '#1A79E8',
    target: 1200000,
    desc: 'Build long-term wealth for financial independence',
  },
  {
    id: 'emergency',
    title: 'Emergency Fund',
    icon: Target,
    color: '#0A6E3F',
    target: 25000,
    desc: 'Six months of living expenses, liquid and safe',
  },
  {
    id: 'growth',
    title: 'Wealth Growth',
    icon: TrendingUp,
    color: '#002B6B',
    target: 500000,
    desc: 'Grow savings faster than inflation over 10 years',
  },
]

function calcPortfolioValue() {
  return POSITIONS.reduce((s, p) => s + p.shares * p.currentPrice, 0)
}

function calcProjection(current, years, annualReturn = 0.09) {
  return current * Math.pow(1 + annualReturn, years)
}

export default function Goals() {
  const { userProfile } = useApp()
  const portfolioValue = calcPortfolioValue()
  const yearsLeft = userProfile.targetYear - new Date().getFullYear()
  const projected = calcProjection(portfolioValue, yearsLeft)

  return (
    <motion.div
      className="screen"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <header className="gs-header">
        <span className="gs-wordmark">Goals</span>
      </header>

      <div className="screen-content">
        {/* Projection card */}
        <div className="card goal-projection-card">
          <p className="goal-projection-label">Projected value by {userProfile.targetYear}</p>
          <h2 className="goal-projection-value">{fmt(projected)}</h2>
          <p className="goal-projection-sub">
            Assuming 9% average annual return · {yearsLeft} years remaining
          </p>
          <div className="goal-projection-bar">
            <div className="goal-projection-now">
              <span className="goal-projection-dot" style={{ background: '#99C2FF' }} />
              <span>Today: {fmt(portfolioValue)}</span>
            </div>
            <div className="goal-projection-future">
              <span className="goal-projection-dot" style={{ background: '#1A79E8' }} />
              <span>{userProfile.targetYear}: {fmt(projected)}</span>
            </div>
          </div>
          <Link to="/scenarios" className="btn-secondary" style={{ marginTop: '12px', display: 'inline-flex' }}>
            Explore scenarios
          </Link>
        </div>

        {/* Goal cards */}
        <h3 className="section-heading">Your goals</h3>
        {GOAL_TEMPLATES.map(goal => {
          const pct = Math.min(100, (portfolioValue / goal.target) * 100)
          const Icon = goal.icon
          return (
            <div key={goal.id} className="card goal-card">
              <div className="goal-card-header">
                <div className="goal-card-icon" style={{ background: goal.color + '20', color: goal.color }}>
                  <Icon size={18} />
                </div>
                <div className="goal-card-info">
                  <h4 className="goal-card-title">{goal.title}</h4>
                  <p className="goal-card-desc">{goal.desc}</p>
                </div>
              </div>

              <div className="goal-progress-row">
                <div className="goal-progress-bar">
                  <div
                    className="goal-progress-fill"
                    style={{ width: `${pct}%`, background: goal.color }}
                  />
                </div>
                <span className="goal-pct">{pct.toFixed(0)}%</span>
              </div>

              <div className="goal-amounts">
                <div className="goal-amount-item">
                  <span className="goal-amount-label">Current</span>
                  <span className="goal-amount-val">{fmt(portfolioValue)}</span>
                </div>
                <div className="goal-amount-item">
                  <span className="goal-amount-label">Target</span>
                  <span className="goal-amount-val">{fmt(goal.target)}</span>
                </div>
                <div className="goal-amount-item">
                  <span className="goal-amount-label">Remaining</span>
                  <span className="goal-amount-val">{fmt(Math.max(0, goal.target - portfolioValue))}</span>
                </div>
              </div>
            </div>
          )
        })}

        {/* Risk profile */}
        <div className="card">
          <h3 className="card-title">Risk profile</h3>
          <div className="data-row">
            <span className="data-label">Profile</span>
            <span className="data-value">
              <span className="badge blue">{userProfile.riskProfile}</span>
            </span>
          </div>
          <div className="data-row">
            <span className="data-label">Target year</span>
            <span className="data-value">{userProfile.targetYear}</span>
          </div>
          <div className="data-row">
            <span className="data-label">Time horizon</span>
            <span className="data-value">{yearsLeft} years</span>
          </div>
          <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '8px' }}>
            A {userProfile.riskProfile.toLowerCase()} profile targets moderate growth with manageable
            drawdowns — suitable for your {yearsLeft}-year horizon.
          </p>
        </div>
      </div>
    </motion.div>
  )
}
