import { Concept, Category } from '../types';

export const categories: Category[] = [
  { name: 'Foundations', startId: 1, endId: 9 },
  { name: 'Model internals', startId: 10, endId: 17 },
  { name: 'Training and tuning', startId: 18, endId: 24 },
  { name: 'Running models', startId: 25, endId: 28 },
  { name: 'Working with models', startId: 29, endId: 33 },
  { name: 'Agents', startId: 34, endId: 38 },
  { name: 'Trust, knowledge and memory', startId: 39, endId: 45 },
  { name: 'Extending and controlling agents', startId: 46, endId: 51 },
  { name: 'Practice and risk', startId: 52, endId: 58 },
];

function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function estimateReadingTime(text: string): number {
  const words = text.split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

function getCategoryForId(id: number): { name: string; index: number } {
  for (let i = 0; i < categories.length; i++) {
    const cat = categories[i];
    if (id >= cat.startId && id <= cat.endId) {
      return { name: cat.name, index: i };
    }
  }
  return { name: 'Unknown', index: -1 };
}

// Raw concept data extracted directly from the source HTML.
// Each entry: [number, title, page, description, remember]
const rawConcepts: [number, string, number, string, string][] = [
  [
    1,
    'Artificial Intelligence (AI)',
    5,
    'A broad umbrella: narrow jobs (recommendations, fraud flags, reading postcodes) up to general ones. Today it nearly always means large language models. A model is not a product: the model supplies the intelligence (text in, text out), the agent or harness around it lets it act, and the app is the top layer.',
    'Intelligence alone cannot open a browser or touch a file.',
  ],
  [
    2,
    'Machine Learning (ML)',
    14,
    'A model that learns rules and patterns from data instead of people writing every rule by hand. The old way anticipates every case; ML shows examples and lets the system find patterns, so it can evolve. A game enemy with if/then rules is not ML, and a real model would be too costly for a game.',
    'Trained, not programmed.',
  ],
  [
    3,
    'Neural Networks and Deep Learning',
    23,
    'A model made of stacked layers full of adjustable numbers (parameters). Data funnels through the layers and something new comes out. Training runs known inputs with known outputs and tweaks the numbers until they agree; in production only the input is known.',
    'Brain metaphor aside, it is boxes, wires and numbers.',
  ],
  [
    4,
    'Large Language Models (LLMs)',
    32,
    'A neural network trained on huge amounts of text, cut into tokens. It captures a way of working through problems as text, so one model translates, writes code, classifies mail, summarises, and even chooses which tool to use next. Splitting numbers into repeating pieces helps it learn them.',
    'Every output, even a decision, is just more text.',
  ],
  [
    5,
    'Small Language Models (SLMs)',
    43,
    'Same design with far fewer parameters, so it fits on hardware you own, keeps data local and bills nothing per request. The price is less capacity for nuance and general knowledge, so it is usually fine-tuned for one job: summarising, sorting, coding in one codebase.',
    'Large is a measurement, not a verdict.',
  ],
  [
    6,
    'Vision-Language Models (VLMs)',
    54,
    'Take images or video plus your words and answer in language. Old vision models returned a fixed output, such as face boxes, one job each. A VLM handles any question: visual Q&A, documents, charts, interfaces, image description.',
    'The question is no longer built into the model.',
  ],
  [
    7,
    'Multimodality',
    63,
    'Models or assistants that understand and generate more than text: images, audio, video. Some assistants only read images; others also produce them. An assistant is often several models wired together in software.',
    'It is about the combination, not one model.',
  ],
  [
    8,
    'Frontier Models',
    71,
    'The leading edge of general-purpose models right now. The label needs both benchmark leadership and people preferring it in daily use. Nobody publishes the list; membership changes silently as new releases arrive (OpenAI, Anthropic, and a few others).',
    'Agreed on, not awarded.',
  ],
  [
    9,
    'Artificial General Intelligence (AGI)',
    77,
    'Broadly capable AI at a person\'s level across tasks, versus today\'s one-lane systems. The term is slippery: models are already faster and broader on screen work, but being better than a person at all of it, unsupervised, as you want it, is still open.',
    'Better in many regards is not necessarily in all.',
  ],
  [
    10,
    'Parameters and Weights',
    85,
    'Parameters are the numbers a model learns during training; weights are the most prominent kind, and the two words are used loosely as synonyms. An LLM is a neural network, so these numbers are what it is made of. Training closes the gap between the model\'s output and the known right output. More parameters generally means more nuance.',
    'Layers decide how data travels and what comes out.',
  ],
  [
    11,
    'Tokens',
    93,
    'Pieces of text (whole words or fragments), each mapped to a number, which is all the model ever sees. Each model\'s tokenizer splits differently. Tokens are the unit of input, output and billing, with two meters: input tokens and output tokens, each at its own rate.',
    'A subscription hides the meter; it does not remove it.',
  ],
  [
    12,
    'Tokenizers and Tokenization',
    104,
    'The tool that converts raw text to tokens and then token IDs. It is built by the lab alongside its model and only means something to that model. Better splits catch finer relations between words and their parts.',
    'No tokenizer, no language model.',
  ],
  [
    13,
    'The Context Window',
    108,
    'The most tokens a model accepts in one request. The model has no memory, so each follow-up resends the whole conversation, plus hidden parts like the provider\'s system instruction. There is a ceiling because quality also drops with more text.',
    'It means the tokens you send and the limit on them.',
  ],
  [
    14,
    'Context',
    120,
    'Everything in one request: system instructions, developer instructions, conversation so far, your message, attached files, retrieved documents, saved memory, and tool definitions. An attachment is just text in the stream; agents can fill context themselves.',
    'The window is the room; context is what you carry in.',
  ],
  [
    15,
    'Temperature and Sampling',
    127,
    'The model produces probabilities for the next token and one is chosen (sampling), so identical input can give different output. Temperature sets how: low nearly always takes the top token, high picks lower-probability ones more often. Chat apps hide it; your own apps and the API expose it.',
    'Creative at one end, predictable at the other.',
  ],
  [
    16,
    'Mixture of Experts (MoE)',
    137,
    'A large model where only a subset of layers and parameters activates for a given input, so inference is quicker. It does not shrink memory needs: every parameter must still be loaded.',
    'All of it loaded, only part of it running.',
  ],
  [
    17,
    'Training vs Inference',
    145,
    'Training happens once and builds the network; inference is the finished model serving requests, repeatedly, on servers. Serving needs the whole model in memory, which is why a small model suits a local machine.',
    'Nothing answers until the whole model sits in memory.',
  ],
  [
    18,
    'Pre-training vs Post-training',
    154,
    'Pre-training learns to predict text from essentially all legally available internet text, giving a raw model that only continues text. Post-training adds behaviour, specialisation, reasoning and safety, using artificially generated data to fine-tune (answering, friendliness, refusals).',
    'Raw pre-training is not a good assistant.',
  ],
  [
    19,
    'Fine-tuning',
    165,
    'Further training of a finished model on your own examples, outweighing rather than replacing what it knows. It can teach a style, a behaviour, or knowledge it never had. You need hardware, a model whose weights are published, and one specific job. Every lab does it before release.',
    'The knowledge did not change; the habit was added.',
  ],
  [
    20,
    'LoRA and Parameter-Efficient Fine-tuning',
    173,
    'Full fine-tuning rebuilds every parameter. PEFT (method: LoRA, low-rank adaptation) attaches small extra layers and leaves the original weights untouched, so it is faster and cheaper but still specific. One base model can carry a small attachment per job.',
    'Small enough to be cheap, placed to still change output.',
  ],
  [
    21,
    'Synthetic Data',
    183,
    'Training data written by a model and checked by people. Useful because public data is largely spent and your private material is unseen, or when you have no examples, such as a library newer than the model (use docs plus a model to generate usage examples) or worked reasoning.',
    'Written by a model, checked by people.',
  ],
  [
    22,
    'Reinforcement Learning from Human Feedback (RLHF)',
    194,
    'A special form of fine-tuning where the model works through problems and a human grades each result with a score, not an answer key. The grade nudges the weights. It lets you train on work you could never have written as a fixed answer.',
    'A verdict, not an answer key.',
  ],
  [
    23,
    'Distillation',
    205,
    'Use an existing teacher model\'s outputs as training material for a student model, a shortcut past collecting and generating data. Labs complain when rivals do it to their models; doing it to your own makes a smaller, cheaper model.',
    'Important technique, open to abuse.',
  ],
  [
    24,
    'Data Poisoning',
    214,
    'Training assumes data is useful and the result well-behaved but enforces neither. An attacker plants data (web pages, or an insider\'s rows in a fine-tuning set) to shape behaviour, from stealing data to being unfriendly. Smaller runs are easier targets.',
    'The attack lands in training data, not the prompt.',
  ],
  [
    25,
    'Reasoning Models',
    223,
    'Models that write out their working in a thinking step at inference time before the final answer, because working through a problem gave better results. Same machine, given room to think.',
    'Not the answer, but what was written on the way.',
  ],
  [
    26,
    'Caching',
    228,
    'Store the input and its generated output so unchanged parts are not recomputed on a follow-up; only the new tail runs. The model is not faster, it does less. What to keep and for how long is the hard part.',
    'Work already paid for is not paid twice.',
  ],
  [
    27,
    'Quantization',
    235,
    'Truncate the long, 16-bit weights to fewer digits. Memory drops a lot for a small quality loss, so big models can fit and run locally. The downloadable quantized file is the same weights written shorter.',
    'Truncate the number, keep the model.',
  ],
  [
    28,
    'Model Routing',
    246,
    'A router (itself usually a model) classifies each request and sends it to a cheaper or stronger model. Matches machine size to job size, saves the provider cost and tokens on subscription allowances. You can also do it by hand.',
    'You never name the model; the router decides.',
  ],
  [
    29,
    'Prompts',
    258,
    'The task plus the material you hand over, often several attachments, sent as one. It is the only part of the context you write and the only part you can change.',
    'Four bands go in; one has your name on it.',
  ],
  [
    30,
    'Prompt Engineering',
    264,
    'Writing the request so the first answer is the right one: task, constraints, output format, definitions, style. Needed less than in the early days but still pays off over repeated clarifying rounds. It is just briefing a colleague well.',
    'Nobody calls this engineering for a colleague.',
  ],
  [
    31,
    'Context Engineering',
    271,
    'Prompt engineering widened: choose the right documents, instructions and tools put in front of the model (the four relevant files and two tools, not the whole drive). Same prompt, far better answer with the right context.',
    'Same sentence typed; it had something to go on.',
  ],
  [
    32,
    'Structured Outputs',
    276,
    'Asking for machine-readable text such as JSON in a fixed shape so a program can act on it (store or forward an email). Providers offer a structured-output mode to guarantee the shape in programmatic use. Still text, for machines.',
    'Text for machines, not for people.',
  ],
  [
    33,
    'APIs for AI Models',
    285,
    'Your own code calls the provider\'s model through an endpoint instead of using their chat window. Every field is yours: prompt, temperature, max output, stop, format, tools. Chat apps are built on the same API.',
    'The chat app is one program; yours is another.',
  ],
  [
    34,
    'Models vs. AI Agents',
    294,
    'A model has no brain, memory or database; it produces tokens. It can decide but never do: it cannot write a file, run a search or send a request. Everything you use sits inside software that does these, and the model never sees your PDF, only extracted text.',
    'You have never used a model on its own.',
  ],
  [
    35,
    'AI Agents',
    304,
    'Software between you and the model. It sends your prompt plus a tool menu, the model replies with a tool call as text, and the agent actually runs it. It offers tools, runs the chosen one, and holds the room (files, results, history).',
    'The deciding is the model\'s; the doing is the software\'s.',
  ],
  [
    36,
    'Tools',
    312,
    'Capabilities the agent software exposes: built-in code given a name and parameters, described to the model as text. The software sets the list; the model can only request a call, never run it, and gets text back.',
    'A model\'s reach is what the software hands over.',
  ],
  [
    37,
    'The Agent Loop',
    321,
    'Software wraps your input with a system prompt and tool descriptions; the model emits a tool call; the software executes it and sends the result back with the whole transcript resent each round. It stops when work is done or no tool call is requested, then shows you the final answer.',
    'The model never runs a tool; it asks.',
  ],
  [
    38,
    'The Harness',
    331,
    'A second name for the agent software. It supplies tools, executes calls, and manages context and memory: nothing reaches the model that it did not fetch. Agent is the idea; harness is the thing that runs.',
    'Agent is the idea, harness is the thing.',
  ],
  [
    39,
    'Hallucinations',
    337,
    'The model answers "which token is likely next?", never "is this true?", so it can fluently invent things like a nonexistent valve. Far rarer now but not gone; wrong details hide inside mostly correct answers.',
    'Every answer is a claim to check.',
  ],
  [
    40,
    'Grounding',
    344,
    'Tie answers to something you can open, such as a web page or a page in a PDF. Software adds wording asking for citations and "say so if unsupported"; you ground by attaching documents or links; tools may search automatically.',
    'An answer, and the receipt for it.',
  ],
  [
    41,
    'Retrieval-Augmented Generation (RAG)',
    352,
    'Grounding where software fetches facts from your own documents and pastes them into the prompt on every message, without you asking. It needs an agent or tool with a retrieval step and a store, since the model itself reaches for nothing.',
    'The model only sees the pasted sources.',
  ],
  [
    42,
    'Vector Databases and Embeddings',
    359,
    'Rows carry an embedding, a list of numbers recording what a passage is near. Documents are chunked, embedded and stored. The question is embedded the same way and the nearest entries return as text, so search finds related meaning rather than matching words.',
    'Indexed by how things relate, not their words.',
  ],
  [
    43,
    'Memory',
    369,
    'A model keeps nothing between requests. Memory is usually plain text (often Markdown) files written by the tool, in the project or globally, resent in the prompt on later turns, either whole or selectively found by search. It blurs with a knowledge base.',
    'The model never remembers; the prompt does.',
  ],
  [
    44,
    'Compaction',
    383,
    'When a growing conversation outgrows the window, something must be thrown away. Truncation drops the oldest turns; compaction has a model summarise earlier turns and swaps the summary in. It runs automatically, and summaries quietly drop detail.',
    'Forget on purpose, not from the front.',
  ],
  [
    45,
    'Context Rot',
    394,
    'Quality degrades both from dead or irrelevant material that is resent every turn, and from sheer length even when all of it matters, well below the limit. Fixes: restart with conclusions, compact deliberately, and curate what you paste.',
    'More context usually buys a worse answer.',
  ],
  [
    46,
    'Model Context Protocol (MCP)',
    404,
    'An open standard for describing tools and resources so any compatible agent can use them without new code. A provider runs an MCP server in front of its service; consumers just add its address. It standardises the description, not what the tool does.',
    'A socket where the box used to be sealed.',
  ],
  [
    47,
    'Agent Skills',
    415,
    'A folder named for the skill containing SKILL.md (frontmatter name and description, then instructions) plus optional references, scripts and assets. Loaded in stages: only descriptions are always visible, then one matching skill opens in full. The description must say what it does and when to use it.',
    'A prompt written once, stored for the agent.',
  ],
  [
    48,
    'Computer Use',
    427,
    'For software built only to be looked at: the model gets a screenshot and returns mouse moves, clicks and typing as coordinates. Slow, with many round trips, but works where there is no tool or API.',
    'The slowest way in, and the only one that fits everything.',
  ],
  [
    49,
    'Sandboxes',
    436,
    'Tools run on your machine with your permissions, so agents get folder-by-folder grants and ideally a boundary that keeps mistakes small. Implementations have been escaped, but a boundary still beats none. If you build the agent, you decide where it runs.',
    'You are making the damage small, not the agent safe.',
  ],
  [
    50,
    'Agentic Search',
    446,
    'The agent explores a folder it was never given a map of: it lists files, judges from names, and opens a few, deciding by itself. It is what you would do, just run repeatedly and faster.',
    'A run of choices the model made.',
  ],
  [
    51,
    'Human in the Loop',
    455,
    'Tools with lasting effects (delete, send email, move money) require your approval, while read-only ones run automatically. The harness holds a per-tool table of auto or ask; the model itself cannot hold back. If you build an agent, you decide who may say no.',
    'It is about what a task leaves behind.',
  ],
  [
    52,
    'Agentic Engineering',
    462,
    'Point an agent at code and steer it with your judgement: write down conventions (a conventions.md), give instructions, read the diff and correct. What gets built and what is good enough stays yours; you type less.',
    'Your judgement is the input, not the thing replaced.',
  ],
  [
    53,
    'Vibe Coding',
    468,
    'Describe the result, take what comes back, never open the code. Great for rapid prototypes and for people who could not otherwise build. Risky for complex software because mess compounds unseen.',
    'The code you never read is still what runs.',
  ],
  [
    54,
    'Benchmarks',
    476,
    'Numbers in launch charts chosen by the launcher, so the lists never match and losses go unpublished. A benchmark is a fixed public list that can be tuned for, and scored clean tasks differ from your messy ones.',
    'Only your own run settles it.',
  ],
  [
    55,
    'Evals',
    483,
    'Testing generated output needs measuring behaviour against written requirements (capability, reliability, safety, product), run end to end on dummy inputs with a second model as judge. It scores your system, not the model, costs about double per run, and catches regressions.',
    'Run it on every change.',
  ],
  [
    56,
    'Prompt Injection',
    491,
    'Text from outside (email, PDF, search result, web page) lands in the context and is read as instructions. There is no "just data". Decide which sources to expose or leave out, or screen inputs first. Models are better at resisting, not safe.',
    'Most of what reaches the model is not yours.',
  ],
  [
    57,
    'Data Exfiltration',
    501,
    'An agent reads your files and sends them elsewhere, via an injected instruction or just through heavy reading whose context goes to the provider every turn. Turn off training and retention in provider data settings; the agent cannot set these.',
    'They need your agent, not your files.',
  ],
  [
    58,
    'Open Weights and Open-Source Models',
    510,
    'Most providers host models; some publish weights you can download and run (Ollama, LM Studio). You still need hardware, or rent a server. Closed models give you an address; open-weights give you the weights. Same kind of model.',
    'The only question is whose machine it runs on.',
  ],
];

export const concepts: Concept[] = rawConcepts.map(([id, title, page, description, remember]) => {
  const cat = getCategoryForId(id);
  return {
    id,
    slug: slugify(title),
    title,
    page,
    description,
    remember,
    category: cat.name,
    categoryIndex: cat.index,
    readingTime: estimateReadingTime(description + ' ' + remember),
  };
});

export function getConceptBySlug(slug: string): Concept | undefined {
  return concepts.find((c) => c.slug === slug);
}

export function getConceptById(id: number): Concept | undefined {
  return concepts.find((c) => c.id === id);
}

export function getAdjacentConcepts(id: number): { prev: Concept | undefined; next: Concept | undefined } {
  const index = concepts.findIndex((c) => c.id === id);
  return {
    prev: index > 0 ? concepts[index - 1] : undefined,
    next: index < concepts.length - 1 ? concepts[index + 1] : undefined,
  };
}

export function searchConcepts(query: string): Concept[] {
  const q = query.trim().toLowerCase();
  if (!q) return concepts;
  return concepts.filter(
    (c) =>
      c.title.toLowerCase().includes(q) ||
      c.description.toLowerCase().includes(q) ||
      c.remember.toLowerCase().includes(q) ||
      c.category.toLowerCase().includes(q)
  );
}

export function getConceptsByCategory(categoryName: string): Concept[] {
  return concepts.filter((c) => c.category === categoryName);
}
