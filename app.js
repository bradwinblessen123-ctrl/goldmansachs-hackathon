// ============================================================
// PORTFOLIO DATA
// ============================================================

var PORTFOLIO = {
  totalValue: 127840,
  costBasis:  108200,
  dividends:  1640,
  cash:       12784,

  positions: [
    {
      symbol: 'AAPL', name: 'Apple Inc.',         type: 's', category: 'Stock · US Tech',
      shares: 85,  avgCost: 177.05, price: 210.25,
      dividends: 187, signal: 'golden',
      activity: [
        { type: 'buy',  date: 'Jan 12, 2024', shares: 20, price: 182.00, note: 'Added 20 shares' },
        { type: 'div',  date: 'Feb 15, 2024', shares: 0,  price: 0.24,   note: 'Dividend received' },
        { type: 'buy',  date: 'Oct 3,  2023', shares: 65, price: 174.91, note: 'Initial purchase' },
        { type: 'div',  date: 'Nov 16, 2023', shares: 0,  price: 0.24,   note: 'Dividend received' },
      ]
    },
    {
      symbol: 'MSFT', name: 'Microsoft Corp.',    type: 's', category: 'Stock · US Tech',
      shares: 40,  avgCost: 339.20, price: 415.80,
      dividends: 120, signal: 'golden',
      activity: [
        { type: 'buy',  date: 'Sep 5,  2023', shares: 40, price: 339.20, note: 'Initial purchase' },
        { type: 'div',  date: 'Dec 14, 2023', shares: 0,  price: 0.75,   note: 'Dividend received' },
        { type: 'div',  date: 'Mar 14, 2024', shares: 0,  price: 0.75,   note: 'Dividend received' },
      ]
    },
    {
      symbol: 'SPY',  name: 'S&P 500 Index Fund', type: 'e', category: 'Index Fund · US Market',
      shares: 45,  avgCost: 419.40, price: 524.80,
      dividends: 580, signal: null,
      activity: [
        { type: 'buy',  date: 'Aug 1,  2023', shares: 45, price: 419.40, note: 'Initial purchase' },
        { type: 'div',  date: 'Dec 19, 2023', shares: 0,  price: 6.44,   note: 'Quarterly dividend' },
        { type: 'div',  date: 'Mar 19, 2024', shares: 0,  price: 6.78,   note: 'Quarterly dividend' },
      ]
    },
    {
      symbol: 'BND',  name: 'Bond Market Fund',   type: 'b', category: 'Bond Fund · Low Risk',
      shares: 120, avgCost: 74.07, price: 73.70,
      dividends: 312, signal: null,
      taxLoss: true,
      activity: [
        { type: 'buy',  date: 'Jul 15, 2023', shares: 120, price: 74.07, note: 'Initial purchase' },
        { type: 'div',  date: 'Jan 31, 2024', shares: 0,   price: 0.21,  note: 'Monthly income' },
        { type: 'div',  date: 'Feb 29, 2024', shares: 0,   price: 0.21,  note: 'Monthly income' },
      ]
    },
    {
      symbol: 'NVDA', name: 'NVIDIA Corp.',        type: 's', category: 'Stock · US Tech',
      shares: 15,  avgCost: 465.00, price: 875.00,
      dividends: 12, signal: 'golden',
      activity: [
        { type: 'buy',  date: 'Nov 1,  2023', shares: 15, price: 465.00, note: 'Initial purchase' },
        { type: 'div',  date: 'Mar 27, 2024', shares: 0,  price: 0.04,   note: 'Dividend received' },
      ]
    },
    {
      symbol: 'QQQ',  name: 'Nasdaq 100 Fund',    type: 'e', category: 'Index Fund · US Tech',
      shares: 22,  avgCost: 379.50, price: 450.00,
      dividends: 95, signal: null,
      activity: [
        { type: 'buy',  date: 'Sep 20, 2023', shares: 22, price: 379.50, note: 'Initial purchase' },
        { type: 'div',  date: 'Dec 18, 2023', shares: 0,  price: 2.15,   note: 'Quarterly dividend' },
      ]
    }
  ]
};

