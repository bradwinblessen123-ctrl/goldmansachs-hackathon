import { useState } from 'react'
import { motion } from 'framer-motion'
import { TrendingDown, TrendingUp, Minus, AlertTriangle, Zap, RefreshCw } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import { POSITIONS } from '../data/portfolio'
import { useApp } from '../context/AppContext'

function fmt(n) {
  return n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })
}

const SCENARIOS = [
  {
    id: 'market-crash',
    title: 'Market crash (-30%)',
    desc: 'Simulates a 2008-style correction. Equities drop sharply; bonds buffer the fall.',
    icon: TrendingDown,
    color: 'var(--negative)',
    adjustments: { stock: -0.30, etf: -0.28, bond: +0.06 },
  },
  {
    id: 'tech-selloff',
    title: 'Tech selloff (-20%)',
    desc: 'Nasdaq-style rotation. Technology holdings decline; defensives hold.',
    icon: AlertTriangle,
    color: '#D97706',
    adjustments: { stock: -0.20, etf: -0.15, bond: +0.03 },
  },
  {
    id: 'rate-cut',
    title: 'Fed rate cuts (+1%)',
    desc: 'Fed cuts rates 100bps. Bonds rally; growth stocks benefit.',
    icon: TrendingUp,
    color: 'var(--positive)',
    adjustments: { stock: +0.08, etf: +0.06, bond: +0.05 },
  },
  {
    id: 'bull-run',
    title: 'Continued bull market (+15%)',
    desc: 'AI-driven rally continues through 2025. Tech and growth lead.',
    icon: Zap,
    color: '#1A79E8',
    adjustments: { stock: +0.20, etf: +0.15, bond: -0.02 },
  },
  {
    id: 'rebalanced',
    title: 'After rebalancing',
    desc: 'Reduces tech concentration to 50%, increases bonds to 25%.',
    icon: RefreshCw,
    color: '#0047B3',
    adjustments: { stock: +0.02, etf: +0.04, bond: +0.01 },
  },
]

function calcScenario(adjustments) {
  let total = 0
  POSITIONS.forEach(p => {
    const adj = adjustments[p.type] || 0
    total += p.shares * p.currentPrice * (1 + adj)
  })
  return total
}

function calcCurrentValue() {
  return POSITIONS.reduce((s, p) => s + p.shares * p.currentPrice, 0)
}

const currentValue = calcCurrentValue()

function PositionImpact({ adjustments }) {
  const items = POSITIONS.map(p => {
    const adj = adjustments[p.type] || 0
    const orig = p.shares * p.currentPrice
    const newVal = orig * (1 + adj)
    return { symbol: p.symbol, orig, newVal, delta: newVal - orig, pct: adj * 100 }
  })

  return (
    <div className="scenario-positions">
      {items.map(item => (
        <div key={item.symbol} className="scenario-position-row">
          <span className="scenario-position-symbol">{item.symbol}</span>
          <span className="scenario-position-orig">{fmt(item.orig)}</span>
          <span className={`scenario-position-delta ${item.delta >= 0 ? 'positive' : 'negative'}`}>
            {item.delta >= 0 ? '+' : ''}{fmt(item.delta)}
          </span>
          <span className={`scenario-position-pct ${item.pct >= 0 ? 'positive' : 'negative'}`}>
            {item.pct >= 0 ? '+' : ''}{item.pct.toFixed(0)}%
          </span>
        </div>
      ))}
    </div>
  )
}

