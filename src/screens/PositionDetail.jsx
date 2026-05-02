import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, TrendingUp, TrendingDown } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts'
import { POSITIONS, AI_SIGNALS } from '../data/portfolio'
import AIRecommendation from '../components/AIRecommendation'

function fmt(n, d = 2) {
  return n.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: d, maximumFractionDigits: d })
}

function buildPriceSeries(position) {
  const pts = []
  const n = 60
  let price = position.avgCost
  const target = position.currentPrice
  function seed(s) { let x = Math.sin(s + position.symbol.charCodeAt(0)) * 10000; return x - Math.floor(x) }
  for (let i = 0; i <= n; i++) {
    const trend = (target - position.avgCost) / n
    const noise = (seed(i * 7) - 0.48) * (position.currentPrice * 0.015)
    price = Math.max(position.avgCost * 0.7, price + trend + noise)
    pts.push({ i, price: +price.toFixed(2) })
  }
  return pts
}

function CustomTooltip({ active, payload }) {
  if (!active || !payload?.length) return null
  return (
    <div className="chart-tooltip">
      <div className="chart-tooltip-row">
        <span className="chart-tooltip-label">Price</span>
        <span className="chart-tooltip-val">{fmt(payload[0].value)}</span>
      </div>
    </div>
  )
}

export default function PositionDetail() {
  const { symbol } = useParams()
  const position = POSITIONS.find(p => p.symbol === symbol)
  const signal = AI_SIGNALS[symbol]

  if (!position) {
    return (
      <div className="screen">
        <div className="screen-content">
          <p>Position not found.</p>
          <Link to="/holdings">Back to holdings</Link>
        </div>
      </div>
    )
  }

  const priceData = buildPriceSeries(position)
  const totalCost = position.shares * position.avgCost
  const marketValue = position.shares * position.currentPrice
  const priceGain = marketValue - totalCost
  const totalReturn = priceGain + position.dividendsReceived
  const totalReturnPct = (totalReturn / totalCost) * 100
  const dayChg = position.currentPrice - position.priorDayPrice
  const dayChgPct = (dayChg / position.priorDayPrice) * 100

  const TYPE_LABEL = { stock: 'Stock', etf: 'ETF', bond: 'Bond' }

  return (
    <motion.div
      className="screen"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <header className="gs-header">
        <Link to="/holdings" className="btn-icon">
          <ArrowLeft size={18} />
        </Link>
        <div style={{ flex: 1, marginLeft: 8 }}>
          <span className="gs-wordmark">{position.symbol}</span>
          <span style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block' }}>{position.name}</span>
        </div>
        <span className={`badge ${position.type === 'stock' ? 'blue' : position.type === 'etf' ? 'gray' : 'gray'}`}>
          {TYPE_LABEL[position.type]}
        </span>
      </header>

      <div className="screen-content">
        {/* Price hero */}
        <div className="card">
          <div className="position-price-hero">
            <div>
              <p className="position-price">{fmt(position.currentPrice)}</p>
              <p className={`position-day-change ${dayChg >= 0 ? 'positive' : 'negative'}`}>
                {dayChg >= 0 ? <TrendingUp size={13} /> : <TrendingDown size={13} />}
                {dayChg >= 0 ? '+' : ''}{fmt(dayChg)} ({dayChgPct >= 0 ? '+' : ''}{dayChgPct.toFixed(2)}%) today
              </p>
            </div>
            {signal && (
              <div className="position-target">
                <span className="position-target-label">AI target</span>
                <span className="position-target-val">{fmt(signal.targetPrice)}</span>
                <span className="position-target-horizon">{signal.timeHorizon}</span>
              </div>
            )}
          </div>

          <ResponsiveContainer width="100%" height={160}>
            <LineChart data={priceData} margin={{ top: 4, right: 4, left: -30, bottom: 0 }}>
              <XAxis dataKey="i" hide />
              <YAxis
                domain={['auto', 'auto']}
                tickFormatter={v => `$${v.toFixed(0)}`}
                tick={{ fontSize: 10, fill: 'var(--text-muted)' }}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip content={<CustomTooltip />} />
              <ReferenceLine y={position.avgCost} stroke="var(--border)" strokeDasharray="3 3" label={{ value: 'Avg cost', position: 'insideTopLeft', fontSize: 10, fill: 'var(--text-muted)' }} />
              <Line
                type="monotone"
                dataKey="price"
                stroke={totalReturn >= 0 ? '#1A79E8' : 'var(--negative)'}
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4, strokeWidth: 0 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Return breakdown */}
        <div className="card">
          <h3 className="card-title">Return breakdown</h3>
          <div className="data-row">
            <span className="data-label">Market value</span>
            <span className="data-value">{fmt(marketValue)}</span>
          </div>
          <div className="data-row">
            <span className="data-label">Total cost</span>
            <span className="data-value">{fmt(totalCost)}</span>
          </div>
          <div className="data-row">
            <span className="data-label">Price gain</span>
            <span className={`data-value ${priceGain >= 0 ? 'positive' : 'negative'}`}>
              {priceGain >= 0 ? '+' : ''}{fmt(priceGain)}
            </span>
          </div>
          <div className="data-row">
            <span className="data-label">Dividends received</span>
            <span className="data-value positive">+{fmt(position.dividendsReceived)}</span>
          </div>
          <div className="data-row data-row--total">
            <span className="data-label">Total return (incl. dividends)</span>
            <span className={`data-value ${totalReturn >= 0 ? 'positive' : 'negative'}`}>
              {totalReturn >= 0 ? '+' : ''}{fmt(totalReturn)} ({totalReturnPct >= 0 ? '+' : ''}{totalReturnPct.toFixed(1)}%)
            </span>
          </div>
          <div className="data-row">
            <span className="data-label">Shares held</span>
            <span className="data-value">{position.shares}</span>
          </div>
          <div className="data-row">
            <span className="data-label">Average cost</span>
            <span className="data-value">{fmt(position.avgCost)}</span>
          </div>
          <div className="data-row">
            <span className="data-label">Sector</span>
            <span className="data-value">{position.sector}</span>
          </div>
        </div>

        {/* AI recommendation */}
        {signal && (
          <div className="card">
            <h3 className="card-title">AI Recommendation</h3>
            <AIRecommendation symbol={symbol} signal={signal} />
          </div>
        )}

        {/* Activity log */}
        <div className="card">
          <h3 className="card-title">Activity</h3>
          {position.activity.map((a, i) => (
            <div key={i} className="activity-row">
              <div className={`activity-type-dot ${a.type}`} />
              <div className="activity-info">
                <span className="activity-type-label">
                  {a.type === 'buy' ? 'Purchase' : a.type === 'sell' ? 'Sale' : 'Dividend'}
                </span>
                <span className="activity-note">{a.note}</span>
              </div>
              <div className="activity-right">
                <span className="activity-date">{a.date}</span>
                {a.type === 'buy' || a.type === 'sell' ? (
                  <span className="activity-detail">{a.shares} sh @ {fmt(a.price)}</span>
                ) : (
                  <span className="activity-detail positive">+{fmt(a.amount)}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
