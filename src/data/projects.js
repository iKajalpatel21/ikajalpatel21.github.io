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
    id: 'brand-guardian-ai',
    title: 'Brand Guardian AI',
    subtitle: 'Multi-modal compliance engine that audits video content against brand and regulatory policies using Azure and LangGraph.',
    badge: 'AI Engineering',
    tags: ['Python', 'LangGraph', 'LangSmith', 'Azure OpenAI', 'FastAPI'],
    thumbnail: null,
    featured: false,
    links: [
      { label: 'View on GitHub', url: 'https://github.com/iKajalpatel21/Azure-Multi-Modal-Compliance-Orchestration-Engine-using-LangGraph-and-LangSmith' },
    ],
    sections: [
      {
        id: 'overview',
        label: 'Overview',
        content: [
          'Brand Guardian AI is a compliance auditing system that takes a YouTube video and tells you whether it passes or fails your brand guidelines and regulatory requirements. It does not just scan text. It watches the video, reads what appears on screen, listens to what is said, and checks all of it against your actual policy documents.',
          'The pipeline works in four stages. First it downloads the video and sends it through Azure Video Indexer to extract transcripts and on-screen text via OCR. Then it queries Azure AI Search to pull the relevant compliance rules from indexed PDF documents. Finally it sends everything to Azure OpenAI, which produces a structured report with a PASS or FAIL verdict, specific violations, and severity levels for each finding.',
          'There are two ways to run it: a CLI for quick audits and a FastAPI backend for integration into larger systems. The whole workflow is orchestrated with LangGraph and instrumented with LangSmith tracing so every step in the pipeline is observable.',
        ],
      },
      {
        id: 'why-it-stands-out',
        label: 'Why It Stands Out',
        content: [
          'Most compliance tooling works on text alone. This one actually watches the video. By combining transcript extraction, visual OCR, and RAG over policy documents, it can catch violations that a text-only system would miss entirely, like an on-screen graphic that contradicts a brand guideline or a verbal claim that conflicts with a regulatory document.',
          'LangGraph handles the orchestration as a typed state machine, not a chain of function calls. That means the audit pipeline has explicit checkpoints, and any failure can be inspected at the exact node where it happened. Combined with LangSmith tracing, debugging a bad audit report is a matter of opening the trace, not reading through logs.',
          'The output is structured, not freeform. Every report comes back with a session ID, compliance status, specific findings, and severity categorization. That makes it actually usable downstream in a review workflow rather than just readable by a human.',
        ],
      },
      {
        id: 'process',
        label: 'Process',
        content: [
          'Started by getting the Azure Video Indexer integration working end to end before touching anything else. Video processing is async and the polling logic had to be solid before the rest of the pipeline could be built on top of it.',
          'Once the extraction layer was stable, I built the RAG component separately: indexed the compliance PDFs into Azure AI Search, tested retrieval quality with a few sample queries, and tuned the chunking strategy before connecting it to the main pipeline.',
          'LangGraph came in at the orchestration layer, after the individual pieces were working. Modeling the audit as a typed state graph made it easy to add LangSmith tracing and Application Insights telemetry without touching the core logic.',
          'Added the FastAPI backend last, once the CLI workflow was stable. The server shares the same LangGraph workflow, so there is no duplicated logic between the two entry points.',
        ],
      },
      {
        id: 'reflection',
        label: 'Reflection',
        content: [
          'The biggest shift in thinking this project required was treating video as a first-class data source, not a file to convert into text as fast as possible. Azure Video Indexer does a lot of heavy lifting, but knowing what to ask for and how to combine the transcript with OCR output into something coherent took real thought.',
          'LangGraph also changed how I think about multi-step AI workflows. Explicit state management makes these systems much easier to debug and much easier to hand to someone else. A graph you can read is worth a lot more than a chain of closures you have to trace mentally.',
        ],
      },
      {
        id: 'hurdles',
        label: 'Hurdles',
        content: [
          'Azure Video Indexer processes video asynchronously and the job can take several minutes. Building a reliable polling loop with proper timeout handling and error propagation into the LangGraph state was more involved than expected. A failed indexing job needed to surface a clean error in the audit report, not crash the pipeline.',
          'Getting retrieval quality right in Azure AI Search required more iteration than expected. The first chunking strategy split PDF paragraphs mid-sentence and produced retrieval results that confused the compliance audit step. Adjusting chunk boundaries and adding overlap solved it but took several rounds of testing against real policy documents.',
          'Coordinating three Azure services in sequence meant that a credential misconfiguration or a rate limit on any one of them would produce a confusing error downstream. Added explicit validation at startup so configuration problems surface before a video is ever submitted, not halfway through a two-minute audit run.',
        ],
      },
    ],
  },
]
