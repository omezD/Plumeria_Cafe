import { Clock, MapPin, Navigation } from 'lucide-react'
import { hours, location } from '../content'
import SectionHeading from './SectionHeading'

export default function Location() {
  return (
    <section id="location" className="py-[clamp(5rem,12vw,10rem)]">
      <div className="container-page grid items-center gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div>
          <SectionHeading eyebrow={location.eyebrow} title={location.title} />

          <ul data-reveal className="mt-8 space-y-5">
            <li className="flex items-start gap-4">
              <MapPin className="mt-1 size-5 shrink-0 text-coral" aria-hidden="true" />
              <span className="max-w-[34ch]">{hours.address}</span>
            </li>
            <li className="flex items-start gap-4">
              <Clock className="mt-1 size-5 shrink-0 text-coral" aria-hidden="true" />
              <span>
                {hours.rows[0].days}, {hours.rows[0].time}
              </span>
            </li>
          </ul>

          <div data-reveal className="mt-9 flex flex-wrap gap-3">
            <a href={location.directionsUrl} target="_blank" rel="noreferrer" className="btn btn-primary">
              <Navigation className="size-4" aria-hidden="true" />
              Get directions
              <span className="sr-only"> (opens Google Maps in a new tab)</span>
            </a>
            <a href={hours.mapUrl} target="_blank" rel="noreferrer" className="btn btn-ghost-dark">
              Open in Google Maps
              <span className="sr-only"> (new tab)</span>
            </a>
          </div>
        </div>

        <div
          data-reveal
          className="overflow-hidden rounded-[1.75rem] bg-sand shadow-[0_32px_64px_-40px_rgb(31_11_13/0.5)] ring-1 ring-gold"
        >
          <iframe
            src={location.embedUrl}
            title={`Map showing ${location.placeName}`}
            loading="lazy"
            sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            className="block aspect-[4/3] w-full border-0 max-sm:aspect-square"
          />
        </div>
      </div>
    </section>
  )
}
