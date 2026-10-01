import {
  Accessibility,
  CakeSlice,
  Car,
  Coffee,
  CreditCard,
  Music,
  ShoppingBag,
  Users,
  Utensils,
} from 'lucide-react'
import { features } from '../content'
import Flower from './Flower'
import SectionHeading from './SectionHeading'

const icons = {
  coffee: Coffee,
  cake: CakeSlice,
  music: Music,
  bag: ShoppingBag,
  utensils: Utensils,
  users: Users,
  accessibility: Accessibility,
  car: Car,
  card: CreditCard,
}

export default function Features() {
  return (
    <section className="relative overflow-hidden bg-espresso py-[clamp(5rem,10vw,8rem)] text-cream">
      {/* Warm glow, like the café's own lighting. */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_55%_at_88%_0%,rgb(232_181_74/0.18),transparent_65%),radial-gradient(60%_50%_at_0%_100%,rgb(184_69_44/0.16),transparent_60%)]"
        aria-hidden="true"
      />
      <Flower
        outline
        className="pointer-events-none absolute -bottom-48 -left-48 size-[36rem] animate-[spin-slow_140s_linear_infinite] text-gold/20"
      />

      <div className="container-page relative">
        <SectionHeading eyebrow={features.eyebrow} title={features.title} tone="light" className="max-w-3xl" />

        <ul className="mt-14 grid gap-5 md:grid-cols-3">
          {features.items.map((item) => {
            const Icon = icons[item.icon]
            return (
              <li
                key={item.title}
                data-reveal
                className="group rounded-[1.75rem] border border-gold/20 bg-cream/[0.04] p-8 transition-[background-color,border-color,translate] duration-500 ease-[var(--ease-out-soft)] hover:-translate-y-1.5 hover:border-yolk/60 hover:bg-cream/[0.08]"
              >
                <span className="grid size-14 place-items-center rounded-full bg-yolk/15 text-yolk ring-1 ring-yolk/30 transition-colors duration-300 group-hover:bg-yolk group-hover:text-ink">
                  <Icon className="size-6" strokeWidth={1.5} aria-hidden="true" />
                </span>
                <h3 className="mt-7 text-2xl text-gold">{item.title}</h3>
                <p className="mt-3 max-w-[36ch] text-cream/75">{item.text}</p>
              </li>
            )
          })}
        </ul>

        <div data-reveal className="mt-8 rounded-[1.75rem] border border-gold/20 bg-ink/50 p-[clamp(1.5rem,4vw,3rem)]">
          <h3 className="text-[1.75rem] text-gold">{features.detailsTitle}</h3>
          <ul className="mt-8 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {features.details.map((detail) => {
              const Icon = icons[detail.icon]
              return (
                <li key={detail.title} className="flex gap-4">
                  <Icon className="mt-0.5 size-6 shrink-0 text-yolk" strokeWidth={1.5} aria-hidden="true" />
                  <div>
                    <h4 className="font-semibold">{detail.title}</h4>
                    <ul className="mt-2 space-y-1 text-[0.9375rem] text-cream/70">
                      {detail.list.map((entry) => (
                        <li key={entry}>{entry}</li>
                      ))}
                    </ul>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </section>
  )
}
