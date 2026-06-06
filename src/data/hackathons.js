export const hackathons = [
  {
    id: 'pointy',
    event: 'HackWithDC',
    project: 'Pointy',
    tagline: 'An AI that sees your screen and points at exactly what you need.',
    description: 'Built a macOS menu bar app in Swift that takes a screenshot when you push-to-talk, sends it to Claude with your voice question, and responds by pointing an animated cursor at the UI element you\'re asking about. Zero dock footprint. Works across all displays.',
    tags: ['Swift', 'Claude API', 'AssemblyAI', 'Cloudflare Workers'],
    github: 'https://github.com/iKajalpatel21/Pointy',
    learning: 'AI product design is mostly integration work. The Claude call was the easiest part. Making the interaction feel natural (push-to-talk, visual pointing, voice response) was where the real engineering was.',
  },
  {
    id: 'payroll-guard',
    event: 'HackWithDC',
    project: 'PayrollGuard',
    tagline: 'Real-time AI fraud detection at the action layer, not the login layer.',
    description: 'Built a behavioral fraud detection system for payroll platforms that monitors what authenticated users do, not just whether they logged in. Tracks typing cadence, clipboard usage, navigation flow, and bank account change patterns. High-risk actions are escalated to an AI classifier that distinguishes legitimate behavior from compromised sessions.',
    tags: ['JavaScript', 'AI Risk Scoring', 'Behavioral Biometrics'],
    github: 'https://github.com/iKajalpatel21/Payroll_guard',
    learning: 'Most security lives at the authentication layer. The insight was that a stolen credential bypasses all of that. Fraud happens after login. Shifting the detection surface to the action layer required thinking about security as a data problem, not an auth problem.',
  },
]
