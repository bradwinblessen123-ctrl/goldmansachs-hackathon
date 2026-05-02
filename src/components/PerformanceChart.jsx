import { useState } from 'react'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts'
import { PERF_DATA } from '../data/portfolio'

const PERIODS = ['1M', '3M', 'YTD', '1Y']

function buildChartData(period) {
  const d = PERF_DATA[period]
  return d.portfolio.map((val, i) => ({
    i,
    portfolio: val,
    sp500: d.sp500[i],
  }))
}

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null
  return (
    <div className="chart-tooltip">
      {payload.map(p => (
        <div key={p.dataKey} className="chart-tooltip-row">
          <span className="chart-tooltip-dot" style={{ background: p.color }} />
          <span className="chart-tooltip-label">{p.dataKey === 'portfolio' ? 'Your portfolio' : 'S&P 500'}</span>
          <span className="chart-tooltip-val">{p.value > 0 ? '+' : ''}{(p.value - 100).toFixed(1)}%</span>
        </div>
      ))}
    </div>
  )
}

export default function PerformanceChart() {
  const [period, setPeriod] = useState('1Y')
  const data = buildChartData(period)
  const pd = PERF_DATA[period]

  return (
    <div className="perf-chart-wrap">
      <div className="perf-chart-header">
        <div className="perf-legend">
          <div className="perf-legend-item">
            <span className="perf-legend-dot" style={{ background: '#1A79E8' }} />
            <span>Your portfolio</span>
            <strong className={parseFloat(pd.you) >= 0 ? 'positive' : 'negative'}>{pd.you}</strong>
          </div>
          <div className="perf-legend-item">
            <span className="perf-legend-dot" style={{ background: '#99C2FF' }} />
            <span>S&P 500</span>
            <strong className={parseFloat(pd.sp) >= 0 ? 'positive' : 'negative'}>{pd.sp}</strong>
          </div>
        </div>
        <div className="period-tabs">
          {PERIODS.map(p => (
            <button
              key={p}
              className={`period-tab${period === p ? ' active' : ''}`}
              onClick={() => setPeriod(p)}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      <ResponsiveContainer width="100%" height={180}>
        <LineChart data={data} margin={{ top: 4, right: 4, left: -28, bottom: 0 }}>
          <XAxis dataKey="i" hide />
          <YAxis
            tickFormatter={v => `${v > 0 ? '+' : ''}${(v - 100).toFixed(0)}%`}
            tick={{ fontSize: 10, fill: 'var(--text-muted)' }}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip content={<CustomTooltip />} />
          <ReferenceLine y={100} stroke="var(--border)" strokeDasharray="3 3" />
          <Line
            type="monotone"
            dataKey="portfolio"
            stroke="#1A79E8"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4, fill: '#1A79E8', strokeWidth: 0 }}
          />
          <Line
            type="monotone"
            dataKey="sp500"
            stroke="#99C2FF"
            strokeWidth={1.5}
            dot={false}
            strokeDasharray="4 2"
            activeDot={{ r: 3, fill: '#99C2FF', strokeWidth: 0 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
