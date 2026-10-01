import { useEffect, useRef, useState } from 'react'
import { Menu as MenuIcon, X } from 'lucide-react'
import { ScrollTrigger, useGSAP } from '../lib/gsap'
import { brand, hero, nav } from '../content'

export default function Nav() {
  const [solid, setSolid] = useState(false)
  const [open, setOpen] = useState(false)
  const toggleRef = useRef(null)

  // Transparent over the hero frames, solid once the hero has scrolled away.
  useGSAP(() => {
    ScrollTrigger.create({
      trigger: '#top',
      start: 'bottom top+=80',
      end: 'max',
      onToggle: (self) => setSolid(self.isActive),
      onRefresh: (self) => setSolid(self.isActive),
    })
  })

  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpen(false)
        toggleRef.current?.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  const light = !solid && !open

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,color] duration-500 ${
        light
          ? 'border-b border-transparent text-white'
          : 'border-b border-line bg-cream/90 text-ink backdrop-blur-md'
      }`}
    >
      <div className="container-page flex h-18 items-center justify-between gap-6">
        <a href="#top" className="flex items-center gap-2.5" aria-label={`${brand.name} — back to top`}>
          <img
            src={brand.logo}
            alt=""
            width="48"
            height="48"
            className={`size-12 rounded-full ring-1 ${light ? 'ring-white/30' : 'ring-ink/10'}`}
          />
          <span className="font-display text-2xl tracking-tight">{brand.name}</span>
        </a>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-8 text-[0.9375rem] font-medium">
            {nav.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="link-draw py-2">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <a href={hero.primaryCta.href} className="btn btn-primary hidden min-h-11 px-5 py-2 sm:inline-flex">
            Contact
          </a>
          <button
            ref={toggleRef}
            type="button"
            className="grid size-11 cursor-pointer place-items-center rounded-full lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X aria-hidden="true" /> : <MenuIcon aria-hidden="true" />}
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        hidden={!open}
        className="border-t border-line bg-cream lg:hidden"
      >
        <nav aria-label="Mobile" className="container-page py-6">
          <ul className="flex flex-col">
            {nav.map((item) => (
              <li key={item.href} className="border-b border-line">
                <a
                  href={item.href}
                  className="block py-4 font-display text-3xl"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href={hero.primaryCta.href}
            className="btn btn-primary mt-6 w-full"
            onClick={() => setOpen(false)}
          >
            {hero.primaryCta.label}
          </a>
        </nav>
      </div>
    </header>
  )
}
