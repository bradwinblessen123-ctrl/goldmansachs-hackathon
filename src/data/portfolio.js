// ─── Portfolio positions ─────────────────────────────────────────────────────

export const USER = {
  name: 'Alex Chen',
  email: 'alex.chen@email.com',
  joined: '2023-07-15',
  riskProfile: 'Balanced',
  goal: 'Long-term wealth growth',
  targetYear: 2045,
  creditsEarned: 150,
  creditsAvailable: 50,
}

export const POSITIONS = [
  {
    symbol: 'AAPL',
    name: 'Apple Inc.',
    type: 'stock',
    sector: 'Technology',
    shares: 85,
    avgCost: 177.05,
    currentPrice: 210.25,
    dividendsReceived: 187,
    priorDayPrice: 207.83,
    signal: 'golden-cross',
    taxLossOpportunity: false,
    activity: [
      { type: 'buy',  date: '2024-01-12', shares: 20, price: 182.00, note: 'Added on pullback' },
      { type: 'div',  date: '2024-02-15', amount: 81,  note: 'Q1 dividend' },
      { type: 'buy',  date: '2023-10-03', shares: 65, price: 174.91, note: 'Initial position' },
      { type: 'div',  date: '2023-11-16', amount: 60,  note: 'Q4 dividend' },
    ],
  },
  {
    symbol: 'MSFT',
    name: 'Microsoft Corp.',
    type: 'stock',
    sector: 'Technology',
    shares: 40,
    avgCost: 339.20,
    currentPrice: 415.80,
    dividendsReceived: 120,
    priorDayPrice: 413.20,
    signal: 'golden-cross',
    taxLossOpportunity: false,
    activity: [
      { type: 'buy',  date: '2023-09-05', shares: 40, price: 339.20, note: 'Initial position' },
      { type: 'div',  date: '2023-12-14', amount: 60,  note: 'Q4 dividend' },
      { type: 'div',  date: '2024-03-14', amount: 60,  note: 'Q1 dividend' },
    ],
  },
  {
    symbol: 'SPY',
    name: 'SPDR S&P 500 ETF',
    type: 'etf',
    sector: 'Broad Market',
    shares: 45,
    avgCost: 419.40,
    currentPrice: 524.80,
    dividendsReceived: 580,
    priorDayPrice: 519.60,
    signal: null,
    taxLossOpportunity: false,
    activity: [
      { type: 'buy',  date: '2023-08-01', shares: 45, price: 419.40, note: 'Core holding' },
      { type: 'div',  date: '2023-12-19', amount: 290, note: 'Quarterly distribution' },
      { type: 'div',  date: '2024-03-19', amount: 290, note: 'Quarterly distribution' },
    ],
  },
  {
    symbol: 'BND',
    name: 'Vanguard Total Bond Market ETF',
    type: 'bond',
    sector: 'Fixed Income',
    shares: 120,
    avgCost: 74.07,
    currentPrice: 73.70,
    dividendsReceived: 312,
    priorDayPrice: 73.85,
    signal: null,
    taxLossOpportunity: true,
    activity: [
      { type: 'buy',  date: '2023-07-15', shares: 120, price: 74.07, note: 'Defensive allocation' },
      { type: 'div',  date: '2024-01-31', amount: 156, note: 'Semi-annual income' },
      { type: 'div',  date: '2023-07-31', amount: 156, note: 'Semi-annual income' },
    ],
  },
  {
    symbol: 'NVDA',
    name: 'NVIDIA Corporation',
    type: 'stock',
    sector: 'Technology',
    shares: 15,
    avgCost: 465.00,
    currentPrice: 875.00,
    dividendsReceived: 12,
    priorDayPrice: 862.40,
    signal: 'golden-cross',
    taxLossOpportunity: false,
    activity: [
      { type: 'buy',  date: '2023-11-01', shares: 15, price: 465.00, note: 'AI theme position' },
      { type: 'div',  date: '2024-03-27', amount: 12,  note: 'Annual dividend' },
    ],
  },
  {
    symbol: 'QQQ',
    name: 'Invesco Nasdaq-100 ETF',
    type: 'etf',
    sector: 'Technology',
    shares: 22,
    avgCost: 379.50,
    currentPrice: 450.00,
    dividendsReceived: 95,
    priorDayPrice: 446.80,
    signal: null,
    taxLossOpportunity: false,
    activity: [
      { type: 'buy',  date: '2023-09-20', shares: 22, price: 379.50, note: 'Tech index exposure' },
      { type: 'div',  date: '2023-12-18', amount: 48,  note: 'Quarterly distribution' },
      { type: 'div',  date: '2024-03-18', amount: 47,  note: 'Quarterly distribution' },
    ],
  },
]