// Period return data [portfolio%, sp500%]
var PERIOD_DATA = {
  '1M':  { you: 3.1,  sp: 3.4,  labels: genLabels(30,  'day') },
  '3M':  { you: 8.4,  sp: 6.8,  labels: genLabels(13,  'week') },
  'YTD': { you: 18.1, sp: 12.3, labels: genLabels(17,  'week') },
  '1Y':  { you: 22.6, sp: 14.8, labels: genLabels(52,  'week') }
};

// Position period data [portfolio%, sp500%] per position per period
var POS_PERIODS = {
  '1D':  { you: 0.7,   sp: 0.8  },
  '1M':  { you: 3.1,   sp: 3.4  },
  'YTD': { you: 18.1,  sp: 12.3 },
  '1Y':  { you: 22.6,  sp: 14.8 }
};


// ============================================================
// EDUCATIONAL TOOLTIPS
// ============================================================

var TIPS = {
  stock: {
    emoji: '📈',
    term: 'Stock',
    def: 'A small piece of ownership in a company. When the company does well and grows, your piece becomes more valuable. When it struggles, your piece loses value.',
    example: 'Example: Buying 1 share of Apple means you own a tiny fraction of the company — and benefit when Apple\'s profits grow.'
  },
  bond: {
    emoji: '🏦',
    term: 'Bond',
    def: 'A loan you give to a government or company. They promise to pay you back after a set period, plus regular interest payments. Less exciting than stocks, but much safer.',
    example: 'Example: A 10-year US government bond pays you ~4% per year, then returns your original money at the end.'
  },
  etf: {
    emoji: '🧺',
    term: 'Index Fund (ETF)',
    def: 'A single investment that automatically owns hundreds of companies at once. Instead of picking individual stocks, you own a slice of the whole market — much safer and simpler.',
    example: 'Example: The S&P 500 Index Fund owns all 500 of America\'s largest companies in one purchase.'
  },
  dividend: {
    emoji: '💰',
    term: 'Dividend',
    def: 'A regular cash payment a company makes to its shareholders — like a "thank you" for owning their stock. Some companies pay these every 3 months.',
    example: 'Example: Apple pays ~$0.24 per share every quarter. Own 85 shares → receive ~$81.60 every 3 months.'
  },
  totalreturn: {
    emoji: '🎯',
    term: 'Total Return',
    def: 'The REAL measure of how your investment has performed — combining both the rise in price AND any dividends you\'ve been paid. Many platforms only show price change, missing the full picture.',
    example: 'Example: If your stock went up 15% but also paid 3% in dividends, your Total Return is 18% — not 15%.'
  },
  risk: {
    emoji: '⚖️',
    term: 'Risk Level',
    def: 'How much your investments can go up or down in value. Higher risk = bigger possible gains, but also bigger possible losses. Lower risk = steadier, smaller changes.',
    example: 'Example: A tech startup stock might double or halve in a year. A government bond might move 2%. Both can be right for different goals.'
  },
  allocation: {
    emoji: '🥧',
    term: 'How Your Money is Divided',
    def: 'The split between different types of investments in your portfolio. A good mix balances growth (stocks) with safety (bonds and cash) based on your goals and how long you\'re investing.',
    example: 'Example: 55% stocks + 20% index funds + 15% bonds + 10% cash is a "balanced" mix for medium-term goals.'
  },
  sp500: {
    emoji: '📊',
    term: 'S&P 500',
    def: 'A list of the 500 largest US companies, used as a yardstick for the whole stock market. When your portfolio beats the S&P 500, it means your investments grew faster than average.',
    example: 'Example: If the S&P 500 is up 12% for the year but your portfolio is up 18%, you\'re outperforming the market by 6%.'
  },
  health: {
    emoji: '💪',
    term: 'Portfolio Health Score',
    def: 'A simple 0-100 score that measures how well your investments match your goals, risk level, and financial situation. 70+ is good; below 50 needs attention.',
    example: 'Your score of 72 means you\'re well diversified and on track — but slightly concentrated in tech stocks.'
  },
  rsi: {
    emoji: '📡',
    term: 'Market Strength (RSI)',
    def: 'A signal that helps you understand if a stock has been rising too fast (overpriced) or falling too much (potentially a bargain). It runs from 0 to 100.',
    example: 'Above 70 = stock may be overpriced and due for a pullback. Below 30 = stock may be underpriced and due for a recovery.'
  },
  taxloss: {
    emoji: '🧾',
    term: 'Tax-Loss Harvesting',
    def: 'Selling an investment that\'s gone down in value to get a tax break. The loss offsets your gains elsewhere, reducing what you owe the IRS — then you can reinvest in something similar.',
    example: 'Example: Your bond fund is down $44 this year. Selling it creates a $44 loss you can use to offset gains on your winning stocks.'
  },
  rebalancing: {
    emoji: '🔄',
    term: 'Rebalancing',
    def: 'Adjusting your portfolio back to your target mix. When stocks rise a lot, they can become too large a share of your portfolio — rebalancing trims the winners and adds to laggards.',
    example: 'Target: 55% stocks. After a bull run they\'re now 68%. Rebalancing sells some stock and buys more bonds to get back to 55%.'
  },
  notification: {
    emoji: '🔔',
    term: 'Notifications',
    def: 'Goldman Stachs will alert you when important things happen: your portfolio drops below a threshold, a rebalance is recommended, or a tax opportunity arises.',
    example: 'You\'ll get alerts for market moves that affect your money — not just general news.'
  }
};

