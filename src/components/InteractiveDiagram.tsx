import { useState } from 'react'
import './InteractiveDiagram.css'

interface DiagramNode {
  id: string
  label: string
  sublabel: string
  description: string
  y: number
  icon: 'app' | 'agent' | 'model'
}

interface DiagramConfig {
  title: string
  instruction: string
  nodes: DiagramNode[]
}

const diagramConfigs: Record<number, DiagramConfig> = {
  1: {
    title: 'Three Layers to Understand',
    instruction: 'Tap each component to see what it does and what it cannot do.',
    nodes: [
      {
        id: 'application',
        label: 'Application',
        sublabel: 'Chat UI, website, or app',
        description:
          'The product you interact with. It provides the interface—buttons, text fields, visual output—but contains no intelligence of its own. It sends your request down and displays whatever comes back up.',
        y: 0,
        icon: 'app',
      },
      {
        id: 'agent',
        label: 'Agent / Harness',
        sublabel: 'Uses tools, executes actions, manages context',
        description:
          'Software between you and the model. It decides which tools to offer, runs tool calls the model requests, manages conversation history, and controls what the model sees. The model decides; the agent does.',
        y: 1,
        icon: 'agent',
      },
      {
        id: 'model',
        label: 'AI Model',
        sublabel: 'Provides intelligence (text in, text out)',
        description:
          'A neural network that predicts the next token. It cannot open a browser, read a file, or touch anything outside its input. It only produces text. Everything useful happens because the agent and application act on that text.',
        y: 2,
        icon: 'model',
      },
    ],
  },
  34: {
    title: 'Model vs Agent',
    instruction: 'Tap each layer to understand the difference between a model and an agent.',
    nodes: [
      {
        id: 'you',
        label: 'You',
        sublabel: 'The user giving instructions',
        description:
          'You never interact with the model directly. Everything you type goes through agent software that wraps your input, manages context, and runs tools on your behalf.',
        y: 0,
        icon: 'app',
      },
      {
        id: 'agent-sw',
        label: 'Agent Software',
        sublabel: 'Wraps, routes, executes',
        description:
          'The software can write files, run searches, send requests, and manage memory. It offers tools to the model and executes whatever the model requests. The model decides; the software does.',
        y: 1,
        icon: 'agent',
      },
      {
        id: 'model-layer',
        label: 'AI Model',
        sublabel: 'Produces tokens, nothing more',
        description:
          'A model has no brain, memory, or database. It produces tokens. It can decide but never do: it cannot write a file, run a search, or send a request. You have never used a model on its own.',
        y: 2,
        icon: 'model',
      },
    ],
  },
  35: {
    title: 'How an AI Agent Works',
    instruction: 'Tap each part to see its role in the agent system.',
    nodes: [
      {
        id: 'your-prompt',
        label: 'Your Prompt',
        sublabel: 'Task and material you provide',
        description:
          'You send your request. The agent software adds a system prompt, tool descriptions, and conversation history around it before sending everything to the model.',
        y: 0,
        icon: 'app',
      },
      {
        id: 'agent-middle',
        label: 'Agent Software',
        sublabel: 'Offers tools, runs chosen ones, holds context',
        description:
          'The agent sends your prompt plus a tool menu. The model replies with a tool call as text, and the agent actually runs it. It offers tools, runs the chosen one, and holds the room (files, results, history).',
        y: 1,
        icon: 'agent',
      },
      {
        id: 'model-bottom',
        label: 'Language Model',
        sublabel: 'Replies with text including tool calls',
        description:
          'The model receives everything as text and replies with text—including tool call requests formatted as text. It never executes anything. The deciding is the model\'s; the doing is the software\'s.',
        y: 2,
        icon: 'model',
      },
    ],
  },
  37: {
    title: 'The Agent Loop',
    instruction: 'Tap each step to understand the cycle.',
    nodes: [
      {
        id: 'wrap-input',
        label: '1. Wrap Input',
        sublabel: 'System prompt + tools + your message',
        description:
          'Software wraps your input with a system prompt and tool descriptions, then sends everything to the model as one request.',
        y: 0,
        icon: 'app',
      },
      {
        id: 'model-responds',
        label: '2. Model Responds',
        sublabel: 'Emits text or a tool call',
        description:
          'The model emits either a final answer or a tool call. If it\'s a tool call, the software executes it and sends the result back with the whole transcript resent.',
        y: 1,
        icon: 'model',
      },
      {
        id: 'loop-back',
        label: '3. Execute & Loop',
        sublabel: 'Run tool, send result, repeat',
        description:
          'The software executes the tool and sends the result back. The loop continues until the model produces a final answer with no tool call, then shows you the result.',
        y: 2,
        icon: 'agent',
      },
    ],
  },
}