// ─── AI signals per position ──────────────────────────────────────────────────

export const AI_SIGNALS = {
  AAPL: {
    action: 'HOLD',
    confidence: 72,
    riskLevel: 'MEDIUM',
    targetPrice: 230,
    timeHorizon: '6–12 months',
    lastUpdated: 'Mar 15, 2024',
    reasoning: [
      { type: 'positive', title: 'Services revenue accelerating', detail: 'App Store, iCloud, and Apple TV+ grew 16% YoY in the most recent quarter, diversifying away from hardware.' },
      { type: 'positive', title: 'Massive share buyback program', detail: 'Apple repurchased $22.6B in shares last quarter, reducing share count and mechanically boosting earnings per share.' },
      { type: 'risk',     title: 'China revenue declining', detail: 'China iPhone sales dropped 13% amid nationalist backlash and competition from Huawei. This market represents 19% of total revenue.' },
      { type: 'risk',     title: 'Valuation elevated vs. history', detail: 'Currently trading at 27x forward earnings vs. its 5-year average of 22x — leaving less margin for error.' },
    ],
  },
  MSFT: {
    action: 'BUY',
    confidence: 84,
    riskLevel: 'LOW',
    targetPrice: 480,
    timeHorizon: '12 months',
    lastUpdated: 'Mar 15, 2024',
    reasoning: [
      { type: 'positive', title: 'Azure cloud growth reaccelerating', detail: 'Azure grew 28% YoY — ahead of consensus — driven by AI workloads. Microsoft committed to $50B capex in data centers for 2024.' },
      { type: 'positive', title: 'Copilot monetization beginning', detail: 'AI-powered Copilot is showing early commercial traction with enterprise clients paying $30/seat premium vs. base Office 365.' },
      { type: 'positive', title: 'Activision integration accretive', detail: 'The $69B Activision acquisition immediately added ~$1.5B quarterly revenue while providing long-term gaming franchise value.' },
      { type: 'risk',     title: 'Regulatory scrutiny increasing', detail: 'DOJ and EU regulators are examining Microsoft\'s AI partnerships, particularly its OpenAI relationship, which could restrict future deals.' },
    ],
  },
  SPY: {
    action: 'HOLD',
    confidence: 68,
    riskLevel: 'LOW',
    targetPrice: 560,
    timeHorizon: '12 months',
    lastUpdated: 'Mar 15, 2024',
    reasoning: [
      { type: 'positive', title: 'Earnings growth resuming', detail: 'S&P 500 earnings growth is expected at 10% for 2024 after a near-flat 2023, supported by margin recovery.' },
      { type: 'positive', title: 'Breadth improving', detail: 'Market gains are broadening beyond the "Magnificent 7" — a healthy sign that the rally has durability.' },
      { type: 'risk',     title: 'Rate-cut expectations may disappoint', detail: 'Futures markets are pricing 1–2 rate cuts in 2024. If the Fed stays on hold, high valuations become harder to justify.' },
      { type: 'risk',     title: 'Geopolitical uncertainty elevated', detail: 'Ongoing conflicts in Ukraine and Middle East, plus US-China tensions, represent tail risks for global supply chains.' },
    ],
  },
  BND: {
    action: 'REDUCE',
    confidence: 61,
    riskLevel: 'LOW',
    targetPrice: 76,
    timeHorizon: '6 months',
    lastUpdated: 'Mar 15, 2024',
    reasoning: [
      { type: 'risk',     title: 'Rate cuts being pushed back', detail: 'Bond prices rise when rates fall. With the Fed delaying cuts, bond prices face headwinds — your BND position is already down slightly.' },
      { type: 'positive', title: 'Income generation remains solid', detail: 'At current yields (~4.2%), BND still generates meaningful income, making it useful as a defensive allocation.' },
      { type: 'risk',     title: 'Tax-loss harvesting opportunity', detail: 'BND is down slightly from your purchase price. Selling to realize a tax loss, then repurchasing after 30 days, could save ~$11 on your tax bill.' },
    ],
  },
  NVDA: {
    action: 'HOLD',
    confidence: 79,
    riskLevel: 'HIGH',
    targetPrice: 1000,
    timeHorizon: '6 months',
    lastUpdated: 'Mar 15, 2024',
    reasoning: [
      { type: 'positive', title: 'Data center demand unprecedented', detail: 'H100 GPU demand from hyperscalers (Microsoft, Google, Amazon) continues to outstrip supply by 12+ months.' },
      { type: 'positive', title: 'Up 88% since purchase — exceptional return', detail: 'This position has generated +$6,150 in gains. The question is no longer "should you buy?" but "how much exposure is right?"' },
      { type: 'risk',     title: 'Concentration risk at these levels', detail: 'At current prices, NVDA represents ~10% of your portfolio — above your 7% target for individual stocks.' },
      { type: 'risk',     title: 'Export restrictions could escalate', detail: 'US restrictions on AI chip exports to China are expanding. China represented 20% of NVDA revenue before restrictions tightened.' },
    ],
  },
  QQQ: {
    action: 'HOLD',
    confidence: 71,
    riskLevel: 'MEDIUM',
    targetPrice: 490,
    timeHorizon: '12 months',
    lastUpdated: 'Mar 15, 2024',
    reasoning: [
      { type: 'positive', title: 'AI-driven tech cycle still early', detail: 'Infrastructure spending on AI by cloud providers is in year 1 of what analysts expect to be a 5+ year buildout cycle.' },
      { type: 'risk',     title: 'Overlap with other holdings', detail: 'QQQ\'s top holdings (AAPL, MSFT, NVDA) overlap significantly with your individual stock positions, increasing concentration.' },
    ],
  },
}

