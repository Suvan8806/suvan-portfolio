// Synthesized HUD audio (Web Audio API): UI blips plus a quiet ambient synth hum.
// No audio files are shipped. Sound is opt-in; the AudioContext is only created
// after the visitor turns sound on, and it is suspended while the tab is hidden.

const STORAGE_KEY = "sk-sound";
const MASTER_VOLUME = 0.6;
const AMBIENT_VOLUME = 0.05;
const AMBIENT_FADE_IN_S = 2.5;
const AMBIENT_FADE_OUT_S = 0.4;

type Listener = () => void;
type Ambient = { stop: () => void };

let ctx: AudioContext | null = null;
let master: GainNode | null = null;
let ambient: Ambient | null = null;
let enabled: boolean | null = null;
const listeners = new Set<Listener>();

function readStored(): boolean {
  try {
    return window.localStorage.getItem(STORAGE_KEY) === "on";
  } catch {
    return false;
  }
}

function writeStored(on: boolean) {
  try {
    window.localStorage.setItem(STORAGE_KEY, on ? "on" : "off");
  } catch {
    // Storage blocked (private mode etc.): the toggle still works for this visit.
  }
}

export function isSoundEnabled(): boolean {
  if (typeof window === "undefined") return false;
  if (enabled === null) enabled = readStored();
  return enabled;
}

export function subscribeSound(listener: Listener): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getContext(): AudioContext | null {
  if (ctx) return ctx;
  if (typeof window === "undefined" || !window.AudioContext) return null;
  ctx = new window.AudioContext();
  master = ctx.createGain();
  master.gain.value = MASTER_VOLUME;
  master.connect(ctx.destination);
  return ctx;
}

/** Low detuned saw drone through a slowly sweeping low-pass filter. */
function startAmbient(c: AudioContext, out: AudioNode): Ambient {
  const gain = c.createGain();
  gain.gain.setValueAtTime(0, c.currentTime);
  gain.gain.linearRampToValueAtTime(AMBIENT_VOLUME, c.currentTime + AMBIENT_FADE_IN_S);

  const filter = c.createBiquadFilter();
  filter.type = "lowpass";
  filter.frequency.value = 320;
  filter.Q.value = 6;

  const lfo = c.createOscillator();
  const lfoDepth = c.createGain();
  lfo.frequency.value = 0.07;
  lfoDepth.gain.value = 160;
  lfo.connect(lfoDepth).connect(filter.frequency);

  const voices = [
    { freq: 55, type: "sawtooth" as const },
    { freq: 55.4, type: "sawtooth" as const },
    { freq: 82.5, type: "triangle" as const },
  ].map(({ freq, type }) => {
    const osc = c.createOscillator();
    osc.type = type;
    osc.frequency.value = freq;
    osc.connect(filter);
    osc.start();
    return osc;
  });

  lfo.start();
  filter.connect(gain).connect(out);

  return {
    stop() {
      const t = c.currentTime;
      gain.gain.cancelScheduledValues(t);
      gain.gain.setValueAtTime(gain.gain.value, t);
      gain.gain.linearRampToValueAtTime(0, t + AMBIENT_FADE_OUT_S);
      [...voices, lfo].forEach((osc) => osc.stop(t + AMBIENT_FADE_OUT_S + 0.05));
    },
  };
}

/** Resume audio (needs a user gesture) and start the ambient hum if sound is on. */
export async function wakeSound(): Promise<void> {
  if (!isSoundEnabled()) return;
  const c = getContext();
  if (!c || !master) return;
  if (c.state === "suspended") await c.resume();
  if (!ambient) ambient = startAmbient(c, master);
}

/** Pause all audio processing (e.g. while the tab is hidden). */
export function suspendSound() {
  if (ctx && ctx.state === "running") void ctx.suspend();
}

function tone(
  freq: number,
  endFreq: number,
  duration: number,
  type: OscillatorType,
  peak: number,
  delay = 0,
) {
  const c = ctx;
  if (!isSoundEnabled() || !c || !master || c.state !== "running") return;
  const t = c.currentTime + delay;
  const osc = c.createOscillator();
  const gain = c.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, t);
  osc.frequency.exponentialRampToValueAtTime(endFreq, t + duration);
  gain.gain.setValueAtTime(0.0001, t);
  gain.gain.exponentialRampToValueAtTime(peak, t + 0.005);
  gain.gain.exponentialRampToValueAtTime(0.0001, t + duration);
  osc.connect(gain).connect(master);
  osc.start(t);
  osc.stop(t + duration + 0.02);
}

/** Tiny high tick for hovering interactive elements. */
export function playHover() {
  tone(2400, 1800, 0.03, "square", 0.02);
}

/** Rising two-step chirp for clicks and selections. */
export function playSelect() {
  tone(660, 990, 0.07, "triangle", 0.12);
  tone(1320, 1760, 0.08, "square", 0.035, 0.05);
}

export async function setSoundEnabled(on: boolean): Promise<void> {
  enabled = on;
  writeStored(on);
  listeners.forEach((listener) => listener());
  if (on) {
    await wakeSound();
    playSelect();
    return;
  }
  ambient?.stop();
  ambient = null;
  window.setTimeout(() => {
    if (!isSoundEnabled()) suspendSound();
  }, (AMBIENT_FADE_OUT_S + 0.2) * 1000);
}
