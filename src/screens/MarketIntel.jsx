import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Clock, ExternalLink } from 'lucide-react'
import { NEWS } from '../data/news'
import { useApp } from '../context/AppContext'

const CATEGORIES = ['All', 'Federal Reserve', 'Earnings', 'Economy', 'Markets', 'Fixed Income', 'Technology']

function RichParagraph({ segments, openTerm }) {
  return (
    <p className="article-paragraph">
      {segments.map((seg, i) => {
        if (seg.type === 'term') {
          return (
            <button
              key={i}
              className="fin-term"
              onClick={() => openTerm(seg.termKey)}
            >
              {seg.word || seg.content}
            </button>
          )
        }
        return <span key={i}>{seg.content}</span>
      })}
    </p>
  )
}

function ArticleView({ article, onBack }) {
  const { openTerm } = useApp()

  return (
    <motion.div
      className="screen"
      initial={{ x: 30, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 30, opacity: 0 }}
      transition={{ duration: 0.18 }}
    >
      <header className="gs-header">
        <button className="btn-icon" onClick={onBack}>
          <ArrowLeft size={18} />
        </button>
        <span className="gs-wordmark" style={{ marginLeft: 8 }}>Markets</span>
      </header>

      <div className="screen-content">
        <div className="card article-card">
          <div className="article-meta-top">
            <span className="news-source">{article.source}</span>
            <span className="news-time">
              <Clock size={11} />
              {article.time} · {article.readTime}
            </span>
          </div>
          <h1 className="article-headline">{article.headline}</h1>
          <p className="article-summary">{article.summary}</p>
          <div className="article-divider" />
          <div className="article-body">
            {article.body.map((block, i) => {
              if (block.type === 'paragraph') {
                return <RichParagraph key={i} segments={block.segments} openTerm={openTerm} />
              }
              if (block.type === 'subheading') {
                return <h3 key={i} className="article-subheading">{block.text}</h3>
              }
              return null
            })}
          </div>
          <div className="article-footer">
            <span className="fin-term-tip">
              Underlined terms are clickable — tap to see plain-English definitions.
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function MarketIntel() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [selectedArticle, setSelectedArticle] = useState(null)

  const filtered = activeCategory === 'All'
    ? NEWS
    : NEWS.filter(n => n.category === activeCategory)

  if (selectedArticle) {
    return <ArticleView article={selectedArticle} onBack={() => setSelectedArticle(null)} />
  }

  return (
    <motion.div
      className="screen"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <header className="gs-header">
        <span className="gs-wordmark">Market Intelligence</span>
      </header>

      <div className="screen-content">
        <div className="fin-term-tip-banner">
          Terms shown in blue are clickable — tap for plain-English definitions.
        </div>

        {/* Category filter */}
        <div className="category-scroll">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              className={`category-chip${activeCategory === cat ? ' active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* News cards */}
        <AnimatePresence>
          {filtered.map(article => (
            <motion.div
              key={article.id}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <button
                className="news-card"
                onClick={() => setSelectedArticle(article)}
              >
                <div className="news-card-header">
                  <span className="news-source">{article.source}</span>
                  <span className="news-time">
                    <Clock size={11} />
                    {article.time}
                  </span>
                </div>
                <h3 className="news-headline">{article.headline}</h3>
                <p className="news-summary">{article.summary}</p>
                <div className="news-card-footer">
                  <span className="news-category-badge">{article.category}</span>
                  <span className="news-read-time">{article.readTime}</span>
                </div>
              </button>
            </motion.div>
          ))}
        </AnimatePresence>

        {filtered.length === 0 && (
          <div className="empty-state">
            <p>No articles in this category</p>
          </div>
        )}
      </div>
    </motion.div>
  )
}
