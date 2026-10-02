// Small sound helper on the Web Audio API. All clips are fetched and decoded
// up front, and each one starts at its first audible sample, so a click is
// heard right away instead of after the <audio> element loads and buffers.

const FILES = {
  select: '/sounds/selectPieceSound1.wav',
  draw: '/sounds/drawSound1.wav',
  invalid: '/sounds/invalidMoveSound1.wav',
  hint: '/sounds/hintSound1.wav',
  undo: '/sounds/goBackSound1.wav',
  win: '/sounds/winningSound1.wav',
};

const VOLUME = { win: 0.6 };
const SILENCE = 0.02; // amplitude below which a sample counts as silence

let ctx = null;
const clips = {}; // name -> { buffer, offset }

const context = () => {
  if (!ctx) {
    const AudioCtx = typeof window !== 'undefined' && (window.AudioContext || window.webkitAudioContext);
    if (!AudioCtx) return null;
    ctx = new AudioCtx({ latencyHint: 'interactive' });
  }
  return ctx;
};

const firstAudible = (buffer) => {
  const data = buffer.getChannelData(0);
  for (let i = 0; i < data.length; i++) {
    if (Math.abs(data[i]) > SILENCE) return i / buffer.sampleRate;
  }
  return 0;
};

const load = async (name) => {
  const ac = context();
  if (!ac) return;
  const res = await fetch(FILES[name]);
  const buffer = await ac.decodeAudioData(await res.arrayBuffer());
  clips[name] = { buffer, offset: firstAudible(buffer) };
};

/** Fetch and decode every clip. Safe to call more than once. */
let preloading = null;
export const preloadSounds = () => {
  preloading ??= Promise.all(Object.keys(FILES).map((n) => load(n).catch(() => {})));
  return preloading;
};

// Browsers start an AudioContext suspended until the first user gesture.
if (typeof window !== 'undefined') {
  const unlock = () => {
    context()?.resume();
    preloadSounds();
  };
  window.addEventListener('pointerdown', unlock, { once: true, capture: true });
  window.addEventListener('keydown', unlock, { once: true, capture: true });
}

export const playSound = (name) => {
  try {
    const ac = context();
    const clip = clips[name];
    if (!ac || !clip) {
      preloadSounds();
      return;
    }
    if (ac.state === 'suspended') ac.resume();
    const source = ac.createBufferSource();
    const gain = ac.createGain();
    gain.gain.value = VOLUME[name] ?? 0.4;
    source.buffer = clip.buffer;
    source.connect(gain).connect(ac.destination);
    source.start(0, clip.offset);
  } catch {
    // sound is a nice-to-have
  }
};
