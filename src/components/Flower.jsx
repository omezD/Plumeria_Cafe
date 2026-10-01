const PETAL = 'M0 0C14-8 20-30 0-44C-12-30-8-10 0 0Z'
const ANGLES = [0, 72, 144, 216, 288]

// The five-petal plumeria mark. `outline` draws it as a hairline for
// large decorative use; otherwise it is filled with currentColor.
export default function Flower({ className = '', outline = false, centre = true }) {
  return (
    <svg viewBox="-50 -50 100 100" className={className} aria-hidden="true" focusable="false">
      <g
        fill={outline ? 'none' : 'currentColor'}
        stroke={outline ? 'currentColor' : 'none'}
        strokeWidth={outline ? 0.2 : 0}
      >
        {ANGLES.map((a) => (
          <path key={a} d={PETAL} transform={`rotate(${a})`} />
        ))}
      </g>
      {centre && !outline && <circle r="6" className="fill-yolk" />}
    </svg>
  )
}