function showTip(key) {
  var t = TIPS[key];
  if (!t) return;
  document.getElementById('tip-emoji').textContent = t.emoji;
  document.getElementById('tip-term').textContent  = t.term;
  document.getElementById('tip-def').textContent   = t.def;
  document.getElementById('tip-example').innerHTML = '<strong>' + t.example.split(':')[0] + ':</strong>' + t.example.split(':').slice(1).join(':');
  var ov = document.getElementById('tipOverlay');
  ov.classList.add('show');
}

function closeTip(e) {
  if (e && e.target !== document.getElementById('tipOverlay')) return;
  document.getElementById('tipOverlay').classList.remove('show');
}

function toggleGloss(id) {
  var el = document.getElementById(id);
  if (el) el.classList.toggle('open');
}


// ============================================================
// NAVIGATION
// ============================================================

var allocChart = null;
var perfChart  = null;
var posChart   = null;
var rsiChart   = null;

function go(id) {
  document.querySelectorAll('.screen').forEach(function(s) {
    s.classList.remove('active');
  });
  document.getElementById(id).classList.add('active');
  window.scrollTo(0, 0);

  if (id === 'screen-dashboard') {
    initAllocChart();
    initPerfChart('YTD');
  }
  if (id === 'screen-positions') {
    renderPositions('1D');
  }
}


// ============================================================
// ONBOARDING
// ============================================================

function obSel(el, step) {
  el.parentElement.querySelectorAll('.ob-opt').forEach(function(o) {
    o.classList.remove('sel');
  });
  el.classList.add('sel');
  document.getElementById('obn' + step).disabled = false;
}

function obNext(step) {
  document.getElementById('obs' + (step - 1)).classList.remove('active');
  document.getElementById('obs' + step).classList.add('active');
  for (var i = 0; i < 3; i++) {
    var d = document.getElementById('d' + i);
    d.className = 'ob-dot';
    if (i < step)       d.classList.add('done');
    else if (i === step) d.classList.add('active');
  }
}

function obFinish() {
  go('screen-loading');
  var msgs = [
    'Analyzing your goals…',
    'Calculating your risk profile…',
    'Selecting your asset mix…',
    'Preparing your dashboard…'
  ];
  var msgEl = document.getElementById('loadingMsg');
  var bar   = document.getElementById('loadingBar');

  function setMsg(text) {
    msgEl.classList.add('fade');
    setTimeout(function() { msgEl.textContent = text; msgEl.classList.remove('fade'); }, 200);
  }

  setTimeout(function() { bar.style.width = '28%'; }, 100);
  setTimeout(function() { setMsg(msgs[1]); bar.style.width = '52%'; }, 900);
  setTimeout(function() { setMsg(msgs[2]); bar.style.width = '75%'; }, 1700);
  setTimeout(function() { setMsg(msgs[3]); bar.style.width = '95%'; }, 2400);
  setTimeout(function() {
    go('screen-dashboard');
  }, 3200);
}


// ============================================================
// ALLOCATION DONUT CHART
// ============================================================

