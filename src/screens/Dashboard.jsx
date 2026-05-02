import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ChevronRight, TrendingUp, TrendingDown, AlertCircle, Award } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { POSITIONS, AI_SIGNALS } from '../data/portfolio'
import { NEWS } from '../data/news'
import PerformanceChart from '../components/PerformanceChart'
import AllocationChart from '../components/AllocationChart'
import AIRecommendation from '../components/AIRecommendation'

const TICKERS = [
  { symbol: 'S&P 500', change: '+1.2%', pos: true },
  { symbol: 'NASDAQ',  change: '+1.8%', pos: true },
  { symbol: 'DOW',     change: '+0.4%', pos: true },
  { symbol: '10Y UST', change: '4.31%', pos: null },
  { symbol: 'VIX',     change: '14.2',  pos: null },
  { symbol: 'BTC',     change: '+2.6%', pos: true },
]

function fmt(n) {
  return n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })
}

function calcPortfolio() {
  let cost = 0, value = 0, divs = 0
  POSITIONS.forEach(p => {
    cost += p.shares * p.avgCost
    value += p.shares * p.currentPrice
    divs += p.dividendsReceived
  })
  const gainPct = ((value + divs - cost) / cost) * 100
  return { cost, value, divs, gainPct }
}

const portfolio = calcPortfolio()

function calcHealthScore() {
  let score = 70
  const sectors = {}
  POSITIONS.forEach(p => { sectors[p.sector] = (sectors[p.sector] || 0) + p.shares * p.currentPrice })
  const total = Object.values(sectors).reduce((a, b) => a + b, 0)
  const maxPct = Math.max(...Object.values(sectors)) / total * 100
  if (maxPct < 60) score += 15
  if (POSITIONS.some(p => p.type === 'bond')) score += 10
  if (POSITIONS.some(p => p.taxLossOpportunity)) score -= 5
  return Math.min(100, score)
}

const healthScore = calcHealthScore()

const topSignal = Object.entries(AI_SIGNALS).find(([, s]) => s.action === 'BUY')

export default function Dashboard() {
  const { userProfile, creditsAvailable, openTerm } = useApp()

  return (
    <motion.div
      className="screen"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <header className="gs-header">
        <div className="gs-header-left">
          <span className="gs-wordmark">Goldman Stachs</span>
          <span className="gs-header-greeting">Good morning, {userProfile.name.split(' ')[0]}</span>
        </div>
        {creditsAvailable > 0 && (
          <Link to="/learn" className="credits-pill">
            <Award size={13} />
            {creditsAvailable} credits
          </Link>
        )}
      </header>

      <div className="ticker-strip">
        <div className="ticker-track">
          {[...TICKERS, ...TICKERS].map((t, i) => (
            <span key={i} className="ticker-item">
              <span className="ticker-symbol">{t.symbol}</span>
              <span className={`ticker-change ${t.pos === true ? 'pos' : t.pos === false ? 'neg' : ''}`}>
                {t.change}
              </span>
            </span>
          ))}
        </div>
      </div>

      <div className="screen-content">
        {/* Hero value */}
        <div className="hero-card card">
          <p className="hero-label">Total portfolio value</p>
          <h1 className="hero-value">{fmt(portfolio.value)}</h1>
          <div className="hero-meta">
            <span className={`hero-return ${portfolio.gainPct >= 0 ? 'positive' : 'negative'}`}>
              {portfolio.gainPct >= 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
              +{portfolio.gainPct.toFixed(1)}% total return (incl. dividends)
            </span>
            <span className="hero-divs">+{fmt(portfolio.divs)} dividends received</span>
          </div>

          <div className="health-row">
            <div className="health-info">
              <span className="health-label">Portfolio health</span>
              <span className="health-score">{healthScore}/100</span>
            </div>
            <div className="health-bar">
              <div
                className="health-fill"
                style={{
                  width: `${healthScore}%`,
                  background: healthScore >= 80 ? 'var(--positive)' : healthScore >= 60 ? '#1A79E8' : 'var(--negative)',
                }}
              />
            </div>
          </div>
        </div>

        {/* Performance chart */}
        <div className="card">
          <div className="card-title-row">
            <h3 className="card-title">Performance</h3>
            <Link to="/holdings" className="card-link">
              Details <ChevronRight size={13} />
            </Link>
          </div>
          <PerformanceChart />
        </div>

        {/* Allocation */}
        <div className="card">
          <div className="card-title-row">
            <h3 className="card-title">Allocation</h3>
            <Link to="/scenarios" className="card-link">
              Rebalance <ChevronRight size={13} />
            </Link>
          </div>
          <AllocationChart />
        </div>

        {/* AI insight */}
        {topSignal && (
          <div className="card">
            <div className="card-title-row">
              <h3 className="card-title">AI Insight</h3>
              <span className="badge blue">New</span>
            </div>
            <AIRecommendation
              symbol={topSignal[0]}
              signal={topSignal[1]}
              compact
            />
          </div>
        )}

        {/* Tax alert */}
        {POSITIONS.some(p => p.taxLossOpportunity) && (
          <div className="alert-card">
            <AlertCircle size={15} />
            <div>
              <p className="alert-title">Tax-loss harvesting opportunity</p>
              <p className="alert-desc">
                BND is slightly below your cost basis. Consider{' '}
                <button className="fin-term" onClick={() => openTerm('tax-loss-harvesting')}>
                  tax-loss harvesting
                </button>{' '}
                to reduce your tax bill.
              </p>
            </div>
            <Link to="/holdings/BND" className="alert-action">View</Link>
          </div>
        )}

        {/* Holdings preview */}
        <div className="card">
          <div className="card-title-row">
            <h3 className="card-title">Holdings</h3>
            <Link to="/holdings" className="card-link">
              All {POSITIONS.length} <ChevronRight size={13} />
            </Link>
          </div>
          {POSITIONS.slice(0, 3).map(p => {
            const gain = ((p.currentPrice - p.avgCost) / p.avgCost) * 100
            return (
              <Link key={p.symbol} to={`/holdings/${p.symbol}`} className="holding-row">
                <div className={`holding-icon icon-${p.type}`}>{p.symbol.slice(0, 2)}</div>
                <div className="holding-info">
                  <span className="holding-symbol">{p.symbol}</span>
                  <span className="holding-name">{p.name}</span>
                </div>
                <div className="holding-values">
                  <span className="holding-value">{fmt(p.shares * p.currentPrice)}</span>
                  <span className={`holding-change ${gain >= 0 ? 'positive' : 'negative'}`}>
                    {gain >= 0 ? '+' : ''}{gain.toFixed(1)}%
                  </span>
                </div>
              </Link>
            )
          })}
        </div>

        {/* News preview */}
        <div className="card">
          <div className="card-title-row">
            <h3 className="card-title">Market news</h3>
            <Link to="/markets" className="card-link">
              More <ChevronRight size={13} />
            </Link>
          </div>
          {NEWS.slice(0, 2).map(article => (
            <Link key={article.id} to="/markets" className="news-preview-row">
              <div className="news-preview-source">{article.source}</div>
              <p className="news-preview-headline">{article.headline}</p>
              <span className="news-preview-time">{article.time}</span>
            </Link>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
