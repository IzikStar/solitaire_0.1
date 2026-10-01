import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';

const SUITS = ['♠︎', '♥︎', '♦︎', '♣︎'];

/** Shown when all four foundations are complete. */
const WinOverlay = ({ moves, onNewGame }) => {
  const root = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.win-panel', { scale: 0.85, opacity: 0, duration: 0.45, ease: 'back.out(1.7)' });
      gsap.from('.win-suit', { y: -24, opacity: 0, duration: 0.5, stagger: 0.08, delay: 0.15, ease: 'bounce.out' });
      // foundation cards take a little bow
      gsap.to(document.querySelectorAll('[data-foundation] .card'), { y: -10, duration: 0.3, stagger: 0.1, yoyo: true, repeat: 3, ease: 'power1.inOut' });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={root} className="fixed inset-0 z-40 flex items-center justify-center bg-black/45 p-4 backdrop-blur-[2px]">
      <div role="dialog" aria-labelledby="win-title" className="win-panel w-full max-w-sm rounded-2xl bg-white p-7 text-center shadow-2xl">
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
        <p className="mt-1 text-slate-600">Solved in {moves} moves.</p>
        <button type="button" onClick={onNewGame} className="btn btn-primary mt-6 w-full justify-center">
          Deal a new game
        </button>
      </div>
    </div>
  );
};

export default WinOverlay;
