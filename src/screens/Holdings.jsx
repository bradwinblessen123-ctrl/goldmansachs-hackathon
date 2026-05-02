import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ChevronRight, TrendingUp, TrendingDown, Zap } from 'lucide-react'
import { POSITIONS, AI_SIGNALS, PERF_DATA } from '../data/portfolio'

function fmt(n, decimals = 0) {
  return n.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: decimals, maximumFractionDigits: decimals })
}

function calcPortfolioStats() {
  let cost = 0, value = 0, divs = 0, dayGain = 0
  POSITIONS.forEach(p => {
    cost += p.shares * p.avgCost
    value += p.shares * p.currentPrice
    divs += p.dividendsReceived
    dayGain += p.shares * (p.currentPrice - p.priorDayPrice)
  })
  return { cost, value, divs, dayGain, totalReturn: value + divs - cost }
}

export default function Holdings() {
  const stats = calcPortfolioStats()
  const totalReturnPct = (stats.totalReturn / stats.cost) * 100
  const dayPct = (stats.dayGain / (stats.value - stats.dayGain)) * 100
  const perf1Y = PERF_DATA['1Y']

  return (
    <motion.div
      className="screen"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <header className="gs-header">
        <span className="gs-wordmark">Portfolio</span>
      </header>

      <div className="screen-content">
        {/* Summary card */}
        <div className="card holdings-summary">
          <div className="holdings-summary-main">
            <p className="holdings-summary-label">Market value</p>
            <h2 className="holdings-summary-value">{fmt(stats.value)}</h2>
          </div>
          <div className="holdings-summary-grid">
            <div className="holdings-summary-item">
              <span className="holdings-summary-item-label">Today</span>
              <span className={`holdings-summary-item-val ${stats.dayGain >= 0 ? 'positive' : 'negative'}`}>
                {stats.dayGain >= 0 ? '+' : ''}{fmt(stats.dayGain)} ({dayPct >= 0 ? '+' : ''}{dayPct.toFixed(2)}%)
              </span>
            </div>
            <div className="holdings-summary-item">
              <span className="holdings-summary-item-label">Total return (incl. dividends)</span>
              <span className={`holdings-summary-item-val ${stats.totalReturn >= 0 ? 'positive' : 'negative'}`}>
                {stats.totalReturn >= 0 ? '+' : ''}{fmt(stats.totalReturn)} (+{totalReturnPct.toFixed(1)}%)
              </span>
            </div>
            <div className="holdings-summary-item">
              <span className="holdings-summary-item-label">Dividends received</span>
              <span className="holdings-summary-item-val">{fmt(stats.divs)}</span>
            </div>
            <div className="holdings-summary-item">
              <span className="holdings-summary-item-label">vs S&P 500 (1Y)</span>
              <span className="holdings-summary-item-val positive">
                {perf1Y.you} vs {perf1Y.sp} — outperforming
              </span>
            </div>
          </div>
        </div>

        {/* Positions list */}
        <div className="card">
          <h3 className="card-title" style={{ padding: '0 0 12px 0' }}>Positions</h3>
          {POSITIONS.map(p => {
            const value = p.shares * p.currentPrice
            const totalReturn = (value + p.dividendsReceived - p.shares * p.avgCost)
            const totalReturnPct = (totalReturn / (p.shares * p.avgCost)) * 100
            const dayChg = ((p.currentPrice - p.priorDayPrice) / p.priorDayPrice) * 100
            const sig = AI_SIGNALS[p.symbol]

            return (
              <Link key={p.symbol} to={`/holdings/${p.symbol}`} className="holding-row holding-row--detailed">
                <div className={`holding-icon icon-${p.type}`}>{p.symbol.slice(0, 2)}</div>
                <div className="holding-info">
                  <div className="holding-info-top">
                    <span className="holding-symbol">{p.symbol}</span>
                    {sig && (
                      <span className={`signal-badge mini ${sig.action.toLowerCase()}`}>
                        <Zap size={9} />
                        {sig.action}
                      </span>
                    )}
                    {p.taxLossOpportunity && (
                      <span className="badge warn" style={{ fontSize: '9px' }}>TLH</span>
                    )}
                  </div>
                  <span className="holding-name">{p.name}</span>
                  <span className="holding-shares">{p.shares} shares · avg {fmt(p.avgCost, 2)}</span>
                </div>
                <div className="holding-values">
                  <span className="holding-value">{fmt(value)}</span>
                  <span className={`holding-change ${totalReturnPct >= 0 ? 'positive' : 'negative'}`}>
                    {totalReturnPct >= 0 ? '+' : ''}{totalReturnPct.toFixed(1)}% total
                  </span>
                  <span className={`holding-day ${dayChg >= 0 ? 'positive' : 'negative'}`} style={{ fontSize: '11px' }}>
                    {dayChg >= 0 ? '+' : ''}{dayChg.toFixed(2)}% today
                  </span>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </motion.div>
  )
}
