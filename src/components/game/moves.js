// Pure move helpers on top of GameState / OurStack.
//
// Conventions inherited from the original model:
// - a tableau column is an OurStack whose cards[0] is the TOP (last placed)
//   card, and whose first `openCards` cards are face up;
// - the stock ("jackpot") is an OurStack whose last `openCards` cards are the
//   face-up waste; getOpenCards()[0] is the visible waste card;
// - a foundation ("pile") is a plain array whose last element is on top.
//
// Every function returns a new GameState and never mutates the one it gets,
// so the Game history (undo / redo / restart) keeps working.

import { GameState } from './GameState';
import { OurStack } from './OurStack';
import { isValidToPilesMove, isValidToStacksMove } from './Logic';

/** Where a card currently is, or null if it is not a playable face-up card. */
export const locateCard = (state, code) => {
  const stacks = state.getStacks();
  for (let i = 0; i < stacks.length; i++) {
    const cards = stacks[i].getCards();
    const depth = cards.findIndex((c) => c.code === code);
    if (depth !== -1) {
      if (depth >= stacks[i].getNumOfOpenCards()) return null; // face down
      return { area: 'tableau', index: i, depth };
    }
  }
  const piles = state.getPiles();
  for (let i = 0; i < piles.length; i++) {
    const pile = piles[i];
    if (pile.length && pile[pile.length - 1].code === code) {
      return { area: 'foundation', index: i };
    }
  }
  const waste = state.getJackpot().getOpenCards();
  if (waste.length && waste[0].code === code) return { area: 'waste' };
  return null;
};

/** The cards that would travel with `code` (a tableau run, or one card). */
const movingCards = (state, from) => {
  if (from.area === 'tableau') return state.getStacks()[from.index].getCards().slice(0, from.depth + 1);
  if (from.area === 'foundation') {
    const pile = state.getPiles()[from.index];
    return [pile[pile.length - 1]];
  }
  return [state.getJackpot().getOpenCards()[0]];
};

/** Every legal destination for the card, foundations first, left to right. */
export const legalTargets = (state, code) => {
  const from = locateCard(state, code);
  if (!from) return [];
  const targets = [];
  const single = from.area !== 'tableau' || from.depth === 0;

  if (single && from.area !== 'foundation') {
    state.getPiles().forEach((pile, i) => {
      const top = pile.length ? pile[pile.length - 1].code : 0;
      if (isValidToPilesMove(code, top)) targets.push({ area: 'foundation', index: i });
    });
  }
  state.getStacks().forEach((stack, i) => {
    if (from.area === 'tableau' && from.index === i) return;
    const top = stack.getNumCards() ? stack.getCards()[0].code : 0;
    if (isValidToStacksMove(code, top)) targets.push({ area: 'tableau', index: i });
  });
  return targets;
};

export const isLegalMove = (state, code, dest) =>
  legalTargets(state, code).some((t) => t.area === dest.area && t.index === dest.index);

/** Apply a move that legalTargets() reported. Returns a new GameState. */
export const applyMove = (state, code, dest) => {
  const from = locateCard(state, code);
  const moving = movingCards(state, from);
  const stacks = [...state.getStacks()];
  const piles = state.getPiles().map((p) => [...p]);
  let jackpot = state.getJackpot();

  // take the cards off their source
  if (from.area === 'tableau') {
    const src = stacks[from.index];
    stacks[from.index] = src.getNewOurStackFromArray(src.getCards().slice(from.depth + 1));
  } else if (from.area === 'foundation') {
    piles[from.index].pop();
  } else {
    jackpot = jackpot.getNewOurJackpotFromArray(jackpot.getCards().filter((c) => c.code !== code));
  }

  // put them on the destination
  if (dest.area === 'foundation') {
    piles[dest.index].push(moving[0]);
  } else {
    const target = stacks[dest.index];
    if (target.getNumCards() === 0) {
      stacks[dest.index] = new OurStack([...moving], moving.length);
    } else {
      stacks[dest.index] = target.getNewOurStackFromArray([...moving, ...target.getCards()]);
    }
  }

  return new GameState(stacks, piles, jackpot, state.getNumOfMove() + 1);
};