function initAllocChart() {
  if (allocChart) return;
  var cv = document.getElementById('allocChart');
  if (!cv) return;
  allocChart = new Chart(cv.getContext('2d'), {
    type: 'doughnut',
    data: {
      labels: ['Stocks', 'Index Funds', 'Bonds', 'Cash'],
      datasets: [{
        data: [55, 20, 15, 10],
        backgroundColor: ['#002060', '#1A6FE8', '#99BBFF', '#D6E8FF'],
        borderWidth: 0
      }]
    },
    options: {
      responsive: false,
      cutout: '72%',
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: function(c) { return c.label + ': ' + c.parsed + '%'; }
          }
        }
      }
    }
  });
}


// ============================================================
// PERFORMANCE CHART (portfolio vs S&P)
// ============================================================

function genLabels(count, unit) {
  var labels = [];
  var now = new Date();
  for (var i = count; i >= 0; i--) {
    var d = new Date(now);
    if (unit === 'day')  d.setDate(d.getDate() - i);
    if (unit === 'week') d.setDate(d.getDate() - i * 7);
    labels.push(d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
  }
  return labels;
}

function genPriceSeries(count, startVal, totalReturnPct, volatility) {
  var data = [startVal];
  var target = startVal * (1 + totalReturnPct / 100);
  for (var i = 1; i <= count; i++) {
    var trend  = (target - startVal) / count;
    var noise  = (Math.random() - 0.48) * volatility;
    var prev   = data[data.length - 1];
    data.push(+(prev + trend + noise).toFixed(2));
  }
  return data;
}

var currentPeriod = 'YTD';

function initPerfChart(period) {
  currentPeriod = period || 'YTD';
  var pd     = PERIOD_DATA[currentPeriod];
  var labels = pd.labels;
  var count  = labels.length - 1;

  var youData = genPriceSeries(count, 100, pd.you, 1.2);
  var spData  = genPriceSeries(count, 100, pd.sp,  0.9);

  if (perfChart) {
    perfChart.data.labels        = labels;
    perfChart.data.datasets[0].data = youData;
    perfChart.data.datasets[1].data = spData;
    perfChart.update('active');
    updatePerfStats(pd);
    return;
  }

  var cv = document.getElementById('perfChart');
  if (!cv) return;

  perfChart = new Chart(cv.getContext('2d'), {
    type: 'line',
    data: {
      labels: labels,
      datasets: [
        {
          label: 'Your Portfolio',
          data: youData,
          borderColor: '#002060',
          backgroundColor: 'rgba(0,32,96,0.06)',
          borderWidth: 2,
          fill: true,
          tension: 0.35,
          pointRadius: 0,
          pointHoverRadius: 4
        },
        {
          label: 'S&P 500',
          data: spData,
          borderColor: '#4080FF',
          backgroundColor: 'transparent',
          borderWidth: 1.5,
          fill: false,
          tension: 0.35,
          pointRadius: 0,
          pointHoverRadius: 4,
          borderDash: [4, 3]
        }
      ]
    },
    options: {
      responsive: true,
      interaction: { mode: 'index', intersect: false },
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: function(c) {
              var v = (c.parsed.y - 100).toFixed(1);
              return c.dataset.label + ': ' + (v >= 0 ? '+' : '') + v + '%';
            }
          }
        }
      },
      scales: {
        x: {
          grid: { display: false },
          ticks: {
            font: { size: 10 }, color: '#6080A8',
            maxTicksLimit: 5, maxRotation: 0
          }
        },
        y: {
          grid: { color: 'rgba(0,32,96,0.05)' },
          ticks: {
            font: { size: 10 }, color: '#6080A8',
            callback: function(v) { return (v - 100 >= 0 ? '+' : '') + (v - 100).toFixed(0) + '%'; }
          }
        }
      }
    }
  });

  updatePerfStats(pd);
}

function updatePerfStats(pd) {
  var diff = (pd.you - pd.sp).toFixed(1);
  document.getElementById('perf-you').textContent  = (pd.you >= 0 ? '+' : '') + pd.you + '%';
  document.getElementById('perf-sp').textContent   = (pd.sp  >= 0 ? '+' : '') + pd.sp  + '%';
  document.getElementById('perf-diff').textContent = (diff >= 0 ? '+' : '') + diff + '%';
  document.getElementById('perf-diff').className   = 'pr-val ' + (diff >= 0 ? 'up' : 'dn');
}

function setPeriod(period, btn) {
  currentPeriod = period;
  document.querySelectorAll('.perf-pd').forEach(function(b) { b.classList.remove('active'); });
  btn.classList.add('active');
  initPerfChart(period);
}


