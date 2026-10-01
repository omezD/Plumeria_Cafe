import { useCallback, useEffect, useRef, useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { gsap, useGSAP } from '../lib/gsap'
import { hero } from '../content'
import usePrefersReducedMotion from '../hooks/usePrefersReducedMotion'

// Every image in public/frames becomes one frame, in filename order.
// Drop new files in (or remove some) and the sequence adapts — no config.
import allFrames from 'virtual:hero-frames'

// Phones and data-saver connections get every second frame: half the
// download, and the scrub still reads as continuous motion.
const lite = navigator.connection?.saveData || window.matchMedia('(max-width: 767px)').matches
const frameUrls = lite ? allFrames.filter((_, i) => i % 2 === 0) : allFrames

const isReady = (img) => img && img.complete && img.naturalWidth > 0

export default function HeroSequence() {
  const sectionRef = useRef(null)
  const canvasRef = useRef(null)
  const imagesRef = useRef([])
  const frameRef = useRef(0)
  const [loaded, setLoaded] = useState(0)
  const reduced = usePrefersReducedMotion()

  const total = frameUrls.length
  const [first, middle, last] = hero.stages

  const draw = useCallback(() => {
    const canvas = canvasRef.current
    const images = imagesRef.current
    if (!canvas || !images.length) return

    // If the wanted frame has not arrived yet, show the closest one that has.
    let img = null
    for (let d = 0; d < images.length && !img; d++) {
      if (isReady(images[frameRef.current - d])) img = images[frameRef.current - d]
      else if (isReady(images[frameRef.current + d])) img = images[frameRef.current + d]
    }
    if (!img) return

    const ctx = canvas.getContext('2d')
    const { width: cw, height: ch } = canvas
    const scale = Math.max(cw / img.naturalWidth, ch / img.naturalHeight)
    const dw = img.naturalWidth * scale
    const dh = img.naturalHeight * scale
    ctx.drawImage(img, (cw - dw) / 2, (ch - dh) / 2, dw, dh)
  }, [])

  // Preload every frame up front so scrubbing never waits on the network.
  // Requests go out coarse-to-fine (every 16th frame, then every 8th, ...)
  // so the whole sequence is roughly scrubbable long before it is complete.
  useEffect(() => {
    let cancelled = false
    let count = 0
    const images = frameUrls.map(() => new Image())
    imagesRef.current = images

    const order = []
    const seen = new Set()
    for (let step = 16; step >= 1; step /= 2) {
      for (let i = 0; i < images.length; i += step) {
        if (!seen.has(i)) {
          seen.add(i)
          order.push(i)
        }
      }
    }

    order.forEach((i) => {
      const img = images[i]
      img.decoding = 'async'
      img.onload = img.onerror = () => {
        if (cancelled) return
        count += 1
        setLoaded(count)
        draw()
      }
      img.src = frameUrls[i]
    })
    return () => {
      cancelled = true
    }
  }, [draw])

  // Keep the canvas bitmap matched to its on-screen size.
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.round(canvas.clientWidth * dpr)
      canvas.height = Math.round(canvas.clientHeight * dpr)
      draw()
    }
    resize()
    const observer = new ResizeObserver(resize)
    observer.observe(canvas)
    return () => observer.disconnect()
  }, [draw])

  useGSAP(
    () => {
      if (reduced) {
        frameRef.current = Math.max(total - 1, 0)
        draw()
        return
      }

      const state = { frame: 0 }
      gsap.set('[data-stage="1"], [data-stage="2"]', { autoAlpha: 0, y: 48 })

      // One timeline, scrubbed by scroll across the whole (tall) section.
      // Positions are fractions of the scroll distance.
      const tl = gsap.timeline({
        defaults: { ease: 'power2.out' },
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.6,
        },
      })

      tl.to(
        state,
        {
          frame: Math.max(total - 1, 0),
          duration: 1,
          ease: 'none',
          onUpdate: () => {
            const next = Math.round(state.frame)
            if (next !== frameRef.current) {
              frameRef.current = next
              draw()
            }
          },
        },
        0,
      )
        .to('[data-cue]', { autoAlpha: 0, duration: 0.06 }, 0.02)
        .to('[data-stage="0"]', { autoAlpha: 0, y: -48, duration: 0.1, ease: 'power2.in' }, 0.16)
        .to('[data-stage="1"]', { autoAlpha: 1, y: 0, duration: 0.1 }, 0.34)
        .to('[data-stage="1"]', { autoAlpha: 0, y: -48, duration: 0.1, ease: 'power2.in' }, 0.56)
        .to('[data-stage="2"]', { autoAlpha: 1, y: 0, duration: 0.12 }, 0.76)

      return () => {
        frameRef.current = 0
      }
    },
    { scope: sectionRef, dependencies: [reduced, total, draw], revertOnUpdate: true },
  )

  const done = loaded >= total
  const stageBox = 'absolute inset-x-0 bottom-0 pb-[clamp(5rem,14vh,9rem)]'
  const stageTitle = 'max-w-[14ch] font-display text-[clamp(2.75rem,8.5vw,7.5rem)] leading-[0.98] tracking-[-0.03em]'

  const ctas = (
    <div className="mt-9 flex flex-wrap gap-3">
      <a href={hero.primaryCta.href} className="btn btn-primary">
        {hero.primaryCta.label}
        <ArrowRight className="size-4" aria-hidden="true" />
      </a>
      <a href={hero.secondaryCta.href} className="btn btn-ghost-light">
        {hero.secondaryCta.label}
      </a>
    </div>
  )

  return (
    <section
      id="top"
      ref={sectionRef}
      className="relative bg-ink text-white"
      style={{ height: reduced ? '100dvh' : `${hero.scrollLength * 100}dvh` }}
    >
      <div className="sticky top-0 h-dvh overflow-hidden">
        <canvas ref={canvasRef} className="absolute inset-0 size-full" aria-hidden="true" />
        {/* Scrim keeps the headline readable over any frame. */}
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgb(20_7_9/0.6),rgb(20_7_9/0.1)_28%,rgb(20_7_9/0.5)_55%,rgb(20_7_9/0.9))]" />

        <div data-stage="0" className={stageBox}>
          <div className="container-page">
            <p className="eyebrow mb-6 text-yolk">{first.eyebrow}</p>
            <h1 className={stageTitle}>{first.title}</h1>
            {reduced && ctas}
          </div>
        </div>

        {!reduced && (
          <>
            <div data-stage="1" className={`${stageBox} invisible`}>
              <div className="container-page">
                <p className="eyebrow mb-6 text-yolk">{middle.eyebrow}</p>
                <p className={stageTitle}>{middle.title}</p>
              </div>
            </div>

            <div data-stage="2" className={`${stageBox} invisible`}>
              <div className="container-page">
                <p className="eyebrow mb-6 text-yolk">{last.eyebrow}</p>
                <p className={stageTitle}>{last.title}</p>
                {ctas}
              </div>
            </div>

            <div
              data-cue
              className="absolute bottom-8 right-[clamp(1.25rem,5vw,3rem)] flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em]"
              aria-hidden="true"
            >
              Scroll
              <span className="relative block h-12 w-px overflow-hidden bg-white/30">
                <span className="absolute inset-0 animate-[scroll-cue_2s_var(--ease-out-soft)_infinite] bg-white" />
              </span>
            </div>
          </>
        )}

        <div
          className={`absolute inset-x-0 bottom-0 h-0.5 bg-white/15 transition-opacity duration-700 ${done ? 'opacity-0' : 'opacity-100'}`}
          role="progressbar"
          aria-label="Loading hero animation"
          aria-valuemin={0}
          aria-valuemax={total}
          aria-valuenow={loaded}
          aria-hidden={done}
        >
          <div
            className="h-full origin-left bg-yolk transition-transform duration-300"
            style={{ transform: `scaleX(${total ? loaded / total : 1})` }}
          />
        </div>
      </div>
    </section>
  )
}
