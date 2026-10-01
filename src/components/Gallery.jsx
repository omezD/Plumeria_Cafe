import { gallery } from '../content'
import SectionHeading from './SectionHeading'

export default function Gallery() {
  return (
    <section id="gallery" className="bg-petal py-[clamp(5rem,10vw,8rem)]">
      <div className="container-page">
        <SectionHeading eyebrow={gallery.eyebrow} title={gallery.title} className="max-w-3xl" />

        {/* Tiles are capped at the photos' native width (215px) so they stay sharp. */}
        <ul className="mt-14 flex flex-wrap justify-center gap-4">
          {gallery.photos.map((photo) => (
            <li key={photo.src} data-reveal className="w-[calc(50%-0.5rem)] sm:w-[200px]">
              <div className="group overflow-hidden rounded-[1.25rem] bg-sand shadow-[0_18px_36px_-24px_rgb(31_11_13/0.45)]">
                <img
                  src={photo.src}
                  alt={photo.alt}
                  width="215"
                  height="280"
                  loading="lazy"
                  decoding="async"
                  className="aspect-[43/56] w-full object-cover transition-transform duration-700 ease-[var(--ease-out-soft)] group-hover:scale-[1.07]"
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
