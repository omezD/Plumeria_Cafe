import { marquee } from '../content'
import Flower from './Flower'

export default function Marquee() {
  // The list is rendered twice so the -50% translate loops seamlessly.
  const row = (hidden) => (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {marquee.map((text) => (
        <li key={text} className="flex items-center gap-8 pr-8 font-display text-[clamp(1.5rem,3vw,2.5rem)] italic">
          {text}
          <Flower className="size-6 text-coral" />
        </li>
      ))}
    </ul>
  )

  return (
    <div className="overflow-hidden border-y border-line bg-petal py-6">
      <div className="flex w-max animate-[marquee_36s_linear_infinite] hover:[animation-play-state:paused]">
        {row(false)}
        {row(true)}
      </div>
    </div>
  )
}
