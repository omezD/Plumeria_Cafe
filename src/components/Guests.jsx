import { useRef } from 'react'
import { Star } from 'lucide-react'
import { gsap, MOTION_OK, useGSAP } from '../lib/gsap'
import { stats, testimonials } from '../content'
import SectionHeading from './SectionHeading'

// `plain` drops the thousands separator, for years.
const format = (n, decimals = 0, plain = false) =>
  n.toLocaleString('en', { minimumFractionDigits: decimals, maximumFractionDigits: decimals, useGrouping: !plain })

export default function Guests() {
  const statsRef = useRef(null)

  // Count each figure up from zero the first time it scrolls into view.
  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(MOTION_OK, () => {
        gsap.utils.toArray('[data-count]').forEach((el) => {
          const end = Number(el.dataset.count)
          const decimals = Number(el.dataset.decimals || 0)
          const plain = 'plain' in el.dataset
          const counter = { value: 0 }
          gsap.to(counter, {
            value: end,
            duration: 1.8,
            ease: 'power2.out',
            onUpdate: () => (el.textContent = format(counter.value, decimals, plain)),
            scrollTrigger: { trigger: el, start: 'top 90%', once: true },
          })
        })
      })
    },
    { scope: statsRef },
  )

  return (
    <section
      id="guests"
      className="bg-[linear-gradient(180deg,var(--color-sand),var(--color-tan))] py-[clamp(5rem,12vw,10rem)]"
    >
      <div className="container-page">
        <SectionHeading eyebrow={testimonials.eyebrow} title={testimonials.title} tone="deep" className="max-w-3xl" />

        <ul className="mt-14 grid gap-6 md:grid-cols-2">
          {testimonials.items.map((item) => (
            <li key={item.name} data-reveal className="flex">
              <figure className="flex w-full flex-col rounded-[1.75rem] border border-gold bg-petal p-8 shadow-[0_24px_48px_-32px_rgb(31_11_13/0.4)] transition-[translate,box-shadow] duration-500 ease-[var(--ease-out-soft)] hover:-translate-y-1.5 hover:shadow-[0_32px_56px_-28px_rgb(31_11_13/0.5)]">
                <div className="flex items-start justify-between gap-4">
                  <span className="font-display text-6xl leading-none text-coral" aria-hidden="true">
                    &ldquo;
                  </span>
                  <p className="flex items-center gap-1.5 rounded-full bg-espresso px-3 py-1 text-sm font-semibold tabular-nums text-cream">
                    <Star className="size-4 fill-yolk text-yolk" aria-hidden="true" />
                    <span className="sr-only">Rated </span>
                    {item.rating.toFixed(1)}
                    <span className="sr-only"> out of 5</span>
                  </p>
                </div>
                <blockquote className="mt-2 flex-1 font-display text-[1.25rem] leading-snug">{item.quote}</blockquote>
                <figcaption className="mt-8 border-t border-line pt-5 text-[0.9375rem]">
                  <span className="font-semibold">{item.name}</span>
                  <span className="block text-moss">{item.detail}</span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>

        <dl
          ref={statsRef}
          data-reveal
          className="mt-[clamp(3rem,6vw,5rem)] grid grid-cols-2 gap-x-6 gap-y-10 rounded-[1.75rem] bg-espresso bg-[radial-gradient(60%_120%_at_100%_0%,rgb(232_181_74/0.18),transparent_60%)] p-[clamp(1.75rem,4vw,3.5rem)] text-cream lg:grid-cols-4"
        >
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={`flex flex-col-reverse ${i > 0 ? 'lg:border-l lg:border-cream/15 lg:pl-8' : ''}`}
            >
              <dt className="mt-2 text-[0.9375rem] text-cream/70">{s.label}</dt>
              <dd className="font-display text-[clamp(2.5rem,5vw,4rem)] leading-none tabular-nums text-gold">
                <span data-count={s.value} data-decimals={s.decimals || 0} data-plain={s.plain ? '' : undefined}>
                  {format(s.value, s.decimals, s.plain)}
                </span>
                <span className="text-yolk">{s.suffix}</span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
