import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Search, X, ChevronRight, BookOpen, Clock } from 'lucide-react'
import { concepts, categories, searchConcepts, getConceptsByCategory } from '../data/concepts'
import './HomePage.css'

function HomePage() {
  const [query, setQuery] = useState('')

  const filteredConcepts = useMemo(() => searchConcepts(query), [query])
  const isSearching = query.trim().length > 0

  const groupedConcepts = useMemo(() => {
    if (isSearching) return null
    return categories.map((cat) => ({
      ...cat,
      concepts: getConceptsByCategory(cat.name),
    }))
  }, [isSearching])

  return (
    <div className="home">
      <header className="home-header">
        <div className="home-header-inner">
          <h1 className="home-logo">
            <BookOpen size={22} strokeWidth={2.2} />
            <span>AI <span className="home-logo-accent">Learn</span></span>
          </h1>
        </div>
      </header>

      <main className="home-main">
        <section className="home-hero" aria-label="Introduction">
          <h2 className="home-title">Understand AI, step by step.</h2>
          <p className="home-subtitle">
            Short, simple and interactive lessons to build a clear mental model of how AI works.
          </p>
        </section>

        <div className="search-wrapper" role="search">
          <Search className="search-icon" size={18} aria-hidden="true" />
          <input
            id="concept-search"
            type="search"
            className="search-input"
            placeholder="Search any concept or word…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search concepts"
          />
          {query && (
            <button
              className="search-clear"
              onClick={() => setQuery('')}
              aria-label="Clear search"
              type="button"
            >
              <X size={16} />
            </button>
          )}
        </div>

        {isSearching && (
          <div className="search-status" aria-live="polite">
            {filteredConcepts.length === 0
              ? 'No concepts match your search.'
              : `${filteredConcepts.length} of ${concepts.length} concepts`}
          </div>
        )}

        {isSearching ? (
          <div className="concept-list">
            {filteredConcepts.length === 0 ? (
              <div className="empty-state">
                <p className="empty-state-text">No concepts found for "{query}"</p>
                <p className="empty-state-hint">Try a different search term</p>
              </div>
            ) : (
              filteredConcepts.map((concept) => (
                <Link
                  to={`/concept/${concept.slug}`}
                  key={concept.id}
                  className="concept-card"
                >
                  <div className="concept-card-number">{String(concept.id).padStart(2, '0')}</div>
                  <div className="concept-card-body">
                    <h3 className="concept-card-title">{concept.title}</h3>
                    <p className="concept-card-desc">{concept.remember}</p>
                  </div>
                  <ChevronRight className="concept-card-arrow" size={18} />
                </Link>
              ))
            )}
          </div>
        ) : (
          groupedConcepts?.map((group) => (
            <section key={group.name} className="category-section">
              <h3 className="category-title">{group.name}</h3>
              <div className="concept-list">
                {group.concepts.map((concept) => (
                  <Link
                    to={`/concept/${concept.slug}`}
                    key={concept.id}
                    className="concept-card"
                  >
                    <div className="concept-card-number">{String(concept.id).padStart(2, '0')}</div>
                    <div className="concept-card-body">
                      <h3 className="concept-card-title">{concept.title}</h3>
                      <p className="concept-card-desc">{concept.remember}</p>
                    </div>
                    <div className="concept-card-meta">
                      <span className="concept-card-time">
                        <Clock size={12} />
                        {concept.readingTime} min
                      </span>
                      <ChevronRight className="concept-card-arrow" size={18} />
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          ))
        )}

        <footer className="home-footer">
          <p>58 concepts from the AI Key Concepts Study Guide</p>
        </footer>
      </main>
    </div>
  )
}

export default HomePage
