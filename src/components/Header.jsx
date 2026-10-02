import { LuLightbulb, LuRedo2, LuRotateCcw, LuUndo2, LuVolume2, LuVolumeX } from 'react-icons/lu';

/** Small glass icon button for the control cluster. */
const ControlButton = ({ label, icon: Icon, onClick, disabled }) => (
  <button type="button" onClick={onClick} disabled={disabled} title={label} aria-label={label} className="ctl-btn">
    <Icon aria-hidden="true" />
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
    <header className="hud sticky top-0 z-30">
      <div className="mx-auto flex h-16 max-w-[1100px] items-center gap-2 px-2.5 sm:h-[72px] sm:gap-4 sm:px-5">
        <div className="flex items-center gap-2.5">
          <span className="hud-mark" aria-hidden="true">
            {'♠︎'}
          </span>
          <span className="hud-title hidden md:inline">Solitaire</span>
        </div>
        <NeonButton onClick={game.newGame}>New game</NeonButton>
        <div className="ml-auto flex items-center gap-2 sm:gap-3">
          <span className="hud-moves hidden sm:inline-flex" aria-live="polite">
            <span className="hud-moves-n">{String(moves).padStart(3, '0')}</span>
            <span>{moves === 1 ? 'move' : 'moves'}</span>
          </span>
          <nav className="ctl-group" aria-label="Game controls">
            <ControlButton label="Undo" icon={LuUndo2} onClick={game.undo} disabled={!canUndo} />
            <ControlButton label="Redo" icon={LuRedo2} onClick={game.redo} disabled={!canRedo} />
            <ControlButton label="Restart" icon={LuRotateCcw} onClick={game.restart} disabled={!state || !canUndo} />
            <ControlButton label="Hint" icon={LuLightbulb} onClick={game.showHint} disabled={!state || game.won} />
            <ControlButton
              label={soundOn ? 'Mute sound' : 'Turn sound on'}
              icon={soundOn ? LuVolume2 : LuVolumeX}
              onClick={game.toggleSound}
            />
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