// ============================================================
// POSITIONS SCREEN
// ============================================================

function calcTotalReturn(p) {
  var costBasis    = p.shares * p.avgCost;
  var currentValue = p.shares * p.price;
  var priceGain    = currentValue - costBasis;
  var totalGain    = priceGain + p.dividends;
  var totalPct     = (totalGain / costBasis * 100);
  return {
    costBasis:    costBasis,
    currentValue: currentValue,
    priceGain:    priceGain,
    dividends:    p.dividends,
    totalGain:    totalGain,
    totalPct:     totalPct
  };
}

var currentPosPeriod = '1D';

function renderPositions(period) {
  currentPosPeriod = period || '1D';
  var pd = POS_PERIODS[currentPosPeriod];

  document.getElementById('pos-you-val').textContent  = (pd.you >= 0 ? '+' : '') + pd.you + '%';
  document.getElementById('pos-you-val').className    = 'vs-val ' + (pd.you >= 0 ? 'up' : 'dn');
  document.getElementById('pos-sp-val').textContent   = (pd.sp  >= 0 ? '+' : '') + pd.sp  + '%';
  var diff = pd.you - pd.sp;
  document.getElementById('pos-diff-val').textContent = (diff >= 0 ? '+' : '') + diff.toFixed(1) + '%';
  document.getElementById('pos-diff-val').className   = 'vs-val ' + (diff >= 0 ? 'up' : 'dn');

  var list = document.getElementById('positions-list');
  if (!list) return;

  // Sort by total return descending
  var sorted = PORTFOLIO.positions.slice().sort(function(a, b) {
    return calcTotalReturn(b).totalPct - calcTotalReturn(a).totalPct;
  });

  list.innerHTML = sorted.map(function(p) {
    var tr  = calcTotalReturn(p);
    var pos = tr.totalPct >= 0;
    var sig = p.signal === 'golden'
      ? '<span class="sig-pill golden">Golden Cross</span>'
      : p.signal === 'death'
        ? '<span class="sig-pill death">Death Cross</span>'
        : '';
    var tax = p.taxLoss ? '<div class="tax-flag">💡 Tax saving opportunity</div>' : '';

    return '<div class="pos-item" onclick="openPosition(\'' + p.symbol + '\')">' +
      '<div class="hic ' + p.type + '">' + p.symbol + '</div>' +
      '<div class="hi">' +
        '<div class="hn">' + p.name + sig + '</div>' +
        '<div class="ht">' + p.category + '</div>' +
        tax +
      '</div>' +
      '<div class="hr">' +
        '<div class="hv">$' + Math.round(tr.currentValue).toLocaleString() + '</div>' +
        '<span class="tr-pill ' + (pos ? 'pos' : 'neg') + '">' +
          (pos ? '+' : '') + tr.totalPct.toFixed(1) + '%' +
        '</span>' +
        '<div class="hc-sub">incl. dividends</div>' +
      '</div>' +
    '</div>';
  }).join('');
}

function setPosPeriod(period, btn) {
  document.querySelectorAll('.pp-btn').forEach(function(b) { b.classList.remove('active'); });
  btn.classList.add('active');
  renderPositions(period);
}


// ============================================================
// POSITION DETAIL
// ============================================================

