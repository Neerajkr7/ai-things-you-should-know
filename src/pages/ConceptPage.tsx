import { useParams, Link, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { ArrowLeft, ChevronLeft, ChevronRight, BookOpen } from 'lucide-react'
import { getConceptBySlug, getAdjacentConcepts, concepts } from '../data/concepts'
import KeyTakeaway from '../components/KeyTakeaway'
import InteractiveDiagram from '../components/InteractiveDiagram'
import KnowledgeCheck from '../components/KnowledgeCheck'
import { getQuizForConcept } from '../data/quizzes'
import './ConceptPage.css'

function ConceptPage() {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const concept = slug ? getConceptBySlug(slug) : undefined
  const adjacent = concept ? getAdjacentConcepts(concept.id) : { prev: undefined, next: undefined }
  const quiz = concept ? getQuizForConcept(concept.id) : undefined

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [slug])

  if (!concept) {
    return (
      <div className="concept-page">
        <header className="concept-header">
          <div className="concept-header-inner">
            <Link to="/" className="back-button" aria-label="Back to home">
              <ArrowLeft size={20} />
            </Link>
            <span className="concept-header-logo">
              <BookOpen size={18} />
              AI Learn
            </span>
          </div>
        </header>
        <main className="concept-main">
          <div className="concept-not-found">
            <h1>Concept not found</h1>
            <p>The concept you're looking for doesn't exist.</p>
            <Link to="/" className="concept-not-found-link">Browse all concepts</Link>
          </div>
        </main>
      </div>
    )
  }

  // Split description into sentences for better readability
  const sentences = concept.description.split(/(?<=[.!?])\s+/)
  const firstSentence = sentences[0]
  const restOfDescription = sentences.slice(1).join(' ')

  // Determine if this concept should show an interactive diagram
  const showDiagram = concept.id === 1 || concept.id === 34 || concept.id === 35 || concept.id === 37

  return (
    <div className="concept-page">
      <header className="concept-header">
        <div className="concept-header-inner">
          <button
            onClick={() => navigate(-1)}
            className="back-button"
            aria-label="Go back"
            type="button"
          >
            <ArrowLeft size={20} />
          </button>

          <div className="concept-progress">
            <div className="concept-progress-bar">
              <div
                className="concept-progress-fill"
                style={{ width: `${(concept.id / concepts.length) * 100}%` }}
              />
            </div>
            <span className="concept-progress-text">
              {concept.id} / {concepts.length}
            </span>
          </div>
        </div>
      </header>

      <main className="concept-main">
        <article className="concept-article">
          <div className="concept-meta">
            <span className="concept-category">{concept.category}</span>
          </div>

          <h1 className="concept-title">{concept.title}</h1>

          <div className="concept-definition">
            <p className="concept-definition-text">{firstSentence}</p>
          </div>

          {restOfDescription && (
            <section className="concept-section" aria-label="Explanation">
              <p className="concept-body">{restOfDescription}</p>
            </section>
          )}

          {showDiagram && (
            <section className="concept-section" aria-label="Interactive diagram">
              <InteractiveDiagram conceptId={concept.id} />
            </section>
          )}

          <KeyTakeaway text={concept.remember} />

          {quiz && (
            <section className="concept-section" aria-label="Knowledge check">
              <KnowledgeCheck quiz={quiz} />
            </section>
          )}
        </article>

        <nav className="concept-nav" aria-label="Concept navigation">
          {adjacent.prev ? (
            <Link
              to={`/concept/${adjacent.prev.slug}`}
              className="concept-nav-link concept-nav-prev"
            >
              <ChevronLeft size={18} />
              <div className="concept-nav-content">
                <span className="concept-nav-label">Previous</span>
                <span className="concept-nav-title">{adjacent.prev.title}</span>
              </div>
            </Link>
          ) : (
            <div />
          )}
          {adjacent.next ? (
            <Link
              to={`/concept/${adjacent.next.slug}`}
              className="concept-nav-link concept-nav-next"
            >
              <div className="concept-nav-content">
                <span className="concept-nav-label">Next</span>
                <span className="concept-nav-title">{adjacent.next.title}</span>
              </div>
              <ChevronRight size={18} />
            </Link>
          ) : (
            <Link to="/" className="concept-nav-link concept-nav-next">
              <div className="concept-nav-content">
                <span className="concept-nav-label">Done</span>
                <span className="concept-nav-title">Back to all concepts</span>
              </div>
              <ChevronRight size={18} />
            </Link>
          )}
        </nav>
      </main>
    </div>
  )
}

export default ConceptPage
