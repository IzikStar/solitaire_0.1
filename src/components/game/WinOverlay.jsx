import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';

const SUITS = ['♠︎', '♥︎', '♦︎', '♣︎'];
const SCALE = 1.15;
const MAX_TILT = 25; // degrees

// Every card on the board drifts to a random spot, again and again, the way
// the original version celebrated a win, but each target is kept inside the
// visible window so no card flies off screen.
const scatterCards = (cards) => {
  cards.forEach((card) => {
    const r = card.getBoundingClientRect();
    // room for the card's scaled, rotated bounding box around its centre
    const sin = Math.sin((MAX_TILT * Math.PI) / 180);
    const cos = Math.cos((MAX_TILT * Math.PI) / 180);
    const padX = ((r.width * cos + r.height * sin) * SCALE - r.width) / 2 + 6;
    const padY = ((r.height * cos + r.width * sin) * SCALE - r.height) / 2 + 6;
    const minX = -r.left + padX;
    const maxX = window.innerWidth - r.right - padX;
    const minY = -r.top + padY;
    const maxY = window.innerHeight - r.bottom - padY;
    gsap.to(card, {
      x: () => gsap.utils.random(minX, Math.max(minX, maxX)),
      y: () => gsap.utils.random(minY, Math.max(minY, maxY)),
      rotation: () => gsap.utils.random(-MAX_TILT, MAX_TILT),
      scale: SCALE,
      zIndex: 30,
      duration: () => gsap.utils.random(2.2, 3.6),
      ease: 'power2.inOut',
      repeat: -1,
      repeatRefresh: true,
      delay: gsap.utils.random(0, 0.6),
    });
  });
};

/** Shown when all four foundations are complete. */
const WinOverlay = ({ moves, onNewGame }) => {
  const root = useRef(null);

  useLayoutEffect(() => {
    const cards = gsap.utils.toArray('[data-card]');
    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    const ctx = gsap.context(() => {
      gsap.from('.win-panel', { scale: 0.85, opacity: 0, duration: 0.45, delay: 0.6, ease: 'back.out(1.7)' });
      gsap.from('.win-suit', { y: -24, opacity: 0, duration: 0.5, stagger: 0.08, delay: 0.75, ease: 'bounce.out' });
      if (!reduced) scatterCards(cards);
    });
    return () => {
      ctx.revert();
      // put every card back exactly; React reuses some card elements in the next deal
      gsap.killTweensOf(cards);
      gsap.set(cards, { clearProps: 'transform,translate,rotate,scale,zIndex' });
    };
  }, []);

  return (
    <div ref={root} className="pointer-events-none fixed inset-0 z-40 flex items-center justify-center bg-black/25 p-4">
      <div role="dialog" aria-labelledby="win-title" className="win-panel pointer-events-auto w-full max-w-sm rounded-2xl bg-white/95 p-7 text-center shadow-2xl">
        <div className="mb-3 flex justify-center gap-3 text-3xl" aria-hidden="true">
          {SUITS.map((s, i) => (
            <span key={s} className={`win-suit ${i === 1 || i === 2 ? 'text-[#c4262e]' : 'text-slate-900'}`}>
              {s}
            </span>
          ))}
        </div>
        <h2 id="win-title" className="text-2xl font-bold text-slate-900">
          You won!
        </h2>
        <p className="mt-1 text-slate-600">Solved in {moves} {moves === 1 ? 'move' : 'moves'}.</p>
        <button type="button" onClick={onNewGame} className="btn btn-primary mt-6 w-full justify-center">
          Deal a new game
        </button>
      </div>
    </div>
  );
};

export default WinOverlay;
