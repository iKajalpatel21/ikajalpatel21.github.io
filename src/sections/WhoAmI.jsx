import { useEffect, useRef } from 'react'

function useAnimate() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) el.classList.add('visible') },
      { threshold: 0.1 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return ref
}

const blocks = [
  {
    label: 'What I Do',
    content: (
      <>
        Build and scale <strong>data systems that teams can trust</strong>: pipelines that don't just move data, but make it reliable, decision-ready, and interpretable. Four years in industry, now applying that discipline to neuroscience research at GWU.
      </>
    ),
  },
  {
    label: 'What Sets Me Apart',
    content: (
      <>
        I go deep until the system makes sense <strong>end-to-end</strong>. Whether it's a distributed data pipeline or how neurons communicate at a biochemical level, I break complex systems down to their fundamentals, then write about what I find. Curiosity is the method, not a personality trait.
      </>
    ),
  },
  {
    label: "What I'm Looking For",
    content: (
      <>
        Roles where <strong>strong data engineering meets practical AI integration</strong>. As automation becomes the norm, the challenge isn't whether to use AI: it's where and how to use it effectively. I want to work on platforms where that question has real stakes.
      </>
    ),
  },
]

export default function WhoAmI() {
  const blockRef = useAnimate()
  const storyRef = useAnimate()

  return (
    <section id="about" className="section">
      <div className="section-label">Who I Am</div>
      <h2 className="section-title">The full picture.</h2>

      <div ref={blockRef} className="whoami-blocks animate">
        {blocks.map((b) => (
          <div key={b.label} className="whoami-block">
            <div className="whoami-block-label">{b.label}</div>
            <div className="whoami-block-content">{b.content}</div>
          </div>
        ))}
      </div>

      <div ref={storyRef} className="whoami-story animate">
        <p>
          I'm a software engineer focused on building and scaling data systems. Over the past four years, I've worked on designing data pipelines that don't just move data, but make it reliable, scalable, and decision-ready. My work sits at the intersection of engineering and impact: turning raw data into systems that teams can trust.
        </p>
        <p>
          What sets me apart is how I approach learning. I don't stop at surface-level understanding. I go deep until the system makes sense end-to-end. Recently, that curiosity has taken me beyond engineering into neuroscience, where I'm exploring how neurons function at a biochemical level. It reinforced something I strongly believe: any complex system, whether data pipelines or the human brain, can be understood by breaking it down to its fundamentals.
        </p>
        <p>
          Outside of engineering, I write to think. I share ideas and learning through blogs, turning complex topics into something structured and clear.
        </p>
        <p>
          <strong>Creativity is what sets my work apart.</strong> While many systems are built on existing patterns, I focus on understanding problems deeply and generating ideas from the ground up. My goal is to contribute in a way that is not just efficient, but thoughtful, original, and impactful.
        </p>
        <p>
          I'm currently focused on building scalable data systems, and I'm always looking for problems that demand both depth and clarity.
        </p>
      </div>
    </section>
  )
}