// ─── Historical performance data (52 weekly data points) ─────────────────────

function seed(s) {
  let x = Math.sin(s) * 10000
  return x - Math.floor(x)
}

function buildSeries(n, start, totalPct, vol, seedStart) {
  const pts = [100]
  const target = 100 * (1 + totalPct / 100)
  for (let i = 1; i <= n; i++) {
    const trend = (target - 100) / n
    const noise = (seed(seedStart + i) - 0.49) * vol
    pts.push(+(pts[pts.length - 1] + trend + noise).toFixed(2))
  }
  return pts
}

const WEEKS = 52
export const PERF_DATA = {
  '1M': {
    portfolio: buildSeries(4, 100, 3.1, 1.5, 1),
    sp500: buildSeries(4, 100, 3.4, 1.2, 2),
    you: '+3.1%', sp: '+3.4%',
  },
  '3M': {
    portfolio: buildSeries(13, 100, 8.4, 1.8, 3),
    sp500: buildSeries(13, 100, 6.8, 1.4, 4),
    you: '+8.4%', sp: '+6.8%',
  },
  'YTD': {
    portfolio: buildSeries(17, 100, 18.1, 2.0, 5),
    sp500: buildSeries(17, 100, 12.3, 1.6, 6),
    you: '+18.1%', sp: '+12.3%',
  },
  '1Y': {
    portfolio: buildSeries(WEEKS, 100, 22.6, 2.2, 7),
    sp500: buildSeries(WEEKS, 100, 14.8, 1.8, 8),
    you: '+22.6%', sp: '+14.8%',
  },
}
