import { useEffect, useRef, useState } from 'react'
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Check,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Compass,
  ExternalLink,
  FileText,
  Layers3,
  Lightbulb,
  Menu,
  MessageSquareText,
  RotateCcw,
  Search,
  ShieldCheck,
  Sparkles,
  Target,
  Trophy,
  X,
  type LucideIcon,
} from 'lucide-react'
import { flashcards, objectives, practiceQuestions } from './data/learningContent'
import './App.css'

type Page = 'overview' | 'study' | 'practice' | 'flashcards' | 'progress'
type ProgressState = {
  completedLessonIds: string[]
  quizAttempts: number
  quizCorrect: number
  seenFlashcardIds: string[]
}

const progressKey = 'copilot-academy-progress-v1'
const emptyProgress: ProgressState = {
  completedLessonIds: [],
  quizAttempts: 0,
  quizCorrect: 0,
  seenFlashcardIds: [],
}

const navigation: { id: Page; label: string; icon: LucideIcon }[] = [
  { id: 'overview', label: 'Overview', icon: Compass },
  { id: 'study', label: 'Study guide', icon: BookOpen },
  { id: 'practice', label: 'Practice', icon: Target },
  { id: 'flashcards', label: 'Flashcards', icon: Layers3 },
  { id: 'progress', label: 'My progress', icon: Trophy },
]

const objectiveIcons: Record<string, LucideIcon> = {
  responsible: ShieldCheck,
  features: Sparkles,
  architecture: Layers3,
  prompts: MessageSquareText,
  productivity: Target,
  safeguards: FileText,
}

function loadProgress(): ProgressState {
  try {
    const saved = localStorage.getItem(progressKey)
    if (!saved) return emptyProgress
    const value: unknown = JSON.parse(saved)
    if (typeof value !== 'object' || value === null) return emptyProgress
    const record = value as Record<string, unknown>
    return {
      completedLessonIds: Array.isArray(record.completedLessonIds)
        ? record.completedLessonIds.filter((id): id is string => typeof id === 'string')
        : [],
      quizAttempts: typeof record.quizAttempts === 'number' ? record.quizAttempts : 0,
      quizCorrect: typeof record.quizCorrect === 'number' ? record.quizCorrect : 0,
      seenFlashcardIds: Array.isArray(record.seenFlashcardIds)
        ? record.seenFlashcardIds.filter((id): id is string => typeof id === 'string')
        : [],
    }
  } catch {
    return emptyProgress
  }
}

