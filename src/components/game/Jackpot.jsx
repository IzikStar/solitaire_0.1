import Card, { CardBack } from './Card';

/** The stock (face-down pile you draw from) and the waste next to it. */
const Jackpot = ({ stock, hint, onDraw, onPlay }) => {
  const closed = stock.getCloseCards().length;
  const waste = stock.getOpenCards(); // waste[0] is the visible card
  const empty = stock.getNumCards() === 0;
  return (
    <>
      <button
        type="button"
        onClick={onDraw}
        disabled={empty}
        data-stock
        aria-label={closed ? `Draw a card (${closed} left)` : 'Turn the waste back over'}
        className={`relative card-size rounded-[var(--radius)] ${hint?.stock ? 'card-hint' : ''} ${
          empty ? 'cursor-default' : 'cursor-pointer'
        }`}
      >
        {closed > 0 ? (
          <div className="card card-stock">
            <CardBack />
            <span className="stock-count">{closed}</span>
          </div>
        ) : (
          <div className="slot absolute inset-0">
            {!empty && <img className="slot-img" src="/images/redeal.webp" alt="" />}
          </div>
        )}
      </button>
      <div className="relative card-size" data-waste>
        <div className="slot absolute inset-0" />
        {waste[1] && <Card key={waste[1].code} code={waste[1].code} faceUp style={{ position: 'absolute', inset: 0 }} />}
        {waste[0] && (
          <Card
            key={waste[0].code}
            code={waste[0].code}
            faceUp
            onPlay={onPlay}
            highlighted={hint?.code === waste[0].code}
            style={{ position: 'absolute', inset: 0 }}
          />
        )}
      </div>
    </>
  );
};

export default Jackpot;
