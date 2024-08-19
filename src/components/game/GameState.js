import { OurStack } from "./OurStack";

// מחלקת GameState שמייצגת את מצב הלוח
export class GameState {
    constructor(stacks, piles, jackpotStack, numMoves = 0) {
        this.stacks = stacks;  // מערך של 7 סטאקים
        this.jackpotStack = jackpotStack;  // סטאק ג'קפוט
        this.piles = piles;  // מערך של 4 ערימות (מערכים)
        this.numMoves = numMoves;  // מספר מהלכים שהתבצעו
    }
    getNumMoves() {
        return this.numMoves;
    }
    getStacks() {
        return this.stacks;
    }
    getJackpotStack() {
        return this.jackpotStack;
    }
    getPiles() {
        return this.piles;
    }
}