export default function Scenarios() {
  const [activeScenario, setActiveScenario] = useState(null)
  const { openTerm } = useApp()

  const scenario = activeScenario ? SCENARIOS.find(s => s.id === activeScenario) : null
  const scenarioValue = scenario ? calcScenario(scenario.adjustments) : null
  const scenarioDelta = scenario ? scenarioValue - currentValue : null

  const chartData = SCENARIOS.map(s => ({
    name: s.title.split(' ').slice(0, 2).join(' '),
    value: calcScenario(s.adjustments),
    delta: calcScenario(s.adjustments) - currentValue,
    id: s.id,
  }))

  return (
    <motion.div
      className="screen"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <header className="gs-header">
        <span className="gs-wordmark">Scenario Analysis</span>
      </header>

      <div className="screen-content">
        <p className="screen-intro">
          See how your portfolio would respond to market events. These are simulations based on{' '}
          <button className="fin-term" onClick={() => openTerm('volatility')}>historical volatility</button>{' '}
          patterns — not predictions.
        </p>

        {/* Bar chart overview */}
        <div className="card">
          <h3 className="card-title">Portfolio value under each scenario</h3>
          <p className="card-subtitle">Current value: {fmt(currentValue)}</p>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={chartData} margin={{ top: 4, right: 4, left: -20, bottom: 20 }}>
              <XAxis
                dataKey="name"
                tick={{ fontSize: 9, fill: 'var(--text-muted)' }}
                tickLine={false}
                axisLine={false}
                angle={-20}
                textAnchor="end"
              />
              <YAxis
                tickFormatter={v => `$${(v / 1000).toFixed(0)}k`}
                tick={{ fontSize: 10, fill: 'var(--text-muted)' }}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip
                formatter={(value) => [fmt(value), 'Portfolio value']}
                contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid var(--border)' }}
              />
              <Bar dataKey="value" radius={[4, 4, 0, 0]} onClick={(d) => setActiveScenario(d.id)}>
                {chartData.map((entry, i) => (
                  <Cell
                    key={i}
                    fill={entry.delta >= 0 ? '#1A79E8' : 'var(--negative)'}
                    opacity={activeScenario === entry.id ? 1 : 0.75}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Scenario cards */}
        {SCENARIOS.map(s => {
          const Icon = s.icon
          const sv = calcScenario(s.adjustments)
          const delta = sv - currentValue
          const deltaPct = (delta / currentValue) * 100
          const isActive = activeScenario === s.id

          return (
            <motion.div
              key={s.id}
              layout
              className={`scenario-card ${isActive ? 'active' : ''}`}
              onClick={() => setActiveScenario(isActive ? null : s.id)}
            >
              <div className="scenario-card-header">
                <div className="scenario-icon" style={{ color: s.color }}>
                  <Icon size={18} />
                </div>
                <div className="scenario-info">
                  <h4 className="scenario-title">{s.title}</h4>
                  <p className="scenario-desc">{s.desc}</p>
                </div>
                <div className="scenario-result">
                  <span className={`scenario-delta ${delta >= 0 ? 'positive' : 'negative'}`}>
                    {delta >= 0 ? '+' : ''}{deltaPct.toFixed(1)}%
                  </span>
                  <span className="scenario-value">{fmt(sv)}</span>
                </div>
              </div>

              <motion.div
                initial={false}
                animate={{ height: isActive ? 'auto' : 0, opacity: isActive ? 1 : 0 }}
                transition={{ duration: 0.2 }}
                style={{ overflow: 'hidden' }}
              >
                <div style={{ paddingTop: '12px' }}>
                  <p className="scenario-section-label">Position-level impact</p>
                  <PositionImpact adjustments={s.adjustments} />

                  {s.id === 'rebalanced' && (
                    <div className="rebalance-actions">
                      <p className="rebalance-title">Suggested rebalancing steps</p>
                      <div className="rebalance-step">
                        <span className="badge warn">REDUCE</span>
                        <span>Trim NVDA by 5 shares (~$4,375) — concentration at 10.5% vs 7% target</span>
                      </div>
                      <div className="rebalance-step">
                        <span className="badge blue">BUY</span>
                        <span>Add 30 shares BND (+$2,211) — increase fixed income to 15%</span>
                      </div>
                      <div className="rebalance-step">
                        <span className="badge gray">SWAP</span>
                        <span>Consider tax-loss harvest on BND before adding</span>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )
        })}
      </div>
    </motion.div>
  )
}
