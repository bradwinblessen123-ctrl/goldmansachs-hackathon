import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Play, ChevronRight } from 'lucide-react'
import { TERMS } from '../data/financialTerms'
import { useApp } from '../context/AppContext'

export default function TermDrawer({ termKey, onClose }) {
  const { openTerm } = useApp()
  const term = termKey ? TERMS[termKey] : null

  useEffect(() => {
    if (term) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [term])

  return (
    <AnimatePresence>
      {term && (
        <>
          <motion.div
            className="drawer-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="term-drawer"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 32, stiffness: 380 }}
          >
            <div className="term-drawer-handle" />

            <div className="term-drawer-header">
              <div>
                <p className="term-drawer-label">Financial Term</p>
                <h2 className="term-drawer-title">{term.term}</h2>
              </div>
              <button className="btn-icon" onClick={onClose} aria-label="Close">
                <X size={18} />
              </button>
            </div>

            <div className="term-drawer-body">
              <p className="term-simple">{term.simple}</p>

              {term.bullets && term.bullets.length > 0 && (
                <div className="term-bullets">
                  {term.bullets.map((b, i) => (
                    <div key={i} className="term-bullet-item">
                      <div className="term-bullet-dot" />
                      <p>{b}</p>
                    </div>
                  ))}
                </div>
              )}

              {term.example && (
                <div className="term-example">
                  <p className="term-example-label">Example</p>
                  <p className="term-example-text">{term.example}</p>
                </div>
              )}

              {term.videoTitle && (
                <a className="term-video-btn" href="#" onClick={e => e.preventDefault()}>
                  <div className="term-video-icon">
                    <Play size={14} fill="currentColor" />
                  </div>
                  <div>
                    <p className="term-video-label">Watch explainer</p>
                    <p className="term-video-title">{term.videoTitle}</p>
                  </div>
                </a>
              )}

              {term.relatedTerms && term.relatedTerms.length > 0 && (
                <div className="term-related">
                  <p className="term-related-label">Related terms</p>
                  <div className="term-chips">
                    {term.relatedTerms.map(key => {
                      const rel = TERMS[key]
                      if (!rel) return null
                      return (
                        <button
                          key={key}
                          className="term-chip"
                          onClick={() => openTerm(key)}
                        >
                          {rel.term}
                          <ChevronRight size={12} />
                        </button>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
