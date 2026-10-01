// Tiny sound helper built on HTMLAudioElement (replaces the p5.sound setup,
// which needed p5 from a CDN and created a new p5 instance per click).

const FILES = {
  select: '/sounds/selectPieceSound1.wav',
  draw: '/sounds/drawSound1.wav',
  invalid: '/sounds/invalidMoveSound1.wav',
  hint: '/sounds/hintSound1.wav',
  undo: '/sounds/goBackSound1.wav',
  win: '/sounds/winningSound1.wav',
};

const cache = {};

export const playSound = (name) => {
  const src = FILES[name];
  if (!src || typeof Audio === 'undefined') return;
  try {
    cache[name] ??= new Audio(src);
    const audio = cache[name];
    audio.currentTime = 0;
    audio.volume = name === 'win' ? 0.6 : 0.4;
    // play() rejects if the browser blocks autoplay; sound is optional
    audio.play()?.catch(() => {});
  } catch {
    // ignore: sound is a nice-to-have
  }
};
