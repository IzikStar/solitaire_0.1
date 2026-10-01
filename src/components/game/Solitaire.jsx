import { useLayoutEffect, useRef, useState } from 'react';
import Jackpot from './Jackpot';
import FinalStack from './FinalStack';
import GameStack from './GameStack';
import WinOverlay from './WinOverlay';

const HEADER_AND_FOOTER = 112; // top bar + footer + padding, in px

// Card size follows the board width (7 columns) and, on short screens, the
// window height; long tableau columns are squeezed to fit what is left.
const useMetrics = () => {
  const ref = useRef(null);
  const [size, setSize] = useState({ width: 0, height: typeof window === 'undefined' ? 800 : window.innerHeight });

  useLayoutEffect(() => {
    const el = ref.current;
    const update = () => setSize({ width: el.clientWidth, height: window.innerHeight });
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    window.addEventListener('resize', update);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', update);
    };
  }, []);

  const gap = Math.round(Math.min(18, Math.max(5, size.width * 0.018)));
  const byWidth = (size.width - 6 * gap) / 7;
  const byHeight = (size.height - HEADER_AND_FOOTER) / 4.2;
  const cw = Math.max(40, Math.floor(Math.min(112, byWidth, byHeight)));
  const ch = Math.round(cw * 1.4);
  const corner = Math.max(11, cw * 0.2);
  const tableauHeight = Math.max(ch * 2.4, size.height - HEADER_AND_FOOTER - ch - gap * 2);
  return {
    ref,
    gap,
    cw,
    ch,
    corner,
    hiddenOffset: Math.max(5, Math.round(ch * 0.075)),
    openOffset: Math.round(Math.max(corner * 1.6 + 6, ch * 0.24)),
    minOpenOffset: Math.round(corner * 1.35 + 4),
    tableauHeight,
  };
};

const Solitaire = ({ game }) => {
  const { state, status, hint, won, moves, playCard, dropCard, draw, newGame } = game;
  const metrics = useMetrics();

  const vars = {
    '--cw': `${metrics.cw}px`,
    '--ch': `${metrics.ch}px`,
    '--gap': `${metrics.gap}px`,
    '--corner': `${metrics.corner}px`,
    '--radius': `${Math.max(5, Math.round(metrics.cw * 0.08))}px`,
  };

  return (
    <main className="mx-auto w-full max-w-[880px] px-2.5 pt-3 sm:px-4 sm:pt-5">
      <div ref={metrics.ref} style={vars} className="relative">
        {!state ? (
          <div className="flex h-64 items-center justify-center text-emerald-50/80">
            Shuffling…
          </div>
        ) : (
          <>
            <section className="flex" style={{ gap: metrics.gap }} aria-label="Stock and foundations">
              <Jackpot stock={state.getJackpot()} hint={hint} onDraw={draw} onPlay={playCard} />
              <div style={{ width: metrics.cw }} className="shrink-0" />
              {state.getPiles().map((pile, i) => (
                <FinalStack
                  key={i}
                  index={i}
                  cards={pile}
                  state={state}
                  hint={hint}
                  onPlay={playCard}
                  onDrop={dropCard}
                />
              ))}
            </section>
            <section className="flex items-start" style={{ gap: metrics.gap, marginTop: metrics.gap * 1.6 }} aria-label="Tableau">
              {state.getStacks().map((stack, i) => (
                <GameStack
                  key={i}
                  index={i}
                  stack={stack}
                  state={state}
                  metrics={metrics}
                  hint={hint}
                  onPlay={playCard}
                  onDrop={dropCard}
                />
              ))}
            </section>
            {status === 'loading' && <div className="absolute inset-0 rounded-xl bg-emerald-950/30" />}
          </>
        )}
        {hint?.none && (
          <div role="status" className="toast">
            No useful moves left. Try undo or a new game.
          </div>
        )}
      </div>
      {won && <WinOverlay moves={moves} onNewGame={newGame} />}
    </main>
  );
};

export default Solitaire;
