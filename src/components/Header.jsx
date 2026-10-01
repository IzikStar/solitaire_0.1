import { LuLightbulb, LuPlus, LuRedo2, LuRotateCcw, LuUndo2, LuVolume2, LuVolumeX } from 'react-icons/lu';

const IconButton = ({ label, icon: Icon, onClick, disabled, primary, showLabel = true }) => (
  <button
    type="button"
    onClick={onClick}
    disabled={disabled}
    title={label}
    aria-label={label}
    className={`btn ${primary ? 'btn-primary' : ''}`}
  >
    <Icon className="h-[18px] w-[18px] shrink-0" aria-hidden="true" />
    {showLabel && <span className="hidden lg:inline">{label}</span>}
  </button>
);

/** Compact top bar: title, move counter and the game controls. */
const Header = ({ game }) => {
  const { moves, canUndo, canRedo, soundOn, state } = game;
  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-emerald-950/55 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-[880px] items-center gap-2 px-2.5 sm:px-4">
        <h1 className="flex items-center gap-1.5 text-lg font-semibold tracking-tight text-white">
          <span className="text-xl leading-none text-amber-300" aria-hidden="true">
            {'♠︎'}
          </span>
          <span>Solitaire</span>
        </h1>
        <span className="ml-1 hidden rounded-full bg-white/10 px-2.5 py-0.5 text-xs tabular-nums text-emerald-50/90 sm:inline" aria-live="polite">
          {moves} {moves === 1 ? 'move' : 'moves'}
        </span>
        <nav className="ml-auto flex items-center gap-1 sm:gap-1.5" aria-label="Game controls">
          <IconButton label="New game" icon={LuPlus} onClick={game.newGame} primary />
          <IconButton label="Undo" icon={LuUndo2} onClick={game.undo} disabled={!canUndo} />
          <IconButton label="Redo" icon={LuRedo2} onClick={game.redo} disabled={!canRedo} />
          <IconButton label="Restart" icon={LuRotateCcw} onClick={game.restart} disabled={!state || !canUndo} />
          <IconButton label="Hint" icon={LuLightbulb} onClick={game.showHint} disabled={!state || game.won} />
          <IconButton
            label={soundOn ? 'Mute sound' : 'Turn sound on'}
            icon={soundOn ? LuVolume2 : LuVolumeX}
            onClick={game.toggleSound}
            showLabel={false}
          />
        </nav>
      </div>
    </header>
  );
};

export default Header;