function openPosition(symbol) {
  var p = PORTFOLIO.positions.find(function(x) { return x.symbol === symbol; });
  if (!p) return;

  go('screen-position-detail');

  var tr = calcTotalReturn(p);
  var pos = tr.totalPct >= 0;

  document.getElementById('pd-sym').textContent   = p.symbol;
  document.getElementById('pd-name').textContent  = p.name;
  document.getElementById('pd-price').textContent = '$' + p.price.toFixed(2);

  var dailyChg = (Math.random() * 2.5 - 0.3).toFixed(1);
  var chgEl = document.getElementById('pd-chg');
  chgEl.textContent = (dailyChg >= 0 ? '▲ +' : '▼ ') + dailyChg + '% today';
  chgEl.className   = 'pos-chg ' + (dailyChg >= 0 ? 'up' : 'dn');

  var trEl = document.getElementById('pd-tr-pct');
  trEl.textContent = (pos ? '+' : '') + tr.totalPct.toFixed(1) + '%';
  trEl.className   = 'trc-main' + (pos ? '' : ' neg');

  document.getElementById('pd-tr-sub').textContent =
    (pos ? '+' : '') + '$' + Math.abs(Math.round(tr.totalGain)).toLocaleString() +
    ' on your $' + Math.round(tr.costBasis).toLocaleString() + ' invested';

  document.getElementById('pd-pgain').textContent = (tr.priceGain >= 0 ? '+' : '') + '$' + Math.round(Math.abs(tr.priceGain)).toLocaleString();
  document.getElementById('pd-pgain').className   = tr.priceGain >= 0 ? 'up' : 'dn';
  document.getElementById('pd-divs').textContent  = '+$' + tr.dividends;
  document.getElementById('pd-total').textContent =
    (pos ? '+' : '') + '$' + Math.abs(Math.round(tr.totalGain)).toLocaleString() +
    ' (' + (pos ? '+' : '') + tr.totalPct.toFixed(1) + '%)';
  document.getElementById('pd-total').className = pos ? 'up' : 'dn';

  var spReturn  = 12.3;
  var outperf   = tr.totalPct - spReturn;
  document.getElementById('pd-opp').innerHTML =
    'vs. S&P 500 same period: <strong>+' + spReturn + '%</strong> — you\'re ' +
    (outperf >= 0
      ? 'outperforming by <strong>+' + outperf.toFixed(1) + '%</strong> ✓'
      : 'underperforming by <strong>' + outperf.toFixed(1) + '%</strong>');

  // Destroy old charts before redrawing
  if (posChart) { posChart.destroy(); posChart = null; }
  if (rsiChart) { rsiChart.destroy(); rsiChart = null; }

  setTimeout(function() {
    initPositionChart(p);
    initRSIChart(p);
    renderSignals(p);
    renderActivity(p);
  }, 60);
}

function initPositionChart(p) {
  var cv = document.getElementById('posChart');
  if (!cv) return;

  var n      = 130;
  var prices = genPriceSeries(n, p.avgCost * 0.92, ((p.price / p.avgCost) - 1) * 100, p.avgCost * 0.012);
  prices[prices.length - 1] = p.price;

  // Compute 50-day and 200-day moving averages
  function ma(data, window) {
    return data.map(function(_, i) {
      if (i < window - 1) return null;
      var sum = 0;
      for (var j = i - window + 1; j <= i; j++) sum += data[j];
      return +(sum / window).toFixed(2);
    });
  }

  var ma50  = ma(prices, 50);
  var ma200 = ma(prices, Math.min(130, prices.length));

  var labels = [];
  var now    = new Date();
  for (var i = n; i >= 0; i--) {
    var d = new Date(now); d.setDate(d.getDate() - i);
    labels.push(d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
  }

  posChart = new Chart(cv.getContext('2d'), {
    type: 'line',
    data: {
      labels: labels,
      datasets: [
        {
          label: 'Price',
          data: prices,
          borderColor: '#002060',
          backgroundColor: 'rgba(0,32,96,0.07)',
          borderWidth: 2,
          fill: true,
          tension: 0.3,
          pointRadius: 0
        },
        {
          label: '50-day avg',
          data: ma50,
          borderColor: '#f59e0b',
          borderWidth: 1.5,
          borderDash: [5, 3],
          fill: false,
          tension: 0.3,
          pointRadius: 0,
          spanGaps: true
        },
        {
          label: '200-day avg',
          data: ma200,
          borderColor: '#ef4444',
          borderWidth: 1.5,
          borderDash: [3, 4],
          fill: false,
          tension: 0.3,
          pointRadius: 0,
          spanGaps: true
        }
      ]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: function(c) {
              return c.dataset.label + ': $' + (c.parsed.y || 0).toFixed(2);
            }
          }
        }
      },
      scales: {
        x: { grid: { display: false }, ticks: { font: { size: 9 }, color: '#6080A8', maxTicksLimit: 5, maxRotation: 0 } },
        y: { grid: { color: 'rgba(0,32,96,0.05)' }, ticks: { font: { size: 9 }, color: '#6080A8', callback: function(v) { return '$' + v.toFixed(0); } } }
      }
    }
  });
}

