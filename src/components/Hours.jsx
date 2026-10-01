import { MapPin, Phone } from 'lucide-react'
import { hero, hours } from '../content'
import Flower from './Flower'
import SectionHeading from './SectionHeading'

export default function Hours() {
  return (
    <section id="hours" className="relative overflow-hidden bg-espresso py-[clamp(5rem,10vw,8rem)] text-cream">
      <Flower
        outline
        className="pointer-events-none absolute -right-40 -top-40 size-[42rem] animate-[spin-slow_120s_linear_infinite] text-cream/25"
      />

      <div className="container-page relative grid gap-14 lg:grid-cols-2 lg:gap-20">
        <div>
          <SectionHeading eyebrow={hours.eyebrow} title={hours.title} tone="light" />
          <ul data-reveal className="mt-10 space-y-4 text-cream/85">
            <li className="flex items-start gap-3">
              <MapPin className="mt-1 size-5 shrink-0 text-yolk" aria-hidden="true" />
              <a href={hours.mapUrl} target="_blank" rel="noreferrer" className="link-draw max-w-[34ch]">
                {hours.address}
                <span className="sr-only"> (opens Google Maps in a new tab)</span>
              </a>
            </li>
            <li className="flex items-start gap-3">
              <Phone className="mt-1 size-5 shrink-0 text-yolk" aria-hidden="true" />
              <a href={hours.phoneHref} className="link-draw">
                {hours.phone}
              </a>
            </li>
          </ul>
          <a data-reveal href={hero.primaryCta.href} className="btn mt-10 bg-cream text-ink hover:bg-yolk">
            {hero.primaryCta.label}
          </a>
        </div>

        <div className="self-end">
          <dl className="border-t border-cream/25">
            {hours.rows.map((row) => (
              <div
                key={row.days}
                data-reveal
                className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-1 border-b border-cream/25 py-6"
              >
                <dt className="font-display text-[clamp(1.375rem,2.4vw,2rem)]">{row.days}</dt>
                <dd className="tabular-nums text-cream/85">{row.time}</dd>
              </div>
            ))}
          </dl>
          <p data-reveal className="mt-4 text-sm text-cream/70">
            {hours.note}
          </p>
        </div>
      </div>
    </section>
  )
}
