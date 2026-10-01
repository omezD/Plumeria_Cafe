import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import { gsap, MOTION_OK, ScrollTrigger, useGSAP } from './lib/gsap'
import usePrefersReducedMotion from './hooks/usePrefersReducedMotion'
import Nav from './components/Nav'
import HeroSequence from './components/HeroSequence'
import Marquee from './components/Marquee'
import Story from './components/Story'
import Features from './components/Features'
import Menu from './components/Menu'
import Gallery from './components/Gallery'
import Hours from './components/Hours'
import Guests from './components/Guests'
import Contact from './components/Contact'
import Location from './components/Location'
import Footer from './components/Footer'

export default function App() {
  const rootRef = useRef(null)
  const reduced = usePrefersReducedMotion()

  // Smooth scrolling, driven by GSAP's ticker so it stays in step with ScrollTrigger.
  useEffect(() => {
    if (reduced) return
    const lenis = new Lenis({ anchors: true })
    lenis.on('scroll', ScrollTrigger.update)
    const tick = (time) => lenis.raf(time * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)
    return () => {
      gsap.ticker.remove(tick)
      lenis.destroy()
    }
  }, [reduced])

  // Page-wide scroll choreography, opted into with data attributes:
  //   data-reveal    fade + rise as the element enters the viewport
  //   data-split     heading whose [data-word] children rise from a mask
  //   data-parallax  layer that drifts against its container
  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(MOTION_OK, () => {
        gsap.set('[data-reveal]', { autoAlpha: 0, y: 32 })
        ScrollTrigger.batch('[data-reveal]', {
          start: 'top 88%',
          once: true,
          onEnter: (els) =>
            gsap.to(els, { autoAlpha: 1, y: 0, duration: 0.9, ease: 'power3.out', stagger: 0.09, overwrite: true }),
        })

        gsap.utils.toArray('[data-split]').forEach((heading) => {
          gsap.from(heading.querySelectorAll('[data-word]'), {
            yPercent: 115,
            duration: 0.95,
            ease: 'power4.out',
            stagger: 0.045,
            scrollTrigger: { trigger: heading, start: 'top 88%', once: true },
          })
        })

        gsap.utils.toArray('[data-parallax]').forEach((layer) => {
          gsap.fromTo(
            layer,
            { yPercent: -7 },
            {
              yPercent: 7,
              ease: 'none',
              scrollTrigger: { trigger: layer.parentElement, start: 'top bottom', end: 'bottom top', scrub: true },
            },
          )
        })

        gsap.from('[data-wordmark]', {
          yPercent: 40,
          ease: 'none',
          scrollTrigger: { trigger: '[data-wordmark]', start: 'top bottom', end: 'bottom bottom', scrub: true },
        })
      })

      document.fonts?.ready.then(() => ScrollTrigger.refresh())
    },
    { scope: rootRef },
  )

  return (
    <div ref={rootRef}>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-cream"
      >
        Skip to main content
      </a>
      <Nav />
      <main id="main">
        <HeroSequence />
        <Marquee />
        <Story />
        <Features />
        <Menu />
        <Gallery />
        <Hours />
        <Guests />
        <Contact />
        <Location />
      </main>
      <Footer />
    </div>
  )
}