function initRSIChart(p) {
  var cv = document.getElementById('rsiChart');
  if (!cv) return;

  var n    = 60;
  var data = [];
  var rsi  = 48 + Math.random() * 20;
  for (var i = 0; i < n; i++) {
    rsi += (Math.random() - 0.48) * 6;
    rsi  = Math.max(20, Math.min(82, rsi));
    data.push(+rsi.toFixed(1));
  }

  var lastRSI = data[data.length - 1];
  var badge   = document.getElementById('rsi-badge');
  if (lastRSI >= 70) {
    badge.textContent = 'Possibly overpriced';
    badge.className   = 'rsi-badge overbought';
  } else if (lastRSI <= 30) {
    badge.textContent = 'Possibly underpriced';
    badge.className   = 'rsi-badge oversold';
  } else {
    badge.textContent = 'Neutral (' + lastRSI.toFixed(0) + ')';
    badge.className   = 'rsi-badge neutral';
  }

  var labels = [];
  var now    = new Date();
  for (var j = n - 1; j >= 0; j--) {
    var d = new Date(now); d.setDate(d.getDate() - j);
    labels.push(d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
  }

  rsiChart = new Chart(cv.getContext('2d'), {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        data: data,
        borderColor: '#1A6FE8',
        backgroundColor: 'rgba(26,111,232,0.08)',
        borderWidth: 1.5,
        fill: true,
        tension: 0.4,
        pointRadius: 0
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false },
        annotation: {},
        tooltip: {
          callbacks: { label: function(c) { return 'Strength: ' + c.parsed.y.toFixed(0); } }
        }
      },
      scales: {
        x: { display: false },
        y: {
          min: 0, max: 100,
          grid: { color: function(ctx) {
            if (ctx.tick.value === 70 || ctx.tick.value === 30) return 'rgba(239,68,68,0.3)';
            return 'rgba(0,32,96,0.05)';
          }},
          ticks: {
            font: { size: 9 }, color: '#6080A8',
            callback: function(v) { return v === 70 ? '70' : v === 30 ? '30' : v === 50 ? '50' : ''; }
          }
        }
      }
    }
  });
}

function renderSignals(p) {
  var list = document.getElementById('signals-list');
  if (!list) return;
  var signals = [];

  if (p.signal === 'golden') {
    signals.push({
      icon: '🟡',
      title: 'Golden Cross — Positive trend',
      desc: 'The 50-day average recently crossed above the 200-day average. Historically a bullish signal.'
    });
  }
  if (p.signal === 'death') {
    signals.push({
      icon: '🔴',
      title: 'Death Cross — Caution',
      desc: 'The 50-day average recently crossed below the 200-day average. Historically a bearish signal.'
    });
  }
  signals.push({
    icon: '📊',
    title: 'Above 200-day average',
    desc: 'Current price is above its long-term average — generally a healthy sign.'
  });
  if (p.taxLoss) {
    signals.push({
      icon: '💡',
      title: 'Tax saving opportunity available',
      desc: 'This position has an unrealized loss. Selling it could reduce your tax bill this year.'
    });
  }

  list.innerHTML = signals.map(function(s) {
    return '<div class="signal-row">' +
      '<div class="signal-icon">' + s.icon + '</div>' +
      '<div class="signal-info">' +
        '<strong>' + s.title + '</strong>' +
        '<span>' + s.desc + '</span>' +
      '</div></div>';
  }).join('');
}

function renderActivity(p) {
  var list = document.getElementById('activity-list');
  if (!list) return;

  list.innerHTML = p.activity.map(function(a) {
    var cls, label, amt;
    if (a.type === 'buy') {
      cls = 'buy'; label = 'BUY';
      amt = '<span class="act-amt neg">-$' + Math.round(a.shares * a.price).toLocaleString() + '</span>';
    } else if (a.type === 'sell') {
      cls = 'sell'; label = 'SELL';
      amt = '<span class="act-amt pos">+$' + Math.round(a.shares * a.price).toLocaleString() + '</span>';
    } else {
      cls = 'div'; label = 'DIV';
      amt = '<span class="act-amt pos">+$' + (a.price * (a.shares || p.shares)).toFixed(2) + '</span>';
    }
    return '<div class="activity-row">' +
      '<div class="act-dot ' + cls + '">' + label + '</div>' +
      '<div class="act-info">' +
        '<strong>' + a.note + '</strong>' +
        '<span>' + a.date + (a.shares ? ' · ' + a.shares + ' shares @ $' + a.price.toFixed(2) : '') + '</span>' +
      '</div>' +
      amt +
    '</div>';
  }).join('');
}


