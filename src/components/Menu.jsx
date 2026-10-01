import { useEffect, useRef, useState } from 'react'
import { Flame, Maximize2, X } from 'lucide-react'
import { gsap, MOTION_OK, ScrollTrigger, useGSAP } from '../lib/gsap'
import { brand, menu } from '../content'
import SectionHeading from './SectionHeading'

const price = (n) => `${brand.currency}${n}`

export default function Menu() {
  const [active, setActive] = useState(0)
  const sectionRef = useRef(null)
  const tabRefs = useRef([])
  const dialogRef = useRef(null)
  const firstRun = useRef(true)

  // Stagger the dishes in, and fade the card, whenever the category changes.
  useGSAP(
    () => {
      if (firstRun.current) {
        firstRun.current = false
        return
      }
      // Categories differ in length, which moves every section below this one.
      ScrollTrigger.refresh()
      const mm = gsap.matchMedia()
      mm.add(MOTION_OK, () => {
        gsap.from('[data-dish]', { autoAlpha: 0, y: 14, duration: 0.45, ease: 'power3.out', stagger: 0.025 })
        gsap.from('[data-card]', { autoAlpha: 0, scale: 0.97, duration: 0.5, ease: 'power3.out' })
      })
    },
    { scope: sectionRef, dependencies: [active] },
  )

  // Clicking the dimmed area around the card closes the full-size view.
  useEffect(() => {
    const dialog = dialogRef.current
    const onClick = (e) => e.target === dialog && dialog.close()
    dialog.addEventListener('click', onClick)
    return () => dialog.removeEventListener('click', onClick)
  }, [])

  const onKeyDown = (e) => {
    const count = menu.categories.length
    let next = null
    if (e.key === 'ArrowRight') next = (active + 1) % count
    if (e.key === 'ArrowLeft') next = (active - 1 + count) % count
    if (e.key === 'Home') next = 0
    if (e.key === 'End') next = count - 1
    if (next === null) return
    e.preventDefault()
    setActive(next)
    tabRefs.current[next]?.focus()
  }

  const category = menu.categories[active]

  return (
    <section id="menu" ref={sectionRef} className="py-[clamp(5rem,12vw,10rem)]">
      <div className="container-page grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div data-reveal className="max-lg:order-last lg:sticky lg:top-28 lg:self-start">
          <button
            type="button"
            data-card
            onClick={() => dialogRef.current.showModal()}
            className="group relative block w-full cursor-pointer overflow-hidden rounded-[1.75rem] bg-sand shadow-[0_32px_64px_-40px_rgb(31_11_13/0.5)]"
            aria-label={`View the ${category.name} menu card full size`}
          >
            <img
              key={category.card.src}
              src={category.card.src}
              alt={category.card.alt}
              width="1086"
              height="1448"
              loading="lazy"
              decoding="async"
              className="aspect-[3/4] w-full object-cover transition-transform duration-700 ease-[var(--ease-out-soft)] group-hover:scale-[1.03]"
            />
            <span className="absolute bottom-4 right-4 flex items-center gap-2 rounded-full bg-ink/85 px-4 py-2 text-sm font-semibold text-cream">
              <Maximize2 className="size-4" aria-hidden="true" />
              View full card
            </span>
          </button>
        </div>

        <div>
          <SectionHeading eyebrow={menu.eyebrow} title={menu.title} />
          <p data-reveal className="mt-6 max-w-[48ch] text-moss">
            {menu.note}
          </p>

          <div
            data-reveal
            role="tablist"
            aria-label="Menu categories"
            className="mt-10 flex flex-wrap gap-2"
            onKeyDown={onKeyDown}
          >
            {menu.categories.map((c, i) => (
              <button
                key={c.name}
                ref={(el) => (tabRefs.current[i] = el)}
                type="button"
                role="tab"
                id={`menu-tab-${i}`}
                aria-selected={i === active}
                aria-controls="menu-panel"
                tabIndex={i === active ? 0 : -1}
                onClick={() => setActive(i)}
                className={`min-h-11 cursor-pointer rounded-full border px-5 py-2 text-[0.9375rem] font-semibold transition-colors duration-300 ${
                  i === active ? 'border-ink bg-ink text-cream' : 'border-line text-ink hover:border-ink'
                }`}
              >
                {c.name}
              </button>
            ))}
          </div>

          <div
            data-reveal
            role="tabpanel"
            id="menu-panel"
            aria-labelledby={`menu-tab-${active}`}
            tabIndex={0}
            className="mt-10 space-y-12"
          >
            {category.groups.map((group) => (
              <div key={group.title}>
                <div data-dish className="flex items-end justify-between gap-4 border-b border-ink pb-3">
                  <div>
                    <h3 className="text-[1.75rem] italic text-coral">{group.title}</h3>
                    {group.note && <p className="mt-1 text-sm text-moss">{group.note}</p>}
                  </div>
                  {group.sizes && (
                    <div className="flex shrink-0 gap-4 text-xs font-semibold uppercase tracking-[0.12em] text-moss" aria-hidden="true">
                      {group.sizes.map((size) => (
                        <span key={size} className="w-14 text-right">
                          {size}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <ul>
                  {group.items.map((dish) => (
                    <li key={dish.name} data-dish className="border-b border-line py-3.5">
                      <div className="flex items-baseline gap-3">
                        <p className="font-display text-[1.1875rem] leading-snug">
                          {dish.spicy ? (
                            <>
                              {/* Keep the chilli marker on the same line as the last word. */}
                              {dish.name.slice(0, dish.name.lastIndexOf(' ') + 1)}
                              <span className="whitespace-nowrap">
                                {dish.name.slice(dish.name.lastIndexOf(' ') + 1)}
                                <span className="ml-2 inline-flex translate-y-0.5 items-center text-coral">
                                  <Flame className="size-4" aria-hidden="true" />
                                  <span className="sr-only">Spicy</span>
                                </span>
                              </span>
                            </>
                          ) : (
                            dish.name
                          )}
                        </p>
                        <span className="min-w-4 flex-1 -translate-y-1 border-b border-dotted border-moss/50" aria-hidden="true" />
                        {dish.prices ? (
                          <span className="flex shrink-0 gap-4 font-display text-lg tabular-nums text-coral">
                            {dish.prices.map((p, i) => (
                              <span key={group.sizes[i]} className="w-14 text-right">
                                <span className="sr-only">{group.sizes[i]}: </span>
                                {price(p)}
                              </span>
                            ))}
                          </span>
                        ) : (
                          <span className="shrink-0 font-display text-lg tabular-nums text-coral">{price(dish.price)}</span>
                        )}
                      </div>
                      {dish.text && <p className="mt-1 max-w-[52ch] text-[0.9375rem] text-moss">{dish.text}</p>}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      <dialog
        ref={dialogRef}
        data-lenis-prevent
        aria-label={`${category.name} menu card`}
        className="m-auto max-h-[94dvh] max-w-[min(94vw,56rem)] overflow-auto rounded-2xl bg-cream p-0 backdrop:bg-ink/80"
      >
        <form method="dialog" className="sticky top-0 z-10 flex justify-end p-3">
          <button
            type="submit"
            className="grid size-11 cursor-pointer place-items-center rounded-full bg-ink text-cream"
            aria-label="Close menu card"
          >
            <X aria-hidden="true" />
          </button>
        </form>
        <img src={category.card.src} alt={category.card.alt} className="-mt-[4.25rem] w-full" />
      </dialog>
    </section>
  )
}
