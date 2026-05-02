import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Play, BookOpen, HelpCircle, Check, Award, ChevronRight, Lock } from 'lucide-react'
import { COURSES } from '../data/courses'
import { useApp } from '../context/AppContext'

const MODULE_ICONS = { video: Play, reading: BookOpen, quiz: HelpCircle }

function CertModal({ course, onClose }) {
  const { creditsEarned } = useApp()
  return (
    <motion.div
      className="modal-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="cert-modal"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={e => e.stopPropagation()}
      >
        <div className="cert-seal" style={{ background: course.color }}>
          <Award size={32} color="#fff" />
        </div>
        <p className="cert-label">Certificate of Completion</p>
        <h2 className="cert-title">{course.title}</h2>
        <p className="cert-subtitle">Goldman Stachs Learning Center</p>
        <div className="cert-credits">
          +{course.creditsOnCompletion} credits earned
        </div>
        <p className="cert-total">Total credits: {creditsEarned}</p>
        <button className="btn-primary" style={{ width: '100%' }} onClick={onClose}>
          Continue learning
        </button>
      </motion.div>
    </motion.div>
  )
}

function QuizModule({ module, onComplete }) {
  const [selected, setSelected] = useState(Array(module.questions.length).fill(null))
  const [submitted, setSubmitted] = useState(false)

  const allAnswered = selected.every(s => s !== null)
  const score = submitted
    ? selected.filter((s, i) => s === module.questions[i].correct).length
    : 0
  const passed = score / module.questions.length >= 0.7

  const handleSubmit = () => {
    setSubmitted(true)
    if (passed) setTimeout(onComplete, 800)
  }

  return (
    <div className="quiz-wrap">
      <p className="quiz-header">{module.questions.length} questions · Pass at 70%</p>
      {module.questions.map((q, qi) => (
        <div key={qi} className="quiz-question">
          <p className="quiz-question-text">{qi + 1}. {q.question}</p>
          <div className="quiz-options">
            {q.options.map((opt, oi) => {
              const isSelected = selected[qi] === oi
              const isCorrect = submitted && oi === q.correct
              const isWrong = submitted && isSelected && oi !== q.correct
              return (
                <button
                  key={oi}
                  disabled={submitted}
                  className={`quiz-option ${isSelected ? 'selected' : ''} ${isCorrect ? 'correct' : ''} ${isWrong ? 'wrong' : ''}`}
                  onClick={() => {
                    if (!submitted) {
                      const next = [...selected]
                      next[qi] = oi
                      setSelected(next)
                    }
                  }}
                >
                  <span className="quiz-option-letter">{String.fromCharCode(65 + oi)}</span>
                  <span>{opt}</span>
                  {isCorrect && <Check size={13} style={{ marginLeft: 'auto' }} />}
                </button>
              )
            })}
          </div>
        </div>
      ))}

      {!submitted ? (
        <button className="btn-primary" disabled={!allAnswered} onClick={handleSubmit} style={{ width: '100%' }}>
          Submit answers
        </button>
      ) : (
        <div className={`quiz-result ${passed ? 'passed' : 'failed'}`}>
          {passed ? <Check size={16} /> : null}
          {passed
            ? `Passed! ${score}/${module.questions.length} correct`
            : `${score}/${module.questions.length} correct — review and try again`}
        </div>
      )}
    </div>
  )
}