// ============================================================
// SCENARIOS
// ============================================================

function scSel(n) {
  for (var i = 1; i <= 5; i++) {
    document.getElementById('scard' + i).classList.remove('sel');
  }
  document.getElementById('scard' + n).classList.add('sel');
}

function updSlider(el) {
  var pct = ((+el.value - +el.min) / (+el.max - +el.min) * 100).toFixed(1);
  el.style.background = 'linear-gradient(90deg, #1A6FE8 ' + pct + '%, #D6E8FF ' + pct + '%)';
}

function sc1upd(v) {
  updSlider(document.getElementById('sr1'));
  v = parseInt(v);
  document.getElementById('sv1').textContent = v + '%';
  var loss = Math.round(PORTFOLIO.totalValue * v / 100 * 1.25);
  var rem  = PORTFOLIO.totalValue - loss;
  document.getElementById('sib1').querySelector('p').innerHTML =
    'Your portfolio would drop by approximately <strong>$' + loss.toLocaleString() +
    '</strong> to <strong>$' + Math.max(0, rem).toLocaleString() +
    '</strong>. Your tech stocks take the biggest hit — they tend to fall about 1.5× harder than the market average.';
}

function sc2upd(v) {
  updSlider(document.getElementById('sr2'));
  v = parseInt(v);
  document.getElementById('sv2').textContent = v + '%';
  var exposed = Math.round(PORTFOLIO.totalValue * 0.25);
  var loss    = Math.round(exposed * v / 100);
  document.getElementById('sib2').querySelector('p').innerHTML =
    'At <strong>' + v + '% inflation</strong>, your cash and bonds (~$' + exposed.toLocaleString() +
    ') lose about <strong>$' + loss.toLocaleString() +
    '/year</strong> in real buying power. Your stocks should roughly keep pace, but adding inflation-resistant assets provides extra protection.';
}

function sc3upd(v) {
  updSlider(document.getElementById('sr3'));
  v = parseInt(v);
  var amt   = Math.round(PORTFOLIO.totalValue * v / 100);
  var liquid = PORTFOLIO.cash;
  var short = Math.max(0, amt - liquid);
  document.getElementById('sv3').textContent = v + '% ($' + amt.toLocaleString() + ')';
  document.getElementById('sib3').querySelector('p').innerHTML =
    'You\'d need <strong>$' + amt.toLocaleString() +
    '</strong> but only have <strong>$' + liquid.toLocaleString() + '</strong> in cash. ' +
    (short > 0
      ? 'You\'d need to sell <strong>$' + short.toLocaleString() + '</strong> in investments — potentially at an unfavourable time.'
      : 'You have enough liquid cash to cover this withdrawal. ✓');
}

function sc4upd(v) {
  updSlider(document.getElementById('sr4'));
  var pct     = (v / 100).toFixed(2);
  var bondVal = Math.round(PORTFOLIO.totalValue * 0.15);
  var bondLoss = Math.round(bondVal * v / 100 * 0.5);
  document.getElementById('sv4').textContent = (v / 100).toFixed(2) + '%';
  document.getElementById('sib4').querySelector('p').innerHTML =
    'A <strong>' + pct + '% rate rise</strong> would likely drop your bond fund by ~' + (v / 100 * 5).toFixed(1) +
    '% (about <strong>$' + bondLoss.toLocaleString() + '</strong>) and put pressure on growth stocks. ' +
    'Your index funds and cash would largely hold their ground.';
}


// ============================================================
// REBALANCE CONFIRMATION
// ============================================================

function confirmReb() {
  var toast = document.getElementById('toast');
  toast.textContent = '✓ Rebalancing plan applied!';
  toast.classList.add('show');
  setTimeout(function() {
    toast.classList.remove('show');
    go('screen-dashboard');
  }, 2600);
}


// ============================================================
// INIT
// ============================================================

document.addEventListener('DOMContentLoaded', function() {
  ['sr1','sr2','sr3','sr4'].forEach(function(id) {
    var el = document.getElementById(id);
    if (el) updSlider(el);
  });

  lucide.createIcons();
});
