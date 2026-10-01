import { ArrowRight } from 'lucide-react'
import { story } from '../content'
import Photo from './Photo'
import SectionHeading from './SectionHeading'

export default function Story() {
  const [main, inset] = story.photos

  return (
    <section id="story" className="py-[clamp(5rem,12vw,10rem)]">
      <div className="container-page grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <div>
          <SectionHeading eyebrow={story.eyebrow} title={story.title} />
          <div className="mt-8 max-w-[52ch] space-y-5 text-moss">
            {story.paragraphs.map((p) => (
              <p key={p} data-reveal>
                {p}
              </p>
            ))}
          </div>
          <a data-reveal href={story.cta.href} className="btn btn-ghost-dark mt-9">
            {story.cta.label}
            <ArrowRight className="size-4" aria-hidden="true" />
          </a>
        </div>

        <div className="relative pb-[22%] pr-[10%]">
          <div data-reveal>
            <Photo {...main} className="aspect-[4/3]" />
          </div>
          <div data-reveal className="absolute bottom-0 right-0 w-[52%]">
            <Photo {...inset} className="aspect-[4/3] border-8 border-cream" />
          </div>
        </div>
      </div>
    </section>
  )
}