/** Click-to-move: the first legal destination (foundation preferred). */
export const autoMove = (state, code) => {
  const [dest] = legalTargets(state, code);
  return dest ? { dest, state: applyMove(state, code, dest) } : null;
};

/**
 * A move worth suggesting, or a hint to draw from the stock, or null.
 * Skips moves that only shuffle a fully revealed run between columns.
 */
export const findHint = (state) => {
  const stacks = state.getStacks();
  const waste = state.getJackpot().getOpenCards();
  const candidates = [];
  if (waste.length) candidates.push(waste[0].code);
  stacks.forEach((s) => {
    if (s.getNumCards()) candidates.push(s.getCards()[0].code);
  });

  // 1. anything that can go up to a foundation
  for (const code of candidates) {
    const dest = legalTargets(state, code).find((t) => t.area === 'foundation');
    if (dest) return { code, dest };
  }
  // 2. tableau runs that reveal a card (or free a column for a King)
  for (let i = 0; i < stacks.length; i++) {
    const open = stacks[i].getNumOfOpenCards();
    const cards = stacks[i].getCards();
    if (!cards.length) continue;
    const base = cards[open - 1];
    const revealsSomething = cards.length > open;
    const dest = legalTargets(state, base.code).find(
      (t) => t.area === 'tableau' && (revealsSomething || stacks[t.index].getNumCards() > 0),
    );
    if (dest) return { code: base.code, dest };
  }
  // 3. the waste card onto the tableau
  if (waste.length) {
    const dest = legalTargets(state, waste[0].code).find((t) => t.area === 'tableau');
    if (dest) return { code: waste[0].code, dest };
  }
  // 4. otherwise draw, if there is anything left to cycle through
  if (state.getJackpot().getNumCards() > 0) return { stock: true };
  return null;
};

/** Turn the next stock card (same rule as Game.addNewMoveFromJackpot). */
export const drawState = (state) => {
  const stock = state.getJackpot();
  return new GameState(
    state.getStacks(),
    state.getPiles(),
    new OurStack(stock.getCards(), (stock.getNumOfOpenCards() + 1) % (stock.getNumOfCards() + 1)),
    state.getNumOfMove(),
  );
};

/**
 * Once every tableau card is face up the game can be finished mechanically.
 * Returns the list of states that finishes it (each one a single move or a
 * draw), or null when auto-complete is not available yet.
 */
export const autoCompletePlan = (state) => {
  if (!state || state.getIsWinning()) return null;
  if (!state.getStacks().every((s) => s.getNumOfOpenCards() >= s.getNumCards())) return null;

  const steps = [];
  let current = state;
  let idleDraws = 0;
  while (!current.getIsWinning()) {
    const waste = current.getJackpot().getOpenCards();
    const candidates = [
      ...(waste.length ? [waste[0].code] : []),
      ...current.getStacks().filter((s) => s.getNumCards()).map((s) => s.getCards()[0].code),
    ];
    let moved = false;
    for (const code of candidates) {
      const dest = legalTargets(current, code).find((t) => t.area === 'foundation');
      if (dest) {
        current = applyMove(current, code, dest);
        steps.push({ state: current, sound: 'select' });
        idleDraws = 0;
        moved = true;
        break;
      }
    }
    if (moved) continue;
    const stockSize = current.getJackpot().getNumCards();
    // a full pass through the stock without progress means we are stuck
    if (stockSize === 0 || idleDraws > stockSize + 1) return null;
    current = drawState(current);
    steps.push({ state: current, sound: 'draw' });
    idleDraws++;
  }
  return steps;
};
