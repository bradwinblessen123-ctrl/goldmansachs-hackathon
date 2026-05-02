import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts'
import { POSITIONS } from '../data/portfolio'

const SECTOR_COLORS = {
  'Technology':   '#1A79E8',
  'Broad Market': '#4D9BFF',
  'Fixed Income': '#99C2FF',
}

function buildAllocation() {
  const totals = {}
  let grand = 0
  POSITIONS.forEach(p => {
    const val = p.shares * p.currentPrice
    totals[p.sector] = (totals[p.sector] || 0) + val
    grand += val
  })
  return Object.entries(totals).map(([name, value]) => ({
    name,
    value: +((value / grand) * 100).toFixed(1),
    color: SECTOR_COLORS[name] || '#CCE0FF',
  }))
}

const data = buildAllocation()

function CustomTooltip({ active, payload }) {
  if (!active || !payload?.length) return null
  const d = payload[0].payload
  return (
    <div className="chart-tooltip">
      <div className="chart-tooltip-row">
        <span className="chart-tooltip-dot" style={{ background: d.color }} />
        <span className="chart-tooltip-label">{d.name}</span>
        <span className="chart-tooltip-val">{d.value}%</span>
      </div>
    </div>
  )
}

export default function AllocationChart() {
  return (
    <div className="alloc-wrap">
      <div className="alloc-chart-container">
        <ResponsiveContainer width={120} height={120}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={36}
              outerRadius={52}
              paddingAngle={2}
              dataKey="value"
              startAngle={90}
              endAngle={-270}
            >
              {data.map((entry, i) => (
                <Cell key={i} fill={entry.color} strokeWidth={0} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="alloc-legend">
        {data.map(d => (
          <div key={d.name} className="alloc-legend-row">
            <span className="alloc-legend-dot" style={{ background: d.color }} />
            <span className="alloc-legend-name">{d.name}</span>
            <span className="alloc-legend-pct">{d.value}%</span>
          </div>
        ))}
      </div>
    </div>
  )
}
