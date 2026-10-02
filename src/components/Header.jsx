import { FaArrowLeft, FaArrowRight, FaLightbulb, FaUndo, FaVolumeMute, FaVolumeUp } from 'react-icons/fa';

/** Round gradient icon button, the original design's control style. */
const RoundButton = ({ label, icon: Icon, onClick, disabled }) => (
  <button type="button" onClick={onClick} disabled={disabled} title={label} aria-label={label} className="round-btn">
    <span className="round-btn-glow" aria-hidden="true" />
    <Icon className="relative z-10" aria-hidden="true" />
  </button>
);

/** The neon "new game" button with the four light lines around it. */
const NeonButton = ({ onClick, children }) => (
  <button type="button" onClick={onClick} className="neon-btn" style={{ '--color': '#1e9bff' }}>
    <span aria-hidden="true" />
    <span aria-hidden="true" />
    <span aria-hidden="true" />
    <span aria-hidden="true" />
    {children}
  </button>
);

const Header = ({ game }) => {
  const { moves, canUndo, canRedo, soundOn, state } = game;
  return (
    <header className="sticky top-0 z-30 bg-[#0b0b0d]/95 shadow-lg shadow-black/40">
      <div className="mx-auto flex h-16 max-w-[1100px] items-center gap-1.5 px-2.5 sm:h-[76px] sm:gap-4 sm:px-5">
        <img src="/images/logo.jpeg" alt="Shubby Solitaire" className="h-9 w-9 rounded-md sm:h-[50px] sm:w-[50px]" />
        <NeonButton onClick={game.newGame}>New game</NeonButton>
        <span className="hidden text-xs tabular-nums text-sky-100/70 md:inline" aria-live="polite">
          {moves} {moves === 1 ? 'move' : 'moves'}
        </span>
        <nav className="ml-auto flex items-center gap-1 sm:gap-3" aria-label="Game controls">
          <RoundButton label="Restart" icon={FaUndo} onClick={game.restart} disabled={!state || !canUndo} />
          <RoundButton label="Undo" icon={FaArrowLeft} onClick={game.undo} disabled={!canUndo} />
          <RoundButton label="Redo" icon={FaArrowRight} onClick={game.redo} disabled={!canRedo} />
          <RoundButton label="Hint" icon={FaLightbulb} onClick={game.showHint} disabled={!state || game.won} />
          <RoundButton
            label={soundOn ? 'Mute sound' : 'Turn sound on'}
            icon={soundOn ? FaVolumeUp : FaVolumeMute}
            onClick={game.toggleSound}
          />
        </nav>
      </div>
    </header>
  );
};

export default Header;
