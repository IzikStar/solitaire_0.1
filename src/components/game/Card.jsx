import { useRef } from 'react';
import { useDrag } from 'react-dnd';
import gsap from 'gsap';

export const CARD = 'card';

const SUIT_GLYPH = { H: '♥︎', D: '♦︎', S: '♠︎', C: '♣︎' };
const SUIT_NAME = { H: 'hearts', D: 'diamonds', S: 'spades', C: 'clubs' };
const RANK = { A: 'A', 0: '10', J: 'J', Q: 'Q', K: 'K' };
const RANK_NAME = { A: 'Ace', 0: '10', J: 'Jack', Q: 'Queen', K: 'King' };

const cardLabel = (code) => `${RANK_NAME[code[0]] ?? code[0]} of ${SUIT_NAME[code[1]]}`;

const CardFace = ({ code }) => {
  const rank = RANK[code[0]] ?? code[0];
  const suit = SUIT_GLYPH[code[1]];
  const red = code[1] === 'H' || code[1] === 'D';
  const court = 'JQK'.includes(code[0]);
  return (
    <div className={`card-face ${red ? 'text-[#c4262e]' : 'text-slate-900'}`}>
      <span className="card-corner">
        {rank}
        <span className="card-corner-suit">{suit}</span>
      </span>
      {court ? (
        <span className="card-court">
          <span className="card-court-rank">{rank}</span>
          <span className="card-court-suit">{suit}</span>
        </span>
      ) : (
        <span className="card-pip">{suit}</span>
      )}
      <span className="card-corner card-corner-bottom" aria-hidden="true">
        {rank}
        <span className="card-corner-suit">{suit}</span>
      </span>
    </div>
  );
};

export const CardBack = () => <div className="card-back" aria-hidden="true" />;

/**
 * A playing card. Face-up cards are buttons (click / Enter to auto-move) and
 * can be dragged onto a column or foundation on desktop.
 */
const Card = ({ code, faceUp, onPlay, highlighted, covered, style }) => {
  const ref = useRef(null);
  const [{ isDragging }, dragRef] = useDrag(
    () => ({
      type: CARD,
      item: { code },
      canDrag: () => !!(faceUp && onPlay),
      collect: (monitor) => ({ isDragging: monitor.isDragging() }),
    }),
    [code, faceUp, onPlay],
  );

  const play = () => {
    if (!onPlay) return;
    if (!onPlay(code) && ref.current) {
      gsap.fromTo(ref.current, { x: -4 }, { x: 4, duration: 0.06, repeat: 5, yoyo: true, clearProps: 'x' });
    }
  };

  if (!faceUp) {
    return (
      <div className="card" style={style}>
        <CardBack />
      </div>
    );
  }

  return (
    <div
      ref={(node) => {
        ref.current = node;
        dragRef(node);
      }}
      role={onPlay ? 'button' : undefined}
      tabIndex={onPlay ? 0 : undefined}
      aria-label={cardLabel(code)}
      data-card={code}
      onClick={play}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          play();
        }
      }}
      className={`card card-up ${covered ? 'card-covered' : ''} ${onPlay ? 'card-playable' : ''} ${highlighted ? 'card-hint' : ''} ${
        isDragging ? 'opacity-40' : ''
      }`}
      style={style}
    >
      <CardFace code={code} />
    </div>
  );
};

export default Card;
