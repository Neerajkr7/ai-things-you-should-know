import { Lightbulb } from 'lucide-react'
import './KeyTakeaway.css'

interface KeyTakeawayProps {
  text: string
}

function KeyTakeaway({ text }: KeyTakeawayProps) {
  return (
    <div className="key-takeaway" role="note" aria-label="Key takeaway">
      <div className="key-takeaway-header">
        <Lightbulb size={18} className="key-takeaway-icon" />
        <span className="key-takeaway-label">Remember</span>
      </div>
      <p className="key-takeaway-text">{text}</p>
    </div>
  )
}

export default KeyTakeaway
