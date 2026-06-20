export const projects = [
  {
    id: 'neural-spike-sorting',
    title: 'Neural Spike Sorting ML Pipeline',
    subtitle: 'Scalable research infrastructure for neural data processing at GWU School of Medicine.',
    badge: 'Current Research',
    tags: ['Python', 'Django', 'PostgreSQL', 'AWS', 'TensorFlow'],
    thumbnail: '/Labhub.png',
    featured: true,
    links: [
      { label: 'Working Directory', url: 'https://github.com/iKajalpatel21/spikesorting-labhub-try-error' },
      { label: 'Org Repo', url: 'https://github.com/UserFriendlySpikesorting' },
    ],
    sections: [
      {
        id: 'abstract',
        label: 'Abstract',
        content: [
          'Spike sorting the identification of individual neuronal action potentials (APs) from multi-electrode extracellular recordings is a critical analysis step for in-vivo, in-vitro, and in-culture electrophysiological experiments. However, spike sorting is a computationally demanding process highly sensitive to sorter parameters. Optimal performance depends on factors such as animal age, probe configuration, brain region, and pharmacological or genetic manipulations. Consequently, spike sorters often require extensive parameter tuning to achieve accurate and efficient unit isolation. Because parameter adjustment typically requires programming expertise, this creates an additional barrier for researchers primarily trained in the biological sciences.',
          'Here we present Spike Sorting Lab Hub (SSLH), a web-based infrastructure designed to simplify and streamline spike-sorting workflows. SSLH allows users to collect and manage sorting parameters for specific recordings (sorting pipelines), apply these pipelines to new datasets, distribute workloads across multiple computing nodes (workers), and monitor sorting progress in real time.',
          'SSLH is implemented as a lightweight Django-based web server that can be integrated into Network-Attached Storage (NAS) platforms, such as TrueNAS, as a standalone Docker container. This architecture provides flexibility and scalability, enabling SSLH to operate efficiently on infrastructures ranging from a laboratory NAS with a single dedicated worker to large-scale spike-sorting farms or cloud-based environments.',
          'A key strength of SSLH is its modular design. Functionality is encapsulated into independent Django applications, allowing future expansion and customization without disrupting existing components. This approach improves maintainability, simplifies deployment, and supports long-term platform development.',
          'At the time of submission, SSLH is undergoing beta testing. Its source code is publicly available on GitHub under the GNU General Public License (GPL). By combining accessibility, scalability, and modularity, SSLH lowers the technical barrier to high-quality spike sorting and promotes more consistent and reproducible analysis across complex electrophysiological datasets.',
        ],
      },
      {
        id: 'overview',
        label: 'Overview',
        content: [
          'At GWU School of Medicine & Health Sciences, I built a secure, scalable backend platform that enables neuroscience researchers to submit and manage spike-sorting jobs through a web interface.',
          'The goal: eliminate the bottleneck of manual data processing. Researchers previously spent hours managing files and running scripts by hand. The platform turns that into a one-click workflow: job submitted, pipeline runs, results are ready.',
          'I designed Django REST APIs, PostgreSQL schemas, and a Python-based worker system that processes neural data pipelines, tracks job status, and prevents task collisions.',
        ],
        image: '/Labhub.png',
      },
      {
        id: 'why-it-stands-out',
        label: 'Why It Stands Out',
        content: [
          'Most research infrastructure is either ad-hoc scripts or overly complex enterprise tooling. This sits deliberately in between: production-grade reliability, built for a research context.',
          'Three design decisions that made it different: task collision prevention ensures no two jobs compete for the same data segment; status transparency gives researchers visibility into exactly where their job is in the pipeline; and a modular Python worker system means new sorting algorithms can be plugged in without touching the API or database layer.',
        ],
      },
      {
        id: 'process',
        label: 'Process',
        content: [
          'Started by mapping the full researcher workflow, from raw neural recording to sorted output. Every design decision traced back to that map.',
          'Built the Django REST API first, establishing clean contracts between the web interface and the processing workers. Then designed the PostgreSQL schema to track job state across processing stages. Finally, built the Python worker system that executes the actual spike-sorting pipelines.',
          'Iterated with the neuroscience team weekly, adjusting the interface based on how researchers actually worked, not how I assumed they would.',
        ],
      },
      {
        id: 'reflection',
        label: 'Reflection',
        content: [
          'This project reinforced something I now believe deeply: the best engineering is invisible. When the infrastructure works, researchers don\'t think about infrastructure. They think about their science. That\'s the goal.',
          'Working in a research environment also taught me that requirements evolve as the science evolves. Building for flexibility isn\'t optional. It\'s the core architectural constraint.',
        ],
      },
      {
        id: 'hurdles',
        label: 'Hurdles',
        content: [
          'The hardest technical problem was data integrity under concurrent load. Neural recording files are large and processing is expensive. A collision between two jobs analyzing overlapping data would corrupt results.',
          'Solved this with a locking mechanism at the job-scheduling layer, with fallback retry logic that was fully transparent to the researcher.',
          'The second challenge: requirements weren\'t fully defined up front. Built the system so each new sorting algorithm needed only to implement a standard interface. The core pipeline remained stable as the research evolved.',
        ],
      },
    ],
  },

  {
    id: 'stock-market-pipeline',
    title: 'Real-Time Stock Market Data Pipeline',
    subtitle: 'End-to-end streaming pipeline: from live API to BigQuery, dashboard, and K8s deployment.',
    badge: 'Data Engineering',
    tags: ['Apache Kafka', 'Apache Spark', 'BigQuery', 'Next.js', 'Docker', 'Kubernetes'],
    thumbnail: null,
    featured: false,
    links: [
      { label: 'View on GitHub', url: 'https://github.com/iKajalpatel21/RealTimeStockDataPipeline' },
    ],
    sections: [
      {
        id: 'overview',
        label: 'Overview',
        content: [
          'An end-to-end pipeline that ingests live stock data from the Finnhub API, streams it through Apache Kafka, processes it with Apache Spark, and stores results in Google BigQuery.',
          'Includes a Next.js dashboard and Tableau visualizations, deployed with Docker and Kubernetes for horizontal scalability.',
        ],
      },
      {
        id: 'why-it-stands-out',
        label: 'Why It Stands Out',
        content: [
          'The system is designed around the full data lifecycle (ingestion, stream processing, storage, and visualization) using production-grade tools at each layer.',
          'The Kubernetes deployment means the pipeline scales horizontally under load, not by throwing more compute at a single node. The architecture handles spikes in market activity without requiring manual intervention.',
        ],
      },
      {
        id: 'process',
        label: 'Process',
        content: [
          'Designed the schema first, then worked backwards through the pipeline. Each stage was tested independently before integration: Kafka consumer validated before Spark processing, Spark output confirmed before BigQuery load.',
          'This end-to-end testing discipline caught three data type mismatches that would have been expensive to debug in production.',
        ],
      },
      {
        id: 'reflection',
        label: 'Reflection',
        content: [
          'Building a real-time system made clear how much the latency budget matters at every layer. A slow Kafka consumer doesn\'t just add lag. It backs up the entire pipeline.',
          'Designing for latency from the start, rather than optimizing later, is a lesson I\'ve applied to every pipeline since.',
        ],
      },
      {
        id: 'hurdles',
        label: 'Hurdles',
        content: [
          'Kafka offset management under failure conditions was the hardest part. Ensuring exactly-once processing semantics without duplicating records required careful consumer group configuration and idempotent writes to BigQuery.',
          'The solution involved tracking offsets manually and implementing a deduplication check at the BigQuery load step, adding resilience without sacrificing throughput.',
        ],
      },
    ],
  },

  {
    id: 'pointy',
    title: 'Pointy',
    subtitle: 'A screen-aware AI companion that lives in your macOS menu bar: push-to-talk, cursor pointing, voice response.',
    badge: 'Hackathon · Swift',
    tags: ['Swift', 'Claude API', 'AssemblyAI', 'Cloudflare Workers', 'macOS'],
    thumbnail: null,
    featured: false,
    links: [
      { label: 'View on GitHub', url: 'https://github.com/iKajalpatel21/Pointy' },
    ],
    sections: [
      {
        id: 'overview',
        label: 'Overview',
        content: [
          'Pointy is a macOS menu bar app that acts as an AI companion for whatever is on your screen. Hold Control + Option, ask a question out loud, and Pointy captures your screen, transcribes your voice, sends both to Claude, and speaks the answer back, pointing at the exact UI element being discussed.',
          'The core problem it solves: switching between a tutorial and the app you\'re learning breaks focus. Pointy just lives on your screen and shows you exactly where to click, like a friend looking over your shoulder.',
          'Built in Swift with a Cloudflare Worker proxy so API keys never ship in the app binary. Works across all connected displays.',
        ],
      },
      {
        id: 'why-it-stands-out',
        label: 'Why It Stands Out',
        content: [
          'Screen-aware AI that can actually point at things. Claude doesn\'t just describe what to do. Pointy animates a cursor to the exact element on your screen. That specificity changes the interaction completely.',
          'The security architecture is deliberate: the app never calls Anthropic or AssemblyAI directly. All requests route through a Cloudflare Worker that holds the API keys server-side. No key ever ships in the binary.',
          'Zero footprint by design: no dock icon, no window, just a menu bar item. The UI appears only when you need it and disappears when you don\'t.',
        ],
      },
      {
        id: 'process',
        label: 'Process',
        content: [
          'Started with the interaction model: push-to-talk felt right because it mimics how you\'d get help from a person. Built the audio capture and transcription layer first, then layered in the screenshot and Claude API call.',
          'The cursor-pointing mechanic required overlaying a transparent window on top of all other apps. This had to work across multiple monitors and through fullscreen apps, which involved a non-obvious macOS window level configuration.',
          'The Cloudflare Worker proxy was added after the first working prototype, when it became clear that shipping API keys in an app binary was a non-starter.',
        ],
      },
      {
        id: 'reflection',
        label: 'Reflection',
        content: [
          'This was my first substantial Swift project. The constraint forced me to think in terms of the platform rather than the language. macOS APIs, window management, audio capture, and system permissions all had specific patterns I had to learn fast.',
          'It also reinforced something about AI product design: the value isn\'t in the AI call itself, it\'s in the integration. Claude was a commodity. The hard part was making the interaction feel natural (push-to-talk, visual pointing, voice response) so the AI output landed in the right context.',
        ],
      },
      {
        id: 'hurdles',
        label: 'Hurdles',
        content: [
          'macOS screen capture permissions are strict. Getting a screenshot at the exact moment the user releases the hotkey, without triggering multiple permission dialogs, required careful handling of the CGWindowListCreateImage API and permission pre-checking at launch.',
          'The animated cursor overlay needed to sit above every other window, including fullscreen apps. Getting the NSWindow level right (using .screenSaver level) and making it click-through while remaining visible took more iteration than expected.',
          'AssemblyAI\'s real-time transcription WebSocket has specific keep-alive requirements. The connection would silently drop mid-session without a periodic ping. Debugging that took time because there was no error, just silence.',
        ],
      },
    ],
  },
]