function IconApp() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <rect x="4" y="4" width="20" height="20" rx="4" stroke="currentColor" strokeWidth="1.5" />
      <rect x="8" y="8" width="12" height="3" rx="1" fill="currentColor" opacity="0.4" />
      <rect x="8" y="14" width="8" height="2" rx="1" fill="currentColor" opacity="0.3" />
      <rect x="8" y="19" width="5" height="2" rx="1" fill="currentColor" opacity="0.3" />
    </svg>
  )
}

function IconAgent() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <circle cx="14" cy="10" r="5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M6 23c0-4.418 3.582-8 8-8s8 3.582 8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="21" cy="8" r="3" fill="currentColor" opacity="0.3" />
    </svg>
  )
}

function IconModel() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <circle cx="14" cy="14" r="9" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="14" cy="14" r="4" stroke="currentColor" strokeWidth="1.5" />
      <line x1="14" y1="5" x2="14" y2="10" stroke="currentColor" strokeWidth="1.5" />
      <line x1="14" y1="18" x2="14" y2="23" stroke="currentColor" strokeWidth="1.5" />
      <line x1="5" y1="14" x2="10" y2="14" stroke="currentColor" strokeWidth="1.5" />
      <line x1="18" y1="14" x2="23" y2="14" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}

const iconMap = { app: IconApp, agent: IconAgent, model: IconModel }

interface InteractiveDiagramProps {
  conceptId: number
}

function InteractiveDiagram({ conceptId }: InteractiveDiagramProps) {
  const config = diagramConfigs[conceptId]
  const [selectedId, setSelectedId] = useState<string | null>(null)

  if (!config) return null

  const selectedNode = config.nodes.find((n) => n.id === selectedId)

  return (
    <div className="diagram" role="figure" aria-label={config.title}>
      <h3 className="diagram-title">{config.title}</h3>
      <p className="diagram-instruction">{config.instruction}</p>

      <div className="diagram-stack">
        {config.nodes.map((node, i) => {
          const Icon = iconMap[node.icon]
          const isSelected = selectedId === node.id
          return (
            <div key={node.id}>
              <button
                className={`diagram-node ${isSelected ? 'diagram-node--selected' : ''}`}
                onClick={() => setSelectedId(isSelected ? null : node.id)}
                aria-expanded={isSelected}
                aria-label={`${node.label}: ${node.sublabel}`}
                type="button"
              >
                <div className="diagram-node-icon">
                  <Icon />
                </div>
                <div className="diagram-node-text">
                  <span className="diagram-node-label">{node.label}</span>
                  <span className="diagram-node-sublabel">{node.sublabel}</span>
                </div>
              </button>
              {i < config.nodes.length - 1 && (
                <div className="diagram-connector" aria-hidden="true">
                  <svg width="2" height="24" viewBox="0 0 2 24">
                    <line x1="1" y1="0" x2="1" y2="24" stroke="var(--color-border)" strokeWidth="2" strokeDasharray="4 4" />
                  </svg>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {selectedNode && (
        <div className="diagram-detail" role="status" aria-live="polite">
          <p className="diagram-detail-text">{selectedNode.description}</p>
        </div>
      )}
    </div>
  )
}

export default InteractiveDiagram
