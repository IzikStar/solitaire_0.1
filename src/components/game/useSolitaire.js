import { useCallback, useEffect, useRef, useState } from 'react';
import { Game } from './Game';
import { GameState } from './GameState';
import { OurStack } from './OurStack';
import { applyMove, autoMove, findHint, isLegalMove } from './moves';
import { playSound } from '../sound';

export const STOCK_SIZE = 24;

const SUITS = { S: 'SPADES', H: 'HEARTS', D: 'DIAMONDS', C: 'CLUBS' };
const VALUES = { A: 'ACE', J: 'JACK', Q: 'QUEEN', K: 'KING', 0: '10' };

// Local fallback so a game can still be dealt if the Deck of Cards API is down.
const localShuffledDeck = () => {
  const cards = [];
  for (const s of 'SHDC') {
    for (const v of 'A234567890JQK') cards.push({ code: v + s, value: VALUES[v] ?? v, suit: SUITS[s] });
  }
  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }
  return cards;
};

const fetchShuffledDeck = async () => {
  const res = await fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1');
  const { deck_id: id } = await res.json();
  const draw = await fetch(`https://deckofcardsapi.com/api/deck/${id}/draw/?count=52`);
  const { cards } = await draw.json();
  if (!Array.isArray(cards) || cards.length !== 52) throw new Error('incomplete deck');
  return cards.map(({ code, value, suit }) => ({ code, value, suit }));
};

// Same deal as the original: first 24 cards form the stock, the rest are
// dealt 1..7 into the tableau with only the top card face up.
const deal = (cards) => {
  const stacks = [];
  let start = STOCK_SIZE;
  for (let n = 1; n <= 7; n++) {
    stacks.push(new OurStack(cards.slice(start, start + n), 1));
    start += n;
  }
  return new Game(new GameState(stacks, [[], [], [], []], new OurStack(cards.slice(0, STOCK_SIZE))));
};

const readSoundPref = () => {
  try {
    return localStorage.getItem('solitaire:sound') !== 'off';
  } catch {
    return true;
  }
};

export const useSolitaire = () => {
  const [game, setGame] = useState(null);
  const [status, setStatus] = useState('loading');
  const [hint, setHint] = useState(null);
  const [soundOn, setSoundOn] = useState(readSoundPref);
  const dealId = useRef(0);
  const hintTimer = useRef(null);

  const sound = useCallback((name) => soundOn && playSound(name), [soundOn]);

  const clearHint = () => {
    clearTimeout(hintTimer.current);
    setHint(null);
  };

  const newGame = useCallback(async () => {
    const id = ++dealId.current;
    clearHint();
    setStatus('loading');
    let cards;
    try {
      cards = await fetchShuffledDeck();
    } catch {
      cards = localShuffledDeck();
    }
    if (id !== dealId.current) return; // a newer deal was requested meanwhile
    setGame(deal(cards));
    setStatus('ready');
  }, []);

  useEffect(() => {
    newGame();
    return () => clearTimeout(hintTimer.current);
  }, [newGame]);

  const state = game?.getCurrentState() ?? null;
  const won = !!state?.getIsWinning();

  useEffect(() => {
    if (won) sound('win');
  }, [won, sound]);

  const commit = (nextGame) => {
    clearHint();
    setGame(nextGame);
  };

  /** Click-to-move. Returns false when the card has no legal move. */
  const playCard = (code) => {
    if (!state || won) return false;
    const move = autoMove(state, code);
    if (!move) {
      sound('invalid');
      return false;
    }
    sound('select');
    commit(game.addNewMove(move.state));
    return true;
  };

  const dropCard = (code, dest) => {
    if (!state || !isLegalMove(state, code, dest)) return;
    sound('select');
    commit(game.addNewMove(applyMove(state, code, dest)));
  };

  const draw = () => {
    if (!state || won) return;
    sound('draw');
    commit(game.addNewMoveFromJackpot());
  };

  const undo = () => game?.canUndo() && (sound('undo'), commit(game.undo()));
  const redo = () => game?.canRedo() && commit(game.redo());
  const restart = () => game && commit(game.reset());

  const showHint = () => {
    if (!state || won) return;
    clearTimeout(hintTimer.current);
    const h = findHint(state) ?? { none: true };
    setHint(h);
    sound(h.none ? 'invalid' : 'hint');
    hintTimer.current = setTimeout(() => setHint(null), h.none ? 2500 : 1800);
  };

  const toggleSound = () => {
    setSoundOn((on) => {
      try {
        localStorage.setItem('solitaire:sound', on ? 'off' : 'on');
      } catch {
        // per-browser preference only; fine if storage is unavailable
      }
      return !on;
    });
  };

  return {
    state,
    status,
    won,
    hint,
    soundOn,
    canUndo: !!game?.canUndo(),
    canRedo: !!game?.canRedo(),
    moves: state?.getNumOfMove() ?? 0,
    newGame,
    playCard,
    dropCard,
    draw,
    undo,
    redo,
    restart,
    showHint,
    toggleSound,
  };
};
