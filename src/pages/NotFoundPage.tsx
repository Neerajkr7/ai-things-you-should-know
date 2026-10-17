import { Link } from 'react-router-dom'
import { Home } from 'lucide-react'
import './NotFoundPage.css'

function NotFoundPage() {
  return (
    <div className="not-found">
      <div className="not-found-content">
        <h1 className="not-found-title">Page not found</h1>
        <p className="not-found-text">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link to="/" className="not-found-link">
          <Home size={16} />
          Back to AI Learn
        </Link>
      </div>
    </div>
  )
}

export default NotFoundPage
