import { useRef, useState } from 'react'
import { Check, Mail, MessageCircle, Phone } from 'lucide-react'
import { contact } from '../content'
import SectionHeading from './SectionHeading'

function validate(values) {
  const errors = {}
  if (!values.name.trim()) errors.name = 'Please tell us your name.'
  if (!values.query.trim()) errors.query = 'Write your question or request so we know how to help.'
  return errors
}

// The message the visitor will see pre-filled in WhatsApp.
function buildMessage(values) {
  return [
    `Hello ${contact.businessName}!`,
    `Name: ${values.name.trim()}`,
    values.address.trim() && `Address: ${values.address.trim()}`,
    `Query: ${values.query.trim()}`,
  ]
    .filter(Boolean)
    .join('\n')
}

function Field({ id, label, error, children }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-[0.9375rem] font-semibold">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-sm font-medium text-coral-deep">
          {error}
        </p>
      )}
    </div>
  )
}

export default function Contact() {
  const formRef = useRef(null)
  const [errors, setErrors] = useState({})
  const [sent, setSent] = useState(false)

  const whatsappUrl = `https://wa.me/${contact.whatsapp}`

  const methods = [
    { icon: Phone, label: 'Call us', value: contact.phone, href: contact.phoneHref },
    { icon: MessageCircle, label: 'WhatsApp', value: contact.whatsappDisplay, href: whatsappUrl, external: true },
    contact.email && { icon: Mail, label: 'Email', value: contact.email, href: `mailto:${contact.email}` },
  ].filter(Boolean)

  const fieldProps = (id) => ({
    id,
    name: id,
    className: 'field',
    'aria-invalid': errors[id] ? 'true' : undefined,
    'aria-describedby': errors[id] ? `${id}-error` : undefined,
  })

  const onSubmit = (e) => {
    e.preventDefault()
    const values = Object.fromEntries(new FormData(e.currentTarget))
    const found = validate(values)
    setErrors(found)
    const firstInvalid = Object.keys(found)[0]
    if (firstInvalid) {
      formRef.current?.elements[firstInvalid]?.focus()
      return
    }
    // Hands the message to WhatsApp; the visitor presses send there.
    window.open(`${whatsappUrl}?text=${encodeURIComponent(buildMessage(values))}`, '_blank', 'noopener')
    setSent(true)
  }

  return (
    <section id="contact" className="relative overflow-hidden bg-ink py-[clamp(5rem,12vw,10rem)] text-cream">
      {/* The café interior, dimmed, so the contact card sits "inside" the room. */}
      <img
        src={contact.background}
        alt=""
        loading="lazy"
        decoding="async"
        className="absolute inset-0 size-full object-cover"
      />
      <div
        className="absolute inset-0 bg-[linear-gradient(100deg,rgb(31_11_13/0.94)_20%,rgb(31_11_13/0.72))]"
        aria-hidden="true"
      />

      <div className="container-page relative grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div>
          <SectionHeading eyebrow={contact.eyebrow} title={contact.title} tone="light" />
          <p data-reveal className="mt-6 max-w-[44ch] text-cream/80">
            {contact.text}
          </p>

          <ul className="mt-10 border-t border-cream/20">
            {methods.map(({ icon: Icon, label, value, href, external }) => (
              <li key={label} data-reveal className="border-b border-cream/20">
                <a
                  href={href}
                  {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
                  className="group flex items-center gap-5 py-5"
                >
                  <span className="grid size-12 shrink-0 place-items-center rounded-full bg-yolk/15 text-yolk ring-1 ring-yolk/30 transition-colors duration-300 group-hover:bg-yolk group-hover:text-ink">
                    <Icon className="size-5" strokeWidth={1.75} aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block text-xs font-semibold uppercase tracking-[0.16em] text-cream/70">
                      {label}
                    </span>
                    <span className="font-display text-[1.5rem] leading-tight text-gold [overflow-wrap:anywhere]">
                      {value}
                    </span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div
          data-reveal
          className="rounded-[1.75rem] bg-cream p-[clamp(1.5rem,4vw,2.75rem)] text-ink shadow-[0_40px_80px_-32px_rgb(0_0_0/0.7)] ring-1 ring-gold/60"
        >
          {sent ? (
            <div role="status" className="flex min-h-[22rem] flex-col items-start justify-center">
              <span className="grid size-14 place-items-center rounded-full bg-espresso text-cream">
                <Check className="size-7" aria-hidden="true" />
              </span>
              <h3 className="mt-6 text-3xl">Almost there.</h3>
              <p className="mt-3 max-w-[40ch] text-moss">
                WhatsApp has opened with your message filled in. Press send there and we will reply as soon as we
                can. If nothing opened, message us directly on {contact.whatsappDisplay}.
              </p>
              <button type="button" className="btn btn-ghost-dark mt-8" onClick={() => setSent(false)}>
                Write another message
              </button>
            </div>
          ) : (
            <form ref={formRef} noValidate onSubmit={onSubmit} className="grid gap-5">
              <Field id="name" label="Your name" error={errors.name}>
                <input {...fieldProps('name')} type="text" autoComplete="name" required />
              </Field>
              <Field id="address" label="Address (optional)">
                <input {...fieldProps('address')} type="text" autoComplete="street-address" />
              </Field>
              <Field id="query" label="Your query" error={errors.query}>
                <textarea {...fieldProps('query')} rows="4" required />
              </Field>
              <button type="submit" className="btn btn-primary">
                <MessageCircle className="size-4" aria-hidden="true" />
                Send on WhatsApp
              </button>
              <p className="text-sm text-moss">Opens WhatsApp with your message ready to send to us.</p>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
