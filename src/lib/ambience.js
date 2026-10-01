// Background music. Two players with the same play()/pause() shape:
//  - createFilePlayer: loops an audio file (set `music.src` in content.js)
//  - createAmbience:   a soft café loop generated in the browser, so the site
//                      needs no audio file and has no licensing to worry about.

const BAR = 4 // seconds per chord

// Cmaj7 – Am7 – Fmaj7 – G6, voiced close together so the changes are gentle.
const CHORDS = [
  [261.63, 329.63, 392.0, 493.88],
  [220.0, 261.63, 329.63, 392.0],
  [174.61, 220.0, 261.63, 329.63],
  [196.0, 246.94, 293.66, 329.63],
]

// C major pentatonic, one octave up: any of these sits well over every chord.
const SCALE = [523.25, 587.33, 659.25, 783.99, 880.0]

// [beat within the bar (0-4), index into SCALE] — an 8-bar phrase, mostly space.
const MELODY = [
  [[0, 2], [1.5, 4], [3, 3]],
  [[0.5, 1], [2, 2]],
  [[0, 0], [1, 2], [2.5, 4]],
  [[1, 3], [3, 1]],
  [[0, 4], [1.5, 3], [2.5, 2]],
  [[0.5, 2], [2, 0]],
  [[0, 1], [1.5, 2], [3, 4]],
  [[1, 3]],
]

export function createFilePlayer(src, volume = 0.35) {
  const audio = new Audio(src)
  audio.loop = true
  audio.volume = volume
  return {
    play: () => audio.play().catch(() => {}),
    pause: () => audio.pause(),
  }
}

export function createAmbience(volume = 0.75) {
  let ctx, master, wet, timer
  let nextBar = 0
  let bar = 0

  function setup() {
    ctx = new AudioContext()
    master = ctx.createGain()
    master.gain.value = 0

    // Low-pass keeps everything mellow; the compressor stops chords stacking up too loud.
    const tone = ctx.createBiquadFilter()
    tone.type = 'lowpass'
    tone.frequency.value = 1800
    const limiter = ctx.createDynamicsCompressor()
    master.connect(tone).connect(limiter).connect(ctx.destination)

    // A quiet echo so melody notes trail off instead of stopping dead.
    const delay = ctx.createDelay(1)
    delay.delayTime.value = 0.375
    const feedback = ctx.createGain()
    feedback.gain.value = 0.32
    wet = ctx.createGain()
    wet.gain.value = 0.5
    wet.connect(delay)
    delay.connect(feedback).connect(delay)
    delay.connect(master)
  }

  // One oscillator with a volume envelope: fade in over `attack`, out by `end`.
  function voice(type, freq, start, end, peak, attack, out = master) {
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type = type
    osc.frequency.value = freq
    gain.gain.setValueAtTime(0.0001, start)
    gain.gain.exponentialRampToValueAtTime(peak, start + attack)
    gain.gain.exponentialRampToValueAtTime(0.0001, end)
    osc.connect(gain).connect(out)
    osc.start(start)
    osc.stop(end + 0.05)
  }

  function scheduleBar(index, start) {
    const chord = CHORDS[index % CHORDS.length]
    // Pad: slow swell, overlapping the next bar so chords melt into each other.
    chord.forEach((freq, i) => {
      voice('triangle', freq, start, start + BAR + 1.5, 0.045, 1.4)
      voice('sine', freq * 1.003, start, start + BAR + 1.5, 0.03, 1.8 + i * 0.1)
    })
    // Bass: the chord's root an octave down.
    voice('sine', chord[0] / 2, start, start + BAR + 0.5, 0.11, 0.3)
    // Melody: short bell-like notes, sent through the echo as well.
    MELODY[index % MELODY.length].forEach(([beat, note]) => {
      const at = start + beat
      voice('sine', SCALE[note], at, at + 1.6, 0.06, 0.02)
      voice('sine', SCALE[note], at, at + 1.6, 0.03, 0.02, wet)
    })
  }

  function tick() {
    while (nextBar < ctx.currentTime + 1) {
      scheduleBar(bar++, nextBar)
      nextBar += BAR
    }
  }

  return {
    play() {
      if (!ctx) setup()
      ctx.resume()
      nextBar = Math.max(nextBar, ctx.currentTime + 0.1)
      tick()
      clearInterval(timer)
      timer = setInterval(tick, 250)
      master.gain.cancelScheduledValues(ctx.currentTime)
      master.gain.setTargetAtTime(volume, ctx.currentTime, 0.6)
    },
    pause() {
      if (!ctx) return
      clearInterval(timer)
      master.gain.cancelScheduledValues(ctx.currentTime)
      master.gain.setTargetAtTime(0, ctx.currentTime, 0.12)
      // Let the fade finish, then stop the audio clock so nothing runs in the background.
      setTimeout(() => master.gain.value < 0.01 && ctx.suspend(), 700)
    },
    // Exposed for checks: 'running' while music is playing.
    get state() {
      return ctx ? ctx.state : 'idle'
    },
  }
}
