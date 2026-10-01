import Card from './Card';
import { useDropZone } from './useDropZone';

const SUITS = ['♠︎', '♥︎', '♦︎', '♣︎'];

/** One foundation pile (plain array, last card on top). */
const FinalStack = ({ cards, index, state, hint, onPlay, onDrop }) => {
  const [active, dropRef] = useDropZone(state, { area: 'foundation', index }, onDrop);
  const top = cards[cards.length - 1];
  const below = cards[cards.length - 2];
  const isTarget = hint?.dest?.area === 'foundation' && hint.dest.index === index;
  return (
    <div ref={dropRef} className="relative card-size" aria-label={`Foundation ${index + 1}`} data-foundation={index}>
      <div className={`slot absolute inset-0 ${active || isTarget ? 'slot-active' : ''}`}>
        <span className="slot-mark slot-mark-suit">{SUITS[index]}</span>
      </div>
      {below && <Card key={below.code} code={below.code} faceUp style={{ position: 'absolute', inset: 0 }} />}
      {top && (
        <Card
          key={top.code}
          code={top.code}
          faceUp
          onPlay={onPlay}
          highlighted={hint?.code === top.code}
          style={{ position: 'absolute', inset: 0 }}
        />
      )}
    </div>
  );
};

export default FinalStack;
