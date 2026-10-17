export interface QuizQuestion {
  question: string
  options: string[]
  correctIndex: number
  explanation: string
}

export interface Quiz {
  conceptId: number
  questions: QuizQuestion[]
}

// Quizzes derived from actual concept content. Only for concepts where
// a meaningful question can be reliably constructed from the source material.
const quizzes: Quiz[] = [
  {
    conceptId: 1,
    questions: [
      {
        question: 'Can a language model independently open a website and read its contents without any tools or external access?',
        options: [
          'Yes, it can.',
          'No, it can generate text, but cannot browse without a tool.',
          'It can, but only for specific websites.',
          'It can never work with websites.',
        ],
        correctIndex: 1,
        explanation: 'A language model can generate text, but it cannot browse websites without an available tool or execution environment. Intelligence alone cannot open a browser or touch a file.',
      },
    ],
  },
  {
    conceptId: 2,
    questions: [
      {
        question: 'What is the key difference between traditional programming and machine learning?',
        options: [
          'ML uses more lines of code.',
          'ML learns patterns from data instead of following hand-written rules.',
          'Traditional programming cannot handle numbers.',
          'ML only works for games.',
        ],
        correctIndex: 1,
        explanation: 'Machine learning shows examples and lets the system find patterns, rather than people writing every rule by hand. It is trained, not programmed.',
      },
    ],
  },
  {
    conceptId: 4,
    questions: [
      {
        question: 'What is the fundamental output of a large language model?',
        options: [
          'Images and audio.',
          'Compiled code that runs directly.',
          'Text — every output, including decisions, is just more text.',
          'Binary data packets.',
        ],
        correctIndex: 2,
        explanation: 'Every output of an LLM, even a decision, is just more text. It works through problems as text, so one model can translate, write code, classify mail, and more.',
      },
    ],
  },
  {
    conceptId: 11,
    questions: [
      {
        question: 'What are tokens in the context of language models?',
        options: [
          'Authentication credentials for API access.',
          'Pieces of text (whole words or fragments) mapped to numbers — the only thing the model sees.',
          'Visual elements displayed on screen.',
          'Database records storing conversations.',
        ],
        correctIndex: 1,
        explanation: 'Tokens are pieces of text — whole words or fragments — each mapped to a number. This is all the model ever sees. They are also the unit of billing.',
      },
    ],
  },
  {
    conceptId: 13,
    questions: [
      {
        question: 'Why does a model resend the entire conversation on each follow-up request?',
        options: [
          'To improve response speed.',
          'Because the model has no memory — it processes each request independently.',
          'To verify user authentication.',
          'Because the server loses data between requests.',
        ],
        correctIndex: 1,
        explanation: 'The model has no memory. Each follow-up resends the whole conversation, plus hidden parts like the system instruction. The context window is the limit on how much can be sent.',
      },
    ],
  },
  {
    conceptId: 15,
    questions: [
      {
        question: 'What does the temperature setting control in a language model?',
        options: [
          'The physical heat of the server running the model.',
          'How likely the model is to pick less-probable tokens — low is predictable, high is creative.',
          'The speed of text generation.',
          'The maximum number of tokens in output.',
        ],
        correctIndex: 1,
        explanation: 'Temperature controls how tokens are sampled. Low temperature nearly always takes the top token (predictable), while high temperature picks lower-probability ones more often (creative).',
      },
    ],
  },
  {
    conceptId: 19,
    questions: [
      {
        question: 'What does fine-tuning do to a model?',
        options: [
          'Replaces everything the model knows with new data.',
          'Adds further training on your own examples, outweighing rather than replacing existing knowledge.',
          'Deletes unused parameters to make the model smaller.',
          'Converts the model from text to image generation.',
        ],
        correctIndex: 1,
        explanation: 'Fine-tuning is further training of a finished model on your own examples. It outweighs rather than replaces what the model knows — the knowledge did not change; the habit was added.',
      },
    ],
  },
  {
    conceptId: 27,
    questions: [
      {
        question: 'What does quantization do to model weights?',
        options: [
          'Adds more precision to make the model more accurate.',
          'Doubles the number of parameters.',
          'Truncates weights to fewer digits, reducing memory for a small quality loss.',
          'Encrypts the weights for security.',
        ],
        correctIndex: 2,
        explanation: 'Quantization truncates the long, 16-bit weights to fewer digits. Memory drops a lot for a small quality loss, so big models can fit and run locally.',
      },
    ],
  },
  {
    conceptId: 34,
    questions: [
      {
        question: 'Can a model write a file, run a search, or send a request on its own?',
        options: [
          'Yes, models can perform any action.',
          'Only if the model is large enough.',
          'No — a model produces tokens but cannot act. Software around it does the actions.',
          'Only with special permissions.',
        ],
        correctIndex: 2,
        explanation: 'A model can decide but never do. It cannot write a file, run a search, or send a request. Everything you use sits inside software that does these things. You have never used a model on its own.',
      },
    ],
  },
  {
    conceptId: 39,
    questions: [
      {
        question: 'Why do language models sometimes produce false information (hallucinate)?',
        options: [
          'Because they are intentionally deceptive.',
          'Because they answer "which token is likely next?", not "is this true?"',
          'Because their training data is entirely wrong.',
          'Because they cannot process text at all.',
        ],
        correctIndex: 1,
        explanation: 'The model answers "which token is likely next?", never "is this true?", so it can fluently invent things. Every answer is a claim to check.',
      },
    ],
  },
  {
    conceptId: 41,
    questions: [
      {
        question: 'In Retrieval-Augmented Generation (RAG), where does the model get its facts?',
        options: [
          'From its own long-term memory.',
          'From documents fetched by software and pasted into the prompt.',
          'By browsing the internet in real time.',
          'From a built-in database inside the model.',
        ],
        correctIndex: 1,
        explanation: 'In RAG, software fetches facts from your own documents and pastes them into the prompt. The model itself reaches for nothing — it only sees the pasted sources.',
      },
    ],
  },
  {
    conceptId: 56,
    questions: [
      {
        question: 'What is prompt injection?',
        options: [
          'A technique to make models run faster.',
          'When external text (emails, PDFs, web pages) in the context is read as instructions by the model.',
          'A method to encrypt model inputs.',
          'A way to add more memory to the model.',
        ],
        correctIndex: 1,
        explanation: 'Text from outside (email, PDF, search result, web page) lands in the context and is read as instructions. There is no "just data". Most of what reaches the model is not yours.',
      },
    ],
  },
]

export function getQuizForConcept(conceptId: number): Quiz | undefined {
  return quizzes.find((q) => q.conceptId === conceptId)
}
