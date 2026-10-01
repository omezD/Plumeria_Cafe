// Heading whose words rise into place on scroll (animated from App.jsx via
// the [data-split] / [data-word] hooks). Screen readers get the plain text.
// Eyebrow colour by the surface it sits on: cream (dark), tan (deep), espresso (light).
const EYEBROW = { dark: 'text-coral', deep: 'text-coral-deep', light: 'text-yolk' }

export default function SectionHeading({ eyebrow, title, className = '', tone = 'dark' }) {
  return (
    <div className={className}>
      {eyebrow && (
        <p data-reveal className={`eyebrow mb-5 ${EYEBROW[tone]}`}>
          {eyebrow}
        </p>
      )}
      <h2 data-split className="text-[clamp(2rem,4.6vw,3.75rem)]">
        <span className="sr-only">{title}</span>
        <span aria-hidden="true">
          {title.split(' ').map((word, i) => (
            <span key={i} className="-mb-[0.14em] inline-block overflow-hidden pb-[0.14em] align-bottom">
              <span data-word className="inline-block">
                {word}&nbsp;
              </span>
            </span>
          ))}
        </span>
      </h2>
    </div>
  )
}