function App() {
  const [page, setPage] = useState<Page>('overview')
  const [activeObjectiveId, setActiveObjectiveId] = useState<string>(objectives[0].id)
  const [expandedLessonId, setExpandedLessonId] = useState<string | null>(null)
  const [query, setQuery] = useState('')
  const searchRef = useRef<HTMLInputElement>(null)
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const [progress, setProgress] = useState<ProgressState>(loadProgress)
  const [questionIndex, setQuestionIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [answerSubmitted, setAnswerSubmitted] = useState(false)
  const [flashcardIndex, setFlashcardIndex] = useState(0)
  const [flashcardFlipped, setFlashcardFlipped] = useState(false)

  useEffect(() => {
    localStorage.setItem(progressKey, JSON.stringify(progress))
  }, [progress])

  useEffect(() => {
    function focusSearch(event: KeyboardEvent) {
      const target = event.target
      if (event.key === '/' && !(target instanceof HTMLInputElement) && !(target instanceof HTMLTextAreaElement)) {
        event.preventDefault()
        searchRef.current?.focus()
      }
    }
    window.addEventListener('keydown', focusSearch)
    return () => window.removeEventListener('keydown', focusSearch)
  }, [])

  const totalLessons = objectives.reduce((total, objective) => total + objective.lessons.length, 0)
  const completedCount = progress.completedLessonIds.length
  const completion = Math.round((completedCount / totalLessons) * 100)
  const activeObjective = objectives.find((objective) => objective.id === activeObjectiveId) ?? objectives[0]
  const currentQuestion = practiceQuestions[questionIndex % practiceQuestions.length]
  const currentFlashcard = flashcards[flashcardIndex % flashcards.length]
  const normalizedQuery = query.trim().toLowerCase()

  const filteredObjectives = objectives.filter((objective) => {
    if (!normalizedQuery) return true
    return `${objective.title} ${objective.description} ${objective.lessons.map((lesson) => `${lesson.title} ${lesson.summary}`).join(' ')}`
      .toLowerCase()
      .includes(normalizedQuery)
  })

  const visibleLessons = activeObjective.lessons.filter((lesson) =>
    `${lesson.title} ${lesson.summary}`.toLowerCase().includes(normalizedQuery),
  )

  function navigate(nextPage: Page) {
    setPage(nextPage)
    setMobileNavOpen(false)
    setQuery('')
  }

  function openObjective(objectiveId: string) {
    setActiveObjectiveId(objectiveId)
    navigate('study')
  }

  function toggleLesson(lessonId: string) {
    setProgress((previous) => ({
      ...previous,
      completedLessonIds: previous.completedLessonIds.includes(lessonId)
        ? previous.completedLessonIds.filter((id) => id !== lessonId)
        : [...previous.completedLessonIds, lessonId],
    }))
  }

  function submitAnswer() {
    if (!selectedAnswer || answerSubmitted) return
    setAnswerSubmitted(true)
    setProgress((previous) => ({
      ...previous,
      quizAttempts: previous.quizAttempts + 1,
      quizCorrect: previous.quizCorrect + Number(selectedAnswer === currentQuestion.answer),
    }))
  }

  function nextQuestion() {
    setQuestionIndex((index) => index + 1)
    setSelectedAnswer(null)
    setAnswerSubmitted(false)
  }

  function markFlashcardSeen() {
    setProgress((previous) => ({
      ...previous,
      seenFlashcardIds: previous.seenFlashcardIds.includes(currentFlashcard.id)
        ? previous.seenFlashcardIds
        : [...previous.seenFlashcardIds, currentFlashcard.id],
    }))
    setFlashcardIndex((index) => (index + 1) % flashcards.length)
    setFlashcardFlipped(false)
  }

  function resetProgress() {
    setProgress(emptyProgress)
    localStorage.removeItem(progressKey)
  }

  const pageTitle = navigation.find((item) => item.id === page)?.label ?? 'Overview'

  return (
    <div className="app-shell">
      {mobileNavOpen && <button className="nav-scrim" aria-label="Close navigation" onClick={() => setMobileNavOpen(false)} />}
      <aside className={`sidebar ${mobileNavOpen ? 'sidebar-open' : ''}`}>
        <a className="brand" href="#overview" onClick={(event) => { event.preventDefault(); navigate('overview') }}>
          <span className="brand-mark"><Sparkles size={19} strokeWidth={2.3} /></span>
          <span>copilot<span className="brand-accent">academy</span></span>
        </a>
        <div className="sidebar-label">YOUR LEARNING SPACE</div>
        <nav className="primary-nav" aria-label="Main navigation">
          {navigation.map(({ id, label, icon: Icon }) => (
            <button key={id} className={`nav-item ${page === id ? 'nav-item-active' : ''}`} onClick={() => navigate(id)} aria-current={page === id ? 'page' : undefined}>
              <Icon size={18} strokeWidth={1.9} />
              <span>{label}</span>
              {id === 'practice' && <span className="nav-count">{practiceQuestions.length}</span>}
            </button>
          ))}
        </nav>
        <div className="sidebar-spacer" />
        <div className="sidebar-progress">
          <div className="sidebar-progress-top"><span>Learning path</span><span>{completion}%</span></div>
          <div className="sidebar-progress-track"><span style={{ width: `${completion}%` }} /></div>
          <p>{completedCount} of {totalLessons} topics explored</p>
        </div>
        <a className="sidebar-resource" href="https://docs.github.com/en/copilot" target="_blank" rel="noreferrer">
          <span><span className="resource-kicker">REFERENCE LIBRARY</span><strong>GitHub Copilot docs</strong></span>
          <ExternalLink size={15} />
        </a>
        <div className="sidebar-footnote">Independent community resource<br />Not affiliated with GitHub</div>
      </aside>

      <div className="workspace">
        <header className="topbar">
          <button className="icon-button mobile-menu" aria-label="Open navigation" onClick={() => setMobileNavOpen(true)}><Menu size={20} /></button>
          <div className="breadcrumb"><span>Academy</span><ChevronRight size={14} /><strong>{pageTitle}</strong></div>
          <label className="search-box">
            <Search size={17} />
            <input ref={searchRef} value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search topics" aria-label="Search topics" />
            {query && <button type="button" className="clear-search" aria-label="Clear search" onClick={() => setQuery('')}><X size={15} /></button>}
            {!query && <kbd>/</kbd>}
          </label>
          <button className="top-progress" onClick={() => navigate('progress')}><span className="top-progress-icon"><Trophy size={16} /></span><span>Progress</span></button>
        </header>

        <main className="page-content">
          {page === 'overview' && (
            <>
              <section className="welcome-row">
                <div>
                  <div className="eyebrow"><span className="eyebrow-dot" /> GH-300 LEARNING PATH</div>
                  <h1>Build your Copilot fluency.</h1>
                  <p className="welcome-copy">A practical, community-made guide to working thoughtfully with AI-assisted development.</p>
                </div>
                <div className="welcome-stat"><div className="stat-icon"><BookOpen size={19} /></div><div><strong>{completedCount}<span>/{totalLessons}</span></strong><small>topics explored</small></div></div>
              </section>

              <section className="overview-progress" aria-label="Overall learning progress">
                <div className="progress-text"><strong>Your learning path</strong><span>{completion}% complete</span></div>
                <div className="progress-track"><span style={{ width: `${completion}%` }} /></div>
              </section>

              <div className="section-heading objective-heading">
                <div><span className="section-kicker">THE SYLLABUS</span><h2>Six areas. One confident workflow.</h2></div>
                <span className="section-meta">{filteredObjectives.length} objectives <ArrowDownRightIcon /></span>
              </div>

              <div className="overview-grid">
                <section className="objective-grid" aria-label="Learning objectives">
                  {filteredObjectives.map((objective, index) => {
                    const Icon = objectiveIcons[objective.id] ?? FileText
                    const completed = objective.lessons.filter((lesson) => progress.completedLessonIds.includes(lesson.id)).length
                    const percentage = Math.round((completed / objective.lessons.length) * 100)
                    return (
                      <article className={`objective-card objective-${objective.tone}`} key={objective.id} style={{ animationDelay: `${index * 45}ms` }}>
                        <div className="objective-card-top"><span className="objective-icon"><Icon size={18} strokeWidth={1.9} /></span><span className="objective-number">0{index + 1}</span></div>
                        <h3>{objective.title}</h3>
                        <p>{objective.description}</p>
                        <div className="objective-card-bottom"><span>{objective.lessons.length} topics <span className="meta-divider">·</span> {completed} done</span><span className="mini-progress"><span style={{ width: `${percentage}%` }} /></span></div>
                        <button className="card-link" onClick={() => openObjective(objective.id)}>Open objective <ArrowRight size={15} /></button>
                      </article>
                    )
                  })}
                  {filteredObjectives.length === 0 && <div className="empty-state"><Search size={21} /><strong>No matching objectives</strong><span>Try a different search term.</span></div>}
                </section>

                <aside className="overview-rail">
                  <section className="practice-promo">
                    <div className="promo-top"><span className="promo-icon"><Lightbulb size={18} /></span><span className="promo-label">QUICK PRACTICE</span></div>
                    <h3>Put the concepts to work.</h3>
                    <p>Try original scenario questions with explanations, built for learning rather than memorizing.</p>
                    <div className="promo-meta"><span><CircleHelpIcon /> {practiceQuestions.length} questions</span><span><Clock3 size={14} /> No timer</span></div>
                    <button className="promo-button" onClick={() => navigate('practice')}>Start a practice set <ArrowRight size={16} /></button>
                  </section>
                  <section className="flashcard-promo">
                    <div className="flashcard-graphic"><span className="flashcard-back" /><span className="flashcard-front"><Sparkles size={20} /></span></div>
                    <div className="flashcard-promo-copy"><span className="section-kicker">A LITTLE RECALL</span><strong>Make the key ideas stick.</strong><span>{flashcards.length} cards to review</span></div>
                    <button className="round-arrow" aria-label="Open flashcards" onClick={() => navigate('flashcards')}><ArrowUpRight size={18} /></button>
                  </section>
                  <div className="source-note"><ShieldCheck size={16} /><p>Original learning material, grounded in <a href="https://docs.github.com/en/copilot" target="_blank" rel="noreferrer">public documentation</a>.</p></div>
                </aside>
              </div>
            </>
          )}

          {page === 'study' && (
            <>
              <section className="page-intro">
                <div className="eyebrow"><span className="eyebrow-dot" /> STUDY GUIDE</div>
                <h1>Explore the concepts.</h1>
                <p>Short, practical notes organized around the six published exam objective areas.</p>
              </section>
              <div className="study-layout">
                <nav className="objective-selector" aria-label="Choose an objective">
                  {objectives.map((objective, index) => {
                    const Icon = objectiveIcons[objective.id] ?? FileText
                    const done = objective.lessons.filter((lesson) => progress.completedLessonIds.includes(lesson.id)).length
                    return <button key={objective.id} className={`selector-item ${activeObjectiveId === objective.id ? 'selector-active' : ''}`} onClick={() => setActiveObjectiveId(objective.id)}><span className="selector-index">0{index + 1}</span><Icon size={17} /><span className="selector-title">{objective.title}</span><span className="selector-count">{done}/{objective.lessons.length}</span></button>
                  })}
                </nav>
                <section className="lesson-panel">
                  <div className={`lesson-heading lesson-heading-${activeObjective.tone}`}>
                    <span className="section-kicker">OBJECTIVE {String(objectives.findIndex((item) => item.id === activeObjective.id) + 1).padStart(2, '0')}</span>
                    <h2>{activeObjective.title}</h2>
                    <p>{activeObjective.description}</p>
                    <a href="https://docs.github.com/en/copilot" target="_blank" rel="noreferrer">Explore official documentation <ExternalLink size={14} /></a>
                  </div>
                  <div className="lesson-list-header"><strong>Topics</strong><span>{visibleLessons.length} of {activeObjective.lessons.length}</span></div>
                  <div className="lesson-list">
                    {visibleLessons.map((lesson, index) => {
                      const isComplete = progress.completedLessonIds.includes(lesson.id)
                      const isExpanded = expandedLessonId === lesson.id
                      return <article className={`lesson-row ${isComplete ? 'lesson-complete' : ''} ${isExpanded ? 'lesson-expanded' : ''}`} key={lesson.id}>
                        <button className="lesson-check" aria-label={`${isComplete ? 'Mark incomplete' : 'Mark complete'}: ${lesson.title}`} onClick={() => toggleLesson(lesson.id)}>{isComplete ? <Check size={15} /> : <span>{String(index + 1).padStart(2, '0')}</span>}</button>
                        <div className="lesson-copy"><div className="lesson-title-line"><h3>{lesson.title}</h3><span className="lesson-duration"><Clock3 size={13} /> {lesson.minutes} min</span></div><p>{lesson.summary}</p>
                          {isExpanded && <div className="lesson-details"><p>{lesson.detail}</p><div className="lesson-example"><span>IN PRACTICE</span><code>{lesson.example}</code></div></div>}
                        </div>
                        <button className="lesson-detail-toggle" aria-label={`${isExpanded ? 'Hide' : 'Show'} details: ${lesson.title}`} aria-expanded={isExpanded} onClick={() => setExpandedLessonId(isExpanded ? null : lesson.id)}><ChevronRight size={17} /></button>
                      </article>
                    })}
                    {visibleLessons.length === 0 && <div className="empty-state"><Search size={21} /><strong>No matching topics</strong><span>Try another search or objective.</span></div>}
                  </div>
                </section>
              </div>
            </>
          )}

          {page === 'practice' && (
            <>
              <section className="page-intro">
                <div className="eyebrow"><span className="eyebrow-dot" /> PRACTICE SET</div>
                <h1>Reason through a scenario.</h1>
                <p>Original practice questions based on public concepts. These are not official exam questions.</p>
              </section>
              <section className="quiz-layout">
                <div className="quiz-card">
                  <div className="quiz-card-top"><span>QUESTION {String((questionIndex % practiceQuestions.length) + 1).padStart(2, '0')} <span className="quiz-of">/ {String(practiceQuestions.length).padStart(2, '0')}</span></span><span className="question-type">SINGLE ANSWER</span></div>
                  <h2>{currentQuestion.prompt}</h2>
                  <div className="answer-list">
                    {currentQuestion.choices.map((choice, index) => {
                      const letter = String.fromCharCode(65 + index)
                      const isCorrect = answerSubmitted && choice === currentQuestion.answer
                      const isWrong = answerSubmitted && selectedAnswer === choice && choice !== currentQuestion.answer
                      return <button key={choice} className={`answer-option ${selectedAnswer === choice ? 'answer-selected' : ''} ${isCorrect ? 'answer-correct' : ''} ${isWrong ? 'answer-wrong' : ''}`} onClick={() => !answerSubmitted && setSelectedAnswer(choice)} aria-pressed={selectedAnswer === choice}>
                        <span className="answer-letter">{isCorrect ? <Check size={15} /> : letter}</span><span>{choice}</span>
                      </button>
                    })}
                  </div>
                  {answerSubmitted && <div className={`answer-explanation ${selectedAnswer === currentQuestion.answer ? 'explanation-correct' : 'explanation-wrong'}`}><strong>{selectedAnswer === currentQuestion.answer ? 'That’s it.' : 'Not quite.'}</strong><p>{currentQuestion.explanation}</p></div>}
                  <div className="quiz-footer"><span><Sparkles size={15} /> Learn the reasoning, not the answer pattern.</span>{answerSubmitted ? <button className="primary-button" onClick={nextQuestion}>Next question <ArrowRight size={16} /></button> : <button className="primary-button" onClick={submitAnswer} disabled={!selectedAnswer}>Check answer <ArrowRight size={16} /></button>}</div>
                </div>
                <aside className="quiz-aside"><span className="aside-icon"><Target size={20} /></span><span className="section-kicker">YOUR PRACTICE</span><strong>{progress.quizAttempts === 0 ? 'A fresh start.' : `${progress.quizCorrect} correct so far.`}</strong><p>{progress.quizAttempts === 0 ? 'Take a question at a time. Every answer includes context to help the idea land.' : `${progress.quizAttempts} question${progress.quizAttempts === 1 ? '' : 's'} answered across this session.`}</p><div className="aside-stat"><span>Accuracy</span><strong>{progress.quizAttempts ? Math.round((progress.quizCorrect / progress.quizAttempts) * 100) : 0}%</strong></div><div className="accuracy-track"><span style={{ width: `${progress.quizAttempts ? (progress.quizCorrect / progress.quizAttempts) * 100 : 0}%` }} /></div></aside>
              </section>
            </>
          )}

          {page === 'flashcards' && (
            <>
              <section className="page-intro">
                <div className="eyebrow"><span className="eyebrow-dot" /> FLASHCARDS</div>
                <h1>Recall the essentials.</h1>
                <p>Review a concept, turn the card, and decide when it feels familiar.</p>
              </section>
              <section className="flashcard-workspace">
                <div className="flashcard-column">
                  <div className="flashcard-toolbar"><span>Card {String(flashcardIndex + 1).padStart(2, '0')} <span>of {String(flashcards.length).padStart(2, '0')}</span></span><span>{progress.seenFlashcardIds.length} reviewed</span></div>
                  <button className={`study-flashcard ${flashcardFlipped ? 'study-flashcard-flipped' : ''}`} onClick={() => setFlashcardFlipped((flipped) => !flipped)} aria-expanded={flashcardFlipped}>
                    <span className="flashcard-topline"><span>{flashcardFlipped ? 'THE SHORT ANSWER' : currentFlashcard.category}</span><RotateCcw size={16} /></span>
                    <strong>{flashcardFlipped ? currentFlashcard.answer : currentFlashcard.question}</strong>
                    <span className="flashcard-hint">{flashcardFlipped ? 'Tap to see the prompt' : 'Tap to reveal'}</span>
                  </button>
                  <div className="flashcard-actions"><button className="secondary-button" onClick={() => { setFlashcardIndex((index) => (index - 1 + flashcards.length) % flashcards.length); setFlashcardFlipped(false) }}>Previous</button><button className="primary-button" onClick={markFlashcardSeen}>Got it <Check size={16} /></button></div>
                </div>
                <aside className="flashcard-side-note"><span className="aside-icon aside-icon-coral"><Layers3 size={20} /></span><span className="section-kicker">QUICK REVIEW</span><strong>Small recall, lasting fluency.</strong><p>Cards cover terminology and distinctions that are useful across the Copilot workflow.</p><div className="card-progress-list">{flashcards.map((card, index) => <button key={card.id} className={`card-progress-item ${index === flashcardIndex ? 'card-progress-current' : ''}`} onClick={() => { setFlashcardIndex(index); setFlashcardFlipped(false) }}><span>{progress.seenFlashcardIds.includes(card.id) ? <CheckCircle2 size={15} /> : String(index + 1).padStart(2, '0')}</span><span>{card.category}</span><ChevronRight size={15} /></button>)}</div></aside>
              </section>
            </>
          )}

          {page === 'progress' && (
            <>
              <section className="page-intro">
                <div className="eyebrow"><span className="eyebrow-dot" /> YOUR LEARNING</div>
                <h1>Progress, at your pace.</h1>
                <p>Your learning state stays in this browser. No account or sync required.</p>
              </section>
              <section className="progress-summary-grid">
                <article className="summary-stat summary-stat-highlight"><span className="summary-stat-label">TOPICS COMPLETED</span><strong>{completedCount}<span> / {totalLessons}</span></strong><div className="summary-stat-foot"><span className="stat-bullet" /> {completion}% of the guide</div></article>
                <article className="summary-stat"><span className="summary-stat-label">PRACTICE ANSWERS</span><strong>{progress.quizAttempts}</strong><div className="summary-stat-foot">{progress.quizCorrect} answered correctly</div></article>
                <article className="summary-stat"><span className="summary-stat-label">CARDS REVIEWED</span><strong>{progress.seenFlashcardIds.length}<span> / {flashcards.length}</span></strong><div className="summary-stat-foot">Recall at your own pace</div></article>
              </section>
              <section className="progress-detail">
                <div className="progress-detail-heading"><div><span className="section-kicker">OBJECTIVE BREAKDOWN</span><h2>Topics explored</h2></div><span>{completedCount} completed</span></div>
                <div className="objective-progress-list">{objectives.map((objective, index) => {
                  const Icon = objectiveIcons[objective.id] ?? FileText
                  const done = objective.lessons.filter((lesson) => progress.completedLessonIds.includes(lesson.id)).length
                  const percent = Math.round((done / objective.lessons.length) * 100)
                  return <button className="objective-progress-row" key={objective.id} onClick={() => openObjective(objective.id)}><span className={`progress-row-icon tone-${objective.tone}`}><Icon size={17} /></span><span className="progress-row-title"><strong>{String(index + 1).padStart(2, '0')} &nbsp;{objective.title}</strong><span className="row-track"><span style={{ width: `${percent}%` }} /></span></span><span className="progress-row-count">{done} / {objective.lessons.length}</span><ChevronRight size={16} /></button>
                })}</div>
                <div className="progress-detail-footer"><span>Progress is saved on this device.</span><button className="reset-button" onClick={() => { if (window.confirm('Clear all saved learning progress on this device?')) resetProgress() }}>Reset progress</button></div>
              </section>
            </>
          )}
        </main>
        <footer className="page-footer"><span>Copilot Academy <span className="footer-dot">·</span> Community-built learning resource</span><a href="https://docs.github.com/en/copilot" target="_blank" rel="noreferrer">Source material <ExternalLink size={13} /></a></footer>
      </div>
    </div>
  )
}

function ArrowDownRightIcon() {
  return <ArrowRight size={15} className="meta-arrow" />
}

function CircleHelpIcon() {
  return <span className="circle-help">?</span>
}

export default App
