export const COURSES = [
  {
    id: 'investing-fundamentals',
    title: 'Investing Fundamentals',
    category: 'Core',
    level: 'Beginner',
    duration: '2.5 hours',
    moduleCount: 5,
    creditsOnCompletion: 50,
    certificate: 'Certificate in Investing Fundamentals',
    description: 'Build a solid foundation in investing — from understanding what stocks and bonds are to making your first investment decision with confidence.',
    color: '#002B6B',
    modules: [
      {
        id: 1, title: 'Why Invest at All?', type: 'video', duration: '8 min', completed: false,
        content: 'Saving money in a bank account feels safe, but inflation quietly erodes its purchasing power over time. This module explains why investing is essential to building long-term wealth and how even small amounts, invested consistently, can grow significantly through the power of compound interest.',
      },
      {
        id: 2, title: 'Understanding Asset Classes', type: 'reading', duration: '12 min', completed: false,
        content: 'Asset classes are categories of investments that behave differently from each other. The three primary asset classes are stocks (ownership in companies), bonds (loans to governments or corporations), and cash equivalents (savings accounts, money market funds). Each carries a different risk/return profile.',
      },
      {
        id: 3, title: 'How Markets Work', type: 'video', duration: '10 min', completed: false,
        content: 'Stock markets are organized exchanges where buyers and sellers trade ownership stakes in companies. Prices are set by supply and demand — when more people want to buy a stock than sell it, the price rises. This module covers how exchanges like the NYSE and Nasdaq operate.',
      },
      {
        id: 4, title: 'Risk and Return', type: 'reading', duration: '10 min', completed: false,
        content: 'The fundamental principle of investing is that higher potential returns require accepting higher risk. Understanding this tradeoff — and knowing your personal risk tolerance — is essential to building a portfolio you can stick with through market volatility.',
      },
      {
        id: 5, title: 'Module Assessment', type: 'quiz', duration: '8 min', completed: false,
        questions: [
          {
            question: 'What is the primary risk of keeping all your savings in a low-interest bank account?',
            options: ['Bank failure', 'Inflation eroding purchasing power', 'High fees', 'Government seizure'],
            correct: 1,
          },
          {
            question: 'Which asset class typically offers the highest potential long-term returns but also the highest risk?',
            options: ['Cash', 'Government bonds', 'Stocks', 'Money market funds'],
            correct: 2,
          },
          {
            question: 'Stock prices rise when:',
            options: ['The company pays dividends', 'More people want to buy than sell', 'Interest rates are high', 'The government prints more money'],
            correct: 1,
          },
          {
            question: 'The "risk/return tradeoff" means:',
            options: ['Lower risk always means better returns', 'Higher potential returns require accepting higher risk', 'Risk can be eliminated with diversification', 'Return is unpredictable regardless of risk'],
            correct: 1,
          },
          {
            question: 'Which of the following best describes compound interest?',
            options: ['Interest paid on the original amount only', 'A fixed annual fee', 'Earning interest on both principal and previously earned interest', 'A government bond rate'],
            correct: 2,
          },
        ],
      },
    ],
  },
  {
    id: 'markets-101',
    title: 'Understanding Financial Markets',
    category: 'Markets',
    level: 'Beginner',
    duration: '3 hours',
    moduleCount: 5,
    creditsOnCompletion: 50,
    certificate: 'Certificate in Financial Markets',
    description: 'Learn how global financial markets work, what drives stock prices, and how macroeconomic events like Fed decisions and inflation affect your investments.',
    color: '#003D7A',
    modules: [
      {
        id: 1, title: 'The Federal Reserve and You', type: 'video', duration: '12 min', completed: false,
        content: 'The Federal Reserve sets the interest rate that ripples through the entire economy — affecting your mortgage, car loan, and investment returns. This module explains how Fed decisions translate into real impacts on your portfolio.',
      },
      {
        id: 2, title: 'Reading Market Indices', type: 'reading', duration: '10 min', completed: false,
        content: 'The S&P 500, Dow Jones, and Nasdaq are the three main benchmarks investors use to track the US stock market. Each measures different things: the S&P 500 represents the 500 largest companies; the Dow tracks 30 iconic companies; the Nasdaq weights technology heavily.',
      },
      {
        id: 3, title: 'Bull Markets, Bear Markets, and Corrections', type: 'video', duration: '9 min', completed: false,
        content: 'Markets move in cycles. A bull market is a period of rising prices (typically 20%+ gains from a low). A bear market is a decline of 20% or more. A correction is a 10–20% drop. Understanding these cycles helps you stay calm and make rational decisions during volatility.',
      },
      {
        id: 4, title: 'How Inflation Affects Investments', type: 'reading', duration: '11 min', completed: false,
        content: 'Inflation — the general rise in prices over time — is one of the biggest threats to wealth preservation. It erodes the real value of cash and fixed-income investments, while stocks and real assets often provide a natural hedge.',
      },
      {
        id: 5, title: 'Markets Assessment', type: 'quiz', duration: '8 min', completed: false,
        questions: [
          {
            question: 'What defines a "bear market"?',
            options: ['A 5% decline from a peak', 'A 10% decline from a peak', 'A 20% or greater decline from a peak', 'Any day the market closes lower'],
            correct: 2,
          },
          {
            question: 'When the Federal Reserve raises interest rates, what typically happens to bond prices?',
            options: ['They rise', 'They fall', 'They stay the same', 'They become more volatile'],
            correct: 1,
          },
          {
            question: 'Which index is most representative of the overall US stock market?',
            options: ['Dow Jones Industrial Average', 'S&P 500', 'Nasdaq Composite', 'Russell 2000'],
            correct: 1,
          },
          {
            question: 'Inflation is most harmful to which type of investment?',
            options: ['Stocks', 'Real estate', 'Cash savings', 'Commodities'],
            correct: 2,
          },
          {
            question: 'What does "basis point" mean?',
            options: ['One percentage point (1%)', 'One-tenth of a percent (0.1%)', 'One-hundredth of a percent (0.01%)', 'One thousand dollars'],
            correct: 2,
          },
        ],
      },
    ],
  },
  {
    id: 'portfolio-construction',
    title: 'Building a Resilient Portfolio',
    category: 'Wealth Management',
    level: 'Intermediate',
    duration: '4 hours',
    moduleCount: 6,
    creditsOnCompletion: 100,
    certificate: 'Certificate in Portfolio Construction',
    description: 'Go beyond individual stocks and learn how professional portfolio managers think about diversification, asset allocation, and building a mix of investments that can withstand market turbulence.',
    color: '#0047B3',
    modules: [
      {
        id: 1, title: 'Modern Portfolio Theory', type: 'video', duration: '14 min', completed: false,
        content: 'Nobel Prize-winning economist Harry Markowitz showed that you can reduce portfolio risk without sacrificing returns by combining assets that don\'t move in lockstep. This "efficient frontier" concept is the foundation of professional portfolio construction.',
      },
      {
        id: 2, title: 'Strategic Asset Allocation', type: 'reading', duration: '15 min', completed: false,
        content: 'Asset allocation — how you divide your portfolio among stocks, bonds, and cash — is the single biggest driver of long-term returns, accounting for roughly 90% of portfolio performance according to academic research. This module shows you how to determine the right allocation for your goals.',
      },
      {
        id: 3, title: 'Diversification in Practice', type: 'video', duration: '11 min', completed: false,
        content: 'True diversification means owning assets that respond differently to economic conditions. Domestic stocks, international stocks, bonds, and real estate often move independently — combining them reduces portfolio volatility without giving up expected returns.',
      },
      {
        id: 4, title: 'Rebalancing Strategies', type: 'reading', duration: '12 min', completed: false,
        content: 'Over time, strong performers grow to dominate your portfolio, increasing risk beyond your target. Rebalancing — systematically selling winners and buying laggards — restores your target allocation and forces you to buy low and sell high.',
      },
      {
        id: 5, title: 'Tax-Efficient Investing', type: 'video', duration: '13 min', completed: false,
        content: 'Taxes are the largest avoidable drag on investment returns. Tax-loss harvesting, asset location (which accounts hold which investments), and understanding capital gains treatment can add 0.5–1.5% to your annual after-tax returns.',
      },
      {
        id: 6, title: 'Portfolio Construction Assessment', type: 'quiz', duration: '10 min', completed: false,
        questions: [
          {
            question: 'What percentage of portfolio performance does academic research attribute to asset allocation?',
            options: ['About 30%', 'About 50%', 'About 70%', 'About 90%'],
            correct: 3,
          },
          {
            question: 'What is the primary goal of portfolio rebalancing?',
            options: ['Maximizing returns', 'Minimizing taxes', 'Maintaining your target risk level', 'Increasing diversification'],
            correct: 2,
          },
          {
            question: 'Tax-loss harvesting involves:',
            options: ['Avoiding all taxable accounts', 'Selling losing positions to offset gains', 'Holding investments for exactly one year', 'Investing only in tax-exempt bonds'],
            correct: 1,
          },
          {
            question: 'What does "correlation" mean in portfolio construction?',
            options: ['The interest rate on a bond', 'How closely two assets move together', 'The total return of a portfolio', 'A measure of company earnings'],
            correct: 1,
          },
        ],
      },
    ],
  },
  {
    id: 'fixed-income',
    title: 'Fixed Income & Bonds',
    category: 'Markets',
    level: 'Intermediate',
    duration: '3.5 hours',
    moduleCount: 5,
    creditsOnCompletion: 100,
    certificate: 'Certificate in Fixed Income',
    description: 'Master the bond market — the world\'s largest securities market — and learn how to use fixed-income instruments to generate income, reduce risk, and balance an equity portfolio.',
    color: '#005080',
    modules: [
      {
        id: 1, title: 'What is a Bond?', type: 'video', duration: '10 min', completed: false,
        content: 'A bond is a loan you make to a government or corporation. In exchange, they pay you regular interest (the "coupon") and return your principal at maturity. Bonds are the backbone of conservative investing and the default safe-haven asset.',
      },
      {
        id: 2, title: 'Types of Bonds', type: 'reading', duration: '14 min', completed: false,
        content: 'The bond market encompasses US Treasuries (backed by the US government), corporate bonds (issued by companies), municipal bonds (tax-advantaged, issued by states/cities), and international bonds. Each has different risk, return, and tax characteristics.',
      },
      {
        id: 3, title: 'Yield, Duration, and Price', type: 'video', duration: '12 min', completed: false,
        content: 'Bond yield is the annualized return you earn if you hold the bond to maturity. Duration measures how sensitive a bond\'s price is to interest rate changes. Understanding these concepts is essential — a 10-year bond can lose 8–10% of its value if rates rise 1%.',
      },
      {
        id: 4, title: 'Reading the Yield Curve', type: 'reading', duration: '13 min', completed: false,
        content: 'The yield curve charts interest rates across different maturities. A normal curve slopes upward (long-term rates higher than short-term). An inverted yield curve — when short-term rates exceed long-term — has preceded every US recession since 1955.',
      },
      {
        id: 5, title: 'Fixed Income Assessment', type: 'quiz', duration: '8 min', completed: false,
        questions: [
          {
            question: 'What is a bond "coupon"?',
            options: ['A discount at maturity', 'The regular interest payment to bondholders', 'The bond\'s credit rating', 'The bond\'s maturity date'],
            correct: 1,
          },
          {
            question: 'If interest rates rise by 1%, what happens to existing bond prices?',
            options: ['They rise', 'They fall', 'They stay the same', 'Only government bonds fall'],
            correct: 1,
          },
          {
            question: 'An inverted yield curve typically signals:',
            options: ['Strong economic growth ahead', 'Potential recession risk', 'Stock market peak', 'Currency devaluation'],
            correct: 1,
          },
          {
            question: 'Which type of bond offers tax advantages at the federal level?',
            options: ['Corporate bonds', 'Treasury bonds', 'Municipal bonds', 'Junk bonds'],
            correct: 2,
          },
        ],
      },
    ],
  },
  {
    id: 'risk-management',
    title: 'Risk Management & Protection',
    category: 'Risk & Protection',
    level: 'Intermediate',
    duration: '3 hours',
    moduleCount: 5,
    creditsOnCompletion: 100,
    certificate: 'Certificate in Risk Management',
    description: 'Learn how institutional investors measure, monitor, and protect against portfolio risk — and apply the same principles to your personal investments.',
    color: '#004A40',
    modules: [
      {
        id: 1, title: 'Measuring Portfolio Risk', type: 'video', duration: '11 min', completed: false,
        content: 'Volatility (standard deviation) measures how much your portfolio fluctuates. Maximum drawdown shows the worst loss from peak to trough. Beta measures how much your portfolio moves relative to the market. These metrics help you understand your true risk exposure.',
      },
      {
        id: 2, title: 'Concentration Risk', type: 'reading', duration: '10 min', completed: false,
        content: 'Concentration risk is the danger of having too much of your portfolio in a single stock, sector, or asset class. Professional guidelines suggest no single position should exceed 5–7% of your portfolio. Tech concentration (your portfolio currently runs ~55% tech) amplifies gains but also losses.',
      },
      {
        id: 3, title: 'Scenario Analysis', type: 'video', duration: '12 min', completed: false,
        content: 'Scenario analysis tests how your portfolio would perform under specific adverse conditions: a 2008-style crash (-50%), 1970s inflation, a tech sector collapse, or a sudden need to liquidate. Running these simulations helps you understand real-world risk before it materializes.',
      },
      {
        id: 4, title: 'Defensive Strategies', type: 'reading', duration: '11 min', completed: false,
        content: 'Defensive investments — bonds, dividend stocks, gold, cash — tend to hold their value better during downturns. Professional investors maintain minimum allocations to defensive assets to cushion against bear markets, even when equities are performing well.',
      },
      {
        id: 5, title: 'Risk Management Assessment', type: 'quiz', duration: '8 min', completed: false,
        questions: [
          {
            question: 'What does "maximum drawdown" measure?',
            options: ['The highest return in a year', 'The worst peak-to-trough loss', 'Average annual volatility', 'The beta of a portfolio'],
            correct: 1,
          },
          {
            question: 'A portfolio "beta" of 1.5 means:',
            options: ['The portfolio is 50% in bonds', 'The portfolio moves 1.5x the market', 'The portfolio has no correlation to the market', 'The portfolio is 50% less volatile'],
            correct: 1,
          },
          {
            question: 'What is the professional guideline for maximum single-stock concentration?',
            options: ['1–2% of portfolio', '5–7% of portfolio', '10–15% of portfolio', 'No limit if the stock is strong'],
            correct: 1,
          },
        ],
      },
    ],
  },
  {
    id: 'advanced-strategies',
    title: 'Advanced Investment Strategies',
    category: 'Advanced',
    level: 'Advanced',
    duration: '5 hours',
    moduleCount: 6,
    creditsOnCompletion: 150,
    certificate: 'Certificate in Advanced Investment Strategies',
    description: 'A Goldman Sachs-standard deep dive into factor investing, derivatives, alternative assets, and the quantitative techniques used by institutional investors.',
    color: '#2D1B69',
    modules: [
      {
        id: 1, title: 'Factor Investing', type: 'video', duration: '15 min', completed: false,
        content: 'Factor investing exploits systematic drivers of return: value (cheap vs. expensive), momentum (recent winners continue), quality (profitable stable businesses), and size (small caps outperform over long periods). Academic research shows these factors have delivered consistent risk-adjusted returns over decades.',
      },
      {
        id: 2, title: 'Introduction to Derivatives', type: 'reading', duration: '18 min', completed: false,
        content: 'Derivatives — options and futures — are instruments whose value derives from an underlying asset. Options give the right (but not obligation) to buy or sell at a set price. Used properly, they can hedge portfolio risk; used recklessly, they can amplify losses exponentially.',
      },
      {
        id: 3, title: 'Alternative Assets', type: 'video', duration: '14 min', completed: false,
        content: 'Alternatives — private equity, hedge funds, real estate, commodities — have low correlation to public markets, providing diversification benefits. Historically restricted to institutional investors, many are now accessible to retail investors through ETFs and fund structures.',
      },
      {
        id: 4, title: 'Quantitative Analysis', type: 'reading', duration: '16 min', completed: false,
        content: 'Quantitative investing uses mathematical models and data analysis to make investment decisions. From simple moving averages to complex machine learning models, quant techniques help identify patterns and manage risk systematically.',
      },
      {
        id: 5, title: 'ESG Investing', type: 'video', duration: '12 min', completed: false,
        content: 'Environmental, Social, and Governance (ESG) investing incorporates non-financial factors into investment analysis. Evidence is mixed on whether ESG improves returns, but it clearly affects risk — companies with poor governance or environmental practices face increasing regulatory and reputational risks.',
      },
      {
        id: 6, title: 'Advanced Strategies Assessment', type: 'quiz', duration: '12 min', completed: false,
        questions: [
          {
            question: 'In factor investing, the "value factor" refers to:',
            options: ['Investing in the most expensive stocks', 'Investing in stocks trading below intrinsic value', 'Investing in fast-growing companies', 'Investing in government bonds'],
            correct: 1,
          },
          {
            question: 'An options contract gives the buyer:',
            options: ['Obligation to buy shares at any price', 'Right, but not obligation, to buy/sell at a set price', 'Guaranteed positive return', 'Ownership in the underlying company'],
            correct: 1,
          },
          {
            question: 'Why do alternative assets add value to a portfolio?',
            options: ['They always outperform stocks', 'They have low correlation to public markets', 'They are government-guaranteed', 'They pay high dividends'],
            correct: 1,
          },
        ],
      },
    ],
  },
]
