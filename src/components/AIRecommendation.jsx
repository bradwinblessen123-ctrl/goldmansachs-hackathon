import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { TrendingUp, TrendingDown, Minus, ChevronDown, ChevronUp, Check, X } from 'lucide-react'
import { useApp } from '../context/AppContext'

const ACTION_META = {
  BUY:    { label: 'Buy More',  cls: 'buy',    Icon: TrendingUp },
  HOLD:   { label: 'Hold',      cls: 'hold',   Icon: Minus },
  REDUCE: { label: 'Reduce',    cls: 'reduce', Icon: TrendingDown },
}

export default function AIRecommendation({ symbol, signal, compact = false, onApply }) {
  const { dismissSignal, dismissedSignals } = useApp()
  const [expanded, setExpanded] = useState(!compact)
  const [applied, setApplied] = useState(false)

  if (!signal || dismissedSignals.includes(symbol)) return null

  const meta = ACTION_META[signal.action]
  const positives = signal.reasoning.filter(r => r.type === 'positive')
  const risks = signal.reasoning.filter(r => r.type === 'risk')

  const handleApply = () => {
    setApplied(true)
    if (onApply) onApply(signal.action)
  }

  const handleDismiss = () => {
    dismissSignal(symbol)
  }

  return (
    <div className={`ai-card ${applied ? 'ai-card--applied' : ''}`}>
      <div className="ai-card-header">
        <div className="ai-card-title-row">
          <span className={`signal-badge ${meta.cls}`}>
            <meta.Icon size={12} strokeWidth={2.5} />
            {meta.label}
          </span>
          <span className="ai-card-symbol">{symbol}</span>
        </div>
        <div className="ai-card-meta">
          <span className="ai-confidence">
            <span className="ai-confidence-bar">
              <span className="ai-confidence-fill" style={{ width: `${signal.confidence}%` }} />
            </span>
            {signal.confidence}% confidence
          </span>
          <span className={`badge ${signal.riskLevel === 'HIGH' ? 'warn' : signal.riskLevel === 'MEDIUM' ? 'blue' : 'gray'}`}>
            {signal.riskLevel} RISK
          </span>
        </div>
        <div className="ai-card-sub">
          Target <strong>${signal.targetPrice}</strong> · {signal.timeHorizon} · Updated {signal.lastUpdated}
        </div>
      </div>

      {!compact && (
        <button className="ai-expand-btn" onClick={() => setExpanded(e => !e)}>
          <span>AI Analysis</span>
          {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </button>
      )}

      <AnimatePresence initial={false}>
        {(expanded || !compact) && (
          <motion.div
            className="ai-reasoning"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22 }}
          >
            {positives.length > 0 && (
              <div className="ai-reasoning-group">
                <p className="ai-reasoning-group-label positive">Bullish factors</p>
                {positives.map((r, i) => (
                  <div key={i} className="ai-reasoning-item positive">
                    <div className="ai-reasoning-dot positive" />
                    <div>
                      <p className="ai-reasoning-title">{r.title}</p>
                      <p className="ai-reasoning-detail">{r.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {risks.length > 0 && (
              <div className="ai-reasoning-group">
                <p className="ai-reasoning-group-label risk">Risk factors</p>
                {risks.map((r, i) => (
                  <div key={i} className="ai-reasoning-item risk">
                    <div className="ai-reasoning-dot risk" />
                    <div>
                      <p className="ai-reasoning-title">{r.title}</p>
                      <p className="ai-reasoning-detail">{r.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {!applied ? (
        <div className="ai-actions">
          <button className="btn-primary" onClick={handleApply}>
            <Check size={14} />
            Apply recommendation
          </button>
          <button className="btn-ghost" onClick={handleDismiss}>
            <X size={14} />
            Dismiss
          </button>
        </div>
      ) : (
        <div className="ai-applied-banner">
          <Check size={14} />
          Recommendation noted — review in your holdings
        </div>
      )}
    </div>
  )
}
