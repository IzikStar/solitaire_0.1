import Card from './Card';
import { useDropZone } from './useDropZone';

/** One tableau column. cards[0] is the top card; the first `open` are face up. */
const GameStack = ({ stack, index, state, metrics, hint, onPlay, onDrop }) => {
  const [active, dropRef] = useDropZone(state, { area: 'tableau', index }, onDrop);
  const cards = stack.getCards();
  const open = stack.getNumOfOpenCards();
  const hidden = cards.length - Math.min(open, cards.length);
  const faceUp = cards.length - hidden;

  // squeeze the face-up fan when a long column would not fit the screen
  const room = metrics.tableauHeight - metrics.ch - hidden * metrics.hiddenOffset;
  const openOffset =
    faceUp > 1
      ? Math.max(metrics.minOpenOffset, Math.min(metrics.openOffset, room / (faceUp - 1)))
      : metrics.openOffset;

  let y = 0;
  const placed = [];
  for (let i = cards.length - 1; i >= 0; i--) {
    const up = i < open;
    placed.push({ card: cards[i], up, y, covered: i > 0 });
    y += up ? openOffset : metrics.hiddenOffset;
  }
  const height = placed.length ? placed[placed.length - 1].y + metrics.ch : metrics.ch;
  const isTarget = hint?.dest?.area === 'tableau' && hint.dest.index === index;

  return (
    <div
      ref={dropRef}
      className={`relative ${(active || isTarget) && cards.length ? 'drop-target' : ''}`}
      style={{ width: metrics.cw, height }}
      aria-label={`Column ${index + 1}`}
    >
      <div className={`slot absolute inset-x-0 top-0 ${active || isTarget ? 'slot-active' : ''}`} style={{ height: metrics.ch }}>
        <span className="slot-mark">K</span>
      </div>
      {placed.map(({ card, up, y: top, covered }) => (
        <Card
          key={card.code}
          code={card.code}
          faceUp={up}
          onPlay={onPlay}
          highlighted={hint?.code === card.code}
          covered={covered}
          style={{ position: 'absolute', left: 0, top }}
        />
      ))}
    </div>
  );
};

export default GameStack;
