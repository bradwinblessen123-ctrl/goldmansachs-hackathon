var chart = null;

// ---- NAVIGATION ----

function go(id) {
  document.querySelectorAll('.screen').forEach(function(s) {
    s.classList.remove('active');
  });
  document.getElementById(id).classList.add('active');
  window.scrollTo(0, 0);
  if (id === 'screen-dashboard') initChart();
}


// ---- ONBOARDING ----

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
    if (i < step)      d.classList.add('done');
    else if (i === step) d.classList.add('active');
  }
}

function obFinish() {
  go('screen-loading');

  var msgs = [
    'Analyzing your goals...',
    'Calculating your risk profile...',
    'Selecting your asset mix...',
    'Preparing your dashboard...'
  ];
  var msgEl = document.getElementById('loadingMsg');
  var bar   = document.getElementById('loadingBar');

  function setMsg(text) {
    msgEl.classList.add('fade');
    setTimeout(function() {
      msgEl.textContent = text;
      msgEl.classList.remove('fade');
    }, 200);
  }

  setTimeout(function() { bar.style.width = '28%'; }, 100);
  setTimeout(function() { setMsg(msgs[1]); bar.style.width = '52%'; }, 900);
  setTimeout(function() { setMsg(msgs[2]); bar.style.width = '75%'; }, 1700);
  setTimeout(function() { setMsg(msgs[3]); bar.style.width = '95%'; }, 2400);
  setTimeout(function() { go('screen-dashboard'); }, 3000);
}


// ---- ALLOCATION CHART ----

function initChart() {
  if (chart) return;
  var cv = document.getElementById('allocChart');
  if (!cv) return;
  chart = new Chart(cv.getContext('2d'), {
    type: 'doughnut',
    data: {
      labels: ['Stocks', 'Mutual Funds', 'Bonds', 'Cash'],
      datasets: [{
        data: [65, 20, 10, 5],
        backgroundColor: ['#1a3a6c', '#2563eb', '#93c5fd', '#bfdbfe'],
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


// ---- SCENARIOS ----

function scSel(n) {
  for (var i = 1; i <= 4; i++) {
    document.getElementById('scard' + i).classList.remove('sel');
  }
  document.getElementById('scard' + n).classList.add('sel');
}

function updSlider(el) {
  var min = +el.min, max = +el.max, val = +el.value;
  var pct = ((val - min) / (max - min) * 100).toFixed(1);
  el.style.background = 'linear-gradient(90deg, #2563eb ' + pct + '%, #dbeafe ' + pct + '%)';
}

function sc1upd(v) {
  updSlider(document.getElementById('sr1'));
  v = parseInt(v);
  document.getElementById('sv1').textContent = v + '%';
  var loss = Math.round(124350 * v / 100);
  var rem  = 124350 - loss;
  document.getElementById('sib1').querySelector('p').innerHTML =
    'Your portfolio would drop by approximately <strong>$' + loss.toLocaleString() +
    '</strong> to <strong>$' + rem.toLocaleString() +
    '</strong>. Your tech-heavy stocks take the biggest hit — they usually fall harder than the market average.';
}

function sc2upd(v) {
  updSlider(document.getElementById('sr2'));
  v = parseInt(v);
  document.getElementById('sv2').textContent = v + '%';
  var loss = Math.round(18650 * v / 100);
  document.getElementById('sib2').querySelector('p').innerHTML =
    'At <strong>' + v + '% inflation</strong>, your cash and bonds (~$18,650) lose about <strong>$' +
    loss.toLocaleString() + '/year</strong> in real buying power. ' +
    'Your stocks should keep up — but adding inflation-linked assets provides a cushion.';
}

function sc3upd(v) {
  updSlider(document.getElementById('sr3'));
  v = parseInt(v);
  var amt   = Math.round(124350 * v / 100);
  var short = Math.max(0, amt - 6218);
  document.getElementById('sv3').textContent = v + '% ($' + amt.toLocaleString() + ')';
  document.getElementById('sib3').querySelector('p').innerHTML =
    'You\'d need <strong>$' + amt.toLocaleString() +
    '</strong> but only have <strong>$6,218</strong> in liquid assets. ' +
    'You\'d need to sell <strong>$' + short.toLocaleString() +
    '</strong> in investments — potentially at an unfavourable time.';
}


// ---- REBALANCE CONFIRMATION ----

function confirmReb() {
  var toast = document.getElementById('toast');
  toast.textContent = 'Rebalancing plan applied!';
  toast.classList.add('show');
  setTimeout(function() {
    toast.classList.remove('show');
    go('screen-dashboard');
  }, 2400);
}


// ---- INIT ----

document.addEventListener('DOMContentLoaded', function() {
  ['sr1', 'sr2', 'sr3'].forEach(function(id) {
    var el = document.getElementById(id);
    if (el) updSlider(el);
  });
  initChart();
  lucide.createIcons();
});