function CourseDetail({ course, onBack }) {
  const { courseProgress, completeModule, earnCertificate } = useApp()
  const [activeModule, setActiveModule] = useState(null)
  const [showCert, setShowCert] = useState(false)
  const progress = courseProgress[course.id]

  const completedCount = progress.completedModules.length
  const totalCount = course.modules.length
  const allDone = completedCount === totalCount
  const progressPct = (completedCount / totalCount) * 100

  const handleModuleComplete = (moduleId) => {
    completeModule(course.id, moduleId)
    setActiveModule(null)
    if (completedCount + 1 === totalCount && !progress.certificateEarned) {
      setTimeout(() => {
        earnCertificate(course.id)
        setShowCert(true)
      }, 400)
    }
  }

  const ModuleIcon = activeModule ? MODULE_ICONS[activeModule.type] || BookOpen : null

  return (
    <motion.div
      className="screen"
      initial={{ x: 30, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 30, opacity: 0 }}
      transition={{ duration: 0.18 }}
    >
      <header className="gs-header">
        <button className="btn-icon" onClick={() => activeModule ? setActiveModule(null) : onBack()}>
          <ArrowLeft size={18} />
        </button>
        <span className="gs-wordmark" style={{ marginLeft: 8 }}>
          {activeModule ? activeModule.title : course.title}
        </span>
      </header>

      <div className="screen-content">
        {!activeModule ? (
          <>
            <div className="card course-detail-hero" style={{ background: course.color }}>
              <p className="course-hero-level">{course.level} · {course.duration}</p>
              <h2 className="course-hero-title">{course.title}</h2>
              <p className="course-hero-desc">{course.description}</p>
              <div className="course-hero-progress">
                <div className="course-progress-bar">
                  <div className="course-progress-fill" style={{ width: `${progressPct}%` }} />
                </div>
                <span>{completedCount}/{totalCount} modules complete</span>
              </div>
              {allDone && (
                <div className="course-complete-badge">
                  <Award size={14} />
                  {progress.certificateEarned ? 'Certificate earned' : 'All modules complete'}
                </div>
              )}
            </div>

            <div className="card">
              <div className="card-title-row">
                <h3 className="card-title">Modules</h3>
                <span className="badge blue">{course.creditsOnCompletion} credits on completion</span>
              </div>
              {course.modules.map((mod, i) => {
                const done = progress.completedModules.includes(mod.id)
                const Icon = MODULE_ICONS[mod.type] || BookOpen
                const locked = i > 0 && !progress.completedModules.includes(course.modules[i - 1].id)
                return (
                  <button
                    key={mod.id}
                    className={`module-row ${done ? 'done' : ''} ${locked ? 'locked' : ''}`}
                    disabled={locked}
                    onClick={() => !locked && setActiveModule(mod)}
                  >
                    <div className={`module-icon-wrap ${done ? 'done' : ''}`}>
                      {done ? <Check size={14} /> : locked ? <Lock size={12} /> : <Icon size={14} />}
                    </div>
                    <div className="module-info">
                      <span className="module-title">{mod.title}</span>
                      <span className="module-meta">
                        {mod.type.charAt(0).toUpperCase() + mod.type.slice(1)} · {mod.duration}
                      </span>
                    </div>
                    {!locked && <ChevronRight size={14} className="module-chevron" />}
                  </button>
                )
              })}
            </div>
          </>
        ) : (
          <div className="card">
            <div className="module-type-header">
              <span className={`module-type-badge ${activeModule.type}`}>
                <ModuleIcon size={12} />
                {activeModule.type}
              </span>
              <span className="module-duration">{activeModule.duration}</span>
            </div>
            <h2 className="module-content-title">{activeModule.title}</h2>

            {activeModule.type === 'video' && (
              <div className="module-video-placeholder">
                <Play size={28} />
                <p>Video: {activeModule.title}</p>
                <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Duration: {activeModule.duration}</p>
              </div>
            )}

            {activeModule.type === 'reading' && activeModule.content && (
              <div className="module-reading-content">
                {activeModule.content.split('\n\n').map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            )}

            {activeModule.type === 'quiz' && activeModule.questions && (
              <QuizModule
                module={activeModule}
                onComplete={() => handleModuleComplete(activeModule.id)}
              />
            )}

            {activeModule.type !== 'quiz' && !progress.completedModules.includes(activeModule.id) && (
              <button
                className="btn-primary"
                style={{ width: '100%', marginTop: '16px' }}
                onClick={() => handleModuleComplete(activeModule.id)}
              >
                Mark complete
                <Check size={14} />
              </button>
            )}
          </div>
        )}
      </div>

      <AnimatePresence>
        {showCert && <CertModal course={course} onClose={() => setShowCert(false)} />}
      </AnimatePresence>
    </motion.div>
  )
}

export default function LearningCenter() {
  const { creditsEarned, creditsAvailable, courseProgress } = useApp()
  const [selectedCourse, setSelectedCourse] = useState(null)

  if (selectedCourse) {
    return <CourseDetail course={selectedCourse} onBack={() => setSelectedCourse(null)} />
  }

  const totalModules = COURSES.reduce((s, c) => s + c.modules.length, 0)
  const completedModules = COURSES.reduce((s, c) => s + (courseProgress[c.id]?.completedModules.length || 0), 0)

  return (
    <motion.div
      className="screen"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <header className="gs-header">
        <span className="gs-wordmark">Learning Center</span>
        <div className="credits-pill-large">
          <Award size={14} />
          <div>
            <span className="credits-pill-val">{creditsAvailable}</span>
            <span className="credits-pill-label"> credits available</span>
          </div>
        </div>
      </header>

      <div className="screen-content">
        <div className="credits-banner">
          <div className="credits-banner-left">
            <Award size={20} />
            <div>
              <p className="credits-banner-title">{creditsEarned} total credits earned</p>
              <p className="credits-banner-sub">
                Complete courses to earn credits redeemable for cash investments.
              </p>
            </div>
          </div>
          <div className="credits-banner-stats">
            <span>{completedModules}/{totalModules}</span>
            <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.75)' }}>modules</span>
          </div>
        </div>

        {['Beginner', 'Intermediate', 'Advanced'].map(level => {
          const levelCourses = COURSES.filter(c => c.level === level)
          if (!levelCourses.length) return null
          return (
            <div key={level}>
              <h3 className="section-heading">{level}</h3>
              {levelCourses.map(course => {
                const progress = courseProgress[course.id]
                const pct = (progress.completedModules.length / course.modules.length) * 100
                const done = progress.certificateEarned
                return (
                  <button
                    key={course.id}
                    className="course-card"
                    onClick={() => setSelectedCourse(course)}
                  >
                    <div className="course-card-accent" style={{ background: course.color }} />
                    <div className="course-card-body">
                      <div className="course-card-header-row">
                        <span className={`badge ${level === 'Beginner' ? 'blue' : level === 'Intermediate' ? 'warn' : 'gray'}`}>
                          {level}
                        </span>
                        {done && (
                          <span className="badge" style={{ background: 'var(--positive-bg)', color: 'var(--positive)' }}>
                            <Award size={10} /> Certified
                          </span>
                        )}
                      </div>
                      <h4 className="course-card-title">{course.title}</h4>
                      <p className="course-card-desc">{course.description}</p>
                      <div className="course-card-footer">
                        <div className="course-mini-progress">
                          <div className="course-mini-fill" style={{ width: `${pct}%`, background: course.color }} />
                        </div>
                        <div className="course-card-meta">
                          <span>{course.duration} · {course.moduleCount} modules</span>
                          <span className="course-credits-badge">
                            <Award size={11} />
                            +{course.creditsOnCompletion} credits
                          </span>
                        </div>
                      </div>
                    </div>
                    <ChevronRight size={16} className="course-card-chevron" />
                  </button>
                )
              })}
            </div>
          )
        })}
      </div>
    </motion.div>
  )
}
