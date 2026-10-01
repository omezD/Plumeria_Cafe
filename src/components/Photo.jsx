import Flower from './Flower'

// Renders a photo with a gentle scroll parallax. Until a `src` is set in
// content.js it shows a labelled placeholder tile of the same size.
export default function Photo({ src, alt, label, className = '' }) {
  return (
    <div className={`relative overflow-hidden rounded-[1.75rem] bg-sand ${className}`}>
      {src ? (
        <img
          data-parallax
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          className="absolute inset-x-0 -top-[10%] h-[120%] w-full object-cover"
        />
      ) : (
        <div
          role="img"
          aria-label={`${alt} (placeholder)`}
          className="absolute inset-0 bg-[radial-gradient(120%_90%_at_20%_10%,var(--color-blush),transparent_60%),radial-gradient(90%_80%_at_90%_100%,var(--color-yolk),transparent_55%)] opacity-90"
        >
          <div data-parallax className="absolute inset-x-0 -top-[10%] grid h-[120%] place-items-center">
            <Flower className="w-2/5 text-petal drop-shadow-[0_12px_30px_rgb(31_11_13/0.12)]" />
          </div>
          <span className="absolute bottom-4 left-5 text-xs font-semibold uppercase tracking-[0.16em] text-ink/70">
            {label}
          </span>
        </div>
      )}
    </div>
  )
}
