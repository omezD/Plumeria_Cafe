import { brand, footer, hours, nav } from '../content'

export default function Footer() {
  return (
    <footer className="overflow-hidden border-t border-gold/20 bg-ink pt-[clamp(4rem,8vw,6rem)] text-cream">
      <div className="container-page grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <img
            src={brand.logo}
            alt={`${brand.name} — ${brand.descriptor}`}
            width="112"
            height="112"
            loading="lazy"
            className="size-28 rounded-full ring-1 ring-cream/20"
          />
          <p className="mt-5 max-w-[34ch] text-cream/75">{footer.blurb}</p>
        </div>

        <nav aria-label="Footer">
          <h2 className="font-sans text-xs font-semibold uppercase tracking-[0.18em] text-yolk">Explore</h2>
          <ul className="mt-5 space-y-1">
            {nav.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="link-draw inline-block py-1.5">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="font-sans text-xs font-semibold uppercase tracking-[0.18em] text-yolk">Find us</h2>
          <p className="mt-5 text-cream/75">{hours.address}</p>
          <ul className="mt-4 space-y-1">
            <li>
              <a href={hours.phoneHref} className="link-draw inline-block py-1.5">
                {hours.phone}
              </a>
            </li>
            {footer.socials.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noreferrer" className="link-draw inline-block py-1.5">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <p className="container-page mt-16 border-t border-cream/15 py-6 text-sm text-cream/60">
        © {new Date().getFullYear()} {brand.name}. All rights reserved.
      </p>

      <p
        data-wordmark
        aria-hidden="true"
        className="-mb-[0.22em] select-none text-center font-display text-[clamp(5rem,24vw,22rem)] leading-none tracking-[-0.04em] text-cream/10"
      >
        {brand.name}
      </p>
    </footer>
  )
}
